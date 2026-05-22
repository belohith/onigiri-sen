import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { LangProvider } from "./context/LangContext";
import "./globals.css";
import Footer from "./components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Onigiri Sen",
  description: "Japan's Tradition. Scaled for America.",
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
    </html>
  );
}