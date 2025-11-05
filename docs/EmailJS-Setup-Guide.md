# EmailJS Setup Guide for Contact Form

## Overview
This guide will walk you through setting up EmailJS to handle contact form submissions from the Apigen website. EmailJS provides a free tier that allows up to 200 emails per month.

## Prerequisites
- An email account (Gmail, Outlook, etc.) to receive form submissions
- Access to the website's `.env.local` file

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" in the top right corner
3. Choose your preferred sign-up method (Google, GitHub, or email)
4. Verify your email if you signed up with email

## Step 2: Create Email Service

1. In your EmailJS dashboard, click on **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Click on your chosen provider
5. A popup will appear - click **"Connect Account"**
6. Sign in to your email account and grant permissions
7. Give your service a name (e.g., "Apigen Contact Form")
8. Click **"Create Service"**

**Note:** You'll see a "Service ID" - save this for later.

## Step 3: Create Email Template

1. In your EmailJS dashboard, click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Configure the template as follows:

### Template Settings:
- **Template Name:** "Contact Form Response"
- **Subject:** `New Contact Form Submission from {{from_name}}`

### Template Content (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2d5a27;">New Contact Form Submission</h2>

    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> {{from_name}}</p>
        <p><strong>Company:</strong> {{from_company}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
        <p><strong>Country:</strong> {{from_country}}</p>
    </div>

    <div style="background: #f0f8f0; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #2d5a27;">
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">{{message}}</p>
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <p style="color: #666; font-size: 12px;">
        This message was sent from the Apigen website contact form.
    </p>
</body>
</html>
```

### Template Variables:
Make sure these variables are included:
- `{{from_name}}`
- `{{from_company}}`
- `{{from_email}}`
- `{{from_country}}`
- `{{message}}`
- `{{reply_to}}` (set to `{{from_email}}`)

4. Click **"Save"**
5. You'll see a "Template ID" - save this for later.

## Step 4: Get Public Key

1. In your EmailJS dashboard, click on **"Account"** in the left sidebar
2. Scroll down to find your **"Public Key"**
3. Copy this key - save it for later.

## Step 5: Configure Environment Variables

1. In your project root, create or edit the `.env.local` file
2. Add these three environment variables:

```env
# EmailJS Configuration for Contact Form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with the actual IDs from steps 2, 3, and 4:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your Email Service ID
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your Email Template ID
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your Public Key

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Open the website and navigate to the contact form
3. Fill out and submit the contact form
4. Check your email - you should receive the formatted message
5. If successful, the form will show a success message

## Troubleshooting

### Emails Not Sending
- Check that all three environment variables are correctly set in `.env.local`
- Verify your EmailJS account is active and not suspended
- Check the browser console for error messages

### Template Issues
- Ensure all template variables match exactly (case-sensitive)
- Make sure the `{{reply_to}}` is set to `{{from_email}}`

### Service Connection Issues
- Try reconnecting your email service in EmailJS dashboard
- Check that your email account allows SMTP access

## EmailJS Limits (Free Tier)
- 200 emails per month
- 10,000 characters per email
- Basic HTML support
- Rate limited to prevent spam

## Upgrading (if needed)
If you exceed the free tier limits, EmailJS offers paid plans starting at $15/month for 10,000 emails.

## Alternative Services
If EmailJS doesn't work for your needs, consider:
- **Formspree** (free tier: 50 submissions/month)
- **Netlify Forms** (free with Netlify hosting)
- **Resend** (free tier: 3,000 emails/month)

---

**Need Help?** Refer to the [EmailJS Documentation](https://www.emailjs.com/docs/) or contact the developer.
