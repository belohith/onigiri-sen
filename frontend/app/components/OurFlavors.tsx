"use client";
import { useLang } from "../context/LangContext";
import { useState, useEffect } from "react";

const badgeStyle = (type: string): React.CSSProperties => ({
  width: 44, height: 44, borderRadius: "50%",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  fontSize: 8, fontWeight: 800, textAlign: "center", lineHeight: 1.2, flexShrink: 0,
  background:
    type === "GF" ? "#d4edda" : type === "Vegan" ? "#2d6a4f" :
    type === "Vegetarian" ? "#c8e6c9" : type === "Organic" ? "#fff3cd" : "#f0f0f0",
  color:
    type === "GF" ? "#2d6a4f" : type === "Vegan" ? "#fff" :
    type === "Vegetarian" ? "#1b5e20" : type === "Organic" ? "#856404" : "#555",
  border:
    type === "GF" ? "2px solid #a8d5b5" : type === "Vegan" ? "2px solid #1a4a30" :
    type === "Vegetarian" ? "2px solid #88c898" : type === "Organic" ? "2px solid #d4b84a" : "2px solid #ddd",
});

const badgeLabel: Record<string, string> = {
  GF: "Gluten\nFree", Vegan: "Vegan", Vegetarian: "Vege-\ntarian", Organic: "Organic",
};

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

type Flavor = {
  img: string; mascot: string; nameEn: string; nameJa: string;
  tags: string[]; allergensEn?: string; allergensJa?: string; comingSoon?: boolean;
};

const flavors: Flavor[] = [
  { img:"/images/flavors/spicy-tuna-mayo.png", mascot:"/images/char-stm.png", nameEn:"Spicy Tuna Mayo",            nameJa:"スパイシーツナマヨ",          tags:["GF","Organic"],                  allergensEn:"Fish · Egg · Sesame",      allergensJa:"魚・卵・ごま" },
  { img:"/images/flavors/salmon.png",          mascot:"/images/char-s.png",   nameEn:"Salmon",                     nameJa:"鮭",                          tags:["GF","Organic"],                  allergensEn:"Fish",                     allergensJa:"魚" },
  { img:"/images/flavors/butter-corn.png",     mascot:"/images/char-bc.png",  nameEn:"Butter Corn",                nameJa:"バターコーン",                 tags:["GF","Vegetarian"],               allergensEn:"Dairy",                    allergensJa:"乳製品" },
  { img:"/images/flavors/shrimp-mayo.png",     mascot:"/images/char-sm.png",  nameEn:"Shrimp Mayo",                nameJa:"海老マヨ",                    tags:[],                                allergensEn:"Shellfish · Dairy · Egg",  allergensJa:"甲殻類・乳製品・卵" },
  { img:"/images/flavors/pickled-plum.png",    mascot:"/images/char-pp.png",  nameEn:"Pickled Plum (Ume)",         nameJa:"梅",                          tags:["GF","Vegan","Organic","Vegetarian"], allergensEn:"",                      allergensJa:"" },
  { img:"/images/char-founder.png",            mascot:"/images/char-sscc.png",nameEn:"Smoked Salmon Cream Cheese", nameJa:"スモークサーモンクリームチーズ", tags:["GF"], comingSoon:true },
];

