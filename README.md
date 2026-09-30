# Onigiri Sen — Official Website

The production website for **Onigiri Sen**, a Japanese onigiri company based in Seattle, WA. Founded by Rina Oike, Onigiri Sen brings Japan's favorite everyday meal — fresh, handcrafted onigiri — into American daily life. Starting from a 75 sq ft kitchen in 2025, the company has expanded to 20+ retail locations across Washington and California, including PCC Community Markets, T&T Supermarket, Town & Country Market, and T-Mobile Park.

---

## About the Project

This is the full production website for Onigiri Sen, built from the ground up as the company's first dedicated digital presence. The site is fully bilingual (English and Japanese), mobile-first, and serves as the primary touchpoint for customers, wholesale partners, and press.

I led the end-to-end development of this project as Director of Technology — working closely with the founder (Rina Oike), a designer, and the product and operations team to translate the company's brand and vision into a polished web experience.

**Key responsibilities included:**
- Architecting and building the full Next.js application from scratch
- Collaborating with the designer on UI/UX decisions, component design, and brand alignment
- Working directly with the founder and PM to define content, copy, and product requirements
- Managing all deployments, domain configuration, and third-party integrations
- Building and maintaining internal ops tools alongside the public-facing website

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Inline styles + DM Sans / Crimson Text (Google Fonts) |
| Deployment | Vercel |
| Domain | Squarespace (DNS) |
| Email | Resend |
| Analytics | Google Analytics 4 |
| Maps | Google My Maps embed |
| Fonts | DM Sans, Crimson Text |

---

## Features

- Fully bilingual — English and Japanese with a language toggle
- Mobile-first responsive design across all pages
- Store locator with interactive Google Maps for Washington and California
- Product pages with allergen information, dietary labels, and flavor details
- Press & Media page with categorized coverage
- Careers page with application form (Resend-powered email)
- Wholesale / Partner inquiry page
- Animated news ticker, trusted partners section, Instagram embed
- Bilingual press releases for California launch and retail partnerships

---

## AI Features *(in development — not yet deployed to production)*

A RAG-based AI search widget is currently being developed and tested on a separate branch (`ai-feature`). The architecture uses:

- **Cloudflare Workers AI** — Mistral 24B for answer generation
- **Cloudflare Vectorize** — vector database for semantic search
- **BGE embeddings** (`bge-small-en-v1.5`) — to embed the knowledge base
- **Retrieval-Augmented Generation (RAG)** — knowledge chunks retrieved by cosine similarity, passed as context to the LLM

The widget allows visitors to ask natural language questions about the company (locations, flavors, allergens, etc.) and receive accurate, grounded answers — in English or Japanese. All infrastructure runs on Cloudflare's free tier.

---

## Collaboration

This project was built in close collaboration with:
- **Rina Oike** — Founder & CEO, product direction and content sign-off
- **Designer** — UI/UX design, brand assets, and visual direction
- **Operations & Kitchen Team** — requirements for internal tools and data workflows

---

*Built by Lohith Bollineni — Director of Technology, Onigiri Sen*
*April 2026 – Present*