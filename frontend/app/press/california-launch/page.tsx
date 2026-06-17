"use client";
import Header from "../../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "../../context/LangContext";

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

const flavors = [
  {
    nameEn: "Spicy Tuna Mayo", nameJa: "スパイシーツナマヨ",
    noteEn: "Best seller · Organic · Gluten-free", noteJa: "人気No.1・オーガニック・グルテンフリー",
  },
  {
    nameEn: "Salmon", nameJa: "鮭",
    noteEn: "Organic · Gluten-free", noteJa: "オーガニック・グルテンフリー",
  },
  {
    nameEn: "Shrimp Mayo", nameJa: "海老マヨ",
    noteEn: "Japanese Kewpie mayo", noteJa: "キユーピーマヨネーズ使用",
  },
  {
    nameEn: "Yuzu Salmon", nameJa: "柚子サーモン",
    noteEn: "Gluten-free · Delicate citrus aroma", noteJa: "グルテンフリー・爽やかな柑橘系の香り",
  },
  {
    nameEn: "Shredded Pork ★NEW", nameJa: "シュレッドポーク ★新商品",
    noteEn: "Launching simultaneously in San Jose & Seattle", noteJa: "サンノゼ・シアトル同時発売",
  },
];

export default function CaliforniaLaunchPressRelease() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  const label = (en: string, ja: string) => (lang === "ja" ? ja : en);

  return (
    <>
      <Header />
      <main style={{ fontFamily: "DM Sans, sans-serif", background: "#fff", marginTop: 72 }}>

        {/* ── HERO ── */}
        <section style={{ background: "#fff9f5", padding: isMobile ? "48px 24px 32px" : "64px 80px 40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#ed7e80", borderRadius: 999, padding: "6px 18px", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#fff", marginBottom: 18, textTransform: "uppercase" as const }}>
            {t("PRESS RELEASE","プレスリリース")}
          </div>
          <div style={{ color: "#bbb", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            {label("June 18, 2026", "2026年6月18日")}
          </div>
          <h1 style={{ fontWeight: 900, fontSize: isMobile ? 22 : 32, color: "#6f471c", margin: "0 auto", lineHeight: 1.35, maxWidth: 760 }}>
            {label(
              `Seattle's Onigiri Brand "Onigiri Sen" Makes Bay Area Debut. Now Available at T&T Supermarket San Jose Starting June 18.`,
              `シアトル発おにぎりブランド「Onigiri Sen」、サンノゼに初上陸。6月18日、T&T Supermarket にて販売開始。`
            )}
          </h1>
        </section>

        {/* ── BODY ── */}
        <section style={{ padding: isMobile ? "8px 24px 56px" : "8px 80px 80px", maxWidth: 800, margin: "0 auto" }}>

          <p style={{ color: "#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight: 1.9, margin: "0 0 28px" }}>
            {label(
              `On Thursday, June 18, 2026, Seattle-based onigiri brand Onigiri Sen makes its Bay Area debut at T&T Supermarket San Jose (Westgate Center), marking the brand's first California location. The launch coincides with the U.S. expansion of T&T, Canada's largest Asian supermarket chain.`,
              `2026年6月18日（木）、ワシントン州シアトル発のおにぎりブランド「Onigiri Sen」が、カリフォルニア州サンノゼのT&T Supermarket（Westgate Center店）にてベイエリア初の販売を開始します。カナダ最大手のアジア系スーパーマーケットチェーンであるT&Tの米国展開に合わせ、本格的なカリフォルニア進出を果たします。`
            )}
          </p>

          <h2 style={{ fontWeight: 800, fontSize: isMobile ? 18 : 21, color: "#6f471c", margin: "0 0 14px" }}>
            {label("About the brand","ブランドについて")}
          </h2>

          <p style={{ color: "#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight: 1.9, margin: "0 0 18px" }}>
            {label(
              `Onigiri Sen was founded in Seattle in 2024 by Rina Oike (age 27, originally from Kagawa, Japan), who moved to the U.S. for university and was struck by a simple reality: the onigiri she had grown up eating every day in Japan simply didn't exist in America.`,
              `Onigiri Senは、創業者兼CEO・尾池里奈（27歳・香川県出身）がアメリカの大学に留学した際、「日本で当たり前に食べていたおにぎりが、アメリカにはない」という現実から2024年にシアトルで立ち上げたブランドです。`
            )}
          </p>

          <p style={{ color: "#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight: 1.9, margin: "0 0 18px" }}>
            {label(
              `The reason authentic onigiri has never taken hold in U.S. retail comes down to food science: strict refrigeration requirements cause starch retrogradation, turning cooked rice hard and crumbly within hours. Onigiri Sen solved this through a combination of careful ingredient selection and technology sourced directly from Japan.`,
              `米国では、食品安全基準に基づく厳格な冷蔵管理によりご飯が数時間で硬くなるという課題が、本物のおにぎりの流通を長年阻んできました。Onigiri Senはこの「冷たいご飯問題」を、独自の素材選定と日本の最先端技術の組み合わせによって解決しました。`
            )}
          </p>

          <p style={{ color: "#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight: 1.9, margin: "0 0 28px" }}>
            {label(
              `For forming, Onigiri Sen uses FUJISEIKI technology — the world's #1 market share in hand-wrap onigiri machines, used across Japan's convenience store industry. The millimeter-level precision replicates the gentle, multi-directional pressure of hand-forming, keeping every rice ball light and fluffy even under refrigeration. Premium Ariake nori is kept completely separate from the rice by a signature three-step film wrapper until the exact moment of consumption, ensuring the signature crisp "Snap" on every opening.`,
              `成形には、日本のコンビニおにぎり成形機でシェア約100%を誇る世界最高峰のメーカー「不二精機（FUJISEIKI）」の技術を採用。ミリメートル単位の精密制御で、冷蔵後も口の中でふんわりほぐれる「手握り」のような食感を実現しています。有明海苔は、食べる瞬間まで海苔とご飯を完全分離する独自の3ステップフィルムで鮮度を保護。開封時の「パリッ」とした食感が、毎回の食体験を特別なものにします。`
            )}
          </p>

          <p style={{ color: "#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight: 1.9, margin: "0 0 28px" }}>
            {label(
              `In Seattle, the brand has built successful wholesale partnerships with T&T Supermarket, PCC Community Markets, and T-Mobile Park (Home of the Seattle Mariners), and has been featured on Seattle's leading NBC affiliate KING 5.`,
              `シアトルではT&T Supermarket・PCC Community Markets・シアトル・マリナーズの本拠地T-Mobile Parkへの卸売展開に成功し、NBC系列局KING 5にも取り上げられるなど、地元で大きな話題を呼んでいます。`
            )}
          </p>

          {/* Quote */}
          <div style={{ background: "#ffefc8", borderRadius: 20, padding: isMobile ? "24px 22px" : "32px 36px", margin: "0 0 32px" }}>
            <p style={{ color: "#6f471c", fontSize: isMobile ? 15 : 17, lineHeight: 1.85, fontStyle: "italic", margin: "0 0 14px" }}>
              {label(
                `"Silicon Valley demands high productivity and efficiency, but no one should have to sacrifice sensory joy and well-being for a quick desk lunch. We aren't just selling onigiri; we are bringing Japan's daily wellness ritual to the American tech community."`,
                `「シリコンバレーは高い生産性と効率性を求める街ですが、忙しいデスクランチだからといって、食べる喜びや健康を犠牲にするべきではありません。私たちは単におにぎりを売るのではなく、日本が誇る毎日の健康的な食習慣をアメリカのテックコミュニティに提案しています。」`
              )}
            </p>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#6f471c" }}>
              — {label("Rina Oike, Founder & CEO","尾池里奈 ｜ 創業者兼CEO")}
            </div>
          </div>

          {/* Launch flavors table */}
          <h2 style={{ fontWeight: 800, fontSize: isMobile ? 18 : 21, color: "#6f471c", margin: "0 0 16px" }}>
            {label("Launch flavors at T&T San Jose","T&T サンノゼ店 ローンチフレーバー")}
          </h2>
          <div style={{ border: "1.5px solid #f0e4d4", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
            {flavors.map((f, i) => (
              <div
                key={f.nameEn}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
                  gap: isMobile ? 4 : 0,
                  padding: isMobile ? "14px 16px" : "16px 24px",
                  borderBottom: i < flavors.length - 1 ? "1px solid #f0e4d4" : "none",
                  background: i % 2 === 0 ? "#fff" : "#fff9f5",
                }}
              >
                <div style={{ fontWeight: 800, color: "#6f471c", fontSize: 14 }}>
                  {label(f.nameEn, f.nameJa)}
                </div>
                <div style={{ color: "#8a6a4a", fontSize: 13 }}>
                  {label(f.noteEn, f.noteJa)}
                </div>
              </div>
            ))}
          </div>

          {/* Launch details */}
          <h2 style={{ fontWeight: 800, fontSize: isMobile ? 18 : 21, color: "#6f471c", margin: "0 0 16px" }}>
            {label("Launch details","ローンチ詳細")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "140px 1fr", gap: isMobile ? "6px 0" : "16px 24px", marginBottom: 32, fontSize: isMobile ? 14 : 15 }}>
            <div style={{ fontWeight: 800, color: "#6f471c" }}>{label("Date","日時")}</div>
            <div style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
              {label(
                "Thursday, June 18, 2026 — Grand Opening Ceremony 8:00 AM · Doors open 9:00 AM",
                "2026年6月18日（木）グランドオープニングセレモニー 午前8:00〜 ｜ 開店 午前9:00〜"
              )}
            </div>

            <div style={{ fontWeight: 800, color: "#6f471c", marginTop: isMobile ? 10 : 0 }}>{label("Location","場所")}</div>
            <div style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
              {label(
                "T&T Supermarket San Jose — Westgate Center, Suite #501, 1600 Saratoga Ave, San Jose, CA 95129",
                "T&T Supermarket サンノゼ店 — Westgate Center, Suite #501 / 1600 Saratoga Ave, San Jose, CA 95129"
              )}
            </div>

            <div style={{ fontWeight: 800, color: "#6f471c", marginTop: isMobile ? 10 : 0 }}>{label("Freshness","鮮度")}</div>
            <div style={{ color: "#3a2a1a", lineHeight: 1.8 }}>
              {label(
                "Every onigiri is stamped with a same-day expiration date. Made fresh every morning in a local San Jose kitchen and delivered before doors open. No overnight inventory.",
                "すべて当日消費期限付き。毎朝サンノゼのキッチンで製造し、開店前に納品。前日からの繰り越し在庫は一切なし。"
              )}
            </div>
          </div>

          {/* Fact sheets */}
          <div style={{ background: "#fff9f5", border: "1.5px solid #f0e4d4", borderRadius: 16, padding: isMobile ? "20px 18px" : "24px 28px", marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#6f471c", marginBottom: 8 }}>
              {label("Fact sheets","ファクトシート")}
            </div>
            <p style={{ color: "#8a6a4a", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>
              {label(
                "Full fact sheets are available for download below.",
                "本リリースに関する詳細なファクトシートは下記よりダウンロードいただけます。"
              )}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              <a href="/press/fact-sheet-en.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#ed7e80", color: "#fff", padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                Media Fact Sheet (English) →
              </a>
              <a href="/press/fact-sheet-ja.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#fff", color: "#6f471c", border: "2px solid #e8d8b8", padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                メディア向けファクトシート（日本語） →
              </a>
            </div>
          </div>

          {/* Contact */}
          <div style={{ textAlign: "center" as const, padding: isMobile ? "24px 0 8px" : "32px 0 8px" }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#6f471c", marginBottom: 8 }}>
              {label("Press contact","お問い合わせ")}
            </div>
            <p style={{ color: "#8a6a4a", fontSize: 13, margin: "0 0 12px" }}>
              {label("For interview requests and media enquiries:","取材・インタビューのご依頼はお気軽にご連絡ください。")}
            </p>
            <a href="mailto:contact@onigirisen.jp" style={{ color: "#ed7e80", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              contact@onigirisen.jp
            </a>
            <div style={{ marginTop: 24 }}>
              <Link href="/media" style={{ color: "#bbb", fontSize: 13, textDecoration: "none" }}>
                ← {t("Back to Press & Media","プレス・メディアに戻る")}
              </Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}