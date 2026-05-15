import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { LangProvider } from "./context/LangContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
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
    <html lang="en">
      <body
        className={nunito.className}
        style={{ margin: 0, padding: 0}}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}