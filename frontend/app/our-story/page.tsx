"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useLang } from "../context/LangContext";

/*
  Images needed (place in /public/images/):
    story-mission-bg.jpg       — ocean/landscape banner background
    story-founder.jpg          — Rina Oike portrait
    story-timeline-1.jpg       — 75sqft kitchen
    story-timeline-2.jpg       — PCC partnership
    story-timeline-3.jpg       — T-Mobile Park
    story-fujiseiki.jpg        — FUJISEIKI machine
    story-aiho.jpg             — AIHO rice cooker
    ingredient-nori-field.jpg  — Ariake nori harvest
    ingredient-ume-orchard.jpg — Kishu ume orchard
    ingredient-rice-field.jpg  — Tenrei rice field
*/

function ImgBox({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  return (
    <div style={{ background:"#c8bfb5", overflow:"hidden", ...style }}>
      {/* <Image src={src} alt={alt} fill style={{objectFit:"cover"}} /> */}
    </div>
  );
}

const outlineBtn: React.CSSProperties = { display:"inline-block", border:"1.5px solid #c06060", color:"#c06060", padding:"9px 20px", borderRadius:999, fontWeight:700, fontSize:13, textDecoration:"none", fontFamily:"Nunito, sans-serif" };

export default function OurStoryPage() {
  const { t } = useLang();

  return (
    <>
      <Header />
      <main style={{ fontFamily:"Nunito, sans-serif", background:"#fff" }}>

        <section style={{ padding:"80px 80px 0", textAlign:"center" }}>
          <h1 style={{ fontWeight:800, fontSize:32, color:"#2a2a2a", margin:0 }}>{t("Our Story","私たちのストーリー")}</h1>
        </section>

        {/* Mission banner */}
        <section style={{ margin:"36px 80px", borderRadius:24, overflow:"hidden", position:"relative", minHeight:320, background:"linear-gradient(160deg, #6a8898 0%, #7aa4b8 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"64px 80px", color:"#fff" }}>
          {/* <Image src="/images/story-mission-bg.jpg" alt="Mission" fill style={{objectFit:"cover",opacity:0.3}} /> */}
          <h2 style={{ fontWeight:900, fontSize:36, lineHeight:1.2, margin:"0 0 20px", position:"relative" }}>
            {t("Mission\nBringing Onigiri into American Daily Life.","ミッション\nおにぎりをアメリカの日常へ")}
          </h2>
          <p style={{ maxWidth:620, fontSize:16, lineHeight:1.8, opacity:0.88, margin:0, position:"relative" }}>
            {t("We are making Japan's 1,000-year-old food culture more accessible than ever. By combining premium ingredients with masterful techniques, we provide the ultimate choice for those seeking a quick, delicious, and healthy meal — even in the busiest of lives.",
               "日本の1,000年の食文化をこれまで以上に身近にしています。最高の食材と卓越した技術を組み合わせ、忙しい毎日でも手軽に美味しく健康的な食事を提供します。")}
          </p>
        </section>

        {/* Founder */}
        <section style={{ margin:"0 80px 40px", background:"#fce8e4", borderRadius:24, padding:"48px", display:"grid", gridTemplateColumns:"1fr auto", gap:48, alignItems:"start" }}>
          <div>
            <h2 style={{ fontWeight:900, fontSize:26, color:"#c85050", margin:"0 0 16px" }}>{t("Founder's Story","創業者のストーリー")}</h2>
            <p style={{ color:"#7a4040", fontSize:15, lineHeight:1.85, margin:"0 0 28px" }}>
              {t("Growing up in Japan, Rina Oike always had onigiri by her side — it was a simple, everyday comfort that nourished both body and soul. However, when she moved to the U.S. alone for her studies, she was struck by a harsh reality — the fast food was everywhere but convenient, delicious, and healthy options were remarkably scarce. She wanted to provide a meal that is quick, tasty, and truly good for you. Driven by this vision, her kitchen in Seattle began to resonate with a growing community of partners and customers. Today, she is blending a 1,000-year tradition with cutting-edge technology to rear Japanese onigiri into America as a new cultural pillar.",
                 "日本で育った及川里奈は、常におにぎりを傍らに置いていました。しかし、留学のために一人でアメリカへ渡ったとき、ファストフードが溢れる中で、便利で美味しく健康的な選択肢がほとんどないという厳しい現実に直面しました。この思いから、シアトルのキッチンで始まった事業は、多くのパートナーや顧客の支持を集めています。今日、1,000年の伝統と最先端の技術を融合させ、日本のおにぎりをアメリカの新しい文化の柱として育てています。")}
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href="#" style={outlineBtn}>{t("Watch the KING 5 Feature →","KING 5 特集を見る →")}</a>
              <a href="#" style={outlineBtn}>{t("Read the Jungle City Interview →","Jungle Cityインタビューを読む →")}</a>
            </div>
          </div>
          <div style={{ textAlign:"center", flexShrink:0 }}>
            <ImgBox src="/images/story-founder.jpg" alt="Rina Oike" style={{ width:100, height:100, borderRadius:"50%", margin:"0 auto 12px" }} />
            <div style={{ fontWeight:800, fontSize:14, color:"#2a2a2a" }}>RINA OIKE</div>
            <div style={{ fontSize:12, color:"#a08080" }}>{t("Founder & CEO, Onigiri Sen","創業者 & CEO、おにぎり千")}</div>
          </div>
        </section>

        {/* 1000 years */}
        <section style={{ background:"linear-gradient(180deg, #8090a0 0%, #a0b4c4 100%)", padding:"80px 80px", color:"#fff", textAlign:"center" }}>
          <div style={{ display:"inline-block", border:"1.5px solid rgba(255,255,255,0.5)", borderRadius:10, padding:"6px 20px", fontSize:18, marginBottom:28 }}>⬛</div>
          <h2 style={{ fontWeight:900, fontSize:40, lineHeight:1.2, margin:"0 0 24px" }}>
            {t("A 1,000-Year Tradition for\nthe Next 1,000 Years","1,000年の伝統を\n次の1,000年へ")}
          </h2>
          <p style={{ maxWidth:560, margin:"0 auto", opacity:0.85, fontSize:16, lineHeight:1.85 }}>
            {t("The name Onigiri Sen — Sen (千) meaning one thousand — carries a simple but powerful wish: to take a tradition that has lasted 1,000 years, and keep it for 1,000 more. Starting with Seattle. Expanding across America.",
               "おにぎり千という名前——千は1,000を意味します——は、1,000年続いた伝統をさらに1,000年続けるというシンプルで力強い願いを込めています。シアトルからアメリカ全土へ。")}
          </p>
        </section>

        {/* Timeline */}
        <section style={{ padding:"80px 80px", background:"#fdf9f2" }}>
          <div style={{ marginBottom:48 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fce8e4", borderRadius:999, padding:"8px 20px" }}>
              <span style={{ fontWeight:700, color:"#c85050", fontSize:14 }}>{t("A Journey Started in 2025","2025年に始まった旅")}</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
            <div>
              {[
                { date:"2025 Jan", dotColor:"#e8847a", img:"/images/story-timeline-1.jpg",
                  title:t("The 75sqft Foundation","75平方フィートの出発点"),
                  body:t("It all started as a dream within a tiny 75sqft kitchen. Our journey began at T&T Supermarket, the very first partner to believe in our mission.",
                         "すべては75平方フィートの小さなキッチンでの夢から始まりました。T&Tスーパーマーケットが最初のパートナーとなりました。") },
                { date:"2025 Late", dotColor:"#7ab4c8", img:"/images/story-timeline-2.jpg",
                  title:t("Building Trust & Scale","信頼とスケールの構築"),
                  body:t("Integrity earned partnerships. By expanding to PCC Community Markets, we successfully established our presence in the Seattle organic food market.",
                         "誠実さがパートナーシップを生みました。PCCコミュニティマーケットへの展開により、シアトルのオーガニック食品市場での地位を確立しました。") },
                { date:"2026", dotColor:"#2a2a2a", img:"/images/story-timeline-3.jpg",
                  title:t("Scaling the Vision","ビジョンの拡大"),
                  body:t("The momentum continues. This year, we expand to T-Mobile Park stadium and take our next big leap into San Francisco. California is next.",
                         "勢いは続きます。今年はTモバイルパーク球場に展開し、サンフランシスコへの大きな一歩を踏み出します。カリフォルニアが次の目標です。") },
              ].map((item, i) => (
                <div key={item.date} style={{ display:"grid", gridTemplateColumns:"72px 16px 1fr", gap:"0 16px", marginBottom:i<2?36:0 }}>
                  <div style={{ fontWeight:700, fontSize:13, color:"#999", paddingTop:2, textAlign:"right" }}>{item.date}</div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ width:14, height:14, borderRadius:"50%", background:item.dotColor, flexShrink:0, marginTop:2 }} />
                    {i<2 && <div style={{ width:2, flex:1, background:"#e8e0d8", marginTop:4 }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:16, color:"#1a1a1a", marginBottom:6 }}>{item.title}</div>
                    <p style={{ color:"#777", fontSize:14, lineHeight:1.7, margin:0 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {["/images/story-timeline-1.jpg","/images/story-timeline-2.jpg","/images/story-timeline-3.jpg"].map((src,i) => (
                <ImgBox key={i} src={src} alt={`Timeline ${i+1}`} style={{ flex:1, minHeight:110, borderRadius:16 }} />
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section style={{ padding:"80px 80px" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#f0ebe4", borderRadius:999, padding:"7px 20px", fontSize:12, fontWeight:700, letterSpacing:1, color:"#5a4a3a", marginBottom:20 }}>
              {t("TECHNOLOGY","テクノロジー")}
            </div>
            <h2 style={{ fontWeight:800, fontSize:30, color:"#1a1a1a", margin:"0 0 10px" }}>{t("Powered by Global Food-Tech","グローバルフードテクで動く")}</h2>
            <p style={{ color:"#999", fontSize:15, margin:0 }}>{t("The Secret Behind Every Perfect Onigiri Bite","すべての完璧なおにぎりの秘密")}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            {[
              { src:"/images/story-fujiseiki.jpg", brand:t("FUJISEIKI — World's #1\nOnigiri Machine Manufacturer","FUJISEIKI — 世界シェアNo.1\nおにぎり成型機メーカー"),
                sub:t("Japan's Standard: Near 100% Share","日本の標準：約100%のシェア"),
                body:t("We utilize forming machines from FUJISEIKI — trusted by all major Japanese convenience chains — alongside industrial IH rice-cooking systems from AIHO. Together, we reproduce the delicate texture of hand-pressed onigiri through the power of precision science.",
                       "不二精機の成型機と、AIHOの業務用IH炊飯システムを組み合わせ、手握りの繊細な食感を精密な科学の力で再現しています。"),
                link:"FUJISEIKI → 不二精機" },
              { src:"/images/story-aiho.jpg", brand:t("AIHO — The Gold Standard\nof Rice Cooking","AIHO — 炊飯の\nゴールドスタンダード"),
                sub:t("Engineered for the Perfect Grain","完璧な一粒のために設計"),
                body:t("Great onigiri starts with perfect rice. AIHO's professional-grade IH pressure cooking system — trusted by Japan's largest rice producers — extracts the ideal sweetness and stickiness of every grain. Tender, fragrant, and delicious even when cold.",
                       "美味しいおにぎりは完璧なお米から始まります。AIHOの業務用IH圧力炊飯システムは、日本最大の米生産者に信頼されており、各粒の理想的な甘みと粘り気を引き出します。"),
                link:"AIHO → アイホ" },
            ].map((item) => (
              <div key={item.brand} style={{ background:"#faf6f0", borderRadius:20, overflow:"hidden" }}>
                <ImgBox src={item.src} alt={item.brand} style={{ height:150 }} />
                <div style={{ padding:28 }}>
                  <div style={{ fontWeight:900, fontSize:17, color:"#1a1a1a", whiteSpace:"pre-line", marginBottom:6 }}>{item.brand}</div>
                  <div style={{ fontWeight:700, color:"#888", fontSize:13, marginBottom:12 }}>{item.sub}</div>
                  <p style={{ color:"#666", fontSize:14, lineHeight:1.75, margin:"0 0 16px" }}>{item.body}</p>
                  <a href="#" style={{ color:"#e07070", fontWeight:700, fontSize:13 }}>{item.link}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ingredients */}
        <section style={{ padding:"0 80px 80px" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#f0ebe4", borderRadius:999, padding:"7px 20px", fontSize:12, fontWeight:700, letterSpacing:1, color:"#5a4a3a", marginBottom:20 }}>
              {t("INGREDIENTS","素材")}
            </div>
            <h2 style={{ fontWeight:800, fontSize:30, color:"#1a1a1a", margin:0 }}>{t("Ingredients — Crafted With Japan's Finest","素材——日本最高のものを使って")}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:28 }}>
            {[
              { src:"/images/ingredient-nori-field.jpg", label:t("ARIAKE NORI (Premium Seaweed)","有明海苔（プレミアム海苔）"),
                body:t("Sourced from the Ariake Sea in Kyushu, this is Japan's most prized seaweed. Its delicate aroma and crisp snap elevate the overall quality and sophistication of our onigiri.",
                       "九州の有明海から収穫された、日本で最も珍重される海苔です。繊細な香りとパリパリとした食感が、おにぎりの品質と洗練さを高めます。") },
              { src:"/images/ingredient-ume-orchard.jpg", label:t("KISHU UME (Organic Pickled Plum)","紀州梅（オーガニック梅干し）"),
                body:t("The Gold Standard of Japanese plums — exceedingly rare, certified organic Kishu Wakayama. Through personal visits to the orchards, we have selected only the plum that meet our exacting standards.",
                       "日本の梅のゴールドスタンダード——極めて希少な、認定オーガニックの紀州和歌山梅。農園への直接訪問を通じて、厳格な基準を満たす梅のみを選定しています。") },
              { src:"/images/ingredient-rice-field.jpg", label:t("TENREI RICE (California Super Premium)","天麗米（カリフォルニアスーパープレミアム）"),
                body:t("Our 'Tenrei' is a super-premium grain grown in the fertile soils of California. After an extensive search through Japan's finest rice varieties, we selected this grain for its unparalleled ability to achieve the perfect balance of sweetness and texture.",
                       "「天麗米」はカリフォルニアの肥沃な土壌で育てられたスーパープレミアム米です。日本の最高品種を広く探し、甘みと食感の完璧なバランスを実現するこの品種を選びました。") },
            ].map((item) => (
              <div key={item.label}>
                <ImgBox src={item.src} alt={item.label} style={{ borderRadius:16, height:160, marginBottom:16 }} />
                <div style={{ fontWeight:800, fontSize:13, color:"#1a1a1a", marginBottom:8, textTransform:"uppercase", letterSpacing:0.5 }}>{item.label}</div>
                <p style={{ color:"#777", fontSize:13, lineHeight:1.75, margin:0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}