"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { validateContactForm, type ContactFormData, type ValidationErrors } from "@/lib/validation";
import { buttonClass } from "@/lib/utils";
import countries from "world-countries";
import SeedToHarvestSuccess from "@/components/SeedToHarvestSuccess";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showCtas, setShowCtas] = useState(false);

  // Memoize the onDone callback to prevent SeedToHarvestSuccess from re-running its effect
  const handleAnimationDone = React.useCallback(() => {
    setShowCtas(true);
    // Optional: Fire analytics event here
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'contact_submit_success_animated');
    // }
  }, []);

  // Prepare country list with Canada, US, UK at top
  const countryOptions = useMemo(() => {
    const allCountries = countries
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Priority countries
    const priorityCountries = [
      { name: "Canada", code: "CA" },
      { name: "United States", code: "US" },
      { name: "United Kingdom", code: "GB" },
    ];

    // Remove priority countries from the main list
    const otherCountries = allCountries.filter(
      (c) => !["Canada", "United States", "United Kingdom"].includes(c.name)
    );

    return [...priorityCountries, ...otherCountries];
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      // Submit to our API route which handles email + storage
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      
      setStatus("success");
      setShowCtas(false); // Reset CTAs when new success state starts

    } catch (error: unknown) {
      console.error("Form submission error:", error);
      
      setStatus("error");

      // Reset to idle after showing error for 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  const inputClass = "w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm ring-offset-[var(--bg)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const labelClass = "block text-sm font-medium mb-1";
  const errorClass = "text-xs text-red-500 mt-0.5";

  if (status === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-[min(92vw,360px)] sm:max-w-[480px]">
          <div className="flex flex-col items-center justify-center py-6 sm:py-8">
            <SeedToHarvestSuccess onDone={handleAnimationDone} />
            {showCtas && (
              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => {
                    setFormData({
                      name: "",
                      company: "",
                      email: "",
                      country: "",
                      message: "",
                    });
                    setStatus("idle");
                    setShowCtas(false);
                    onOpenChange(false);
                  }}
                  className={buttonClass({ variant: "neutral", size: "lg" })}
                >
                  Back to site
                </button>
                <a
                  href="/cultivars"
                  className={buttonClass({ variant: "olive", size: "lg" })}
                  onClick={() => {
                    setFormData({
                      name: "",
                      company: "",
                      email: "",
                      country: "",
                      message: "",
                    });
                    setStatus("idle");
                    setShowCtas(false);
                    onOpenChange(false);
                  }}
                >
                  Explore Cultivars
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (status === "error") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-[min(92vw,360px)] sm:max-w-[480px]">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-sans)" }}>
              Oops! Something went wrong
            </h3>
            <p className="text-[var(--secondary)] mb-4" style={{ fontFamily: "var(--font-body)" }}>
              We couldn&apos;t send your message. Please try again or contact us directly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className={buttonClass({ variant: "olive", size: "lg" })}
            >
              Try Again
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[min(92vw,380px)] sm:max-w-[520px] max-h-[92vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="text-xl sm:text-2xl" style={{ fontFamily: "var(--font-sans)" }}>
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
            Tell us about your needs and we&apos;ll get back to you within 1–2 business days.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-3.5 mt-3">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="John Doe"
              disabled={status === "submitting"}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="company" className={labelClass}>
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="Acme Inc."
              disabled={status === "submitting"}
            />
            {errors.company && <p className={errorClass}>{errors.company}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="john@example.com"
              disabled={status === "submitting"}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="country" className={labelClass}>
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass}
              disabled={status === "submitting"}
            >
              <option value="">Select a country</option>
              {countryOptions.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className={errorClass}>{errors.country}</p>}
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="Tell us about your market, timeline, and what you&apos;re looking for..."
              disabled={status === "submitting"}
            />
            {errors.message && <p className={errorClass}>{errors.message}</p>}
          </div>

          <div className="flex gap-3 pt-1.5">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={buttonClass({ variant: "neutral", size: "lg" })}
              disabled={status === "submitting"}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={buttonClass({ variant: "olive", size: "lg" })}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
