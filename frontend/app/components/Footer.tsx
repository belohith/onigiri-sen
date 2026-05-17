// components/Footer.tsx
"use client";
import Link from "next/link";
import { useLang } from "../context/LangContext";

export default function Footer() {
  const { t, lang } = useLang();

  const navLinks = [
    { href: "/products",  en: "Products",  ja: "商品" },
    { href: "/our-story", en: "Our Story", ja: "私たちについて" },
    { href: "/wholesale", en: "Wholesale", ja: "卸売" },
    { href: "/contact",   en: "Contact",   ja: "お問い合わせ" },
  ];

  return (
    <footer style={{ background:"#2a1a0e", color:"#fff", fontFamily:"DM Sans, sans-serif" }}>
      
      {/* Main footer content */}
      <div style={{ padding:"64px 80px 48px", display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:60 }}>
        
        {/* Brand column */}
        <div>
          <img src="/images/logo.png" alt="Onigiri Sen" style={{ height:48, objectFit:"contain", marginBottom:20, filter:"brightness(0) invert(1)" }} />
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:14, lineHeight:1.8, margin:"0 0 24px", maxWidth:300 }}>
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

        {/* Navigation column */}
        <div>
          <div style={{ fontWeight:700, fontSize:13, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase" as const, marginBottom:20 }}>
            {t("Navigation","ナビゲーション")}
          </div>
          <div style={{ display:"flex", flexDirection:"column" as const, gap:12 }}>
            {navLinks.map(({ href, en, ja }) => (
              <Link
                key={href}
                href={href}
                style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}
              >
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
            <Link href="/terms" style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
              {t("Terms & Conditions","利用規約")}
            </Link>
            <Link href="/privacy" style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
              {t("Privacy Policy","プライバシーポリシー")}
            </Link>
            <Link href="/wholesale" style={{ color:"rgba(255,255,255,0.75)", fontSize:15, textDecoration:"none", fontWeight:500 }}>
              {t("Wholesale Inquiry","卸売のお問い合わせ")}
            </Link>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", margin:"0 80px" }} />

      {/* Bottom bar */}
      <div style={{ padding:"20px 80px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" as const, gap:12 }}>
        <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13 }}>
          © 2026 Onigiri Sen. {t("All rights reserved.","全著作権所有。")}
        </div>
        <div style={{ display:"flex", gap:24 }}>
          <Link href="/terms" style={{ color:"rgba(255,255,255,0.4)", fontSize:12, textDecoration:"none" }}>
            {t("Terms","利用規約")}
          </Link>
          <Link href="/privacy" style={{ color:"rgba(255,255,255,0.4)", fontSize:12, textDecoration:"none" }}>
            {t("Privacy","プライバシー")}
          </Link>
        </div>
      </div>

    </footer>
  );
}