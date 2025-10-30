import type { Metadata } from "next";
import { Inter, Open_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import Header from "@/components/navigation/Header";
import Footer from "@/sections/Footer";
import { ContactModalProvider } from "@/providers/ContactModalProvider";
import { SITE_NAME, SITE_URL } from "@/config/site";
import "./globals.css";
import ScrollRestorationFix from "@/helpers/client/ScrollRestorationFix";
import AgeGate from "@/components/AgeGate";

// Load fonts and map to CSS variables defined in theme.css
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Premium quality dried cannabis exporter. Consistent, ethical, patient-first.",
  icons: {
    icon: [
      { url: "/hero/logo-header.png", type: "image/png", sizes: "512x512" },
      { url: "/hero/logo-header.png", type: "image/png", sizes: "192x192" },
      { url: "/hero/logo-header.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/hero/logo-header.png",
    apple: "/hero/logo-header.png",
  },
};

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${inter.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased`}>
        <ContactModalProvider>
          <ScrollRestorationFix />
          <AgeGate />
          <Header links={NAV_LINKS} />
          <main className="navbar-offset">{children}</main>
          <Footer links={NAV_LINKS} />
        </ContactModalProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/brand/logo.png`,
            }),
          }}
        />
      </body>
    </html>
  );
}
