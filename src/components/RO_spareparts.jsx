// RO_spareparts.jsx  |  src/components/RO_spareparts.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./RO_spareparts.css";

const sections = [
  {
    id: "filters",
    title: "Filters & Membranes",
    eyebrow: "FILTRATION",
    items: [
      { id: 1,  name: "RO Membrane",        label: "MEMBRANE",  img: "/Rowater/RO Membrane.webp",        bg: "#e8f1fb" },
      { id: 2,  name: "UF Membrane",        label: "MEMBRANE",  img: "/Rowater/UF Membrane.webp",        bg: "#e8f1fb" },
      { id: 3,  name: "Sediment Filter",    label: "FILTER",    img: "/Rowater/Sediment Filter.png",     bg: "#e8f1fb" },
      { id: 4,  name: "Carbon Filter",      label: "FILTER",    img: "/Rowater/Carbon Filter.jpg",       bg: "#e8f1fb" },
      { id: 5,  name: "Post Carbon Filter", label: "FILTER",    img: "/Rowater/Post Carbon Filter.webp", bg: "#e8f1fb" },
      { id: 6,  name: "Inline Filter",      label: "FILTER",    img: "/Rowater/Inline Filter.png",       bg: "#e8f1fb" },
      { id: 7,  name: "Mineral Cartridge",  label: "CARTRIDGE", img: "/Rowater/Mineral Cartridge.png",   bg: "#e8f1fb" },
      { id: 8,  name: "Alkaline Cartridge", label: "CARTRIDGE", img: "/Rowater/Alkaline Cartridge.webp", bg: "#e8f1fb" },
    ],
  },
  {
    id: "pump",
    title: "Pump & Motor Parts",
    eyebrow: "PUMP SYSTEM",
    items: [
      { id: 10, name: "Booster Pump", label: "PUMP",  img: "/Rowater/Booster Pump.png", bg: "#e8f1fb" },
      
      { id: 12, name: "Pump Adapter", label: "PUMP",  img: "/Rowater/Pump Adapter.jpg", bg: "#e8f1fb" },
      { id: 13, name: "Pump Motor",   label: "MOTOR", img: "/Rowater/Pump Motor.jpg",   bg: "#e8f1fb" },
    ],
  },
  {
    id: "electrical",
    title: "Electrical Parts",
    eyebrow: "ELECTRONICS",
    items: [
      { id: 14, name: "SMPS Power Supply", label: "POWER",  img: "/Rowater/SMPS Power Supply.png", bg: "#e8f1fb" },
     
      { id: 16, name: "Wiring Harness",    label: "WIRING", img: "/Rowater/Wiring Harness.webp",   bg: "#e8f1fb" },
      { id: 17, name: "Fuse",              label: "SAFETY", img: "/Rowater/Fuse.png",              bg: "#e8f1fb" },
      
    ],
  },
  {
    id: "valves",
    title: "Valves & Switches",
    eyebrow: "FLOW CONTROL",
    items: [
      { id: 19, name: "Solenoid Valve",      label: "VALVE",  img: "/Rowater/Solenoid Valve.png",       bg: "#e8f1fb" },
      { id: 20, name: "Float Valve",         label: "VALVE",  img: "/Rowater/Float Valve.png",          bg: "#e8f1fb" },
      { id: 21, name: "Check Valve (NRV)",   label: "VALVE",  img: "/Rowater/Check Valve (NRV).webp",   bg: "#e8f1fb" },
      { id: 22, name: "Pressure Switch",     label: "SWITCH", img: "/Rowater/Pressure Switch.webp",     bg: "#e8f1fb" },
      { id: 23, name: "High Pressure Switch",label: "SWITCH", img: "/Rowater/High Pressure Switch.png", bg: "#e8f1fb" },
      
    ],
  },

  {
    id: "housing",
    title: "Housing & Storage Parts",
    eyebrow: "STORAGE",
    items: [
      { id: 28, name: "Filter Housing", label: "HOUSING", img: "/Rowater/Filter Housing.png",  bg: "#e8f1fb" },
      { id: 29, name: "Housing Wrench", label: "TOOL",     img: "/Rowater/Housing Wrench.png", bg: "#e8f1fb" },
     
      { id: 31, name: "Tank Ball Valve",label: "VALVE",    img: "/Rowater/Tank Ball Valve.png",bg: "#e8f1fb" },
      { id: 32, name: "Tank Air Valve", label: "VALVE",    img: "/Rowater/Tank Air Valve.webp",bg: "#e8f1fb" },
    ],
  },
  {
    id: "outlet",
    title: "Outlet Parts",
    eyebrow: "OUTLET",
    items: [
    
      { id: 34, name: "Water Tap",       label: "TAP",       img: "/Rowater/Water Tap.webp",       bg: "#e8f1fb" },
      { id: 35, name: "Elbow Connector", label: "CONNECTOR", img: "/Rowater/Elbow Connector.webp", bg: "#e8f1fb" },
      { id: 36, name: "Tee Connector",   label: "CONNECTOR", img: "/Rowater/Tee Connector.webp",   bg: "#e8f1fb" },
      { id: 37, name: "RO Tube Pipe",    label: "PIPING",    img: "/Rowater/RO Tube Pipe.jpg",     bg: "#e8f1fb" },
    ],
  },
];

