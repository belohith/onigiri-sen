"use client";
import Header from "../components/Header";
import { useLang } from "../context/LangContext";
import { useState } from "react";

/*
  Images needed in /public/images/:
    flavor-spicy-tuna.jpg, flavor-salmon.jpg, flavor-butter-corn.jpg,
    flavor-shrimp.jpg, flavor-ume.jpg, flavor-smoked-salmon.jpg
    mascot-bear.png, mascot-brown-bear.png, mascot-corn.png,
    mascot-shrimp.png, mascot-umeboshi.png, mascot-salmon.png
    ingredient-rice.jpg, ingredient-nori.jpg, ingredient-dietary.jpg
    mascot-searching.png
*/

/* Circular dietary badge */
const badgeStyle = (type: string): React.CSSProperties => ({
  width:44, height:44, borderRadius:"50%",
  display:"inline-flex", alignItems:"center", justifyContent:"center",
  fontSize:8, fontWeight:800, textAlign:"center" as const, lineHeight:1.2,
  flexShrink:0,
  background:
    type==="GF"?"#d4edda":type==="Vegan"?"#2d6a4f":
    type==="Vegetarian"?"#c8e6c9":type==="Organic"?"#fff3cd":"#f0f0f0",
  color:
    type==="GF"?"#2d6a4f":type==="Vegan"?"#fff":
    type==="Vegetarian"?"#1b5e20":type==="Organic"?"#856404":"#555",
  border:
    type==="GF"?"2px solid #a8d5b5":type==="Vegan"?"2px solid #1a4a30":
    type==="Vegetarian"?"2px solid #88c898":type==="Organic"?"2px solid #d4b84a":"2px solid #ddd",
});

const badgeLabel: Record<string,string> = {
  GF:"GlutenFree", Vegan:"Vegan", Vegetarian:"Vegetarian", Organic:"Organic",
};

