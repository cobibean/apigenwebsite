# src/app/api/ - API Routes

Next.js API routes for server-side operations.

## Route Inventory

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form submission |
| `/api/preview` | GET | Enable draft mode |
| `/api/admin/images/unused/delete` | DELETE | Clean orphaned images |

---

## Contact Form (/api/contact)

### Endpoint
`POST /api/contact`

### Request Body
```json
{
  "name": "John Doe",
  "company": "Acme Inc",
  "email": "john@example.com",
  "country": "Canada",
  "message": "Hello..."
}
```

### Flow
1. Validate required fields
2. Save to JSON file (`/tmp` on Vercel, `data/` locally)
3. Send email via Resend API
4. Return success/error

### Response
```json
// Success (200)
{ "success": true, "id": "1234567890" }

// Validation error (400)
{ "error": "All fields are required" }

// Email failure (502)
{ "error": "Failed to send notification email" }

// Server error (500)
{ "error": "Failed to process submission" }
```

### Environment Variables
| Variable | Required | Default |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | - |
| `CONTACT_EMAIL` | No | `sunny@apigen.ca` |
| `RESEND_FROM_EMAIL` | No | `onboarding@resend.dev` |

### Testing
```bash
npm test  # Runs tests/contactRoute.test.ts
```

---

## Preview Mode (/api/preview)

### Endpoint
`GET /api/preview?secret=YOUR_SECRET`

### Flow
1. Check `secret` param against `PREVIEW_SECRET` env var
2. Enable Next.js draft mode
3. Redirect to `/`

### Usage
```
https://yoursite.com/api/preview?secret=your-preview-secret
```

Enables draft mode for previewing unpublished content.

---

## Admin Images Cleanup (/api/admin/images/unused/delete)

### Endpoint
`DELETE /api/admin/images/unused/delete`

### Auth
Protected by middleware. Requires admin session.

### Flow
1. Query all images from `images` table
2. Find images not referenced by any `carousel_items`
3. Delete from Supabase Storage
4. Delete from `images` table

### Response
```json
{ "deleted": 5 }
```

---

## API Patterns

### Creating New Routes

```ts
// src/app/api/my-route/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Handle GET
  return NextResponse.json({ data: "..." });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Handle POST
  return NextResponse.json({ success: true });
}
```

### Using Supabase Server Client

```ts
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "DB unavailable" }, { status: 500 });
  }
  
  const { data, error } = await supabase.from("table").select("*");
  // ...
}
```

### Error Response Pattern

```ts
// Validation error
return NextResponse.json({ error: "Invalid input" }, { status: 400 });

// Auth error
return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// Server error
return NextResponse.json({ error: "Internal error" }, { status: 500 });
```

### Protected Routes

Routes under `/api/admin/*` are protected by middleware.
Check `src/middleware.ts` for auth logic.
