"use client";
import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";

type Store = {
  name: string; address: string; hours: string; phone: string; mapsUrl: string;
};

const seattleStores: Store[] = [
  { name:"PCC – Ballard",                address:"1451 NW 46th St, Seattle, WA 98107",              hours:"Daily 6am–11pm",                     phone:"206-538-0130", mapsUrl:"https://www.google.com/maps/search/?api=1&query=1451+NW+46th+St%2C+Seattle%2C+WA+98107" },
  { name:"PCC – Bellevue",               address:"11615 NE 4th St, Bellevue, WA 98004",             hours:"Daily 6am–11pm",                     phone:"425-615-0295", mapsUrl:"https://www.google.com/maps/search/?api=1&query=11615+NE+4th+St%2C+Bellevue%2C+WA+98004" },
  { name:"PCC – Bothell",                address:"22621 Bothell Everett Hwy, Bothell, WA 98021",    hours:"Daily 6am–11pm",                     phone:"425-492-0122", mapsUrl:"https://www.google.com/maps/search/?api=1&query=22621+Bothell+Everett+Hwy%2C+Bothell%2C+WA+98021" },
  { name:"PCC – Burien",                 address:"15840 1st Ave S #102, Burien, WA 98148",          hours:"Daily 6am–11pm",                     phone:"206-708-6908", mapsUrl:"https://www.google.com/maps/search/?api=1&query=15840+1st+Ave+S%2C+Burien%2C+WA+98148" },
  { name:"PCC – Central District",       address:"2230 E Union St, Seattle, WA 98122",              hours:"Daily 6am–10pm",                     phone:"206-605-6053", mapsUrl:"https://www.google.com/maps/search/?api=1&query=2230+E+Union+St%2C+Seattle%2C+WA+98122" },
  { name:"PCC – Columbia City",          address:"3610 S Edmunds St, Seattle, WA 98118",            hours:"Daily 6am–11pm",                     phone:"206-466-6182", mapsUrl:"https://www.google.com/maps/search/?api=1&query=3610+S+Edmunds+St%2C+Seattle%2C+WA+98118" },
  { name:"PCC – Downtown",               address:"1320 4th Ave, Seattle, WA 98101",                 hours:"Mon–Fri 7am–7pm",                    phone:"206-408-4260", mapsUrl:"https://www.google.com/maps/search/?api=1&query=1320+4th+Ave%2C+Seattle%2C+WA+98101" },
  { name:"PCC – Edmonds",                address:"9803 Edmonds Way, Edmonds, WA 98020",             hours:"Daily 6am–11pm",                     phone:"425-275-9036", mapsUrl:"https://www.google.com/maps/search/?api=1&query=9803+Edmonds+Way%2C+Edmonds%2C+WA+98020" },
  { name:"PCC – Fremont",                address:"600 N 34th St, Seattle, WA 98103",                hours:"Daily 6am–11pm",                     phone:"206-632-6811", mapsUrl:"https://www.google.com/maps/search/?api=1&query=600+N+34th+St%2C+Seattle%2C+WA+98103" },
  { name:"PCC – Green Lake Aurora",      address:"7504 Aurora Ave N, Seattle, WA 98103",            hours:"Daily 6am–11pm",                     phone:"206-525-3586", mapsUrl:"https://www.google.com/maps/search/?api=1&query=7504+Aurora+Ave+N%2C+Seattle%2C+WA+98103" },
  { name:"PCC – Green Lake Village",     address:"450 NE 71st St, Seattle, WA 98115",               hours:"Daily 6am–11pm",                     phone:"206-729-5075", mapsUrl:"https://www.google.com/maps/search/?api=1&query=450+NE+71st+St%2C+Seattle%2C+WA+98115" },
  { name:"PCC – Issaquah",               address:"1810 12th Ave NW, Issaquah, WA 98027",            hours:"Daily 6am–11pm",                     phone:"425-369-1222", mapsUrl:"https://www.google.com/maps/search/?api=1&query=1810+12th+Ave+NW%2C+Issaquah%2C+WA+98027" },
  { name:"PCC – Kirkland",               address:"430 Kirkland Way, Kirkland, WA 98033",            hours:"Daily 6am–11pm",                     phone:"425-828-4622", mapsUrl:"https://www.google.com/maps/search/?api=1&query=430+Kirkland+Way%2C+Kirkland%2C+WA+98033" },
  { name:"PCC – Redmond",                address:"11435 Avondale Rd NE, Redmond, WA 98052",         hours:"Daily 6am–11pm",                     phone:"425-285-1400", mapsUrl:"https://www.google.com/maps/search/?api=1&query=11435+Avondale+Rd+NE%2C+Redmond%2C+WA+98052" },
  { name:"PCC – View Ridge",             address:"6514 40th Ave NE, Seattle, WA 98115",             hours:"Daily 6am–11pm",                     phone:"206-526-7661", mapsUrl:"https://www.google.com/maps/search/?api=1&query=6514+40th+Ave+NE%2C+Seattle%2C+WA+98115" },
  { name:"PCC – West Seattle",           address:"2749 California Ave SW, Seattle, WA 98116",       hours:"Daily 6am–11pm",                     phone:"206-485-7185", mapsUrl:"https://www.google.com/maps/search/?api=1&query=2749+California+Ave+SW%2C+Seattle%2C+WA+98116" },
  { name:"Town & Country – Bainbridge",  address:"343 Winslow Way E, Bainbridge Island, WA 98110",  hours:"Daily 7am–10pm",                     phone:"206-842-3848", mapsUrl:"https://www.google.com/maps/search/?api=1&query=343+Winslow+Way+E%2C+Bainbridge+Island%2C+WA+98110" },
  { name:"Town & Country – Ballard",     address:"1400 NW 56th St, Seattle, WA 98107",              hours:"Daily 7am–10pm",                     phone:"206-783-7922", mapsUrl:"https://www.google.com/maps/search/?api=1&query=1400+NW+56th+St%2C+Seattle%2C+WA+98107" },
  { name:"Town & Country – Lakemont",    address:"4989 Lakemont Blvd SE, Bellevue, WA 98006",       hours:"Daily 7am–10pm",                     phone:"425-653-2261", mapsUrl:"https://www.google.com/maps/search/?api=1&query=4989+Lakemont+Blvd+SE%2C+Bellevue%2C+WA+98006" },
  { name:"Town & Country – Mill Creek",  address:"15605 Main St, Mill Creek, WA 98012",             hours:"Daily 7am–10pm",                     phone:"425-357-3240", mapsUrl:"https://www.google.com/maps/search/?api=1&query=15605+Main+St%2C+Mill+Creek%2C+WA+98012" },
  { name:"Town & Country – Poulsbo",     address:"20148 10th Ave NE, Poulsbo, WA 98370",            hours:"Daily 7am–10pm",                     phone:"360-779-1881", mapsUrl:"https://www.google.com/maps/search/?api=1&query=20148+10th+Ave+NE%2C+Poulsbo%2C+WA+98370" },
  { name:"Town & Country – Shoreline",   address:"15505 Westminster Way N, Shoreline, WA 98133",    hours:"Daily 7am–10pm",                     phone:"206-363-9226", mapsUrl:"https://www.google.com/maps/search/?api=1&query=15505+Westminster+Way+N%2C+Shoreline%2C+WA+98133" },
  { name:"T&T Supermarket – Bellevue",   address:"12620 SE 41st Pl, Bellevue, WA 98006",            hours:"Mon–Fri 9am–11pm, Sat–Sun 8am–11pm", phone:"425-818-3260", mapsUrl:"https://www.google.com/maps/search/?api=1&query=12620+SE+41st+Pl%2C+Bellevue%2C+WA+98006" },
  { name:"T&T Supermarket – Lynnwood",   address:"19630 Hwy 99, Lynnwood, WA 98036",                hours:"Daily 9am–10pm",                     phone:"425-648-2648", mapsUrl:"https://www.google.com/maps/search/?api=1&query=19630+Hwy+99%2C+Lynnwood%2C+WA+98036" },
];

