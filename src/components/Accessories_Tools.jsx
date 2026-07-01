// Accessories_Tools.jsx  |  src/components/Accessories_Tools.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Accessories_Tools.css";

const toolItems = [
  { id: 1,  name: "AC Covers",             label: "PROTECTION",  img: "/Accessories & Tools/AC covers.png",              bg: "#e8f1fb" },
  { id: 2,  name: "AC Valves",             label: "FITTING",     img: "/Accessories & Tools/AC valves.png",              bg: "#e8f1fb" },
  { id: 3,  name: "Brush",                 label: "CLEANING",    img: "/Accessories & Tools/Brush.png",                  bg: "#e8f1fb" },
  { id: 4,  name: "Clamp Meter",           label: "TESTING",     img: "/Accessories & Tools/Clamp meter.png",            bg: "#e8f1fb" },
  { id: 5,  name: "Double Vacuum Pump",    label: "TOOL",        img: "/Accessories & Tools/Double vaccum pump.webp",    bg: "#e8f1fb" },
  { id: 6,  name: "Drilling Machine",      label: "TOOL",        img: "/Accessories & Tools/Drilling machine.png",       bg: "#e8f1fb" },
  { id: 7,  name: "Dummy Nut",             label: "FITTING",     img: "/Accessories & Tools/Dummy nut.png",              bg: "#e8f1fb" },
  { id: 8,  name: "Flare Nut",             label: "FITTING",     img: "/Accessories & Tools/Flare Nut.jpg",              bg: "#e8f1fb" },
  { id: 9,  name: "Gas Torch",             label: "TOOL",        img: "/Accessories & Tools/Gas torch.png",              bg: "#e8f1fb" },
  { id: 10, name: "LGP Gas",              label: "TOOL",        img: "/Accessories & Tools/LGP gas.jpg",                bg: "#e8f1fb" },
  { id: 11, name: "Pressure Pump",         label: "TESTING",     img: "/Accessories & Tools/Pressure pump.png",          bg: "#e8f1fb" },
  { id: 12, name: "Service Cover",         label: "PROTECTION",  img: "/Accessories & Tools/Service cover.webp",         bg: "#e8f1fb" },
  { id: 13, name: "Single Wecamp",         label: "FITTING",     img: "/Accessories & Tools/Single Wecamp.png",          bg: "#e8f1fb" },
  { id: 14, name: "Spray Gun",             label: "TOOL",        img: "/Accessories & Tools/Spary Gun.webp",             bg: "#e8f1fb" },
  { id: 15, name: "Tool Bag",              label: "STORAGE",     img: "/Accessories & Tools/Tool bag.png",               bg: "#e8f1fb" },
  { id: 16, name: "Tube Cutter",           label: "TOOL",        img: "/Accessories & Tools/Tube cutter.webp",           bg: "#e8f1fb" },
  { id: 17, name: "Washing Machine Cover", label: "PROTECTION",  img: "/Accessories & Tools/Wachingmachinecover.webp",   bg: "#e8f1fb" },
  { id: 18, name: "Wires",                 label: "ELECTRICAL",  img: "/Accessories & Tools/Wires.png",                  bg: "#e8f1fb" },
];

const looped = [...toolItems, ...toolItems, ...toolItems];

/* ── Reusable grid: auto-splits into rows of 4, last row centered ── */
function ToolGrid({ items, visibleSet }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 4) rows.push(items.slice(i, i + 4));
  return (
    <>
      {rows.map((row, ri) => (
        <div key={ri} className="at-grid">
          {row.map((item, ci) => {
            const globalIdx = ri * 4 + ci;
            return (
              <div
                key={item.id}
                className={`at-jcard ${visibleSet.has(item.id) ? "at-jcard--in" : ""}`}
                style={{ "--di": globalIdx }}
              >
                <p className="at-jcard-label">{item.label}</p>
                <div className="at-jcard-imgwrap" style={{ background: item.bg }}>
                  <img src={item.img} alt={item.name} className="at-jcard-img" style={{ "--fi": globalIdx }} />
                </div>
                <p className="at-jcard-name">{item.name}</p>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function AccessoriesTools() {
  const navigate    = useNavigate();
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const resumeTimer = useRef(null);
  const [visibleSet, setVisibleSet] = useState(new Set());

  /* ── Staggered entrance ── */
  useEffect(() => {
    toolItems.forEach((item, i) =>
      setTimeout(() => setVisibleSet(prev => new Set([...prev, item.id])), i * 90)
    );
  }, []);

  /* ── Infinite auto-scroll ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;
    const getSetW = () => {
      const cards = track.querySelectorAll(".at-scard");
      if (cards.length < toolItems.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[toolItems.length - 1].getBoundingClientRect();
      const w = last.right - first.left;
      return w > 0 ? w : 0;
    };
    let setW = 0;
    let rafId;
    const startTimer = setTimeout(() => {
      const loop = () => {
        if (!pausedRef.current && !manualRef.current) {
          if (!setW) setW = getSetW();
          posRef.current -= SPEED;
          if (setW && Math.abs(posRef.current) >= setW) posRef.current += setW;
          track.style.transform = `translateX(${posRef.current}px)`;
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }, 150);
    rafRef.current = { cancel: () => { clearTimeout(startTimer); cancelAnimationFrame(rafId); } };
    return () => rafRef.current?.cancel();
  }, []);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  /* ── Arrow snap ── */
  const snapBy = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    manualRef.current = true;
    clearTimeout(resumeTimer.current);
    const card = track.querySelector(".at-scard");
    if (!card) return;
    const step   = card.getBoundingClientRect().width + 18;
    const start  = posRef.current;
    const target = start + (dir === "left" ? step : -step);
    const dur = 380, t0 = performance.now();
    const snap = (now) => {
      const p    = Math.min((now - t0) / dur, 1);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      posRef.current = start + (target - start) * ease;
      track.style.transform = `translateX(${posRef.current}px)`;
      if (p < 1) requestAnimationFrame(snap);
      else resumeTimer.current = setTimeout(() => { manualRef.current = false; }, 2500);
    };
    requestAnimationFrame(snap);
  }, []);

  return (
    <section className="at-section">

      <button className="at-back-btn" onClick={() => navigate("/categories")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Categories
      </button>

      <div className="at-header">
        <p className="at-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="at-title">Accessories &amp; Tools</h2>
        <p className="at-sub">Essential tools &amp; accessories for technicians</p>
      </div>

      {/* ── ALL 18 CARDS - auto grid ── */}
      <ToolGrid items={toolItems} visibleSet={visibleSet} />

      {/* ── SMOOTH INFINITE SCROLL ROW ── */}
      <div className="at-scroll-outer">
        <button className="at-arrow at-arrow--on" onClick={() => snapBy("left")} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="at-track-outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="at-track" ref={trackRef}>
            {looped.map((item, i) => (
              <div
                key={`s-${item.id}-${i}`}
                className="at-scard"
                style={{ "--si": i % toolItems.length }}
              >
                <p className="at-scard-label">{item.label}</p>
                <div className="at-scard-imgwrap" style={{ background: item.bg }}>
                  <img src={item.img} alt={item.name} className="at-scard-img"
                    style={{ "--fi": i % toolItems.length }} />
                </div>
                <p className="at-scard-name">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="at-arrow at-arrow--on" onClick={() => snapBy("right")} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

    </section>
  );
}