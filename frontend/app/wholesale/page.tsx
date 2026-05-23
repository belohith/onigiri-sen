"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import TrustedBy from "../components/TrustedBy";
import { useLang } from "../context/LangContext";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e0d8cc",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: "DM Sans, sans-serif",
  color: "#2a2a2a",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 14,
  color: "#6f471c",
  marginBottom: 6,
  display: "block",
};

const backBtn: React.CSSProperties = {
  flex: 1,
  background: "transparent",
  color: "#aaa",
  border: "1.5px solid #e0d8d0",
  borderRadius: 999,
  padding: "13px",
  fontFamily: "DM Sans, sans-serif",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  textAlign: "center",
};

const nextBtn: React.CSSProperties = {
  background: "#e8847a",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  padding: "13px",
  fontFamily: "DM Sans, sans-serif",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  textAlign: "center",
};

// ISD codes
const ISD_CODES = [
  { code: "+1",  flag: "🇺🇸", label: "US" },
  { code: "+1",  flag: "🇨🇦", label: "Canada" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+81", flag: "🇯🇵", label: "Japan" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+33", flag: "🇫🇷", label: "France" },
  { code: "+86", flag: "🇨🇳", label: "China" },
  { code: "+82", flag: "🇰🇷", label: "Korea" },
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "+63", flag: "🇵🇭", label: "Philippines" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia" },
  { code: "+64", flag: "🇳🇿", label: "New Zealand" },
];

