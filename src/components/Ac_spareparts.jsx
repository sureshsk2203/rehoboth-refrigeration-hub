// Ac_sparepart.jsx  |  src/components/Ac_spareparts.js
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Ac_spareparts.css";

const sections = [
  { id: "major", title: "Major Components", eyebrow: "CORE PARTS", items: [
      { id: 1,  name: "Compressor",          label: "HEART",      img: "/images/Compressor ac.png",                bg: "#e8f1fb" },
      
      { id: 3,  name: "Evaporator Coil",     label: "COOLING",    img: "/images/Evaporator Coil.png",              bg: "#e8f1fb" },
      { id: 4,  name: "Expansion Valve",     label: "FLOW",       img: "/images/Expansion Valve (TXV) ac.png",     bg: "#e8f1fb" },
      { id: 5,  name: "Capillary Tube",      label: "FLOW",       img: "/images/Capillary Tube Ac.webp",           bg: "#e8f1fb" },
      { id: 6,  name: "Accumulator",         label: "STORAGE",    img: "/images/Accumulator ac.png",              bg: "#e8f1fb" },
      { id: 7,  name: "Four Way Valve",      label: "CONTROL",    img: "/images/Four Way Valve.jpg",               bg: "#e8f1fb" },
      { id: 8,  name: "Service Valve",       label: "CONTROL",    img: "/images/Service Valve Ac.webp",            bg: "#e8f1fb" },
      { id: 9,  name: "Filter Drier",        label: "FILTER",     img: "/images/Filter Drier Ac.jpg",              bg: "#e8f1fb" },
  ]},
  { id: "electrical", title: "Electrical Parts", eyebrow: "ELECTRONICS", items: [
      { id: 10, name: "Capacitor",           label: "POWER",      img: "/images/Capacitor ac.png",                 bg: "#e8f1fb" },
      { id: 11, name: "Twopole Contactor",   label: "SWITCH",     img: "/images/Twopoll contactor.webp",           bg: "#e8f1fb" },
      { id: 12, name: "Relay",               label: "SWITCH",     img: "/images/Relay ac.webp",                    bg: "#e8f1fb" },
      { id: 13, name: "Overload Protector",  label: "SAFETY",     img: "/images/Overload Protector ac.jpg",        bg: "#e8f1fb" },
      { id: 14, name: "Thermostat",          label: "TEMP",       img: "/images/Thermostat ac.png",                bg: "#e8f1fb" },
      { id: 15, name: "Threepole Contactor", label: "SWITCH",     img: "/images/Threepole contactor.jpg",                bg: "#e8f1fb" },
      { id: 16, name: "PCB Control Board",   label: "BRAIN",      img: "/images/PCB Control Board ac.webp",        bg: "#e8f1fb" },
      { id: 17, name: "Display PCB",         label: "DISPLAY",    img: "/images/Display PCB ac.webp",              bg: "#e8f1fb" },
      { id: 18, name: "Circuit Breaker",     label: "SAFETY",     img: "/images/Circuit Breaker (MCB) ac.png",     bg: "#e8f1fb" },
      { id: 19, name: "Terminal Block",      label: "WIRING",     img: "/images/Terminal Block ac.png",            bg: "#e8f1fb" },
  ]},
  { id: "motors", title: "Motors & Fans", eyebrow: "AIRFLOW", items: [
      { id: 20, name: "Indoor Fan Motor",    label: "MOTOR",      img: "/images/Indoor Fan Motor ac.png",          bg: "#e8f1fb" },
      { id: 21, name: "Outdoor Fan Motor",   label: "MOTOR",      img: "/images/Outdoor Fan Motor.jpg",            bg: "#e8f1fb" },
     
      { id: 22, name: "Swing Motor",         label: "MOTOR",      img: "/images/Swing Motor.webp",                 bg: "#e8f1fb" },
      { id: 23, name: "Fan Blade",           label: "FAN",        img: "/images/Fan Blade.png",                    bg: "#e8f1fb" },
      { id: 24, name: "Cross Flow Fan",      label: "FAN",        img: "/images/Cross Flow Fan.webp",              bg: "#e8f1fb" },
  ]},
  { id: "sensors", title: "Sensors", eyebrow: "DETECTION", items: [
      { id: 25, name: "Coil Sensor",    label: "SENSOR",     img: "/images/Room Temperature Sensor.png",      bg: "#e8f1fb" },
      { id: 26, name: "Room Sensor",    label: "SENSOR",     img: "/images/Room Sensor.webp",      bg: "#e8f1fb" },

     
      
  ]},
  { id: "refrigeration", title: "Refrigeration Parts", eyebrow: "COOLING SYSTEM", items: [
      { id: 29, name: "Copper Pipe",         label: "PIPING",     img: "/images/Copper Pipe.png",                  bg: "#e8f1fb" },
      { id: 30, name: "Refrigerant Gas",     label: "GAS",        img: "/images/Refrigeration ac.webp",            bg: "#e8f1fb" },
      { id: 31, name: "Compressor Oil",      label: "LUBRICANT",  img: "/images/Compressor Oil.png",               bg: "#e8f1fb" },
      { id: 32, name: "Insulation Tube",     label: "INSULATION", img: "/images/Insulation Tube.png",              bg: "#e8f1fb" },
      { id: 33, name: "Drain Pipe",          label: "DRAINAGE",   img: "/images/Drain Pipe.webp",                  bg: "#e8f1fb" },
  ]},
  { id: "indoor", title: "Indoor Unit Parts", eyebrow: "INDOOR", items: [
      { id: 34, name: "Air Filter",          label: "FILTER",     img: "/images/Air Filter.png",                   bg: "#e8f1fb" },
      { id: 27, name: "Stiner",                  label: "COOLING",    img: "/images/Stiner.png",                       bg: "#e8f1fb" },
      
      { id: 35, name: "Front Panel",         label: "COVER",      img: "/images/Front Panel.png",                  bg: "#e8f1fb" },
      { id: 36, name: "Louver",              label: "AIRFLOW",    img: "/images/Louver.png",                       bg: "#e8f1fb" },
      { id: 37, name: "Air Swing Blade",     label: "AIRFLOW",    img: "/images/Air Swing Blade.png",              bg: "#e8f1fb" },
  ]},
  { id: "outdoor", title: "Outdoor Unit Parts", eyebrow: "OUTDOOR", items: [
      { id: 38, name: "Condenser Fan",       label: "FAN",        img: "/images/Condenser Fan.webp",               bg: "#e8f1fb" },
      { id: 39, name: "Fan Guard",           label: "SAFETY",     img: "/images/Fan Guard.jpg",                    bg: "#e8f1fb" },
      { id: 40, name: "Compressor Mount",    label: "MOUNT",      img: "/images/Compressor Mounting Rubber.jpg",   bg: "#e8f1fb" },
      { id: 41, name: "Outdoor Cabinet",     label: "HOUSING",    img: "/images/Outdoor Cabinet.webp",             bg: "#e8f1fb" },
      { id: 42, name: "Vibration Pad",       label: "MOUNT",      img: "/images/Vibration Pad.webp",               bg: "#e8f1fb" },
  ]},
  { id: "accessories", title: "Accessories", eyebrow: "ADD-ONS", items: [
      { id: 43, name: "Remote Control",      label: "CONTROL",    img: "/images/Remote Control.png",               bg: "#e8f1fb" },
      { id: 44, name: "Wall Mount Bracket",  label: "MOUNT",      img: "/images/Wall Mount Bracket.webp",          bg: "#e8f1fb" },
      { id: 45, name: "PVC Tape",            label: "INSULATION", img: "/images/PVC Tape.webp",                    bg: "#e8f1fb" },
      { id: 46, name: "Insulation Tape",     label: "INSULATION", img: "/images/Insulation Tape.webp",             bg: "#e8f1fb" },
  ]},
];

