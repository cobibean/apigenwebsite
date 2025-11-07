#!/usr/bin/env tsx
/**
 * Export contact form submissions to CSV
 * 
 * Usage: npx tsx scripts/export-submissions.ts [output-file.csv]
 */

import fs from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json");
const OUTPUT_FILE = process.argv[2] || path.join(process.cwd(), "data", "submissions-export.csv");

interface Submission {
  id: string;
  timestamp: string;
  name: string;
  company: string;
  email: string;
  country: string;
  message: string;
}

function escapeCsvField(field: string): string {
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function convertToCsv(submissions: Submission[]): string {
  const headers = ["ID", "Timestamp", "Name", "Company", "Email", "Country", "Message"];
  const rows = submissions.map((sub) => [
    sub.id,
    sub.timestamp,
    escapeCsvField(sub.name),
    escapeCsvField(sub.company),
    escapeCsvField(sub.email),
    escapeCsvField(sub.country),
    escapeCsvField(sub.message),
  ]);

  const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];
  return csvRows.join("\n");
}

async function main() {
  try {
    // Check if submissions file exists
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      console.error(`Submissions file not found: ${SUBMISSIONS_FILE}`);
      console.log("No submissions to export.");
      process.exit(0);
    }

    // Read submissions
    const fileContent = await fs.promises.readFile(SUBMISSIONS_FILE, "utf-8");
    const submissions: Submission[] = JSON.parse(fileContent);

    if (submissions.length === 0) {
      console.log("No submissions to export.");
      process.exit(0);
    }

    // Convert to CSV
    const csv = convertToCsv(submissions);

    // Write to output file
    await fs.promises.writeFile(OUTPUT_FILE, csv, "utf-8");

    console.log(`✅ Exported ${submissions.length} submission(s) to: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("Error exporting submissions:", error);
    process.exit(1);
  }
}

main();

