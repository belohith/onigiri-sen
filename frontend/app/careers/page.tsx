"use client";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
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

const ISD_CODES = [
  { code: "+1",  flag: "🇺🇸", label: "US / Canada" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+81", flag: "🇯🇵", label: "Japan" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
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

const DRAFT_KEY = "onigiri_careers_draft";
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

// ── Job listings — add/remove roles here ──
// Leave this array empty ([]) to show the "no open roles" message
const openRoles: Array<{
  id: string;
  titleEn: string; titleJa: string;
  typeEn: string; typeJa: string;
  locationEn: string; locationJa: string;
  payEn: string; payJa: string;
  descEn: string; descJa: string;
  responsibilitiesEn: string[]; responsibilitiesJa: string[];
  requirementsEn: string[]; requirementsJa: string[];
  niceToHaveEn: string[]; niceToHaveJa: string[];
  reportsToEn: string; reportsToJa: string;
}> = [
  {
    id: "kitchen-woodinville",
    titleEn: "Kitchen Staff",
    titleJa: "キッチンスタッフ",
    typeEn: "Full-time · 7 PM–3 AM",
    typeJa: "フルタイム · 19:00〜3:00",
    locationEn: "Woodinville, WA",
    locationJa: "ウッディンビル、WA",
    payEn: "$22/hr",
    payJa: "時給 $22",
    descEn: "As a kitchen staff member, you'll help fulfill our daily onigiri production, working efficiently and purposefully alongside the rest of the team to complete orders headed to grocery stores the following day.",
    descJa: "キッチンスタッフとして、おにぎりの日々の製造を担当します。チームと協力しながら効率的かつ丁寧に作業を行い、翌日グロサリーストアへ出荷される注文を完成させます。",
    responsibilitiesEn: [
      "Set up the kitchen with the team, ready for production",
      "Cook and tend to rice before it goes into the onigiri machine",
      "Apply front stickers to nori (seaweed) sheets",
      "Run the fill station (filling ingredients into rice molds)",
      "Run the labeling station, applying back labels to finished onigiri",
      "Wash dishes",
      "Keep the kitchen clean and tidy after production",
    ],
    responsibilitiesJa: [
      "チームと協力し、時間通りにキッチンを準備する",
      "おにぎり製造機に入れる前に、お米を炊いて管理する",
      "海苔シートに表面のシールを貼る",
      "フィルステーション（型に具材を詰める作業）を担当する",
      "ラベリングステーションで完成したおにぎりに裏面ラベルを貼る",
      "食器を洗う",
      "製造後、キッチンを清潔に保つ",
    ],
    requirementsEn: [
      "Current, up-to-date Food Handler's card",
      "Able to speak and understand English at a working level",
      "Able to stand and walk for extended periods of time",
      "Able to lift up to 40 lbs",
    ],
    requirementsJa: [
      "有効な食品取扱者資格（Food Handler's card）",
      "業務に支障のない英語力",
      "長時間の立ち作業・移動が可能な方",
      "40ポンド（約18kg）までの持ち上げが可能な方",
    ],
    niceToHaveEn: [
      "Willingness to adapt and learn as the company grows",
      "Previous experience working with Japanese cuisine",
      "Able to speak and understand Japanese at a working level",
    ],
    niceToHaveJa: [
      "会社の成長に合わせて柔軟に学ぶ姿勢がある方",
      "日本料理に関わった経験がある方",
      "日常会話レベルの日本語力がある方",
    ],
    reportsToEn: "Reports directly to the Kitchen Manager",
    reportsToJa: "キッチンマネージャーの直属",
  },
  // Example (uncomment to activate):
  // {
  //   id: "kitchen-sj",
  //   titleEn: "Kitchen Production Staff",
  //   titleJa: "キッチンスタッフ",
  //   typeEn: "Part-time · On-site",
  //   typeJa: "パートタイム · 現地勤務",
  //   locationEn: "San Jose, CA",
  //   locationJa: "サンノゼ、CA",
  //   payEn: "", payJa: "",
  //   descEn: "Join our San Jose kitchen team preparing fresh onigiri every morning.",
  //   descJa: "サンノゼのキッチンチームで毎朝新鮮なおにぎりを製造します。",
  //   responsibilitiesEn: [], responsibilitiesJa: [],
  //   requirementsEn: ["Early morning hours (4–10 AM)", "Food handler certification preferred", "Must be able to lift 25 lbs"],
  //   requirementsJa: ["早朝勤務（4〜10時）", "食品取扱者資格歓迎", "25ポンドの持ち上げが可能な方"],
  //   niceToHaveEn: [], niceToHaveJa: [],
  //   reportsToEn: "", reportsToJa: "",
  // },
];

const values = [
  {
    icon: "❤️",
    titleEn: "People First",
    titleJa: "People First (大切な人の幸せを第一に)",
    bodyEn: "We deeply respect the personal time and lives of our team. We are fiercely committed to creating an environment where our people and their families can thrive and lead deeply fulfilling lives — both materially and spiritually.",
    bodyJa: "私たちは、メンバー一人ひとりの「人生の時間」に敬意を払います。スタッフとその家族が、物心両面で豊かで幸せな人生を送れる環境を、会社全体で追求し続けます。",
  },
  {
    icon: "🙏",
    titleEn: "Deep Gratitude",
    titleJa: "Deep Gratitude (言葉と行動で示す、深い感謝)",
    bodyEn: "Exceptional onigiri cannot be crafted alone. From the kitchen and distribution to front-line sales, we express our gratitude through both words and actions, building a culture rooted in deep, mutual respect.",
    bodyJa: "美味しいおにぎりは、一人では作れません。キッチンで握る仲間、配送する仲間、販売する仲間、すべての人に「ありがとう」を言葉と行動で伝え合い、リスペクトの溢れるチームを築きます。",
  },
  {
    icon: "🍙",
    titleEn: "Uncompromising Quality",
    titleJa: "Uncompromising Quality (本物への妥協なきこだわり)",
    bodyEn: "What we deliver is not just food — it is the rich, authentic culinary culture of Japan. No matter how fast or large we grow, we will never compromise on our daily dedication to quality, taste, and absolute freshness.",
    bodyJa: "私たちが届けるのは、単なる食べ物ではなく「日本の豊かな食文化」です。どんなに規模が大きくなっても、毎日の品質、味、フレッシュさへのこだわりには一切妥協しません。",
  },
  {
    icon: "🤝",
    titleEn: "Shared Success",
    titleJa: "Shared Success (成長の喜びを、みんなで分かち合う)",
    bodyEn: "Our company's growth is the ultimate fruit of our team's collective dedication. As we boldly chase massive milestones like expanding into major national retailers and scaling nationwide, every victory and success we achieve will be celebrated and shared with every single member of our team.",
    bodyJa: "会社の成長は、チーム全員の貢献の結晶です。主要な大型小売店への展開や全米進出といった大きな目標に向かって共に挑戦し、掴み取った成果と成功は、必ず全員で分かち合います。",
  },
  {
    icon: "🚀",
    titleEn: "Continuous Evolution",
    titleJa: "Continuous Evolution (現状に満足せず、共に進化し続ける)",
    bodyEn: "Our current success serves merely as the starting point for our next endeavor. We consistently strive for elevated standards in taste, service, and team dynamics, rejecting complacency as we eagerly embrace new challenges.",
    bodyJa: "今の成功は、次なる挑戦へのスタートラインに過ぎません。味、サービス、そしてチームのあり方に常に高い次元を追い求め、現状に満足することなく、新しい挑戦を続けていきます。",
  },
];

export default function CareersPage() {
  const { t, lang } = useLang();
  const isMobile = useIsMobile();
  const honeypotRef = useRef("");
  const formRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isdCode, setIsdCode] = useState("+1");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    position: "", coverNote: "",
  });

  useEffect(() => {
    const draft = loadDraft();
    if (draft) setFormData(draft);
  }, []);

  useEffect(() => { saveDraft(formData); }, [formData]);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Build position options: open roles + general interest
  const positionOptions = [
    ...openRoles.map((r) => ({
      value: r.id,
      label: lang === "ja" ? `${r.titleJa} — ${r.locationJa}` : `${r.titleEn} — ${r.locationEn}`,
    })),
    { value: "general", label: t("General Interest — I'd love to contribute in any capacity", "一般応募 — どのようなポジションでも貢献したい") },
  ];

  async function handleSubmit() {
    setError("");
    if (!formData.name.trim() || !formData.email.trim() || !formData.position) {
      setError(t("Please fill out your name, email, and position.", "お名前、メールアドレス、希望ポジションをご入力ください。"));
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError(t("Please enter a valid email address.", "有効なメールアドレスを入力してください。"));
      return;
    }
    if (formData.phone) {
      const digits = formData.phone.replace(/\D/g, "");
      const last10 = digits.slice(-10);
      if (last10.length !== 10) {
        setError(t("Please enter a valid 10-digit phone number.", "10桁の有効な電話番号を入力してください。"));
        return;
      }
    }

    try {
      setLoading(true);
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone ? `${isdCode} ${formData.phone}` : "",
          honeypot: honeypotRef.current,
        }),
      });
      const data = await res.json();
      if (data.success) {
        sendGAEvent("event", "form_submit", { form_name: "careers", position: formData.position });
        clearDraft();
        setSubmitted(true);
      } else {
        setError(data.error || t("Failed to submit. Please try again.", "送信に失敗しました。もう一度お試しください。"));
      }
    } catch {
      setError(t("Something went wrong. Please try again.", "エラーが発生しました。もう一度お試しください。"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main style={{ fontFamily:"DM Sans, sans-serif", background:"#fff9f5", marginTop:72 }}>

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? "56px 24px 40px" : "72px 80px 56px", textAlign:"center", background:"#fff9f5" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ed7e80", borderRadius:999, padding:"6px 20px", fontSize:11, fontWeight:700, letterSpacing:2, color:"#fff", marginBottom:20, textTransform:"uppercase" as const }}>
            {t("JOIN OUR TEAM","採用情報")}
          </div>
          <h1 style={{ fontWeight:900, fontSize: isMobile ? 28 : 40, color:"#6f471c", margin:"0 0 16px", lineHeight:1.2 }}>
            {t("Join the Onigiri Sen Team","Onigiri Sen チームに参加しよう")}
          </h1>
          <p style={{ color:"#8a6a4a", fontSize: isMobile ? 14 : 16, maxWidth:540, margin:"0 auto 28px", lineHeight:1.8 }}>
            {t(
              "We're a small, passionate team on a mission to bring Japan's everyday food culture to America. If that sounds like your kind of work — we'd love to hear from you.",
              "私たちは、日本の日常食文化をアメリカに届けるというミッションに情熱を持った小さなチームです。あなたがその仕事に共感するなら、ぜひご連絡ください。"
            )}
          </p>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior:"smooth" })}
            style={{ background:"#ed7e80", color:"#fff", border:"none", borderRadius:999, padding: isMobile ? "13px 28px" : "15px 40px", fontFamily:"DM Sans, sans-serif", fontWeight:700, fontSize: isMobile ? 14 : 16, cursor:"pointer" }}
          >
            {t("Apply Now →","今すぐ応募 →")}
          </button>
        </section>

        {/* ── WHY JOIN ── */}
        <section style={{ padding: isMobile ? "40px 24px" : "64px 80px", background:"#ffefc8" }}>
          <h2 style={{ textAlign:"center", fontWeight:800, fontSize: isMobile ? 20 : 26, color:"#6f471c", margin:"0 0 36px" }}>
            {t("Our Core Values","私たちのコアバリュー")}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 24, maxWidth:960, margin:"0 auto" }}>
            {values.map((v) => (
              <div key={v.titleEn} style={{ background:"#fff", borderRadius:20, padding: isMobile ? "24px 20px" : "32px 24px", textAlign:"center" as const, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize:36, marginBottom:14 }}>{v.icon}</div>
                <div style={{ fontWeight:800, fontSize: isMobile ? 15 : 17, color:"#6f471c", marginBottom:10 }}>{lang === "ja" ? v.titleJa : v.titleEn}</div>
                <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.8, margin:0 }}>{lang === "ja" ? v.bodyJa : v.bodyEn}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── OPEN ROLES or NO ROLES ── */}
        <section style={{ padding: isMobile ? "48px 24px 0" : "64px 80px 0", background:"#fff9f5" }}>
          <h2 style={{ fontWeight:800, fontSize: isMobile ? 20 : 26, color:"#6f471c", margin:"0 0 24px" }}>
            {t("Open Positions","募集中のポジション")}
          </h2>

          {openRoles.length === 0 ? (
            <div style={{ maxWidth:760, margin:"0 auto 48px", background:"#fff", borderRadius:24, padding: isMobile ? "32px 24px" : "40px 48px", border:"1.5px solid #f0e4d4", textAlign:"center" as const }}>
              <div style={{ fontSize:36, marginBottom:12 }}>🍙</div>
              <div style={{ fontWeight:800, fontSize: isMobile ? 16 : 20, color:"#6f471c", marginBottom:10 }}>
                {t("No open positions right now","現在募集中のポジションはありません")}
              </div>
              <p style={{ color:"#8a6a4a", fontSize: isMobile ? 13 : 15, lineHeight:1.85, margin:0 }}>
                {t(
                  "We don't have any open roles at the moment, but we're always growing. Apply below and we'll keep you in mind.",
                  "現在は募集中のポジションはありませんが、私たちは常に成長しています。下のフォームからご応募いただければ、将来の求人の際にご連絡いたします。"
                )}
              </p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column" as const, gap:16, maxWidth:760, marginBottom:48 }}>
              {openRoles.map((role) => (
                <div key={role.id} style={{ background:"#fff", borderRadius:20, padding: isMobile ? "22px 20px" : "28px 32px", border:"1.5px solid #f0e4d4" }}>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const, alignItems:"center", marginBottom:10 }}>
                    <div style={{ fontWeight:800, fontSize: isMobile ? 15 : 17, color:"#2a2a2a" }}>
                      {lang === "ja" ? role.titleJa : role.titleEn}
                    </div>
                    <span style={{ background:"#ffefc8", color:"#6f471c", fontSize:11, fontWeight:700, borderRadius:999, padding:"3px 12px" }}>
                      {lang === "ja" ? role.typeJa : role.typeEn}
                    </span>
                    <span style={{ background:"#fff0ea", color:"#6f471c", fontSize:11, fontWeight:700, borderRadius:999, padding:"3px 12px" }}>
                      📍 {lang === "ja" ? role.locationJa : role.locationEn}
                    </span>
                    {(lang === "ja" ? role.payJa : role.payEn) && (
                      <span style={{ background:"#eaf7ea", color:"#3a7a3a", fontSize:11, fontWeight:700, borderRadius:999, padding:"3px 12px" }}>
                        💰 {lang === "ja" ? role.payJa : role.payEn}
                      </span>
                    )}
                  </div>

                  <p style={{ color:"#8a6a4a", fontSize:13, lineHeight:1.8, margin:"0 0 16px" }}>
                    {lang === "ja" ? role.descJa : role.descEn}
                  </p>

                  {(lang === "ja" ? role.responsibilitiesJa : role.responsibilitiesEn).length > 0 && (
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontWeight:700, fontSize:12, color:"#6f471c", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:0.5 }}>
                        {t("Key Responsibilities","主な業務内容")}
                      </div>
                      <ul style={{ margin:0, paddingLeft:20, color:"#8a6a4a", fontSize:13, lineHeight:1.9 }}>
                        {(lang === "ja" ? role.responsibilitiesJa : role.responsibilitiesEn).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}

                  {(lang === "ja" ? role.requirementsJa : role.requirementsEn).length > 0 && (
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontWeight:700, fontSize:12, color:"#6f471c", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:0.5 }}>
                        {t("Requirements","応募資格")}
                      </div>
                      <ul style={{ margin:0, paddingLeft:20, color:"#8a6a4a", fontSize:13, lineHeight:1.9 }}>
                        {(lang === "ja" ? role.requirementsJa : role.requirementsEn).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}

                  {(lang === "ja" ? role.niceToHaveJa : role.niceToHaveEn).length > 0 && (
                    <div style={{ marginBottom:16 }}>
                      <div style={{ fontWeight:700, fontSize:12, color:"#6f471c", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:0.5 }}>
                        {t("Nice to Have","歓迎条件")}
                      </div>
                      <ul style={{ margin:0, paddingLeft:20, color:"#8a6a4a", fontSize:13, lineHeight:1.9 }}>
                        {(lang === "ja" ? role.niceToHaveJa : role.niceToHaveEn).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}

                  {(lang === "ja" ? role.reportsToJa : role.reportsToEn) && (
                    <p style={{ color:"#bbb", fontSize:12, margin:0, fontStyle:"italic" as const }}>
                      {lang === "ja" ? role.reportsToJa : role.reportsToEn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── APPLICATION FORM ── */}
        <section ref={formRef} style={{ padding: isMobile ? "48px 24px 80px" : "48px 80px 100px", background:"#fff9f5" }}>
          <div style={{ maxWidth:640, margin:"0 auto", background:"#fff", borderRadius:24, padding: isMobile ? "32px 24px" : "48px 48px", border:"1.5px solid #f0e4d4", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>

            {submitted ? (
              <div style={{ textAlign:"center", padding:"24px 0" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🎉</div>
                <h3 style={{ fontWeight:900, fontSize: isMobile ? 22 : 26, color:"#6f471c", margin:"0 0 12px" }}>
                  {t("Application Received!","応募を受け付けました！")}
                </h3>
                <p style={{ color:"#8a6a4a", fontSize:14, lineHeight:1.8, margin:"0 0 8px" }}>
                  {t("Thank you for your interest in Onigiri Sen.", "Onigiri Senへのご関心ありがとうございます。")}
                </p>
                <p style={{ color:"#8a6a4a", fontSize:14, lineHeight:1.8, margin:0 }}>
                  {t("We'll review your application and be in touch if there's a good fit.", "ご応募内容を確認し、適切な場合はご連絡いたします。")}
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontWeight:900, fontSize: isMobile ? 20 : 24, color:"#6f471c", margin:"0 0 6px" }}>
                  {t("Apply Now","今すぐ応募")}
                </h2>
                <p style={{ color:"#8a6a4a", fontSize:14, margin:"0 0 28px" }}>
                  {t("Fill out the form below and we'll be in touch.","下のフォームにご記入ください。折り返しご連絡いたします。")}
                </p>

                {/* Honeypot */}
                <input type="text" onChange={(e) => { honeypotRef.current = e.target.value; }} style={{ display:"none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                {/* Name + Email */}
                <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:16 }}>
                  <div>
                    <label style={labelStyle}>{t("Full Name *","氏名 *")}</label>
                    <input type="text" placeholder="Jane Smith" style={inputStyle} value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("Email Address *","メールアドレス *")}</label>
                    <input
                      type="email"
                      placeholder="jane@email.com"
                      style={{ ...inputStyle, borderColor: formData.email && !emailRegex.test(formData.email) ? "#ffaaaa" : "#e0d8cc" }}
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                    {formData.email && !emailRegex.test(formData.email) && (
                      <div style={{ fontSize:11, color:"#e07070", marginTop:4 }}>{t("Enter a valid email","有効なメールアドレスを入力してください")}</div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom:16 }}>
                  <label style={labelStyle}>{t("Phone Number","電話番号")}</label>
                  <div style={{ display:"flex", gap:8 }}>
                    <div style={{ position:"relative", flexShrink:0 }}>
                      <select value={isdCode} onChange={(e) => { setIsdCode(e.target.value); updateField("phone", ""); }} style={{ ...inputStyle, width:110, appearance:"none", paddingRight:24, paddingLeft:10 } as React.CSSProperties}>
                        {ISD_CODES.map((c) => (
                          <option key={c.flag + c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <span style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#bbb", fontSize:12 }}>▾</span>
                    </div>
                    <input
                      type="tel"
                      placeholder={isdCode === "+1" ? "(206) 555-0100" : "Phone number"}
                      style={{ ...inputStyle, flex:1 }}
                      value={formData.phone}
                      onChange={(e) => updateField("phone", formatPhone(e.target.value, isdCode))}
                    />
                  </div>
                </div>

                {/* Position */}
                <div style={{ marginBottom:16 }}>
                  <label style={labelStyle}>{t("Position of Interest *","希望ポジション *")}</label>
                  <div style={{ position:"relative" }}>
                    <select
                      value={formData.position}
                      onChange={(e) => updateField("position", e.target.value)}
                      style={{ ...inputStyle, appearance:"none", paddingRight:36 } as React.CSSProperties}
                    >
                      <option value="">{t("Select a position...","ポジションを選択してください...")}</option>
                      {positionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#bbb", fontSize:14 }}>▾</span>
                  </div>
                </div>

                {/* Cover note */}
                <div style={{ marginBottom:24 }}>
                  <label style={labelStyle}>{t("Tell Us About Yourself","自己紹介")}</label>
                  <textarea
                    rows={5}
                    placeholder={t(
                      "Share a bit about your background, why you're interested in Onigiri Sen, and anything else you'd like us to know...",
                      "あなたの経歴、Onigiri Senへの関心、その他ご伝えしたいことをご記入ください..."
                    )}
                    style={{ ...inputStyle, resize:"vertical" } as React.CSSProperties}
                    value={formData.coverNote}
                    onChange={(e) => updateField("coverNote", e.target.value)}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div style={{ background:"#fff0f0", border:"1px solid #ffcccc", borderRadius:10, padding:"12px 16px", marginBottom:16, color:"#c00", fontSize:14 }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ width:"100%", background: loading ? "#f0c8c0" : "#ed7e80", color:"#fff", border:"none", borderRadius:999, padding:"14px", fontFamily:"DM Sans, sans-serif", fontWeight:800, fontSize:15, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? t("Submitting...","送信中...") : t("Submit Application →","応募を送信 →")}
                </button>

                <p style={{ textAlign:"center", fontSize:12, color:"#bbb", margin:"16px 0 0", lineHeight:1.6 }}>
                  {t("Or email us directly at","または直接メールでご連絡ください：")}{" "}
                  <a href="mailto:contact@onigirisen.jp" style={{ color:"#ed7e80", textDecoration:"none", fontWeight:600 }}>contact@onigirisen.jp</a>
                </p>
              </>
            )}
          </div>
        </section>

      </main>
    </>
  );
}