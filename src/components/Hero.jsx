import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

// Tamil/complex-script safe grapheme splitter
function splitGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const seg = new Intl.Segmenter("ta", { granularity: "grapheme" });
    return [...seg.segment(text)].map((s) => s.segment);
  }
  return text.split(""); // fallback (old browsers)
}

// Wraps each grapheme in a <span> with staggered animation delay
function AnimatedText({ text, baseDelay = 0, className }) {
  const chars = splitGraphemes(text);
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{
            animationDelay: `${baseDelay + i * 0.052}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const y = window.scrollY;
        imageRef.current.style.transform = `translateY(${y * 0.18}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Tamil names — business card படி
  const NAME_LINE1 = "REHOBOTH";
  const NAME_LINE2 = "REFRIGERATION";
  const NAME_LINE3 = "HUB";

  // delay math — grapheme count படி (hardcoded எண் இல்ல, dynamic)
  const len1 = splitGraphemes(NAME_LINE1).length;
  const len2 = splitGraphemes(NAME_LINE2).length;

  const line1End = 0.08 + len1 * 0.052;
  const line2End = line1End + 0.06 + len2 * 0.052;

  return (
    <section id="home" className="hero">
      <div className="hero-content">

        <div className="hero-left">
          <span className="hero-tag">Rehoboth Refrigeration Hub</span>

          <h1>
            <AnimatedText
              text={NAME_LINE1}
              baseDelay={0.08}
              className="hero-brand"
            />
            <AnimatedText
              text={NAME_LINE2}
              baseDelay={line1End + 0.06}
              className="hero-sub"
            />
            <AnimatedText
              text={NAME_LINE3}
              baseDelay={line2End + 0.06}
              className="hero-sub"
            />
          </h1>

          <div className="hero-divider" />

          <p>
            Original AC, Fridge and Washing Machine spare parts from
            trusted brands.
          </p>

          <div className="hero-buttons">
            <Link to="/categories" className="primary-btn">
              <span>Explore Products</span>
            </Link>
            <Link to="/contact" className="secondary-btn">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        <div className="hero-center">
          <div className="hero-image-wrapper">
            <img
              ref={imageRef}
              src="/images/sparepart.png"
              alt="AC, Fridge & Washing Machine Spare Parts"
              className="hero-main-image"
            />
          </div>
          <div className="panel-vignette" />
        </div>

      </div>
    </section>
  );
}