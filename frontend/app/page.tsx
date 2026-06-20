"use client";
import Header from "./components/Header";
import OurFlavors from "./components/OurFlavors";
import FindUsNearYou from "./components/Findusnearyou";
import TrustedBy from "./components/TrustedBy";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Crimson_Text } from "next/font/google";
import { useLang } from "./context/LangContext";

const crimson = Crimson_Text({ subsets:["latin"], weight:["400","600","700"], style:["normal","italic"] });

function InstagramScript() {
  useEffect(() => {
    if (document.getElementById("ig-embed-script")) return;
    const s = document.createElement("script");
    s.id = "ig-embed-script";
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return null;
}

function IgPost({ url }: { url: string }) {
  useEffect(() => {
    if ((window as any).instgrm) (window as any).instgrm.Embeds.process();
  }, []);
  const html = [
    '<blockquote',
    'class="instagram-media"',
    'data-instgrm-permalink="' + url + '"',
    'data-instgrm-version="14"',
    'style="background:#fff;border:0;margin:0;padding:0;width:100%;min-width:0;">',
    '</blockquote>',
  ].join(' ');
  return (
    <div style={{ borderRadius:20, overflow:"hidden", background:"#fff", height:400, position:"relative" as const }}>
      <div style={{ position:"absolute" as const, top:-62, left:-16, right:-16, bottom:-120, overflow:"hidden" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

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

// ── Confetti ──
function Confetti() {
  const [pieces, setPieces] = useState<Array<{
    id: number; x: number; color: string; size: number;
    duration: number; delay: number; shape: string;
  }>>([]);

  useEffect(() => {
    const colors = ["#ed7e80","#ffd700","#6f471c","#4ecdc4","#ff8080","#ffefc8","#a8e6cf","#f3a8b6"];
    const shapes = ["●","■","▲","★","♦"];
    const newPieces = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 14 + 6,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 8,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9999, overflow:"hidden" }}>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position:"absolute",
            left:`${p.x}%`,
            top:-20,
            fontSize:p.size,
            color:p.color,
            animation:`confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}

// ── California Launch Banner (replaces countdown) ──
function CaliforniaLaunchBanner({ isMobile, t }: { isMobile: boolean; t: (en: string, ja: string) => string }) {
  return (
    <section style={{ background:"#fdefc8", padding: isMobile ? "40px 24px 48px" : "56px 80px 64px", textAlign:"center", position:"relative" as const, overflow:"hidden" }}>
      {/* Background confetti dots decoration */}
      <div style={{ position:"absolute", inset:0, opacity:0.06, backgroundImage:"radial-gradient(circle, #6f471c 1px, transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", borderRadius:999, padding:"6px 18px", marginBottom:16 }}>
          <span style={{ fontWeight:700, color:"#fff", fontSize:11, letterSpacing:2, textTransform:"uppercase" as const }}>
            🎉 {t("NOW OPEN","本日オープン")} 🎉
          </span>
        </div>

        <h2 style={{ fontWeight:900, fontSize: isMobile ? 26 : 38, color:"#6f471c", margin:"0 0 10px", lineHeight:1.2 }}>
          {t("We're in California!","カリフォルニアに上陸しました！")}
        </h2>

        <p style={{ color:"#8a6a4a", fontSize: isMobile ? 14 : 17, margin:"0 0 8px", fontWeight:600 }}>
          {t("Now available at T&T Supermarket San Jose","T&T Supermarket サンノゼ店にて販売開始")}
        </p>

        <p style={{ color:"#a07850", fontSize: isMobile ? 12 : 14, margin:"0 0 28px" }}>
          📍 {t("Westgate Center, Suite #501 · 1600 Saratoga Ave, San Jose, CA 95129","Westgate Center, Suite #501 · 1600 Saratoga Ave, San Jose, CA 95129")}
        </p>

        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" as const }}>
          <a
            href="https://maps.google.com/?q=1600+Saratoga+Ave+San+Jose+CA+95129"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display:"inline-block", background:"#6f471c", color:"#fff", padding: isMobile ? "12px 24px" : "14px 32px", borderRadius:999, fontWeight:700, fontSize: isMobile ? 13 : 15, textDecoration:"none" }}
          >
            {t("Get Directions →","道順を見る →")}
          </a>
          <Link
            href="/products"
            style={{ display:"inline-block", background:"#fff", color:"#6f471c", border:"2px solid #e8d8b8", padding: isMobile ? "12px 24px" : "14px 32px", borderRadius:999, fontWeight:700, fontSize: isMobile ? 13 : 15, textDecoration:"none" }}
          >
            {t("See Our Flavors →","フレーバーを見る →")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti on load, fade after 6s
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  const whyItems = [
    {
      n:"01", img:"/images/why-ingredients.png", mascot:"/images/char-stm.png",
      title: t("Integrity in Ingredients","素材へのこだわり"),
      body: t("Sourced with Care. From the premium nori of Ariake Bay to the finest ume of Kishu, we source only the highest quality ingredients, including organic elements. We pour our passion for quality into every single onigiri we deliver.",
              "日本最高峰の漁場が育んだ有明海産の海苔から、和歌山産・1％以下の希少なオーガニック紀州梅にいたるまで、本当に安心・安全な食材だけを厳選。品質への妥協なき情熱を、その一つひとつに込めて届けます。"),
    },
    {
      n:"02", img:"/images/why-healthy-1.png", mascot:"/images/char-ps.png",
      title: t("Healthy & Satisfying","手軽に、しっかり栄養"),
      body: t("Energy for Your Day. The natural umami of perfectly cooked rice paired with high-quality proteins like salmon and spicy tuna. We provide a deeply satisfying meal that fuels your busy modern lifestyle with lasting energy.",
              "ふっくら炊き上げたお米本来の旨みと、厳選した鮭やスパイシーツナといった良質なタンパク質。忙しい現代のライフスタイルに、確かな満足感とエネルギーを美味しくチャージします。"),
    },
    {
      n:"03", img:"/images/why-fresh.png", mascot:"/images/char-cg.png",
      title: t("Made Fresh Daily","毎日、できたての新鮮さを"),
      body: t("Made Daily, Ready to Grab. Prepared fresh every single day. Whether you are between meetings or on the move, enjoy an authentic, high-quality meal anytime, anywhere without compromise.",
              "毎日作りたてのおにぎりをお届け。仕事の合間や、ちょっとした移動時間でも、素材本来の豊かな風味を引き立てた、本格的な味わいを楽しめます。"),
    },
    {
      n:"04", img:"/images/why-scale-1.png", mascot:"/images/char-s.png",
      title: t("Consistency & Scalability","変わらない品質と、究極の食感"),
      body: t("Powered by Japanese Technology. Our onigiri features the signature fluffy texture of hand-pressed rice, achieved through FUJISEIKI — the same world-leading technology trusted by Japan's top convenience chains.",
              "日本のトップチェーンを支える「不二精機」の成形技術と、大規模炊飯をリードする「AIHO」の最先端システムを導入。徹底した衛生管理と大量供給を可能にしながら、いつでも変わらない品質と、手結びのような「ふっくら」とした究極の食感をお届けします。"),
    },
  ];

  const tickerEn = "🎉 NOW OPEN in San Jose, California — T&T Supermarket, 1600 Saratoga Ave  ·  📺 Featured on KING 5 News  ·  🏟️ Now at T-Mobile Park (Mariners)  ·  📰 Covered by Lookout Landing, Seattle Weekly & more  ·  🛒 Find us at PCC, T&T, Town & Country  ·";
  const tickerJa = "🎉 カリフォルニア・サンノゼ本日オープン！— T&T Supermarket, 1600 Saratoga Ave  ·  📺 KING 5 Newsに特集掲載  ·  🏟️ T-Mobileパーク（マリナーズ）に出店中  ·  📰 Lookout Landing・Seattle Weeklyなど多数掲載  ·  🛒 PCC・T&T・Town & Countryで販売中  ·";

  return (
    <>
      <Header />
      {showConfetti && <Confetti />}
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff", marginTop:72 }}>

        {/* ── NEWS TICKER BAR ── */}
        <style>{`
          @keyframes ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <Link href="/media" style={{ textDecoration:"none", display:"block" }}>
          <div style={{ background:"#6f471c", color:"#fff", overflow:"hidden", height:36, display:"flex", alignItems:"center", cursor:"pointer" }}>
            <div style={{ background:"#ed7e80", color:"#fff", fontSize:10, fontWeight:800, letterSpacing:1.5, padding:"4px 14px", flexShrink:0, height:"100%", display:"flex", alignItems:"center", zIndex:2 }}>
              🎉 {t("NOW OPEN","本日開店")}
            </div>
            <div style={{ overflow:"hidden", flex:1, position:"relative" as const }}>
              <div style={{ display:"flex", animation:"ticker-scroll 35s linear infinite", width:"max-content", whiteSpace:"nowrap" as const }}>
                <span style={{ fontSize:12, fontWeight:600, opacity:0.95, padding:"0 40px" }}>{t(tickerEn, tickerJa)}</span>
                <span style={{ fontSize:12, fontWeight:600, opacity:0.95, padding:"0 40px" }}>{t(tickerEn, tickerJa)}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── HERO ── */}
        <section style={{ background:"#fdf5ef", marginTop:48 }}>
          <div style={{ overflow:"hidden", height: isMobile ? 380 : 580, position:"relative" as const }}>
            <style>{`
              @keyframes hero-scroll-mobile {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-1008px); }
              }
              @keyframes hero-scroll-desktop {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-2448px); }
              }
            `}</style>
            <div style={{
              display:"flex", gap:16, height:"100%",
              width: isMobile ? "2032px" : "4912px",
              animation: isMobile
                ? "hero-scroll-mobile 30s linear infinite"
                : "hero-scroll-desktop 60s linear infinite",
            }}>
              {[...Array(2)].map((_, pass) =>
                ["/images/hero-10.jpg","/images/hero-11.jpg","/images/hero-14.jpg","/images/hero-4.jpg"].map((src, i) => (
                  <div key={`${pass}-${i}`} style={{ width: isMobile ? 240 : 600, height:"100%", borderRadius:"20px 20px 0 0", overflow:"hidden", flexShrink:0, background:"#c8bfb5" }}>
                    <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }} />
                  </div>
                ))
              )}
            </div>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:2, lineHeight:0 }}>
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ display:"block", width:"100%", height: isMobile ? 60 : 120 }}>
                <path d="M0,60 C120,120 240,0 360,60 C480,120 600,0 720,60 C840,120 960,0 1080,60 C1200,120 1320,0 1440,60 L1440,120 L0,120 Z" fill="#fdefc8" />
              </svg>
            </div>
          </div>

          <div style={{ background:"#fdefc8", marginTop:-1 }}>
            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              padding: isMobile ? "24px 24px 60px" : "20px 48px 80px",
              position:"relative" as const,
              gap: isMobile ? 24 : 0,
            }}>
              {!isMobile ? (
                <div style={{ position:"relative" as const, minHeight:260 }}>
                  <img src="/images/char-pp.png" alt="" style={{ position:"absolute", bottom:100, left:60,  height:120, objectFit:"contain" as const }} />
                  <img src="/images/char-s.png"  alt="" style={{ position:"absolute", bottom:100, left:180, height:130, objectFit:"contain" as const }} />
                  <img src="/images/char-bc.png" alt="" style={{ position:"absolute", bottom:120, left:320, height:140, objectFit:"contain" as const }} />
                </div>
              ) : (
                <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:8, marginBottom:8, marginTop:-8 }}>
                  <img src="/images/char-pp.png" alt="" style={{ height:72, objectFit:"contain" as const }} />
                  <img src="/images/char-s.png"  alt="" style={{ height:80, objectFit:"contain" as const }} />
                  <img src="/images/char-bc.png" alt="" style={{ height:88, objectFit:"contain" as const }} />
                </div>
              )}
              <div style={{ display:"flex", flexDirection:"column" as const, justifyContent:"center", paddingLeft: isMobile ? 0 : 40, marginTop: isMobile ? 0 : -60 }}>
                <h1 style={{ fontWeight:900, fontSize: isMobile ? 32 : 44, color:"#6f471c", lineHeight:1.2, margin:"0 0 16px" }}>
                  {t("Japan's Tradition.\nScaled for America.","日本の伝統を、\nアメリカの日常へ。")}
                </h1>
                <p style={{ color:"#8a6a4a", fontSize: isMobile ? 14 : 15, lineHeight:1.7, margin:"0 0 28px", maxWidth:380 }}>
                  {t("Fresh, healthy, and portable — Japan's favorite everyday meal, now made for America.",
                     "新鮮でヘルシー、そしてどこへでも。 \n日本で愛され続ける「おにぎり」という食文化を、アメリカでも。")}
                </p>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const }}>
                  <Link href="/products" style={{ background:"#e8847a", color:"#fff", padding: isMobile ? "13px 24px" : "16px 36px", borderRadius:999, fontWeight:700, fontSize: isMobile ? 14 : 15, textDecoration:"none" }}>
                    {t("Find Us Near You","お取り扱い店舗を探す")}
                  </Link>
                  <Link href="/wholesale" style={{ background:"#fff", color:"#2a2a2a", padding: isMobile ? "13px 24px" : "16px 36px", borderRadius:999, fontWeight:700, fontSize: isMobile ? 14 : 15, textDecoration:"none", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
                    {t("Partner With Us","パートナーシップについて")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CALIFORNIA LAUNCH BANNER ── */}
        <CaliforniaLaunchBanner isMobile={isMobile} t={t} />

        {/* ── TRUSTED BY ── */}
        <TrustedBy />

        {/* ── WHY ONIGIRI SEN ── */}
        <section style={{ padding: isMobile ? "48px 24px 80px" : "80px 80px 100px", background:"#fff9f5", position:"relative" as const }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize: isMobile ? 24 : 30, color:"#6f471c", margin:"0 0 40px" }}>
            {t("Why Onigiri Sen","Onigiri Sen を選ぶ理由")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 32, alignItems:"start" }}>
            {whyItems.map((item, idx) => (
              <div key={item.n} style={{ position:"relative" as const, marginTop: !isMobile && idx % 2 === 1 ? 80 : 0 }}>
                <div style={{ background:"#fff", borderRadius:24, border:"2px dashed #f5aaaa", overflow:"hidden", paddingBottom:24 }}>
                  <div style={{ position:"relative" as const, height: isMobile ? 180 : 240, overflow:"hidden" }}>
                    <img src={item.img} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", objectPosition: item.n === "04" ? "center 70%" : "center center" }} />
                    <div style={{ position:"absolute", bottom:8, left:16, fontWeight:900, fontSize: isMobile ? 48 : 64, lineHeight:1, color:"#f5a0a0", opacity:0.9 }}>
                      {item.n}
                    </div>
                  </div>
                  <div style={{ padding:"20px 24px 4px", textAlign:"center" as const }}>
                    <h3 style={{ fontWeight:800, fontSize: isMobile ? 16 : 18, color:"#6f471c", margin:"0 0 10px" }}>{item.title}</h3>
                    <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.8, margin:0 }}>{item.body}</p>
                  </div>
                </div>
                <img src={item.mascot} alt="" style={{ position:"absolute", bottom:-36, right:-12, height: isMobile ? 70 : 90, objectFit:"contain" as const, zIndex:2 }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:64 }}>
            <Link href="/wholesale" style={{ display:"inline-block", background:"#ed7e80", color:"#fff", padding: isMobile ? "14px 32px" : "16px 48px", borderRadius:999, fontWeight:800, fontSize: isMobile ? 14 : 16, textDecoration:"none", boxShadow:"0 4px 20px rgba(111,71,28,0.25)" }}>
              {t("Partner With Us →","パートナーシップについて →")}
            </Link>
          </div>
        </section>

        {/* ── WHAT IS ONIGIRI SEN BANNER ── */}
        <section style={{ position:"relative", overflow:"hidden", color:"#fff", minHeight: isMobile ? 280 : 360 }}>
          <img src="/images/hero-what.png" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"rgba(40,60,70,0.5)" }} />
          <div style={{ position:"relative", zIndex:1, padding: isMobile ? "48px 24px" : "80px 80px" }}>
            <span style={{ background:"#ffefc8", color:"#6f471c", borderRadius:999, padding:"8px 16px", fontSize:11, fontWeight:700, letterSpacing:1, display:"inline-block", marginBottom:16 }}>
              {t("WHAT IS ONIGIRI SEN?","Onigiri Sen とは?")}
            </span>
            <h2 style={{ fontWeight:700, fontSize: isMobile ? 28 : 42, lineHeight:1.2, margin:"0 0 16px", maxWidth:560, fontFamily:crimson.style.fontFamily }}>
              {t("A 1,000-Year Tradition for the Next 1,000 Years","千年の伝統を、次の千年へ。")}
            </h2>
            <p style={{ opacity:0.9, fontSize: isMobile ? 15 : 17, lineHeight:1.8, margin:"0 0 28px", maxWidth:500, fontFamily:crimson.style.fontFamily }}>
              {t("Onigiri has nourished Japan for over a millennium. We're bringing that tradition to America — made fresh daily with premium ingredients, wrapped in authentic Ariake nori.",
                 "手軽さばかりが求められる時代だからこそ、体に良くて本当に美味しいものを。千年以上続く日本の伝統に根ざした、心もお腹も満たされる健康的なおにぎりで、忙しい毎日を支える、新しい食の習慣をお届けします。")}
            </p>
            <Link href="/our-story" style={{ display:"inline-block", background:"#fff", color:"#4a6a7a", padding: isMobile ? "11px 22px" : "13px 28px", borderRadius:999, fontWeight:700, fontSize: isMobile ? 14 : 15, textDecoration:"none" }}>
              {t("Read Our Story →","私たちのストーリー →")}
            </Link>
          </div>
        </section>

        {/* ── OUR FLAVORS ── */}
        <OurFlavors />
        <div style={{ textAlign:"center", padding:"0 0 64px", background:"#fff9f5" }}>
          <Link href="/products" style={{ display:"inline-block", background:"#e8847a", color:"#fff", padding: isMobile ? "12px 24px" : "13px 28px", borderRadius:999, fontWeight:700, fontSize: isMobile ? 14 : 15, textDecoration:"none" }}>
            {t("See All Products →","商品一覧を見る →")}
          </Link>
        </div>

        {/* ── FIND US ── */}
        <FindUsNearYou />

        {/* ── INSTAGRAM ── */}
        <section style={{ background:"#f07878", padding: isMobile ? "48px 20px" : "64px 80px", textAlign:"center", color:"#fff" }}>
          <InstagramScript />
          <div style={{ fontWeight:700, fontSize:12, letterSpacing:3, marginBottom:8, opacity:0.85 }}>INSTAGRAM</div>
          <h2 style={{ fontWeight:900, fontSize: isMobile ? 30 : 42, margin:"0 0 8px" }}>
            {t("Follow Along !","私たちのストーリーをInstagramでフォロー！")}
          </h2>
          <p style={{ fontSize:16, opacity:0.85, margin:"0 0 24px" }}>@onigirisen.jp</p>
          <img src="/images/char-instagram.png" alt="" style={{ height: isMobile ? 180 : 300, objectFit:"contain" as const, display:"block", margin:"0 auto 24px" }} />
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap:16, maxWidth:960, margin:"0 auto 36px" }}>
            <IgPost url="https://www.instagram.com/p/DZTB6vPBjIt/" />
            {!isMobile && <IgPost url="https://www.instagram.com/p/DZvWIG0Beh7/" />}
            {!isMobile && <IgPost url="https://www.instagram.com/p/DZp98ytJyr4/" />}
          </div>
          <Link href="https://instagram.com/onigirisen.jp" target="_blank" style={{ display:"inline-block", border:"2px solid rgba(255,255,255,0.6)", color:"#fff", padding:"11px 28px", borderRadius:999, fontWeight:700, fontSize:14, textDecoration:"none" }}>
            {t("View on Instagram","Onigiri Sen をフォローする →")}
          </Link>
        </section>

      </main>
    </>
  );
}