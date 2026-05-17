"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useLang } from "../context/LangContext";

/*
  Images needed:
    /images/characters-group.png  — the full mascot group illustration
*/

export default function ThankYouPage() {
  const { t } = useLang();
  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff9f5", minHeight:"calc(100vh - 72px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 24px 48px" }}>
        <div style={{ background:"#fff", borderRadius:36, padding:"64px 80px", maxWidth:700, width:"100%", textAlign:"center", boxShadow:"0 8px 48px rgba(0,0,0,0.07)", position:"relative", overflow:"hidden" }}>
          <div style={{ marginBottom:16 }}>
            <span style={{ fontSize:32, color:"#f0a0a0", fontWeight:900, marginRight:12 }}>╲</span>
            <span style={{ fontSize:36, fontWeight:900, color:"#e07070", lineHeight:1.25 }}>
              {t("Thank You for\nReaching Out!","ご連絡\nありがとうございます！")}
            </span>
            <span style={{ fontSize:32, color:"#f0a0a0", fontWeight:900, marginLeft:12 }}>╱</span>
          </div>
          <p style={{ color:"#e07070", fontSize:16, margin:"0 0 44px", lineHeight:1.7 }}>
            {t("We've received your message and will be in touch within 2 business days.",
               "メッセージを受け取りました。2営業日以内にご連絡いたします。")}
          </p>

          {/* Mascot group — replace div with */}
          <div style={{ position:"relative", height:200, marginBottom:44 }}>
            {[
              { top:"5%",  left:"8%",   char:"★", color:"#f5c518", size:22 },
              { top:"22%", left:"14%",  char:"★", color:"#ff8080", size:15 },
              { top:"55%", left:"6%",   char:"⌒", color:"#4ecdc4", size:26 },
              { top:"5%",  right:"10%", char:"★", color:"#f5c518", size:20 },
              { top:"28%", right:"7%",  char:"★", color:"#ff8080", size:16 },
              { top:"55%", right:"5%",  char:"⌒", color:"#4ecdc4", size:26 },
            ].map((d, i) => (
              <span key={i} style={{ position:"absolute", top:d.top, left:(d as any).left, right:(d as any).right, fontSize:d.size, color:d.color, fontWeight:900 }}>{d.char}</span>
            ))}
            {/* Replace this placeholder box with your actual characters-group.png */}
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img src="/images/char-ty.png" alt="Onigiri Sen mascots" width={650} height={350} /> 
            </div>
          </div>

          <Link href="/" style={{ display:"inline-block", background:"#e8847a", color:"#fff", padding:"15px 48px", borderRadius:999, fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:16, textDecoration:"none" }}>
            {t("← Back to Home","← ホームに戻る")}
          </Link>
        </div>
      </main>
    </>
  );
}