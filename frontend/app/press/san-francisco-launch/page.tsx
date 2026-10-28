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

type Flavor = { name: string; isNew?: boolean; desc: string; allergens: string; claims?: string };
type Copy = {
  date: string;
  headline: string;
  dek: string;
  // Each section: optional heading + paragraphs
  sections: { heading?: string; paragraphs: string[] }[];
  quote: string;
  quoteBy: string;
  flavorsHeading: string;
  flavors: Flavor[];
  allergensLabel: string;
  allergenNotice: string;
  detailsHeading: string;
  details: { label: string; value: string }[];
  factSheets: string;
  contactHeading: string;
  contact: { label: string; value: string; href: string }[];
  back: string;
};

const en: Copy = {
  date: "Nov. 5, 2026",
  headline: "Onigiri Sen Brings Fresh Onigiri to T&T's New San Francisco Store",
  dek: "Six flavors, including the debut of Mentaiko Mayo, arrive on opening day",
  sections: [
    {
      paragraphs: [
        "SAN FRANCISCO, Calif. — Nov. 5, 2026 — Following its Bay Area debut at T&T Supermarket San Jose in June, Japanese onigiri company Onigiri Sen is expanding to San Francisco. Starting today, Thursday, Nov. 5, at T&T Supermarket's first San Francisco store (San Francisco City Center, 2675 Geary Blvd.), Onigiri Sen offers six flavors in the deli, including a new one, Mentaiko Mayo.",
        "Every onigiri is made each morning in a Bay Area kitchen and delivered to the store: a wholesome, portable meal for the workday, the errand run, or the family table.",
      ],
    },
    {
      heading: "Strong response in San Jose",
      paragraphs: [
        "Onigiri Sen made its Bay Area debut at T&T Supermarket San Jose in June. It became one of the top sellers in the T&T San Jose deli, and T&T asked for more production.",
      ],
    },
    {
      heading: "About the brand",
      paragraphs: [
        "Mentaiko Mayo is the first time Onigiri Sen has sold the flavor anywhere. Mentaiko is chili-marinated Alaska pollock roe, a Japanese specialty with a savory, lightly spicy flavor and a pleasant pop. Onigiri Sen pairs mentaiko from Kanefuku, a mentaiko specialist founded in Fukuoka, with creamy Japanese Kewpie mayonnaise, a combination popular in Japan.",
        "Each onigiri is wrapped in Ariake nori, grown in Japan's Ariake Sea, the country's largest nori-growing region. A peel-and-wrap film keeps the seaweed separate from the rice until you open it, so the nori stays crisp.",
        "Founder and CEO Rina Oike, 27, came from Kagawa, Japan, as an international student to earn her degree in the U.S. Noticing how few wholesome, convenient grab-and-go options there were in a country full of fast food, she started Onigiri Sen in Seattle in 2024 to bring the satisfying, everyday food she grew up with to American shoppers. The company's mission is \"Bringing Onigiri into American Daily Life.\"",
      ],
    },
  ],
  quote:
    "\"San Jose showed us how much Bay Area shoppers love fresh onigiri, and we're excited to bring it to San Francisco. Mentaiko Mayo is a long-time favorite in Japan, and we're launching it here first, made fresh every morning to fit busy San Francisco days.\"",
  quoteBy: "Rina Oike, founder and CEO, Onigiri Sen",
  flavorsHeading: "Flavors at T&T San Francisco",
  flavors: [
    { name: "Mentaiko Mayo", isNew: true, desc: "Chili-marinated Alaska pollock roe with creamy Japanese mayo.", allergens: "egg, pollock (fish roe), bonito", claims: "Gluten-free" },
    { name: "Spicy Tuna Mayo", desc: "A bold blend of Japanese chili pepper, rich Japanese mayo, and savory tuna. Our #1 flavor.", allergens: "egg, fish (tuna), sesame" },
    { name: "Salmon", desc: "Wild Alaskan salmon with a gentle touch of sea salt.", allergens: "fish (salmon)", claims: "Gluten-free, organic" },
    { name: "Shrimp Mayo", desc: "Plump, juicy shrimp tossed in creamy Japanese mayo.", allergens: "egg, fish (tuna, round herring), crustacean shellfish (shrimp), soy, wheat" },
    { name: "Yuzu Salmon", desc: "Wild Alaskan salmon with refreshing, citrusy yuzu.", allergens: "egg, fish (salmon), sesame", claims: "Gluten-free" },
    { name: "Pork Furikake", desc: "Savory pork floss with seaweed-sesame seasoning (furikake), creamy Japanese mayo, and sweet corn.", allergens: "egg, soy, wheat, sesame" },
  ],
  allergensLabel: "Allergens",
  allergenNotice:
    "Allergen notice: Our products are prepared in a shared kitchen facility that handles wheat and other major allergens. Due to the potential risk of cross-contact during preparation, we cannot guarantee that any item is 100% allergen-free.",
  detailsHeading: "Launch details",
  details: [
    { label: "When", value: "Thursday, Nov. 5, 2026. T&T grand opening; doors open at 9 a.m." },
    { label: "Where", value: "Deli section at T&T Supermarket, San Francisco City Center, 2675 Geary Blvd., Suite 300, San Francisco, CA" },
    { label: "Price", value: "Prices vary by retailer. Please check in store." },
    { label: "Freshness", value: "Made every morning in a Bay Area kitchen and delivered to the store." },
  ],
  factSheets: "Fact sheets",
  contactHeading: "Press contact",
  contact: [
    { label: "Email", value: "contact@onigirisen.jp", href: "mailto:contact@onigirisen.jp" },
    { label: "Phone", value: "(206) 445-8086", href: "tel:2064458086" },
    { label: "Instagram", value: "@onigirisen.jp", href: "https://www.instagram.com/onigirisen.jp/" },
  ],
  back: "Back to Press & Media",
};

