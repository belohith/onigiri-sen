"use client";

import React, { useState } from "react";

const flavors = [
  { name: "Spicy Tuna", image: "/images/flavors/spicy-tuna.webp" },
  { name: "Bulgogi", image: "/images/flavors/bulgogi.webp" },
  { name: "Unagi", image: "/images/flavors/unagi.webp" },
  { name: "Shrimp Mayo", image: "/images/flavors/shrimp-mayo.webp" },
  { name: "Butter Corn", image: "/images/flavors/butter-corn.webp" },
  { name: "Salmon", image: "/images/flavors/salmon.webp" },
];

const partners = [
  "PCC Community Markets",
  "T-Mobile Park",
  "Town & Country Markets",
  "T&T Supermarket",
  "Kitchen & Market",
  "Artisan Community Kitchen",
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Flavors", href: "#flavors" },
  { label: "Story", href: "#story" },
  { label: "Why Us", href: "#why-us" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

type SectionHeaderProps = {
  id: string;
  title: string;
};

type TechCardProps = {
  title: string;
  subtitle: string;
  image: string;
  body: string;
};

type InputProps = {
  label: string;
  type?: string;
};

export default function OnigiriSenSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ENG");

  return (
    <main className="min-h-screen bg-[#fff6f8] text-[#112138] font-sans">
      <header className="fixed left-0 top-0 z-50 w-full bg-[#f7c4d5]/95 backdrop-blur-md border-b border-[#112138]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#home" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Onigiri Sen logo" className="h-12 w-12 object-contain" />
            <span className="text-xl font-black tracking-tight md:text-2xl">Onigiri Sen</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#e96f94]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center rounded-2xl bg-[#e96f94] p-2 text-sm font-bold text-white md:flex">
            <button
              onClick={() => setLanguage("ENG")}
              className={`rounded-xl px-3 py-2 ${language === "ENG" ? "bg-[#112138]" : ""}`}
            >
              ENG
            </button>
            <span className="px-2 opacity-70">|</span>
            <button
              onClick={() => setLanguage("JPN")}
              className={`rounded-xl px-3 py-2 ${language === "JPN" ? "bg-[#112138]" : ""}`}
            >
              JPN
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-[#112138]/20 px-4 py-2 text-sm font-black md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#112138]/10 bg-[#fff6f8] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-lg font-black">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-6 inline-flex rounded-2xl bg-[#e96f94] p-2 text-sm font-bold text-white">
              <button
                onClick={() => setLanguage("ENG")}
                className={`rounded-xl px-3 py-2 ${language === "ENG" ? "bg-[#112138]" : ""}`}
              >
                ENG
              </button>
              <span className="px-2 py-2 opacity-70">|</span>
              <button
                onClick={() => setLanguage("JPN")}
                className={`rounded-xl px-3 py-2 ${language === "JPN" ? "bg-[#112138]" : ""}`}
              >
                JPN
              </button>
            </div>
          </div>
        )}
      </header>

<section id="home" className="pt-16 md:pt-20">
        <div className="bg-[#f7c4d5]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
            <div>
              <img src="/images/logo.png" alt="Onigiri Sen" className="mb-8 h-24 w-24 drop-shadow-xl md:h-32 md:w-32" />
              <h1 className="text-5xl font-bold tracking-[0.08em] md:text-7xl">Onigiri Sen</h1>
              <p className="mt-5 text-xl font-mono md:text-2xl">Japan’s Tradition, Scaled for the USA Market</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#flavors" className="rounded-2xl bg-[#112138] px-6 py-3 font-black text-white shadow-md">
                  Explore Flavors
                </a>
                <a href="#contact" className="rounded-2xl bg-[#e96f94] px-6 py-3 font-black text-white shadow-md">
                  Partner With Us
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border-2 border-[#112138] bg-white shadow-xl">
              <img src="/images/hero-store.jpg" alt="Onigiri Sen at store" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">A 1,000-Year Tradition for the Next 1,000 Years</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 md:text-xl">
              The name “Sen” (千) represents one thousand. Rina’s mission is to take a staple of Japanese culture that has flourished for a millennium and cement it into everyday American life.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-[#112138] bg-white p-4 shadow-md">
            <img src="/images/seattle-map.png" alt="Seattle store locations map" className="rounded-[1.5rem]" />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center justify-center gap-4 text-center text-lg font-bold md:text-2xl">
            <span>Find us in</span>
            <span className="rounded-2xl bg-[#f7c4d5] px-5 py-3 text-4xl font-black">24</span>
            <span>locations across</span>
            <span className="rounded-2xl bg-[#f7c4d5] px-5 py-3 text-4xl font-black">Seattle</span>
          </div>
        </div>
      </section>

      <SectionHeader id="story" title="Our Story" />

<section className="bg-[#fff6f8] px-5 py-14 md:px-10 md:py-20">
  <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
    {/* LEFT SIDE */}
    <div className="flex flex-col items-center md:items-start">
      <div className="w-full max-w-md rotate-1 overflow-hidden rounded-[1.7rem] border border-[#112138] bg-white shadow-sm">
        <img
          src="/images/rina-oike.webp"
          alt="Rina Oike"
  className="aspect-[1/1] w-full object-cover object-[center_10%]"
        />
      </div>

      <div className="z-10 -mt-5 w-[82%] max-w-sm rounded-xl border-2 border-dashed border-[#112138]/45 bg-white px-6 py-4 text-center shadow-sm">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-black">
          Rina Oike
        </h3>
        <p className="mt-1 text-base font-extrabold">
          Founder & CEO, Onigiri Sen
        </p>
      </div>

      <div className="mt-72 w-full max-w-md rounded-2xl border-2 border-dashed border-[#112138]/45 bg-[#f7c4d5] p-7 text-lg leading-8 md:mt-80">
        <p>
          “In a market dominated by fast food, I am committed to providing
          a healthy, high-quality alternative that is as accessible as a
          hamburger but rooted in tradition. We aren&apos;t just selling rice
          balls; we are building a reliable, high-tech supply chain for the
          future of healthy eating in the USA.”
        </p>

        <p className="mt-8 text-right font-black">Rina Oike</p>
      </div>

      <a
        href="https://www.junglecity.com/eat/eat-more/onigiri-sen-rina-oike/"
        target="_blank"
  rel="noopener noreferrer"
        className="mt-10 inline-block rounded-xl bg-[#e96f94] px-5 py-4 font-[family-name:var(--font-heading)] text-xl font-black text-white shadow-sm transition hover:scale-105"
      >
        Read her interview on Jungle City
      </a>
    </div>

    {/* RIGHT SIDE */}
    <div className="max-w-xl text-[1.35rem] leading-[1.75] text-black">
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-black">
        Meet the Founder
      </h2>

      <h3 className="mt-12 text-2xl font-black">
        A Vision Built on &quot;Reverse Strategy&quot;
      </h3>

      <p className="mt-3">
        Rina Oike didn’t just set out to start a business; she set out to
        lead a cultural shift in the American food market.
      </p>

      <p className="mt-10">
        Driven by a philosophy of &quot;Action First,&quot; Rina made the
        bold decision to withdraw from a top foreign language university in
        Japan after only three months. Her reasoning was simple: to master
        business in the world&apos;s largest market, she needed to be in
        America.
      </p>

      <p className="mt-10">
        This &quot;Reverse Thinking&quot;—starting with a massive end goal
        and working backward—has defined her leadership ever since.
      </p>

      <h3 className="mt-12 text-2xl font-black">
        From Startup to the Major Leagues
      </h3>

      <p className="mt-3">
        Rina’s approach to Onigiri Sen is rooted in high-level strategic
        planning. Rather than starting small, she set a definitive target:
        to enter T-Mobile Park (Home of the Seattle Mariners) within her
        first year of operation.
      </p>

      <p className="mt-10">
        To achieve this, she systematically built the brand&apos;s
        credibility by securing wholesale partnerships with premium organic
        retailers like PCC Community Markets and Asian grocery giants like
        T&amp;T Supermarket.
      </p>

      <p className="mt-10">
        By investing in state-of-the-art Japanese food technology and a
        high-volume infrastructure, she transformed Onigiri Sen from a local
        startup into a stadium-ready powerhouse in record time.
      </p>
    </div>
  </div>
</section>

      <SectionHeader id="flavors" title="Our Flavors" />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {flavors.map((flavor) => (
            <article key={flavor.name} className="text-center">
              <div className="overflow-hidden rounded-[2rem] border-2 border-[#112138] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img src={flavor.image} alt={flavor.name} className="aspect-square w-full object-cover" />
              </div>
              <h3 className="mt-4 text-2xl font-black md:text-3xl">{flavor.name}</h3>
            </article>
          ))}
        </div>
      </section>


     <section id="why-us" className="scroll-mt-24 bg-[#fff6f8]">
  <SectionHeader
    id="why-us-tech"
    title="Advanced Technology & Unmatched Supply Stability"
  />

  <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
    <div className="grid gap-20">
      <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <img src="/images/fuji-1.jpg" alt="Fuji Seiki" className="rounded-2xl border border-[#112138]/30 shadow-md" />
          <img src="/images/fuji-2.webp" alt="Fuji Seiki Factory" className="rounded-2xl border border-[#112138]/30 shadow-md" />
        </div>

        <div>
          <h3 className="text-3xl font-black">Fuji Seiki</h3>
          <p className="mt-2 text-sm font-bold opacity-70">The Global Leader in Onigiri Tech</p>

          <div className="mt-6 space-y-5 text-lg leading-8">
            <p>We utilize state-of-the-art forming technology from Fuji Seiki, the world’s #1 manufacturer of automated onigiri systems.</p>
            <p><span className="font-black">Uniform Quality:</span> We eliminate inconsistencies in weight and shape commonly found in hand-made products.</p>
            <p><span className="font-black">Global Standard of Trust:</span> The same technology is trusted by Japan’s leading convenience store chains.</p>
          </div>

          <a
  href="https://international.fuji-seiki.co.jp/"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-block rounded-xl bg-[#e96f94] px-6 py-3 font-black text-white shadow-md transition hover:scale-105"
>
  Learn More
</a>
        </div>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="text-3xl font-black">AIHO Induction Heating (IH) Rice Systems</h3>
          <p className="mt-2 text-sm font-bold opacity-70">The Heart of Flavor</p>

          <div className="mt-6 space-y-5 text-lg leading-8">
            <p>The soul of great onigiri is the rice. We use professional Japanese rice systems from AIHO to ensure consistency and flavor at scale.</p>
            <p><span className="font-black">Premium Texture:</span> Advanced control systems ensure every grain is cooked evenly.</p>
            <p><span className="font-black">Safety & Efficiency:</span> Designed for high-volume production while preserving authentic Japanese rice quality.</p>
          </div>

          <a
  href="https://www.aiho.co.jp/en/company/"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-block rounded-xl bg-[#e96f94] px-6 py-3 font-black text-white shadow-md transition hover:scale-105"
>
  Learn More
</a>
        </div>

        <div className="space-y-6">
          <img src="/images/aiho-1.jpg" alt="AIHO Machine" className="rounded-2xl border border-[#112138]/30 shadow-md" />
          <img src="/images/aiho-2.jpg" alt="AIHO Rice Cooker" className="rounded-2xl border border-[#112138]/30 shadow-md" />
        </div>
      </div>
    </div>
  </div>

  <SectionHeader
    id="why-onigiri"
    title="Why Onigiri Sen?"
  />

  <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
    <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {[
        ["Supreme Hygiene", "Automation minimizes human contact and maintains extremely high food safety standards."],
        ["Stability of Supply", "Whether supplying 100 or 10,000 units, flavor and consistency remain identical."],
        ["Reliable Capacity", "Built for stadiums, retailers, and high-volume wholesale partners."],
        ["Strict Safety Protocols", "Every step follows structured production and sanitation systems."],
        ["Customized Menus", "Flexible flavor options and menu customization for every partner."],
        ["Merchandising Support", "Shelf presentation, branding support, and grab-and-go optimization."],
      ].map(([title, body], index) => (
        <div
          key={title}
          className={`rounded-[1.7rem] border-2 border-dashed border-[#112138]/50 bg-[#e96f94] p-6 text-white shadow-md ${
            index % 2 === 0 ? "-rotate-2" : "rotate-2"
          }`}
        >
          <h3 className="text-lg font-black">{title}</h3>
          <p className="mt-3 text-sm font-semibold leading-6 opacity-95">{body}</p>
        </div>
      ))}
    </div>
    {/* EXPANSION BOX */}
      <div className="mt-16 rounded-[2rem] border-2 border-dashed border-[#112138]/40 bg-[#f7c4d5] p-10 text-center shadow-sm">
        <p className="text-2xl font-black leading-relaxed">
          Riding this wave of demand, we are launching a
          large-scale expansion into San Francisco this year.
        </p>

        <p className="mt-6 text-lg font-bold">
          Join us in creating the next major deli trend with
          Onigiri Sen.
        </p>
      </div>
  </div>
</section>

      <section id="partners" className="bg-[#112138] px-5 py-20 text-white md:px-10 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-black tracking-[0.4em]">OUR TRUSTED PARTNERS</p>
          <div className="mt-16 grid gap-12 text-3xl font-black md:grid-cols-2 md:text-5xl">
            {partners.map((partner) => (
              <div key={partner} className="flex min-h-24 items-center justify-center rounded-2xl border border-white/10 px-6 py-8">
                {partner}
              </div>
            ))}
          </div>
          <p className="mt-20 text-xl font-black tracking-wide">
            We provide office catering services with fully customizable menu options upon request.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mx-auto max-w-5xl text-4xl font-black leading-tight md:text-5xl">
            Our infrastructure is designed to deliver thousands of units on time without compromising quality.
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {["/images/infrastructure-1.webp", "/images/infrastructure-2.JPG", "/images/infrastructure-3.webp"].map((src) => (
              <img key={src} src={src} alt="Onigiri Sen infrastructure" className="aspect-[4/3] rounded-2xl border-2 border-[#112138] object-cover" />
            ))}
          </div>
        </div>
      </section>

      <SectionHeader id="contact" title="Get in Touch" />
      <section className="mx-auto max-w-4xl px-5 py-16 md:px-10 md:py-24">
        <form className="rounded-[2rem] border-2 border-[#112138] bg-white p-8 md:p-12">
          <div className="grid gap-6">
            <Input label="First Name" />
            <Input label="Last Name" />
            <Input label="Email Address" type="email" />
            <Input label="Phone Number" />
            <Input label="Company / Venue Name" />
            <Input label="Business Type" />
            <Input label="Estimated Weekly Order Volume" />
            <textarea className="min-h-32 border-b border-[#112138]/40 bg-transparent py-3 text-xl outline-none placeholder:text-black/35" placeholder="Additional Notes" />
          </div>
        </form>
        <div className="mt-12 text-center">
          <button className="rounded-3xl bg-[#e96f94] px-10 py-5 text-xl font-black text-white shadow-md md:text-2xl">
            Inquire about Partnership
          </button>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ id, title }: SectionHeaderProps) {
  return (
    <div id={id} className="scroll-mt-24 bg-[#f7c4d5] px-5 py-12 text-center md:py-16">
      <h2 className="text-4xl font-black tracking-tight md:text-5xl">{title}</h2>
    </div>
  );
}

function TechCard({ title, subtitle, image, body }: TechCardProps) {
  return (
    <article className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:p-8">
      <img src={image} alt={title} className="aspect-[4/3] w-full rounded-2xl border border-[#112138] object-cover" />
      <div>
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="mt-1 text-sm font-black">{subtitle}</p>
        <p className="mt-5 leading-7">{body}</p>
        <button className="mt-6 rounded-xl bg-[#e96f94] px-5 py-3 font-black text-white">Learn More</button>
      </div>
    </article>
  );
}

function Input({ label, type = "text" }: InputProps) {
  return (
    <input
      type={type}
      placeholder={label}
      className="border-b border-[#112138]/40 bg-transparent py-3 text-xl outline-none placeholder:text-black/35"
    />
  );
}
