import React from "react";
import { Link } from "react-router-dom";

const PHONE_DISPLAY = "+91 94437 91706";
const PHONE_LINK = "+919443791706";

const AREAS = [
  {
    name: "Papanasam",
    text: "Our shop is in Papanasam, on Sivanathipuram Main Road near Marakkadi Stop. If you repair or service AC, refrigerators, washing machines or RO purifiers in Papanasam, you can walk in for spare parts, cooling gas and compressor oil.",
  },
  {
    name: "Sivanathipuram",
    text: "Sivanathipuram is on the same main road as our shop. Technicians and shop owners here can call before they come and check that the part they need is available.",
  },
  {
    name: "Ambasamudram (Ambai)",
    text: "We supply AC, fridge, washing machine and RO spare parts to service technicians and customers from Ambasamudram (Ambai). Call us with the model and the fault, and we will tell you what is available.",
  },
  {
    name: "Vikramasingapuram (VK Puram)",
    text: "Customers and technicians from Vikramasingapuram (VK Puram) can get appliance spare parts, stabilizers and refrigeration tools from us without going all the way to a bigger town.",
  },
  {
    name: "Kallidaikurichi",
    text: "If you are in Kallidaikurichi and need a spare part for an AC, refrigerator, washing machine or RO purifier, contact us and we will help you find the right one.",
  },
];

const PRODUCTS = [
  { to: "/ac-spareparts", label: "AC spare parts" },
  { to: "/fridge-spareparts", label: "Refrigerator spare parts" },
  { to: "/wm-spareparts", label: "Washing machine spare parts" },
  { to: "/ro-spareparts", label: "RO water purifier spare parts" },
  { to: "/cooling-gas", label: "Cooling gas" },
  { to: "/compressoroil-types", label: "Compressor oil" },
  { to: "/voltage-stabilizers", label: "Voltage stabilizers" },
  { to: "/accessories-tools", label: "Accessories and tools" },
];

export default function AreasWeServe() {
  return (
    <main className="areas-page">
      <style>{`
        .areas-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 110px 20px 70px;
          color: #1c2a25;
          line-height: 1.7;
          font-size: 1.05rem;
          text-align: left;
        }
        .areas-page h1 {
          font-size: clamp(1.7rem, 4.5vw, 2.4rem);
          line-height: 1.25;
          color: #0b3d2e;
          margin: 0 0 16px;
        }
        .areas-page h2 {
          font-size: 1.3rem;
          color: #0b3d2e;
          margin: 0 0 6px;
        }
        .areas-page section {
          padding: 22px 0;
          border-top: 1px solid #d6e0dc;
        }
        .areas-page p { margin: 0; }
        .areas-page ul {
          margin: 10px 0 0;
          padding-left: 20px;
        }
        .areas-page a { color: #0b6b4d; }
        .areas-page .call-btn {
          display: inline-block;
          margin-top: 12px;
          padding: 12px 22px;
          background: #0b3d2e;
          color: #fff;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
        }
        .areas-page .call-btn:focus-visible,
        .areas-page a:focus-visible {
          outline: 3px solid #f2b705;
          outline-offset: 2px;
        }
      `}</style>

      <h1>Spare parts shop for Papanasam, Sivanathipuram, Ambasamudram and VK Puram</h1>
      <p>
        Rehoboth Refrigeration Hub supplies AC, refrigerator, washing machine
        and RO spare parts to customers and service technicians across the
        Papanasam to Ambasamudram belt.
      </p>

      {AREAS.map((area) => (
        <section key={area.name}>
          <h2>Spare parts in {area.name}</h2>
          <p>{area.text}</p>
        </section>
      ))}

      <section>
        <h2>What we supply</h2>
        <ul>
          {PRODUCTS.map((p) => (
            <li key={p.to}>
              <Link to={p.to}>{p.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Visit or call us</h2>
        <p>
          Rehoboth Refrigeration Hub
          <br />
          3/574B, Marakkadi Stop, Near Rajathai Typewriting Institute,
          <br />
          Sivanathipuram Main Road, Papanasam, Tirunelveli - 627425
        </p>
        <a className="call-btn" href={`tel:${PHONE_LINK}`}>
          Call {PHONE_DISPLAY}
        </a>
      </section>
    </main>
  );
}