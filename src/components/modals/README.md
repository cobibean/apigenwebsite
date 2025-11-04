# Modal Components

## Contact Modal

A fully functional contact form modal with client-side validation, ready for backend integration.

## Features

- ✅ All fields required (Name, Company, Email, Country, Message)
- ✅ Client-side validation with field-level error messages
- ✅ Email format validation
- ✅ Success state with confirmation message
- ✅ Glass effect background blur
- ✅ Respects `prefers-reduced-motion`
- ✅ Mobile-responsive design
- ✅ Accessible (ARIA labels, keyboard navigation)

## Usage

### 1. Import the component

```tsx
import ContactModal from "@/components/modals/ContactModal";
import { useState } from "react";
```

### 2. Add state management

```tsx
const [contactModalOpen, setContactModalOpen] = useState(false);
```

### 3. Add the modal to your component

```tsx
<ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
```

### 4. Trigger the modal

```tsx
<button onClick={() => setContactModalOpen(true)}>
  Get in Touch
</button>
```

## Integration Points

The modal should be triggered from:

1. **Header CTA** - "Get in touch" button
2. **Hero CTAs** - Primary and secondary call-to-action buttons
3. **Footer links** - Contact link
4. **CTA sections** - Any "Contact" or "Get in touch" sections

## Example: Header Integration

```tsx
// src/components/navigation/Header.tsx
"use client";
import { useState } from "react";
import ContactModal from "@/components/modals/ContactModal";

export default function Header() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  return (
    <>
      <header>
        {/* ... existing header code ... */}
        <button onClick={() => setContactModalOpen(true)}>
          Get in Touch
        </button>
      </header>
      
      <ContactModal 
        open={contactModalOpen} 
        onOpenChange={setContactModalOpen} 
      />
    </>
  );
}
```

## Backend Integration (TODO)

The modal currently logs form data to the console. To integrate with a backend:

1. Replace the placeholder code in `handleSubmit` (line 53-57 in ContactModal.tsx)
2. Add your API endpoint:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const validationErrors = validateContactForm(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setStatus("submitting");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to submit");

    setStatus("success");
    
    setTimeout(() => {
      setFormData({
        name: "",
        company: "",
        email: "",
        country: "",
        message: "",
      });
      setStatus("idle");
      onOpenChange(false);
    }, 2000);
  } catch (error) {
    setStatus("error");
    console.error("Submission error:", error);
  }
};
```

3. Create the API route at `src/app/api/contact/route.ts`:

```tsx
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  
  // TODO: Add your backend logic here
  // - Validate data server-side
  // - Store in database/Google Sheets
  // - Send email notification
  // - Return success/error response
  
  console.log("Contact form submission:", data);
  
  return NextResponse.json({ success: true });
}
```

## Validation

All validation logic is centralized in `src/lib/validation.ts`:

- `validateEmail()` - Email format validation
- `validateRequired()` - Required field validation
- `validateContactForm()` - Full form validation with error messages

## Styling

The modal uses the site's design tokens from `theme.css`:

- `--card` - Modal background
- `--border` - Input borders
- `--accent` - Focus rings
- `--bg` - Input backgrounds
- `--muted-foreground` - Placeholder text

## Accessibility

- ✅ Proper ARIA labels and descriptions
- ✅ Keyboard navigation (Tab, Escape)
- ✅ Focus trapping when modal is open
- ✅ Screen reader announcements
- ✅ Reduced motion support

---

## Legal Disclaimer Modal

A modal component displaying legal disclaimer content for the website.

### Features

- ✅ Structured legal content with roman numeral numbering
- ✅ Responsive design matching other modals
- ✅ Consistent styling with italic text and proper typography
- ✅ Accessible dialog implementation

### Usage

```tsx
import LegalDisclaimerModal from "@/components/modals/LegalDisclaimerModal";
import { useState } from "react";

const [disclaimerOpen, setDisclaimerOpen] = useState(false);

// In your JSX
<LegalDisclaimerModal open={disclaimerOpen} onOpenChange={setDisclaimerOpen} />
```

---

## Privacy Policy Modal

A modal component displaying the website's privacy policy content.

### Features

- ✅ Comprehensive privacy policy with structured sections
- ✅ Hierarchical content organization with headings and lists
- ✅ Consistent styling matching other legal modals
- ✅ Responsive design with scrollable content

### Usage

```tsx
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import { useState } from "react";

const [privacyOpen, setPrivacyOpen] = useState(false);

// In your JSX
<PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
```

---

## Terms & Conditions Modal

A modal component displaying the website's terms and conditions.

### Features

- ✅ Complete terms and conditions with numbered sections
- ✅ Structured legal content with clear headings
- ✅ Consistent styling and typography
- ✅ Mobile-responsive design

### Usage

```tsx
import TermsAndConditionsModal from "@/components/modals/TermsAndConditionsModal";
import { useState } from "react";

const [termsOpen, setTermsOpen] = useState(false);

// In your JSX
<TermsAndConditionsModal open={termsOpen} onOpenChange={setTermsOpen} />
```

