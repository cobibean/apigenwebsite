import type { Metadata } from "next";
import { Inter, Open_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Load fonts and map to CSS variables defined in theme.css
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Apigen",
  description: "Premium quality dried cannabis exporter. Consistent, ethical, patient-first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${inter.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
