"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Footer() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  const navLinks = [
    { href: "/products",  en: "Products",  ja: "商品" },
    { href: "/our-story", en: "Our Story", ja: "私たちについて" },
    { href: "/wholesale", en: "Wholesale", ja: "卸売" },
    { href: "/media",     en: "Media",     ja: "メディア" },
    { href: "/contact",   en: "Contact",   ja: "お問い合わせ" },
  ];

  return (
    <footer style={{ background:"#2a1a0e", color:"#fff", fontFamily:"DM Sans, sans-serif" }}>

      {/* Main grid — 3 cols desktop, 1 col mobile */}
      <div style={{
        padding: isMobile ? "48px 24px 36px" : "64px 80px 48px",
        display:"grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr",
        gap: isMobile ? 36 : 60,
      }}>

        {/* Brand column */}
        <div>
          <img
            src="/images/logo.png"
            alt="Onigiri Sen"
            style={{ height: isMobile ? 40 : 48, objectFit:"contain" as const, marginBottom:16, background:"white", borderRadius:16 }}
          />
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:14, lineHeight:1.8, margin:"0 0 20px", maxWidth:300 }}>
            {t(
              "Japan's 1,000-year-old tradition, brought to your everyday life. Made fresh daily with the finest ingredients.",
              "日本の1,000年の伝統を、あなたの日常へ。最高の食材で毎日新鮮に製造しています。"
            )}
          </p>
          <div style={{ display:"flex", flexDirection:"column" as const, gap:8 }}>
            <a href="mailto:contact@onigirisen.jp" style={{ color:"rgba(255,255,255,0.6)", fontSize:13, textDecoration:"none" }}>
              contact@onigirisen.jp
            </a>
            <a href="tel:2064458086" style={{ color:"rgba(255,255,255,0.6)", fontSize:13, textDecoration:"none" }}>
              (206) 445-8086
            </a>
            <a href="https://instagram.com/onigirisen.jp" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.6)", fontSize:13, textDecoration:"none" }}>
              Instagram: @onigirisen.jp
            </a>
          </div>
        </div>

        {/* Nav + Legal — side by side on mobile, separate columns on desktop */}
        {isMobile ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            {/* Navigation */}
            <div>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase" as const, marginBottom:16 }}>
                {t("Navigation","ナビゲーション")}
              </div>
              <div style={{ display:"flex", flexDirection:"column" as const, gap:10 }}>
                {navLinks.map(({ href, en, ja }) => (
                  <Link key={href} href={href} style={{ color:"rgba(255,255,255,0.75)", fontSize:14, textDecoration:"none", fontWeight:500 }}>
                    {lang === "en" ? en : ja}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase" as const, marginBottom:16 }}>
                {t("Legal","法的情報")}
              </div>
              <div style={{ display:"flex", flexDirection:"column" as const, gap:10 }}>
                <a href="/onigiri-tc.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.75)", fontSize:14, textDecoration:"none", fontWeight:500 }}>
                  {t("Terms & Conditions","利用規約")}
                </a>
                <a href="/onigiri-pp.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.75)", fontSize:14, textDecoration:"none", fontWeight:500 }}>
                  {t("Privacy Policy","プライバシーポリシー")}
                </a>
                <Link href="/wholesale" style={{ color:"rgba(255,255,255,0.75)", fontSize:14, textDecoration:"none", fontWeight:500 }}>
                  {t("Wholesale Inquiry","卸売のお問い合わせ")}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Navigation column */}
            <div>
              <div style={{ fontWeight:700, fontSize:13, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase" as const, marginBottom:20 }}>
                {t("Navigation","ナビゲーション")}
              </div>
              <div style={{ display:"flex", flexDirection:"column" as const, gap:12 }}>
                {navLinks.map(({ href, en, ja }) => (
                  <Link key={href} href={href} style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
                    {lang === "en" ? en : ja}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal column */}
            <div>
              <div style={{ fontWeight:700, fontSize:13, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase" as const, marginBottom:20 }}>
                {t("Legal","法的情報")}
              </div>
              <div style={{ display:"flex", flexDirection:"column" as const, gap:12 }}>
                <a href="/onigiri-tc.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
                  {t("Terms & Conditions","利用規約")}
                </a>
                <a href="/onigiri-pp.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
                  {t("Privacy Policy","プライバシーポリシー")}
                </a>
                <Link href="/wholesale" style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
                  {t("Wholesale Inquiry","卸売のお問い合わせ")}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", margin: isMobile ? "0 24px" : "0 80px" }} />

      {/* Bottom bar */}
      <div style={{
        padding: isMobile ? "16px 24px" : "20px 80px",
        display:"flex",
        flexDirection: isMobile ? "column" as const : "row" as const,
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent:"space-between",
        gap:8,
      }}>
        <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12 }}>
          © 2026 Onigiri Sen LLC. {t("All rights reserved.","全著作権所有。")}
        </div>
        <div style={{ display:"flex", gap:24 }}>
          <a href="/onigiri-tc.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.4)", fontSize:12, textDecoration:"none" }}>
            {t("Terms","利用規約")}
          </a>
          <a href="/onigiri-pp.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.4)", fontSize:12, textDecoration:"none" }}>
            {t("Privacy","プライバシー")}
          </a>
        </div>
      </div>

    </footer>
  );
}