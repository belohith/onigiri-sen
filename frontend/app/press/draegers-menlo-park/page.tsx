"use client";
import Header from "../../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "../../context/LangContext";

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

const flavors = [
  { nameEn: "Spicy Tuna Mayo",    nameJa: "スパイシーツナマヨ",  noteEn: "Organic · Contains: Egg, Fish (Tuna), and Sesame",           noteJa: "オーガニック · 卵・魚（マグロ）・ごま" },
  { nameEn: "Salmon",             nameJa: "鮭",                  noteEn: "Organic · Gluten-free · Contains: Fish (Salmon)",             noteJa: "オーガニック · グルテンフリー · 魚（鮭）" },
  { nameEn: "Shrimp Mayo",        nameJa: "海老マヨ",             noteEn: "Contains: Egg, Fish (Tuna, Round Herring), Crustacean Shellfish (Shrimp), Soy, and Wheat", noteJa: "卵・魚（マグロ・マイワシ）・甲殻類（エビ）・大豆・小麦" },
  { nameEn: "Yuzu Salmon",        nameJa: "柚子サーモン",         noteEn: "Contains: Egg, Fish (Salmon), and Sesame",                   noteJa: "卵・魚（鮭）・ごま" },
  { nameEn: "Shredded Pork",      nameJa: "シュレッドポーク",     noteEn: "Contains: Egg, Soy, Wheat, and Sesame",                      noteJa: "卵・大豆・小麦・ごま" },
];

