"use client";
import Header from "../components/Header";
import OurFlavors from "../components/OurFlavors";
import FindUsNearYou from "../components/Findusnearyou";
import { useLang } from "../context/LangContext";
import Link from "next/link";
import { useState, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mounted ? isMobile : true;
}

export default function ProductsPage() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  const ingredients = [
    {
      src:"/images/ingredient-rice.png",
      title:t("The Power of a Single Grain.","命を支える、一粒の力。"),
      body:t(
        "Our carefully selected rice is prepared using Japan's leading state-of-the-art cooking technology. This ensures a light, fluffy texture that gently melts in your mouth with every single bite.",
        "厳選されたお米を、日本最先端の炊飯システムで炊き上げ。一口ごとに軽やかでふっくらとした、口の中でほどける食感を実現しています。"
      ),
    },
    {
      src:"/images/ingredient-nori.png",
      title:t("Authentic Ariake Bay Nori","香り豊かな、有明海産の高級海苔"),
      body:t(
        "Harvested from Japan's finest waters, our nori is chosen for its superior crispness and deep, umami flavor.",
        "日本最高峰の漁場として知られる有明海で育まれた海苔を厳選。その特筆すべきパリパリ感と深い旨みが、おにぎりの味を引き立てます。"
      ),
    },
    {
      src:"/images/ingredient-dietary.png",
      title:t("Dietary Friendly Options","多様なライフスタイルへの対応"),
      body:t(
        "We believe in inclusive eating. Discover our selection of Organic, Vegan, and Vegetarian choices tailored for your lifestyle.",
        "私たちは「食の多様性」を大切にしています。オーガニック、ヴィーガン、ベジタリアン、グルテンフリーなど、お客様のライフスタイルに寄り添う選択肢をご用意しています。"
      ),
    },
  ];

  const dietary = [
    { label:t("Gluten-Free (GF)","グルテンフリー (GF)"), lc:"#fff", lb:"#8faa3a", ic:"#5a8a20", items:t("Salmon · Spicy Tuna Mayo · Ume","鮭 ・ スパイシーツナマヨ ・ 梅") },
    { label:t("Vegan","ヴィーガン"),                       lc:"#fff", lb:"#2d6a4f", ic:"#2d6a4f", items:t("Ume","梅") },
    { label:t("Vegetarian","ベジタリアン"),                 lc:"#fff", lb:"#5aaa3a", ic:"#3a8a20", items:t("Ume · Butter Corn","梅 ・ バターコーン") },
    { label:t("Organic","オーガニック"),                    lc:"#fff", lb:"#d4a017", ic:"#b88000", items:t("Salmon · Spicy Tuna Mayo · Ume","鮭 ・ スパイシーツナマヨ ・ 梅") },
  ];

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff", marginTop:72 }}>

        {/* ── HERO ── */}
        <section style={{ background:"#fff9f5", textAlign:"center", padding: isMobile ? "56px 24px 0" : "72px 80px 0", whiteSpace:"pre-line" }}>
          <h1 style={{ fontWeight:800, fontSize: isMobile ? 24 : 30, color:"#6f471c", margin:"0 0 12px" }}>
            {t("Products","商品一覧")}
          </h1>
          <p style={{ fontWeight:500, fontSize: isMobile ? 14 : 15, color:"#6f471c", margin:"0 0 12px" }}>
            {t("Simple. Authentic. Delicious.","シンプルに、本物を。本当においしいおにぎりを。")}
          </p>
          <p style={{ fontWeight:200, color:"#6f471c", fontSize:13, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
            {t(
              "Each Onigiri Sen rice ball is made with premium rice, wrapped in Ariake nori, and filled with carefully sourced ingredients. Pure craftsmanship in every bite.",
              "厳選されたプレミアム米、パリッと香る有明海苔、そして丁寧に選び抜いた具材。\n一口ごとに、Onigiri Sen のこだわりが広がります。"
            )}
          </p>
        </section>

        {/* ── FLAVORS ── */}
        <OurFlavors />

        {/* ── SELECTED INGREDIENTS ── */}
        <section style={{ padding: isMobile ? "48px 20px 64px" : "80px 80px 100px", background:"#fff9f5" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize: isMobile ? 22 : 32, color:"#6f3a14", letterSpacing:0.2, margin:"0 0 40px", lineHeight:1.2 }}>
            {t("Selected Ingredients, Inclusive Choices","厳選された食材、多様な選択肢")}
          </h2>

          {isMobile ? (
            /* Mobile: image left, content right in one row */
            <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:500, margin:"0 auto" }}>
              {ingredients.map((item) => (
                <div key={item.title} style={{ display:"flex", alignItems:"center", gap:16, background:"#ffefc8", borderRadius:20, padding:"16px" }}>
                  {/* Circle image */}
                  <div style={{ width:90, height:90, borderRadius:"50%", overflow:"hidden", background:"#fff", flexShrink:0, boxShadow:"0 2px 10px rgba(0,0,0,0.08)" }}>
                    <img src={item.src} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:800, fontSize:13, color:"#6f471c", marginBottom:6, lineHeight:1.4 }}>
                      {item.title}
                    </div>
                    <p style={{ color:"#6f471c", fontSize:11, lineHeight:1.75, margin:0 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: original circle + card layout */
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:32, maxWidth:900, margin:"0 auto" }}>
              {ingredients.map((item) => (
                <div key={item.title} style={{ display:"flex", flexDirection:"column" as const, alignItems:"center", gap:0 }}>
                  <div style={{ width:190, height:190, borderRadius:"50%", overflow:"hidden", background:"#ffefc8", flexShrink:0, position:"relative" as const, zIndex:1, boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
                    <img src={item.src} alt={item.title} width={190} height={190} style={{ objectFit:"cover", width:"100%", height:"100%" }} />
                  </div>
                  <div style={{ background:"#ffefc8", borderRadius:24, padding:"48px 28px 40px", marginTop:-20, width:"100%", minHeight:260, boxSizing:"border-box" as const, textAlign:"center" as const }}>
                    <div style={{ fontWeight:800, fontSize:14, color:"#6f471c", marginBottom:12, lineHeight:1.4 }}>{item.title}</div>
                    <p style={{ color:"#6f471c", fontSize:13, lineHeight:1.85, margin:0 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── DIETARY INFORMATION ── */}
        <section style={{ background:"#ed7e80", padding: isMobile ? "48px 20px" : "72px 80px 80px" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize: isMobile ? 20 : 28, letterSpacing: isMobile ? 2 : 4, color:"#fff", margin:"0 0 32px", textTransform:"uppercase" as const }}>
            {t("DIETARY INFORMATION","食事制限・アレルゲン情報")}
          </h2>
          <div style={{ background:"#fff", borderRadius:20, maxWidth:680, margin:"0 auto", padding:"8px 0" }}>
            {dietary.map((d, i) => (
              <div
                key={d.label}
                style={{
                  display:"flex",
                  flexDirection:"row" as const, // always row — bubble left, content right
                  alignItems:"center",
                  gap: isMobile ? 14 : 28,
                  padding: isMobile ? "14px 16px" : "20px 32px",
                  borderBottom: i < dietary.length-1 ? "1.5px dashed #e4dcd4" : "none",
                }}
              >
                <span style={{
                  background:d.lb, color:d.lc,
                  fontSize: isMobile ? 11 : 14,
                  fontWeight:700, borderRadius:10,
                  padding: isMobile ? "6px 10px" : "8px 20px",
                  whiteSpace:"nowrap" as const, flexShrink:0,
                  minWidth: isMobile ? 120 : 190,
                  textAlign:"center" as const,
                }}>
                  {d.label}
                </span>
                <span style={{ color:d.ic, fontSize: isMobile ? 13 : 17, fontWeight:700 }}>
                  {d.items}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FIND US ── */}
        <FindUsNearYou />

        {/* ── CTA ── */}
        <div style={{ textAlign:"center", padding: isMobile ? "40px 20px 64px" : "48px 0 64px", background:"#fff9f5" }}>
          <p style={{ color:"#6f471c", fontSize: isMobile ? 14 : 16, fontWeight:600, margin:"0 0 20px", lineHeight:1.7 }}>
            {t("Taste the tradition for yourself.","伝統の味を、ぜひご自身でお確かめください。")}
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" as const }}>
            <Link href="/our-story" style={{ display:"inline-block", background:"#ed7e80", color:"#fff", padding: isMobile ? "13px 28px" : "16px 48px", borderRadius:999, fontWeight:800, fontSize: isMobile ? 14 : 16, textDecoration:"none", boxShadow:"0 4px 20px rgba(237,126,128,0.35)" }}>
              {t("Read Our Story →","私たちのストーリーを読む →")}
            </Link>
            <Link href="/wholesale" style={{ display:"inline-block", background:"#fff", color:"#6f471c", padding: isMobile ? "13px 28px" : "16px 48px", borderRadius:999, fontWeight:800, fontSize: isMobile ? 14 : 16, textDecoration:"none", border:"2px solid #e8d8b8", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
              {t("Partner With Us →","パートナーシップについて →")}
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}