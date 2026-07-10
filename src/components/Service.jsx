import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import "./Service.css";

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
    desc: "Single Door மற்றும் Double Door அனைத்து Brand Fridge-களையும் தரமாக சரிசெய்கிறோம்.",
    badge: "All Brands",
  },
  {
    icon: "🫧",
    title: "Washing Machine",
    desc: "Semi & Fully Automatic — PCB, Motor, Drum பிரச்சினை என எதுவாக இருந்தாலும் நாங்க சரி பண்ணுவோம்.",
    badge: "Top & Front Load",
  },
];

/* ── Why Us bento data ── */
const bentoLeft = [
  { icon: "⚡", title: "Fast Service", sub: "Same Day Support" },
  { icon: "🛠", title: "Expert Technician", sub: "Professional Experience" },
];
const bentoRight = [
  { icon: "🧊", title: "Genuine Spare Parts", sub: "Quality Guaranteed" },
  { icon: "⭐", title: "Customer Satisfaction", sub: "Trusted Service" },
];
const heroStats = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 5000, suffix: "+", label: "Happy Customers" },
];
const heroBadges = ["Same Day Service", "Doorstep Support"];

/* ── count-up sub component ── */
function CountUp({ target, suffix, start }) {
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!start || done.current) return;
    done.current = true;
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [start, target]);
  return (
    <span className="hs-stat-num">
      {val}
      {suffix}
    </span>
  );
}

/* ── tilt handler factory ── */
function useTilt() {
  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    card.style.setProperty("--gx", `${px * 100}%`);
    card.style.setProperty("--gy", `${py * 100}%`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "";
  };
  return { onMouseMove: onMove, onMouseLeave: onLeave };
}

function BentoParticles({ count = 14 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 30,
      })),
    [count]
  );
  return (
    <div className="hs-bento-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="hs-bento-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function HarwinService() {
  const sectionRef = useRef(null);
  const heroCardRef = useRef(null);
  const [heroInView, setHeroInView] = useState(false);
  const tilt = useTilt();

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

  useEffect(() => {
    const el = heroCardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hs-root" ref={sectionRef}>
      <div className="hs-grain" aria-hidden="true" />
      <div className="hs-bg-glow" aria-hidden="true" />

      <div className="hs-wrap">

        {/* ── BANNER HERO ── */}
        <div className="hs-banner hs-anim">
          <img
            src="/images/service-banner.jpeg"
            alt="ஹார்வின் இன்ஜினியர்ஸ் - AC, Fridge, Washing Machine Service Center"
            className="hs-banner-img"
            loading="eager"
          />
        </div>

        {/* ── SERVICES HEADER ── */}
        <header className="hs-header hs-anim hs-delay-1">
          <div className="hs-eyebrow">
            <span className="hs-eyebrow-rule" />
            <span className="hs-eyebrow-text">நம்பகமான வீட்டு சாதன சேவை</span>
            <span className="hs-eyebrow-rule" />
          </div>
          <h2 className="hs-section-title">எங்கள் சேவைகள்</h2>
          <p className="hs-sub">
            AC · Fridge · Washing Machine — மூன்றுக்கும் ஒரே இடத்தில்.
            <br />
            தரமான சேவை. நேர்மையான விலை.
          </p>
        </header>

        {/* ── SERVICE CARDS ── */}
        <div className="hs-cards">
          {services.map((s, i) => (
            <article className={`hs-card hs-anim hs-delay-${i + 2}`} key={i}>
              <div className="hs-card-media">
                <span className="hs-card-media-icon">{s.icon}</span>
                <span className="hs-badge">{s.badge}</span>
              </div>
              <div className="hs-card-inner">
                <h3 className="hs-card-title">{s.title}</h3>
                <p className="hs-card-desc">{s.desc}</p>
              
              </div>
            </article>
          ))}
        </div>

        {/* ══════════════ WHY CHOOSE US — BENTO GRID ══════════════ */}
        <section className="hs-bento-section">
          <div className="hs-bento-bg" aria-hidden="true" />
          <BentoParticles count={20} />

          <motion.div
            className="hs-bento-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="hs-bento-title">
              <span className="hs-bento-star">⭐</span> ஏன் எங்களை தேர்வு
              செய்ய வேண்டும்?
            </h2>
            <p className="hs-bento-sub">
              வேகமான சேவை • அனுபவமிக்க தொழில்நுட்ப நிபுணர்கள் • உண்மையான
              Spare Parts
            </p>
          </motion.div>

          <motion.div
            className="hs-bento-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {/* LEFT COLUMN */}
            <div className="hs-bento-col">
              {bentoLeft.map((c, i) => (
                <motion.div
                  key={i}
                  className="hs-bento-card hs-bento-small"
                  variants={{
                    hidden: { opacity: 0, y: 26, scale: 0.94 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  {...tilt}
                >
                  <div className="hs-bento-glow" aria-hidden="true" />
                  <span className="hs-bento-icon">{c.icon}</span>
                  <h3 className="hs-bento-card-title">{c.title}</h3>
                  <p className="hs-bento-card-sub">{c.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* CENTER HERO CARD */}
            <motion.div
              ref={heroCardRef}
              className="hs-bento-card hs-bento-hero"
              variants={{
                hidden: { opacity: 0, y: 34, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              {...tilt}
            >
              <div className="hs-bento-glow hs-bento-glow-hero" aria-hidden="true" />
              <span className="hs-hero-badge-top">Harwin Engineers</span>
              <h3 className="hs-hero-title">
                உங்கள் நம்பகமான
                <br />
                சேவை மையம்
              </h3>

              <div className="hs-hero-stats">
                {heroStats.map((s, i) => (
                  <div className="hs-hero-stat" key={i}>
                    <CountUp target={s.target} suffix={s.suffix} start={heroInView} />
                    <span className="hs-hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="hs-hero-pills">
                {heroBadges.map((b, i) => (
                  <span className="hs-hero-pill" key={i}>
                    {b}
                  </span>
                ))}
              </div>

              <button
                className="hs-book-btn"
                type="button"
                onClick={() => window.open("tel:+919443791706")}
              >
                <span className="hs-book-btn-content">
                  <span>Book Service</span>
                  <span className="hs-book-btn-arrow" aria-hidden="true">→</span>
                </span>
                <span className="hs-book-btn-shine" aria-hidden="true" />
              </button>
            </motion.div>

            {/* RIGHT COLUMN */}
            <div className="hs-bento-col">
              {bentoRight.map((c, i) => (
                <motion.div
                  key={i}
                  className="hs-bento-card hs-bento-small"
                  variants={{
                    hidden: { opacity: 0, y: 26, scale: 0.94 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  {...tilt}
                >
                  <div className="hs-bento-glow" aria-hidden="true" />
                  <span className="hs-bento-icon">{c.icon}</span>
                  <h3 className="hs-bento-card-title">{c.title}</h3>
                  <p className="hs-bento-card-sub">{c.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

      </div>
    </section>
  );
}