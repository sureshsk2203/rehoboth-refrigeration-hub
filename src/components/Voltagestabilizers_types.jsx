// Voltagestabilizers_types.jsx  |  src/components/Voltagestabilizers_types.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Voltagestabilizers_types.css";

const stabTypes = [
  { id: 1, name: "AC Stabilizer",              label: "COOLING",      img: "/Voltage_stabilizers/AC Stabilizer.png",               bg: "#e8f1fb" },
  { id: 2, name: "Refrigerator Stabilizer",    label: "FRIDGE",       img: "/Voltage_stabilizers/Refrigerator Stabilizer.jpg",      bg: "#e8f1fb" },
  { id: 3, name: "Washing Machine Stabilizer", label: "LAUNDRY",      img: "/Voltage_stabilizers/Washing Machine Stabilizer.jpg",   bg: "#e8f1fb" },
  { id: 4, name: "Main Line Stabilizer",       label: "MAIN LINE",    img: "/Voltage_stabilizers/Main Line Stabilizer.png",         bg: "#e8f1fb" },
  { id: 5, name: "Servo Stabilizer",           label: "SERVO",        img: "/Voltage_stabilizers/Servo Stabilizer.png",             bg: "#e8f1fb" },
];

const looped = [...stabTypes, ...stabTypes, ...stabTypes];

export default function VoltagestabilizersTypes() {
  const navigate    = useNavigate();
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const resumeTimer = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    stabTypes.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;
    const getSetW = () => {
      const cards = track.querySelectorAll(".vs-scard");
      if (cards.length < stabTypes.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[stabTypes.length - 1].getBoundingClientRect();
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
    const card = track.querySelector(".vs-scard");
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

  // Row 1: 3 cards, Row 2: 2 cards
  const row1 = stabTypes.slice(0, 3);
  const row2 = stabTypes.slice(3, 5);

  return (
    <section className="vs-section">

      {/* ── Back Button ── */}
      <button className="vs-back-btn" onClick={() => navigate("/categories")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>

      {/* ── Header ── */}
      <div className="vs-header">
        <p className="vs-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="vs-title">Voltage Stabilizers</h2>
        <p className="vs-sub">Choose the right stabilizer for your appliance</p>
      </div>

      {/* ── ROW 1: 3 cards ── */}
      <div className="vs-grid">
        {row1.map((s, i) => (
          <div
            key={s.id}
            className={`vs-jcard ${visible.includes(i) ? "vs-jcard--in" : ""}`}
            style={{ "--di": i }}
          >
            <p className="vs-jcard-label">{s.label}</p>
            <div className="vs-jcard-imgwrap" style={{ background: s.bg }}>
              <img src={s.img} alt={s.name} className="vs-jcard-img" style={{ "--fi": i }} />
            </div>
            <p className="vs-jcard-name">{s.name}</p>
            <button className="vs-viewbtn" onClick={() => navigate("/voltage-spareparts")}>Go to Spare Parts</button>
          </div>
        ))}
      </div>

      {/* ── ROW 2: 2 cards ── */}
      <div className="vs-grid vs-grid--center">
        {row2.map((s, i) => (
          <div
            key={s.id}
            className={`vs-jcard ${visible.includes(i + 3) ? "vs-jcard--in" : ""}`}
            style={{ "--di": i + 3 }}
          >
            <p className="vs-jcard-label">{s.label}</p>
            <div className="vs-jcard-imgwrap" style={{ background: s.bg }}>
              <img src={s.img} alt={s.name} className="vs-jcard-img" style={{ "--fi": i + 3 }} />
            </div>
            <p className="vs-jcard-name">{s.name}</p>
            <button className="vs-viewbtn" onClick={() => navigate("/voltage-spareparts")}>Go to Spare Parts</button>
          </div>
        ))}
      </div>

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="vs-scroll-outer">
        <button className="vs-arrow vs-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="vs-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="vs-track" ref={trackRef}>
            {looped.map((s, i) => (
              <div
                key={`s-${s.id}-${i}`}
                className="vs-scard"
                style={{ "--si": i % stabTypes.length }}
              >
                <p className="vs-scard-label">{s.label}</p>
                <div className="vs-scard-imgwrap" style={{ background: s.bg }}>
                  <img src={s.img} alt={s.name} className="vs-scard-img" style={{ "--fi": i % stabTypes.length }} />
                </div>
                <p className="vs-scard-name">{s.name}</p>
                <button className="vs-viewbtn vs-viewbtn--sm" onClick={() => navigate("/voltage-spareparts")}>Go to Spare Parts</button>
              </div>
            ))}
          </div>
        </div>

        <button className="vs-arrow vs-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}