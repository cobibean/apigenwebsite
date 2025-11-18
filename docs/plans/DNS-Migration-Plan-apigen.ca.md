# DNS Migration Plan — apigen.ca

Goal: move DNS from Wix nameservers to Vercel DNS, keep Microsoft 365 email working, and enable Resend to send mail as `@apigen.ca` — all without needing Microsoft 365 admin access on day one.

This document is now a combined **plan + execution log**. Each section notes what was planned originally and whether it has been completed or adjusted.

---

## 0) Situation (from live DNS queries)

**Status: Completed — initial reconnaissance + current state logged.**

### Initial snapshot (before migration)

- Nameservers: `ns8.wixdns.net`, `ns9.wixdns.net` (Wix was authoritative)
- A/WWW: pointed to Wix IPs (Wix placeholder showed on `https://apigen.ca`)
- MX: `apigen-ca.mail.protection.outlook.com` (priority 10) → Microsoft 365 in use
- TXT (SPF): TWO records present at apex (invalid/permerror)
  - `v=spf1 include:spf.protection.outlook.com -all` (Microsoft 365)
  - `v=spf1 include:secureserver.net -all` (legacy GoDaddy Workspace Email)
- TXT: `MS=ms12865042` (Microsoft domain verification string) — keep
- DMARC: none published
- DKIM (M365): not published (no `selector1/selector2._domainkey` CNAMEs); can be enabled later when tenant access is available

Implication (unchanged): Wix blocks MX on subdomains, which Resend needs for `send.apigen.ca`. Moving DNS fixes that. Email keeps working as long as MX/SPF are replicated correctly.

### Current live DNS (Vercel authoritative)

- Nameservers now `ns1.vercel-dns.com`, `ns2.vercel-dns.com` (GoDaddy change completed; propagation validated via `dig` after cutover).
- Apex `apigen.ca` (managed fully in Vercel DNS):
  - `MX @ → apigen-ca.mail.protection.outlook.com.` (priority 10)
  - `TXT @ → MS=ms12865042`
  - `TXT @ → v=spf1 include:spf.protection.outlook.com include:secureserver.net ~all` (kept `include:secureserver.net` until we confirm no legacy sender still depends on it).
  - `TXT _dmarc → v=DMARC1; p=none; rua=mailto:postmaster@apigen.ca; adkim=s; aspf=s`
  - Vercel-managed ALIAS/ANAME + default CAA records for the site.
- Resend-specific DNS (also in Vercel DNS):
  - `TXT resend._domainkey.apigen.ca → p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyMHbj6+Wp/nRQiBCaxZIgGBrGiH298wwLjgpbdip1oSmpTbuQdM6l9o6vA3ONu/qvI8I/pp3RLjzR+r+q+W5hxHyV4C4ut71KZ9/MaEDB4lTSzng2X/tWR8JzubGyb3qe0179bV0Dq/hIBfuwgAIqRCi0UULSev5OLGnbmCB2zwIDAQAB`
  - `MX send.apigen.ca → feedback-smtp.us-east-1.amazonses.com.` (priority 10)
  - `TXT send.apigen.ca → v=spf1 include:amazonses.com ~all`
- Microsoft 365 DKIM selectors (`selector1/selector2`) still unpublished because we do not yet have tenant admin access to enable DKIM.

---

## 1) Assumptions

- No Microsoft 365 admin access is available at migration time.
- Registrar access (GoDaddy) and Vercel project access are available.
- We will attach the domain to the Vercel project for the website.

---

## 2) Risks and mitigations

- Duplicate SPF causes deliverability issues (permerror). Mitigation: publish a single consolidated SPF at apex during the move.
- Temporary DNS propagation inconsistencies (up to 24–48h). Mitigation: pre‑stage complete zone in Vercel, then flip nameservers once ready.
- DKIM for Microsoft 365 not enabled day one. Mitigation: proceed with MX+SPF+DMARC p=none; enable DKIM later once tenant access is obtained.
- Unknown legacy sender may still use `secureserver.net`. Mitigation: include both Microsoft 365 and secureserver in a single SPF initially (`~all`), then tighten once confirmed safe.

---

## 3) Access checklist

