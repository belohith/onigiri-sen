"use client";
import Header from "../components/Header";
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

export default function ThankYouPage() {
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
        alignItems:"center",
        justifyContent:"center",
        padding: isMobile ? "48px 16px 32px" : "80px 24px 48px",
      }}>
        <div style={{
          background:"#fff",
          borderRadius: isMobile ? 24 : 36,
          padding: isMobile ? "36px 24px 40px" : "64px 80px",
          maxWidth:700,
          width:"100%",
          textAlign:"center",
          boxShadow:"0 8px 48px rgba(0,0,0,0.07)",
          position:"relative" as const,
          overflow:"hidden",
        }}>

          {/* Heading */}
          <div style={{ marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap: isMobile ? 4 : 12 }}>
            {!isMobile && <span style={{ fontSize:32, color:"#f0a0a0", fontWeight:900 }}>╲</span>}
            <span style={{ fontSize: isMobile ? 26 : 36, fontWeight:900, color:"#e07070", lineHeight:1.25 }}>
              {t("Thank You for\nReaching Out!","ご連絡\nありがとうございます！")}
            </span>
            {!isMobile && <span style={{ fontSize:32, color:"#f0a0a0", fontWeight:900 }}>╱</span>}
          </div>

          <p style={{ color:"#e07070", fontSize: isMobile ? 14 : 16, margin:"0 0 36px", lineHeight:1.7 }}>
            {t("We've received your message and will be in touch within 2 business days.",
               "メッセージを受け取りました。2営業日以内にご連絡いたします。")}
          </p>

          {/* Mascot */}
          <div style={{ position:"relative" as const, height: isMobile ? 140 : 200, marginBottom: isMobile ? 32 : 44 }}>
            {!isMobile && [
              { top:"5%",  left:"8%",   char:"★", color:"#f5c518", size:22 },
              { top:"22%", left:"14%",  char:"★", color:"#ff8080", size:15 },
              { top:"55%", left:"6%",   char:"⌒", color:"#4ecdc4", size:26 },
              { top:"5%",  right:"10%", char:"★", color:"#f5c518", size:20 },
              { top:"28%", right:"7%",  char:"★", color:"#ff8080", size:16 },
              { top:"55%", right:"5%",  char:"⌒", color:"#4ecdc4", size:26 },
            ].map((d, i) => (
              <span key={i} style={{ position:"absolute", top:d.top, left:(d as any).left, right:(d as any).right, fontSize:d.size, color:d.color, fontWeight:900 }}>{d.char}</span>
            ))}
            <div style={{ position:"absolute" as const, inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img
                src="/images/char-ty.png"
                alt="Onigiri Sen mascots"
                style={{ height: isMobile ? 130 : 200, width:"auto", objectFit:"contain" }}
              />
            </div>
          </div>

          <Link
            href="/"
            style={{
              display:"inline-block",
              background:"#e8847a",
              color:"#fff",
              padding: isMobile ? "13px 32px" : "15px 48px",
              borderRadius:999,
              fontFamily:"DM Sans, sans-serif",
              fontWeight:700,
              fontSize: isMobile ? 14 : 16,
              textDecoration:"none",
            }}
          >
            {t("← Back to Home","← ホームに戻る")}
          </Link>
        </div>
      </main>
    </>
  );
}