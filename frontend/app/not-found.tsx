"use client";
import Header from "./components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "./context/LangContext";

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

export default function NotFound() {
  const { t } = useLang();
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <main style={{
        fontFamily:"DM Sans, sans-serif",
        background:"#fff9f5",
        minHeight:"calc(100vh - 72px)",
        display:"flex",
        flexDirection:"column" as const,
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        padding: isMobile ? "48px 20px 40px" : "72px 24px 40px",
      }}>
        <h1 style={{
          fontFamily:"DM Sans, sans-serif",
          fontWeight:900,
          fontSize:"clamp(96px, 20vw, 200px)",
          color:"#ed7e80",
          lineHeight:1,
          margin:0,
          letterSpacing:-6,
        }}>
          404
        </h1>

        <img
          src="/images/char-nf.png"
          alt="Sad onigiri"
          width={isMobile ? 180 : 275}
          height={isMobile ? 180 : 275}
          style={{ margin: isMobile ? "8px 0" : "0" }}
        />

        <h2 style={{
          fontFamily:"DM Sans, sans-serif",
          fontWeight:800,
          fontSize:"clamp(18px, 4vw, 32px)",
          color:"#ed7e80",
          lineHeight:1.3,
          margin:"0 0 12px",
        }}>
          {t("Oops! Looks like this page got\nlost in translation.","おっと！このページは迷子になってしまったようです。")}
        </h2>

        <p style={{ color:"#ed7e80", fontSize: isMobile ? 14 : 15, margin:"0 0 40px", lineHeight:1.6, maxWidth:440 }}>
          {t(
            "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
            "お探しのページが見つからないか、移動した可能性があります。元の場所へご案内いたします。"
          )}
        </p>

        <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const, justifyContent:"center" }}>
          <Link
            href="/"
            style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", color:"#fff", padding: isMobile ? "12px 28px" : "14px 36px", borderRadius:999, fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize: isMobile ? 14 : 16, textDecoration:"none" }}
          >
            {t("← Back to Home","← ホームに戻る")}
          </Link>
          <Link
            href="/products"
            style={{ display:"inline-flex", alignItems:"center", background:"transparent", color:"#ed7e80", border:"2px solid #ed7e80", padding: isMobile ? "12px 28px" : "14px 36px", borderRadius:999, fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize: isMobile ? 14 : 16, textDecoration:"none" }}
          >
            {t("See Our Products","商品一覧を見る")}
          </Link>
        </div>
      </main>
    </>
  );
}