"use client";

import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";

type Store = {
  nameEn: string;
  nameJa: string;
  addressEn: string;
  addressJa: string;
  hoursEn: string;
  hoursJa: string;
  phone: string;
  mapsUrl: string;
};

const seattleStores: Store[] = [
  {
    nameEn: "PCC – Ballard",
    nameJa: "PCC – バラード",
    addressEn: "1451 NW 46th St, Seattle, WA 98107",
    addressJa: "1451 NW 46th St, Seattle, WA 98107",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-538-0130",
    mapsUrl: "https://maps.app.goo.gl/t7ZwkcDSmrZ5D3x7A",
  },
  {
    nameEn: "PCC – Bellevue",
    nameJa: "PCC – ベルビュー",
    addressEn: "11615 NE 4th St, Bellevue, WA 98004",
    addressJa: "11615 NE 4th St, Bellevue, WA 98004",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "425-615-0295",
    mapsUrl: "https://maps.app.goo.gl/v6QRB8ULSGzdehTG7",
  },
  {
    nameEn: "PCC – Bothell",
    nameJa: "PCC – ボセル",
    addressEn: "22621 Bothell Everett Hwy, Bothell, WA 98021",
    addressJa: "22621 Bothell Everett Hwy, Bothell, WA 98021",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "425-492-0122",
    mapsUrl: "https://maps.app.goo.gl/2PEjQ8JWZZxvcgnc9",
  },
  {
    nameEn: "PCC – Burien",
    nameJa: "PCC – ブリエン",
    addressEn: "15840 1st Ave S #102, Burien, WA 98148",
    addressJa: "15840 1st Ave S #102, Burien, WA 98148",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-708-6908",
    mapsUrl: "https://maps.app.goo.gl/64mosjUyZRa44zqU8",
  },
  {
    nameEn: "PCC – Central District",
    nameJa: "PCC – セントラル・ディストリクト",
    addressEn: "2230 E Union St, Seattle, WA 98122",
    addressJa: "2230 E Union St, Seattle, WA 98122",
    hoursEn: "Daily 6am–10pm",
    hoursJa: "毎日 6:00〜22:00",
    phone: "206-605-6053",
    mapsUrl: "https://maps.app.goo.gl/8cfKHpUh8WyZcpoY7",
  },
  {
    nameEn: "PCC – Columbia City",
    nameJa: "PCC – コロンビア・シティ",
    addressEn: "3610 S Edmunds St, Seattle, WA 98118",
    addressJa: "3610 S Edmunds St, Seattle, WA 98118",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-466-6182",
    mapsUrl: "https://maps.app.goo.gl/GQLJ9Dtxx5jk79Rx9",
  },
  {
    nameEn: "PCC – Downtown",
    nameJa: "PCC – ダウンタウン",
    addressEn: "1320 4th Ave, Seattle, WA 98101",
    addressJa: "1320 4th Ave, Seattle, WA 98101",
    hoursEn: "Mon–Fri 7am–7pm",
    hoursJa: "月〜金 7:00〜19:00",
    phone: "206-408-4260",
    mapsUrl: "https://maps.app.goo.gl/2Daj9CkeURrVX8Lh7",
  },
  {
    nameEn: "PCC – Edmonds",
    nameJa: "PCC – エドモンズ",
    addressEn: "9803 Edmonds Way, Edmonds, WA 98020",
    addressJa: "9803 Edmonds Way, Edmonds, WA 98020",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "425-275-9036",
    mapsUrl: "https://maps.app.goo.gl/xh4AbwzXQHCpS2CK8",
  },
  {
    nameEn: "PCC – Fremont",
    nameJa: "PCC – フリーモント",
    addressEn: "600 N 34th St, Seattle, WA 98103",
    addressJa: "600 N 34th St, Seattle, WA 98103",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-632-6811",
    mapsUrl: "https://maps.app.goo.gl/Etiq3nop7McU8KA8A",
  },
  {
    nameEn: "PCC – Green Lake Aurora",
    nameJa: "PCC – グリーンレイク・オーロラ",
    addressEn: "7504 Aurora Ave N, Seattle, WA 98103",
    addressJa: "7504 Aurora Ave N, Seattle, WA 98103",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-525-3586",
    mapsUrl: "https://maps.app.goo.gl/zzmCiuEvCbceu6BP7",
  },
  {
    nameEn: "PCC – Green Lake Village",
    nameJa: "PCC – グリーンレイク・ビレッジ",
    addressEn: "450 NE 71st St, Seattle, WA 98115",
    addressJa: "450 NE 71st St, Seattle, WA 98115",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-729-5075",
    mapsUrl: "https://maps.app.goo.gl/aAZM86rWX173M3J28",
  },
  {
    nameEn: "PCC – Issaquah",
    nameJa: "PCC – イサクア",
    addressEn: "1810 12th Ave NW, Issaquah, WA 98027",
    addressJa: "1810 12th Ave NW, Issaquah, WA 98027",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "425-369-1222",
    mapsUrl: "https://maps.app.goo.gl/ed919ourv4hVW5HU9",
  },
  {
    nameEn: "PCC – Kirkland",
    nameJa: "PCC – カークランド",
    addressEn: "430 Kirkland Way, Kirkland, WA 98033",
    addressJa: "430 Kirkland Way, Kirkland, WA 98033",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "425-828-4622",
    mapsUrl: "https://maps.app.goo.gl/jzoRRNNvhksJGH1a8",
  },
  {
    nameEn: "PCC – Redmond",
    nameJa: "PCC – レドモンド",
    addressEn: "11435 Avondale Rd NE, Redmond, WA 98052",
    addressJa: "11435 Avondale Rd NE, Redmond, WA 98052",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "425-285-1400",
    mapsUrl: "https://maps.app.goo.gl/Ef5LqDc5W8xX6Kbt8",
  },
  {
    nameEn: "PCC – View Ridge",
    nameJa: "PCC – ビューリッジ",
    addressEn: "6514 40th Ave NE, Seattle, WA 98115",
    addressJa: "6514 40th Ave NE, Seattle, WA 98115",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-526-7661",
    mapsUrl: "https://maps.app.goo.gl/1549HeSYAhdGuacb6",
  },
  {
    nameEn: "PCC – West Seattle",
    nameJa: "PCC – ウェスト・シアトル",
    addressEn: "2749 California Ave SW, Seattle, WA 98116",
    addressJa: "2749 California Ave SW, Seattle, WA 98116",
    hoursEn: "Daily 6am–11pm",
    hoursJa: "毎日 6:00〜23:00",
    phone: "206-485-7185",
    mapsUrl: "https://maps.app.goo.gl/yGkveyuWcSy4vx42A",
  },
  {
    nameEn: "Town & Country – Bainbridge",
    nameJa: "Town & Country – ベインブリッジ",
    addressEn: "343 Winslow Way E, Bainbridge Island, WA 98110",
    addressJa: "343 Winslow Way E, Bainbridge Island, WA 98110",
    hoursEn: "Daily 7am–10pm",
    hoursJa: "毎日 7:00〜22:00",
    phone: "206-842-3848",
    mapsUrl: "https://maps.app.goo.gl/9jypnaAeVcBUc9GL9",
  },
  {
    nameEn: "Town & Country – Ballard",
    nameJa: "Town & Country – バラード",
    addressEn: "1400 NW 56th St, Seattle, WA 98107",
    addressJa: "1400 NW 56th St, Seattle, WA 98107",
    hoursEn: "Daily 7am–10pm",
    hoursJa: "毎日 7:00〜22:00",
    phone: "206-783-7922",
    mapsUrl: "https://maps.app.goo.gl/R4zYrfRQSk3VMtdM7",
  },
  {
    nameEn: "Town & Country – Lakemont",
    nameJa: "Town & Country – レイクモント",
    addressEn: "4989 Lakemont Blvd SE, Bellevue, WA 98006",
    addressJa: "4989 Lakemont Blvd SE, Bellevue, WA 98006",
    hoursEn: "Daily 7am–10pm",
    hoursJa: "毎日 7:00〜22:00",
    phone: "425-653-2261",
    mapsUrl: "https://maps.app.goo.gl/WEkidhMJBCo4B9Tg8",
  },
  {
    nameEn: "Town & Country – Mill Creek",
    nameJa: "Town & Country – ミルクリーク",
    addressEn: "15605 Main St, Mill Creek, WA 98012",
    addressJa: "15605 Main St, Mill Creek, WA 98012",
    hoursEn: "Daily 7am–10pm",
    hoursJa: "毎日 7:00〜22:00",
    phone: "425-357-3240",
    mapsUrl: "https://maps.app.goo.gl/H1aSUHwGKfZtjqz37",
  },
  {
    nameEn: "Town & Country – Poulsbo",
    nameJa: "Town & Country – ポールスボー",
    addressEn: "20148 10th Ave NE, Poulsbo, WA 98370",
    addressJa: "20148 10th Ave NE, Poulsbo, WA 98370",
    hoursEn: "Daily 7am–10pm",
    hoursJa: "毎日 7:00〜22:00",
    phone: "360-779-1881",
    mapsUrl: "https://maps.app.goo.gl/fBve1MMszV3wHAC68",
  },
  {
    nameEn: "Town & Country – Shoreline",
    nameJa: "Town & Country – ショアライン",
    addressEn: "15505 Westminster Way N, Shoreline, WA 98133",
    addressJa: "15505 Westminster Way N, Shoreline, WA 98133",
    hoursEn: "Daily 7am–10pm",
    hoursJa: "毎日 7:00〜22:00",
    phone: "206-363-9226",
    mapsUrl: "https://maps.app.goo.gl/hAd3AutttFijyfMK6",
  },
  {
    nameEn: "T&T Supermarket – Bellevue",
    nameJa: "T&T スーパーマーケット – ベルビュー",
    addressEn: "12620 SE 41st Pl, Bellevue, WA 98006",
    addressJa: "12620 SE 41st Pl, Bellevue, WA 98006",
    hoursEn: "Mon–Fri 9am–11pm, Sat–Sun 8am–11pm",
    hoursJa: "月〜金 9:00〜23:00、土日 8:00〜23:00",
    phone: "425-818-3260",
    mapsUrl: "https://maps.app.goo.gl/oCJECrBFY5CiJmag8",
  },
  {
    nameEn: "T&T Supermarket – Lynnwood",
    nameJa: "T&T スーパーマーケット – リンウッド",
    addressEn: "19630 Hwy 99, Lynnwood, WA 98036",
    addressJa: "19630 Hwy 99, Lynnwood, WA 98036",
    hoursEn: "Daily 9am–10pm",
    hoursJa: "毎日 9:00〜22:00",
    phone: "425-648-2648",
    mapsUrl: "https://maps.app.goo.gl/4iiXrgtX6LiNAJGF7",
  },
];

