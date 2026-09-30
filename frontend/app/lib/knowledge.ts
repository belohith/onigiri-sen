// ── Onigiri Sen Knowledge Base ──
// RAG source for the home page search widget.
// Each chunk has tags for retrieval and content for the model context.
// Update this file to keep the AI up to date — no re-embedding needed.

export const knowledge = [
  {
    id: "about",
    tags: ["about", "company", "who", "what", "onigiri sen", "mission"],
    content: `Onigiri Sen is a Japanese food company based in Seattle, WA. Founded by Rina Oike, who moved from Japan to the US for her studies and saw a gap in the market for fresh, healthy, convenient food. The company started in a 75 sq ft kitchen and has grown to serve multiple retail locations across Washington and California. The name "Sen" (千) means one thousand — a wish to carry a 1,000-year Japanese food tradition into the next 1,000 years. Their mission is to bring Japan's favorite everyday meal — onigiri — into American daily life.`,
  },
  {
    id: "founder",
    tags: ["founder", "rina", "ceo", "story", "who founded"],
    content: `Rina Oike is the Founder and CEO of Onigiri Sen. Growing up in Japan, onigiri was always by her side as a simple everyday comfort. When she moved to the US alone for her studies, she noticed that while fast food was everywhere, truly convenient, healthy, and delicious options were scarce. Driven by the vision of providing a meal that is quick, tasty, and good for you, she started Onigiri Sen in Seattle. She has been featured in KING 5 News, Jungle City, Seattle Magazine, and Silicon Valley Business Journal.`,
  },
  {
    id: "flavors",
    tags: ["flavors", "products", "what flavors", "menu", "onigiri", "ingredients"],
    content: `Onigiri Sen currently offers 6 flavors:
1. Spicy Tuna Mayo — Contains: Egg, Fish (Tuna), and Sesame. Gluten-Free and Organic at PCC locations only.
2. Salmon — Contains: Fish (Salmon). Gluten-Free, Organic.
3. Shrimp Mayo — Contains: Egg, Fish (Tuna, Round Herring), Crustacean Shellfish (Shrimp), Soy, and Wheat.
4. Yuzu Salmon — Contains: Egg, Fish (Salmon), and Sesame. Gluten-Free.
5. Pickled Plum (Ume) — No allergens. Vegan, Organic, Vegetarian, Gluten-Free.
6. Pork Furikake — Contains: Egg, Soy, Wheat, and Sesame.
All onigiri is made fresh every morning.`,
  },
  {
    id: "dietary",
    tags: ["dietary", "gluten free", "vegan", "vegetarian", "organic", "allergens", "halal", "kosher", "nut free"],
    content: `Dietary information:
- Gluten-Free (GF): Salmon, Spicy Tuna Mayo* (PCC only), Yuzu Salmon, Pickled Plum (Ume)
- Organic: Salmon, Spicy Tuna Mayo* (PCC only), Pickled Plum (Ume)
- Vegan: Pickled Plum (Ume)
- Vegetarian: Pickled Plum (Ume)
*Spicy Tuna Mayo is Organic and Gluten-Free at PCC locations only.
No halal or kosher certification currently. Products are made fresh daily with no preservatives.`,
  },
  {
    id: "locations-wa",
    tags: ["where to buy", "locations", "seattle", "washington", "stores", "find", "near me", "pcc", "t&t"],
    content: `Washington locations:
PCC Community Markets (15 locations): Ballard (1451 NW 46th St), Bellevue (11615 NE 4th St), Bothell (22621 Bothell Everett Hwy), Burien (15840 1st Ave S), Central District (2230 E Union St), Columbia City (3823 S Edmunds St), Downtown Seattle (1500 Pike Pl), Edmonds (9803 Edmonds Way), Fremont (600 N 34th St), Green Lake Aurora (7504 Aurora Ave N), Green Lake Village (7601 Aurora Ave N), Kirkland (10718 NE 68th St), Redmond (11435 Avondale Rd NE), View Ridge (6514 40th Ave NE), West Seattle (2749 California Ave SW).
T&T Supermarket: Bellevue (12620 SE 41st Pl), Lynnwood (3025 184th St SW).
Town & Country Market (starting September 28, 2026): Ballard (1400 NW 56th St), Shoreline (15505 Westminster Way N), Mill Creek (15605 Main St), Lakemont/Bellevue (4989 Lakemont Blvd SE). Hours: Daily 7am-10pm.
T-Mobile Park (Seattle Mariners home games).`,
  },
  {
    id: "locations-ca",
    tags: ["california", "san jose", "bay area", "california locations", "west coast"],
    content: `California locations:
T&T Supermarket San Jose — Westgate Center, Suite #501, 1600 Saratoga Ave, San Jose, CA 95129. Hours: Mon–Fri 9am–11pm, Sat–Sun 8am–11pm. Phone: 408-255-1688.
Onigiri Sen launched in California in June 2026 and is expanding further across the Bay Area and into Los Angeles (coming soon).`,
  },
  {
    id: "technology",
    tags: ["technology", "machine", "how made", "rice", "nori", "quality", "fujiseiki", "aiho"],
    content: `Onigiri Sen uses world-class Japanese food technology:
- FUJISEIKI onigiri machines — the world's #1 onigiri machine manufacturer (~100% share in Japanese convenience stores). Achieves hand-pressed fluffy texture with millimeter precision.
- AIHO rice cooking system — professional-grade IH pressure cooker trusted by Japan's largest rice producers. Extracts natural sweetness and ideal stickiness from every grain.
Rice: Premium California-grown rice, selected after rigorous testing for perfect sweetness and texture.
Nori (seaweed): Ariake Sea, Kyushu — Japan's most prized seaweed, known for delicate aroma and crisp snap.
Ume (pickled plum): Certified organic ume from Wakayama, Japan — the Gold Standard of Japanese plums.`,
  },
  {
    id: "wholesale",
    tags: ["wholesale", "partner", "retailer", "business", "bulk", "carry", "sell"],
    content: `Onigiri Sen works with retail partners on a wholesale basis, supplying fresh onigiri daily to grocery stores and other venues across Washington and California. For wholesale and partnership inquiries, visit onigirisen.com and use the Partner With Us section.`,
  },
  {
    id: "freshness-price",
    tags: ["fresh", "shelf life", "made daily", "expiry", "price", "cost", "how much"],
    content: `All Onigiri Sen onigiri is made fresh every morning in the Woodinville, WA kitchen and delivered to stores the same day. Best consumed the same day. No preservatives are used. Retail price is $4.99 per piece.`,
  },
  {
    id: "media",
    tags: ["press", "media", "news", "featured", "articles", "tv"],
    content: `Onigiri Sen has been featured in: Seattle Magazine (August 2026), Silicon Valley Business Journal (June 2026), Jungle City (March & May 2026), KING 5 News (April 2026), Seattle Weekly (March 2026), Lookout Landing (March 2026), Soy Source (March 2025).`,
  },
  {
    id: "contact",
    tags: ["contact", "email", "reach out", "support", "question", "help"],
    content: `Contact Onigiri Sen through the Contact page at onigirisen.com. For wholesale and partnership inquiries, use the Partner With Us page on the website.`,
  },
];

export type KnowledgeChunk = typeof knowledge[0];