"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { useLang } from "../context/LangContext";

const input: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #ede5da",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: "DM Sans, sans-serif",
  color: "#2a2a2a",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 5000;

// ── ISD codes ──
const ISD_CODES = [
  { code: "+1",   flag: "🇺🇸", label: "US / Canada" },
  { code: "+44",  flag: "🇬🇧", label: "UK" },
  { code: "+81",  flag: "🇯🇵", label: "Japan" },
  { code: "+61",  flag: "🇦🇺", label: "Australia" },
  { code: "+49",  flag: "🇩🇪", label: "Germany" },
  { code: "+33",  flag: "🇫🇷", label: "France" },
  { code: "+86",  flag: "🇨🇳", label: "China" },
  { code: "+82",  flag: "🇰🇷", label: "Korea" },
  { code: "+91",  flag: "🇮🇳", label: "India" },
  { code: "+55",  flag: "🇧🇷", label: "Brazil" },
  { code: "+52",  flag: "🇲🇽", label: "Mexico" },
  { code: "+65",  flag: "🇸🇬", label: "Singapore" },
  { code: "+63",  flag: "🇵🇭", label: "Philippines" },
  { code: "+60",  flag: "🇲🇾", label: "Malaysia" },
  { code: "+66",  flag: "🇹🇭", label: "Thailand" },
  { code: "+64",  flag: "🇳🇿", label: "New Zealand" },
  { code: "+1",   flag: "🇨🇦", label: "Canada" },
];

