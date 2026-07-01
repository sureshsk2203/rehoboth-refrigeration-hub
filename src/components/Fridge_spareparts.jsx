import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Fridge_spareparts.css";

const sections = [
  { id: "cooling", title: "Cooling System", eyebrow: "REFRIGERATION", items: [
    { id: 1,  name: "Compressor",          label: "HEART",      img: "/images/Compressor fridge.png",          bg: "#e8f1fb" },
    { id: 2,  name: "Condenser Coil",      label: "COOLING",    img: "/images/Condenser Coil fridge.png",      bg: "#e8f1fb" },
    { id: 3,  name: "Evaporator Coil",     label: "COOLING",    img: "/images/Evaporator Coil fridge.png",     bg: "#e8f1fb" },
    { id: 4,  name: "Capillary Tube",      label: "FLOW",       img: "/images/Capillary Tube fridge.jpg",      bg: "#e8f1fb" },
    { id: 5,  name: "Filter Drier",        label: "FILTER",     img: "/images/Filter Drier fridge.png",        bg: "#e8f1fb" },
    { id: 6,  name: "Refrigerant Gas",     label: "GAS",        img: "/images/Refrigerant Gas fridge.webp",    bg: "#e8f1fb" },
    { id: 7,  name: "Compressor Oil",      label: "LUBRICANT",  img: "/images/Compressor Oil.png",             bg: "#e8f1fb" },
    { id: 8,  name: "Suction Line",        label: "PIPING",     img: "/images/Suction Line fridge.webp",       bg: "#e8f1fb" },
    { id: 9,  name: "Discharge Line",      label: "PIPING",     img: "/images/Copper Pipe.png",                bg: "#e8f1fb" },
    { id: 10, name: "Cooling Gas",         label: "GAS",        img: "/images/R290.png",                bg: "#e8f1fb" },
  ]},
  { id: "electrical", title: "Electrical Parts", eyebrow: "ELECTRONICS", items: [
    { id: 11, name: "Thermostat",          label: "TEMP",       img: "/images/Thermostat fridge.jpg",          bg: "#e8f1fb" },
    { id: 12, name: "PCB Control Board",   label: "BRAIN",      img: "/images/PCB Control Board fridge.png",   bg: "#e8f1fb" },
    { id: 13, name: "Relay",               label: "SWITCH",     img: "/images/Relay fridge.webp",              bg: "#e8f1fb" },
    { id: 14, name: "Overload Protector",  label: "SAFETY",     img: "/images/Overload Protector fridge.webp", bg: "#e8f1fb" },
    { id: 15, name: "Temperature Sensor",  label: "SENSOR",     img: "/images/Temperature Sensor fridge.png",  bg: "#e8f1fb" },
    { id: 16, name: "Defrost Sensor",      label: "SENSOR",     img: "/images/Defrost Sensor fridge.png",      bg: "#e8f1fb" },
    { id: 17, name: "Capacitor",           label: "POWER",      img: "/images/Capacitor fridge.webp",          bg: "#e8f1fb" },
  ]},
  { id: "fan", title: "Fan Components", eyebrow: "AIRFLOW", items: [
    { id: 18, name: "Evaporator Fan Motor",label: "MOTOR",      img: "/images/Evaporator Fan Motor fridge.webp",bg: "#e8f1fb" },
    { id: 19, name: "Condenser Fan Motor", label: "MOTOR",      img: "/images/Condenser Fan Motor.webp",       bg: "#e8f1fb" },
    { id: 20, name: "Fan Blade",           label: "FAN",        img: "/images/Fan Blade.png",                  bg: "#e8f1fb" },
  ]},
  { id: "door", title: "Door Parts", eyebrow: "DOOR", items: [
    { id: 21, name: "Door Gasket",         label: "SEAL",       img: "/images/Door Gasket fridge.webp",        bg: "#e8f1fb" },
    { id: 22, name: "Door Handle",         label: "HANDLE",     img: "/images/Door Handle.png",                bg: "#e8f1fb" },
    { id: 23, name: "Door Switch",         label: "SWITCH",     img: "/images/Door Switch fridge.webp",        bg: "#e8f1fb" },
    { id: 24, name: "Door Hinge",          label: "HINGE",      img: "/images/Door Hinge fridge.png",          bg: "#e8f1fb" },
  ]},
  { id: "interior", title: "Interior Parts", eyebrow: "INTERIOR", items: [
    { id: 25, name: "Vegetable Box",       label: "STORAGE",    img: "/images/Vegetable Box fridge.webp",      bg: "#e8f1fb" },
    { id: 26, name: "Door Shelf",          label: "SHELF",      img: "/images/Door Shelf.png",                 bg: "#e8f1fb" },
    { id: 27, name: "Bottle Rack",         label: "RACK",       img: "/images/Bottle Rack.webp",               bg: "#e8f1fb" },
    { id: 28, name: "Ice Tray",            label: "ICE",        img: "/images/Ice Tray.webp",                  bg: "#e8f1fb" },
    { id: 29, name: "Egg Tray",            label: "STORAGE",    img: "/images/Egg Tray.webp",                  bg: "#e8f1fb" },
  ]},
  { id: "lighting", title: "Lighting & Display", eyebrow: "DISPLAY", items: [
    { id: 30, name: "LED Lamp",            label: "LIGHTING",   img: "/images/LED Lamp.jpg",                   bg: "#e8f1fb" },
    { id: 31, name: "LED Lamp",            label: "LIGHTING",   img: "/images/Wireless LED.png",                   bg: "#e8f1fb" },
  ]},
];

