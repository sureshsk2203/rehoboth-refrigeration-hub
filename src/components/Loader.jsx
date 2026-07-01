import "./Loader.css";
import eagle from "../assets/eaglecircle.png";

export default function Loader() {
  return (
    <div className="loader-screen">

      {/* Ambient background glow */}
      <div className="loader-glow" />

      {/* Floating particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="particle" style={{ "--i": i }} />
        ))}
      </div>

      <div className="loader-content">

        {/* ── Eagle circle with ring system ── */}
        <div className="eagle-ring-wrap">

          {/* Outermost slow ring */}
          <div className="ring-outer" />

          {/* Mid ring (reverse) */}
          <div className="ring-mid" />

          {/* Orbiting bright dot */}
          <div className="orbit-track orbit-track--1">
            <span className="orbit-dot orbit-dot--lg" />
          </div>

          {/* Second orbiting dot (reverse) */}
          <div className="orbit-track orbit-track--2">
            <span className="orbit-dot orbit-dot--sm" />
          </div>

          {/* Tick marks */}
          <div className="tick-ring">
            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                className={`tick ${i % 6 === 0 ? "tick--major" : ""}`}
                style={{ "--t": i }}
              />
            ))}
          </div>

          {/* Main circle */}
          <div className="eagle-circle">
            <span className="corner corner--tl" />
            <span className="corner corner--tr" />
            <span className="corner corner--bl" />
            <span className="corner corner--br" />
            <img src={eagle} alt="Rehoboth Eagle" className="loader-eagle" />
            <div className="circle-inner-glow" />
          </div>

        </div>
        {/* ── End eagle circle ── */}

        {/* Brand name */}
        <div className="brand-wrap">
          <h1 className="loader-brand">REHOBOTH</h1>
        </div>

        {/* Gold divider */}
        <div className="loader-divider">
          <span className="dl" />
          <span className="dd" />
          <span className="dl" />
        </div>

        {/* Subtitle */}
        <p className="loader-sub">Refrigeration Hub</p>

        {/* Progress bar + dots */}
        <div className="bar-wrap">
          <div className="bar-track">
            <div className="bar-fill" />
          </div>
          <div className="dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>

      </div>
    </div>
  );
}
