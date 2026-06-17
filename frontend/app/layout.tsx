import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LangProvider } from "./context/LangContext";
import "./globals.css";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Onigiri Sen",
  description: "Japan's Tradition. Scaled for America.",

  openGraph: {
    title: "Onigiri Sen",
    description: "Fresh Japanese onigiri, made daily.",
    url: "https://onigiri-sen.vercel.app",
    siteName: "Onigiri Sen",

    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Onigiri Sen",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Onigiri Sen",
    description: "Fresh Japanese onigiri, made daily.",
    images: ["/images/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={dmSans.className}
        style={{ margin: 0, padding: 0, overflowX: "hidden", width: "100%" }}
      >
        <LangProvider>{children}
          <Footer />
        </LangProvider>
        
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}