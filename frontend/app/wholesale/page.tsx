"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import TrustedBy from "../components/TrustedBy";
import Link from "next/link";
import { useLang } from "../context/LangContext";

const inputStyle: React.CSSProperties = {
  width:"100%", border:"1.5px solid #e0d8cc", borderRadius:10,
  padding:"12px 14px", fontSize:14, fontFamily:"DM Sans, sans-serif",
  color:"#2a2a2a", outline:"none", boxSizing:"border-box", background:"#fff",
};
const labelStyle: React.CSSProperties = {
  fontWeight:700, fontSize:14, color:"#6f471c", marginBottom:6, display:"block",
};
const backBtn: React.CSSProperties = {
  flex:1, background:"transparent", color:"#aaa", border:"1.5px solid #e0d8d0",
  borderRadius:999, padding:"13px", fontFamily:"DM Sans, sans-serif",
  fontWeight:700, fontSize:15, cursor:"pointer", textAlign:"center" as const,
};
const nextBtn: React.CSSProperties = {
  background:"#e8847a", color:"#fff", border:"none", borderRadius:999,
  padding:"13px", fontFamily:"DM Sans, sans-serif", fontWeight:700,
  fontSize:15, cursor:"pointer", textAlign:"center" as const,
};

const SelectField = ({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={style}>
    <label style={labelStyle}>{label}</label>
    <div style={{ position:"relative" as const }}>
      <select style={{ ...inputStyle, appearance:"none", paddingRight:36 } as React.CSSProperties}>
        {children}
      </select>
      <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#bbb", fontSize:14 }}>▾</span>
    </div>
  </div>
);

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

export default function WholesalePage() {
  const [step, setStep] = useState(1);
  const [inquiryType, setInquiryType] = useState<"wholesale"|"catering"|"">("");
  const { t } = useLang();
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff" }}>

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? "72px 24px 40px" : "112px 80px 64px", textAlign:"center", background:"#fdf9f4" }}>
          <h1 style={{ fontWeight:900, fontSize: isMobile ? 28 : 42, color:"#6f471c", lineHeight:1.2, margin:"0 0 16px" }}>
            {t("A Scalable, Reliable Partner\nfor Your Business.","あらゆる食の現場へ、\n誰もがよろこぶ「ヘルシーな選択肢」を。")}
          </h1>
          <p style={{ color:"#6f471c", fontSize: isMobile ? 14 : 16, maxWidth:560, margin:"0 auto 28px", lineHeight:1.75 }}>
            {t(
              "Whether you operate a grocery chain, a stadium, an airline, or a retail network — Onigiri Sen delivers consistent quality at volume, every time.",
              "スーパーマーケット、スタジアム、航空会社、地域の小売店、学校まで。Onigiri Sen はどんな発注であっても、常にブレない最高品質を確実にお届けします。"
            )}
          </p>
          <a
            href="#inquiry"
            style={{ background:"#6f471c", color:"#fff", border:"none", borderRadius:999, padding: isMobile ? "11px 20px" : "13px 24px", fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:14, textDecoration:"none" }}
          >
            {t("Inquire About Partnership →","パートナーシップについて →")}
          </a>
        </section>

        {/* ── TRUSTED BY ── */}
        <TrustedBy />

        {/* ── WHY PARTNER ── */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 80px", background:"#fff9f5" }}>
          <div style={{ textAlign:"center", marginBottom: isMobile ? 36 : 56 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ background:"#6f471c", borderRadius:999, padding:"10px 28px" }}>
                <span style={{ fontWeight:700, color:"#fff", fontSize: isMobile ? 13 : 15 }}>
                  {t("Why Partner With Us","パートナーシップの理由")}
                </span>
              </div>
              {!isMobile && <img src="/images/char-wholesale.png" alt="" style={{ height:60, objectFit:"contain" as const }} />}
            </div>
            <h2 style={{ fontWeight:900, fontSize: isMobile ? 24 : 42, color:"#6f471c", margin:"0 0 12px", lineHeight:1.2 }}>
              {t("Built for Scale. Built for You.","ともに成長するための、確かな基盤。")}
            </h2>
            <p style={{ color:"#6f471c", maxWidth:520, margin:"0 auto", fontSize: isMobile ? 13 : 15, lineHeight:1.75 }}>
              {t(
                "Every advantage —from production technology to ingredient sourcing—engineered for reliable, high-volume partnership.",
                "日本の最新炊飯技術から、安心安全な素材のルートまで。Onigiri Sen の仕組みはすべて、パートナー企業様が安心して大量発注を行えるように構築されています。"
              )}
            </p>
          </div>

          {/* 4 cards → 2×2 on mobile */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 14 : 20 }}>
            {[
              {
                icon:"/images/icon-stadium.png",
                title:t("Stadium-Grade Scalability","スタジアム規模の安定供給"),
                body:t("Whether for a single order or large-scale supply, every onigiri meets the same world-class standard.",
                       "規模にかかわらず、すべてのおにぎりが同じ厳格な基準を満たします。"),
              },
              {
                icon:"/images/icon-robot.png",
                title:t("World-Class\nJapanese Technology","世界が認める日本の技術"),
                body:t("FUJISEIKI forming machines and AIHO IH rice-cooking systems reproduce the delicate texture of hand-pressed onigiri.",
                       "不二精機の成形機とAIHOのIH炊飯システムで、手握りの繊細な食感を再現します。"),
              },
              {
                icon:"/images/icon-shield.png",
                title:t("Rigorous Hygiene &\nSafety Protocols","徹底した衛生管理と安全基準"),
                body:t("Automated processes minimize human contact, ensuring safety standards that far exceed traditional manufacturing.",
                       "製造工程を自動化し、従来の製造手法を遥かに凌駕する安全基準を確立しました。"),
              },
              {
                icon:"/images/icon-leaf.png",
                title:t("Flexible Customization","柔軟なカスタマイズ"),
                body:t("Vegan, Gluten-Free, Organic, and custom flavors available. Strategic pricing tiers tailored to your needs.",
                       "ヴィーガン、グルテンフリー、オーガニック、カスタムフレーバーに対応。"),
              },
            ].map((b) => (
              <div
                key={b.title}
                style={{ background:"#fff", borderRadius: isMobile ? 20 : 28, padding: isMobile ? "24px 16px 20px" : "36px 24px 32px", display:"flex", flexDirection:"column" as const, alignItems:"center", textAlign:"center" as const, gap: isMobile ? 10 : 16, boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <img src={b.icon} alt="" style={{ width: isMobile ? 52 : 80, height: isMobile ? 52 : 80, objectFit:"contain" as const }} />
                <div style={{ fontWeight:800, fontSize: isMobile ? 13 : 16, color:"#6f471c", lineHeight:1.35, whiteSpace:"pre-line" as const }}>{b.title}</div>
                <p style={{ color:"#6f471c", fontSize: isMobile ? 11 : 13, lineHeight:1.8, margin:0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── INQUIRY FORM ── */}
        <section id="inquiry" style={{ background:"#8a7060", padding: isMobile ? "48px 20px" : "80px 80px" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize: isMobile ? 16 : 20, fontWeight:700, letterSpacing:3, color:"#fff9f5", marginBottom:14 }}>
              {t("GET IN TOUCH","お問い合わせ")}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#fff", borderRadius:999, padding: isMobile ? "10px 20px" : "11px 28px", fontWeight:700, color:"#6f471c", fontSize: isMobile ? 13 : 15, textAlign:"center" as const, maxWidth: isMobile ? 280 : "none" }}>
              {t("Ready to bring Onigiri Sen to your shelves?","Onigiri Sen の取り扱いをご検討中ですか？")}
            </div>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:10 }}>
              {t("Fill out the form below and we'll be in touch within 2 business days.","以下のフォームより必要事項をご記入ください。2営業日以内にご連絡いたします。")}
            </p>
          </div>

          <div style={{ background:"#fff", borderRadius:24, padding: isMobile ? "28px 20px" : "48px", maxWidth:580, margin:"0 auto" }}>

            {/* Step indicator */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28 }}>
              {[1,2,3].map((s) => (
                <div key={s} style={{ height:8, width:s===step?36:12, borderRadius:999, background:s<=step?"#e8847a":"#e8e0d8", transition:"all 0.3s" }} />
              ))}
              <span style={{ fontSize:13, color:"#bbb", marginLeft:8 }}>
                {t(`Step ${step} of 3`,`ステップ ${step} / 3`)}
              </span>
            </div>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <>
                <h3 style={{ fontWeight:900, fontSize: isMobile ? 18 : 22, color:"#6f471c", margin:"0 0 6px" }}>
                  {t("About Your Inquiry","お問い合わせについて")}
                </h3>
                <p style={{ color:"#8a6a4a", fontSize:14, margin:"0 0 24px" }}>
                  {t("Tell us a little about your company and what you're looking for.","会社とお探しのものについて少し教えてください。")}
                </p>
                <div style={{ marginBottom:20 }}>
                  <label style={labelStyle}>{t("Company / Organization Name *","会社名・団体名 *")}</label>
                  <input type="text" placeholder={t("e.g. Pacific Grocery Co.","例：パシフィック食料品株式会社")} style={inputStyle} />
                </div>
                <div style={{ marginBottom:28 }}>
                  <label style={labelStyle}>{t("Type of Inquiry *","お問い合わせの種類 *")}</label>
                  <div style={{ display:"flex", flexDirection:"column" as const, gap:12 }}>
                    {[
                      { value:"wholesale" as const, title:t("Regular Wholesale / Partnership","定期卸売・パートナーシップ"), desc:t("Ongoing supply for retail, grocery, institutional, or venue use","小売・食料品・法人・ベニュー向けの継続的な供給") },
                      { value:"catering" as const,  title:t("Single Catering / Event Order","単発ケータリング・イベント注文"),  desc:t("One-time or recurring event catering order","単発または定期的なイベントケータリング注文") },
                    ].map((opt) => (
                      <label key={opt.value} style={{ border:`2px solid ${inquiryType===opt.value?"#e8847a":"#e8e0d0"}`, borderRadius:14, padding: isMobile ? 12 : 16, cursor:"pointer", background:inquiryType===opt.value?"#fff8f6":"#fff", display:"flex", gap:12, alignItems:"flex-start" }}>
                        <input type="radio" name="inquiryType" value={opt.value} checked={inquiryType===opt.value} onChange={() => setInquiryType(opt.value)} style={{ marginTop:3, accentColor:"#e8847a" }} />
                        <div>
                          <div style={{ fontWeight:800, color:"#6f471c", fontSize: isMobile ? 14 : 15 }}>{opt.title}</div>
                          <div style={{ fontSize:13, color:"#8a6a4a", marginTop:4 }}>{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={() => inquiryType && setStep(2)} style={{ width:"100%", background:inquiryType?"#e8847a":"#f0c8c0", color:"#fff", border:"none", borderRadius:999, padding:"13px", fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize:15, cursor:inquiryType?"pointer":"not-allowed" }}>
                  {t("NEXT →","次へ →")}
                </button>
              </>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <>
                <h3 style={{ fontWeight:900, fontSize: isMobile ? 18 : 22, color:"#6f471c", margin:"0 0 6px" }}>
                  {inquiryType === "wholesale" ? t("Wholesale Details","卸売の詳細") : t("Event Details","イベントの詳細")}
                </h3>
                <p style={{ color:"#8a6a4a", fontSize:14, margin:"0 0 24px" }}>
                  {inquiryType === "wholesale" ? t("Tell us about your business and volume needs.","ビジネスと数量のニーズを教えてください。") : t("Tell us about your upcoming event.","予定しているイベントについて教えてください。")}
                </p>

                {inquiryType === "wholesale" && (
                  <>
                    <div style={{ marginBottom:16 }}>
                      <SelectField label={t("Business Type *","ビジネスタイプ *")}>
                        <option value="">{t("Select business type","ビジネスタイプを選択")}</option>
                        <option>{t("Retail / Grocery","小売・食料品店")}</option>
                        <option>{t("Corporate Cafeteria or Office","企業食堂・オフィス")}</option>
                        <option>{t("School or University","学校・大学")}</option>
                        <option>{t("Stadium or Arena","スタジアム・アリーナ")}</option>
                        <option>{t("Event Venue","イベント会場")}</option>
                        <option>{t("Cafe or Restaurant","カフェ・レストラン")}</option>
                        <option>{t("Other","その他")}</option>
                      </SelectField>
                    </div>
                    <div style={{ marginBottom:16 }}>
                      <label style={labelStyle}>{t("Desired Location / Service Area *","希望場所・サービスエリア *")}</label>
                      <input type="text" placeholder={t("e.g. Seattle, WA","例：シアトル、WA")} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom:28 }}>
                      <label style={labelStyle}>{t("Estimated Weekly Volume *","週間推定数量 *")}</label>
                      <input type="text" placeholder={t("e.g. 500 units/week","例：500個/週")} style={inputStyle} />
                    </div>
                  </>
                )}

                {inquiryType === "catering" && (
                  <>
                    <div style={{ marginBottom:16 }}>
                      <label style={labelStyle}>{t("Event Date *","イベント日 *")}</label>
                      <input type="date" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom:16 }}>
                      <label style={labelStyle}>{t("Estimated Number of Guests *","参加者の推定人数 *")}</label>
                      <input type="number" placeholder={t("e.g. 200","例：200")} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom:28 }}>
                      <label style={labelStyle}>{t("Venue Name or Address *","会場名または住所 *")}</label>
                      <input type="text" placeholder={t("e.g. T-Mobile Park, Seattle WA","例：Tモバイルパーク、シアトルWA")} style={inputStyle} />
                    </div>
                  </>
                )}

                <div style={{ display:"flex", gap:12 }}>
                  <button onClick={() => setStep(1)} style={backBtn}>{t("← Back","← 戻る")}</button>
                  <button onClick={() => setStep(3)} style={{ ...nextBtn, flex:2 }}>{t("NEXT →","次へ →")}</button>
                </div>
              </>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <>
                <h3 style={{ fontWeight:900, fontSize: isMobile ? 18 : 22, color:"#6f471c", margin:"0 0 6px" }}>
                  {t("Your Contact Details","ご連絡先")}
                </h3>
                <p style={{ color:"#8a6a4a", fontSize:14, margin:"0 0 24px" }}>
                  {t("Almost done — just a few final details.","もう少しです——最後の詳細を教えてください。")}
                </p>

                {/* Name + Email — stack on mobile */}
                <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
                  <div>
                    <label style={labelStyle}>{t("Your Name *","お名前 *")}</label>
                    <input type="text" placeholder="Jane Smith" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("Email Address *","メールアドレス *")}</label>
                    <input type="email" placeholder="jane@company.com" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>{t("Phone Number *","電話番号 *")}</label>
                  <input type="tel" placeholder="(206) 555-0100" style={inputStyle} />
                </div>

                <div style={{ marginBottom:14 }}>
                  <SelectField label={t("How did you hear about us?","どこでお知りになりましたか？")}>
                    <option value="">{t("Select an option","選択してください")}</option>
                    <option>{t("Social Media","ソーシャルメディア")}</option>
                    <option>{t("News or Media","ニュース・メディア")}</option>
                    <option>{t("Physical Store or Stadium","店舗・スタジアム")}</option>
                    <option>{t("Search","検索")}</option>
                    <option>{t("Referral","紹介")}</option>
                    <option>{t("Saw at another location","別の場所で見た")}</option>
                    <option>{t("Other","その他")}</option>
                  </SelectField>
                </div>

                <div style={{ marginBottom:28 }}>
                  <label style={labelStyle}>{t("Notes / Remarks","備考・メモ")}</label>
                  <textarea rows={4} placeholder={t("Anything else you'd like us to know...","その他お知らせしたいことがあればご記入ください...")} style={{ ...inputStyle, resize:"vertical" } as React.CSSProperties} />
                </div>

                <div style={{ display:"flex", gap:12, marginBottom:16 }}>
                  <button onClick={() => setStep(2)} style={backBtn}>{t("← Back","← 戻る")}</button>
                  <Link href="/thank-you" style={{ ...nextBtn, flex:2, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                    {t("Submit →","送信 →")}
                  </Link>
                </div>

                <p style={{ textAlign:"center", fontSize:12, color:"#bbb", margin:0, lineHeight:1.6 }}>
                  {t("By submitting this form, you agree to our","このフォームを送信することで、")}{" "}
                  <a href="/onigiri-pp.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"#e07070", textDecoration:"none" }}>{t("Privacy Policy","プライバシーポリシー")}</a>
                  {" "}{t("and","と")}{" "}
                  <a href="/onigiri-tc.pdf" target="_blank" rel="noopener noreferrer" style={{ color:"#e07070", textDecoration:"none" }}>{t("Terms of Service","利用規約")}</a>
                  {t(".","に同意したことになります。")}
                </p>
              </>
            )}
          </div>
        </section>

      </main>
    </>
  );
}