export default function DraegersLaunchPressRelease() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const label = (en: string, ja: string) => lang === "ja" ? ja : en;

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff", marginTop:72 }}>

        {/* ── HERO ── */}
        <section style={{ background:"#fff9f5", padding: isMobile ? "48px 24px 32px" : "64px 80px 40px", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", borderRadius:999, padding:"6px 18px", fontSize:11, fontWeight:700, letterSpacing:2, color:"#fff", marginBottom:18, textTransform:"uppercase" as const }}>
            {t("PRESS RELEASE","プレスリリース")}
          </div>
          <div style={{ color:"#bbb", fontSize:13, fontWeight:600, marginBottom:14 }}>
            {label("August 6, 2026", "2026年8月6日")}
          </div>
          <h1 style={{ fontWeight:900, fontSize: isMobile ? 22 : 32, color:"#6f471c", margin:"0 auto", lineHeight:1.35, maxWidth:760 }}>
            {label(
              `Seattle's Onigiri Brand "Onigiri Sen" Expands Bay Area Presence — Now Available at Draeger's Market Menlo Park`,
              `シアトル発おにぎりブランド「Onigiri Sen」、ベイエリアをさらに拡大。Draeger's Market メンロパーク店に新登場。`
            )}
          </h1>
        </section>

        {/* ── BODY ── */}
        <section style={{ padding: isMobile ? "8px 24px 56px" : "8px 80px 80px", maxWidth:800, margin:"0 auto" }}>

          <p style={{ color:"#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight:1.9, margin:"0 0 28px" }}>
            {label(
              `Onigiri Sen, Seattle's fast-growing Japanese rice ball brand, is expanding its Bay Area presence with a new partnership at Draeger's Market in Menlo Park. Starting August 6, 2026, fresh onigiri will be available daily at 1010 University Dr, Menlo Park, CA 94025 — bringing Onigiri Sen to the heart of Silicon Valley.`,
              `シアトル発の急成長おにぎりブランド「Onigiri Sen」が、ベイエリアでの展開をさらに拡大。2026年8月6日より、メンロパークの Draeger's Market（1010 University Dr, Menlo Park, CA 94025）にて毎日新鮮なおにぎりの販売を開始します。シリコンバレーの中心地への進出となります。`
            )}
          </p>

          <h2 style={{ fontWeight:800, fontSize: isMobile ? 18 : 21, color:"#6f471c", margin:"0 0 14px" }}>
            {label("About Draeger's Market","Draeger's Marketについて")}
          </h2>

          <p style={{ color:"#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight:1.9, margin:"0 0 28px" }}>
            {label(
              `Draeger's Market is one of the Bay Area's most beloved specialty grocery stores, renowned for its exceptional selection of premium, artisan, and specialty foods. Its Menlo Park location serves the local community and broader Silicon Valley region with a curated, high-quality offering — making it the perfect partner for Onigiri Sen's expansion into the Peninsula.`,
              `Draeger's Marketは、ベイエリアで長年愛される高級食料品店。プレミアム・アルチザン・スペシャルティフードの豊富なラインナップで知られており、メンロパーク店はシリコンバレー広域の地域住民に上質な食品を提供しています。Onigiri Senのペニンシュラ進出に最適なパートナーとして、今回の出店が実現しました。`
            )}
          </p>

          <h2 style={{ fontWeight:800, fontSize: isMobile ? 18 : 21, color:"#6f471c", margin:"0 0 14px" }}>
            {label("About the brand","ブランドについて")}
          </h2>

          <p style={{ color:"#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight:1.9, margin:"0 0 18px" }}>
            {label(
              `Onigiri Sen was founded in Seattle in 2024 by Rina Oike (age 27, originally from Kagawa, Japan). Having moved to the U.S. for university, she was struck by a simple reality: the onigiri she grew up eating every day in Japan simply didn't exist in America.`,
              `Onigiri Senは、創業者兼CEO・尾池里奈（27歳・香川県出身）がアメリカの大学に留学した際、「日本で当たり前に食べていたおにぎりが、アメリカにはない」という現実から2024年にシアトルで立ち上げたブランドです。`
            )}
          </p>

          <p style={{ color:"#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight:1.9, margin:"0 0 28px" }}>
            {label(
              `The brand uses FUJISEIKI forming technology — the world's #1 market share in hand-wrap onigiri machines — and premium Ariake Bay nori kept separate by a signature three-step wrapper until the moment of consumption. Every onigiri is stamped with a same-day expiration date and made fresh each morning.`,
              `成形には世界シェアNo.1の「不二精機（FUJISEIKI）」技術を採用し、有明海産高級海苔は独自の3ステップフィルムで食べる直前まで鮮度を保護。すべて当日消費期限付きで、毎朝新鮮に製造しています。`
            )}
          </p>

          {/* Pull quote */}
          <div style={{ background:"#ffefc8", borderRadius:20, padding: isMobile ? "24px 22px" : "32px 36px", margin:"0 0 32px" }}>
            <p style={{ color:"#6f471c", fontSize: isMobile ? 15 : 17, lineHeight:1.85, fontStyle:"italic", margin:"0 0 14px" }}>
              {label(
                `"Draeger's has always been a destination for people who care deeply about food quality and provenance. That philosophy aligns perfectly with what we do at Onigiri Sen — bringing Japan's most beloved everyday food to people who appreciate the real thing."`,
                `「Draeger'sは、食の品質と産地にこだわる人々が集まる場所。そのフィロソフィーは、本物のおにぎりを届けるOnigiri Senの理念と完全に一致しています。」`
              )}
            </p>
            <div style={{ fontWeight:800, fontSize:14, color:"#6f471c" }}>
              — {label("Rina Oike, Founder & CEO","尾池里奈 ｜ 創業者兼CEO")}
            </div>
          </div>

          {/* Flavors table */}
          <h2 style={{ fontWeight:800, fontSize: isMobile ? 18 : 21, color:"#6f471c", margin:"0 0 16px" }}>
            {label("Available flavors at Draeger's Menlo Park","Draeger's メンロパーク店 取り扱いフレーバー")}
          </h2>
          <div style={{ border:"1.5px solid #f0e4d4", borderRadius:16, overflow:"hidden", marginBottom:32 }}>
            {flavors.map((f, i) => (
              <div
                key={f.nameEn}
                style={{
                  display:"grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
                  gap: isMobile ? 4 : 0,
                  padding: isMobile ? "14px 16px" : "16px 24px",
                  borderBottom: i < flavors.length - 1 ? "1px solid #f0e4d4" : "none",
                  background: i % 2 === 0 ? "#fff" : "#fff9f5",
                }}
              >
                <div style={{ fontWeight:800, color:"#6f471c", fontSize:14 }}>{label(f.nameEn, f.nameJa)}</div>
                <div style={{ color:"#8a6a4a", fontSize:13 }}>{label(f.noteEn, f.noteJa)}</div>
              </div>
            ))}
          </div>

          {/* Location details */}
          <h2 style={{ fontWeight:800, fontSize: isMobile ? 18 : 21, color:"#6f471c", margin:"0 0 16px" }}>
            {label("Location details","店舗詳細")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "140px 1fr", gap: isMobile ? "6px 0" : "14px 24px", marginBottom:32, fontSize: isMobile ? 14 : 15 }}>
            <div style={{ fontWeight:800, color:"#6f471c" }}>{label("Location","場所")}</div>
            <div style={{ color:"#3a2a1a", lineHeight:1.8 }}>Draeger's Market Menlo Park · 1010 University Dr, Menlo Park, CA 94025</div>

            <div style={{ fontWeight:800, color:"#6f471c", marginTop: isMobile ? 10 : 0 }}>{label("Hours","営業時間")}</div>
            <div style={{ color:"#3a2a1a", lineHeight:1.8 }}>{label("Daily 7:00 AM – 9:00 PM","毎日 7:00〜21:00")}</div>

            <div style={{ fontWeight:800, color:"#6f471c", marginTop: isMobile ? 10 : 0 }}>{label("Phone","電話番号")}</div>
            <div style={{ color:"#3a2a1a" }}><a href="tel:6503247700" style={{ color:"#ed7e80", textDecoration:"none" }}>(650) 324-7700</a></div>

            <div style={{ fontWeight:800, color:"#6f471c", marginTop: isMobile ? 10 : 0 }}>{label("Freshness","鮮度")}</div>
            <div style={{ color:"#3a2a1a", lineHeight:1.8 }}>
              {label(
                "Every onigiri is stamped with a same-day expiration date. Made fresh every morning and delivered before store opening. No overnight inventory.",
                "すべて当日消費期限付き。毎朝新鮮に製造し、開店前に納品。前日からの繰り越し在庫は一切なし。"
              )}
            </div>
          </div>

          {/* Allergen disclaimer */}
          <div style={{ background:"#fff9f5", border:"1.5px solid #f0e4d4", borderRadius:12, padding: isMobile ? "16px" : "20px 24px", marginBottom:32 }}>
            <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.7, margin:0, fontStyle:"italic" }}>
              {label(
                "*Allergen information shown is based on our Seattle location. Ingredients are currently being verified for our California locations.",
                "※アレルゲン情報はシアトル店舗のものです。カリフォルニア店舗の原材料は現在確認中です。"
              )}
            </p>
          </div>

          {/* Contact */}
          <div style={{ textAlign:"center" as const, padding: isMobile ? "24px 0 8px" : "32px 0 8px" }}>
            <div style={{ fontWeight:800, fontSize:15, color:"#6f471c", marginBottom:8 }}>
              {label("Press contact","お問い合わせ")}
            </div>
            <p style={{ color:"#8a6a4a", fontSize:13, margin:"0 0 12px" }}>
              {label("For interview requests and media enquiries:","取材・インタビューのご依頼はお気軽にご連絡ください。")}
            </p>
            <a href="mailto:contact@onigirisen.jp" style={{ color:"#ed7e80", fontWeight:700, fontSize:14, textDecoration:"none" }}>
              contact@onigirisen.jp
            </a>
            <div style={{ marginTop:24 }}>
              <Link href="/media" style={{ color:"#bbb", fontSize:13, textDecoration:"none" }}>
                ← {t("Back to Press & Media","プレス・メディアに戻る")}
              </Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}