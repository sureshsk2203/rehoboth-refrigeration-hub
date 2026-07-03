import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { IconDroplet } from "@tabler/icons-react";

/* ---- inline icons ---- */

function IconAirConditioner() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="rh-why-icon">
      <rect x="4" y="12" width="40" height="16" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="23" x2="12" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="23" x2="18" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="23" x2="24" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="23" x2="30" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="23" x2="36" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 34 Q17 38 24 34 Q31 30 38 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M10 40 Q17 44 24 40 Q31 36 38 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
function IconFridge() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="rh-why-icon">
      <rect x="10" y="4" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="20" y1="11" x2="28" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function IconWashingMachine() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="rh-why-icon">
      <rect x="5" y="4" width="38" height="40" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="5" y1="14" x2="43" y2="14" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9" r="2" fill="currentColor" />
      <circle cx="20" cy="9" r="2" fill="currentColor" />
      <circle cx="24" cy="29" r="11" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="29" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="23" r="1.2" fill="currentColor" />
      <circle cx="29.2" cy="26" r="1.2" fill="currentColor" />
      <circle cx="29.2" cy="32" r="1.2" fill="currentColor" />
      <circle cx="24" cy="35" r="1.2" fill="currentColor" />
      <circle cx="18.8" cy="32" r="1.2" fill="currentColor" />
      <circle cx="18.8" cy="26" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* ---- data ---- */
const PART_CATEGORIES = [
  "COMPRESSORS","THERMOSTATS","CAPACITORS","PCB BOARDS",
  "COOLING COILS","GAS VALVES","MOTORS","TIMERS","SENSORS",
];
const WHY_CARDS = [
  { icon: IconAirConditioner, title: "AC Spare Parts",
    text: "High-quality AC spare parts including compressors, capacitors, fan motors, PCBs, thermostats, and more." },
  { icon: IconFridge, title: "Fridge Spare Parts",
    text: "Genuine refrigerator spare parts such as compressors, thermostats, relays and cooling fans." },
  { icon: IconWashingMachine, title: "Washing Machine Spare Parts",
    text: "Premium washing machine spare parts including motors, pumps, belts, control boards, and door locks." },
  { icon: IconDroplet, title: "RO Water Spare Parts",
    text: "Complete range of RO spare parts including filters, membranes, booster pumps, valves, and accessories." },
];
const STATS = [
  { value: "500+",  label: "Products Available",    num: 500,  suffix: "+" },
  { value: "1000+", label: "Happy Customers",        num: 1000, suffix: "+" },
  { value: "100%",  label: "Customer Satisfaction",  num: 100,  suffix: "%" },
  { value: "100%",  label: "Quality Assured",        num: 100,  suffix: "%" },
];

