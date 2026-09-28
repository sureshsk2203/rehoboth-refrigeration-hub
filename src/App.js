import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Categories from "./components/Categories";
import AcTypes from "./components/Ac_types";
import AcSparepart from "./components/Ac_spareparts";
import Fridge from "./components/Fridge_types";
import FridgeSpareparts from "./components/Fridge_spareparts";
import VoltageStabilizers from "./components/Voltagestabilizers_types";
import CoolinggasTypes from "./components/Coolinggas_types";
import CompressorOilTypes from "./components/CompressorOil_types";
import AccessoriesTools from "./components/Accessories_Tools";
import WashingMachineTypes from "./components/Washingmachine_types";
import WashingMachineSpareparts from "./components/Washingmachine_spareparts";
import RoSpareparts from "./components/RO_spareparts";
import Service from "./components/Service";
import Seo from "./components/Seo";

// Title + description for every page (keep title under ~65 chars where possible,
// description under ~155 characters)
const PAGES = {
  "/": {
    title:
      "Rehoboth Refrigeration Hub – AC, Fridge & Washing Machine Spare Parts, Ambasamudram",
    description:
      "AC, fridge, washing machine & RO spare parts, compressor oil and cooling gas in Ambasamudram, Kallidaikurichi, Vikramasingapuram and Papanasam. Call now.",
  },
  "/about": {
    title: "About Us | Rehoboth Refrigeration Hub, Ambasamudram",
    description:
      "Know more about Rehoboth Refrigeration Hub, your local supplier of AC, refrigerator and washing machine spare parts near Ambasamudram and Papanasam.",
  },
  "/categories": {
    title: "Product Categories – AC, Fridge, Washing Machine Parts | Rehoboth",
    description:
      "Browse AC, refrigerator, washing machine, RO, stabilizer, cooling gas, compressor oil and tools categories at Rehoboth Refrigeration Hub, Ambasamudram.",
  },
  "/contact": {
    title: "Contact Rehoboth Refrigeration Hub | Ambasamudram",
    description:
      "Call or visit Rehoboth Refrigeration Hub for AC, fridge and washing machine spare parts in Ambasamudram, Kallidaikurichi, Vikramasingapuram and Papanasam.",
  },
  "/service": {
    title: "Services | Rehoboth Refrigeration Hub, Ambasamudram",
    description:
      "Refrigeration and appliance related services from Rehoboth Refrigeration Hub for customers in Ambasamudram, Papanasam and nearby villages.",
  },
  "/ac-types": {
    title: "AC Types – Split, Window & Cassette AC | Rehoboth Refrigeration Hub",
    description:
      "Explore different types of air conditioners and the spare parts they need. Rehoboth Refrigeration Hub, Ambasamudram to Papanasam.",
  },
  "/ac-spareparts": {
    title: "AC Spare Parts in Ambasamudram & Papanasam | Rehoboth Refrigeration Hub",
    description:
      "AC compressor, PCB, fan motor, capacitor and other AC spare parts available in Ambasamudram, Kallidaikurichi and Papanasam.",
  },
  "/fridge-types": {
    title: "Refrigerator Types – Single, Double Door & More | Rehoboth",
    description:
      "Know the types of refrigerators and the spare parts each one needs. Rehoboth Refrigeration Hub, Ambasamudram.",
  },
  "/fridge-spareparts": {
    title: "Fridge Spare Parts in Ambasamudram & Papanasam | Rehoboth Refrigeration Hub",
    description:
      "Refrigerator compressor, thermostat, relay, door gasket and other fridge spare parts in Ambasamudram, Vikramasingapuram and Papanasam.",
  },
  "/voltage-stabilizers": {
    title: "Voltage Stabilizers for AC & Fridge | Rehoboth Refrigeration Hub",
    description:
      "Voltage stabilizers for AC, refrigerator and other appliances at Rehoboth Refrigeration Hub, Ambasamudram.",
  },
  "/cooling-gas": {
    title: "Cooling Gas – R32, R410A, R134a, R22 | Rehoboth Refrigeration Hub",
    description:
      "Refrigerant cooling gas for AC and refrigerators available at Rehoboth Refrigeration Hub, Ambasamudram and Papanasam.",
  },
  "/compressoroil-types": {
    title: "Compressor Oil for AC & Fridge | Rehoboth Refrigeration Hub",
    description:
      "Compressor oil types for AC and refrigeration compressors at Rehoboth Refrigeration Hub, Ambasamudram.",
  },
  "/accessories-tools": {
    title: "Refrigeration Tools & Accessories | Rehoboth Refrigeration Hub",
    description:
      "Tools and accessories for AC and refrigerator service at Rehoboth Refrigeration Hub, Ambasamudram and Papanasam.",
  },
  "/wm-types": {
    title: "Washing Machine Types – Top Load & Front Load | Rehoboth",
    description:
      "Know the types of washing machines and their spare parts. Rehoboth Refrigeration Hub, Ambasamudram.",
  },
  "/wm-spareparts": {
    title:
      "Washing Machine Spare Parts in Ambasamudram & Papanasam | Rehoboth",
    description:
      "Washing machine motor, timer, drum, pulsator and other spare parts in Ambasamudram, Kallidaikurichi and Papanasam.",
  },
  "/ro-spareparts": {
    title: "RO Water Purifier Spare Parts | Rehoboth Refrigeration Hub",
    description:
      "RO membrane, pump, SMPS adaptor, filters and other RO water purifier spare parts at Rehoboth Refrigeration Hub, Ambasamudram.",
  },
};

// Wraps a page with its own SEO tags
function Page({ path, children }) {
  const { title, description } = PAGES[path];
  return (
    <>
      <Seo title={title} description={description} path={path} />
      {children}
    </>
  );
}

// Home page = Hero + About sections together
function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* Loader is only an overlay now, page content is always in the DOM.
          Loader must be position: fixed; full screen with a high z-index. */}
      {loading && <Loader />}

      <Navbar />

      <Routes>
        <Route path="/" element={<Page path="/"><Home /></Page>} />
        <Route path="/about" element={<Page path="/about"><About /></Page>} />
        <Route path="/categories" element={<Page path="/categories"><Categories /></Page>} />
        <Route path="/contact" element={<Page path="/contact"><Contact /></Page>} />
        <Route path="/service" element={<Page path="/service"><Service /></Page>} />

        <Route path="/ac-types" element={<Page path="/ac-types"><AcTypes /></Page>} />
        <Route path="/ac-spareparts" element={<Page path="/ac-spareparts"><AcSparepart /></Page>} />
        <Route path="/fridge-types" element={<Page path="/fridge-types"><Fridge /></Page>} />
        <Route path="/fridge-spareparts" element={<Page path="/fridge-spareparts"><FridgeSpareparts /></Page>} />
        <Route path="/voltage-stabilizers" element={<Page path="/voltage-stabilizers"><VoltageStabilizers /></Page>} />
        <Route path="/cooling-gas" element={<Page path="/cooling-gas"><CoolinggasTypes /></Page>} />
        <Route path="/compressoroil-types" element={<Page path="/compressoroil-types"><CompressorOilTypes /></Page>} />
        <Route path="/accessories-tools" element={<Page path="/accessories-tools"><AccessoriesTools /></Page>} />
        <Route path="/wm-types" element={<Page path="/wm-types"><WashingMachineTypes /></Page>} />
        <Route path="/wm-spareparts" element={<Page path="/wm-spareparts"><WashingMachineSpareparts /></Page>} />
        <Route path="/ro-spareparts" element={<Page path="/ro-spareparts"><RoSpareparts /></Page>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;