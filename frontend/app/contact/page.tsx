"use client";

import { useState, useEffect } from "react";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    heardFrom: "",
    message: "",
  });

  const subjects = [
    t("General Question", "一般的なご質問"),
    t("Order Inquiry", "注文に関するお問い合わせ"),
    t("Wholesale Partnership", "卸売パートナーシップ"),
    t("Press & Media", "プレス・メディア"),
    t("Other", "その他"),
  ];

  async function handleSubmit() {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = "/thank-you";
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main style={{ fontFamily: "DM Sans, sans-serif", background: "#fff" }}>
        <section
          style={{
            padding: isMobile ? "64px 24px 36px" : "92px 80px 48px",
            textAlign: "center",
            background: "#fff9f5",
          }}
        >
          <h1
            style={{
              fontWeight: 800,
              fontSize: isMobile ? 28 : 38,
              color: "#6f471c",
              margin: "0 0 16px",
            }}
          >
            {t("Get in Touch", "お問い合わせ")}
          </h1>

          <p
            style={{
              color: "#6f471c",
              fontSize: isMobile ? 14 : 16,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            {t(
              "Have a question, a business inquiry, or just want to say hello? We'd love to connect with you.",
              "ご質問やビジネスに関するご相談など、どうぞお気軽にお問い合わせください。"
            )}
          </p>
        </section>

        <section
          style={{
            background: "#ffefc8",
            padding: isMobile ? "36px 20px 60px" : "64px 80px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.8fr",
            gap: isMobile ? 36 : 56,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontWeight: 900,
                fontSize: isMobile ? 22 : 28,
                color: "#6f471c",
                margin: "0 0 24px",
              }}
            >
              {t("Contact Info", "お問い合わせ情報")}
            </h2>

            {[
              {
                icon: "/images/email.png",
                label: t("E-mail", "メールアドレス"),
                value: "contact@onigirisen.jp",
                href: "mailto:contact@onigirisen.jp",
              },
              {
                icon: "/images/phone.png",
                label: t("Phone", "電話番号"),
                value: "(206) 445-8086",
                href: "tel:2064458086",
              },
              {
                icon: "/images/insta.png",
                label: t("Instagram", "インスタグラム"),
                value: "@onigirisen.jp",
                href: "https://instagram.com/onigirisen.jp",
              },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    border: "2px solid #e8ddd4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "#fff",
                  }}
                >
                  <img
                    src={row.icon}
                    alt={row.label}
                    style={{
                      width: 28,
                      height: 28,
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#ed7e80",
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {row.label}
                  </div>

                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      color: "#6f471c",
                      fontWeight: 600,
                      fontSize: 15,
                      textDecoration: "none",
                    }}
                  >
                    {row.value}
                  </a>
                </div>
              </div>
            ))}

            <div
              style={{
                background: "#6f471c",
                borderRadius: 18,
                padding: "22px 24px",
                marginTop: 32,
                color: "#fff",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  margin: "0 0 10px",
                  lineHeight: 1.5,
                }}
              >
                {t(
                  "Looking to carry Onigiri Sen in your store or venue?",
                  "Onigiri Sen のお取り扱いを希望ですか？"
                )}
              </p>

              <Link
                href="/wholesale"
                style={{
                  color: "#e8a87a",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                → {t("Inquire About Wholesale Partnership", "パートナーシップについて")}
              </Link>
            </div>
          </div>

          <div
            style={{
              background: "#fff9f5",
              borderRadius: 24,
              padding: isMobile ? "28px 20px" : "40px",
              boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontWeight: 800,
                fontSize: isMobile ? 18 : 22,
                color: "#6f471c",
                margin: "0 0 24px",
              }}
            >
              {t("Send Us a Message", "メッセージを送る")}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                  {t("Name *", "お名前 *")}
                </div>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  style={input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                  {t("Email *", "メールアドレス *")}
                </div>
                <input
                  type="email"
                  placeholder="jane@email.com"
                  style={input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                  {t("Phone Number", "電話番号")}
                </div>
                <input
                  type="tel"
                  placeholder="(206) 555-0100"
                  style={input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                  {t("Subject *", "件名 *")}
                </div>

                <div style={{ position: "relative" }}>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ ...input, appearance: "none", paddingRight: 36 }}
                  >
                    <option value="">{t("Select a subject", "件名を選択")}</option>
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <span
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#bbb",
                      fontSize: 14,
                    }}
                  >
                    ▾
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                {t("How did you hear about us?", "どこでお知りになりましたか？")}
              </div>

              <div style={{ position: "relative" }}>
                <select
                  value={formData.heardFrom}
                  onChange={(e) => setFormData({ ...formData, heardFrom: e.target.value })}
                  style={{ ...input, appearance: "none", paddingRight: 36 }}
                >
                  <option value="">{t("Select an option", "選択してください")}</option>
                  <option>{t("PCC Community Markets", "PCCコミュニティマーケット")}</option>
                  <option>{t("T&T Supermarket", "T&Tスーパーマーケット")}</option>
                  <option>{t("T-Mobile Park", "Tモバイルパーク")}</option>
                  <option>{t("Instagram", "Instagram")}</option>
                  <option>{t("KING 5 News", "KING 5ニュース")}</option>
                  <option>{t("Jungle City", "Jungle City")}</option>
                  <option>{t("Friend or Family", "友人・家族")}</option>
                  <option>{t("Other", "その他")}</option>
                </select>

                <span
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#bbb",
                    fontSize: 14,
                  }}
                >
                  ▾
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#6f471c", marginBottom: 6 }}>
                {t("Message *", "メッセージ *")}
              </div>

              <textarea
                placeholder={t("How can we help?", "どのようにお手伝いできますか？")}
                rows={5}
                style={{ ...input, resize: "vertical" }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                display: "block",
                width: "100%",
                background: "#e8847a",
                color: "#fff",
                padding: "15px",
                borderRadius: 999,
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                textAlign: "center",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: 14,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? t("Sending...", "送信中...") : t("Send Message", "メッセージを送る")}
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", margin: 0 }}>
              {t("By submitting you agree to our", "送信することで、")}{" "}
              <a
                href="/onigiri-tc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e07070", textDecoration: "none" }}
              >
                {t("Terms & Conditions", "利用規約")}
              </a>{" "}
              {t("and", "と")}{" "}
              <a
                href="/onigiri-pp.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#e07070", textDecoration: "none" }}
              >
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