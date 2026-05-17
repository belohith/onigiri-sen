"use client";
import Header from "./components/Header";
import OurFlavors from "./components/OurFlavors";
import FindUsNearYou from "./components/Findusnearyou";
import TrustedBy from "./components/TrustedBy";
import Link from "next/link";
import { useLang } from "./context/LangContext";

export default function HomePage() {
  const { t } = useLang();

  const whyItems = [
  {
    n:"01", img:"/images/why-ingredients.png", mascot:"/images/char-stm.png",
    title: t("Integrity in Ingredients","素材へのこだわり"),
    body: t("Sourced with Care. From the premium nori of Ariake Bay to the finest ume of Kishu, we source only the highest quality ingredients, including organic elements. We pour our passion for quality into every single onigiri we deliver.",
            "有明海産の上質な海苔から紀州の最高の梅まで、オーガニック素材を含む最高品質の食材のみを使用しています。"),
  },
  {
    n:"02", img:"/images/why-healthy.png", mascot:"/images/char-pp.png",
    title: t("Healthy & Satisfying","健康的で満足感のある食事"),
    body: t("Energy for Your Day. The natural umami of perfectly cooked rice paired with high-quality proteins like salmon and spicy tuna. We provide a deeply satisfying meal that fuels your busy modern lifestyle with lasting energy.",
            "完璧に炊かれたお米の旨味と高品質なタンパク質。忙しい現代のライフスタイルを持続的なエネルギーで支えます。"),
  },
  {
    n:"03", img:"/images/why-fresh.png", mascot:"/images/char-bc.png",
    title: t("Made Fresh Daily","毎日新鮮に製造"),
    body: t("Made Daily, Ready to Grab. Prepared fresh every single day. Whether you are between meetings or on the move, enjoy an authentic, high-quality meal anytime, anywhere without compromise.",
            "毎日新鮮に製造。会議の合間でも移動中でも、妥協なく本格的な高品質の食事をいつでもどこでも楽しめます。"),
  },
  {
    n:"04", img:"/images/why-scale.png", mascot:"/images/char-s.png",
    title: t("Consistency & Scalability","一貫性とスケーラビリティ"),
    body: t("Powered by Japanese Technology. Our onigiri features the signature fluffy texture of hand-pressed rice, achieved through FUJISEIKI — the same world-leading technology trusted by Japan's top convenience chains.",
            "日本技術で動く最先端の機械が、日本のトップコンビニチェーンが信頼するFUJISEIKI技術で手握りのふっくら食感を実現します。"),
  },
];

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff" }}>

        {/* ── HERO ── */}
        <section style={{ background:"#fdf5ef", marginTop:48 }}>

          {/* Rolling photo strip — 3 visible at once, seamless */}
          {/* One set: 5×480 + 4×16 = 2464px. Two sets = 4944px. Scroll by -2464px */}
          <div style={{ overflow:"hidden", height:500 }}>
            <style>{`
              @keyframes hero-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-2464px); }
              }
            `}</style>
            <div style={{
              display:"flex",
              gap:16,
              height:"100%",
              width:"4944px",
              animation:"hero-scroll 18s linear infinite",
            }}>
              {[...Array(2)].map((_, pass) =>
                [
                  "/images/hero-1.jpg",
                  "/images/hero-2.jpg",
                  "/images/hero-3.jpg",
                  "/images/hero-4.jpg",
                  "/images/hero-5.jpg",
                ].map((src, i) => (
                  <div
                    key={`${pass}-${i}`}
                    style={{
                      width:480,
                      height:"100%",
                      borderRadius:"20px 20px 0 0",
                      overflow:"hidden",
                      flexShrink:0,
                      background:"#c8bfb5",
                    }}
                  >
                    <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cream section with mascots + CTA */}
          <div style={{ background:"#fdefc8" }}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:60, marginTop:-1 }}>
              <path d="M0,0 L0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1200,60 1320,0 1440,30 L1440,0 Z" fill="#fdf5ef" />
            </svg>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", padding:"20px 48px 80px", position:"relative" as const }}>
              {/* Left: scattered mascots */}
              <div style={{ position:"relative" as const, minHeight:260 }}>
                <img src="/images/char-pp.png" alt="" style={{ position:"absolute", bottom:0,  left:60,  height:100, objectFit:"contain" as const }} />
                <img src="/images/char-s.png"    alt="" style={{ position:"absolute", bottom:0,  left:180, height:110, objectFit:"contain" as const }} />
                <img src="/images/char-bc.png"    alt="" style={{ position:"absolute", bottom:20, left:320, height:120, objectFit:"contain" as const }} />
                {/* <img src="/images/char-stm.png"     alt="" style={{ position:"absolute", top:20,    right:0,  height:100, objectFit:"contain" as const }} /> */}
              </div>
              {/* Right: heading + CTA */}
              <div style={{ display:"flex", flexDirection:"column" as const, justifyContent:"center", paddingLeft:40 }}>
                <h1 style={{ fontWeight:900, fontSize:44, color:"#6f471c", lineHeight:1.2, margin:"0 0 16px" }}>
                  {t("Japan's Tradition.\nScaled for America.","日本の伝統を\nアメリカへ。")}
                </h1>
                <p style={{ color:"#8a6a4a", fontSize:15, lineHeight:1.7, margin:"0 0 32px", maxWidth:380 }}>
                  {t(
                    "Fresh, healthy, and portable — Japan's favorite everyday meal, now made for America.",
                    "新鮮で健康的、持ち運びやすい——日本人の日常食を、アメリカへ。"
                  )}
                </p>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap" as const }}>
                  <Link href="/products" style={{ background:"#e8847a", color:"#fff", padding:"16px 36px", borderRadius:999, fontWeight:700, fontSize:15, textDecoration:"none" }}>
                    {t("Find Us Near You","近くの販売店")}
                  </Link>
                  <Link href="/wholesale" style={{ background:"#fff", color:"#2a2a2a", padding:"16px 36px", borderRadius:999, fontWeight:700, fontSize:15, textDecoration:"none", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
                    {t("Partner With Us","パートナーになる")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED BY ── */}
        <TrustedBy />

{/* ── WHY ONIGIRI SEN ── */}
<section style={{ padding:"80px 80px 100px", background:"#fff9f5", position:"relative" as const }}>
  <h2 style={{ textAlign:"center", fontWeight:800, fontSize:30, color:"#6f471c", margin:"0 0 56px" }}>
    {t("Why Onigiri Sen","なぜおにぎり千？")}
  </h2>
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"start" }}>
    {whyItems.map((item, idx) => (
      <div
        key={item.n}
        style={{
          position:"relative" as const,
          marginTop: idx % 2 === 1 ? 80 : 0,
        }}
      >
        {/* Card with dashed pink border */}
        <div style={{
          background:"#fff",
          borderRadius:24,
          border:"2px dashed #f5aaaa",
          overflow:"hidden",
          paddingBottom:24,
        }}>
          {/* Photo with number overlay */}
          <div style={{ position:"relative" as const, height:240, overflow:"hidden" }}>
            <img
              src={item.img}
              alt={item.title}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            />
            <div style={{
              position:"absolute", bottom:8, left:16,
              fontWeight:900, fontSize:64, lineHeight:1,
              color:"#f5a0a0", opacity:0.9,
            }}>
              {item.n}
            </div>
          </div>
          {/* Title + body */}
          <div style={{ padding:"20px 28px 4px", textAlign:"center" as const }}>
            <h3 style={{ fontWeight:800, fontSize:18, color:"#6f471c", margin:"0 0 12px", fontStyle:"italic" }}>
              {item.title}
            </h3>
            <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.8, margin:0 }}>
              {item.body}
            </p>
          </div>
        </div>
        {/* Mascot — bottom-right outside card */}
        <img
          src={item.mascot}
          alt=""
          style={{
            position:"absolute", bottom:-40, right:-20,
            height:90, objectFit:"contain" as const,
            zIndex:2,
          }}
        />
      </div>
    ))}
  </div>
