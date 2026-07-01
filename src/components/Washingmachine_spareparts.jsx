import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Washingmachine_spareparts.css";

const sections = [
  { id:"motor", title:"Motor & Drive System", eyebrow:"DRIVE SYSTEM", items:[
    {id:1,name:"Washing Machine Motor",label:"MOTOR",  img:"/washingmachine/Washing Machine Motor.png", bg:"#e8f1fb"},
    {id:2,name:"Inverter Motor",        label:"MOTOR",  img:"/washingmachine/Inverter Motor.png",        bg:"#e8f1fb"},
    {id:3,name:"Drive Belt",            label:"DRIVE",  img:"/washingmachine/Drive Belt.png",            bg:"#e8f1fb"},
    {id:4,name:"Pulley",                label:"DRIVE",  img:"/washingmachine/Pulley.png",                bg:"#e8f1fb"},
    {id:6,name:"Gear Box",              label:"GEAR",   img:"/washingmachine/Gear Box.webp",             bg:"#e8f1fb"},
    {id:7,name:"Motor Coupler",         label:"COUPLER",img:"/washingmachine/Motor Coupler.png",         bg:"#e8f1fb"},
    {id:8,name:"Rotor",                 label:"MOTOR",  img:"/washingmachine/Rotor.jpg",                 bg:"#e8f1fb"},
    {id:9,name:"Stator",                label:"MOTOR",  img:"/washingmachine/Stator.png",                bg:"#e8f1fb"},
  ]},
  { id:"water", title:"Water System", eyebrow:"WATER FLOW", items:[
    {id:10,name:"Water Inlet Valve",  label:"VALVE",  img:"/washingmachine/Water Inlet Valve.png",  bg:"#e8f1fb"},
    {id:11,name:"Water Outlet Valve", label:"VALVE",  img:"/washingmachine/Water Outlet Valve.png", bg:"#e8f1fb"},
    {id:12,name:"Drain Pump",         label:"PUMP",   img:"/washingmachine/Drain Pump.webp",        bg:"#e8f1fb"},
    {id:13,name:"Drain Hose",         label:"HOSE",   img:"/washingmachine/Drain Hose.png",         bg:"#e8f1fb"},
    {id:14,name:"Inlet Hose",         label:"HOSE",   img:"/washingmachine/Inlet Hose.png",         bg:"#e8f1fb"},
    {id:15,name:"Pressure Switch",    label:"SENSOR", img:"/washingmachine/Pressure Switch.png",    bg:"#e8f1fb"},
    {id:16,name:"Water Level Sensor", label:"SENSOR", img:"/washingmachine/Water Level Sensor.jpg", bg:"#e8f1fb"},
  ]},
  { id:"drum", title:"Drum & Tub Parts", eyebrow:"DRUM PARTS", items:[
    {id:17,name:"Inner Drum",   label:"DRUM",    img:"/washingmachine/Inner Drum.png",   bg:"#e8f1fb"},
    {id:18,name:"Outer Tub",    label:"TUB",     img:"/washingmachine/Outer Tub.jpg",    bg:"#e8f1fb"},
    {id:19,name:"Drum Bearing", label:"BEARING", img:"/washingmachine/Drum Bearing.png", bg:"#e8f1fb"},
    {id:20,name:"Drum Shaft",   label:"SHAFT",   img:"/washingmachine/Drum Shaft.png",   bg:"#e8f1fb"},
    {id:21,name:"Drum Spider",  label:"SPIDER",  img:"/washingmachine/Frond Loading spider.jpg",  bg:"#e8f1fb"},
    {id:22,name:"Oil Seal",     label:"SEAL",    img:"/washingmachine/Oil Seal.jpg",     bg:"#e8f1fb"},
    {id:23,name:"Tub Cover",    label:"COVER",   img:"/washingmachine/Tub Cover.jpg",    bg:"#e8f1fb"},
  ]},
  { id:"electrical", title:"Electrical Parts", eyebrow:"ELECTRONICS", items:[
    {id:24,name:"PCB Control Board", label:"BRAIN",  img:"/washingmachine/PCB Control Board.jpg",  bg:"#e8f1fb"},
    {id:25,name:"Capacitor",         label:"POWER",  img:"/washingmachine/Capacitor.webp",         bg:"#e8f1fb"},
    {id:26,name:"Wiring Harness",    label:"WIRING", img:"/washingmachine/Wiring Harness.png",     bg:"#e8f1fb"},
    {id:27,name:"Power Cord",        label:"POWER",  img:"/washingmachine/Power Cord.webp",        bg:"#e8f1fb"},
    {id:28,name:"Timer",             label:"TIMER",  img:"/washingmachine/Timer.webp",             bg:"#e8f1fb"},
    {id:29,name:"Thermal Protector", label:"SAFETY", img:"/washingmachine/Thermal Protector.webp", bg:"#e8f1fb"},
    {id:30,name:"Fuse",              label:"SAFETY", img:"/washingmachine/Fuse.webp",              bg:"#e8f1fb"},
    {id:31,name:"Relay",             label:"SWITCH", img:"/washingmachine/Relay.jpg",              bg:"#e8f1fb"},
  ]},
  { id:"door", title:"Door & Lid Parts", eyebrow:"DOOR PARTS", items:[
    {id:32,name:"Door Lock",   label:"LOCK",   img:"/washingmachine/Door Lock.jpg",   bg:"#e8f1fb"},
    {id:33,name:"Door Handle", label:"HANDLE", img:"/washingmachine/Door Handle.jpg", bg:"#e8f1fb"},
    {id:34,name:"Door Gasket", label:"SEAL",   img:"/washingmachine/Door Gasket.jpg", bg:"#e8f1fb"},
    {id:35,name:"Lid Switch",  label:"SWITCH", img:"/washingmachine/Lid Switch.webp", bg:"#e8f1fb"},
    {id:36,name:"Lid Hinge",   label:"HINGE",  img:"/washingmachine/Lid Hinge.webp",  bg:"#e8f1fb"},
    {id:37,name:"Door Glass",  label:"GLASS",  img:"/washingmachine/Door Glass.jpg",  bg:"#e8f1fb"},
  ]},
  { id:"suspension", title:"Suspension System", eyebrow:"SUSPENSION", items:[
    {id:38,name:"Shock Absorber",    label:"ABSORBER",img:"/washingmachine/Shock Absorber.png",    bg:"#e8f1fb"},
    {id:39,name:"Suspension Rod",    label:"ROD",     img:"/washingmachine/Suspension Rod.jpg",    bg:"#e8f1fb"},
    {id:40,name:"Suspension Spring", label:"SPRING",  img:"/washingmachine/Suspension Spring.webp",bg:"#e8f1fb"},
    {id:41,name:"Damper Pad",        label:"DAMPER",  img:"/washingmachine/Damper Pad.jpg",        bg:"#e8f1fb"},
    {id:42,name:"Spring Kit",        label:"SPRING",  img:"/washingmachine/Spring Kit.jpg",        bg:"#e8f1fb"},
  ]},
  { id:"ui", title:"User Interface", eyebrow:"CONTROLS", items:[
    {id:43,name:"Control Knob",     label:"KNOB",     img:"/washingmachine/Control Knob.jpg",     bg:"#e8f1fb"},
  ]},
  { id:"accessories", title:"Accessories", eyebrow:"ADD-ONS", items:[
    {id:46,name:"Top Loading Drum",    label:"TOP LOAD", img:"/washingmachine/Toploading.png",          bg:"#e8f1fb"},
    {id:47,name:"Pulsator",            label:"WASH",     img:"/washingmachine/Pulsator.png",            bg:"#e8f1fb"},
    {id:48,name:"Agitator",            label:"WASH",     img:"/washingmachine/Agitator.jpg",            bg:"#e8f1fb"},
    {id:49,name:"Lint Filter",         label:"FILTER",   img:"/washingmachine/Square filter.webp",      bg:"#e8f1fb"},
    {id:50,name:"Detergent Dispenser", label:"DISPENSE", img:"/washingmachine/Detergent Dispenser.webp",bg:"#e8f1fb"},
    {id:51,name:"Softener Dispenser",  label:"DISPENSE", img:"/washingmachine/Softener Dispenser.jpg",  bg:"#e8f1fb"},
    {id:52,name:"Descal",              label:"Powder",   img:"/washingmachine/Descal.webp",             bg:"#e8f1fb"},
    {id:53,name:"Water Filter",        label:"FILTER",   img:"/washingmachine/Waterfilter.webp",        bg:"#e8f1fb"},
  ]},
];

