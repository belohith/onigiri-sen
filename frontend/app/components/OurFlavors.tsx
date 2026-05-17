"use client";
import { useLang } from "../context/LangContext";

const badgeStyle = (type: string): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 8,
  fontWeight: 800,
  textAlign: "center",
  lineHeight: 1.2,
  flexShrink: 0,
  background:
    type === "GF" ? "#d4edda" :
    type === "Vegan" ? "#2d6a4f" :
    type === "Vegetarian" ? "#c8e6c9" :
    type === "Organic" ? "#fff3cd" : "#f0f0f0",
  color:
    type === "GF" ? "#2d6a4f" :
    type === "Vegan" ? "#fff" :
    type === "Vegetarian" ? "#1b5e20" :
    type === "Organic" ? "#856404" : "#555",
  border:
    type === "GF" ? "2px solid #a8d5b5" :
    type === "Vegan" ? "2px solid #1a4a30" :
    type === "Vegetarian" ? "2px solid #88c898" :
    type === "Organic" ? "2px solid #d4b84a" : "2px solid #ddd",
});

const badgeLabel: Record<string, string> = {
  GF: "Gluten\nFree",
  Vegan: "Vegan",
  Vegetarian: "Vege-\ntarian",
  Organic: "Organic",
};

type Flavor = {
  img: string;
  mascot: string;
  nameEn: string;
  nameJa: string;
  tags: string[];
  allergensEn?: string;
  allergensJa?: string;
  comingSoon?: boolean;
};

const flavors: Flavor[] = [
  {
    img: "/images/flavors/spicy-tuna-mayo.png",
    mascot: "/images/char-stm.png",
    nameEn: "Spicy Tuna Mayo",
    nameJa: "スパイシーツナマヨ",
    tags: ["GF", "Organic"],
    allergensEn: "Fish · Egg · Sesame",
    allergensJa: "魚・卵・ごま",
  },
  {
    img: "/images/flavors/salmon.png",
    mascot: "/images/char-s.png",
    nameEn: "Salmon",
    nameJa: "鮭",
    tags: ["GF", "Organic"],
    allergensEn: "Fish",
    allergensJa: "魚",
  },
  {
    img: "/images/flavors/butter-corn.png",
    mascot: "/images/char-bc.png",
    nameEn: "Butter Corn",
    nameJa: "バターコーン",
    tags: ["GF", "Vegetarian"],
    allergensEn: "Dairy",
    allergensJa: "乳製品",
  },
  {
    img: "/images/flavors/shrimp-mayo.png",
    mascot: "/images/char-sm.png",
    nameEn: "Shrimp Mayo",
    nameJa: "海老マヨ",
    tags: ["GF"],
    allergensEn: "Shellfish · Dairy · Egg",
    allergensJa: "甲殻類・乳製品・卵",
  },
  {
    img: "/images/flavors/pickled-plum.png",
    mascot: "/images/char-pp.png",
    nameEn: "Ume",
    nameJa: "梅",
    tags: ["GF", "Vegan", "Organic", "Vegetarian"],
    allergensEn: "Fish · Egg · Sesame",
    allergensJa: "魚・卵・ごま",
  },
  {
    img: "/images/coming-soon-onigiri.png",
    mascot: "/images/char-sscc.png",
    nameEn: "Smoked Salmon Cream Cheese",
    nameJa: "スモークサーモンクリームチーズ",
    tags: ["GF"],
    comingSoon: true,
  },
];

function FlavorCard({
  f,
  lang,
  t,
}: {
  f: Flavor;
  lang: string;
  t: (en: string, ja: string) => string;
}) {
  return (
    <div style={{ position: "relative", paddingTop: 60 }}>
      {/* Mascot circle — top-left floating above card */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 8,
          zIndex: 3,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={f.mascot}
          alt=""
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Product image area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 20px 12px",
            minHeight: 220,
            position: "relative",
            background: "#fff",
          }}
        >
          <img
            src={f.img}
            alt={lang === "ja" ? f.nameJa : f.nameEn}
            width={180}
            height={200}
            style={{ objectFit: "contain", width: 180, height: 200 }}
          />
        </div>

        {/* Name + badges + allergens */}
        <div style={{ padding: "10px 18px 20px", minHeight: 110 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 17,
              color: "#1a1a1a",
              marginBottom: 12,
              lineHeight: 1.3,
            }}
          >
            {lang === "ja" ? f.nameJa : f.nameEn}
          </div>

          {/* Dietary badges — hidden for coming soon */}
          {!f.comingSoon && f.tags.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {f.tags.map((tag) => (
                <div key={tag} style={badgeStyle(tag)}>
                  {badgeLabel[tag] || tag}
                </div>
              ))}
            </div>
          )}

          {/* Coming soon pill */}
          {f.comingSoon && (
            <div
              style={{
                display: "inline-block",
                background: "#7a6050",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 999,
                padding: "5px 14px",
                marginBottom: 8,
              }}
            >
              {t("Coming Soon — PCC & T-Mobile Exclusive", "近日公開 — PCC・Tモバイル限定")}
            </div>
          )}

          {/* Allergens */}
          {!f.comingSoon && (f.allergensEn || f.allergensJa) && (
            <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>
              {lang === "ja"
                ? `含む：${f.allergensJa}`
                : `Contains: ${f.allergensEn}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OurFlavors() {
  const { t, lang } = useLang();

  return (
    <section style={{ background: "#fff9f5" }}>
      {/* Top scallop */}
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 52, marginBottom: -1 }}
      >
        <path
          d="M0,26 C80,52 160,0 240,26 C320,52 400,0 480,26 C560,52 640,0 720,26 C800,52 880,0 960,26 C1040,52 1120,0 1200,26 C1280,52 1360,0 1440,26 L1440,52 L0,52 Z"
          fill="#ffefc8"
        />
      </svg>

      <div style={{ background: "#ffefc8", padding: "28px 48px 52px" }}>
        <h2
          style={{
            textAlign: "center",
            fontWeight: 900,
            fontSize: 25,
            letterSpacing: 3,
            color: "#6f471c",
            margin: "0 0 20px",
            textTransform: "uppercase",
          }}
        >
          {t("OUR FLAVORS", "フレーバー")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {flavors.map((f) => (
            <FlavorCard key={f.nameEn} f={f} t={t} lang={lang} />
          ))}
        </div>
      </div>

      {/* Bottom scallop */}
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 52, marginTop: -1 }}
      >
        <path
          d="M0,26 C80,0 160,52 240,26 C320,0 400,52 480,26 C560,0 640,52 720,26 C800,0 880,52 960,26 C1040,0 1120,52 1200,26 C1280,0 1360,52 1440,26 L1440,0 L0,0 Z"
          fill="#ffefc8"
        />
      </svg>
    </section>
  );
}