function ScrollRow({ items }) {
  const trackRef  = useRef(null);
  const posRef    = useRef(0);
  const rafRef    = useRef(null);
  const pausedRef = useRef(false);
  const manualRef = useRef(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.5;
    const getSetW = () => {
      const cards = track.querySelectorAll(".sp-scard");
      if (cards.length < items.length) return 0;
      const first = cards[0].getBoundingClientRect();
      const last  = cards[items.length - 1].getBoundingClientRect();
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
  }, [items.length]);

  const snapBy = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    manualRef.current = true;
    clearTimeout(resumeRef.current);
    const card = track.querySelector(".sp-scard");
    if (!card) return;
    const step = card.getBoundingClientRect().width + 18;
    const start = posRef.current;
    const target = start + (dir === "left" ? step : -step);
    const dur = 380, t0 = performance.now();
    const snap = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
      posRef.current = start + (target - start) * ease;
      track.style.transform = `translateX(${posRef.current}px)`;
      if (p < 1) requestAnimationFrame(snap);
      else resumeRef.current = setTimeout(() => { manualRef.current = false; }, 2500);
    };
    requestAnimationFrame(snap);
  }, []);

  const looped = [...items, ...items, ...items];
  return (
    <div className="sp-scroll-outer">
      <button className="sp-arrow sp-arrow--on" onClick={() => snapBy("left")} aria-label="left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div className="sp-track-outer" onMouseEnter={() => { pausedRef.current = true; }} onMouseLeave={() => { pausedRef.current = false; }}>
        <div className="sp-track" ref={trackRef}>
          {looped.map((item, i) => (
            <div key={`${item.id}-${i}`} className="sp-scard" style={{ "--fi": i % items.length }}>
              <p className="sp-scard-label">{item.label}</p>
              <div className="sp-scard-imgwrap" style={{ background: item.bg }}>
                <img src={item.img} alt={item.name} className="sp-scard-img" style={{ "--fi": i % items.length }} />
              </div>
              <p className="sp-scard-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="sp-arrow sp-arrow--on" onClick={() => snapBy("right")} aria-label="right">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

function SectionGrid({ items, visibleSet }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 4) rows.push(items.slice(i, i + 4));
  return (
    <>
      {rows.map((row, ri) => (
        <div key={ri} className="sp-grid">
          {row.map((item, ci) => {
            const globalIdx = ri * 4 + ci;
            return (
              <div key={item.id} className={`sp-jcard ${visibleSet.has(item.id) ? "sp-jcard--in" : ""}`} style={{ "--di": globalIdx }}>
                <p className="sp-jcard-label">{item.label}</p>
                <div className="sp-jcard-imgwrap" style={{ background: item.bg }}>
                  <img src={item.img} alt={item.name} className="sp-jcard-img" style={{ "--fi": globalIdx }} />
                </div>
                <p className="sp-jcard-name">{item.name}</p>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function AcSparepart() {
  const navigate = useNavigate();
  const [visibleSet, setVisibleSet] = useState(new Set());

  useEffect(() => {
    const allItems = sections.flatMap(s => s.items);
    allItems.forEach((item, i) => {
      setTimeout(() => { setVisibleSet(prev => new Set([...prev, item.id])); }, i * 60);
    });
  }, []);

  return (
    <section className="sp-section">
      <button className="sp-back-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </button>
      <div className="sp-header">
        <p className="sp-eyebrow">Rohoboth Refrigeration Hub</p>
        <h2 className="sp-title">AC Spare Parts</h2>
        <p className="sp-sub">Genuine parts for all AC types</p>
      </div>
      {sections.map((sec) => (
        <div key={sec.id} className="sp-section-block">
          <div className="sp-section-head">
            <span className="sp-section-eye">{sec.eyebrow}</span>
            <h3 className="sp-section-title">{sec.title}</h3>
          </div>
          <SectionGrid items={sec.items} visibleSet={visibleSet} />
          <ScrollRow items={sec.items} />
        </div>
      ))}
    </section>
  );
}