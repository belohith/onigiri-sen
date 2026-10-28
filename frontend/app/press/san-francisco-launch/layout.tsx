import type { Metadata } from "next";

const title = "Onigiri Sen Brings Fresh Onigiri to T&T's New San Francisco Store";
const description =
  "Six flavors, including the debut of Mentaiko Mayo, arrive on opening day at T&T Supermarket San Francisco (City Center), Nov. 5, 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/press/san-francisco-launch" },
  openGraph: {
    title,
    description,
    url: "/press/san-francisco-launch",
    siteName: "Onigiri Sen",
    type: "article",
    locale: "en_US",
    images: [{ url: "/images/og-sf-launch.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-sf-launch.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
