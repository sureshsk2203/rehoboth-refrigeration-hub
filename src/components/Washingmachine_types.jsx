// Washingmachine_types.jsx  |  src/components/Washingmachine_types.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Washingmachine_types.css";

const wmTypes = [
  { id: 1, name: "Fully Automatic Front Load Washing Machine", label: "FRONT LOAD", img: "/washingmachine/Fully Automatic Front Load Washing Machine.webp", bg: "#e8f1fb" },
  { id: 2, name: "Fully Automatic Top Load Washing Machine",   label: "TOP LOAD",   img: "/washingmachine/Fully Automatic Top Load Washing Machine.webp",  bg: "#e8f1fb" },
  { id: 3, name: "Semi Automatic Washing Machine",             label: "SEMI AUTO",  img: "/washingmachine/Semi Automatic Washing Machine.png",              bg: "#e8f1fb" },
  { id: 4, name: "Twin Tub Washing Machine",                   label: "TWIN TUB",   img: "/washingmachine/Twin Tub Washing Machine.webp",                   bg: "#e8f1fb" },
  { id: 5, name: "Washer Dryer Combo",                         label: "ALL-IN-ONE", img: "/washingmachine/Washer Dryer Combo.png",                          bg: "#e8f1fb" },
  { id: 6, name: "Industrial Washing Machine",                 label: "INDUSTRIAL", img: "/washingmachine/Industrial Washing Machine.webp",                 bg: "#e8f1fb" },
];

const looped = [...wmTypes, ...wmTypes, ...wmTypes];

export default function WashingMachineTypes() {
  const navigate    = useNavigate();
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const resumeTimer = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    wmTypes.forEach((_, i) =>
      setTimeout(() => setVisible(p => [...p, i]), i * 130)
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;

    const getSetW = () => {
      const cards = track.querySelectorAll(".wm-scard");
      if (cards.length < wmTypes.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[wmTypes.length - 1].getBoundingClientRect();
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
    const card  = track.querySelector(".wm-scard");
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

  const row1 = wmTypes.slice(0, 3);
  const row2 = wmTypes.slice(3, 6);

  return (
    <section className="wm-section">

      <button className="wm-back-btn" onClick={() => navigate("/categories")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Categories
      </button>

      <div className="wm-header">
        <p className="wm-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="wm-title">Washing Machine Types</h2>
        <p className="wm-sub">Choose the right washing machine for your needs</p>
      </div>

      <div className="wm-grid">
        {row1.map((wm, i) => (
          <div
            key={wm.id}
            className={`wm-jcard ${visible.includes(i) ? "wm-jcard--in" : ""}`}
            style={{ "--di": i }}
          >
            <p className="wm-jcard-label">{wm.label}</p>
            <div className="wm-jcard-imgwrap" style={{ background: wm.bg }}>
              <img src={wm.img} alt={wm.name} className="wm-jcard-img" style={{ "--fi": i }} />
            </div>
            <p className="wm-jcard-name">{wm.name}</p>
            <button className="wm-viewbtn" onClick={() => navigate("/wm-spareparts")}>Go to Spare Parts</button>
          </div>
        ))}
      </div>

      <div className="wm-grid wm-grid--center">
        {row2.map((wm, i) => (
          <div
            key={wm.id}
            className={`wm-jcard ${visible.includes(i + 3) ? "wm-jcard--in" : ""}`}
            style={{ "--di": i + 3 }}
          >
            <p className="wm-jcard-label">{wm.label}</p>
            <div className="wm-jcard-imgwrap" style={{ background: wm.bg }}>
              <img src={wm.img} alt={wm.name} className="wm-jcard-img" style={{ "--fi": i + 3 }} />
            </div>
            <p className="wm-jcard-name">{wm.name}</p>
            <button className="wm-viewbtn" onClick={() => navigate("/wm-spareparts")}>Go to Spare Parts</button>
          </div>
        ))}
      </div>

      <div className="wm-scroll-outer">
        <button className="wm-arrow wm-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="wm-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="wm-track" ref={trackRef}>
            {looped.map((wm, i) => (
              <div
                key={`s-${wm.id}-${i}`}
                className="wm-scard"
                style={{ "--si": i % wmTypes.length }}
              >
                <p className="wm-scard-label">{wm.label}</p>
                <div className="wm-scard-imgwrap" style={{ background: wm.bg }}>
                  <img src={wm.img} alt={wm.name} className="wm-scard-img" style={{ "--fi": i % wmTypes.length }} />
                </div>
                <p className="wm-scard-name">{wm.name}</p>
                <button className="wm-viewbtn wm-viewbtn--sm" onClick={() => navigate("/wm-spareparts")}>Go to Spare Parts</button>
              </div>
            ))}
          </div>
        </div>

        <button className="wm-arrow wm-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}