"use client";
import { useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { useLang } from "../context/LangContext";

/*
  Images needed (place in /public/images/):
    wholesale-partner-1.jpg ... wholesale-partner-4.jpg  (trusted-by logos)
*/

const inputStyle: React.CSSProperties = { width:"100%", border:"1.5px solid #e0d8cc", borderRadius:10, padding:"12px 14px", fontSize:14, fontFamily:"Nunito, sans-serif", color:"#2a2a2a", outline:"none", boxSizing:"border-box", background:"#fff" };
const labelStyle: React.CSSProperties = { fontWeight:700, fontSize:14, color:"#2a2a2a", marginBottom:6, fontFamily:"Nunito, sans-serif", display:"block" };
const darkBtn: React.CSSProperties = { display:"inline-block", background:"#3a2a1e", color:"#fff", padding:"13px 24px", borderRadius:999, fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:14, textDecoration:"none" };
const backBtn: React.CSSProperties = { flex:1, background:"transparent", color:"#aaa", border:"1.5px solid #e0d8d0", borderRadius:999, padding:"13px", fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:15, cursor:"pointer", textAlign:"center" as const };
const nextBtn: React.CSSProperties = { background:"#e8847a", color:"#fff", border:"none", borderRadius:999, padding:"13px", fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:15, cursor:"pointer", textAlign:"center" as const };

export default function WholesalePage() {
  const [step, setStep] = useState(1);
  const [inquiryType, setInquiryType] = useState("");
  const { t } = useLang();

  return (
    <>
      <Header />
      <main style={{ fontFamily:"Nunito, sans-serif", background:"#fff" }}>

        <section style={{ padding:"112px 80px 64px", textAlign:"center", background:"#fdf9f4" }}>
          <h1 style={{ fontWeight:900, fontSize:42, color:"#5a3a28", lineHeight:1.2, margin:"0 0 20px" }}>
            {t("A Scalable, Reliable Partner\nfor Your Business.","スケーラブルで信頼できる\nビジネスパートナー。")}
          </h1>
          <p style={{ color:"#9a8070", fontSize:16, maxWidth:560, margin:"0 auto 36px", lineHeight:1.75 }}>
            {t("Whether you operate a grocery chain, a stadium, an airline, or a retail network — Onigiri Sen delivers consistent quality at volume, every time.",
               "食料品チェーン、スタジアム、航空会社、小売ネットワークなど、おにぎり千は常に大量生産でも一貫した品質をお届けします。")}
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#inquiry" style={darkBtn}>{t("Inquire About Partnership →","パートナーシップについてお問い合わせ →")}</a>
          </div>
        </section>

        <section style={{ background:"#fdf5e0", padding:"44px 80px" }}>
          <div style={{ textAlign:"center", fontWeight:700, letterSpacing:2, color:"#b8a878", fontSize:13, marginBottom:28 }}>{t("TRUSTED BY","取引先")}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14, maxWidth:860, margin:"0 auto" }}>
            {["T&T Supermarket","PCC Community Markets","T-Mobile Park","San Francisco Giants"].map((p) => (
              <div key={p} style={{ background:"#fff", border:"1.5px solid #e8ddc8", borderRadius:999, padding:"13px 16px", textAlign:"center", fontWeight:700, fontSize:13, color:"#5a4a28" }}>{p}</div>
            ))}
          </div>
        </section>

        <section style={{ padding:"80px 80px" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#ede0d0", borderRadius:999, padding:"8px 22px", marginBottom:24 }}>
              <span style={{ fontWeight:700, color:"#5a3a18", fontSize:14 }}>{t("Why Partner With Us","なぜパートナーになるのか")}</span>
            </div>
            <h2 style={{ fontWeight:900, fontSize:36, color:"#1a1a1a", margin:"0 0 14px" }}>{t("Built for Scale. Built for You.","スケールのために。あなたのために。")}</h2>
            <p style={{ color:"#999", maxWidth:480, margin:"0 auto", fontSize:15, lineHeight:1.7 }}>
              {t("Every advantage — from production technology to ingredient sourcing — engineered for reliable, high-volume partnership.",
                 "製造技術から食材調達まで、すべての強みが信頼性の高い大量供給パートナーシップのために設計されています。")}
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:18 }}>
            {[
              { icon:"🏟", title:t("Stadium-Grade Scalability","スタジアム規模のスケーラビリティ"), body:t("Whether for a single order or large-scale supply, every onigiri meets the same world-class standard. We supply major stadiums, supermarket chains, and airports.","単品から大量供給まで、すべてのおにぎりが同じ世界水準を満たします。主要なスタジアム、スーパーマーケットチェーン、空港に供給しています。") },
              { icon:"🤖", title:t("World-Class Japanese Technology","世界クラスの日本技術"), body:t("FUJISEIKI machines and AIHO IH rice systems combine to reproduce the delicate texture of hand-pressed onigiri at any scale.","不二精機の成型機とAIHOのIH炊飯システムを組み合わせ、どんな規模でも手握りの繊細な食感を再現します。") },
              { icon:"🛡", title:t("Rigorous Hygiene & Safety Protocols","厳格な衛生・安全プロトコル"), body:t("Our automated processes minimize human contact, ensuring food safety standards that far exceed traditional manufacturing methods throughout all operations.","自動化されたプロセスにより人的接触を最小化し、すべての工程で従来の製造方法をはるかに超える食品安全基準を確保します。") },
              { icon:"🌿", title:t("Flexible Customization","柔軟なカスタマイズ"), body:t("Vegan, Gluten-Free, Organic, and custom flavors available. Strategic pricing tiers tailored to your retail environment and customer base.","ヴィーガン、グルテンフリー、オーガニック、カスタムフレーバーに対応。あなたの小売環境と顧客層に合わせた戦略的な価格帯を提供します。") },
            ].map((b) => (
              <div key={b.title} style={{ border:"1.5px solid #e8e0d4", borderRadius:20, padding:"28px 22px", display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ fontSize:36 }}>{b.icon}</div>
                <div style={{ fontWeight:800, fontSize:15, color:"#1a1a1a" }}>{b.title}</div>
                <p style={{ color:"#888", fontSize:13, lineHeight:1.75, margin:0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="inquiry" style={{ background:"#8a7060", padding:"80px 80px" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:12, fontWeight:700, letterSpacing:3, color:"rgba(255,255,255,0.65)", marginBottom:16 }}>
              {t("GET IN TOUCH","お問い合わせ")}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#fff", borderRadius:999, padding:"11px 28px", fontWeight:700, color:"#2a2a2a", fontSize:15 }}>
              {t("Ready to bring Onigiri Sen to your shelves?","おにぎり千をあなたの棚へ？")}
            </div>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:10 }}>
              {t("Fill out the form below and we'll be in touch within 2 business days.","以下のフォームにご記入いただければ、2営業日以内にご連絡いたします。")}
            </p>
          </div>

          <div style={{ background:"#fff", borderRadius:24, padding:"48px", maxWidth:560, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:32 }}>
              {[1,2,3].map((s) => (
                <div key={s} style={{ height:8, width:s===step?36:12, borderRadius:999, background:s<=step?"#e8847a":"#e8e0d8", transition:"all 0.3s" }} />
              ))}
              <span style={{ fontSize:13, color:"#bbb", marginLeft:8 }}>{t(`Step ${step} of 3`,`ステップ ${step} / 3`)}</span>
            </div>

            {step === 1 && (
              <>
                <h3 style={{ fontWeight:900, fontSize:22, color:"#1a1a1a", margin:"0 0 6px" }}>{t("About Your Business","お客様のビジネスについて")}</h3>
                <p style={{ color:"#bbb", fontSize:14, margin:"0 0 28px" }}>{t("Tell us a little about your company and what you're looking for.","会社とお探しのものについて少し教えてください。")}</p>
                <div style={{ marginBottom:20 }}>
                  <label style={labelStyle}>{t("Company / Organization Name *","会社名・団体名 *")}</label>
                  <input type="text" placeholder={t("e.g. Pacific Grocery Co.","例：パシフィック食料品株式会社")} style={inputStyle} />
                </div>
                <div style={{ marginBottom:28 }}>
                  <label style={labelStyle}>{t("Type of Inquiry *","お問い合わせの種類 *")}</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {[
                      { value:"wholesale", title:t("Wholesale Partnership","卸売パートナーシップ"), desc:t("Ongoing supply for retail, grocery, or institutional use","小売・食料品・法人向けの継続的な供給") },
                      { value:"catering",  title:t("Catering & Events","ケータリング＆イベント"),     desc:t("One-time or recurring event catering","単発または定期的なイベントケータリング") },
                    ].map((opt) => (
                      <label key={opt.value} style={{ border:`2px solid ${inquiryType===opt.value?"#e8847a":"#e8e0d0"}`, borderRadius:14, padding:16, cursor:"pointer", background:inquiryType===opt.value?"#fff8f6":"#fff", display:"flex", gap:12, alignItems:"flex-start" }}>
                        <input type="radio" name="inquiryType" value={opt.value} checked={inquiryType===opt.value} onChange={() => setInquiryType(opt.value)} style={{ marginTop:3, accentColor:"#e8847a" }} />
                        <div>
                          <div style={{ fontWeight:800, color:"#1a1a1a", fontSize:15 }}>{opt.title}</div>
                          <div style={{ fontSize:13, color:"#888", marginTop:4 }}>{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <button onClick={() => inquiryType && setStep(2)} style={{ width:"100%", background:inquiryType?"#e8847a":"#f0c8c0", color:"#fff", border:"none", borderRadius:999, padding:"13px", fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:15, cursor:inquiryType?"pointer":"not-allowed" }}>
                  {t("NEXT →","次へ →")}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ fontWeight:900, fontSize:22, color:"#1a1a1a", margin:"0 0 6px" }}>{t("Contact Details","連絡先")}</h3>
                <p style={{ color:"#bbb", fontSize:14, margin:"0 0 28px" }}>{t("How can we reach you?","どのようにご連絡すればよいですか？")}</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                  <div><label style={labelStyle}>{t("Your Name *","お名前 *")}</label><input type="text" placeholder="Jane Smith" style={inputStyle} /></div>
                  <div><label style={labelStyle}>{t("Job Title","役職")}</label><input type="text" placeholder={t("Buyer / Manager","バイヤー / マネージャー")} style={inputStyle} /></div>
                </div>
                <div style={{ marginBottom:14 }}><label style={labelStyle}>{t("Email *","メールアドレス *")}</label><input type="email" placeholder="jane@company.com" style={inputStyle} /></div>
                <div style={{ marginBottom:28 }}><label style={labelStyle}>{t("Phone","電話番号")}</label><input type="tel" placeholder="(206) 555-0100" style={inputStyle} /></div>
                <div style={{ display:"flex", gap:12 }}>
                  <button onClick={() => setStep(1)} style={backBtn}>{t("← Back","← 戻る")}</button>
                  <button onClick={() => setStep(3)} style={{ ...nextBtn, flex:2 }}>{t("NEXT →","次へ →")}</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 style={{ fontWeight:900, fontSize:22, color:"#1a1a1a", margin:"0 0 6px" }}>{t("Additional Details","追加情報")}</h3>
                <p style={{ color:"#bbb", fontSize:14, margin:"0 0 28px" }}>{t("Tell us about your volume needs and timeline.","数量のニーズとタイムラインについて教えてください。")}</p>
                <div style={{ marginBottom:14 }}><label style={labelStyle}>{t("Estimated Weekly Volume","週間推定数量")}</label><input type="text" placeholder={t("e.g. 500 units/week","例：500個/週")} style={inputStyle} /></div>
                <div style={{ marginBottom:28 }}><label style={labelStyle}>{t("Message / Questions","メッセージ・ご質問")}</label><textarea rows={4} placeholder={t("Anything else you'd like us to know...","その他お知らせしたいことがあればご記入ください...")} style={{ ...inputStyle, resize:"vertical" } as React.CSSProperties} /></div>
                <div style={{ display:"flex", gap:12 }}>
                  <button onClick={() => setStep(2)} style={backBtn}>{t("← Back","← 戻る")}</button>
                  <Link href="/thank-you" style={{ ...nextBtn, flex:2, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>{t("Submit →","送信 →")}</Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}