// ── Phone formatter — US style for +1, generic otherwise ──
function formatPhone(value: string, isd: string): string {
  const digits = value.replace(/\D/g, "");
  if (isd === "+1") {
    const d = digits.slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  // Generic: just digits with max 12
  return digits.slice(0, 12);
}

// ── Draft persistence ──
const DRAFT_KEY = "onigiri_contact_draft";
function saveDraft(data: object) {
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch {}
}
function loadDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function clearDraft() {
  try { sessionStorage.removeItem(DRAFT_KEY); } catch {}
}

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

export default function ContactPage() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const honeypotRef = useRef("");

  const [isdCode, setIsdCode] = useState("+1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    heardFrom: "",
    message: "",
  });

  // ── Load saved draft on mount ──
  useEffect(() => {
    const draft = loadDraft();
    if (draft) setFormData(draft);
  }, []);

  // ── Save draft on change ──
  useEffect(() => {
    saveDraft(formData);
  }, [formData]);

  const subjects = [
    t("General Question", "一般的なご質問"),
    t("Order Inquiry", "注文に関するお問い合わせ"),
    t("Wholesale Partnership", "卸売パートナーシップ"),
    t("Press & Media", "プレス・メディア"),
    t("Other", "その他"),
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messageLen = formData.message.trim().length;
  const messageTooShort = messageLen > 0 && messageLen < MESSAGE_MIN;
  const messageTooLong  = messageLen > MESSAGE_MAX;

  async function handleSubmit() {
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      setError(t("Please fill out all required fields.", "必須項目をすべてご入力ください。"));
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError(t("Please enter a valid email address.", "有効なメールアドレスを入力してください。"));
      return;
    }
    // Phone validation — only if filled in, must be exactly 10 formatted digits
    if (formData.phone) {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length !== 10) {
        setError(t("Please enter a valid 10-digit phone number.", "10桁の有効な電話番号を入力してください。"));
        return;
      }
    }
    if (messageTooShort) {
      setError(t("Message is too short. Please provide more detail.", "メッセージが短すぎます。もう少し詳しくご記入ください。"));
      return;
    }
    if (messageTooLong) {
      setError(t("Message is too long (max 5000 characters).", "メッセージが長すぎます（最大5000文字）。"));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: formData.phone ? `${isdCode} ${formData.phone}` : "", honeypot: honeypotRef.current }),
      });

      const data = await response.json();

      if (data.success) {
        clearDraft();
        window.location.href = "/thank-you";
      } else {
        setError(data.error || t("Failed to send message.", "送信に失敗しました。"));
      }
    } catch (err) {
      console.error(err);
      setError(t("Something went wrong. Please try again.", "エラーが発生しました。もう一度お試しください。"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main style={{ fontFamily: "DM Sans, sans-serif", background: "#fff", marginTop: 72 }}>

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? "64px 24px 36px" : "92px 80px 48px", textAlign: "center", background: "#fff9f5" }}>
          <h1 style={{ fontWeight: 800, fontSize: isMobile ? 28 : 38, color: "#6f471c", margin: "0 0 16px" }}>
            {t("Get in Touch", "お問い合わせ")}
          </h1>
          <p style={{ color: "#6f471c", fontSize: isMobile ? 14 : 16, maxWidth: 700, margin: "0 auto" }}>
            {t(
              "Have a question, a business inquiry, or just want to say hello? We'd love to connect with you.",
              "ご質問やビジネスに関するご相談など、どうぞお気軽にお問い合わせください。"
            )}
          </p>
        </section>

        {/* ── MAIN ── */}
        <section style={{ background: "#ffefc8", padding: isMobile ? "36px 20px 60px" : "64px 80px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.8fr", gap: isMobile ? 36 : 56, alignItems: "start" }}>

          {/* Left */}
          <div>
            <h2 style={{ fontWeight: 900, fontSize: isMobile ? 22 : 28, color: "#6f471c", margin: "0 0 24px" }}>
              {t("Contact Info", "お問い合わせ情報")}
            </h2>
            {[
              { icon: "/images/email.png", label: t("E-mail", "メールアドレス"), value: "contact@onigirisen.jp", href: "mailto:contact@onigirisen.jp" },
              { icon: "/images/insta.png", label: t("Instagram", "インスタグラム"), value: "@onigirisen.jp", href: "https://instagram.com/onigirisen.jp" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, border: "2px solid #e8ddd4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#fff" }}>
                  <img src={row.icon} alt={row.label} style={{ width: 28, height: 28, objectFit: "contain" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#ed7e80", fontSize: 14, marginBottom: 2 }}>{row.label}</div>
                  <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ color: "#6f471c", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                    {row.value}
                  </a>
                </div>
              </div>
            ))}
            <div style={{ background: "#6f471c", borderRadius: 18, padding: "22px 24px", marginTop: 32, color: "#fff" }}>
              <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 10px", lineHeight: 1.5 }}>
                {t("Looking to carry Onigiri Sen in your store or venue?", "Onigiri Sen のお取り扱いを希望ですか？")}
              </p>
              <Link href="/wholesale" style={{ color: "#e8a87a", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                → {t("Inquire About Wholesale Partnership", "パートナーシップについて")}
              </Link>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: "#fff9f5", borderRadius: 24, padding: isMobile ? "28px 20px" : "40px", boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontWeight: 800, fontSize: isMobile ? 18 : 22, color: "#6f471c", margin: "0 0 24px" }}>
              {t("Send Us a Message", "メッセージを送る")}
            </h2>

            {/* Honeypot — hidden from humans, bots fill it */}
            <input
              type="text"
              onChange={(e) => { honeypotRef.current = e.target.value; }}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>{t("Name *", "お名前 *")}</div>
                <input type="text" placeholder="Jane Smith" style={input} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>{t("Email *", "メールアドレス *")}</div>
                <input
                  type="email"
                  placeholder="jane@email.com"
                  style={{
                    ...input,
                    borderColor: formData.email && !emailRegex.test(formData.email) ? "#ffaaaa" : "#ede5da",
                  }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formData.email && !emailRegex.test(formData.email) && (
                  <div style={{ fontSize: 11, color: "#e07070", marginTop: 4 }}>
                    {t("Enter a valid email address", "有効なメールアドレスを入力してください")}
                  </div>
                )}
              </div>
            </div>

            {/* Phone + Subject */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>{t("Phone Number", "電話番号")}</div>
                <div style={{ display:"flex", gap:8 }}>
                  {/* ISD code selector */}
                  <div style={{ position:"relative", flexShrink:0 }}>
                    <select
                      value={isdCode}
                      onChange={(e) => { setIsdCode(e.target.value); setFormData({ ...formData, phone: "" }); }}
                      style={{ ...input, width:110, appearance:"none", paddingRight:24, paddingLeft:10 } as React.CSSProperties}
                    >
                      {ISD_CODES.map((c) => (
                        <option key={c.flag + c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <span style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#bbb", fontSize:12 }}>▾</span>
                  </div>
                  {/* Number input */}
                  <input
                    type="tel"
                    placeholder={isdCode === "+1" ? "(206) 555-0100" : "Phone number"}
                    style={{ ...input, flex:1 }}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value, isdCode) })}
                  />
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>{t("Subject *", "件名 *")}</div>
                <div style={{ position: "relative" }}>
                  <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} style={{ ...input, appearance: "none", paddingRight: 36 } as React.CSSProperties}>
                    <option value="">{t("Select a subject", "件名を選択")}</option>
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#bbb", fontSize: 14 }}>▾</span>
                </div>
              </div>
            </div>

            {/* How did you hear */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                {t("How did you hear about us?", "どこでお知りになりましたか？")}
              </div>
              <div style={{ position: "relative" }}>
                <select value={formData.heardFrom} onChange={(e) => setFormData({ ...formData, heardFrom: e.target.value })} style={{ ...input, appearance: "none", paddingRight: 36 } as React.CSSProperties}>
                  <option value="">{t("Select an option", "選択してください")}</option>
                  <option>{t("Social Media (Instagram, TikTok, etc.)", "ソーシャルメディア（Instagram、TikTok など）")}</option>
                  <option>{t("News, Articles, or Media", "ニュース・記事・メディア")}</option>
                  <option>{t("At a Sports Stadium or Event", "スポーツスタジアム・イベント")}</option>
                  <option>{t("At a Grocery Store or Cafe", "スーパー・カフェ")}</option>
                  <option>{t("Online or Print Ads", "オンライン広告・紙媒体広告")}</option>
                  <option>{t("Recommended by a Friend or Colleague", "友人・同僚からの紹介")}</option>
                  <option>{t("Other", "その他")}</option>
                </select>
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#bbb", fontSize: 14 }}>▾</span>
              </div>
            </div>

            {/* Message + character counter */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c" }}>{t("Message *", "メッセージ *")}</div>
                <div style={{ fontSize: 12, color: messageTooLong ? "#e07070" : messageTooShort ? "#e8a87a" : "#bbb" }}>
                  {messageLen} / {MESSAGE_MAX}
                  {messageTooShort && ` (${t("min", "最小")} ${MESSAGE_MIN})`}
                </div>
              </div>
              <textarea
                placeholder={t("How can we help? (minimum 20 characters)", "どのようにお手伝いできますか？（最低20文字）")}
                rows={5}
                style={{
                  ...input,
                  resize: "vertical",
                  borderColor: messageTooShort || messageTooLong ? "#ffaaaa" : "#ede5da",
                } as React.CSSProperties}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: "#c00", fontSize: 14 }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ display: "block", width: "100%", background: "#e8847a", color: "#fff", padding: "15px", borderRadius: 999, fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 16, textAlign: "center", border: "none", cursor: loading ? "not-allowed" : "pointer", marginBottom: 14, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? t("Sending...", "送信中...") : t("Send Message", "メッセージを送る")}
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", margin: 0 }}>
              {t("By submitting you agree to our", "送信することで、")}{" "}
              <a href="/onigiri-tc.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#e07070", textDecoration: "none" }}>
                {t("Terms & Conditions", "利用規約")}
              </a>{" "}
              {t("and", "と")}{" "}
              <a href="/onigiri-pp.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#e07070", textDecoration: "none" }}>
                {t("Privacy Policy.", "プライバシーポリシー ")}
              </a>
              {t("", "に同意したことになります。")}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}