function formatPhone(value: string, isd: string): string {
  const digits = value.replace(/\D/g, "");
  if (isd === "+1") {
    const d = digits.slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return digits.slice(0, 12);
}

// Draft persistence
const DRAFT_KEY = "onigiri_wholesale_draft";
function saveDraft(data: object) { try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch {} }
function loadDraft() { try { const r = sessionStorage.getItem(DRAFT_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function clearDraft() { try { sessionStorage.removeItem(DRAFT_KEY); } catch {} }

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
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isdCode, setIsdCode] = useState("+1");
  const honeypotRef = useRef("");

  const [formData, setFormData] = useState({
    inquiryType: "",
    company: "",
    businessType: "",
    serviceArea: "",
    weeklyVolume: "",
    eventDate: "",
    guests: "",
    venue: "",
    name: "",
    email: "",
    phone: "",
    heardFrom: "",
    notes: "",
  });

  // Load draft
  useEffect(() => {
    const draft = loadDraft();
    if (draft) setFormData(draft);
  }, []);

  // Save draft
  useEffect(() => { saveDraft(formData); }, [formData]);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit() {
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError(t("Please fill out your name, email, and phone.", "お名前、メールアドレス、電話番号をご入力ください。"));
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError(t("Please enter a valid email address.", "有効なメールアドレスを入力してください。"));
      return;
    }
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError(t("Please enter a valid 10-digit phone number.", "10桁の有効な電話番号を入力してください。"));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${isdCode} ${formData.phone}`,
          honeypot: honeypotRef.current,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearDraft();
        window.location.href = "/thank-you";
      } else {
        setError(data.error || t("Failed to send inquiry.", "送信に失敗しました。"));
      }
    } catch (err) {
      console.error(err);
      setError(t("Something went wrong. Please try again.", "エラーが発生しました。もう一度お試しください。"));
    } finally {
      setLoading(false);
    }
  }

  const SelectField = ({
    label, value, onChange, children,
  }: {
    label: string; value: string; onChange: (value: string) => void; children: React.ReactNode;
  }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, appearance: "none", paddingRight: 36 } as React.CSSProperties}>
          {children}
        </select>
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#bbb", fontSize: 14 }}>▾</span>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main style={{ fontFamily: "DM Sans, sans-serif", background: "#fff", marginTop: 72 }}>

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? "72px 24px 40px" : "112px 80px 64px", textAlign: "center", background: "#fdf9f4" }}>
          <h1 style={{ fontWeight: 900, fontSize: isMobile ? 26 : 42, color: "#6f471c", lineHeight: 1.2, margin: "0 0 16px", whiteSpace: "pre-line" }}>
            {t("A Scalable, Reliable Partner\nfor Your Business.", "あらゆる食の現場へ、\n誰もがよろこぶ「ヘルシーな選択肢」を。")}
          </h1>
          <p style={{ color: "#6f471c", fontSize: isMobile ? 14 : 16, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.75 }}>
            {t(
              "Whether you operate a grocery chain, a stadium, an airline, or a retail network — Onigiri Sen delivers consistent quality at volume, every time.",
              "スーパーマーケット、スタジアム、航空会社、地域の小売店、学校まで。Onigiri Sen はどんな発注であっても、常にブレない最高品質を確実にお届けします。"
            )}
          </p>
          <a href="#inquiry" style={{ background: "#6f471c", color: "#fff", borderRadius: 999, padding: isMobile ? "11px 20px" : "13px 24px", fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            {t("Inquire About Partnership →", "パートナーシップについて →")}
          </a>
        </section>

        <TrustedBy />

        {/* ── WHY PARTNER ── */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 80px", background: "#fff9f5" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "#6f471c", borderRadius: 999, padding: "10px 28px" }}>
                <span style={{ fontWeight: 700, color: "#fff", fontSize: isMobile ? 13 : 15 }}>
                  {t("Why Partner With Us", "パートナーシップの理由")}
                </span>
              </div>
              {!isMobile && <img src="/images/char-wholesale.png" alt="" style={{ height: 60, objectFit: "contain" }} />}
            </div>
            <h2 style={{ fontWeight: 900, fontSize: isMobile ? 24 : 42, color: "#6f471c", margin: "0 0 12px", lineHeight: 1.2 }}>
              {t("Built for Scale. Built for You.", "ともに成長するための、確かな基盤。")}
            </h2>
            <p style={{ color: "#6f471c", maxWidth: 520, margin: "0 auto", fontSize: isMobile ? 13 : 15, lineHeight: 1.75 }}>
              {t(
                "Every advantage —from production technology to ingredient sourcing—engineered for reliable, high-volume partnership.",
                "日本の最新炊飯技術から、安心安全な素材のルートまで。Onigiri Sen の仕組みはすべて、パートナー企業様が安心して大量発注を行えるように構築されています。"
              )}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 14 : 20 }}>
            {[
              { icon: "/images/icon-stadium.png", title: t("Stadium-Grade Scalability", "スタジアム規模の安定供給"), body: t("Whether for a single order or large-scale supply, every onigiri meets the same world-class standard. We supply major stadiums, supermarket chains, and airports without ever compromising on quality.", "規模にかかわらず、すべてのおにぎりが同じ厳格な基準を満たします。") },
              { icon: "/images/icon-robot.png",   title: t("World-Class\nJapanese Technology", "世界が認める日本の技術"),   body: t("We utilize forming machines from FUJISEIKI—trusted by all major Japanese convenience chains—alongside high-spec cooking systems from AIHO. Together, we reproduce the delicate texture of hand-pressed onigiri.", "不二精機の成形機とAIHOのシステムで、手握りの繊細な食感を再現します。") },
              { icon: "/images/icon-shield.png",  title: t("Rigorous Hygiene &\nSafety Protocols", "徹底した衛生管理と安全基準"),  body: t("Our automated processes minimize human contact, ensuring safety standards that far exceed traditional manufacturing methods.", "製造工程の自動化により、従来の製造手法を遥かに超える安全基準を確立しました。") },
              { icon: "/images/icon-leaf.png",    title: t("Flexible Customization", "柔軟なカスタマイズ"),    body: t("Vegan, Gluten-Free, Organic, and custom flavors available. Strategic pricing tiers tailored to your retail environment and customer base.", "ヴィーガン、グルテンフリー、オーガニック、カスタムフレーバーに対応。") },
            ].map((b) => (
              <div key={b.title} style={{ background: "#fff", borderRadius: isMobile ? 20 : 28, padding: isMobile ? "24px 16px 20px" : "36px 24px 32px", display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" as const, gap: isMobile ? 10 : 16, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <img src={b.icon} alt="" style={{ width: isMobile ? 52 : 80, height: isMobile ? 52 : 80, objectFit: "contain" }} />
                <div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 16, color: "#6f471c", lineHeight: 1.35, whiteSpace: "pre-line" as const }}>{b.title}</div>
                <p style={{ color: "#6f471c", fontSize: isMobile ? 11 : 13, lineHeight: 1.8, margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FORM ── */}
        <section id="inquiry" style={{ background: "#8a7060", padding: isMobile ? "48px 20px" : "80px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, letterSpacing: 3, color: "#fff9f5", marginBottom: 14 }}>
              {t("GET IN TOUCH", "お問い合わせ")}
            </div>
            <div style={{ display: "inline-block", background: "#fff", borderRadius: 999, padding: isMobile ? "10px 20px" : "11px 28px", fontWeight: 700, color: "#6f471c", fontSize: isMobile ? 13 : 15, textAlign: "center" as const }}>
              {t("Ready to bring Onigiri Sen to your shelves?", "Onigiri Sen の取り扱いをご検討中ですか？")}
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 10 }}>
              {t("Fill out the form below and we'll be in touch within 2 business days.", "2営業日以内にご連絡いたします。")}
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: 24, padding: isMobile ? "28px 20px" : "48px", maxWidth: 580, margin: "0 auto" }}>

            {/* Honeypot */}
            <input type="text" onChange={(e) => { honeypotRef.current = e.target.value; }} style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {/* Step dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ height: 8, width: s === step ? 36 : 12, borderRadius: 999, background: s <= step ? "#e8847a" : "#e8e0d8", transition: "all 0.3s" }} />
              ))}
              <span style={{ fontSize: 13, color: "#bbb", marginLeft: 8 }}>{t(`Step ${step} of 3`, `ステップ ${step} / 3`)}</span>
            </div>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <>
                <h3 style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: "#6f471c", margin: "0 0 6px" }}>
                  {t("About Your Inquiry", "お問い合わせについて")}
                </h3>
                <p style={{ color: "#8a6a4a", fontSize: 14, margin: "0 0 24px" }}>
                  {t("Tell us a little about your company and what you're looking for.", "会社とお探しのものについて教えてください。")}
                </p>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>{t("Company / Organization Name *", "会社名・団体名 *")}</label>
                  <input type="text" placeholder={t("e.g. Pacific Grocery Co.", "例：パシフィック食料品株式会社")} style={inputStyle} value={formData.company} onChange={(e) => updateField("company", e.target.value)} />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>{t("Type of Inquiry *", "お問い合わせの種類 *")}</label>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                    {[
                      { value: "wholesale", title: t("Regular Wholesale / Partnership", "定期卸売・パートナーシップ"), desc: t("Ongoing supply for retail, grocery, institutional, or venue use", "継続的な供給") },
                      { value: "catering",  title: t("Single Catering / Event Order", "単発ケータリング・イベント注文"),  desc: t("One-time or recurring event catering order", "単発または定期的なイベント") },
                    ].map((opt) => (
                      <label key={opt.value} style={{ border: `2px solid ${formData.inquiryType === opt.value ? "#e8847a" : "#e8e0d0"}`, borderRadius: 14, padding: isMobile ? 12 : 16, cursor: "pointer", background: formData.inquiryType === opt.value ? "#fff8f6" : "#fff", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <input type="radio" name="inquiryType" value={opt.value} checked={formData.inquiryType === opt.value} onChange={() => updateField("inquiryType", opt.value)} style={{ marginTop: 3, accentColor: "#e8847a" }} />
                        <div>
                          <div style={{ fontWeight: 800, color: "#6f471c", fontSize: 15 }}>{opt.title}</div>
                          <div style={{ fontSize: 13, color: "#8a6a4a", marginTop: 4 }}>{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={() => formData.inquiryType && formData.company.trim() && setStep(2)} style={{ width: "100%", background: formData.inquiryType && formData.company.trim() ? "#e8847a" : "#f0c8c0", color: "#fff", border: "none", borderRadius: 999, padding: "13px", fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 15, cursor: formData.inquiryType && formData.company.trim() ? "pointer" : "not-allowed" }}>
                  {t("NEXT →", "次へ →")}
                </button>
              </>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <>
                <h3 style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: "#6f471c", margin: "0 0 6px" }}>
                  {formData.inquiryType === "wholesale" ? t("Wholesale Details", "卸売の詳細") : t("Event Details", "イベントの詳細")}
                </h3>
                <p style={{ color: "#8a6a4a", fontSize: 14, margin: "0 0 24px" }}>
                  {formData.inquiryType === "wholesale" ? t("Tell us about your business and volume needs.", "ビジネスと数量のニーズを教えてください。") : t("Tell us about your upcoming event.", "予定しているイベントについて教えてください。")}
                </p>

                {formData.inquiryType === "wholesale" && (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <SelectField label={t("Business Type *", "ビジネスタイプ *")} value={formData.businessType} onChange={(v) => updateField("businessType", v)}>
                        <option value="">{t("Select business type", "選択")}</option>
                        <option>{t("Retail / Grocery", "小売・食料品店")}</option>
                        <option>{t("Corporate Cafeteria or Office", "企業食堂・オフィス")}</option>
                        <option>{t("School or University", "学校・大学")}</option>
                        <option>{t("Stadium or Arena", "スタジアム・アリーナ")}</option>
                        <option>{t("Event Venue", "イベント会場")}</option>
                        <option>{t("Cafe or Restaurant", "カフェ・レストラン")}</option>
                        <option>{t("Other", "その他")}</option>
                      </SelectField>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>{t("Desired Location / Service Area *", "希望場所・サービスエリア *")}</label>
                      <input type="text" placeholder={t("e.g. Seattle, WA", "例：シアトル、WA")} style={inputStyle} value={formData.serviceArea} onChange={(e) => updateField("serviceArea", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <label style={labelStyle}>{t("Estimated Weekly Volume *", "週間推定数量 *")}</label>
                      <input type="text" placeholder={t("e.g. 500 units/week", "例：500個/週")} style={inputStyle} value={formData.weeklyVolume} onChange={(e) => updateField("weeklyVolume", e.target.value)} />
                    </div>
                  </>
                )}

                {formData.inquiryType === "catering" && (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>{t("Event Date *", "イベント日 *")}</label>
                      <input type="date" style={inputStyle} value={formData.eventDate} onChange={(e) => updateField("eventDate", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>{t("Estimated Number of Guests *", "参加者の推定人数 *")}</label>
                      <input type="number" placeholder={t("e.g. 200", "例：200")} style={inputStyle} value={formData.guests} onChange={(e) => updateField("guests", e.target.value)} />
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <label style={labelStyle}>{t("Venue Name or Address *", "会場名または住所 *")}</label>
                      <input type="text" placeholder={t("e.g. T-Mobile Park, Seattle WA", "例：Tモバイルパーク")} style={inputStyle} value={formData.venue} onChange={(e) => updateField("venue", e.target.value)} />
                    </div>
                  </>
                )}

                {error && (
                  <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: "#c00", fontSize: 14 }}>
                    {error}
                  </div>
                )}
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => { setError(""); setStep(1); }} style={backBtn}>{t("← Back", "← 戻る")}</button>
                  <button
                    onClick={() => {
                      setError("");
                      if (formData.inquiryType === "wholesale") {
                        if (!formData.businessType) { setError(t("Please select a business type.", "ビジネスタイプを選択してください。")); return; }
                        if (!formData.serviceArea.trim()) { setError(t("Please enter a service area.", "希望場所・サービスエリアを入力してください。")); return; }
                        if (!formData.weeklyVolume.trim()) { setError(t("Please enter an estimated weekly volume.", "週間推定数量を入力してください。")); return; }
                      }
                      if (formData.inquiryType === "catering") {
                        if (!formData.eventDate) { setError(t("Please select an event date.", "イベント日を選択してください。")); return; }
                        if (!formData.guests.trim()) { setError(t("Please enter the estimated number of guests.", "参加者の推定人数を入力してください。")); return; }
                        if (!formData.venue.trim()) { setError(t("Please enter the venue name or address.", "会場名または住所を入力してください。")); return; }
                      }
                      setStep(3);
                    }}
                    style={{ ...nextBtn, flex: 2 }}
                  >
                    {t("NEXT →", "次へ →")}
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <>
                <h3 style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: "#6f471c", margin: "0 0 6px" }}>
                  {t("Your Contact Details", "ご連絡先")}
                </h3>
                <p style={{ color: "#8a6a4a", fontSize: 14, margin: "0 0 24px" }}>
                  {t("Almost done — just a few final details.", "もう少しです。")}
                </p>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>{t("Your Name *", "お名前 *")}</label>
                    <input type="text" placeholder="Jane Smith" style={inputStyle} value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("Email Address *", "メールアドレス *")}</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      style={{ ...inputStyle, borderColor: formData.email && !emailRegex.test(formData.email) ? "#ffaaaa" : "#e0d8cc" }}
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                    {formData.email && !emailRegex.test(formData.email) && (
                      <div style={{ fontSize: 11, color: "#e07070", marginTop: 4 }}>{t("Enter a valid email", "有効なメールアドレスを入力してください")}</div>
                    )}
                  </div>
                </div>

                {/* Phone with ISD */}
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{t("Phone Number *", "電話番号 *")}</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <select value={isdCode} onChange={(e) => { setIsdCode(e.target.value); updateField("phone", ""); }} style={{ ...inputStyle, width: 110, appearance: "none", paddingRight: 24, paddingLeft: 10 } as React.CSSProperties}>
                        {ISD_CODES.map((c) => (
                          <option key={c.flag + c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#bbb", fontSize: 12 }}>▾</span>
                    </div>
                    <input
                      type="tel"
                      placeholder={isdCode === "+1" ? "(206) 555-0100" : "Phone number"}
                      style={{ ...inputStyle, flex: 1, borderColor: formData.phone && formData.phone.replace(/\D/g, "").length !== 10 ? "#ffaaaa" : "#e0d8cc" }}
                      value={formData.phone}
                      onChange={(e) => updateField("phone", formatPhone(e.target.value, isdCode))}
                    />
                  </div>
                  {formData.phone && formData.phone.replace(/\D/g, "").length !== 10 && (
                    <div style={{ fontSize: 11, color: "#e07070", marginTop: 4 }}>{t("Enter a valid 10-digit phone number", "10桁の有効な電話番号を入力してください")}</div>
                  )}
                </div>

                {/* How did you hear */}
                <div style={{ marginBottom: 14 }}>
                  <SelectField label={t("How did you hear about us?", "どこでお知りになりましたか？")} value={formData.heardFrom} onChange={(v) => updateField("heardFrom", v)}>
                    <option value="">{t("Select an option", "選択してください")}</option>
                    <option>{t("Social Media", "ソーシャルメディア")}</option>
                    <option>{t("News or Media", "ニュース・メディア")}</option>
                    <option>{t("Physical Store or Stadium", "店舗・スタジアム")}</option>
                    <option>{t("Search", "検索")}</option>
                    <option>{t("Referral", "紹介")}</option>
                    <option>{t("Saw at another location", "別の場所で見た")}</option>
                    <option>{t("Other", "その他")}</option>
                  </SelectField>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>{t("Notes / Remarks", "備考・メモ")}</label>
                  <textarea rows={4} placeholder={t("Anything else you'd like us to know...", "その他ご記入ください...")} style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties} value={formData.notes} onChange={(e) => updateField("notes", e.target.value)} />
                </div>

                {/* Error */}
                {error && (
                  <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: "#c00", fontSize: 14 }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <button onClick={() => setStep(2)} style={backBtn}>{t("← Back", "← 戻る")}</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ ...nextBtn, flex: 2, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? t("Submitting...", "送信中...") : t("Submit →", "送信 →")}
                  </button>
                </div>

                <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", margin: 0, lineHeight: 1.6 }}>
                  {t("By submitting this form, you agree to our", "このフォームを送信することで、")}{" "}
                  <a href="/onigiri-pp.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#e07070", textDecoration: "none" }}>{t("Privacy Policy", "プライバシーポリシー")}</a>{" "}
                  {t("and", "と")}{" "}
                  <a href="/onigiri-tc.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#e07070", textDecoration: "none" }}>{t("Terms of Service", "利用規約")}</a>
                  {t(".", "に同意したことになります。")}
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}