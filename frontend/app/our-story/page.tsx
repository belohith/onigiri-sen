"use client";
import { Crimson_Text } from "next/font/google";
import Header from "../components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";

const crimson = Crimson_Text({ subsets:["latin"], weight:["400","600","700"], style:["normal","italic"] });

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

function TimelineCarousel() {
  const images = [
    "/images/story-timeline-1.jpeg",
    "/images/story-timeline-2.JPG",
    "/images/story-timeline-3.jpeg",
  ];
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div style={{ position:"relative", borderRadius:20, overflow:"hidden", height:300, background:"#c8bfb5" }}>
      <img
        src={images[current]}
        alt={`Timeline ${current + 1}`}
        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"opacity 0.3s", objectPosition: current === 1 ? "center center" : "center top" }}
      />
      <button onClick={prev} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,0.8)", border:"none", borderRadius:"50%", width:40, height:40, cursor:"pointer", fontSize:22, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", color:"#6f471c" }}>‹</button>
      <button onClick={next} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,0.8)", border:"none", borderRadius:"50%", width:40, height:40, cursor:"pointer", fontSize:22, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", color:"#6f471c" }}>›</button>
      <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width:i===current?20:8, height:8, borderRadius:999, border:"none", cursor:"pointer", background:i===current?"#ed7e80":"rgba(255,255,255,0.7)", transition:"all 0.2s", padding:0 }} />
        ))}
      </div>
    </div>
  );
}