function FlavorCard({ f, t, lang }: { f: any; t:(en:string,ja:string)=>string; lang:string }) {
  return (
    <div style={{ position:"relative", paddingTop:60 }}>
      {/* Mascot — large circle top-left, white bg, shadow */}
      <div
        style={{
          position:"absolute", top:0, left:8, zIndex:3,
          width:120, height:120, borderRadius:"50%",
          background:"#fff", boxShadow:"0 2px 10px rgba(0,0,0,0.10)",
          display:"flex", alignItems:"center", justifyContent:"center",
          overflow:"hidden",
        }}
      >
        <img src={f.mascot} alt="" width={100} height={100} style={{objectFit:"contain"}} />
      </div>

      {/* Card */}
      <div
        style={{
          background:"#fff", borderRadius:20,
          boxShadow:"0 2px 16px rgba(0,0,0,0.08)",
          overflow:"hidden", position:"relative",
        }}
      >
        {/* Product image */}
        <div
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"24px 20px 12px", minHeight:220, position:"relative",
            background:"#fff",
          }}
        >
          {f.comingSoon
            ? <div style={{ width:"100%", height:200, background:"#e8e0d8", borderRadius:12 }} />
            : <img src={f.img} alt={f.nameEn} width={180} height={200} style={{objectFit:"contain"}} />
          }

          {f.comingSoon && (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:18 }}>
              <span style={{ background:"#7a6050", color:"#fff", fontSize:11, fontWeight:700, borderRadius:999, padding:"7px 20px", textAlign:"center" as const }}>
                {t("Coming Soon — PCC and T-mobile Exclusive","近日公開 — PCC・Tモバイル限定")}
              </span>
            </div>
          )}
        </div>

        {/* Name + badges + allergens */}
        <div style={{ padding:"10px 18px 20px" }}>
          <div style={{ fontWeight:800, fontSize:17, color:"#1a1a1a", marginBottom:12, lineHeight:1.3 }}>
            {lang === "ja" ? f.nameJa : f.nameEn}
          </div>
          {!f.comingSoon && f.tags.length > 0 && (
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              {f.tags.map((tag:string) => (
                <div key={tag} style={badgeStyle(tag)}>
                  {badgeLabel[tag]||tag}
                </div>
              ))}
            </div>
          )}
          {(f.allergensEn || f.allergensJa) && (
            <div style={{ fontSize:11, color:"#aaa", fontWeight:500 }}>
              {lang === "ja" ? `含む：${f.allergensJa}` : `Contains: ${f.allergensEn}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const seattleStores = [
  "T&T Supermarket – Bellevue",
  "T&T Supermarket – Richmond",
  "PCC Community Markets – Edmonds",
  "PCC Community Markets – Fremont",
  "PCC Community Markets – Green Lake",
  "T-Mobile Park",
];
const californiaStores = ["Coming soon — San Francisco"];

export default function ProductsPage() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<"seattle"|"california">("seattle");

  const flavors = [
    {
      img:"/images/flavors/spicy-tuna-mayo.png", mascot:"/images/char-stm.png",
      nameEn:"Spicy Tuna Mayo", nameJa:"スパイシーツナマヨ",
      tags:["GF","Organic"], allergensEn:"Fish · Egg · Sesame", allergensJa:"魚・卵・ごま",
    },
    {
      img:"/images/flavors/salmon.png", mascot:"/images/char-s.png",
      nameEn:"Salmon", nameJa:"鮭",
      tags:["GF","Organic"], allergensEn:"Fish", allergensJa:"魚",
    },
    {
      img:"/images/flavors/butter-corn.png", mascot:"/images/char-bc.png",
      nameEn:"Butter Corn", nameJa:"バターコーン",
      tags:["GF","Vegetarian"], allergensEn:"Dairy", allergensJa:"乳製品",
    },
    {
      img:"/images/flavors/shrimp-mayo.png", mascot:"/images/char-sm.png",
      nameEn:"Shrimp Mayo", nameJa:"海老マヨ",
      tags:["GF"], allergensEn:"Shellfish · Dairy · Egg", allergensJa:"甲殻類・乳製品・卵",
    },
    {
      img:"/images/flavors/pickled-plum.png", mascot:"/images/char-pp.png",
      nameEn:"Ume", nameJa:"梅",
      tags:["GF","Vegan","Organic","Vegetarian"], allergensEn:"Fish · Egg · Sesame", allergensJa:"魚・卵・ごま",
    },
    {
      img:"/images/flavor-smoked-salmon.jpg", mascot:"/images/char-sscc.png",
      nameEn:"Smoked Salmon Cream Cheese", nameJa:"スモークサーモンクリームチーズ",
      tags:["GF"], comingSoon:true,
    },
  ];

  const ingredients = [
    {
      src:"/images/ingredient-rice.png",
      title:t("The Power of a Single Grain.","一粒のお米の力。"),
      body:t(
        "Selected medium-grain rice, IH pressure-cooked for a light, fluffy, and satisfying texture in every bite.",
        "選ばれた中粒米をIH圧力炊飯で、軽くふっくらとした食感に仕上げます。"
      ),
    },
    {
      src:"/images/ingredient-nori.png",
      title:t("Authentic Ariake Bay Nori","本物の有明海苔"),
      body:t(
        "Harvested from Japan's finest waters, our nori is chosen for its superior crispness and deep, umami flavor.",
        "日本の最高の海域から収穫された海苔は、その優れたパリパリ感と深い旨味で選ばれています。"
      ),
    },
    {
      src:"/images/ingredient-dietary.png",
      title:t("Dietary Friendly Options","食事制限対応"),
      body:t(
        "We believe in inclusive eating. Discover our selection of Organic, Vegan, and Vegetarian choices tailored for your lifestyle.",
        "すべての人のための食事を信じています。オーガニック、ヴィーガン、ベジタリアンの選択肢をご覧ください。"
      ),
    },
  ];

  // ── CHANGED: dietary colors matched to screenshot ──
  const dietary = [
    { label:t("Gluten-Free (GF)","グルテンフリー（GF）"), lc:"#fff",    lb:"#8faa3a", ic:"#5a8a20", items:t("Salmon · Spicy Tuna Mayo · Ume","サーモン・スパイシーツナマヨ・梅") },
    { label:t("Vegan","ヴィーガン"),                       lc:"#fff",    lb:"#2d6a4f", ic:"#2d6a4f", items:t("Ume","梅") },
    { label:t("Vegetarian","ベジタリアン"),                 lc:"#fff",    lb:"#5aaa3a", ic:"#3a8a20", items:t("Ume · Butter Corn","梅・バターコーン") },
    { label:t("Organic","オーガニック"),                    lc:"#fff",    lb:"#d4a017", ic:"#b88000", items:t("Salmon · Spicy Tuna Mayo · Ume","サーモン・スパイシーツナマヨ・梅") },
  ];

  const stores = activeTab === "seattle" ? seattleStores : californiaStores;

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff" }}>

        {/* ── HERO ── */}
        <section style={{ background:"#fff9f5", textAlign:"center", padding:"72px 80px 0" }}>
          <h1 style={{ fontWeight:800, fontSize:30, color:"#6f471c", margin:"0 0 16px" }}>
            {t("Products","商品")}
          </h1>
          <p style={{ fontWeight:500, fontSize:15, color:"#6f471c", margin:"0 0 16px" }}>
            {t("Simple. Authentic. Delicious.","シンプル。本格的。美味しい。")}
          </p>
          <p style={{ fontWeight:200, color:"#6f471c", fontSize:13, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
            {t(
              "Each Onigiri Sen rice ball is made with premium rice, wrapped in Ariake nori, and filled with carefully sourced ingredients. Pure craftsmanship in every bite.",
              "おにぎり千の各おにぎりは、上質なお米で作られ、有明海苔で包まれ、厳選した食材が詰まっています。"
            )}
          </p>
        </section>

        {/* ── CREAM FLAVORS ZONE ── */}
        <section style={{ background:"#fff9f5" }}>
          {/* Top scallop */}
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
            style={{ display:"block", width:"100%", height:52, marginBottom:-1 }}>
            <path
              d="M0,26 C80,52 160,0 240,26 C320,52 400,0 480,26 C560,52 640,0 720,26 C800,52 880,0 960,26 C1040,52 1120,0 1200,26 C1280,52 1360,0 1440,26 L1440,52 L0,52 Z"
              fill="#ffefc8"
            />
          </svg>

          <div style={{ background:"#ffefc8", padding:"28px 48px 52px" }}>
            {/* Header inside cream zone */}
            <h2 style={{ textAlign:"center", fontWeight:900, fontSize:25, letterSpacing:3, color:"#6f471c", margin:"0 0 20px", textTransform:"uppercase" as const }}>
              {t("OUR FLAVORS","フレーバー")}
            </h2>

            {/* 3-col grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14, maxWidth:800, margin:"0 auto" }}>
              {flavors.map((f) => <FlavorCard key={f.nameEn} f={f} t={t} lang={lang} />)}
            </div>
          </div>

          {/* Bottom scallop */}
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
            style={{ display:"block", width:"100%", height:52, marginTop:-1 }}>
            <path
              d="M0,26 C80,0 160,52 240,26 C320,0 400,52 480,26 C560,0 640,52 720,26 C800,0 880,52 960,26 C1040,0 1120,52 1200,26 C1280,0 1360,52 1440,26 L1440,0 L0,0 Z"
              fill="#ffefc8"
            />
          </svg>
        </section>

        {/* ── SELECTED INGREDIENTS ── CHANGED: larger circles with border, yellow card overlap ── */}
        <section style={{ padding:"80px 80px 100px", background:"#fff9f5" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize:32, color:"#6f3a14", letterSpacing:0.2, margin:"0 0 64px", lineHeight:1.2 }}>
            {t("Selected Ingredients, Inclusive Choices","厳選素材、すべての人に")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24, maxWidth:860, margin:"0 auto" }}>
            {ingredients.map((item) => (
              <div key={item.title} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
                {/* Large circle photo — with border */}
                <div
                  style={{
                    width:190, height:190, borderRadius:"50%",
                    overflow:"hidden", background:"#ffefc8",
                    flexShrink:0, position:"relative", zIndex:1,
                    boxShadow:"0 0 0 1px #ffefc8",
                  }}
                >
                  <img src={item.src} alt={item.title} width={190} height={190} style={{objectFit:"cover"}} />
                </div>

                {/* Yellow card overlaps circle from below */}
                <div
                  style={{
                    background:"#ffefc8",
                    borderRadius:24,
                    padding:"52px 24px 36px",
                    marginTop:-48,
                    width:"100%",
                    height:"200px",
                    boxSizing:"border-box" as const,
                    textAlign:"center",
                  }}
                >
                  <div style={{ fontWeight:800, fontSize:14, color:"#6f471c", marginBottom:10, lineHeight:1.4 }}>
                    {item.title}
                  </div>
                  <p style={{ color:"#6f471c", fontSize:13, lineHeight:1.75, margin:0 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ── DIETARY INFORMATION ── CHANGED: colors match screenshot ── */}
        <section style={{ background:"#ed7e80", padding:"72px 80px 80px" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize:28, letterSpacing:4, color:"#fff", margin:"0 0 48px", textTransform:"uppercase" as const }}>
            {t("DIETARY INFORMATION","食事情報")}
          </h2>
          <div style={{ background:"#fff", borderRadius:20, maxWidth:680, margin:"0 auto", padding:"8px 0" }}>
            {dietary.map((d, i) => (
              <div key={d.label} style={{ display:"flex", alignItems:"center", gap:28, padding:"20px 32px", borderBottom:i<dietary.length-1?"1.5px dashed #e4dcd4":"none" }}>
                <span style={{ background:d.lb, color:d.lc, fontSize:14, fontWeight:700, borderRadius:10, padding:"8px 20px", whiteSpace:"nowrap" as const, flexShrink:0, minWidth:150, textAlign:"center" as const }}>
                  {d.label}
                </span>
                <span style={{ color:d.ic, fontSize:17, fontWeight:700 }}>
                  {d.items}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FIND US NEAR YOU ── */}
        <section style={{ padding:"64px 80px 100px", background:"#fdf8f4", position:"relative" as const }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <div style={{ border:"2px solid #2a2a2a", borderRadius:999, padding:"10px 36px", fontWeight:700, fontSize:16, color:"#1a1a1a" }}>
              {t("Find Us Near You","近くの販売店")}
            </div>
          </div>

          <div style={{ border:"2px solid #ed7e80", borderRadius:20, overflow:"hidden", maxWidth:520, margin:"0 auto" }}>
            <div style={{ display:"flex" }}>
              {(["seattle","california"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex:1, padding:"12px", textAlign:"center" as const,
                    background: activeTab===tab ? "#ed7e80" : "#f4adb9",
                    color: "#fff",
                    fontWeight:700, fontSize:14, border:"none", cursor:"pointer",
                    fontFamily:"DM Sans, sans-serif", transition:"background 0.2s",
                  }}
                >
                  {tab==="seattle" ? "Seattle" : "California"}
                </button>
              ))}
            </div>
            <div style={{ background:"#fff", minHeight:180, padding:"16px 22px 24px" }}>
              {stores.map((store, i) => (
                <div key={store} style={{ padding:"9px 0", borderBottom:i<stores.length-1?"1px solid #f5ede8":"none", fontSize:13, fontWeight:600, color:"#5a3020", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#f5aaaa", flexShrink:0, display:"inline-block" }} />
                  {store}
                </div>
              ))}
            </div>
          </div>

        <img src="/images/char-search.png" alt="" width={400} height={400} style={{objectFit:"contain", position:"absolute", bottom:0, left:30}} />        </section>

      </main>
    </>
  );
}