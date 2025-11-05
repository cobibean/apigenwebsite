# Domain Setup Guide: Pointing to Vercel Hosting

## Overview
This guide provides step-by-step instructions for configuring your domain to point to Vercel hosting. This process involves updating DNS settings in GoDaddy and configuring the domain in Vercel.

## Prerequisites
- Domain registered with GoDaddy (e.g., apigen.com)
- Vercel account with Pro plan or higher (required for custom domains)
- Access to both GoDaddy and Vercel dashboards

## Step 1: Prepare Vercel Project

### 1.1 Deploy Site to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Import Project" or "New Project"
3. Connect your GitHub repository (`apigenwebsite`)
4. Configure build settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (leave default)
5. Click "Deploy"
6. Wait for deployment to complete - you'll get a URL like `your-project.vercel.app`

### 1.2 Upgrade to Pro Plan (if needed)
1. In Vercel dashboard, go to Settings → Billing
2. Upgrade to Pro plan ($20/month) for custom domain support
3. Complete payment process

## Step 2: Add Domain to Vercel

### 2.1 Add Custom Domain
1. In your Vercel project dashboard, go to Settings → Domains
2. Click "Add" button
3. Enter your domain name (e.g., `apigen.com`)
4. Click "Add"

### 2.2 Choose DNS Configuration Method
Vercel will present two options:
- **Option A: Vercel Nameservers** (Recommended)
- **Option B: CNAME/A Records**

**Choose Option A (Vercel Nameservers)** - it's simpler and provides better performance.

### 2.3 Note Vercel Nameservers
Vercel will show you nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
**Copy these - you'll need them for GoDaddy.**

## Step 3: Update GoDaddy DNS Settings

### 3.1 Access GoDaddy DNS Management
1. Go to [godaddy.com](https://godaddy.com) and sign in
2. Go to "My Products" → Domain settings
3. Find your domain and click "DNS" or "Manage DNS"

### 3.2 Change Nameservers
1. In the DNS Management page, find the **"Nameservers"** section
2. Click "Change" or "Manage"
3. Select **"Custom"** option (NOT GoDaddy's nameservers)
4. Replace the existing nameservers with Vercel's:
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
5. Click "Save" or "Update"

### 3.3 Wait for Propagation
- DNS changes can take **24-48 hours** to propagate globally
- You can check status at [dnschecker.org](https://dnschecker.org)

## Step 4: Verify Domain Configuration

### 4.1 Check Vercel Domain Status
1. Back in Vercel dashboard → Settings → Domains
2. Your domain should show status updates:
   - **Not configured** → **Configuring** → **Active**

### 4.2 Test Domain
1. Wait for DNS propagation (can take up to 48 hours)
2. Visit your domain in a browser
3. Should load your Vercel-hosted site
4. Check SSL certificate (should show secure lock icon)

## Step 5: Troubleshooting

### DNS Not Propagating
**Check current status:**
```bash
# Check nameservers
nslookup -type=NS yourdomain.com

# Should return:
# ns1.vercel-dns.com
# ns2.vercel-dns.com
```

**If still showing old nameservers:**
- Wait longer (up to 48 hours)
- Clear DNS cache: `ipconfig /flushdns` (Windows) or restart router

### Domain Not Loading
**Check Vercel domain status:**
- Go to Vercel → Project → Settings → Domains
- Look for error messages
- Try "Refresh" or "Reconfigure domain"

### SSL Certificate Issues
- Vercel automatically provisions SSL certificates
- May take additional time after DNS propagation
- Check browser developer tools for certificate errors

## Alternative: CNAME Method (if nameservers don't work)

If you prefer to keep GoDaddy nameservers:

### 1. In Vercel Domain Settings
- Choose "CNAME" option instead of nameservers
- Vercel will provide specific CNAME value

### 2. In GoDaddy DNS
1. Go to DNS Management
2. Delete all existing A records for `@` (root domain)
3. Add new CNAME record:
   ```
   Type: CNAME
   Name: @
   Value: [CNAME value from Vercel]
   TTL: 600
   ```

### 3. Add A Records for www (if needed)
```
Type: A
Name: www
Value: 76.76.21.21 (Vercel's A record)
TTL: 600
```

## Cost Breakdown
- **Vercel Pro Plan:** $20/month (required for custom domains)
- **GoDaddy Domain:** $10-20/year (existing cost)
- **SSL Certificate:** Free (included with Vercel)

## Support Resources
- **Vercel Docs:** [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- **GoDaddy Help:** [Change Nameservers](https://www.godaddy.com/help/change-nameservers-664)
- **DNS Checker:** [dnschecker.org](https://dnschecker.org)

## Post-Setup Checklist
- [ ] Domain loads in browser
- [ ] HTTPS certificate active (secure lock icon)
- [ ] All pages load correctly
- [ ] Forms and functionality work
- [ ] Mobile responsive design verified
- [ ] Performance tested (Lighthouse score)

---

**Need help during setup?** Share screenshots of any error messages or current DNS configurations for troubleshooting assistance.
