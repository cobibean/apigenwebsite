# Future Development Tasks

## High Priority

### 1. Combine Brands Section
**Goal:** Merge the brands section into a single uniform section with both brand cards and a CTA to view the brands page.

**Current State:**
- Multiple brand-related sections on home page
- Brand cards scattered across different components

**Target:**
- Single cohesive brands section
- Brand showcase cards
- Clear CTA button linking to `/brands` page

---

### 2. Clean Up Mission Brand Section Spacing
**Goal:** Improve the spacing and layout of copy in the MISSION brand section on the brands page.

**Current Issues:**
- Copy spacing needs refinement
- Text layout may need better hierarchy

**Target:**
- Clean, readable text spacing
- Proper visual hierarchy
- Consistent with overall design system

---

### 3. Fix Header Logo Rendering in Production
**Goal:** Diagnose and fix why the logo doesn't render properly in production environment.

**Current Issue:**
- Logo displays correctly in development
- Fails to render in production builds

**Potential Causes:**
- Path resolution issues
- Image optimization problems
- Build process differences
- CDN/static asset serving issues

**Target:**
- Logo renders consistently across all environments
- Proper fallback handling if needed

---

### 4. Wire Up Contact Modal to Email Service
**Goal:** Connect the contact modal to a real email inbox using a simple, free service.

**Requirements:**
- Simple implementation (can enhance later)
- Free email service integration
- Form submissions reach actual inbox
- Basic validation and success feedback

**Options:**
- EmailJS (free tier available)
- Netlify Forms (if using Netlify)
- Formspree (free tier)
- Resend (free tier)
- Custom API route with service like SendGrid

**Target:**
- Functional contact form
- Email delivery to designated inbox
- User feedback on form submission
- Basic spam protection