- GoDaddy: ability to change nameservers for `apigen.ca`
- Vercel: project access to add `apigen.ca` and manage Vercel DNS
- Resend: access to the domain setup page to copy DKIM value

No Microsoft 365 admin required for this phase.

---

## 4) Pre‑stage DNS in Vercel (before changing nameservers)

**Status: Completed — zone created in Vercel and populated prior to NS cutover.**

In Vercel → Project → Settings → Domains:

1. Add domain `apigen.ca` and choose “Vercel nameservers” (you’ll receive `ns1.vercel-dns.com`, `ns2.vercel-dns.com` for later).
2. In Vercel DNS, create these records exactly:

Website (Vercel will typically auto‑add when the domain is attached):
- Point `apigen.ca` and `www` to the Vercel project per the prompts.

Email continuity (Microsoft 365):
- MX (host: `apigen.ca`) → `apigen-ca.mail.protection.outlook.com` (priority: `10`)
- TXT (host: `apigen.ca`) → `MS=ms12865042`
- TXT (host: `apigen.ca`) → SPF — pick ONE consolidated record for now:
  - Conservative (keeps legacy just in case):
    - `v=spf1 include:spf.protection.outlook.com include:secureserver.net ~all`
  - If confirmed Microsoft 365 is the only sender:
    - `v=spf1 include:spf.protection.outlook.com -all`
- TXT (host: `_dmarc`) → `v=DMARC1; p=none; rua=mailto:postmaster@apigen.ca; sp=none; adkim=s; aspf=s`

Resend (to enable sending from `@apigen.ca`):
- TXT (host: `resend._domainkey`) → paste the DKIM value from Resend Domains UI
- MX (host: `send`) → `feedback-smtp.us-east-1.amazonaws.com` (priority: `10`)
- TXT (host: `send`) → `v=spf1 include:amazonses.com ~all`

Notes
- Do not publish Microsoft 365 DKIM CNAMEs until you can enable DKIM in the tenant — they will be provided by the M365 admin portal later.
- Vercel automatically injected the ALIAS/CAA it needs for the web tier; we left those untouched.
- Resend’s dashboard now shows `apigen.ca` as fully verified (DKIM, SPF, and `send` MX). Inbound MX (“Enable Receiving”) remains off by design.

---

## 5) Flip nameservers at GoDaddy

**Status: Completed — NS flipped at GoDaddy and digits now point to Vercel.**

In GoDaddy → `apigen.ca` → DNS → Nameservers → Change:
- From: `ns8.wixdns.net`, `ns9.wixdns.net`
- To: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`

Propagation completed within a few minutes; repeated `dig NS apigen.ca` calls now show the Vercel pair globally.

---

## 6) Post‑change verification (CLI commands)

**Status: Completed — commands run after propagation and matched expected answers below.**

Ran the following to confirm the cutover:

```bash
# Nameservers should show Vercel
dig +short NS apigen.ca

# MX must remain Microsoft 365
dig +noall +answer MX apigen.ca

# SPF: exactly ONE TXT at apex; confirm the consolidated value
dig +noall +answer TXT apigen.ca

# DMARC present
dig +noall +answer TXT _dmarc.apigen.ca

# Resend subdomain DNS (now resolves because Vercel hosts the zone)
dig +noall +answer MX send.apigen.ca
dig +noall +answer TXT send.apigen.ca
dig +noall +answer TXT resend._domainkey.apigen.ca
```

Web/app checks:
- `https://apigen.ca` now resolves to the Vercel project (confirmed via browser + `curl`).
- Resend Dashboard → Domains → `apigen.ca` shows verified for DKIM/MX/SPF. Inbound MX (“Enable Receiving”) is still OFF intentionally.

### Provider status

- **Microsoft 365 email**: `sunny@apigen.ca` continues to receive mail through `apigen-ca.mail.protection.outlook.com` after the move. The domain still lacks DKIM selectors because tenant admin access is pending.
- **Resend**: DKIM/SPF/`send` MX verified; outbound sending uses `noreply@apigen.ca` once the backend env var is set. No inbound routing configured.
- **Vercel**: Domain is attached to the production project, DNS served entirely from Vercel, and the site renders correctly at apex + `www`.

---

## 7) App configuration (after Resend verifies)

