"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

type MediaItem = {
  category: "tv" | "print" | "podcast" | "online";
  articleLang: "en" | "ja" | "both";
  outlet: string;
  titleEn: string;
  titleJa: string;
  descEn: string;
  descJa: string;
  date: string;
  href: string;
};

const media: MediaItem[] = [
  {
  category: "online",
  articleLang: "ja",
  outlet: "Jungle City",
  titleEn: "Mother's Day Gift Guide and Seattle Picnic Guide",
  titleJa: "母の日ギフト＆シアトルピクニックガイド",
  descEn: "Jungle City's Mother's Day and Seattle picnic feature includes Onigiri Sen as a recommended pick for outdoor dining and gifting in the Seattle area.",
  descJa: "シアトルのギフトとピクニックを特集した「Jungle City」の特別企画にて、Onigiri Senがおすすめのピクニックアイテムとして紹介されました。",
  date: "4 May 2026",
  href: "https://www.junglecity.com/enjoy/gifts-for-mothers-day/#index_id20",
},

{
  category: "tv",
  articleLang: "en",
  outlet: "KING 5 News",
  titleEn: "Onigiri Sen goes viral for Japanese grab-and-go snack - New Day NW",
  titleJa: "Onigiri Senが「日本のグラブ＆ゴー・スナック」としてバイラルに",
  descEn: "KING 5 Evening feature on Onigiri Sen's journey from a 75sqft kitchen to PCC shelves across the Seattle area.",
  descJa: "シアトルのテレビ局「KING 5 Evening」に尾池里奈が出演。シアトルで巻き起こるおにぎりブームとブランドの背景を紹介。",
  date: "27 April 2026",
  href: "https://www.king5.com/video/entertainment/television/programs/new-day-northwest/onigiri-sen-goes-viral-for-japanese-grab-and-go-snack-new-day-nw/281-70888a26-d765-4dc6-8aac-8bb6f97d982a",
},

{
  category: "online",
  articleLang: "both",
  outlet: "Jungle City",
  titleEn: "Rina Oike on Building a Japanese Food Brand in America",
  titleJa: "「千年続くおにぎり文化をシアトルの日常に」— 尾池里奈インタビュー",
  descEn: "An in-depth interview with founder Rina Oike on culture, entrepreneurship, and why onigiri is the perfect American convenience food.",
  descJa: "創業者・尾池里奈の深堀インタビューが掲載。シアトル・マリナーズ本拠地への出店や、25歳での起業、ブランドに込めた想いについて熱く語ります。",
  date: "30 March 2026",
  href: "https://www.junglecity.com/eat/eat-more/onigiri-sen-rina-oike/",
},

{
  category: "online",
  articleLang: "en",
  outlet: "Lookout Landing",
  titleEn: "What to Eat at T-Mobile Park in 2026",
  titleJa: "【2026年】T-モバイル・パークの必食グルメガイド",
  descEn: "Lookout Landing's guide to the best ballpark food at T-Mobile Park features Onigiri Sen as a must-try option for the 2026 Mariners season.",
  descJa: "シアトル・マリナーズの開幕に合わせた「Lookout Landing」の球場グルメ特集にて、今年スタジアムで絶対に食べるべき必食フードとしてOnigiri Senが選出されました。",
  date: "25 March 2026",
  href: "https://www.lookoutlanding.com/t-mobile-park/140695/what-to-eat-at-t-mobile-park-in-2026",
},

{
  category: "online",
  articleLang: "en",
  outlet: "Seattle Weekly",
  titleEn: "2026 Mariners Menu Preview: Best Food at T-Mobile Park",
  titleJa: "2026年マリナーズ・球場メニューレビュー：T-モバイル・パークのベストフード",
  descEn: "Seattle Weekly's preview of the 2026 Mariners season menu spotlights Onigiri Sen among the top new food offerings at T-Mobile Park.",
  descJa: "「Seattle Weekly」による今シーズンの球場グルメ徹底レビューにて、T-モバイル・パークの期待の新メニューとしてOnigiri Senが堂々紹介されました。",
  date: "18 March 2026",
  href: "https://www.seattleweekly.com/2026/03/18/2026-mariners-menu-preview-best-food-at-t-mobile-park/",
},

{
  category: "online",
  articleLang: "ja",
  outlet: "Soy Source",
  titleEn: "Japanese Soul Food Onigiri is Taking Over Seattle!",
  titleJa: "日本のソウルフード「おにぎり」がシアトルを席巻！",
  descEn: "Japanese-language publication Soy Source covers the rise of Onigiri Sen and how traditional Japanese onigiri is resonating with Seattle's food culture.",
  descJa: "シアトルの老舗日本語メディア「ソイソース」にて、日本の伝統的なおにぎりが、現地の食文化に深く浸透し、新たなムーブメントを起こしている様子が特集されました。",
  date: "26 March 2025",
  href: "https://soysource.net/food/feature1-03282025/",
},
];

const langLabel: Record<"en"|"ja"|"both", { label: string; color: string; bg: string }> = {
  en:   { label: "EN",    color: "#1a3a6a", bg: "#dce8ff" },
  ja:   { label: "日本語", color: "#6a1a1a", bg: "#ffe8e8" },
  both: { label: "EN/日本語", color: "#4a2a6a", bg: "#ede8ff" },
};

const categoryLabel: Record<MediaItem["category"], { en: string; ja: string; color: string; bg: string }> = {
  tv:      { en: "TV / Video", ja: "テレビ・動画",  color: "#7a4a00", bg: "#fde8b0" },
  print:   { en: "Print",      ja: "印刷媒体",      color: "#1a4a30", bg: "#d4edda" },
  podcast: { en: "Podcast",    ja: "ポッドキャスト", color: "#4a2a7a", bg: "#e8d8f8" },
  online:  { en: "Online",     ja: "オンライン",    color: "#7a2020", bg: "#fde8e8" },
};

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

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

