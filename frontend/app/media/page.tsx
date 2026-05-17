"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useLang } from "../context/LangContext";

type MediaItem = {
  category: "tv" | "print" | "podcast" | "online";
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
    category: "tv",
    outlet: "KING 5 News",
    titleEn: "Onigiri Sen goes viral for Japanese grab-and-go snack - New Day NW",
    titleJa: "シアトルのスタートアップが日本のおにぎりを太平洋岸北西部へ",
    descEn: "KING 5 Evening feature on Onigiri Sen's journey from a 75sqft kitchen to PCC shelves across the Seattle area.",
    descJa: "KING 5イブニングが、75平方フィートのキッチンからシアトル全域のPCC棚までのおにぎり千の歩みを特集。",
    date: "27 April 2026",
    href: "https://www.king5.com/video/entertainment/television/programs/new-day-northwest/onigiri-sen-goes-viral-for-japanese-grab-and-go-snack-new-day-nw/281-70888a26-d765-4dc6-8aac-8bb6f97d982a",
  },
  {
    category: "online",
    outlet: "Jungle City",
    titleEn: "Rina Oike on Building a Japanese Food Brand in America",
    titleJa: "及川里奈 — アメリカで日本の食ブランドを築く",
    descEn: "An in-depth interview with founder Rina Oike on culture, entrepreneurship, and why onigiri is the perfect American convenience food.",
    descJa: "創業者・及川里奈が文化、起業家精神、そしておにぎりが最高のアメリカのコンビニエンスフードである理由を語る深掘りインタビュー。",
    date: "30 March 2026",
    href: "https://www.junglecity.com/eat/eat-more/onigiri-sen-rina-oike/",
  },
];

const categoryLabel: Record<MediaItem["category"], { en: string; ja: string; color: string; bg: string }> = {
  tv:      { en: "TV / Video", ja: "テレビ・動画",  color: "#7a4a00", bg: "#fde8b0" },
  print:   { en: "Print",      ja: "印刷媒体",      color: "#1a4a30", bg: "#d4edda" },
  podcast: { en: "Podcast",    ja: "ポッドキャスト", color: "#4a2a7a", bg: "#e8d8f8" },
  online:  { en: "Online",     ja: "オンライン",    color: "#7a2020", bg: "#fde8e8" },
};

// External link SVG icon
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

export default function MediaPage() {
  const { t, lang } = useLang();

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff9f5" }}>

        {/* ── HERO ── */}
        <section style={{ padding:"72px 80px 48px", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", borderRadius:999, padding:"6px 20px", fontSize:11, fontWeight:700, letterSpacing:2, color:"#fff", marginBottom:20, textTransform:"uppercase" as const }}>
            {t("PRESS & MEDIA","プレス・メディア")}
          </div>
          <h1 style={{ fontWeight:900, fontSize:36, color:"#6f471c", margin:"0 0 16px", lineHeight:1.2 }}>
            {t("Onigiri Sen in the News","おにぎり千のメディア掲載")}
          </h1>
          <p style={{ color:"#8a6a4a", fontSize:15, maxWidth:520, margin:"0 auto 0", lineHeight:1.8 }}>
            {t(
              "From local TV features to national food publications — follow our journey as we bring Japan's favorite everyday meal to America.",
              "地元テレビの特集から全国の食メディアまで——日本の日常食をアメリカへ届ける私たちの歩みをご覧ください。"
            )}
          </p>
        </section>

        {/* ── PRESS ENQUIRY BANNER ── */}
        <section style={{ margin:"0 80px 56px", background:"#ffefc8", borderRadius:20, padding:"28px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, flexWrap:"wrap" as const }}>
          <div>
            <div style={{ fontWeight:800, fontSize:17, color:"#6f471c", marginBottom:6 }}>
              {t("Press Enquiries","報道関係のお問い合わせ")}
            </div>
            <p style={{ color:"#8a6a4a", fontSize:14, margin:0 }}>
              {t("For interview requests, press kits, and high-res images, reach out directly.","インタビュー依頼、プレスキット、高解像度画像については直接ご連絡ください。")}
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
        <section style={{ padding:"0 80px 100px" }}>
          <div style={{ display:"flex", flexDirection:"column" as const, gap:16 }}>
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
                      padding:"28px 32px",
                      display:"grid",
                      gridTemplateColumns:"auto 1fr auto",
                      gap:"0 28px",
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
                    {/* Left: outlet + date */}
                    <div style={{ textAlign:"center" as const, minWidth:100 }}>
                      <div style={{ fontWeight:800, fontSize:14, color:"#6f471c", marginBottom:6, lineHeight:1.3 }}>{item.outlet}</div>
                      <div style={{ fontSize:11, color:"#bbb", fontWeight:500 }}>{item.date}</div>
                      <div style={{ display:"inline-block", marginTop:8, background:cat.bg, color:cat.color, fontSize:10, fontWeight:700, borderRadius:999, padding:"3px 10px" }}>
                        {lang === "ja" ? cat.ja : cat.en}
                      </div>
                    </div>

                    {/* Center: title + desc */}
                    <div>
                      <div style={{ fontWeight:800, fontSize:16, color:"#2a2a2a", marginBottom:8, lineHeight:1.4 }}>
                        {lang === "ja" ? item.titleJa : item.titleEn}
                      </div>
                      <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.75, margin:0 }}>
                        {lang === "ja" ? item.descJa : item.descEn}
                      </p>
                    </div>

                    {/* Right: arrow */}
                    <div style={{ color:"#ed7e80", display:"flex", alignItems:"center" }}>
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