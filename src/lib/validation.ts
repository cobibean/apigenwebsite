export type ValidationErrors = Record<string, string>;

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  country: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!validateRequired(data.name)) {
    errors.name = "Name is required";
  }

  if (!validateRequired(data.company)) {
    errors.company = "Company is required";
  }

  if (!validateRequired(data.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!validateRequired(data.country)) {
    errors.country = "Country is required";
  }

  if (!validateRequired(data.message)) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