**Status: Completed — production env vars updated in Vercel.**

Currently set (and required) in Vercel → Project → Settings → Environment Variables:

```
RESEND_API_KEY=<Resend production key>
RESEND_FROM_EMAIL="Apigen Contact Form <noreply@apigen.ca>"
CONTACT_EMAIL="sunny@apigen.ca"
```

The contact-form API route already reads `RESEND_FROM_EMAIL` for the outbound “from” identity (falling back to Resend’s sandbox domain only if unset) and `CONTACT_EMAIL` for the recipient. No additional code changes were needed beyond swapping the DNS + from-domain.

---

## 8) Follow‑ups (no access required immediately)

**Status: Pending — blocked on Microsoft 365 admin access and post-cutover monitoring.**

1) Microsoft 365 DKIM (when tenant access is available):
   - Enable DKIM for `apigen.ca` in the M365 admin portal.
   - Publish the two CNAMEs provided (`selector1/selector2._domainkey`) in Vercel DNS.
   - Verify DKIM signing is “active” in the portal.

2) DMARC policy ramp‑up (after monitoring):
   - Move from `p=none` → `p=quarantine` → `p=reject` over time, once SPF/DKIM alignment is stable.

3) SPF tightening (if legacy sender is not used):
   - Remove `include:secureserver.net` and go to `v=spf1 include:spf.protection.outlook.com -all`.

---

## 9) Rollback plan

If any critical issue arises after the flip:
- Revert GoDaddy nameservers to `ns8.wixdns.net`, `ns9.wixdns.net` (previous state).
- Allow propagation; email and site behavior will return to the pre‑migration state.
- Diagnose and correct the Vercel DNS entries, then retry.

---

## 10) References

- Resend Domains & DNS requirements: https://resend.com/docs/dashboard/domains/introduction
- GoDaddy — change nameservers: https://www.godaddy.com/help/change-nameservers-for-my-domains-664
- Wix DNS limitation on subdomain MX (context for the move): https://support.wix.com/
- Microsoft 365 DKIM overview (enable later): https://learn.microsoft.com/exchange/security/antispam-and-antimalware/use-dkim-to-validate-outbound-email

---

## 11) One‑screen checklist (TL;DR)

1. Add `apigen.ca` to Vercel → choose Vercel nameservers.
2. Pre‑stage in Vercel DNS:
   - MX `apigen.ca` → `apigen-ca.mail.protection.outlook.com` (prio 10)
   - TXT `apigen.ca` → `MS=ms12865042`
   - TXT `apigen.ca` → `v=spf1 include:spf.protection.outlook.com include:secureserver.net ~all`
   - TXT `_dmarc.apigen.ca` → `v=DMARC1; p=none; rua=mailto:postmaster@apigen.ca; sp=none; adkim=s; aspf=s`
   - TXT `resend._domainkey.apigen.ca` → DKIM value from Resend
   - MX `send.apigen.ca` → `feedback-smtp.us-east-1.amazonaws.com` (prio 10)
   - TXT `send.apigen.ca` → `v=spf1 include:amazonses.com ~all`
3. Change nameservers at GoDaddy → `ns1.vercel-dns.com`, `ns2.vercel-dns.com`.
4. Verify with `dig` (NS, MX, TXT, DMARC, Resend records) and check Resend dashboard.
5. Switch app env: `RESEND_FROM_EMAIL="Apigen Contact Form <noreply@apigen.ca>"`.
6. Later: enable M365 DKIM; tighten DMARC; simplify SPF if legacy sender unused.

---

## 12) Current Status / Next Steps

- DNS migration: **Completed** — Vercel serves NS/DNS and the site loads normally.
- Resend domain verification: **Completed** — DKIM, SPF, and `send` MX all show green in the dashboard; inbound MX remains disabled.
- Automated test for the contact form / email path: **Completed** — see `tests/contactRoute.test.ts` for coverage of success + failure scenarios.
- Manual UI test in production: **Pending (after deploy)** — submit the contact form manually and confirm mail arrives at `sunny@apigen.ca` with `Reply-To` set to the visitor’s email.
- Future hardening: **Pending** — enable Microsoft 365 DKIM once admin access is available; tighten SPF/DMARC after monitoring traffic.
