"use client";
import Header from "./components/Header";
import Link from "next/link";
import { useLang } from "./context/LangContext";

const tagStyle = (type: string): React.CSSProperties => ({
  fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "2px 10px",
  background: type==="GF"?"#d4edda":type==="Vegan"?"#2d6a4f":type==="Organic"?"#fff3cd":"#f0f0f0",
  color: type==="GF"?"#2d6a4f":type==="Vegan"?"#fff":type==="Organic"?"#856404":"#555",
});

/*
  IMAGE PLACEHOLDERS
  Replace each <div style={imgBox(...)}> with:
    <Image src="/images/FILENAME.jpg" alt="..." fill style={{objectFit:"cover"}} />
  wrapped in a <div style={{position:"relative", ...dimensions}}>

  Images needed:
    /images/hero-left-tall.jpg   — hero left tall photo
    /images/hero-top-right.jpg   — hero top-right photo
    /images/hero-bottom-right.jpg — hero bottom-right photo
    /images/why-ingredients.jpg  — integrity in ingredients
    /images/why-healthy.jpg      — healthy & satisfying
    /images/why-fresh.jpg        — made fresh daily
    /images/why-scale.jpg        — consistency & scalability
    /images/banner-landscape.jpg — teal banner right side
    /images/flavor-spicy-tuna.jpg
    /images/flavor-salmon.jpg
    /images/flavor-ume.jpg
    /images/flavor-shrimp.jpg
    /images/flavor-tuna.jpg
    /images/flavor-pork.jpg
    /images/instagram-1.jpg ... instagram-4.jpg
    /images/characters.png       — mascot group illustration
*/