/* ---- counter animation ---- */
function animateCount(el, target, suffix) {
  const duration = 1800; 
  const startTime = performance.now();
  const update = (now) => {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

export default function About() {
  const stackRef    = useRef(null);
  const heroRef     = useRef(null);
  const orb1Ref     = useRef(null);
  const orb2Ref     = useRef(null);
  const bgTextRef   = useRef(null);
  const statsRef    = useRef(null);
  const statCounted = useRef(false);

  /* ── SCROLL PARALLAX ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (orb1Ref.current)   orb1Ref.current.style.transform   = `translateY(${y * 0.25}px)`;
      if (orb2Ref.current)   orb2Ref.current.style.transform   = `translateY(${-y * 0.18}px)`;
      if (bgTextRef.current) bgTextRef.current.style.transform  = `translateX(-50%) translateY(${y * 0.12}px)`;

      const heroLeft  = heroRef.current?.querySelector('.rh-hero-left');
      const heroRight = heroRef.current?.querySelector('.rh-hero-right');
      if (heroLeft)  heroLeft.style.transform  = `translateY(${y * 0.08}px)`;
      if (heroRight) heroRight.style.transform = `translateY(${y * 0.05}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── MOUSE PARALLAX on product stack ── */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const onMove = (e) => {
      const rect = stack.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      stack.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg) scale(1.03)`;

      const img = stack.querySelector('.rh-ac');
      if (img) {
        img.style.filter = `
          drop-shadow(${-dx * 18}px ${-dy * 14}px 36px rgba(11,93,59,.45))
          drop-shadow(0 0 18px rgba(212,160,23,.70))
          drop-shadow(0 0 42px rgba(11,93,59,.45))
        `;
      }
    };

    const onLeave = () => {
      stack.style.transform = '';
      const img = stack.querySelector('.rh-ac');
      if (img) img.style.filter = '';
    };

    stack.addEventListener('mousemove', onMove);
    stack.addEventListener('mouseleave', onLeave);
    return () => {
      stack.removeEventListener('mousemove', onMove);
      stack.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ── CARD 3-D TILT on why-cards ── */
 

  /* ── COUNTER animation on stats ── */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statCounted.current) {
        statCounted.current = true;
        el.querySelectorAll('.rh-stat-num').forEach((numEl) => {
          const target = parseInt(numEl.dataset.target, 10);
          const suffix = numEl.dataset.suffix || '';
          if (!isNaN(target)) animateCount(numEl, target, suffix);
        });
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    const els = document.querySelectorAll('.rh-about .rh-reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('rh-in-view');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="rh-about">
      <div className="rh-bg-text" ref={bgTextRef}>REHOBOTH</div>
      <div className="rh-orb rh-orb-1" ref={orb1Ref}></div>
      <div className="rh-orb rh-orb-2" ref={orb2Ref}></div>

      {/* ── HERO ── */}
      <section className="rh-hero" ref={heroRef}>
        <div className="rh-hero-left">
          <span className="rh-tag">About Rehoboth</span>
          <h1>
            Built For Technicians<br />
            Who <span className="rh-accent">Don't Get Second Chances</span>
          </h1>
          <p>
            Rehoboth Refrigeration Hub sources genuine AC, Fridge,
            washing machine and RO water spare parts directly from approved
            channels — so every compressor, thermostat and circuit board
            you install is verified before it reaches your bench.
          </p>
          <div className="rh-buttons">
            <Link to="/categories" className="primary-btn"><span>Explore Products</span></Link>
            <Link to="/contact"    className="secondary-btn"><span>Contact Us</span></Link>
          </div>
        </div>

        <div className="rh-hero-right">
          <div className="rh-product-stack" ref={stackRef}>
            {/* Layer 1 — gold + green glow */}
            <div className="rh-stack-glow"></div>

            {/* Layer 2 — dark disc: white halo completely போகும் */}
            <div className="rh-stack-disc"></div>

            {/* Layer 3 — inner dashed ring */}
            <div className="rh-stack-ring"></div>

            {/* Layer 4 — outer dashed ring */}
            <div className="rh-stack-ring rh-stack-ring-2"></div>

            {/* Layer 5 — logo image */}
            <img
              src="/images/circlehub.png"
              alt="Rehoboth Logo"
              className="rh-product-img rh-ac"
            />

    <span className="rh-badge rh-badge-1">🏆 Premium Quality</span>
          <span className="rh-badge rh-badge-2">⚡ Best Prices</span>
      <span className="rh-badge rh-badge-3">💯 Customer Satisfaction</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="rh-marquee">
        <div className="rh-marquee-track">
          {[0, 1].map((g) => (
            <div className="rh-marquee-group" key={g} aria-hidden={g === 1}>
              {PART_CATEGORIES.map((item) => (
                <span className="rh-marquee-item" key={item + g}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY ── */}
      <section className="rh-story">
        <div className="rh-story-img rh-reveal">
          <img src="/images/store.png" alt="Rehoboth store" />
          <span className="rh-bracket-bl"></span>
          <span className="rh-bracket-br"></span>
        </div>
        <div className="rh-story-content rh-reveal">
          <span className="rh-eyebrow">Why We Started Rehoboth</span>
          <h2 className="rh-gradient-text">Built On The Bench, Not In A Boardroom</h2>
          <p>
            Rehoboth Refrigeration Hub is committed to supplying genuine refrigeration and air
            conditioning spare parts with reliable service. If a product is unavailable, we will
            arrange a special order through our trusted suppliers. Our focus is on quality,
            affordability, timely delivery, and complete customer satisfaction.
          </p>
          <p>
            Our goal is not just to sell spare parts, but to build lasting relationships by offering
            reliable products, prompt service, and complete customer support. Customer satisfaction
            is our highest priority, and we are dedicated to ensuring that every customer leaves
            with a positive experience. Your trust inspires us to deliver excellence every time.
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="rh-why">
        <div className="rh-section-head rh-reveal">
          <span className="rh-eyebrow">Our Product Categories</span>
          <h2 className="rh-gradient-text">Complete Spare Parts Solutions Under One Roof</h2>
        </div>
        <div className="rh-why-grid rh-stagger">
          {WHY_CARDS.map(({ icon: Icon, title, text }) => (
            <div className="rh-why-card rh-reveal" key={title}>
              <div className="rh-card-scan"></div>
              <div className="rh-icon-wrap"><Icon className="rh-why-icon" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="rh-stats rh-reveal" ref={statsRef}>
          {STATS.map((stat) => (
            <div className="rh-stat" key={stat.label}>
              <h2>
                {stat.num !== null
                  ? <span className="rh-stat-num" data-target={stat.num} data-suffix={stat.suffix}>{stat.value}</span>
                  : <span>{stat.value}</span>
                }
              </h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="rh-cta rh-reveal">
        <div className="rh-cta-inner">
          <div className="rh-cta-orb rh-cta-orb-1"></div>
          <div className="rh-cta-orb rh-cta-orb-2"></div>
          <h2>Can't Find The Part You Need?</h2>
          <p>Tell us the model number and what's broken — we'll find the right part or tell you honestly if we can't.</p>
          <Link to="/contact" className="rh-btn rh-btn-primary">
            Contact Our Team
          </Link>
        </div>
      </section>

    </section>
  );
}