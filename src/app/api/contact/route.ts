import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  country: string;
  message: string;
}

// Store submissions in a JSON file
const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json");

async function ensureSubmissionsFile() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
  }
}

async function saveSubmission(data: ContactFormData) {
  await ensureSubmissionsFile();
  const existing = JSON.parse(await fs.readFile(SUBMISSIONS_FILE, "utf-8"));
  const submission = {
    ...data,
    timestamp: new Date().toISOString(),
    id: Date.now().toString(),
  };
  existing.push(submission);
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2));
  return submission;
}

async function sendEmail(data: ContactFormData) {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const recipientEmail = process.env.CONTACT_EMAIL || "sunny@apigen.ca";
  
  // Use Resend's test domain if no verified domain (no DNS setup needed)
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Apigen Contact Form <onboarding@resend.dev>";
  
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1F2726; color: #FAFAFA; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #FAFAFA; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: 600; color: #1F2726; }
    .value { margin-top: 5px; color: #131515; }
    .message-box { background: #FFFFFF; padding: 15px; border-left: 4px solid #AE5521; margin: 15px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${data.company}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Country:</div>
        <div class="value">${data.country}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="message-box">
          <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: data.email,
      subject: `New Contact Form Submission from ${data.name} (${data.company})`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Basic validation
    if (!data.name || !data.company || !data.email || !data.country || !data.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to JSON file
    const submission = await saveSubmission(data);

    // Send email (don't fail if email fails, but log it)
    try {
      await sendEmail(data);
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      // Still return success since we saved the submission
    }

    return NextResponse.json({ 
      success: true,
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

