import fs from "node:fs/promises";
import path from "node:path";

async function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  const raw = await fs.readFile(envPath, "utf8");
  const vars: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    // Strip quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

async function main() {
  const vars = await loadEnv();
  const url = vars.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = vars.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  // Use the Supabase SQL endpoint (available with service role key)
  const sqlEndpoint = `${url}/rest/v1/rpc/`;
  
  // The is_admin function SQL
  const sql = `
    CREATE OR REPLACE FUNCTION public.is_admin()
    RETURNS boolean
    LANGUAGE sql
    SECURITY DEFINER
    STABLE
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM public.app_users 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
      );
    $$;
  `;

  console.log("Creating is_admin function...");
  console.log("SQL:", sql);
  console.log("\n⚠️  This function needs to be created via the Supabase Dashboard SQL Editor.");
  console.log("\n1. Go to: " + url.replace('.supabase.co', '.supabase.co/project/default/sql'));
  console.log("2. Or navigate to your Supabase Dashboard → SQL Editor");
  console.log("3. Paste the SQL above and run it.");
  console.log("\nAlternatively, run this command in psql or any PostgreSQL client.");
}

main().catch(console.error);
