# src/ - Shared Systems

This covers src-level shared concerns: config, providers, hooks, helpers, styles, and middleware.

## Directory Overview

```
src/
├── config/          # Site constants, nav config
├── providers/       # React context providers
├── hooks/           # Custom React hooks
├── helpers/client/  # Client-side utilities
├── styles/          # CSS variables, motion styles
├── middleware.ts    # Auth middleware
└── [app, lib, components, sections, data - see their Claude.md]
```

---

## config/

### site.ts
```ts
export const SITE_NAME = "Apigen";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export function isProductionEnv(): boolean  // Checks VERCEL_ENV or NODE_ENV
```

### nav.config.ts
Navigation structure definitions used by Header and Footer.

---

## providers/

### ContactModalProvider.tsx
Global context for opening the contact modal from anywhere in the app.

```tsx
// In any component
import { useContactModal } from "@/providers/ContactModalProvider";

const { openContactModal } = useContactModal();
<button onClick={openContactModal}>Contact Us</button>
```

Wraps the entire app in `layout.tsx`.

---

## hooks/

### useScrolled.ts
Returns boolean when page scrolls past threshold. Used by Header for glass effect.

```tsx
const scrolled = useScrolled(50); // true if scrolled > 50px
```

---

## helpers/client/

### ScrollRestorationFix.tsx
Client component fixing Next.js scroll restoration. Loaded in root layout.

---

## styles/

### theme.css
CSS custom properties for the design system:
- `--font-sans`, `--font-body`, `--font-mono`, `--font-serif`
- Color tokens, spacing scale
- Tailwind v4 `@theme` integration

### motion.ts & motion.css
Animation constants and shared transition values.

---

## middleware.ts

Protects `/admin/*` and `/api/admin/*` routes.

### Auth Flow
1. Skip auth for `/admin/login`
2. Create Supabase server client with cookies
3. Check session via `getUser()`
4. Check admin role via `is_admin()` RPC
5. Redirect to login if unauthorized

### Configuration
```ts
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

### Debugging Auth Issues
- Check browser cookies
- Verify session not expired
- Confirm `app_users` table has `user_id` with `role = 'admin'`

---

## Header Context

`Header.tsx` exports `HeaderProvider` and `useHeader()` for controlling header visibility (e.g., hiding during modals).

```tsx
const { hidden, setHidden } = useHeader();
```

Wrapped in layout.tsx via `HeaderProvider`.
