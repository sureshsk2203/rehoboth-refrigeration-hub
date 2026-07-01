// Coolinggas_types.jsx  |  src/components/Coolinggas_types.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Coolinggas_types.css";

const gasTypes = [
  { id: 1, name: "R22",   label: "CLASSIC",      img: "/Coolinggas/R22.jpg",    bg: "#e8f1fb" },
  { id: 2, name: "R32",   label: "ECO FRIENDLY", img: "/Coolinggas/R32.png",    bg: "#e8f1fb" },
  { id: 3, name: "R134A", label: "AUTO & FRIDGE", img: "/Coolinggas/R134A.png", bg: "#e8f1fb" },
  { id: 4, name: "R410A", label: "POPULAR",      img: "/Coolinggas/R410A.webp", bg: "#e8f1fb" },
  { id: 5, name: "R407C", label: "COMMERCIAL",   img: "/Coolinggas/R407C.jpeg", bg: "#e8f1fb" },
  { id: 6, name: "R404A", label: "FREEZER",      img: "/Coolinggas/R404A.webp", bg: "#e8f1fb" },
  { id: 7, name: "R600A", label: "NATURAL",      img: "/Coolinggas/R600A.webp", bg: "#e8f1fb" },
  { id: 8, name: "R290",  label: "NATURAL",      img: "/Coolinggas/R290.png",   bg: "#e8f1fb" },

];

const looped = [...gasTypes, ...gasTypes, ...gasTypes];

export default function CoolinggasTypes() {
  const navigate    = useNavigate();
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const resumeTimer = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    gasTypes.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;
    const getSetW = () => {
      const cards = track.querySelectorAll(".cg-scard");
      if (cards.length < gasTypes.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[gasTypes.length - 1].getBoundingClientRect();
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
    const card  = track.querySelector(".cg-scard");
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

  const row1 = gasTypes.slice(0, 4);
  const row2 = gasTypes.slice(4, 8);

  return (
    <section className="cg-section">

      <button className="cg-back-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>

      <div className="cg-header">
        <p className="cg-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="cg-title">Cooling Gas Types</h2>
        <p className="cg-sub">Choose the right refrigerant for your system</p>
      </div>

      {/* ── ROW 1: 4 cards ── */}
      <div className="cg-grid">
        {row1.map((g, i) => (
          <div key={g.id} className={`cg-jcard ${visible.includes(i) ? "cg-jcard--in" : ""}`} style={{ "--di": i }}>
            <p className="cg-jcard-label">{g.label}</p>
            <div className="cg-jcard-imgwrap" style={{ background: g.bg }}>
              <img src={g.img} alt={g.name} className="cg-jcard-img" style={{ "--fi": i }} />
            </div>
            <p className="cg-jcard-name">{g.name}</p>
          </div>
        ))}
      </div>

      {/* ── ROW 2: 3 cards ── */}
      <div className="cg-grid cg-grid--center">
        {row2.map((g, i) => (
          <div key={g.id} className={`cg-jcard ${visible.includes(i + 4) ? "cg-jcard--in" : ""}`} style={{ "--di": i + 4 }}>
            <p className="cg-jcard-label">{g.label}</p>
            <div className="cg-jcard-imgwrap" style={{ background: g.bg }}>
              <img src={g.img} alt={g.name} className="cg-jcard-img" style={{ "--fi": i + 4 }} />
            </div>
            <p className="cg-jcard-name">{g.name}</p>
          </div>
        ))}
      </div>

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="cg-scroll-outer">
        <button className="cg-arrow cg-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="cg-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="cg-track" ref={trackRef}>
            {looped.map((g, i) => (
              <div key={`s-${g.id}-${i}`} className="cg-scard" style={{ "--si": i % gasTypes.length }}>
                <p className="cg-scard-label">{g.label}</p>
                <div className="cg-scard-imgwrap" style={{ background: g.bg }}>
                  <img src={g.img} alt={g.name} className="cg-scard-img" style={{ "--fi": i % gasTypes.length }} />
                </div>
                <p className="cg-scard-name">{g.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="cg-arrow cg-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}