function ImgBox({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  return (
    <div style={{ background: "#d8ccc0", overflow: "hidden", ...style }}>
      {/* Replace this div with: <Image src={src} alt={alt} fill style={{objectFit:"cover"}} /> */}
      {/* (wrap in position:relative container) */}
    </div>
  );
}

export default function HomePage() {
  const { t } = useLang();

  const whyItems = [
    { img: "/images/why-ingredients.jpg", n: "01",
      title: t("Integrity in Ingredients","素材へのこだわり"),
      body: t("We source only the highest quality ingredients, maintaining a supply chain rooted in transparency and trust. Every item on our menu meets strict quality standards.",
              "最高品質の素材のみを使用し、透明性と信頼に基づくサプライチェーンを維持しています。") },
    { img: "/images/why-healthy.jpg", n: "02",
      title: t("Healthy & Satisfying","健康的で満足感のある食事"),
      body: t("Onigiri provides a balanced nutritional profile — a wholesome, satisfying food that nourishes without the heaviness of many other options.",
              "おにぎりはバランスの取れた栄養プロファイルを提供し、他の多くの選択肢の重さなしに栄養を与える、健全で満足のいく食べ物です。") },
    { img: "/images/why-fresh.jpg", n: "03",
      title: t("Made Fresh Daily","毎日新鮮に製造"),
      body: t("Made Daily, Savored the Same Day. In our kitchen, we commit to freshness with every single onigiri produced using only the finest ingredients.",
              "毎日製造し、その日のうちにお召し上がりください。私たちのキッチンでは、最高の素材のみを使用して製造するすべてのおにぎりに新鮮さを約束します。") },
    { img: "/images/why-scale.jpg", n: "04",
      title: t("Consistency & Scalability","一貫性とスケーラビリティ"),
      body: t("Powered by Japanese Technology. Our state-of-the-art machines provide consistent quality from a single onigiri to stadium scale.",
              "日本の技術で動く最先端の機械が、1個のおにぎりからスタジアム規模まで一貫した品質を提供します。") },
  ];

  const flavors = [
    { img: "/images/flavor-spicy-tuna.jpg", name: t("Spicy Tuna Mayo","スパイシーツナマヨ"), tags: ["GF","Organic"] },
    { img: "/images/flavor-salmon.jpg",     name: t("Salmon","サーモン"),                    tags: ["GF","Organic"] },
    { img: "/images/flavor-ume.jpg",        name: t("Umeboshi (Ume)","梅干し（梅）"),         tags: ["GF","Vegan","Organic"] },
    { img: "/images/flavor-shrimp.jpg",     name: t("Shrimp Mayo","えびマヨ"),               tags: ["GF"] },
    { img: "/images/flavor-tuna.jpg",       name: t("Tuna","ツナ"),                          tags: ["GF","Organic"] },
    { img: "/images/flavor-pork.jpg",       name: t("Braised Pork in Ginger Vinegar","生姜酢豚"), tags: ["GF"], wide: true },
  ];

  return (
    <>
      <Header />
      <main style={{ fontFamily: "Nunito, sans-serif", background: "#fff" }}>

        {/* ── HERO ── */}
        <section style={{ background:"#fdf5ef", display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:460, marginTop:48, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gridTemplateRows:"1fr 1fr", gap:4, minHeight:460 }}>
            <ImgBox src="/images/hero-left-tall.jpg" alt="Onigiri" style={{ gridRow:"1 / 3" }} />
            <ImgBox src="/images/hero-top-right.jpg" alt="Onigiri package" style={{}} />
            <ImgBox src="/images/hero-bottom-right.jpg" alt="Store" style={{}} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"60px 56px" }}>
            <h1 style={{ fontWeight:900, fontSize:40, color:"#1a1a1a", lineHeight:1.2, margin:"0 0 16px" }}>
              {t("Japan's Tradition.\nScaled for America.","日本の伝統を\nアメリカへ。")}
            </h1>
            <p style={{ color:"#888", fontSize:15, lineHeight:1.7, margin:"0 0 32px", maxWidth:360 }}>
              {t("Crafted with 1,000-year-old recipes — made fresh daily with the finest Japanese ingredients, ready for your everyday life.",
                 "1,000年の歴史あるレシピで作られた、最高の日本の食材を使った毎日新鮮なおにぎりをお届けします。")}
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link href="/products" style={btnPink}>{t("See Our Products","商品を見る")}</Link>
              <Link href="/wholesale" style={btnOutline}>{t("Partner With Us","パートナーになる")}</Link>
            </div>
          </div>
        </section>

        {/* ── WHY ONIGIRI SEN ── */}
        <section style={{ padding:"80px 80px" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize:30, color:"#1a1a1a", margin:"0 0 48px" }}>
            {t("Why Onigiri Sen","なぜおにぎり千？")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {whyItems.map((item) => (
              <div key={item.n} style={{ background:"#fdf5ef", borderRadius:20, padding:"28px", display:"grid", gridTemplateColumns:"auto 1fr", gap:"0 20px" }}>
                <div style={{ fontWeight:900, fontSize:42, color:"#f5d0c4", lineHeight:1, gridColumn:1, gridRow:"1 / 3", alignSelf:"start", minWidth:56 }}>{item.n}</div>
                <h3 style={{ fontWeight:800, fontSize:17, color:"#1a1a1a", margin:0, alignSelf:"end" }}>{item.title}</h3>
                <p style={{ color:"#888", fontSize:14, lineHeight:1.7, margin:"8px 0 0" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BANNER ── */}
        <section style={{ background:"#6a8c9a", padding:"80px", color:"#fff", display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
          <div>
            <span style={{ background:"#e8a87a", borderRadius:999, padding:"5px 16px", fontSize:11, fontWeight:700, letterSpacing:1, display:"inline-block", marginBottom:20 }}>
              {t("WHAT IS ONIGIRI SEN","おにぎり千とは")}
            </span>
            <h2 style={{ fontWeight:900, fontSize:38, lineHeight:1.2, margin:"0 0 20px" }}>
              {t("A 1,000-Year Tradition for\nthe Next 1,000 Years","1,000年の伝統を\n次の1,000年へ")}
            </h2>
            <p style={{ opacity:0.85, fontSize:15, lineHeight:1.8, margin:"0 0 32px" }}>
              {t("Onigiri has nourished Japan for over a millennium. We're bringing that tradition to America — made fresh daily with premium ingredients, wrapped in authentic Ariake nori.",
                 "おにぎりは千年以上にわたって日本を支えてきました。その伝統をアメリカへ — 有明海苔で包んだ、毎日新鮮な最高品質のおにぎりをお届けします。")}
            </p>
            <Link href="/our-story" style={{ ...btnPink, background:"#fff", color:"#6a8c9a" }}>
              {t("Read Our Story →","私たちのストーリーを読む →")}
            </Link>
          </div>
          <ImgBox src="/images/banner-landscape.jpg" alt="Landscape" style={{ borderRadius:20, height:280 }} />
        </section>

        {/* ── FLAVORS ── */}
        <section style={{ padding:"80px 80px", background:"#fdf9f2" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize:13, letterSpacing:3, color:"#888", margin:"0 0 40px", textTransform:"uppercase" }}>
            {t("OUR FLAVORS","フレーバー")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16 }}>
            {flavors.map((f) => (
              <div key={f.name} style={{ background:"#fff", borderRadius:20, padding:"24px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:10, gridColumn:(f as any).wide?"span 3":undefined, boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
                <ImgBox src={f.img} alt={f.name} style={{ width:88, height:88, borderRadius:14 }} />
                <div style={{ fontWeight:800, fontSize:14, color:"#1a1a1a", textAlign:"center" }}>{f.name}</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"center" }}>
                  {f.tags.map((tag) => <span key={tag} style={tagStyle(tag)}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:36 }}>
            <Link href="/products" style={btnPink}>{t("See All Products →","すべての商品を見る →")}</Link>
          </div>
        </section>

        {/* ── FIND US ── */}
        <section style={{ padding:"80px 80px" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:32 }}>
            <div style={{ border:"2px solid #1a1a1a", borderRadius:999, padding:"10px 36px", fontWeight:700, fontSize:17, color:"#1a1a1a" }}>
              {t("Find Us Near You","近くの販売店")}
            </div>
          </div>
          <div style={{ border:"2px solid #f5aaaa", borderRadius:20, overflow:"hidden", maxWidth:580, margin:"0 auto" }}>
            <div style={{ display:"flex" }}>
              <div style={{ flex:1, padding:13, textAlign:"center", background:"#f5aaaa", color:"#fff", fontWeight:700 }}>Seattle</div>
              <div style={{ flex:1, padding:13, textAlign:"center", background:"#fdf5ef", color:"#bbb", fontWeight:700 }}>California</div>
            </div>
            <div style={{ padding:"28px 24px", minHeight:120, background:"#fff" }}>
              <p style={{ color:"#aaa", fontSize:14, margin:0 }}>T&T Supermarket · PCC Community Markets · T-Mobile Park</p>
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM ── */}
        <section style={{ background:"#f07878", padding:"64px 80px", textAlign:"center", color:"#fff" }}>
          <div style={{ fontWeight:700, fontSize:12, letterSpacing:3, marginBottom:8, opacity:0.85 }}>INSTAGRAM</div>
          <h2 style={{ fontWeight:900, fontSize:42, margin:"0 0 8px" }}>{t("Follow Along !","フォローしてね！")}</h2>
          <p style={{ fontSize:16, opacity:0.85, margin:"0 0 40px" }}>@onigirisen.jp</p>
          <ImgBox src="/images/characters.png" alt="Onigiri Sen mascots" style={{ borderRadius:20, height:160, maxWidth:600, margin:"0 auto 32px" }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, maxWidth:560, margin:"0 auto 32px" }}>
            {[1,2,3,4].map((i) => (
              <ImgBox key={i} src={`/images/instagram-${i}.jpg`} alt={`Instagram post ${i}`} style={{ borderRadius:14, aspectRatio:"1", minHeight:120 }} />
            ))}
          </div>
          <Link href="https://instagram.com/onigirisen.jp" target="_blank" style={{ display:"inline-block", border:"2px solid rgba(255,255,255,0.6)", color:"#fff", padding:"11px 28px", borderRadius:999, fontWeight:700, fontSize:14, textDecoration:"none" }}>
            {t("View on Instagram","Instagramで見る")}
          </Link>
        </section>
      </main>
    </>
  );
}

const btnPink: React.CSSProperties = { display:"inline-block", background:"#e8847a", color:"#fff", padding:"13px 28px", borderRadius:999, fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:15, textDecoration:"none" };
const btnOutline: React.CSSProperties = { display:"inline-block", background:"transparent", color:"#e8847a", border:"2px solid #e8847a", padding:"11px 28px", borderRadius:999, fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:15, textDecoration:"none" };