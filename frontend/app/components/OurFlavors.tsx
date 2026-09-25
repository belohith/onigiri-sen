"use client";

import { useLang } from "../context/LangContext";
import { useState, useEffect } from "react";

const badgeImages: Record<string, { en: string; ja: string }> = {
  GF: {
    en: "/images/badges/gluten_free.png",
    ja: "/images/badges/gluten_free_jp.png",
  },
  Vegan: {
    en: "/images/badges/vegan.png",
    ja: "/images/badges/vegan_jp.png",
  },
  Vegetarian: {
    en: "/images/badges/vegetarian.png",
    ja: "/images/badges/vegetarian_jp.png",
  },
  Organic: {
    en: "/images/badges/organic.png",
    ja: "/images/badges/organic_jp.png",
  },
};

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
    allergensEn: "Egg, Fish (Tuna), and Sesame",
    allergensJa: "卵・魚（マグロ）・ごま",
  },
  {
    img: "/images/flavors/salmon.png",
    mascot: "/images/char-s.png",
    nameEn: "Salmon",
    nameJa: "鮭",
    tags: ["GF", "Organic"],
    allergensEn: "Fish (Salmon)",
    allergensJa: "魚（鮭）",
  },
  {
    img: "/images/flavors/shrimp-mayo.png",
    mascot: "/images/char-sm.png",
    nameEn: "Shrimp Mayo",
    nameJa: "海老マヨ",
    tags: [],
    allergensEn:
      "Egg, Fish (Tuna, Round Herring), Crustacean Shellfish (Shrimp), Soy, and Wheat",
    allergensJa: "卵・魚（マグロ・マイワシ）・甲殻類（エビ）・大豆・小麦",
  },
  {
    img: "/images/flavors/pickled-plum.png",
    mascot: "/images/char-pp.png",
    nameEn: "Pickled Plum (Ume)",
    nameJa: "梅",
    tags: ["GF", "Vegan", "Organic", "Vegetarian"],
    allergensEn: "",
    allergensJa: "",
  },
  {
    img: "/images/flavors/yuzu-salmon.png",
    mascot: "/images/char-ys.png",
    nameEn: "Yuzu Salmon",
    nameJa: "柚子サーモン",
    tags: ["GF"],
    allergensEn: "Egg, Fish (Salmon), and Sesame",
    allergensJa: "卵・魚（鮭）・ごま",
  },
  {
    img: "/images/flavors/shredded-pork.png",
    mascot: "/images/char-sp.png",
    nameEn: "Pork Furikake",
    nameJa: "豚フリカケ",
    tags: [],
    allergensEn: "Egg, Soy, Wheat, and Sesame",
    allergensJa: "卵・大豆・小麦・ごま",
  },
];

