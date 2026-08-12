"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

const partners = [
  { src:"/images/logo-tt.png",       alt:"T&T Supermarket",           href:"https://www.tntsupermarket.us/eng/" },
  { src:"/images/logo-pcc.png",      alt:"PCC Community Markets",     href:"https://www.pccmarkets.com/" },
  { src:"/images/logo-tmobile.png",  alt:"T-Mobile Park",             href:"https://www.mlb.com/mariners/ballpark" },
  { src:"/images/logo-draegers.png", alt:"Draeger's Market",          href:"https://www.draegers.com/" },
  { src:"/images/logo-eom.png",      alt:"Eat on Monday",             href:"https://www.eatonmonday.com/" },
  // { src:"/images/logo-tc.jpeg",   alt:"Town & County Market",      href:"" }, // removed
  { src:"/images/logo-ack.png",      alt:"Artisan Community Kitchen", href:"https://www.artisancommunitykitchen.com/" },
  { src:"/images/logo-ls.png",       alt:"Lakeside School",           href:"https://www.lakesideschool.org/" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function PartnerLogo({ p, isMobile }: { p: typeof partners[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        border: `1.5px solid ${hovered ? "#ed7e80" : "#e8ddc8"}`,
        borderRadius: isMobile ? 14 : 20,
        padding: isMobile ? "16px 20px" : "24px 32px",
        height: isMobile ? 90 : 140,
        cursor: "pointer",
        textDecoration: "none",
        position: "relative" as const,
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.2s",
        boxShadow: hovered ? "0 4px 20px rgba(237,126,128,0.25)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Shine sweep overlay */}
      <div style={{
        position: "absolute" as const,
        top: 0, left: hovered ? "120%" : "-60%",
        width: "50%", height: "100%",
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
        transition: "left 0.4s ease",
        pointerEvents: "none",
        zIndex: 2,
      }} />
      <img
        src={p.src}
        alt={p.alt}
        style={{
          maxHeight: isMobile ? 56 : 90,
          maxWidth: "100%",
          objectFit: "contain" as const,
          filter: hovered ? "none" : "grayscale(20%)",
          transition: "filter 0.25s, opacity 0.25s",
          opacity: hovered ? 1 : 0.85,
          position: "relative" as const,
          zIndex: 1,
        }}
      />
    </a>
  );
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
        maxWidth: isMobile ? "100%" : 860,
        margin: isMobile ? "0 16px 32px" : "0 auto 48px",
        padding: isMobile ? "0" : "0 80px",
      }}>
        {partners.filter(p => p.href).map((p) => (
          <PartnerLogo key={p.alt} p={p} isMobile={isMobile} />
        ))}
      </div>

      {/* Continuous scroll strip */}
      <div style={{ overflow:"hidden", width:"100%" }}>
        <div style={{
          display:"flex",
          gap:0,
          animation:"scroll-left 40s linear infinite",
          width:"max-content",
          willChange:"transform",
        }}>
          {[0, 1].map((pass) => (
            <div key={pass} style={{ display:"flex", gap:0, flexShrink:0 }}>
              {[1,2,3,4,5,6,7,8].map((i) => (
                <img
                  key={i}
                  src={`/images/partners/roll-${i}.png`}
                  alt=""
                  style={{
                    height: isMobile ? 120 : 180,
                    width:"auto",
                    display:"block",
                    flexShrink:0,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}