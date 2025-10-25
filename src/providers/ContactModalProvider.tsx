"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "@/components/modals/ContactModal";

interface ContactModalContextType {
  openContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={{ openContactModal: () => setIsOpen(true) }}>
      {children}
      <ContactModal open={isOpen} onOpenChange={setIsOpen} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

