import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import FloatingCTA from "./components/FloatingCTA";
import ScrollProgressBar from "./components/ScrollProgressBar";
import TrackingScripts from "./components/TrackingScripts";
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
    "Ocean Breeze is a luxury waterfront villa for sale in Turks & Caicos, offered at $6,500,000 with 6,000 interior square feet, a pool, terrace, private dock, and sweeping Chalk Sound views.",
  openGraph: {
    title: "Ocean Breeze · Luxury Waterfront Villa for Sale · Turks & Caicos",
    description:
      "Ocean Breeze is a luxury waterfront villa for sale in Turks & Caicos, offered at $6,500,000 with 6,000 interior square feet, a pool, terrace, private dock, and sweeping Chalk Sound views.",
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
      <head>
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M4QH7ST5');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4QH7ST5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <FloatingCTA />
        <ScrollProgressBar />
        <TrackingScripts />
      </body>
    </html>
  );
}
