"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

const partners = [
  { src:"/images/logo-tt.png",      alt:"T&T Supermarket" },
  { src:"/images/logo-pcc.png",     alt:"PCC Community Markets" },
  { src:"/images/logo-tmobile.png", alt:"T-Mobile Park" },
  { src:"/images/logo-tc.jpeg",     alt:"Town & County Market" },
  { src:"/images/logo-km.webp",     alt:"Kitchen Market" },
  { src:"/images/logo-ls.png",      alt:"Lakeside School" },
];

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

export default function TrustedBy() {
  const { t } = useLang();
  const isMobile = useIsMobile();

  return (
    <section style={{ background:"#ffefc8", padding:"44px 0 0" }}>
      <div style={{ textAlign:"center", fontWeight:700, letterSpacing:2, color:"#6f471c", fontSize: isMobile ? 18 : 25, marginBottom: isMobile ? 20 : 28 }}>
        {t("TRUSTED BY","取引先")}
      </div>

      {/* Logo grid — 3 cols desktop, 2 cols mobile */}
      <div style={{
        display:"grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        gap: isMobile ? 12 : 20,
        maxWidth: isMobile ? "100%" : 900,
        margin: isMobile ? "0 16px 32px" : "0 auto 48px",
        padding: isMobile ? "0" : "0 80px",
      }}>
        {partners.map((p) => (
          <div
            key={p.alt}
            style={{
              background:"#fff",
              border:"1.5px solid #e8ddc8",
              borderRadius: isMobile ? 14 : 20,
              padding: isMobile ? "16px 20px" : "24px 32px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              height: isMobile ? 90 : 140,
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              style={{ maxHeight: isMobile ? 56 : 90, maxWidth:"100%", objectFit:"contain" as const }}
            />
          </div>
        ))}
      </div>

      {/* Continuous scroll strip */}
      <div style={{ overflow:"hidden", width:"100%" }}>
        <div
          style={{
            display:"flex",
            gap:0,
            animation:"scroll-left 60s linear infinite",
            width:"max-content",
          }}
        >
          {[...Array(2)].map((_, pass) =>
            [1,2,3,4,5,6,7,8].map((i) => (
              <div key={`${pass}-${i}`} style={{ width: isMobile ? 180 : 280, height: isMobile ? 120 : 180, flexShrink:0, overflow:"hidden" }}>
                <img
                  src={`/images/partners/roll-${i}.png`}
                  alt=""
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}