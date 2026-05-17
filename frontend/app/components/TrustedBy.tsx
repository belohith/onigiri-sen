"use client";
import { useLang } from "../context/LangContext";

const partners = [
  { src:"/images/logo-tt.png",      alt:"T&T Supermarket" },
  { src:"/images/logo-pcc.png",     alt:"PCC Community Markets" },
  { src:"/images/logo-tmobile.png", alt:"T-Mobile Park" },
  { src:"/images/logo-tc.jpeg",     alt:"Town & County Market" },
  { src:"/images/logo-km.webp",     alt:"Kitchen Market" },
  { src:"/images/logo-ack.png",     alt:"Artisan Community Kitchen" },
];

export default function TrustedBy() {
  const { t } = useLang();

  return (
    <section style={{ background:"#ffefc8", padding:"44px 0 0" }}>
      <div style={{ textAlign:"center", fontWeight:700, letterSpacing:2, color:"#6f471c", fontSize:25, marginBottom:28 }}>
        {t("TRUSTED BY","取引先")}
      </div>

      {/* Logo grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:14, maxWidth:860, margin:"0 auto 48px", padding:"0 80px" }}>
        {partners.map((p) => (
          <div key={p.alt} style={{ background:"#fff", border:"1.5px solid #e8ddc8", borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"center", height:100 }}>
            <img src={p.src} alt={p.alt} style={{ maxHeight:80, maxWidth:"100%", objectFit:"contain" as const }} />
          </div>
        ))}
      </div>

      {/* Continuous scroll strip */}
      {/* Images needed: /images/partners/roll-1.png through roll-8.png */}
      <div style={{ overflow:"hidden", width:"100%" }}>
        <div
          style={{
            display:"flex",
            gap:0,
            animation:"scroll-left 20s linear infinite",
            width:"max-content",
          }}
        >
          {[...Array(2)].map((_, pass) =>
            [1,2,3,4,5,6,7,8].map((i) => (
              <div key={`${pass}-${i}`} style={{ width:280, height:180, flexShrink:0, overflow:"hidden" }}>
                <img
                  src={`/images/partners/roll-${i}.png`}
                  alt=""
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}