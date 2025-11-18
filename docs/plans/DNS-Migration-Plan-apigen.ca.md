# DNS Migration Plan — apigen.ca

Goal: move DNS from Wix nameservers to Vercel DNS, keep Microsoft 365 email working, and enable Resend to send mail as `@apigen.ca` — all without needing Microsoft 365 admin access on day one.

---

## 0) Situation (from live DNS queries)

- Nameservers: `ns8.wixdns.net`, `ns9.wixdns.net` (Wix is authoritative)
- A/WWW: point to Wix IPs (Wix placeholder shows on `https://apigen.ca`)
- MX: `apigen-ca.mail.protection.outlook.com` (priority 10) → Microsoft 365 in use
- TXT (SPF): TWO records present at apex (invalid/permerror)
  - `v=spf1 include:spf.protection.outlook.com -all` (Microsoft 365)
  - `v=spf1 include:secureserver.net -all` (legacy GoDaddy Workspace Email)
- TXT: `MS=ms12865042` (Microsoft domain verification string) — keep
- DMARC: none published
- DKIM (M365): not published (no `selector1/selector2._domainkey` CNAMEs); can be enabled later when tenant access is available

Implication: Wix blocks MX on subdomains, which Resend needs for `send.apigen.ca`. Moving DNS fixes that. Email will keep working as long as MX/SPF are replicated correctly.

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

In Vercel → Project → Settings → Domains:

1. Add domain `apigen.ca` and choose “Vercel nameservers” (you’ll receive `ns1.vercel-dns.com`, `ns2.vercel-dns.com` for later).

ns1.vercel-dns.com
ns2.vercel-dns.com

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

---

## 5) Flip nameservers at GoDaddy

In GoDaddy → `apigen.ca` → DNS → Nameservers → Change:
- From: `ns8.wixdns.net`, `ns9.wixdns.net`
- To: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`

Propagation can take up to 24–48 hours globally (often quicker).

---

## 6) Post‑change verification (CLI commands)

Run these and confirm expected answers:

```bash
# Nameservers should show Vercel
dig +short NS apigen.ca

# MX must remain Microsoft 365
dig +noall +answer MX apigen.ca

# SPF: exactly ONE TXT at apex; confirm the consolidated value
dig +noall +answer TXT apigen.ca

# DMARC present
dig +noall +answer TXT _dmarc.apigen.ca

# Resend subdomain DNS (once Resend shows verified, these will resolve)
dig +noall +answer MX send.apigen.ca
dig +noall +answer TXT send.apigen.ca
dig +noall +answer TXT resend._domainkey.apigen.ca
```

Web/app checks:
- `https://apigen.ca` resolves to the Vercel‑hosted site (or project default, if not attached yet).
- Resend Dashboard → Domains → `apigen.ca` shows verified for DKIM/MX/SPF.

---

## 7) App configuration (after Resend verifies)

Update the production environment variables:

```
RESEND_FROM_EMAIL="Apigen Contact Form <noreply@apigen.ca>"
```

No code changes needed — the API route already uses `RESEND_FROM_EMAIL` and falls back to Resend’s test domain if unset.

---

## 8) Follow‑ups (no access required immediately)

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