function ScrollRow({ items }) {
  const trackRef = useRef(null), posRef = useRef(0), rafRef = useRef(null);
  const pausedRef = useRef(false), manualRef = useRef(false), resumeRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const getSetW = () => {
      const cards = track.querySelectorAll(".ro-scard");
      if (cards.length < items.length) return 0;
      return cards[items.length-1].getBoundingClientRect().right - cards[0].getBoundingClientRect().left;
    };
    let setW = 0;
    const loop = () => {
      if (!pausedRef.current && !manualRef.current) {
        if (!setW) setW = getSetW();
        posRef.current -= 0.5;
        if (setW && Math.abs(posRef.current) >= setW) posRef.current += setW;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length]);

  const snapBy = useCallback((dir) => {
    const track = trackRef.current; if (!track) return;
    manualRef.current = true; clearTimeout(resumeRef.current);
    const card = track.querySelector(".ro-scard"); if (!card) return;
    const step = card.getBoundingClientRect().width + 18, start = posRef.current;
    const target = start + (dir === "left" ? step : -step), dur = 380, t0 = performance.now();
    const snap = (now) => {
      const p = Math.min((now-t0)/dur,1), ease = p<0.5?2*p*p:-1+(4-2*p)*p;
      posRef.current = start+(target-start)*ease;
      track.style.transform = `translateX(${posRef.current}px)`;
      if (p<1) requestAnimationFrame(snap);
      else resumeRef.current = setTimeout(()=>{manualRef.current=false;},2500);
    };
    requestAnimationFrame(snap);
  }, []);

  const looped = [...items, ...items, ...items];
  return (
    <div className="ro-scroll-outer">
      <button className="ro-arrow ro-arrow--on" onClick={() => snapBy("left")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div className="ro-track-outer" onMouseEnter={()=>{pausedRef.current=true;}} onMouseLeave={()=>{pausedRef.current=false;}}>
        <div className="ro-track" ref={trackRef}>
          {looped.map((item,i) => (
            <div key={`${item.id}-${i}`} className="ro-scard" style={{"--fi":i%items.length}}>
              <p className="ro-scard-label">{item.label}</p>
              <div className="ro-scard-imgwrap" style={{background:item.bg}}>
                <img src={item.img} alt={item.name} className="ro-scard-img" style={{"--fi":i%items.length}}/>
              </div>
              <p className="ro-scard-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="ro-arrow ro-arrow--on" onClick={() => snapBy("right")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

function SectionGrid({ items, visibleSet }) {
  const rows = [];
  for (let i=0;i<items.length;i+=4) rows.push(items.slice(i,i+4));
  return (
    <>
      {rows.map((row,ri) => (
        <div key={ri} className="ro-grid">
          {row.map((item,ci) => {
            const g = ri*4+ci;
            return (
              <div key={item.id} className={`ro-jcard ${visibleSet.has(item.id) ? "ro-jcard--in" : ""}`} style={{"--di":g}}>
                <p className="ro-jcard-label">{item.label}</p>
                <div className="ro-jcard-imgwrap" style={{background:item.bg}}>
                  <img src={item.img} alt={item.name} className="ro-jcard-img" style={{"--fi":g}}/>
                </div>
                <p className="ro-jcard-name">{item.name}</p>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function RoSpareparts() {
  const navigate = useNavigate();
  const [visibleSet, setVisibleSet] = useState(new Set());

  useEffect(() => {
    const allItems = sections.flatMap(s => s.items);
    allItems.forEach((item, i) => {
      setTimeout(() => setVisibleSet(prev => new Set([...prev, item.id])), i * 50);
    });
  }, []);

  return (
    <section className="ro-section">
      <button className="ro-back-btn" onClick={() => navigate("/categories")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Categories
      </button>

      <div className="ro-header">
        <p className="ro-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="ro-title">RO Water Purifier Spare Parts</h2>
        <p className="ro-sub">Genuine parts for all RO water purifier types</p>
      </div>

      {sections.map((sec) => (
        <div key={sec.id} className="ro-section-block">
          <div className="ro-section-head">
            <span className="ro-section-eye">{sec.eyebrow}</span>
            <h3 className="ro-section-title">{sec.title}</h3>
          </div>
          <SectionGrid items={sec.items} visibleSet={visibleSet} />
          <ScrollRow items={sec.items} />
        </div>
      ))}
    </section>
  );
}