</section>

        {/* ── WHAT IS ONIGIRI SEN BANNER ── */}
        <section style={{ position:"relative", overflow:"hidden", color:"#fff", minHeight:360 }}>
          <img
            src="/images/hero-what.png"
            alt=""
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
          />
          <div style={{ position:"absolute", inset:0, background:"rgba(40,60,70,0.5)" }} />
          <div style={{ position:"relative", zIndex:1, padding:"80px 80px" }}>
            <span style={{ background:"#ffefc8", color:"#6f471c", borderRadius:999, padding:"15px 16px", fontSize:11, fontWeight:700, letterSpacing:1, display:"inline-block", marginBottom:20 }}>
              {t("WHAT IS ONIGIRI SEN?","おにぎり千とは?")}
            </span>
            <h2 style={{ fontWeight:900, fontSize:38, lineHeight:1.2, margin:"0 0 20px", maxWidth:560 }}>
              {t("A 1,000-Year Tradition for\nthe Next 1,000 Years","1,000年の伝統を\n次の1,000年へ")}
            </h2>
            <p style={{ opacity:0.9, fontSize:15, lineHeight:1.8, margin:"0 0 32px", maxWidth:500 }}>
              {t(
                "Onigiri has nourished Japan for over a millennium. We're bringing that tradition to America — made fresh daily with premium ingredients, wrapped in authentic Ariake nori.",
                "おにぎりは千年以上にわたって日本を支えてきました。その伝統をアメリカへ — 有明海苔で包んだ、毎日新鮮な最高品質のおにぎりをお届けします。"
              )}
            </p>
            <Link
              href="/our-story"
              style={{ display:"inline-block", background:"#fff", color:"#4a6a7a", padding:"13px 28px", borderRadius:999, fontWeight:700, fontSize:15, textDecoration:"none" }}
            >
              {t("Read Our Story →","私たちのストーリーを読む →")}
            </Link>
          </div>
        </section>

        {/* ── OUR FLAVORS ── */}
        <OurFlavors />
        <div style={{ textAlign:"center", padding:"0 0 64px", background:"#fff9f5" }}>
          <Link
            href="/products"
            style={{ display:"inline-block", background:"#e8847a", color:"#fff", padding:"13px 28px", borderRadius:999, fontWeight:700, fontSize:15, textDecoration:"none" }}
          >
            {t("See All Products →","すべての商品を見る →")}
          </Link>
        </div>

        {/* ── FIND US ── */}
        <FindUsNearYou />

        {/* ── INSTAGRAM ── */}
        <section style={{ background:"#f07878", padding:"64px 80px", textAlign:"center", color:"#fff" }}>
          <div style={{ fontWeight:700, fontSize:12, letterSpacing:3, marginBottom:8, opacity:0.85 }}>INSTAGRAM</div>
          <h2 style={{ fontWeight:900, fontSize:42, margin:"0 0 8px" }}>
            {t("Follow Along !","フォローしてね！")}
          </h2>
          <p style={{ fontSize:16, opacity:0.85, margin:"0 0 32px" }}>@onigirisen.jp</p>
          <img
            src="/images/char-ty.png"
            alt=""
            style={{ height:160, objectFit:"contain" as const, display:"block", margin:"0 auto 32px" }}
          />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, maxWidth:560, margin:"0 auto 32px" }}>
            {[1,2,3,4,5,6,7,8].map((i) => (
              <img
                key={i}
                src={`/images/partners/roll-${i}.png`}
                alt=""
                style={{ borderRadius:14, aspectRatio:"1", width:"100%", objectFit:"cover" as const }}
              />
            ))}
          </div>
          <Link
            href="https://instagram.com/onigirisen.jp"
            target="_blank"
            style={{ display:"inline-block", border:"2px solid rgba(255,255,255,0.6)", color:"#fff", padding:"11px 28px", borderRadius:999, fontWeight:700, fontSize:14, textDecoration:"none" }}
          >
            {t("View on Instagram","Instagramで見る")}
          </Link>
        </section>

      </main>
    </>
  );
}