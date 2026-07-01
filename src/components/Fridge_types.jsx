// Fridge.jsx  |  src/components/Fridge.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Fridge_types.css";

const fridgeTypes = [
  { id: 1, name: "Single Door Refrigerator",    label: "CLASSIC",      img: "/images/Single Door Refrigerator.png",    bg: "#e8f1fb" },
  { id: 2, name: "Double Door Refrigerator",    label: "POPULAR",      img: "/images/Double Door Refrigerator.png",    bg: "#e8f1fb" },
  { id: 3, name: "Triple Door Refrigerator",    label: "PREMIUM",      img: "/images/Triple Door Refrigerator.webp",   bg: "#e8f1fb" },
  { id: 4, name: "Side-by-Side Refrigerator",   label: "LUXURY",       img: "/images/Side-by-Side Refrigerator.webp",  bg: "#e8f1fb" },
  { id: 5, name: "Deep Freezer",                label: "FREEZING",     img: "/images/Deep Freezer.png",                bg: "#e8f1fb" },
  { id: 6, name: "Commercial Refrigerator",     label: "INDUSTRIAL",   img: "/images/Commercial Refrigerator.webp",    bg: "#e8f1fb" },
  { id: 7, name: "Water Cooler",                label: "COOLING",      img: "/images/Water Cooler.png",                bg: "#e8f1fb" },
];

const looped = [...fridgeTypes, ...fridgeTypes, ...fridgeTypes];

export default function Fridge() {
  const navigate    = useNavigate();
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const resumeTimer = useRef(null);
  const [visible, setVisible] = useState([]);

  // Stagger bounce-in
  useEffect(() => {
    fridgeTypes.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  // Continuous rAF scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;
    const getSetW = () => {
      const cards = track.querySelectorAll(".fr-scard");
      if (cards.length < fridgeTypes.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[fridgeTypes.length - 1].getBoundingClientRect();
      return last.right - first.left;
    };
    let setW = 0;
    const loop = () => {
      if (!pausedRef.current && !manualRef.current) {
        if (!setW) setW = getSetW();
        posRef.current -= SPEED;
        if (setW && Math.abs(posRef.current) >= setW) posRef.current += setW;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  const snapBy = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    manualRef.current = true;
    clearTimeout(resumeTimer.current);
    const card = track.querySelector(".fr-scard");
    if (!card) return;
    const step = card.getBoundingClientRect().width + 18;
    const start  = posRef.current;
    const target = start + (dir === "left" ? step : -step);
    const dur = 380, t0 = performance.now();
    const snap = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
      posRef.current = start + (target - start) * ease;
      track.style.transform = `translateX(${posRef.current}px)`;
      if (p < 1) requestAnimationFrame(snap);
      else resumeTimer.current = setTimeout(() => { manualRef.current = false; }, 2500);
    };
    requestAnimationFrame(snap);
  }, []);

  // Row 1: 4 cards, Row 2: 3 cards
  const row1 = fridgeTypes.slice(0, 4);
  const row2 = fridgeTypes.slice(4, 7);

  return (
    <section className="fr-section">

      {/* ── Back Button ── */}
      <button className="fr-back-btn" onClick={() => navigate("/categories")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>

      {/* ── Page Header ── */}
      <div className="fr-header">
        <p className="fr-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="fr-title">Fridge Types</h2>
        <p className="fr-sub">Choose the right refrigerator for your needs</p>
      </div>

      {/* ── ROW 1: 4 cards ── */}
      <div className="fr-grid">
        {row1.map((fr, i) => (
          <div
            key={fr.id}
            className={`fr-jcard ${visible.includes(i) ? "fr-jcard--in" : ""}`}
            style={{ "--di": i }}
          >
            <p className="fr-jcard-label">{fr.label}</p>
            <div className="fr-jcard-imgwrap" style={{ background: fr.bg }}>
              <img src={fr.img} alt={fr.name} className="fr-jcard-img" style={{ "--fi": i }} />
            </div>
            <p className="fr-jcard-name">{fr.name}</p>
            <button className="fr-viewbtn" onClick={() => navigate("/fridge-spareparts")}>
              Go to Spare Parts
            </button>
          </div>
        ))}
      </div>

      {/* ── ROW 2: 3 cards ── */}
      <div className="fr-grid fr-grid--center">
        {row2.map((fr, i) => (
          <div
            key={fr.id}
            className={`fr-jcard ${visible.includes(i + 4) ? "fr-jcard--in" : ""}`}
            style={{ "--di": i + 4 }}
          >
            <p className="fr-jcard-label">{fr.label}</p>
            <div className="fr-jcard-imgwrap" style={{ background: fr.bg }}>
              <img src={fr.img} alt={fr.name} className="fr-jcard-img" style={{ "--fi": i + 4 }} />
            </div>
            <p className="fr-jcard-name">{fr.name}</p>
            <button className="fr-viewbtn" onClick={() => navigate("/fridge-spareparts")}>
              Go to Spare Parts
            </button>
          </div>
        ))}
      </div>

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="fr-scroll-outer">
        <button className="fr-arrow fr-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="fr-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="fr-track" ref={trackRef}>
            {looped.map((fr, i) => (
              <div
                key={`s-${fr.id}-${i}`}
                className="fr-scard"
                style={{ "--si": i % fridgeTypes.length }}
              >
                <p className="fr-scard-label">{fr.label}</p>
                <div className="fr-scard-imgwrap" style={{ background: fr.bg }}>
                  <img src={fr.img} alt={fr.name} className="fr-scard-img" style={{ "--fi": i % fridgeTypes.length }} />
                </div>
                <p className="fr-scard-name">{fr.name}</p>
                <button className="fr-viewbtn fr-viewbtn--sm" onClick={() => navigate("/fridge-spareparts")}>
                  Go to Spare Parts
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="fr-arrow fr-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}