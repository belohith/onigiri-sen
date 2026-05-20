"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { useLang } from "../context/LangContext";

// Use useLayoutEffect on client, useEffect on server (avoids SSR warning)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  // Start with true so SSR renders hamburger — avoids flash of desktop nav on mobile
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const navLinks = [
    { href: "/products",  en: "Products",  ja: "商品" },
    { href: "/our-story", en: "Our Story", ja: "私たちについて" },
    { href: "/wholesale", en: "Wholesale", ja: "卸売" },
    { href: "/contact",   en: "Contact",   ja: "お問い合わせ" },
  ];

  // Don't render nav until mounted to avoid hydration mismatch
  const showDesktop = mounted && !isMobile;
  const showMobile  = mounted && isMobile;

  return (
    <>
      <header style={{ display:"flex", alignItems:"center", padding:"0 24px", height:72, position:"sticky", top:0, zIndex:100, gap:16, background:"transparent" }}>

        {/* Logo */}
        <Link
          href="/"
          style={{ display:"flex", alignItems:"center", textDecoration:"none", marginRight:"auto", flexShrink:0, backgroundColor:"#ffffff", border:"1px solid #e8ddd4", borderRadius:18, height:56, padding:"0 8px" }}
        >
          <img src="/images/logo.png" alt="Onigiri Sen" width={240} height={60} style={{ display:"block" }} />
        </Link>

        {/* Desktop: nav + lang toggle */}
        {showDesktop && (
          <>
            <nav style={{ display:"flex", alignItems:"center", backgroundColor:"#ffffff", border:"1px solid #e8ddd4", borderRadius:18, height:56, padding:"0 8px", flexShrink:0 }}>
              {navLinks.map(({ href, en, ja }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{ fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:15, color:isActive?"#e07070":"#5a3020", textDecoration:"none", padding:"0 28px", height:"100%", display:"flex", alignItems:"center", borderRadius:14, whiteSpace:"nowrap" }}
                  >
                    {lang === "en" ? en : ja}
                  </Link>
                );
              })}
            </nav>
            {/* Desktop lang toggle */}
            <div style={{ display:"flex", alignItems:"center", backgroundColor:"#ffffff", border:"1px solid #e8ddd4", borderRadius:18, height:56, padding:"0 8px", gap:2, flexShrink:0 }}>
              {(["en", "ja"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{ fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:15, border:"none", borderRadius:14, padding:"0 20px", height:40, cursor:"pointer", background:lang===l?"#e8847a":"transparent", color:lang===l?"#fff":"#5a3020", transition:"all 0.2s", whiteSpace:"nowrap" }}
                >
                  {l === "en"
                    ? <span>EN <span style={{ opacity:lang===l?0.85:0.6, fontWeight:400, fontSize:13 }}>· 英語</span></span>
                    : <span>JP <span style={{ opacity:lang===l?0.85:0.6, fontWeight:400, fontSize:13 }}>· 日本語</span></span>
                  }
                </button>
              ))}
            </div>
          </>
        )}

        {/* Mobile/tablet: hamburger only */}
        {showMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{ background:"#fff", border:"1px solid #e8ddd4", borderRadius:14, cursor:"pointer", padding:"0 14px", display:"flex", alignItems:"center", justifyContent:"center", height:56, flexShrink:0 }}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="3" y1="3" x2="19" y2="19" stroke="#555" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="#555" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="2" y1="6"  x2="20" y2="6"  stroke="#555" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="2" y1="11" x2="20" y2="11" stroke="#555" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="2" y1="16" x2="20" y2="16" stroke="#555" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </header>

      {/* Mobile/tablet dropdown */}
      {showMobile && menuOpen && (
        <div style={{ position:"fixed", top:72, left:0, right:0, background:"#fff", borderBottom:"1px solid #f0e8df", zIndex:99, padding:"16px 24px 24px", display:"flex", flexDirection:"column" as const, gap:4, boxShadow:"0 8px 24px rgba(0,0,0,0.08)" }}>

          {navLinks.map(({ href, en, ja }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{ fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:17, color:isActive?"#e07070":"#333", textDecoration:"none", padding:"12px 4px", borderBottom:"1px solid #f5efe8" }}
              >
                {lang === "en" ? en : ja}
              </Link>
            );
          })}

          {/* Language toggle inside menu */}
          <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f5efe8" }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:1.5, color:"#bbb", textTransform:"uppercase" as const, marginBottom:12 }}>
              Language
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {(["en", "ja"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMenuOpen(false); }}
                  style={{ fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:14, border:`2px solid ${lang===l?"#e8847a":"#e8ddd4"}`, borderRadius:12, padding:"10px 24px", cursor:"pointer", background:lang===l?"#e8847a":"#fff", color:lang===l?"#fff":"#5a3020", transition:"all 0.2s" }}
                >
                  {l === "en" ? "EN · 英語" : "JP · 日本語"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}