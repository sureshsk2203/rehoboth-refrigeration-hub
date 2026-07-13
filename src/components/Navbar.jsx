import { useState, useEffect, useRef } from "react"; // 1️⃣ useRef add பண்ணோம்
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import eagleLogo from "../assets/eagle.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 2️⃣ Focus management-ku refs
  const menuToggleRef = useRef(null);
  const navLinksRef  = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    document.body.classList.remove("dark-theme", "light-theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-theme");
    } else {
      setDarkMode(false);
      document.body.classList.add("light-theme");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3️⃣ Escape key → menu close + focus toggle button-ku திரும்ப போகும்
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // 4️⃣ Menu open ஆகும்போது first link-ku focus போகும்
  useEffect(() => {
    if (menuOpen) {
      const firstLink = navLinksRef.current?.querySelector("a");
      firstLink?.focus();
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      document.body.classList.remove("dark-theme", "light-theme");
      if (newTheme) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  return (
    // 5️⃣ nav-ku aria-label — screen readers "Main navigation" announce பண்ணும்
    <nav className="navbar" aria-label="Main navigation">

      {/* 6️⃣ Logo → NavLink ஆச்சு; keyboard Enter-ல home-ku போகலாம்
           alt=""  → decorative image; aria-label already on NavLink
           aria-hidden on logo-text → duplicate reading தவிர்க்க */}
      <NavLink
        to="/"
        className="logo"
        aria-label="Rehoboth Refrigeration Hub – Go to homepage"
      >
        <img
          src={eagleLogo}
          alt=""
          className="logo-img"
          aria-hidden="true"
        />
        <div className="logo-text" aria-hidden="true">
          <h2>Rehoboth</h2>
          <span>Refrigeration Hub</span>
        </div>
      </NavLink>

      {/* 7️⃣ id add பண்ணோம் — menu toggle aria-controls-ku link ஆகும் */}
      <ul
        id="main-nav-links"
        ref={navLinksRef}
        className={`nav-links ${menuOpen ? "active" : ""}`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/service"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Service
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="navbar-right">

        {/* 8️⃣ aria-label → "Switch to dark mode" / "Switch to light mode"
             aria-hidden on icon → button label-ஐ screen reader படிக்கும், icon name-ஐ இல்ல */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode
            ? <FaSun  aria-hidden="true" />
            : <FaMoon aria-hidden="true" />}
        </button>

        {/* 9️⃣ div → button (keyboard Enter/Space-ல click ஆகும்)
             aria-expanded → menu open/close state announce ஆகும்
             aria-controls → "இந்த button main-nav-links-ஐ control பண்றது" */}
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav-links"
        >
          {menuOpen
            ? <FaTimes aria-hidden="true" />
            : <FaBars  aria-hidden="true" />}
        </button>

      </div>
    </nav>
  );
}