function FlavorCard({
  f,
  lang,
  t,
  isMobile,
}: {
  f: Flavor;
  lang: string;
  t: (en: string, ja: string) => string;
  isMobile: boolean;
}) {
  const mascotSize = isMobile ? 80 : 120;
  const imgSize = isMobile ? 180 : 250;

  return (
    <div
      style={{
        position: "relative",
        paddingTop: isMobile ? 40 : 60,
      }}
    >
      {/* Mascot */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: isMobile ? 6 : 8,
          zIndex: 3,
          width: mascotSize,
          height: mascotSize,
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
          width={mascotSize - 20}
          height={mascotSize - 20}
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
        {/* Product Image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "16px 12px 8px" : "24px 20px 12px",
            minHeight: isMobile ? 180 : 280,
            position: "relative",
            background: "#fff",
          }}
        >
          <img
            src={f.img}
            alt={lang === "ja" ? f.nameJa : f.nameEn}
            width={imgSize}
            height={imgSize}
            style={{
              objectFit: "contain",
              width: imgSize,
              height: imgSize,
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: isMobile ? "8px 12px 14px" : "10px 18px 20px",
            minHeight: isMobile ? 80 : 110,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontWeight: 800,
              fontSize: isMobile ? 13 : 17,
              color: "#1a1a1a",
              marginBottom: isMobile ? 8 : 12,
              lineHeight: 1.3,
            }}
          >
            {lang === "ja" ? f.nameJa : f.nameEn}
          </div>

          {/* Tags — image badges */}
          {!f.comingSoon && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? 4 : 8,
                  marginBottom: isMobile ? 6 : 10,
                  flexWrap: "wrap" as const,
                  minHeight: isMobile ? 34 : 44,
                }}
              >
                {f.tags.map((tag) => (
                  <img
                    key={tag}
                    src={
                      badgeImages[tag]?.[lang as "en" | "ja"] ??
                      badgeImages[tag]?.en
                    }
                    alt={tag}
                    style={{
                      width: isMobile ? 34 : 44,
                      height: isMobile ? 34 : 44,
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              {/* PCC-only note for Spicy Tuna Mayo */}
              {f.nameEn === "Spicy Tuna Mayo" && (
                <p
                  style={{
                    fontSize: isMobile ? 10 : 11,
                    color: "#a08060",
                    margin: "4px 0 0",
                    fontStyle: "italic",
                  }}
                >
                  {lang === "ja"
                    ? "*PCCロケーションのみオーガニック・グルテンフリー"
                    : "*Organic and Gluten-Free at PCC locations only"}
                </p>
              )}
            </>
          )}

          {/* Coming Soon */}
          {f.comingSoon && (
            <div
              style={{
                minHeight: isMobile ? 34 : 44,
                marginBottom: isMobile ? 6 : 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "#7a6050",
                  color: "#fff",
                  fontSize: isMobile ? 9 : 10,
                  fontWeight: 700,
                  borderRadius: 999,
                  padding: isMobile ? "4px 10px" : "5px 14px",
                }}
              >
                {t("Coming Soon", "近日公開")}
              </div>
            </div>
          )}

          {/* Allergens */}
          <div
            style={{
              fontSize: isMobile ? 10 : 11,
              color: "#aaa",
              fontWeight: 500,
              minHeight: isMobile ? 14 : 16,
            }}
          >
            {f.allergensEn || f.allergensJa
              ? lang === "ja"
                ? `含む：${f.allergensJa}`
                : `Contains: ${f.allergensEn}`
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OurFlavors() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#fff9f5" }}>
      {/* Top Scallop */}
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: isMobile ? 28 : 52,
          marginBottom: -1,
        }}
      >
        <path
          d="M0,26 C80,52 160,0 240,26 C320,52 400,0 480,26 C560,52 640,0 720,26 C800,52 880,0 960,26 C1040,52 1120,0 1200,26 C1280,52 1360,0 1440,26 L1440,52 L0,52 Z"
          fill="#ffefc8"
        />
      </svg>

      <div
        style={{
          background: "#ffefc8",
          padding: isMobile ? "20px 16px 40px" : "28px 48px 52px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 900,
            fontSize: isMobile ? 18 : 25,
            letterSpacing: 3,
            color: "#6f471c",
            margin: "0 0 20px",
            textTransform: "uppercase" as const,
          }}
        >
          {t("OUR FLAVORS", "フレーバー")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(3, 1fr)",
            gap: isMobile ? 10 : 14,
            maxWidth: isMobile ? "100%" : 800,
            margin: "0 auto",
          }}
        >
          {flavors.map((f) => (
            <FlavorCard
              key={f.nameEn}
              f={f}
              t={t}
              lang={lang}
              isMobile={isMobile}
            />
          ))}
        </div>

        <p
          style={{
            paddingTop: isMobile ? 28 : 40,
            textAlign: "center",
            color: "#6f471c",
            fontSize: isMobile ? 12 : 16,
            lineHeight: 1.75,
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {t(
            "Made fresh daily. \n Best consumed on the same day. Keep refrigerated.",
            "※毎日作りたてをお届けしています。\n※鮮度を保つため冷蔵保存し、当日中にお召し上がりください。"
          )}
        </p>
      </div>

      {/* Bottom Scallop */}
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: isMobile ? 28 : 52,
          marginTop: -1,
        }}
      >
        <path
          d="M0,26 C80,0 160,52 240,26 C320,0 400,52 480,26 C560,0 640,52 720,26 C800,0 880,52 960,26 C1040,0 1120,52 1200,26 C1280,0 1360,52 1440,26 L1440,0 L0,0 Z"
          fill="#ffefc8"
        />
      </svg>
    </section>
  );
}