export default function MediaPage() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff9f5" }}>

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? "56px 24px 36px" : "72px 80px 48px", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", borderRadius:999, padding:"6px 20px", fontSize:11, fontWeight:700, letterSpacing:2, color:"#fff", marginBottom:20, textTransform:"uppercase" as const }}>
            {t("PRESS & MEDIA","プレス・メディア")}
          </div>
          <h1 style={{ fontWeight:900, fontSize: isMobile ? 26 : 36, color:"#6f471c", margin:"0 0 16px", lineHeight:1.2 }}>
            {t("Onigiri Sen in the News","Onigiri Sen のメディア掲載")}
          </h1>
          <p style={{ color:"#8a6a4a", fontSize: isMobile ? 14 : 15, maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
            {t(
              "From local TV features to national food publications — follow our journey as we bring Japan's favorite everyday meal to America.",
              "地元テレビの特集から全国の食メディアまで——日本の日常食をアメリカへ届ける私たちの歩みをご覧ください。"
            )}
          </p>
        </section>

        {/* ── PRESS ENQUIRY BANNER ── */}
        <section style={{
          margin: isMobile ? "0 16px 36px" : "0 80px 56px",
          background:"#ffefc8",
          borderRadius:20,
          padding: isMobile ? "24px 20px" : "28px 40px",
          display:"flex",
          flexDirection: isMobile ? "column" : "row" as const,
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent:"space-between",
          gap:16,
        }}>
          <div>
            <div style={{ fontWeight:800, fontSize: isMobile ? 15 : 17, color:"#6f471c", marginBottom:6 }}>
              {t("Press Enquiries","プレス・報道関係者様へのお問い合わせ")}
            </div>
            <p style={{ color:"#8a6a4a", fontSize:14, margin:0 }}>
              {t("For interview requests, press kits, and high-res images, reach out directly.","インタビューのご依頼、プレスキット、高解像度画像のご要望につきましては、こちらから直接ご連絡ください。")}
            </p>
          </div>
          <a
            href="/contact"
            style={{ display:"inline-block", background:"#6f471c", color:"#fff", padding:"12px 28px", borderRadius:999, fontWeight:700, fontSize:14, textDecoration:"none", flexShrink:0 }}
          >
            {t("Contact Press Team →","プレス担当に連絡 →")}
          </a>
        </section>

        {/* ── MEDIA LIST ── */}
        <section style={{ padding: isMobile ? "0 16px 64px" : "0 80px 100px" }}>
          <div style={{ display:"flex", flexDirection:"column" as const, gap:12 }}>
            {media.map((item) => {
              const cat = categoryLabel[item.category];
              return (
                <a
                  key={item.titleEn}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration:"none" }}
                >
                  <div
                    style={{
                      background:"#fff",
                      borderRadius:20,
                      padding: isMobile ? "20px 16px" : "28px 32px",
                      display:"grid",
                      gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
                      gap: isMobile ? "12px 0" : "0 28px",
                      alignItems:"center",
                      border:"1.5px solid #f0e4d4",
                      cursor:"pointer",
                      transition:"border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#ed7e80";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(237,126,128,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#f0e4d4";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    {/* On mobile: outlet + category pill + date in a row */}
                    {isMobile ? (
                      <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" as const }}>
                        <div style={{ fontWeight:800, fontSize:13, color:"#6f471c" }}>{item.outlet}</div>
                        <div style={{ background:cat.bg, color:cat.color, fontSize:10, fontWeight:700, borderRadius:999, padding:"2px 8px" }}>
                          {lang === "ja" ? cat.ja : cat.en}
                        </div>
                        <div style={{ fontSize:11, color:"#bbb", fontWeight:500 }}>{item.date}</div>
                        <div style={{ background:langLabel[item.articleLang].bg, color:langLabel[item.articleLang].color, fontSize:9, fontWeight:700, borderRadius:999, padding:"2px 8px" }}>
                          {langLabel[item.articleLang].label}
                        </div>
                      </div>
                    ) : (
                      /* Desktop: outlet column */
                      <div style={{ textAlign:"center" as const, minWidth:100 }}>
                        <div style={{ fontWeight:800, fontSize:14, color:"#6f471c", marginBottom:6, lineHeight:1.3 }}>{item.outlet}</div>
                        <div style={{ fontSize:11, color:"#bbb", fontWeight:500 }}>{item.date}</div>
                        <div style={{ display:"inline-block", marginTop:8, background:cat.bg, color:cat.color, fontSize:10, fontWeight:700, borderRadius:999, padding:"3px 10px" }}>
                          {lang === "ja" ? cat.ja : cat.en}
                        </div>
                        <div style={{ display:"inline-block", marginTop:6, background:langLabel[item.articleLang].bg, color:langLabel[item.articleLang].color, fontSize:9, fontWeight:700, borderRadius:999, padding:"2px 8px" }}>
                          {langLabel[item.articleLang].label}
                        </div>
                      </div>
                    )}

                    {/* Title + desc */}
                    <div>
                      <div style={{ fontWeight:800, fontSize: isMobile ? 14 : 16, color:"#2a2a2a", marginBottom:6, lineHeight:1.4 }}>
                        {lang === "ja" ? item.titleJa : item.titleEn}
                      </div>
                      <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.75, margin:0 }}>
                        {lang === "ja" ? item.descJa : item.descEn}
                      </p>
                    </div>

                    {/* Arrow — always shown */}
                    <div style={{ color:"#ed7e80", display:"flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: isMobile ? "flex-end" : "center" }}>
                      <ExternalIcon />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
}