export default function OurStoryPage() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff9f5" }}>

        {/* 1. TITLE */}
        <section style={{ padding: isMobile ? "48px 24px 0" : "56px 80px 0", textAlign:"center", background:"#fff9f5" }}>
          <h1 style={{ fontWeight:800, fontSize: isMobile ? 24 : 28, color:"#6f471c", margin:0 }}>
            {t("Our Story","私たちのストーリー")}
          </h1>
        </section>

        {/* 2. MISSION */}
        <section style={{ position:"relative", minHeight: isMobile ? 260 : 340, overflow:"hidden", marginTop:32, display:"flex", alignItems:"center" }}>
          <div style={{ position:"absolute", inset:0 }}>
            <img src="/images/story-mission.png" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
          <div style={{ position:"relative", zIndex:1, width:"100%", textAlign:"center", padding: isMobile ? "48px 24px" : "64px 120px", color:"#fff" }}>
            <h2 style={{ fontWeight:700, fontSize: isMobile ? 24 : 42, lineHeight:1.2, margin:"0 0 16px", fontFamily:crimson.style.fontFamily }}>
              {t("Mission — Bringing Onigiri into American Daily Life.", "ミッション — おにぎりをアメリカの日常へ")}
            </h2>
            <p style={{ maxWidth:600, margin:"0 auto", fontSize: isMobile ? 15 : 18, lineHeight:1.85, opacity:0.9, fontFamily:crimson.style.fontFamily }}>
              {t(
                "We are making Japan's 1,000-year-old food culture more accessible than ever. By combining premium ingredients with masterful techniques, we provide the ultimate choice for those seeking a quick, delicious, and healthy meal — even in the busiest of lives. We bring this wholesome option directly to your everyday.",
                "日本の1,000年の食文化をこれまで以上に身近にしています。最高の食材と卓越した技術を組み合わせ、忙しい毎日でも手軽に美味しく健康的な食事を提供します。"
              )}
            </p>
          </div>
        </section>

        {/* 3. FOUNDER'S STORY */}
        <section style={{ background:"#fff8f4", padding: isMobile ? "32px 20px" : "48px", margin:"48px 0", overflow:"hidden" }}>
          <div style={{ position:"relative", maxWidth:1500, margin:"0 auto" }}>
            {isMobile ? (
              /* Mobile: stacked layout */
              <>
                <div style={{ background:"#f3a8b6", borderRadius:20, padding:"32px 24px", marginBottom:24 }}>
                  <h2 style={{ fontWeight:900, fontSize:26, color:"#fff", margin:"0 0 20px" }}>
                    {t("Founder's Story","創業者のストーリー")}
                  </h2>
                  <p style={{ fontSize:14, fontWeight:600, fontStyle:"italic", lineHeight:1.9, color:"#fff", margin:0 }}>
                    {t(
                      `Growing up in Japan, Rina Oike always had onigiri by her side—it was a simple, everyday comfort that nourished both body and soul. However, when she moved to the U.S. alone for her studies, she was struck by a harsh reality: while fast food was everywhere, convenient, delicious, and healthy options were remarkably scarce. "I want to provide a meal that is quick, tasty, and truly good for you." Driven by this vision, her journey in Seattle began to resonate with a growing community of partners and customers. Today, we are blending a 1,000-year tradition with cutting-edge technology to root Japanese onigiri into America as a new cultural pillar.`,
                      "日本で育った及川里奈は、常におにぎりを傍らに置いていました。しかし、留学のために一人でアメリカへ渡ったとき、ファストフードが溢れる中で、便利で美味しく健康的な選択肢がほとんどないという厳しい現実に直面しました。「手軽で美味しく、本当に体にいい食事を提供したい。」この思いから、シアトルのキッチンで始まった事業は、多くのパートナーや顧客の支持を集めています。今日、1,000年の伝統と最先端の技術を融合させ、日本のおにぎりをアメリカの新しい文化の柱として育てています。"
                    )}
                  </p>
                </div>
                {/* Founder photo */}
                <div style={{ borderRadius:20, overflow:"hidden", position:"relative", marginBottom:24, height:480 }}>
                  <img src="/images/rina-oike.webp" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", objectPosition:"center 10%" }} />
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent, rgba(0,0,0,0.5))", padding:"16px 20px" }}>
                    <div style={{ fontWeight:900, fontSize:22, color:"#fff" }}>RINA OIKE</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.9)" }}>{t("Founder & CEO, Onigiri Sen","創業者 & CEO、おにぎり千")}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const }}>
                  <a href="#" style={{ display:"inline-block", borderRadius:999, border:"2px solid #ef7f88", background:"#fff", padding:"12px 20px", fontSize:13, fontWeight:900, color:"#ef7f88", textDecoration:"none" }}>
                    {t("Watch the KING 5 Feature →","KING 5 特集を見る →")}
                  </a>
                  <a href="#" style={{ display:"inline-block", borderRadius:999, border:"2px solid #6f4725", background:"#fff8f4", padding:"12px 20px", fontSize:13, fontWeight:900, color:"#6f4725", textDecoration:"none" }}>
                    {t("Read the Jungle City Interview →","Jungle Cityインタビューを読む →")}
                  </a>
                </div>
              </>
            ) : (
              /* Desktop: original overlapping layout */
              <>
                <div style={{ background:"#f3a8b6", width:"72%", padding:"52px 200px 52px 80px", position:"relative", zIndex:10 }}>
                  <h2 style={{ fontWeight:900, fontSize:40, color:"#fff", margin:"0 0 32px" }}>
                    {t("Founder's Story","創業者のストーリー")}
                  </h2>
                  <p style={{ fontSize:16, fontWeight:600, fontStyle:"italic", lineHeight:2.05, letterSpacing:"0.02em", color:"#fff", margin:0, maxWidth:760 }}>
                    {t(
                      `Growing up in Japan, Rina Oike always had onigiri by her side—it was a simple, everyday comfort that nourished both body and soul. However, when she moved to the U.S. alone for her studies, she was struck by a harsh reality: while fast food was everywhere, convenient, delicious, and healthy options were remarkably scarce. "I want to provide a meal that is quick, tasty, and truly good for you." Driven by this vision, her journey in Seattle began to resonate with a growing community of partners and customers. Today, we are blending a 1,000-year tradition with cutting-edge technology to root Japanese onigiri into America as a new cultural pillar.`,
                      "日本で育った及川里奈は、常におにぎりを傍らに置いていました。しかし、留学のために一人でアメリカへ渡ったとき、ファストフードが溢れる中で、便利で美味しく健康的な選択肢がほとんどないという厳しい現実に直面しました。「手軽で美味しく、本当に体にいい食事を提供したい。」この思いから、シアトルのキッチンで始まった事業は、多くのパートナーや顧客の支持を集めています。今日、1,000年の伝統と最先端の技術を融合させ、日本のおにぎりをアメリカの新しい文化の柱として育てています。"
                    )}
                  </p>
                </div>
                <div style={{ position:"absolute", right:0, top:60, zIndex:20, width:520, height:660, overflow:"visible", display:"flex", flexDirection:"column" as const, justifyContent:"flex-end", padding:"40px 40px 48px" }}>
                  <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
                    <img src="/images/rina-oike.webp" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 10%" }} />
                  </div>
                  <img src="/images/char-founder.png" alt="" style={{ position:"absolute", left:"-6rem", top:"55%", transform:"translateY(-50%)", height:160, objectFit:"contain" as const, zIndex:3 }} />
                  <div style={{ position:"relative", zIndex:1 }}>
                    <div style={{ fontWeight:900, fontSize:44, color:"#fff", letterSpacing:"0.05em", lineHeight:1.1 }}>RINA OIKE</div>
                    <div style={{ fontWeight:700, fontSize:18, color:"rgba(255,255,255,0.9)", marginBottom:30, padding:5 }}>
                      {t("Founder & CEO, Onigiri Sen","創業者 & CEO、おにぎり千")}
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:40, flexWrap:"wrap" as const, marginTop:80, paddingLeft:80 }}>
                  <a href="#" style={{ display:"inline-block", borderRadius:999, border:"3px solid #ef7f88", background:"#fff", padding:"18px 48px", fontSize:14, fontWeight:900, color:"#ef7f88", textDecoration:"none" }}>
                    {t("Watch the KING 5 Feature →","KING 5 特集を見る →")}
                  </a>
                  <a href="#" style={{ display:"inline-block", borderRadius:999, border:"3px solid #6f4725", background:"#fff8f4", padding:"18px 48px", fontSize:14, fontWeight:900, color:"#6f4725", textDecoration:"none" }}>
                    {t("Read the Jungle City Interview →","Jungle Cityインタビューを読む →")}
                  </a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* 4. 1000 YEARS */}
        <section style={{ position:"relative", overflow:"hidden", color:"#fff", minHeight: isMobile ? 320 : 600 }}>
          <img src="/images/story-1000y.png" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"relative", zIndex:1, textAlign:"center", padding: isMobile ? "56px 24px" : "80px 120px" }}>
            <h2 style={{ fontWeight:700, fontSize: isMobile ? 28 : 48, lineHeight:1.2, margin:"0 0 24px", fontFamily:crimson.style.fontFamily }}>
              {t("A 1,000-Year Tradition for the Next 1,000 Years","1,000年の伝統を次の1,000年へ")}
            </h2>
            <div style={{ border:"1px solid rgba(255,255,255,0.45)", borderRadius:12, padding: isMobile ? "16px 20px" : "24px 36px", maxWidth:560, margin:"0 auto" }}>
              <p style={{ opacity:0.9, fontSize: isMobile ? 15 : 18, lineHeight:1.9, margin:0, fontFamily:crimson.style.fontFamily }}>
                {t(
                  "The name Onigiri Sen — Sen (千) meaning one thousand — carries a simple but powerful wish: to take a tradition that has lasted 1,000 years, and keep it for 1,000 more. Starting with Seattle. Expanding across America.",
                  "おにぎり千という名前——千は1,000を意味します——は、1,000年続いた伝統をさらに1,000年続けるというシンプルで力強い願いを込めています。シアトルからアメリカ全土へ。"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* 5. TIMELINE */}
        <section style={{ padding: isMobile ? "48px 20px 60px" : "72px 80px 80px", background:"#ffefc8" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:40 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#ed7e80", borderRadius:999, padding:"8px 20px" }}>
              <span style={{ fontWeight:700, color:"#fff", fontSize:14 }}>
                {t("A Journey Started in 2025","2025年に始まった旅")}
              </span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 48 }}>
            <div>
              {[
                {
                  date:"2025 Jan", dotColor:"#ed7e80",
                  title:t("The 75sqft Foundation","75平方フィートの出発点"),
                  body:t("It all started as a dream within a tiny 75sqft kitchen. Our journey began at T&T Supermarket, the very first partner to believe in our mission to bring authentic onigiri to America.",
                         "すべては75平方フィートの小さなキッチンでの夢から始まりました。T&Tスーパーマーケットが最初のパートナーとなりました。"),
                },
                {
                  date:"2025 Late", dotColor:"#ed7e80",
                  title:t("Building Trust & Scale","信頼とスケールの構築"),
                  body:t("Integrity earned partnerships. By expanding to PCC Community Markets, we successfully established our presence and quality in the Seattle organic food market.",
                         "誠実さがパートナーシップを生みました。PCCコミュニティマーケットへの展開により、シアトルのオーガニック食品市場での地位を確立しました。"),
                },
                {
                  date:"2026", dotColor:"#ed7e80",
                  title:t("Scaling the Vision","ビジョンの拡大"),
                  body:t("The momentum continues. This year, we expand to T-Mobile Park stadium and take our next big leap into San Francisco. California is next.",
                         "勢いは続きます。今年はTモバイルパーク球場に展開し、サンフランシスコへの大きな一歩を踏み出します。カリフォルニアが次の目標です。"),
                },
              ].map((item, i) => (
                <div key={item.date} style={{ display:"grid", gridTemplateColumns:"64px 20px 1fr", gap:"0 12px", marginBottom:i<2?36:0 }}>
                  <div style={{ fontWeight:600, fontSize:12, color:"#6f471c", paddingTop:2, textAlign:"right" as const }}>{item.date}</div>
                  <div style={{ display:"flex", flexDirection:"column" as const, alignItems:"center" }}>
                    <div style={{ width:14, height:14, borderRadius:"50%", background:item.dotColor, flexShrink:0, marginTop:2 }} />
                    {i < 2 && <div style={{ width:2, flex:1, background:"#ed7e80", marginTop:4 }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize: isMobile ? 14 : 16, color:"#6f471c", marginBottom:6, lineHeight:1.3 }}>{item.title}</div>
                    <p style={{ color:"#6f471c", fontSize:13, lineHeight:1.75, margin:0 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <TimelineCarousel />
          </div>
        </section>

        {/* 6. TECHNOLOGY */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 80px", background:"#fff9f5" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", borderRadius:999, padding:"7px 20px", fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#fff", marginBottom:20, textTransform:"uppercase" as const }}>
              {t("TECHNOLOGY","テクノロジー")}
            </div>
            <h2 style={{ fontWeight:800, fontSize: isMobile ? 22 : 28, color:"#6f471c", margin:"0 0 10px" }}>
              {t("Powered by Global Food-Tech","グローバルフードテクで動く")}
            </h2>
            <p style={{ color:"#6f471c", fontSize:14, margin:0 }}>
              {t("The Secret Behind Every Perfect Onigiri Bite","すべての完璧なおにぎりの秘密")}
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:24 }}>
            {[
              {
                src:"/images/fuji.png",
                brand:t("FUJISEIKI — World's #1\nOnigiri Machine Manufacturer","FUJISEIKI — 世界シェアNo.1\nおにぎり成型機メーカー"),
                sub:t("Japan's Standard: Near 100% Share","日本の標準：約100%のシェア"),
                body:t("The world's #1 manufacturer, boasting an approximately 100% share of hand-wrapped onigiri machines in Japanese convenience stores. Their technology balances the airy texture of hand-pressed onigiri with millimeter-level precision. Regardless of production volume, they deliver consistent, uncompromising, world-class quality for every order.",
                       "不二精機の成型機と、AIHOの業務用IH炊飯システムを組み合わせ、手握りの繊細な食感を精密な科学の力で再現しています。"),
                linkEn:"FUJISEIKI →", linkJa:"不二精機 →", href:"https://www.fujiseiki.co.jp",
              },
              {
                src:"/images/aiho.png",
                brand:t("AIHO — The Gold Standard\nof Rice Cooking","AIHO — 炊飯の\nゴールドスタンダード"),
                sub:t("Engineered for the Perfect Grain","完璧な一粒のために設計"),
                body:t("Great onigiri starts with perfect rice. AIHO's professional-grade IH pressure cooking system — trusted by Japan's largest rice producers — extracts the natural sweetness and ideal stickiness of every grain. Tender, fragrant, and delicious even when cold.",
                       "美味しいおにぎりは完璧なお米から始まります。AIHOの業務用IH圧力炊飯システムは、日本最大の米生産者に信頼されており、各粒の理想的な甘みと粘り気を引き出します。"),
                linkEn:"AIHO →", linkJa:"アイホ →", href:"https://www.aiho.co.jp",
              },
            ].map((item) => (
              <div key={item.brand} style={{ background:"#faf6f0", borderRadius:20, overflow:"hidden" }}>
                <div style={{ height: isMobile ? 200 : 300, background:"#c8bfb5", overflow:"hidden" }}>
                  <img src={item.src} alt={item.brand} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding: isMobile ? 20 : 28 }}>
                  <div style={{ fontWeight:900, fontSize:15, color:"#6f471c", whiteSpace:"pre-line" as const, marginBottom:6 }}>{item.brand}</div>
                  <div style={{ fontWeight:600, color:"#6f471c", fontSize:12, marginBottom:10 }}>{item.sub}</div>
                  <p style={{ color:"#6f471c", fontSize:13, lineHeight:1.75, margin:"0 0 12px" }}>{item.body}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color:"#e07070", fontWeight:700, fontSize:13, textDecoration:"none" }}>
                    {lang === "ja" ? item.linkJa : item.linkEn}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. INGREDIENTS */}
        <section style={{ padding: isMobile ? "0 20px 60px" : "0 80px 80px", background:"#ffefc8" }}>
          <div style={{ textAlign:"center", padding: isMobile ? "48px 0 32px" : "64px 0 48px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ED7E80", borderRadius:999, padding:"7px 20px", fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#fff", marginBottom:20, textTransform:"uppercase" as const }}>
              {t("INGREDIENTS","素材")}
            </div>
            <h2 style={{ fontWeight:800, fontSize: isMobile ? 20 : 28, color:"#6f471c", margin:0 }}>
              {t("Ingredients — The Perfect Union of Japan and America","素材——日本最高のものを使って")}
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 24 }}>
            {[
              {
                src:"/images/ingredient-nori-field.png",
                label:t("ARIAKE NORI (Premium Seaweed)","有明海苔（プレミアム海苔）"),
                body:t("Sourced from the Ariake Sea in Kyushu, this is Japan's most prized seaweed. Its delicate aroma and crisp snap elevate the overall quality and sophistication of our onigiri.",
                       "九州の有明海から収穫された、日本で最も珍重される海苔です。繊細な香りとパリパリとした食感が、おにぎりの品質と洗練さを高めます。"),
              },
              {
                src:"/images/ingredient-ume-orchard.png",
                label:t("KISHU UME (Organic Pickled Plum)","紀州梅（オーガニック梅干し）"),
                body:t("We use the 'Gold Standard' of Japanese plums—exceedingly rare, certified organic ume from Wakayama. Through personal visits to the orchards, we have witnessed firsthand the deep commitment to sustainable, chemical-free farming. Each fruit is hand-selected for its exquisite balance, specifically chosen to elevate the natural sweetness of our rice.",
                       "日本の梅のゴールドスタンダード——極めて希少な、認定オーガニックの紀州和歌山梅。農園への直接訪問を通じて、厳格な基準を満たす梅のみを選定しています。"),
              },
              {
                src:"/images/ingredient-rice-field.png",
                label:t("TENKEI RICE (California Super Premium)","天麗米（カリフォルニアスーパープレミアム）"),
                body:t("Our canvas is Tenkei, a super-premium grain grown in the fertile soils of California. After rigorous testing with our AIHO system, we selected this specific grain for its unparalleled ability to achieve the perfect balance of sweetness and texture. By combining American-grown freshness with Japanese precision, we have crafted the ultimate bite.",
                       "「天麗米」はカリフォルニアの肥沃な土壌で育てられたスーパープレミアム米です。日本の最高品種を広く探し、甘みと食感の完璧なバランスを実現するこの品種を選びました。"),
              },
            ].map((item) => (
              <div key={item.label} style={{ background:"#fff", borderRadius:16, overflow:"hidden" }}>
                <div style={{ height:160, background:"#c8bfb5", overflow:"hidden" }}>
                  <img src={item.src} alt={item.label} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding:"16px 18px 20px" }}>
                  <div style={{ fontWeight:800, fontSize:11, color:"#6f471c", marginBottom:8, textTransform:"uppercase" as const, letterSpacing:0.5, lineHeight:1.4 }}>{item.label}</div>
                  <p style={{ color:"#6f471c", fontSize:12, lineHeight:1.75, margin:0 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign:"center", marginTop: isMobile ? 48 : 64, padding: isMobile ? "32px 0 8px" : "48px 0 16px" }}>
            <p style={{ color:"#6f471c", fontSize: isMobile ? 14 : 16, fontWeight:600, margin:"0 0 20px", lineHeight:1.7 }}>
              {t("Taste the tradition for yourself.","伝統の味を、ぜひご自身でお確かめください。")}
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" as const }}>
              <Link href="/products" style={{ display:"inline-block", background:"#ed7e80", color:"#fff", padding: isMobile ? "13px 28px" : "16px 48px", borderRadius:999, fontWeight:800, fontSize: isMobile ? 14 : 16, textDecoration:"none", boxShadow:"0 4px 20px rgba(237,126,128,0.35)" }}>
                {t("Explore Our Flavors →","フレーバーを見る →")}
              </Link>
              <Link href="/wholesale" style={{ display:"inline-block", background:"#fff", color:"#6f471c", padding: isMobile ? "13px 28px" : "16px 48px", borderRadius:999, fontWeight:800, fontSize: isMobile ? 14 : 16, textDecoration:"none", border:"2px solid #e8d8b8", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
                {t("Partner With Us →","パートナーになる →")}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}