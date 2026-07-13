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
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/ac-types" element={<AcTypes />} />
        <Route path="/ac-spareparts" element={<AcSparepart />} />
        <Route path="/fridge-types" element={<Fridge />} />
        <Route path="/fridge-spareparts" element={<FridgeSpareparts />} />
        <Route path="/voltage-stabilizers" element={<VoltageStabilizers />} />
        <Route path="/cooling-gas" element={<CoolinggasTypes />} />
        <Route path="/compressoroil-types" element={<CompressorOilTypes />} />
        <Route path="/accessories-tools" element={<AccessoriesTools />} />
        <Route path="/wm-types" element={<WashingMachineTypes />} />
        <Route path="/wm-spareparts" element={<WashingMachineSpareparts />} />
        <Route path="/ro-spareparts" element={<RoSpareparts />} />
        <Route path="/service" element={<Service />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;