const WA_MAP_EMBED =
  "https://www.google.com/maps/d/embed?mid=1fRSBjWkwxia4rH771jkXLAy0JFWCCps&ehbc=2E312F&noprof=1";

const CALIFORNIA_IMAGE_EN = "/images/california-coming-soon.png";
const CALIFORNIA_IMAGE_JA = "/images/california-coming-soon-ja.png";

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

export default function FindUsNearYou() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState<"seattle" | "california">(
    "seattle"
  );
  const [search, setSearch] = useState("");

  const filtered = seattleStores.filter((s) => {
    const name = lang === "ja" ? s.nameJa : s.nameEn;
    const address = lang === "ja" ? s.addressJa : s.addressEn;

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      address.toLowerCase().includes(search.toLowerCase())
    );
  });

  const californiaImage =
    lang === "ja" ? CALIFORNIA_IMAGE_JA : CALIFORNIA_IMAGE_EN;

  return (
    <section
      style={{
        padding: isMobile ? "48px 16px 80px" : "64px 80px 100px",
        background: "#fdf8f4",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div
          style={{
            border: "2px solid #6f471c",
            borderRadius: 999,
            padding: isMobile ? "8px 24px" : "10px 36px",
            fontWeight: 700,
            fontSize: isMobile ? 20 : 30,
            color: "#6f471c",
            textAlign: "center",
          }}
        >
          {t("Find Us Near You", "お取り扱い店舗を探す")}
        </div>
      </div>

      <div style={{ maxWidth: isMobile ? "100%" : 820, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
            border: "2px solid #ed7e80",
            borderBottom: "none",
          }}
        >
          {(["seattle", "california"] as const).map((tab) => {
            const label =
              tab === "seattle"
                ? lang === "ja"
                  ? `ワシントン（${seattleStores.length}店舗）`
                  : `Washington (${seattleStores.length})`
                : lang === "ja"
                ? "カリフォルニア（近日公開）"
                : "California (Opening Soon)";

            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearch("");
                }}
                style={{
                  flex: 1,
                  padding: isMobile ? "11px 6px" : "13px",
                  textAlign: "center",
                  background: activeTab === tab ? "#ed7e80" : "#f4adb9",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: isMobile ? 11 : 14,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                  transition: "background 0.2s",
                  lineHeight: 1.25,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {activeTab === "seattle" && (
          <div
            style={{
              border: "2px solid #ed7e80",
              borderTop: "none",
              borderBottom: "none",
              overflow: "hidden",
            }}
          >
            <iframe
              src={WA_MAP_EMBED}
              width="100%"
              height={isMobile ? 220 : 340}
              style={{ display: "block", border: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {activeTab === "seattle" && (
          <div
            style={{
              border: "2px solid #ed7e80",
              borderTop: "1px solid #f5d0d0",
              borderBottom: "none",
              background: "#fff",
              padding: "10px 14px",
            }}
          >
            <div style={{ position: "relative" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bbb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t(
                  "Search by store or city...",
                  "店舗名または市で検索..."
                )}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1.5px solid #ede5da",
                  borderRadius: 10,
                  padding: "9px 14px 9px 34px",
                  fontSize: 13,
                  fontFamily: "DM Sans, sans-serif",
                  outline: "none",
                  color: "#2a2a2a",
                  background: "#fff",
                }}
              />
            </div>
          </div>
        )}

        {activeTab === "california" ? (
          <div
            style={{
              border: "2px solid #ed7e80",
              borderTop: "none",
              borderRadius: "0 0 20px 20px",
              overflow: "hidden",
            }}
          >
            <img
              src={californiaImage}
              alt={t(
                "California opening soon",
                "カリフォルニア近日公開"
              )}
              style={{ width: "100%", display: "block" }}
            />
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              border: "2px solid #ed7e80",
              borderTop: "1px solid #f5d0d0",
              borderRadius: "0 0 20px 20px",
              maxHeight: isMobile ? 280 : 360,
              overflowY: "auto",
            }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "24px 22px",
                  color: "#bbb",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {t("No stores found.", "店舗が見つかりません。")}
              </div>
            ) : (
              filtered.map((store, i) => {
                const name = lang === "ja" ? store.nameJa : store.nameEn;
                const address = lang === "ja" ? store.addressJa : store.addressEn;
                const hours = lang === "ja" ? store.hoursJa : store.hoursEn;

                return (
                  <div
                    key={store.nameEn}
                    style={{
                      borderBottom:
                        i < filtered.length - 1 ? "1px solid #f5ede8" : "none",
                      background: "#fff",
                    }}
                  >
                    <a
                      href={store.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: isMobile ? "11px 14px 4px" : "13px 20px 6px",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="#ed7e80"
                        style={{ flexShrink: 0, marginTop: 2 }}
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: isMobile ? 12 : 13,
                            fontWeight: 700,
                            color: "#5a3020",
                          }}
                        >
                          {name}
                        </div>

                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                          {address}
                        </div>

                        {hours && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#c8a090",
                              marginTop: 2,
                            }}
                          >
                            🕐 {hours}
                          </div>
                        )}
                      </div>

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ed7e80"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: 3 }}
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>

                    {store.phone && (
                      <div
                        style={{
                          paddingLeft: isMobile ? 38 : 50,
                          paddingBottom: 8,
                        }}
                      >
                        <a
                          href={`tel:${store.phone.replace(/\D/g, "")}`}
                          style={{
                            fontSize: 11,
                            color: "#ed7e80",
                            textDecoration: "none",
                            fontWeight: 600,
                          }}
                        >
                          📞 {store.phone}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {!isMobile && (
        <img
          src="/images/char-search.png"
          alt=""
          width={110}
          height={110}
          style={{
            objectFit: "contain",
            position: "absolute",
            bottom: 0,
            left: 60,
          }}
        />
      )}
    </section>
  );
}