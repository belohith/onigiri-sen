"use client";
import Header from "./components/Header";
import Link from "next/link";
import { useLang } from "./context/LangContext";

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Header />
      <main style={{ fontFamily:"Nunito, sans-serif", background:"#fdf4ee", minHeight:"calc(100vh - 72px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"72px 24px 40px" }}>
        <h1 style={{ fontFamily:"Nunito, sans-serif", fontWeight:900, fontSize:"clamp(120px, 20vw, 200px)", color:"#f5c8c0", lineHeight:1, margin:"0 0 24px", letterSpacing:-6 }}>404</h1>

        {/*
          Replace the div below with:
          <Image src="/images/sad-onigiri.png" alt="Sad onigiri" width={180} height={190} />
          Image needed: /images/sad-onigiri.png
        */}
        <svg width="180" height="190" viewBox="0 0 180 190" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom:36 }}>
          <path d="M90 10 C50 10, 18 50, 18 95 C18 135, 48 158, 90 158 C132 158, 162 135, 162 95 C162 50, 130 10, 90 10 Z" fill="#ffffff" stroke="#2a2a2a" strokeWidth="2.5"/>
          <rect x="48" y="112" width="84" height="38" rx="4" fill="#1e1e1e"/>
          <ellipse cx="66" cy="168" rx="14" ry="9" fill="#ffffff" stroke="#2a2a2a" strokeWidth="2"/>
          <ellipse cx="114" cy="168" rx="14" ry="9" fill="#ffffff" stroke="#2a2a2a" strokeWidth="2"/>
          <ellipse cx="34" cy="124" rx="13" ry="9" fill="#ffffff" stroke="#2a2a2a" strokeWidth="2"/>
          <ellipse cx="146" cy="124" rx="13" ry="9" fill="#ffffff" stroke="#2a2a2a" strokeWidth="2"/>
          <path d="M70 82 Q73 78 76 82" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M104 82 Q107 78 110 82" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M110 86 Q112 92 110 96 Q108 92 110 86" fill="#a8d8f0"/>
          <ellipse cx="60" cy="92" rx="9" ry="5" fill="#f0a0a0" opacity="0.55"/>
          <ellipse cx="120" cy="92" rx="9" ry="5" fill="#f0a0a0" opacity="0.55"/>
          <rect x="86" y="2" width="3" height="8" rx="1.5" fill="#888"/>
          <ellipse cx="87" cy="2" rx="5" ry="3.5" fill="#c8a080"/>
          <rect x="102" y="6" width="3" height="7" rx="1.5" fill="#888"/>
          <ellipse cx="103" cy="6" rx="5" ry="3.5" fill="#c8a080"/>
        </svg>

        <h2 style={{ fontFamily:"Nunito, sans-serif", fontWeight:800, fontSize:"clamp(22px, 4vw, 32px)", color:"#e07070", lineHeight:1.3, margin:"0 0 16px" }}>
          {t("Oops! Looks like this page got\nlost in translation.","おっと！このページは\n迷子になったようです。")}
        </h2>
        <p style={{ color:"#c0a8a0", fontSize:15, margin:"0 0 52px", lineHeight:1.6 }}>
          {t("The page you're looking for doesn't exist or has been moved.\nLet's get you back on track.",
             "お探しのページは存在しないか、移動されました。\nトップに戻りましょう。")}
        </p>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
          <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#e8847a", color:"#fff", padding:"14px 36px", borderRadius:999, fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:16, textDecoration:"none" }}>
            {t("← Back to Home","← ホームに戻る")}
          </Link>
          <Link href="/products" style={{ display:"inline-flex", alignItems:"center", background:"transparent", color:"#c8b0b0", border:"2px solid #e0ccca", padding:"14px 36px", borderRadius:999, fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:16, textDecoration:"none" }}>
            {t("See Our Products","商品を見る")}
          </Link>
        </div>
      </main>
    </>
  );
}