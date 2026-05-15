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

const tagStyle = (type: string): React.CSSProperties => ({
  fontSize: 10, fontWeight: 700, borderRadius: 999, padding: "2px 8px",
  background:
    type==="GF"?"#d4edda":type==="Vegan"?"#2d6a4f":
    type==="Vegetarian"?"#c8e6c9":type==="Organic"?"#fff3cd":"#f0f0f0",
  color:
    type==="GF"?"#2d6a4f":type==="Vegan"?"#fff":
    type==="Vegetarian"?"#1b5e20":type==="Organic"?"#856404":"#555",
});

function FlavorCard({ f, t }: { f: any; t:(en:string,ja:string)=>string }) {
  return (
    <div style={{ position:"relative", paddingTop:32 }}>
      {/* Mascot — top-left, overlapping the card */}
      <div
        style={{
          position:"absolute", top:0, left:8, zIndex:3,
          width:60, height:60, borderRadius:"50%", overflow:"hidden",
          background:"#ede0d0",
        }}
      >
        {/* <Image src={f.mascot} alt="" width={60} height={60} style={{objectFit:"contain"}} /> */}
      </div>

      {/* Card */}
      <div
        style={{
          background:"#fff", borderRadius:18,
          boxShadow:"0 2px 12px rgba(0,0,0,0.07)",
          overflow:"hidden", position:"relative",
        }}
      >
        {/* Product image */}
        <div
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"20px 16px 8px", minHeight:170, position:"relative",
            background:"#fff",
          }}
        >
          {/* <Image src={f.img} alt={f.name} width={130} height={150} style={{objectFit:"contain"}} /> */}
          <div style={{ width:130, height:150, background:"#f0e4d8", borderRadius:8 }} />

          {/* Coming soon overlay */}
          {f.comingSoon && (
            <div
              style={{
                position:"absolute", inset:0,
                background:"rgba(200,185,170,0.5)",
                display:"flex", alignItems:"flex-end", justifyContent:"center",
                paddingBottom:14,
              }}
            >
              <span
                style={{
                  background:"#4a2c1a", color:"#fff", fontSize:9,
                  fontWeight:700, borderRadius:999, padding:"4px 12px",
                  textAlign:"center", maxWidth:160, lineHeight:1.4,
                }}
              >
                {t("Coming Soon — PCC & T-Mobile Exclusive","近日公開 — PCC・Tモバイル限定")}
              </span>
            </div>
          )}
        </div>

        {/* Name + tags */}
        <div style={{ padding:"6px 12px 14px" }}>
          <div style={{ fontWeight:800, fontSize:13, color:"#1a1a1a", marginBottom:2, lineHeight:1.3 }}>
            {f.name}
          </div>
          {f.subName && (
            <div style={{ fontSize:9, color:"#bbb", marginBottom:5 }}>{f.subName}</div>
          )}
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" as const }}>
            {f.tags.map((tag:string) => (
              <span key={tag} style={tagStyle(tag)}>{tag}</span>
            ))}
          </div>
          {f.tags2 && (
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" as const, marginTop:3 }}>
              {f.tags2.map((tag:string) => (
                <span key={tag} style={tagStyle(tag)}>{tag}</span>
              ))}
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
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<"seattle"|"california">("seattle");

  const flavors = [
    {
      img:"/images/flavor-spicy-tuna.jpg", mascot:"/images/mascot-bear.png",
      name:t("Spicy Tuna Mayo","スパイシーツナマヨ"),
      tags:["GF","Organic"], tags2:["Crustacean · Egg · Sesame"],
    },
    {
      img:"/images/flavor-salmon.jpg", mascot:"/images/mascot-brown-bear.png",
      name:t("Salmon","サーモン"),
      tags:["GF","Organic"], tags2:["Crustacean · Fish"],
    },
    {
      img:"/images/flavor-butter-corn.jpg", mascot:"/images/mascot-corn.png",
      name:t("Butter Corn","バターコーン"),
      tags:["GF","Vegetarian"], tags2:["Crustacean · Corn"],
    },
    {
      img:"/images/flavor-shrimp.jpg", mascot:"/images/mascot-shrimp.png",
      name:t("Shrimp Mayo","えびマヨ"),
      subName:t("えびマヨ","Shrimp Mayo"),
      tags:["GF"], tags2:["Crustacean · Egg · Fish"],
    },
    {
      img:"/images/flavor-ume.jpg", mascot:"/images/mascot-umeboshi.png",
      name:t("Ume","梅"),
      subName:t("梅","Ume"),
      tags:["GF","Vegan","Organic","Vegetarian"],
    },
    {
      img:"/images/flavor-smoked-salmon.jpg", mascot:"/images/mascot-salmon.png",
      name:t("Smoked Salmon Cream Cheese","スモークサーモンクリームチーズ"),
      tags:["GF"],
      comingSoon:true,
    },
  ];

  const ingredients = [
    {
      src:"/images/ingredient-rice.jpg",
      title:t("The Power of a Single Grain.","一粒のお米の力。"),
      body:t(
        "Selected medium-grain rice, IH pressure-cooked for a light, fluffy, and satisfying texture in every bite.",
        "選ばれた中粒米をIH圧力炊飯で、軽くふっくらとした食感に仕上げます。"
      ),
    },
    {
      src:"/images/ingredient-nori.jpg",
      title:t("Authentic Ariake Bay Nori","本物の有明海苔"),
      body:t(
        "Harvested from Japan's finest waters, our nori is chosen for its superior crispness and deep, umami flavor.",
        "日本の最高の海域から収穫された海苔は、その優れたパリパリ感と深い旨味で選ばれています。"
      ),
    },
    {
      src:"/images/ingredient-dietary.jpg",
      title:t("Dietary Friendly Options","食事制限対応"),
      body:t(
        "We believe in inclusive eating. Discover our selection of Organic, Vegan, and Vegetarian choices tailored for your lifestyle.",
        "すべての人のための食事を信じています。オーガニック、ヴィーガン、ベジタリアンの選択肢をご覧ください。"
      ),
    },
  ];

  const dietary = [
    { label:t("Gluten-Free (GF)","グルテンフリー（GF）"), lc:"#2d6a4f", lb:"#d4edda", items:t("Salmon · Spicy Tuna Mayo · Ume","サーモン・スパイシーツナマヨ・梅") },
    { label:t("Vegan","ヴィーガン"),                       lc:"#fff",    lb:"#2d6a4f", items:t("Ume","梅") },
    { label:t("Vegetarian","ベジタリアン"),                 lc:"#1b5e20", lb:"#c8e6c9", items:t("Ume · Butter Corn","梅・バターコーン") },
    { label:t("Organic","オーガニック"),                    lc:"#856404", lb:"#fff3cd", items:t("Salmon · Spicy Tuna Mayo · Ume","サーモン・スパイシーツナマヨ・梅") },
  ];

  const stores = activeTab === "seattle" ? seattleStores : californiaStores;

  return (
    <>
      <Header />
      <main style={{ fontFamily:"Nunito, sans-serif", background:"#fff" }}>

        {/* ── HERO ── */}
        <section style={{ background:"#fdf8f0", textAlign:"center", padding:"72px 80px 0" }}>
          <h1 style={{ fontWeight:800, fontSize:30, color:"#2a2a2a", margin:"0 0 8px" }}>
            {t("Products","商品")}
          </h1>
          <p style={{ fontWeight:700, fontSize:15, color:"#888", margin:"0 0 8px" }}>
            {t("Simple. Authentic. Delicious.","シンプル。本格的。美味しい。")}
          </p>
          <p style={{ color:"#bbb", fontSize:13, maxWidth:420, margin:"0 auto", lineHeight:1.7 }}>
            {t(
              "Each Onigiri Sen rice ball is made with premium rice, wrapped in Ariake nori, and filled with carefully sourced ingredients. Pure craftsmanship in every bite.",
              "おにぎり千の各おにぎりは、上質なお米で作られ、有明海苔で包まれ、厳選した食材が詰まっています。"
            )}
          </p>
        </section>

        {/* ── CREAM FLAVORS ZONE ── */}
        <section style={{ background:"#fdf8f0" }}>
          {/* Top scallop */}
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
            style={{ display:"block", width:"100%", height:52, marginBottom:-1 }}>
            <path
              d="M0,26 C80,52 160,0 240,26 C320,52 400,0 480,26 C560,52 640,0 720,26 C800,52 880,0 960,26 C1040,52 1120,0 1200,26 C1280,52 1360,0 1440,26 L1440,52 L0,52 Z"
              fill="#fff9e6"
            />
          </svg>

          <div style={{ background:"#fff9e6", padding:"28px 48px 52px" }}>
            {/* Header inside cream zone */}
            <h2 style={{ textAlign:"center", fontWeight:900, fontSize:13, letterSpacing:3, color:"#c8a060", margin:"0 0 4px", textTransform:"uppercase" as const }}>
              {t("OUR FLAVORS","フレーバー")}
            </h2>
            <p style={{ textAlign:"center", color:"#bbb", fontSize:12, maxWidth:400, margin:"0 auto 28px" }}>
              {t(
                "Each Onigiri Sen rice ball is made with premium rice, wrapped in Ariake nori, and filled with carefully sourced ingredients.",
                "おにぎり千の各おにぎりは、上質なお米で作られ、有明海苔で包まれ、厳選した食材が詰まっています。"
              )}
            </p>

            {/* 3-col grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14, maxWidth:800, margin:"0 auto" }}>
              {flavors.map((f) => <FlavorCard key={f.name} f={f} t={t} />)}
            </div>
          </div>

          {/* Bottom scallop */}
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
            style={{ display:"block", width:"100%", height:52, marginTop:-1 }}>
            <path
              d="M0,26 C80,0 160,52 240,26 C320,0 400,52 480,26 C560,0 640,52 720,26 C800,0 880,52 960,26 C1040,0 1120,52 1200,26 C1280,0 1360,52 1440,26 L1440,0 L0,0 Z"
              fill="#fff9e6"
            />
          </svg>
        </section>

        {/* ── SELECTED INGREDIENTS ── */}
        <section style={{ padding:"72px 80px", background:"#fff" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize:19, color:"#1a1a1a", letterSpacing:0.5, margin:"0 0 48px" }}>
            {t("Selected Ingredients, Inclusive Choices","厳選素材、すべての人に")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:28, maxWidth:720, margin:"0 auto" }}>
            {ingredients.map((item) => (
              <div key={item.title} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:0 }}>
                {/* Circular photo */}
                <div
                  style={{
                    width:120, height:120, borderRadius:"50%",
                    overflow:"hidden", background:"#d8d0c4",
                    marginBottom:0, flexShrink:0,
                    border:"none",
                  }}
                >
                  {/* <Image src={item.src} alt={item.title} width={120} height={120} style={{objectFit:"cover"}} /> */}
                </div>

                {/* Warm yellow pill label — sits just below photo, partially overlapping */}
                <div
                  style={{
                    background:"#fbe8a0",
                    borderRadius:14,
                    padding:"20px 14px 12px",
                    marginTop:-20,
                    width:"100%",
                    boxSizing:"border-box" as const,
                  }}
                >
                  <div style={{ fontWeight:800, fontSize:12, color:"#2a2a2a", marginBottom:6, marginTop:8 }}>
                    {item.title}
                  </div>
                  <p style={{ color:"#777", fontSize:11, lineHeight:1.7, margin:0 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIETARY INFORMATION ── */}
        <section style={{ background:"#e87878", padding:"52px 80px" }}>
          <h2 style={{ textAlign:"center", fontWeight:700, fontSize:11, letterSpacing:3, color:"rgba(255,255,255,0.9)", margin:"0 0 24px", textTransform:"uppercase" as const }}>
            {t("DIETARY INFORMATION","食事情報")}
          </h2>
          <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", maxWidth:560, margin:"0 auto" }}>
            {dietary.map((d, i) => (
              <div key={d.label} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 22px", borderBottom:i<dietary.length-1?"1px dashed #ede8e0":"none" }}>
                <span style={{ background:d.lb, color:d.lc, fontSize:11, fontWeight:700, borderRadius:999, padding:"3px 12px", whiteSpace:"nowrap" as const, flexShrink:0 }}>
                  {d.label}
                </span>
                <span style={{ color:"#777", fontSize:13 }}>{d.items}</span>
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

          <div style={{ border:"2px solid #f5aaaa", borderRadius:20, overflow:"hidden", maxWidth:520, margin:"0 auto" }}>
            <div style={{ display:"flex" }}>
              {(["seattle","california"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex:1, padding:"12px", textAlign:"center" as const,
                    background: activeTab===tab ? "#f5aaaa" : "#fdf8f4",
                    color: activeTab===tab ? "#fff" : "#ccc",
                    fontWeight:700, fontSize:14, border:"none", cursor:"pointer",
                    fontFamily:"Nunito, sans-serif", transition:"background 0.2s",
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

          {/* Mascot searching — bottom left */}
          {/* Replace with: <Image src="/images/mascot-searching.png" alt="" width={110} height={110} style={{objectFit:"contain", position:"absolute", bottom:0, left:60}} /> */}
          <div style={{ position:"absolute", bottom:0, left:60, width:110, height:110, background:"#ede0d4", borderRadius:"50% 50% 0 0" }} />
        </section>

      </main>
    </>
  );
}