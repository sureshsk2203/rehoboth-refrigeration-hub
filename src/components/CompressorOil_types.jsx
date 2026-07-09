// CompressorOil_types.jsx  |  src/components/CompressorOil_types.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./CompressorOil_types.css";

const oilTypes = [
  { id: 1, name: "Mineral Oil",       label: "LUBRICANT", img: "/Compressor Oil/Mineral Oil.png",       bg: "#e8f1fb" },
  { id: 2, name: "POE Oil",           label: "LUBRICANT", img: "/Compressor Oil/POE Oil.png",           bg: "#e8f1fb" },
  { id: 3, name: "Synthetic Oil",     label: "LUBRICANT", img: "/Compressor Oil/Synthetic Oil.webp",    bg: "#e8f1fb" },
  { id: 4, name: "Alkyl Benzene Oil", label: "LUBRICANT", img: "/Compressor Oil/Alkyl Benzene Oil.jpg", bg: "#e8f1fb" },
  { id: 5, name: "PAG Oil",           label: "LUBRICANT", img: "/Compressor Oil/PAG Oil.png",           bg: "#e8f1fb" },
  { id: 6, name: "PAG Oil R134a",     label: "LUBRICANT", img: "/Compressor Oil/PAG Oil R134a.png",     bg: "#e8f1fb" },
  { id: 7, name: "Value Plus Oil",    label: "LUBRICANT", img: "/Compressor Oil/Value Plus Oil.png",    bg: "#e8f1fb" },
  { id: 8, name: "ARTI Care",         label: "LUBRICANT", img: "/Compressor Oil/ARTI Care.png",         bg: "#e8f1fb" },
];

const looped = [...oilTypes, ...oilTypes, ...oilTypes];

export default function CompressorOilTypes() {
  const navigate    = useNavigate();
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const resumeTimer = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    oilTypes.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;
    const getSetW = () => {
      const cards = track.querySelectorAll(".co-scard");
      if (cards.length < oilTypes.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[oilTypes.length - 1].getBoundingClientRect();
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
    const card  = track.querySelector(".co-scard");
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

  const row1 = oilTypes.slice(0, 4);
  const row2 = oilTypes.slice(4, 8);

  return (
    <section className="co-section">

      <button className="co-back-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>

      <div className="co-header">
        <p className="co-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="co-title">Compressor Oil Types</h2>
        <p className="co-sub">Choose the right lubricant for your compressor</p>
      </div>

      {/* ── ROW 1: 3 cards ── */}
      <div className="co-grid">
        {row1.map((oil, i) => (
          <div key={oil.id} className={`co-jcard ${visible.includes(i) ? "co-jcard--in" : ""}`} style={{ "--di": i }}>
            <p className="co-jcard-label">{oil.label}</p>
            <div className="co-jcard-imgwrap" style={{ background: oil.bg }}>
              <img src={oil.img} alt={oil.name} className="co-jcard-img" style={{ "--fi": i }} />
            </div>
            <p className="co-jcard-name">{oil.name}</p>
          </div>
        ))}
      </div>

      {/* ── ROW 2: 2 cards ── */}
      <div className="co-grid co-grid--center">
        {row2.map((oil, i) => (
          <div key={oil.id} className={`co-jcard ${visible.includes(i + 3) ? "co-jcard--in" : ""}`} style={{ "--di": i + 3 }}>
            <p className="co-jcard-label">{oil.label}</p>
            <div className="co-jcard-imgwrap" style={{ background: oil.bg }}>
              <img src={oil.img} alt={oil.name} className="co-jcard-img" style={{ "--fi": i + 3 }} />
            </div>
            <p className="co-jcard-name">{oil.name}</p>
          </div>
        ))}
      </div>

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="co-scroll-outer">
        <button className="co-arrow co-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="co-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="co-track" ref={trackRef}>
            {looped.map((oil, i) => (
              <div key={`s-${oil.id}-${i}`} className="co-scard" style={{ "--si": i % oilTypes.length }}>
                <p className="co-scard-label">{oil.label}</p>
                <div className="co-scard-imgwrap" style={{ background: oil.bg }}>
                  <img src={oil.img} alt={oil.name} className="co-scard-img" style={{ "--fi": i % oilTypes.length }} />
                </div>
                <p className="co-scard-name">{oil.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="co-arrow co-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}