const ja: Copy = {
  date: "2026年11月5日",
  headline: "毎朝つくりたての本格おにぎり「Onigiri Sen」、T&Tサンフランシスコ新店に初上陸",
  dek: "新フレーバー「明太子マヨ」が初登場。全6種類を展開",
  sections: [
    {
      paragraphs: [
        "カリフォルニア州サンフランシスコ、2026年11月5日 — シアトル発の本格おにぎりブランド「Onigiri Sen」は、本日11月5日(木)にグランドオープンしたT&T Supermarket サンフランシスコ店(San Francisco City Center内)で、同市内での販売を初めて開始しました。新フレーバー「明太子マヨ」を含む全6種類をラインナップし、日本の食材にこだわった味わいを、毎朝ベイエリアのキッチンでつくりたてでお届けします。",
      ],
    },
    {
      heading: "サンノゼでの人気から、サンフランシスコへ",
      paragraphs: [
        "Onigiri Senは、2026年6月のT&Tサンノゼ店のオープンに合わせてベイエリアに進出しました。T&Tサンノゼ店のデリ売場でトップクラスの人気となり、T&Tから増産の依頼を受けるなど、大きな反響をいただいています。",
      ],
    },
    {
      heading: "ブランドについて",
      paragraphs: [
        "海外で、日本で食べていたのと同じ品質のおにぎりを手に入れるのは簡単ではありません。Onigiri Senは、その課題を解決するため、食材と技術にこだわっています。初登場の「明太子マヨ」には、福岡で創業した辛子明太子専門メーカー「かねふく」の明太子と、日本のキユーピーマヨネーズを使用しています。海苔には有明海産の有明海苔を使い、海苔とごはんを分ける特殊なフィルムで包むことで、食べる直前までパリッとした食感と香りを保ちます。",
        "創業者の尾池里奈(27歳)は、香川県から米国の大学へ留学した際、忙しい毎日の中で「本当に食べたい」と思える、手軽で健康的な食事の選択肢が少ないことに気づきました。「幼少期から慣れ親しんだ本物の味をアメリカに届けたい」という思いから、2024年にシアトルでOnigiri Senを設立しました。ミッションは「おにぎりをアメリカの日常へ」です。",
      ],
    },
  ],
  quote:
    "「サンノゼで想像以上のご反響をいただき、今回ついにサンフランシスコの皆様にも私たちのおにぎりをお届けできることを大変うれしく思います。日本でも定番人気の『明太子マヨ』をはじめ、毎朝つくりたてにこだわった味わいを、忙しいサンフランシスコの皆様の日常に寄り添う手軽な食事として楽しんでいただきたいです。」",
  quoteBy: "尾池 里奈、創業者兼CEO",
  flavorsHeading: "サンフランシスコ店のフレーバー(全6種)",
  flavors: [
    { name: "明太子マヨ(Mentaiko Mayo)", isNew: true, desc: "辛子明太子と日本のマヨネーズを合わせた新フレーバー。", allergens: "卵、スケトウダラ(魚卵)、かつお", claims: "グルテンフリー" },
    { name: "スパイシーツナマヨ(Spicy Tuna Mayo)", desc: "日本の唐辛子を使った辛みと、マヨネーズ、ツナを合わせた一番人気。", allergens: "卵、魚(ツナ)、ごま" },
    { name: "鮭(Salmon)", desc: "天然のアラスカ産サーモンに、ほどよい塩けを効かせた定番。", allergens: "魚(サーモン)", claims: "グルテンフリー、オーガニック" },
    { name: "海老マヨ(Shrimp Mayo)", desc: "ぷりぷりのエビを、日本のマヨネーズで和えた濃厚な味わい。", allergens: "卵、魚(ツナ、ニシン)、甲殻類(エビ)、大豆、小麦" },
    { name: "柚子サーモン(Yuzu Salmon)", desc: "天然のアラスカ産サーモンに、爽やかな柚子の香りを合わせたフレーバー。", allergens: "卵、魚(サーモン)、ごま", claims: "グルテンフリー" },
    { name: "ポークふりかけ(Pork Furikake)", desc: "ポークフロス(肉でんぶ)に、日本のふりかけ、マヨネーズ、甘いコーンを混ぜ合わせた、甘じょっぱい味わい。", allergens: "卵、大豆、小麦、ごま" },
  ],
  allergensLabel: "アレルゲン",
  allergenNotice:
    "すべての商品は、小麦などの主要アレルゲンを扱う共用のキッチンで製造しています。調理中の接触(コンタミネーション)の可能性があるため、アレルゲンが完全に含まれないことは保証できません。",
  detailsHeading: "ローンチ詳細",
  details: [
    { label: "日時", value: "2026年11月5日(木)グランドオープン。開店 午前9:00" },
    { label: "場所", value: "T&T Supermarket サンフランシスコ店(San Francisco City Center内)、2675 Geary Boulevard, Suite 300, San Francisco, CA" },
    { label: "価格", value: "価格は店頭でご確認ください" },
    { label: "鮮度", value: "毎朝ベイエリアのキッチンで製造し、店舗へ直送" },
  ],
  factSheets: "ファクトシート",
  contactHeading: "プレスコンタクト",
  contact: [
    { label: "メール", value: "contact@onigirisen.jp", href: "mailto:contact@onigirisen.jp" },
    { label: "電話", value: "(206) 445-8086", href: "tel:2064458086" },
    { label: "Instagram", value: "@onigirisen.jp", href: "https://www.instagram.com/onigirisen.jp/" },
  ],
  back: "プレス・メディアに戻る",
};