function ScrollRow({ items }) {
  const trackRef=useRef(null),posRef=useRef(0),rafRef=useRef(null),pausedRef=useRef(false),manualRef=useRef(false),resumeRef=useRef(null);
  useEffect(()=>{
    const track=trackRef.current;if(!track)return;
    const getSetW=()=>{const cards=track.querySelectorAll(".wmsp-scard");if(cards.length<items.length)return 0;return cards[items.length-1].getBoundingClientRect().right-cards[0].getBoundingClientRect().left;};
    let setW=0;
    const loop=()=>{if(!pausedRef.current&&!manualRef.current){if(!setW)setW=getSetW();posRef.current-=0.5;if(setW&&Math.abs(posRef.current)>=setW)posRef.current+=setW;track.style.transform=`translateX(${posRef.current}px)`;}rafRef.current=requestAnimationFrame(loop);};
    rafRef.current=requestAnimationFrame(loop);return()=>cancelAnimationFrame(rafRef.current);
  },[items.length]);
  const snapBy=useCallback((dir)=>{
    const track=trackRef.current;if(!track)return;manualRef.current=true;clearTimeout(resumeRef.current);
    const card=track.querySelector(".wmsp-scard");if(!card)return;
    const step=card.getBoundingClientRect().width+18,start=posRef.current,target=start+(dir==="left"?step:-step),dur=380,t0=performance.now();
    const snap=(now)=>{const p=Math.min((now-t0)/dur,1),ease=p<0.5?2*p*p:-1+(4-2*p)*p;posRef.current=start+(target-start)*ease;track.style.transform=`translateX(${posRef.current}px)`;if(p<1)requestAnimationFrame(snap);else resumeRef.current=setTimeout(()=>{manualRef.current=false;},2500);};
    requestAnimationFrame(snap);
  },[]);
  const looped=[...items,...items,...items];
  return(
    <div className="wmsp-scroll-outer">
      <button className="wmsp-arrow wmsp-arrow--on" onClick={()=>snapBy("left")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
      <div className="wmsp-track-outer" onMouseEnter={()=>{pausedRef.current=true;}} onMouseLeave={()=>{pausedRef.current=false;}}>
        <div className="wmsp-track" ref={trackRef}>
          {looped.map((item,i)=>(<div key={`${item.id}-${i}`} className="wmsp-scard" style={{"--fi":i%items.length}}><p className="wmsp-scard-label">{item.label}</p><div className="wmsp-scard-imgwrap" style={{background:item.bg}}><img src={item.img} alt={item.name} className="wmsp-scard-img" style={{"--fi":i%items.length}}/></div><p className="wmsp-scard-name">{item.name}</p></div>))}
        </div>
      </div>
      <button className="wmsp-arrow wmsp-arrow--on" onClick={()=>snapBy("right")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
  );
}

function SectionGrid({items,visibleSet}){
  const rows=[];for(let i=0;i<items.length;i+=4)rows.push(items.slice(i,i+4));
  return(<>{rows.map((row,ri)=>(<div key={ri} className="wmsp-grid">{row.map((item,ci)=>{const g=ri*4+ci;return(<div key={item.id} className={`wmsp-jcard ${visibleSet.has(item.id)?"wmsp-jcard--in":""}`} style={{"--di":g}}><p className="wmsp-jcard-label">{item.label}</p><div className="wmsp-jcard-imgwrap" style={{background:item.bg}}><img src={item.img} alt={item.name} className="wmsp-jcard-img" style={{"--fi":g}}/></div><p className="wmsp-jcard-name">{item.name}</p></div>);})}</div>))}</>);
}

export default function WashingMachineSpareparts(){
  const navigate=useNavigate();
  const [visibleSet,setVisibleSet]=useState(new Set());
  useEffect(()=>{const all=sections.flatMap(s=>s.items);all.forEach((item,i)=>setTimeout(()=>setVisibleSet(prev=>new Set([...prev,item.id])),i*60));},[]);
  return(
    <section className="wmsp-section">
      <button className="wmsp-back-btn" onClick={()=>navigate(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
      <div className="wmsp-header"><p className="wmsp-eyebrow">Rohoboth Refrigeration Hub</p><h2 className="wmsp-title">Washing Machine Spare Parts</h2><p className="wmsp-sub">Genuine parts for all washing machine types</p></div>
      {sections.map(sec=>(
        <div key={sec.id} className="wmsp-section-block">
          <div className="wmsp-section-head"><span className="wmsp-section-eye">{sec.eyebrow}</span><h3 className="wmsp-section-title">{sec.title}</h3></div>
          <SectionGrid items={sec.items} visibleSet={visibleSet}/>

{sec.items.length > 1 && (
  <ScrollRow items={sec.items}/>
)}
        </div>
      ))}
    </section>
  );
}