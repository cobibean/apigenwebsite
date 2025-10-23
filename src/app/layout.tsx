import type { Metadata } from "next";
import { Inter, Open_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import Header from "@/components/navigation/Header";
import Footer from "@/sections/Footer";
import localContentSource from "@/providers/local";
import { SITE_NAME, SITE_URL } from "@/config/site";
import "./globals.css";
import ScrollRestorationFix from "@/helpers/client/ScrollRestorationFix";

// Load fonts and map to CSS variables defined in theme.css
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Premium quality dried cannabis exporter. Consistent, ethical, patient-first.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await localContentSource.getMenu();
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${inter.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased`}>
        <ScrollRestorationFix />
        <Header />
        <main className="pt-0">{children}</main>
        <Footer links={menu} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
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