const WA_MAP_EMBED = "https://www.google.com/maps/d/embed?mid=1fRSBjWkwxia4rH771jkXLAy0JFWCCps&ehbc=2E312F&noprof=1";

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
  const { t } = useLang();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"seattle"|"california">("seattle");
  const [search, setSearch] = useState("");

  const filtered = seattleStores.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{
      padding: isMobile ? "48px 16px 80px" : "64px 80px 100px",
      background:"#fdf8f4",
      position:"relative" as const,
    }}>

      {/* Title */}
      <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
        <div style={{
          border:"2px solid #6f471c", borderRadius:999,
          padding: isMobile ? "8px 24px" : "10px 36px",
          fontWeight:700, fontSize: isMobile ? 20 : 30, color:"#6f471c",
          textAlign:"center" as const,
        }}>
          {t("Find Us Near You","お取り扱い店舗を探す")}
        </div>
      </div>

      <div style={{ maxWidth: isMobile ? "100%" : 820, margin:"0 auto" }}>

        {/* Tabs */}
        <div style={{ display:"flex", borderRadius:"20px 20px 0 0", overflow:"hidden", border:"2px solid #ed7e80", borderBottom:"none" }}>
          {(["seattle","california"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearch(""); }}
              style={{
                flex:1, padding: isMobile ? "11px" : "13px",
                textAlign:"center" as const,
                background: activeTab===tab ? "#ed7e80" : "#f4adb9",
                color:"#fff", fontWeight:700, fontSize: isMobile ? 13 : 14,
                border:"none", cursor:"pointer",
                fontFamily:"DM Sans, sans-serif", transition:"background 0.2s",
              }}
            >
              {tab === "seattle" ? "Washington" : "California"}
            </button>
          ))}
        </div>

        {/* Map embed — shorter on mobile */}
        {activeTab === "seattle" && (
          <div style={{ border:"2px solid #ed7e80", borderTop:"none", borderBottom:"none", overflow:"hidden" }}>
            <iframe
              src={WA_MAP_EMBED}
              width="100%"
              height={isMobile ? 220 : 340}
              style={{ display:"block", border:"none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {/* Search */}
        {activeTab === "seattle" && (
          <div style={{ border:"2px solid #ed7e80", borderTop:"1px solid #f5d0d0", borderBottom:"none", background:"#fff", padding:"10px 14px" }}>
            <div style={{ position:"relative" as const }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Search by store or city...","店舗名または市で検索...")}
                style={{
                  width:"100%", boxSizing:"border-box" as const,
                  border:"1.5px solid #ede5da", borderRadius:10,
                  padding:"9px 14px 9px 34px", fontSize:13,
                  fontFamily:"DM Sans, sans-serif", outline:"none",
                  color:"#2a2a2a", background:"#fff",
                }}
              />
            </div>
          </div>
        )}

        {/* California graphic / Store list */}
        {activeTab === "california" ? (
          <div style={{ border:"2px solid #ed7e80", borderTop:"none", borderRadius:"0 0 20px 20px", overflow:"hidden" }}>
            <img src="/images/california-coming-soon.png" alt="Coming to San Jose, California this June" style={{ width:"100%", display:"block" }} />
          </div>
        ) : (
          <div style={{
            background:"#fff", border:"2px solid #ed7e80",
            borderTop:"1px solid #f5d0d0", borderRadius:"0 0 20px 20px",
            maxHeight: isMobile ? 280 : 360, overflowY:"auto" as const,
          }}>
            {filtered.length === 0 ? (
              <div style={{ padding:"24px 22px", color:"#bbb", fontSize:13, textAlign:"center" as const }}>
                {t("No stores found.","店舗が見つかりません。")}
              </div>
            ) : filtered.map((store, i) => (
              store.mapsUrl ? (
                <div key={store.name} style={{ borderBottom: i < filtered.length-1 ? "1px solid #f5ede8" : "none", background:"#fff" }}>
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"flex-start", gap:10, padding: isMobile ? "11px 14px 4px" : "13px 20px 6px", textDecoration:"none", cursor:"pointer" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ed7e80" style={{ flexShrink:0, marginTop:2 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize: isMobile ? 12 : 13, fontWeight:700, color:"#5a3020" }}>{store.name}</div>
                      <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>{store.address}</div>
                      {store.hours && <div style={{ fontSize:11, color:"#c8a090", marginTop:2 }}>🕐 {store.hours}</div>}
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ed7e80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:3 }}>
                      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </a>
                  {store.phone && (
                    <div style={{ paddingLeft: isMobile ? 38 : 50, paddingBottom:8 }}>
                      <a href={`tel:${store.phone.replace(/\D/g,"")}`} style={{ fontSize:11, color:"#ed7e80", textDecoration:"none", fontWeight:600 }}>
                        📞 {store.phone}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div key={store.name} style={{ padding:"16px 20px", color:"#bbb", fontSize:13, textAlign:"center" as const }}>
                  {store.name}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Mascot — hidden on mobile to avoid overlap */}
      {!isMobile && (
        <img
          src="/images/char-search.png"
          alt=""
          width={110}
          height={110}
          style={{ objectFit:"contain" as const, position:"absolute", bottom:0, left:60 }}
        />
      )}
    </section>
  );
}