function FlavorCard({ f, lang, t, isMobile }: { f: Flavor; lang: string; t: (en:string,ja:string)=>string; isMobile: boolean }) {
  const mascotSize = isMobile ? 80 : 120;
  const imgSize    = isMobile ? 120 : 180;

  return (
    <div style={{ position:"relative", paddingTop: isMobile ? 40 : 60 }}>
      {/* Mascot circle */}
      <div style={{
        position:"absolute", top:0, left: isMobile ? 6 : 8, zIndex:3,
        width:mascotSize, height:mascotSize, borderRadius:"50%",
        background:"#fff", boxShadow:"0 2px 10px rgba(0,0,0,0.10)",
        display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
      }}>
        <img src={f.mascot} alt="" width={mascotSize - 20} height={mascotSize - 20} style={{ objectFit:"contain" }} />
      </div>

      {/* Card */}
      <div style={{ background:"#fff", borderRadius:20, boxShadow:"0 2px 16px rgba(0,0,0,0.08)", overflow:"hidden", position:"relative" }}>
        {/* Product image */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          padding: isMobile ? "16px 12px 8px" : "24px 20px 12px",
          minHeight: isMobile ? 140 : 220, position:"relative", background:"#fff",
        }}>
          <img
            src={f.img}
            alt={lang === "ja" ? f.nameJa : f.nameEn}
            width={imgSize} height={imgSize}
            style={{ objectFit:"contain", width:imgSize, height:imgSize }}
          />
        </div>

        {/* Name + badges + allergens */}
        <div style={{ padding: isMobile ? "8px 12px 14px" : "10px 18px 20px", minHeight: isMobile ? 80 : 110 }}>
          <div style={{ fontWeight:800, fontSize: isMobile ? 13 : 17, color:"#1a1a1a", marginBottom: isMobile ? 8 : 12, lineHeight:1.3 }}>
            {lang === "ja" ? f.nameJa : f.nameEn}
          </div>

          {!f.comingSoon && (
            <div style={{ display:"flex", gap: isMobile ? 4 : 8, marginBottom: isMobile ? 6 : 10, flexWrap:"wrap" as const, minHeight: isMobile ? 34 : 44 }}>
              {f.tags.map((tag) => (
                <div key={tag} style={{ ...badgeStyle(tag), width: isMobile ? 34 : 44, height: isMobile ? 34 : 44, fontSize: isMobile ? 7 : 8 }}>
                  {badgeLabel[tag] || tag}
                </div>
              ))}
            </div>
          )}

          {f.comingSoon && (
            <div style={{ minHeight: isMobile ? 34 : 44, marginBottom: isMobile ? 6 : 10, display:"flex", alignItems:"center" }}>
              <div style={{ display:"inline-block", background:"#7a6050", color:"#fff", fontSize: isMobile ? 9 : 10, fontWeight:700, borderRadius:999, padding: isMobile ? "4px 10px" : "5px 14px" }}>
                {t("Coming Soon — PCC & T-Mobile Exclusive","近日公開 — PCC・Tモバイル限定")}
              </div>
            </div>
          )}

          {!f.comingSoon && (
            <div style={{ fontSize: isMobile ? 10 : 11, color:"#aaa", fontWeight:500, minHeight: isMobile ? 14 : 16 }}>
              {(f.allergensEn || f.allergensJa) ? (lang === "ja" ? `含む：${f.allergensJa}` : `Contains: ${f.allergensEn}`) : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OurFlavors() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  return (
    <section style={{ background:"#fff9f5" }}>
      {/* Top scallop */}
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ display:"block", width:"100%", height: isMobile ? 28 : 52, marginBottom:-1 }}>
        <path d="M0,26 C80,52 160,0 240,26 C320,52 400,0 480,26 C560,52 640,0 720,26 C800,52 880,0 960,26 C1040,52 1120,0 1200,26 C1280,52 1360,0 1440,26 L1440,52 L0,52 Z" fill="#ffefc8" />
      </svg>

      <div style={{ background:"#ffefc8", padding: isMobile ? "20px 16px 40px" : "28px 48px 52px" }}>
        <h2 style={{
          textAlign:"center", fontWeight:900, fontSize: isMobile ? 18 : 25,
          letterSpacing:3, color:"#6f471c", margin:"0 0 20px", textTransform:"uppercase" as const,
        }}>
          {t("OUR FLAVORS","フレーバー")}
        </h2>

        {/* 3 cols desktop → 2 cols mobile */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: isMobile ? 10 : 14,
          maxWidth: isMobile ? "100%" : 800,
          margin:"0 auto",
        }}>
          {flavors.map((f) => (
            <FlavorCard key={f.nameEn} f={f} t={t} lang={lang} isMobile={isMobile} />
          ))}
        </div>

        <p style={{ paddingTop: isMobile ? 28 : 40, textAlign:"center", color:"#6f471c", fontSize: isMobile ? 12 : 16, lineHeight:1.75, margin:0 }}>
          {t(
            "Made fresh daily. \n Best consumed on the same day. Keep refrigerated.",
            "※毎日作りたてをお届けしています。\n※鮮度を保つため冷蔵保存し、当日中にお召し上がりください。"
          )}
        </p>
      </div>

      {/* Bottom scallop */}
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ display:"block", width:"100%", height: isMobile ? 28 : 52, marginTop:-1 }}>
        <path d="M0,26 C80,0 160,52 240,26 C320,0 400,52 480,26 C560,0 640,52 720,26 C800,0 880,52 960,26 C1040,0 1120,52 1200,26 C1280,0 1360,52 1440,26 L1440,0 L0,0 Z" fill="#ffefc8" />
      </svg>
    </section>
  );
}