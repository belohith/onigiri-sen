"use client";
import Header from "./components/Header";
import Link from "next/link";
import { useLang } from "./context/LangContext";

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff9f5", minHeight:"calc(100vh - 72px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"72px 24px 40px" }}>
        <h1 style={{ fontFamily:"DM Sans, sans-serif", fontWeight:900, fontSize:"clamp(120px, 20vw, 200px)", color:"#ed7e80", lineHeight:1, margin:"0", letterSpacing:-6 }}>404</h1>

        {/*
          Replace the div below with:
          <Image src="/images/sad-onigiri.png" alt="Sad onigiri" width={180} height={190} />
          Image needed: /images/sad-onigiri.png
        */}
<img src="/images/char-nf.png" alt="Sad onigiri" width={275} height={275} />
          
        <h2 style={{ fontFamily:"DM Sans, sans-serif", fontWeight:800, fontSize:"clamp(22px, 4vw, 32px)", color:"#ed7e80", lineHeight:1.3, margin:"0 0 16px" }}>
          {t("Oops! Looks like this page got\nlost in translation.","おっと！このページは\n迷子になったようです。")}
        </h2>
        <p style={{ color:"#ed7e80", fontSize:15, margin:"0 0 52px", lineHeight:1.6 }}>
          {t("The page you're looking for doesn't exist or has been moved.\nLet's get you back on track.",
             "お探しのページは存在しないか、移動されました。\nトップに戻りましょう。")}
        </p>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
          <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", color:"#fff", padding:"14px 36px", borderRadius:999, fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:16, textDecoration:"none" }}>
            {t("← Back to Home","← ホームに戻る")}
          </Link>
          <Link href="/products" style={{ display:"inline-flex", alignItems:"center", background:"transparent", color:"#ed7e80", border:"2px solid #ed7e80", padding:"14px 36px", borderRadius:999, fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:16, textDecoration:"none" }}>
            {t("See Our Products","商品を見る")}
          </Link>
        </div>
      </main>
    </>
  );
}