function ScrollRow({ items }) {
  const trackRef = useRef(null), posRef = useRef(0), rafRef = useRef(null);
  const pausedRef = useRef(false), manualRef = useRef(false), resumeRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const getSetW = () => { const cards = track.querySelectorAll(".fsp-scard"); if (cards.length < items.length) return 0; return cards[items.length-1].getBoundingClientRect().right - cards[0].getBoundingClientRect().left; };
    let setW = 0;
    const loop = () => { if (!pausedRef.current && !manualRef.current) { if (!setW) setW = getSetW(); posRef.current -= 0.5; if (setW && Math.abs(posRef.current) >= setW) posRef.current += setW; track.style.transform = `translateX(${posRef.current}px)`; } rafRef.current = requestAnimationFrame(loop); };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length]);
  const snapBy = useCallback((dir) => {
    const track = trackRef.current; if (!track) return;
    manualRef.current = true; clearTimeout(resumeRef.current);
    const card = track.querySelector(".fsp-scard"); if (!card) return;
    const step = card.getBoundingClientRect().width + 18, start = posRef.current, target = start + (dir === "left" ? step : -step), dur = 380, t0 = performance.now();
    const snap = (now) => { const p = Math.min((now-t0)/dur,1), ease = p<0.5?2*p*p:-1+(4-2*p)*p; posRef.current = start+(target-start)*ease; track.style.transform = `translateX(${posRef.current}px)`; if (p<1) requestAnimationFrame(snap); else resumeRef.current = setTimeout(()=>{manualRef.current=false;},2500); };
    requestAnimationFrame(snap);
  }, []);
  const looped = [...items,...items,...items];
  return (
    <div className="fsp-scroll-outer">
      <button className="fsp-arrow fsp-arrow--on" onClick={() => snapBy("left")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
      <div className="fsp-track-outer" onMouseEnter={()=>{pausedRef.current=true;}} onMouseLeave={()=>{pausedRef.current=false;}}>
        <div className="fsp-track" ref={trackRef}>
          {looped.map((item,i) => (
            <div key={`${item.id}-${i}`} className="fsp-scard" style={{"--fi":i%items.length}}>
              <p className="fsp-scard-label">{item.label}</p>
              <div className="fsp-scard-imgwrap" style={{background:item.bg}}><img src={item.img} alt={item.name} className="fsp-scard-img" style={{"--fi":i%items.length}}/></div>
              <p className="fsp-scard-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="fsp-arrow fsp-arrow--on" onClick={() => snapBy("right")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
  );
}

function SectionGrid({ items, visibleSet }) {
  const rows = []; for (let i=0;i<items.length;i+=4) rows.push(items.slice(i,i+4));
  return (<>{rows.map((row,ri) => (<div key={ri} className="fsp-grid">{row.map((item,ci) => { const g=ri*4+ci; return (<div key={item.id} className={`fsp-jcard ${visibleSet.has(item.id)?"fsp-jcard--in":""}`} style={{"--di":g}}><p className="fsp-jcard-label">{item.label}</p><div className="fsp-jcard-imgwrap" style={{background:item.bg}}><img src={item.img} alt={item.name} className="fsp-jcard-img" style={{"--fi":g}}/></div><p className="fsp-jcard-name">{item.name}</p></div>); })}</div>))}</>);
}

export default function FridgeSpareparts() {
  const navigate = useNavigate();
  const [visibleSet, setVisibleSet] = useState(new Set());
  useEffect(() => { const all = sections.flatMap(s=>s.items); all.forEach((item,i)=>setTimeout(()=>setVisibleSet(prev=>new Set([...prev,item.id])),i*60)); },[]);
  return (
    <section className="fsp-section">
      <button className="fsp-back-btn" onClick={()=>navigate(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
      <div className="fsp-header"><p className="fsp-eyebrow">Rohoboth Refrigeration Hub</p><h2 className="fsp-title">Refrigerator Spare Parts</h2><p className="fsp-sub">Genuine parts for all refrigerator types</p></div>
      {sections.map(sec => (
        <div key={sec.id} className="fsp-section-block">
          <div className="fsp-section-head"><span className="fsp-section-eye">{sec.eyebrow}</span><h3 className="fsp-section-title">{sec.title}</h3></div>
          <SectionGrid items={sec.items} visibleSet={visibleSet} />
          {sec.items.length > 1 && <ScrollRow items={sec.items} />}
        </div>
      ))}
    </section>
  );
}