// AcTypes.jsx  |  src/components/AcTypes.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Ac_types.css";

const acTypes = [
  { id: 1, name: "Split AC",      label: "MOST POPULAR",  img: "/images/Split AC.png",      bg: "#e8f1fb" },
  { id: 2, name: "Window AC",     label: "CLASSIC",       img: "/images/windows Ac.png",    bg: "#e8f1fb" },
  { id: 3, name: "Cassette AC",   label: "CEILING FIT",   img: "/images/Casstte Ac.png",    bg: "#e8f1fb" },
  { id: 4, name: "Tower AC",      label: "FLOOR STAND",   img: "/images/Tower Ac.jpg",      bg: "#e8f1fb" },
  { id: 5, name: "Commercial AC", label: "INDUSTRIAL",    img: "/images/Commercial Ac.webp",bg: "#e8f1fb" },
];

const looped = [...acTypes, ...acTypes, ...acTypes];

export default function AcTypes() {
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
    acTypes.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  // Continuous rAF scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;

    const getSetW = () => {
      const cards = track.querySelectorAll(".ac-scard");
      if (cards.length < acTypes.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[acTypes.length - 1].getBoundingClientRect();
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
    const card  = track.querySelector(".ac-scard");
    if (!card) return;
    const step  = card.getBoundingClientRect().width + 18;
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

  // Row 1: 3 cards, Row 2: 2 cards
  const row1 = acTypes.slice(0, 3);
  const row2 = acTypes.slice(3, 5);

  return (
    <section className="ac-section">

      {/* ── Back Button ── */}
      <button className="ac-back-btn" onClick={() => navigate("/categories")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Categories
      </button>

      <div className="ac-header">
        <p className="ac-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="ac-title">AC Types</h2>
        <p className="ac-sub">Choose the right air conditioner for your space</p>
      </div>

      {/* ── ROW 1: 3 cards ── */}
      <div className="ac-grid">
        {row1.map((ac, i) => (
          <div
            key={ac.id}
            className={`ac-jcard ${visible.includes(i) ? "ac-jcard--in" : ""}`}
            style={{ "--di": i }}
          >
            <p className="ac-jcard-label">{ac.label}</p>
            <div className="ac-jcard-imgwrap" style={{ background: ac.bg }}>
              <img src={ac.img} alt={ac.name} className="ac-jcard-img" style={{ "--fi": i }} />
            </div>
            <p className="ac-jcard-name">{ac.name}</p>
            <button className="ac-viewbtn" onClick={() => navigate("/ac-spareparts")}>Go to Spare Parts</button>
          </div>
        ))}
      </div>

      {/* ── ROW 2: 2 cards centered ── */}
      <div className="ac-grid ac-grid--center">
        {row2.map((ac, i) => (
          <div
            key={ac.id}
            className={`ac-jcard ${visible.includes(i + 3) ? "ac-jcard--in" : ""}`}
            style={{ "--di": i + 3 }}
          >
            <p className="ac-jcard-label">{ac.label}</p>
            <div className="ac-jcard-imgwrap" style={{ background: ac.bg }}>
              <img src={ac.img} alt={ac.name} className="ac-jcard-img" style={{ "--fi": i + 3 }} />
            </div>
            <p className="ac-jcard-name">{ac.name}</p>
            <button className="ac-viewbtn" onClick={() => navigate("/ac-spareparts")}>Go to Spare Parts</button>
          </div>
        ))}
      </div>

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="ac-scroll-outer">
        <button className="ac-arrow ac-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="ac-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="ac-track" ref={trackRef}>
            {looped.map((ac, i) => (
              <div
                key={`s-${ac.id}-${i}`}
                className="ac-scard"
                style={{ "--si": i % acTypes.length }}
              >
                <p className="ac-scard-label">{ac.label}</p>
                <div className="ac-scard-imgwrap" style={{ background: ac.bg }}>
                  <img src={ac.img} alt={ac.name} className="ac-scard-img" style={{ "--fi": i % acTypes.length }} />
                </div>
                <p className="ac-scard-name">{ac.name}</p>
                <button className="ac-viewbtn ac-viewbtn--sm" onClick={() => navigate("/ac-spareparts")}>Go to Spare Parts</button>
              </div>
            ))}
          </div>
        </div>

        <button className="ac-arrow ac-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}