const FACT_SHEET_EN = "/press/onigirisen-factsheet-sf-en-20261105.pdf";
const FACT_SHEET_JA = "/press/onigirisen-factsheet-sf-ja-20261105.pdf";

export default function SanFranciscoLaunchPressRelease() {
  const { lang } = useLang();
  const isMobile = useIsMobile();
  const c = lang === "ja" ? ja : en;

  const p = { color: "#3a2a1a", fontSize: isMobile ? 14 : 16, lineHeight: 1.9, margin: "0 0 18px" } as const;
  const h2 = { fontWeight: 800, fontSize: isMobile ? 18 : 21, color: "#6f471c", margin: "10px 0 14px" } as const;

  return (
    <>
      <Header />
      <main style={{ fontFamily: "DM Sans, sans-serif", background: "#fff", marginTop: 72 }}>

        {/* ── HERO ── */}
        <section style={{ background: "#fff9f5", padding: isMobile ? "48px 24px 32px" : "64px 80px 40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#ed7e80", borderRadius: 999, padding: "6px 18px", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#fff", marginBottom: 18, textTransform: "uppercase" as const }}>
            PRESS RELEASE
          </div>
          <div style={{ color: "#bbb", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{c.date}</div>
          <h1 style={{ fontWeight: 900, fontSize: isMobile ? 22 : 32, color: "#6f471c", margin: "0 auto", lineHeight: 1.35, maxWidth: 760 }}>
            {c.headline}
          </h1>
          <p style={{ color: "#8a6a4a", fontSize: isMobile ? 15 : 18, fontWeight: 600, lineHeight: 1.6, margin: "16px auto 0", maxWidth: 700 }}>
            {c.dek}
          </p>
        </section>

        {/* ── BODY ── */}
        <section style={{ padding: isMobile ? "28px 24px 56px" : "40px 80px 80px", maxWidth: 800, margin: "0 auto" }}>

          {c.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              {s.heading && <h2 style={h2}>{s.heading}</h2>}
              {s.paragraphs.map((t) => (
                <p key={t.slice(0, 24)} style={p}>{t}</p>
              ))}
            </div>
          ))}

          {/* Quote */}
          <div style={{ background: "#ffefc8", borderRadius: 20, padding: isMobile ? "24px 22px" : "32px 36px", margin: "8px 0 32px" }}>
            <p style={{ color: "#6f471c", fontSize: isMobile ? 15 : 17, lineHeight: 1.85, fontStyle: "italic", margin: "0 0 14px" }}>
              {c.quote}
            </p>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#6f471c" }}>— {c.quoteBy}</div>
          </div>

          {/* Flavors */}
          <h2 style={h2}>{c.flavorsHeading}</h2>
          <div style={{ border: "1.5px solid #f0e4d4", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
            {c.flavors.map((f, i) => (
              <div
                key={f.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1.8fr",
                  gap: isMobile ? 4 : 16,
                  padding: isMobile ? "14px 16px" : "16px 24px",
                  borderBottom: i < c.flavors.length - 1 ? "1px solid #f0e4d4" : "none",
                  background: i % 2 === 0 ? "#fff" : "#fff9f5",
                }}
              >
                <div style={{ fontWeight: 800, color: "#6f471c", fontSize: 14, display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" as const }}>
                  {f.name}
                  {f.isNew && (
                    <span style={{ background: "#ed7e80", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: 1.2, borderRadius: 999, padding: "2px 9px" }}>NEW</span>
                  )}
                </div>
                <div style={{ color: "#5a4632", fontSize: 13, lineHeight: 1.7 }}>
                  {f.desc}
                  <div style={{ color: "#8a6a4a", fontSize: 12, marginTop: 4 }}>
                    {c.allergensLabel}: {f.allergens}
                    {f.claims && <> · <strong style={{ color: "#5a8a20", fontWeight: 700 }}>{f.claims}</strong></>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "#8a6a4a", fontSize: 12, lineHeight: 1.7, margin: "0 0 32px" }}>{c.allergenNotice}</p>

          {/* Launch details */}
          <h2 style={h2}>{c.detailsHeading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "140px 1fr", gap: isMobile ? "6px 0" : "16px 24px", marginBottom: 32, fontSize: isMobile ? 14 : 15 }}>
            {c.details.map((d, i) => (
              <div key={d.label} style={{ display: "contents" }}>
                <div style={{ fontWeight: 800, color: "#6f471c", marginTop: isMobile && i > 0 ? 10 : 0 }}>{d.label}</div>
                <div style={{ color: "#3a2a1a", lineHeight: 1.8 }}>{d.value}</div>
              </div>
            ))}
          </div>

          {/* Fact sheets */}
          <div style={{ background: "#fff9f5", border: "1.5px solid #f0e4d4", borderRadius: 16, padding: isMobile ? "20px 18px" : "24px 28px", marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#6f471c", marginBottom: 14 }}>{c.factSheets}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              <a href={FACT_SHEET_EN} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#ed7e80", color: "#fff", padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                {lang === "ja" ? "メディア向けファクトシート(英語) →" : "Media Fact Sheet (English) →"}
              </a>
              <a href={FACT_SHEET_JA} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#fff", color: "#6f471c", border: "2px solid #e8d8b8", padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                {lang === "ja" ? "メディア向けファクトシート(日本語) →" : "Media Fact Sheet (Japanese) →"}
              </a>
            </div>
          </div>

          {/* Contact */}
          <div style={{ textAlign: "center" as const, padding: isMobile ? "24px 0 8px" : "32px 0 8px" }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#6f471c", marginBottom: 12 }}>{c.contactHeading}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 8 : 20, flexDirection: isMobile ? "column" : "row", fontSize: 14 }}>
              {c.contact.map((x) => (
                <div key={x.label}>
                  <span style={{ color: "#8a6a4a" }}>{x.label}: </span>
                  <a href={x.href} target={x.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ color: "#ed7e80", fontWeight: 700, textDecoration: "none" }}>
                    {x.value}
                  </a>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Link href="/media" style={{ color: "#bbb", fontSize: 13, textDecoration: "none" }}>← {c.back}</Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
