import React, { useEffect, useRef } from "react";
import "./Service.css";

// Tamil/complex-script safe grapheme splitter
function splitGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("ta", { granularity: "grapheme" });
    return [...seg.segment(text)].map((s) => s.segment);
  }
  return text.split("");
}

// Animated letter-by-letter text (same pattern as Hero.jsx)
function AnimatedText({ text, baseDelay = 0, className }) {
  const chars = splitGraphemes(text);
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{ animationDelay: `${baseDelay + i * 0.052}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

const services = [
  {
    icon: "❄️",
    title: "AC சேவை",
    desc: "Split & Window AC — Cooling இல்லையா? Gas Filling, Deep Service, Repair. சரியான நேரத்தில் சரியான தீர்வு.",
    badge: "Split & Window",
  },
  {
    icon: "🧊",
    title: "குளிர்சாதனம்",
    desc: "Single Door முதல் Side-by-Side வரை — அனைத்து Brand Fridge-ம் சரிசெய்கிறோம். Cooling இல்லை என்பது நடக்காது.",
    badge: "All Brands",
  },
  {
    icon: "🫧",
    title: "Washing Machine",
    desc: "Semi & Fully Automatic — PCB, Motor, Drum பிரச்சினை என எதுவாக இருந்தாலும் நாங்க சரி பண்ணுவோம்.",
    badge: "Top & Front Load",
  },
];

const trust = [
  { num: "1,200+", label: "சேவைகள் முடிந்தன" },
  { num: "5 ★", label: "Customer Rating" },
  { num: "24 Hrs", label: "விரைவான Response" },
];

export default function HarwinService() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("hs-visible");
        }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".hs-anim");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hs-root" ref={sectionRef}>
      <div className="hs-grain" aria-hidden="true" />
      <div className="hs-bg-glow" aria-hidden="true" />

      <div className="hs-wrap">

        {/* ── HEADER ── */}
        <header className="hs-header hs-anim">
          <div className="hs-eyebrow">
            <span className="hs-eyebrow-rule" />
            <span className="hs-eyebrow-text">நம்பகமான வீட்டு சாதன சேவை</span>
            <span className="hs-eyebrow-rule" />
          </div>

          <h2 className="hs-title">
            <AnimatedText
              text="ஹார்வின்"
              baseDelay={0.08}
              className="hs-brand"
            />
            <AnimatedText
              text="இன்ஜினியர்ஸ்"
              baseDelay={0.08 + splitGraphemes("ஹார்வின்").length * 0.052 + 0.06}
              className="hs-title-sub"
            />
          </h2>

          <p className="hs-sub">
            AC · Fridge · Washing Machine — மூன்றுக்கும் ஒரே இடத்தில்.
            <br />
            தரமான சேவை. நேர்மையான விலை.
          </p>
        </header>

        {/* ── TRUST ROW ── */}
        <div className="hs-trust hs-anim hs-delay-1" role="list">
          {trust.map((t, i) => (
            <div key={i} className="hs-trust-item" role="listitem">
              <span className="hs-trust-num">{t.num}</span>
              <span className="hs-trust-label">{t.label}</span>
            </div>
          ))}
        </div>

        {/* ── SERVICE CARDS ── */}
        <div className="hs-cards">
          {services.map((s, i) => (
            <article className={`hs-card hs-anim hs-delay-${i + 2}`} key={i}>
              <div className="hs-card-topbar" aria-hidden="true" />
              <div className="hs-card-inner">
                <div className="hs-icon-wrap" aria-hidden="true">
                  <span className="hs-icon">{s.icon}</span>
                </div>
                <span className="hs-badge">{s.badge}</span>
                <h3 className="hs-card-title">{s.title}</h3>
                <p className="hs-card-desc">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="hs-cta hs-anim hs-delay-5">
          <button
            className="hs-btn"
            onClick={() => window.open("tel:+919443791706")}
          >
            <span className="hs-btn-content">
              <span className="hs-btn-icon" aria-hidden="true">📞</span>
              <span>இப்போதே அழைக்கவும்</span>
            </span>
            <span className="hs-btn-shine" aria-hidden="true" />
          </button>
          <p className="hs-cta-note">
            விரைவான சேவை &nbsp;·&nbsp; நேர்மையான விலை &nbsp;·&nbsp; உத்தரவாதம்
          </p>
        </div>

      </div>
    </section>
  );
}