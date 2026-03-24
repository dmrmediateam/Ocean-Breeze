import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oceanbreezetci.com"),
  title: "Ocean Breeze · Luxury Waterfront Villa for Sale · Turks & Caicos",
  description:
    "Ocean Breeze is a luxury waterfront villa for sale in Turks & Caicos, offered at $6,500,000 with 6,000 interior square feet, a rooftop infinity pool, private dock, and sweeping Chalk Sound views.",
  openGraph: {
    title: "Ocean Breeze · Luxury Waterfront Villa for Sale · Turks & Caicos",
    description:
      "Ocean Breeze is a luxury waterfront villa for sale in Turks & Caicos, offered at $6,500,000 with 6,000 interior square feet, a rooftop infinity pool, private dock, and sweeping Chalk Sound views.",
    images: ["/images/hero-poster.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
