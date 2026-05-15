"use client";
import { useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { useLang } from "../context/LangContext";

const input: React.CSSProperties = { width:"100%", border:"1.5px solid #ede5da", borderRadius:10, padding:"12px 14px", fontSize:14, fontFamily:"Nunito, sans-serif", color:"#2a2a2a", outline:"none", boxSizing:"border-box", background:"#fff" };

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const { t } = useLang();

  const subjects = [
    t("General Question","一般的なご質問"),
    t("Order Inquiry","注文に関するお問い合わせ"),
    t("Wholesale Partnership","卸売パートナーシップ"),
    t("Press & Media","プレス・メディア"),
    t("Other","その他"),
  ];

  return (
    <>
      <Header />
      <main style={{ fontFamily:"Nunito, sans-serif", background:"#fff" }}>

        <section style={{ padding:"92px 80px 48px", textAlign:"center", background:"#fdf9f4" }}>
          <h1 style={{ fontWeight:800, fontSize:38, color:"#5a3a28", margin:"0 0 16px" }}>{t("Get in Touch","お問い合わせ")}</h1>
          <p style={{ color:"#999", fontSize:16, maxWidth:500, margin:"0 auto" }}>
            {t("Have a question, a business inquiry, or just want to say hello? We'd love to connect with you.",
               "ご質問、ビジネスのお問い合わせ、またはただご挨拶したい場合でも、ぜひご連絡ください。")}
          </p>
        </section>

        <section style={{ background:"#fdf3c8", padding:"64px 80px", display:"grid", gridTemplateColumns:"1fr 1.8fr", gap:56, alignItems:"start" }}>
          <div>
            <h2 style={{ fontWeight:900, fontSize:28, color:"#2a2a2a", margin:"0 0 12px" }}>{t("Contact Info","連絡先情報")}</h2>
            <p style={{ color:"#888", fontSize:14, lineHeight:1.8, margin:"0 0 36px" }}>
              {t("We're a small team — we read every message and aim to respond within 2 business days.",
                 "私たちは小さなチームです——すべてのメッセージを読み、2営業日以内に返信することを目指しています。")}
            </p>

            {[
              { icon:"✉", label:t("E-mail","メール"), value:"order@onigirisen.com", href:"mailto:order@onigirisen.com" },
              { icon:"📞", label:t("Phone","電話"), value:"(206) 445-8086", href:"tel:2064458086" },
              { icon:"📷", label:"Instagram", value:"@onigirisen.jp", href:"https://instagram.com/onigirisen.jp" },
            ].map((row) => (
              <div key={row.label} style={{ display:"flex", alignItems:"center", gap:18, marginBottom:28 }}>
                <div style={{ width:50, height:50, borderRadius:14, border:"2px solid #2a2a2a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{row.icon}</div>
                <div>
                  <div style={{ fontWeight:700, color:"#e07070", fontSize:14, marginBottom:2 }}>{row.label}</div>
                  <a href={row.href} style={{ color:"#5a3828", fontWeight:600, fontSize:15, textDecoration:"none" }}>{row.value}</a>
                </div>
              </div>
            ))}

            <div style={{ background:"#3a2a1e", borderRadius:18, padding:"22px 24px", marginTop:40, color:"#fff" }}>
              <p style={{ fontWeight:700, fontSize:15, margin:"0 0 10px", lineHeight:1.5 }}>
                {t("Looking to carry Onigiri Sen in your store or venue?","おにぎり千をお店やベニューで取り扱いたいですか？")}
              </p>
              <Link href="/wholesale" style={{ color:"#e8a87a", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                → {t("Inquire About Wholesale Partnership","卸売パートナーシップについてお問い合わせ")}
              </Link>
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:24, padding:"40px", boxShadow:"0 4px 28px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontWeight:800, fontSize:22, color:"#2a2a2a", margin:"0 0 28px" }}>{t("Send Us a Message","メッセージを送る")}</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:"#2a2a2a", marginBottom:6 }}>{t("Name *","お名前 *")}</div>
                <input type="text" placeholder="Jane Smith" style={input} />
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:"#2a2a2a", marginBottom:6 }}>{t("Email *","メールアドレス *")}</div>
                <input type="email" placeholder="Jane@email.com" style={input} />
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#2a2a2a", marginBottom:6 }}>{t("Subject *","件名 *")}</div>
              <div style={{ position:"relative" }}>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ ...input, appearance:"none", paddingRight:36 } as React.CSSProperties}>
                  <option value=""></option>
                  {subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
                <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#bbb", fontSize:14 }}>▾</span>
              </div>
            </div>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#2a2a2a", marginBottom:6 }}>{t("Message *","メッセージ *")}</div>
              <textarea placeholder={t("How can we help?","どのようにお手伝いできますか？")} rows={5} style={{ ...input, resize:"vertical" } as React.CSSProperties} />
            </div>
            <Link href="/thank-you" style={{ display:"block", background:"#e8847a", color:"#fff", padding:"15px", borderRadius:999, fontFamily:"Nunito, sans-serif", fontWeight:700, fontSize:16, textAlign:"center", textDecoration:"none", marginBottom:14 }}>
              {t("Send Message","メッセージを送る")}
            </Link>
            <p style={{ textAlign:"center", fontSize:12, color:"#bbb", margin:0 }}>
              {t("By submitting you agree to our","送信することで、")}
              {" "}<a href="#" style={{ color:"#e07070", textDecoration:"none" }}>{t("Privacy Policy.","プライバシーポリシー")}</a>
              {t("","に同意したことになります。")}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}