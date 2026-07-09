// Categories.jsx  |  src/components/Categories.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const categories = [
  { id: 1, name: "Air Conditioners",    label: "COOLING",      img: "/images/AC.png",                  bg: "#e8f1fb", route: "/ac-types" },
  { id: 2, name: "Refrigerators",       label: "STORAGE",      img: "/images/Fridge.png",              bg: "#e8f1fb", route: "/fridge-types" },
  { id: 3, name: "Washing Machines",    label: "LAUNDRY",      img: "/images/Wachingmachine.png",      bg: "#e8f1fb", route: "/wm-types" },
  { id: 4, name: "Voltage Stabilizers", label: "PROTECTION",   img: "/images/Voltage Stabilizers.png", bg: "#e8f1fb", route: "/voltage-stabilizers" },
  { id: 5, name: "Cooling Gas",         label: "REFRIGERANTS", img: "/Coolinggas/R22.jpg",             bg: "#e8f1fb", route: "/cooling-gas" },
  { id: 6, name: "Refrigeration Oil",  label: "LUBRICANTS",   img: "/images/Refrigeration Oil.png",    bg: "#e8f1fb", route: "/compressoroil-types"},
  { id: 8, name: "RO Water Purifiers",  label: "PURE WATER",   img: "/Rowater/Storage Tank.jpeg",      bg: "#e8f1fb", route: "/ro-spareparts" },
  { id: 7, name: "Accessories & Tools", label: "SPARE PARTS",  img: "/images/Accessories & Tools.png", bg: "#e8f1fb", route: "/accessories-tools" },
];

const looped = [...categories, ...categories, ...categories];

export default function Categories() {
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);   // hover pause
  const manualRef   = useRef(false);   // manual arrow pause
  const resumeTimer = useRef(null);
  const navigate = useNavigate();
  const [visible, setVisible] = useState([]);

  // Stagger bounce-in for top grid
  useEffect(() => {
    categories.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  // ── Continuous rAF scroll ──────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.55;

    const getSetW = () => {
      const cards = track.querySelectorAll(".cs-scard");
      if (cards.length < categories.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[categories.length - 1].getBoundingClientRect();
      return last.right - first.left;
    };

    let setW = 0;

    const loop = () => {
      if (!pausedRef.current && !manualRef.current) {
        if (!setW) setW = getSetW();
        posRef.current -= SPEED;
        if (setW && Math.abs(posRef.current) >= setW) {
          posRef.current += setW;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Hover pause handlers ──────────────────────────────────────
  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  // ── Manual arrow snap ─────────────────────────────────────────
  const snapBy = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;

    manualRef.current = true;
    clearTimeout(resumeTimer.current);

    const card  = track.querySelector(".cs-scard");
    if (!card) return;
    const step  = card.getBoundingClientRect().width + 18;

    const start  = posRef.current;
    const target = start + (dir === "left" ? step : -step);
    const dur    = 380;
    const t0     = performance.now();

    const snap = (now) => {
      const p    = Math.min((now - t0) / dur, 1);
      const ease = p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
      posRef.current = start + (target - start) * ease;
      track.style.transform = `translateX(${posRef.current}px)`;
      if (p < 1) requestAnimationFrame(snap);
      else {
        resumeTimer.current = setTimeout(() => {
          manualRef.current = false;
        }, 2500);
      }
    };
    requestAnimationFrame(snap);
  }, []);

  const row1 = categories.slice(0, 4);
  const row2 = categories.slice(4, 8);

  return (
    <section className="cs-section">

      <div className="cs-header">
        <p className="cs-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="cs-title">Our Categories</h2>
      </div>

      {/* ── ROW 1: 4 cards ── */}
      <div className="cs-grid cs-grid--4">
        {row1.map((cat, i) => (
          <div
            key={cat.id}
            className={`cs-jcard ${visible.includes(i) ? "cs-jcard--in" : ""}`}
            style={{ "--di": i }}
          >
            <p className="cs-jcard-label">{cat.label}</p>
            <div className="cs-jcard-imgwrap" style={{ background: cat.bg }}>
              <img
                src={cat.img}
                alt={cat.name}
                className="cs-jcard-img"
                style={{ "--fi": i }}
              />
            </div>
            <p className="cs-jcard-name">{cat.name}</p>
            <button
              className="cs-viewbtn"
              onClick={() => cat.route && navigate(cat.route)}
            >View</button>
          </div>
        ))}
      </div>

      {/* ── ROW 2: 3 cards ── */}
      <div className="cs-grid cs-grid--3">
        {row2.map((cat, i) => (
          <div
            key={cat.id}
            className={`cs-jcard ${visible.includes(i + 4) ? "cs-jcard--in" : ""}`}
            style={{ "--di": i + 4 }}
          >
            <p className="cs-jcard-label">{cat.label}</p>
            <div className="cs-jcard-imgwrap" style={{ background: cat.bg }}>
              <img
                src={cat.img}
                alt={cat.name}
                className="cs-jcard-img"
                style={{ "--fi": i + 4 }}
              />
            </div>
            <p className="cs-jcard-name">{cat.name}</p>
            <button
              className="cs-viewbtn"
              onClick={() => cat.route && navigate(cat.route)}
            >View</button>
          </div>
        ))}
      </div>

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="cs-scroll-outer">
        <button className="cs-arrow cs-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div
          className="cs-track-outer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cs-track" ref={trackRef}>
            {looped.map((cat, i) => (
              <div
                key={`s-${cat.id}-${i}`}
                className="cs-scard"
                style={{ "--si": i % categories.length }}
              >
                <p className="cs-scard-label">{cat.label}</p>
                <div className="cs-scard-imgwrap" style={{ background: cat.bg }}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="cs-scard-img"
                    style={{ "--fi": i % categories.length }}
                  />
                </div>
                <p className="cs-scard-name">{cat.name}</p>
                <button
                  className="cs-viewbtn cs-viewbtn--sm"
                  onClick={() => cat.route && navigate(cat.route)}
                >View</button>
              </div>
            ))}
          </div>
        </div>

        <button className="cs-arrow cs-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}