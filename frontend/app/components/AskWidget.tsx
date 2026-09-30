"use client";
import { useState, useRef, useEffect } from "react";
import { useLang } from "../context/LangContext";

// ── Update this URL after deploying the Cloudflare Worker ──
const WORKER_URL = "https://onigiri-ask.belohith.workers.dev";

type Message = { role: "user" | "assistant"; content: string };

export default function AskWidget() {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  async function submit(text?: string) {
    const query = (text ?? input).trim();
    if (!query || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInput("");
    setExpanded(true);
    setLoading(true);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, {
        role: "assistant",
        content: data.answer || (lang === "ja"
          ? "申し訳ありません。もう一度お試しください。"
          : "Sorry, something went wrong. Please try again."),
      }]);
    } catch {
      setMessages([...newMessages, {
        role: "assistant",
        content: lang === "ja"
          ? "申し訳ありません。onigirisen.comをご覧ください。"
          : "Something went wrong. Please visit onigirisen.com for help.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = lang === "ja"
    ? ["どこで買えますか？", "グルテンフリーの商品は？", "フレーバーを教えてください"]
    : ["Where can I buy Onigiri Sen?", "Which flavors are gluten-free?", "Tell me about the founder"];

  return (
    <div style={{ maxWidth: isMobile ? "100%" : 680, margin: "0 auto", padding: isMobile ? "0 20px" : "0", fontFamily: "DM Sans, sans-serif" }}>

      {/* Search bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#fff", border: "2px solid #e8d8c8",
        borderRadius: expanded ? "20px 20px 0 0" : 999,
        padding: "10px 14px 10px 20px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        transition: "border-radius 0.2s",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C08060" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder={t("Ask anything about Onigiri Sen...", "Onigiri Senについて何でも聞いてください...")}
          style={{ flex: 1, border: "none", outline: "none", fontSize: isMobile ? 14 : 15, color: "#3a2a1a", background: "transparent", fontFamily: "DM Sans, sans-serif" }}
        />
        <button
          onClick={() => submit()}
          disabled={!input.trim() || loading}
          style={{
            background: input.trim() && !loading ? "#ed7e80" : "#e8d8c8",
            border: "none", borderRadius: 999, padding: "7px 16px",
            fontSize: 13, fontWeight: 700,
            color: input.trim() && !loading ? "#fff" : "#bbb",
            cursor: input.trim() && !loading ? "pointer" : "default",
            transition: "all 0.2s", flexShrink: 0, fontFamily: "DM Sans, sans-serif",
          }}
        >
          {t("Ask", "質問")}
        </button>
      </div>

      {/* Suggestion chips */}
      {messages.length === 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginTop: 10, justifyContent: "center" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => submit(s)} style={{
              background: "#fff", border: "1.5px solid #e8d8c8", borderRadius: 999,
              padding: "6px 14px", fontSize: 12, color: "#8a6a4a", cursor: "pointer",
              fontFamily: "DM Sans, sans-serif", transition: "border-color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#ed7e80")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8d8c8")}
            >{s}</button>
          ))}
        </div>
      )}

      {/* Chat window */}
      {expanded && (
        <div style={{
          background: "#fff", border: "2px solid #e8d8c8", borderTop: "none",
          borderRadius: "0 0 20px 20px", overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          <div ref={chatRef} style={{
            maxHeight: 420, overflowY: "auto" as const,
            padding: "16px 18px", display: "flex",
            flexDirection: "column" as const, gap: 12,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                {m.role === "assistant" && <div style={{ fontSize: 18, marginRight: 8, flexShrink: 0, marginTop: 2 }}>🍙</div>}
                <div style={{
                  maxWidth: "78%",
                  background: m.role === "user" ? "#ed7e80" : "#fff9f5",
                  color: m.role === "user" ? "#fff" : "#3a2a1a",
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "10px 14px", fontSize: 14, lineHeight: 1.65,
                  border: m.role === "assistant" ? "1px solid #f0e4d4" : "none",
                  fontFamily: "DM Sans, sans-serif", whiteSpace: "pre-wrap" as const,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 18 }}>🍙</div>
                <div style={{ background: "#fff9f5", border: "1px solid #f0e4d4", borderRadius: "18px 18px 18px 4px", padding: "10px 14px", display: "flex", gap: 5 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#ed7e80", animation: "bounce 1.2s infinite", animationDelay: `${i*0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ borderTop: "1px solid #f0e4d4", padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#c0a080" }}>{t("Powered by AI · Answers may not cover every case", "AIによる回答 · 誤りがある場合があります")}</span>
            <button onClick={() => { setMessages([]); setExpanded(false); setInput(""); }} style={{ fontSize: 11, color: "#c0a080", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
              {t("Clear", "クリア")}
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}