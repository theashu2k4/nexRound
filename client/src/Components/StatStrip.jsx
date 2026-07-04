import { useState, useEffect, useRef } from "react";

function useCountUp(target, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = Math.ceil(target / (duration / 16));
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(cur);
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [active, target]);
  return val;
}

function StatBlock({ value, suffix, label, active, duration }) {
  const count = useCountUp(value, duration, active);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Sora',sans-serif",
          fontWeight: 800,
          fontSize: "2.3rem",
          color: "#111827",
          lineHeight: 1,
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: "#16A34A",
          marginTop: 4,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatStrip({ stats }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "44px 5%",
        background: "linear-gradient(135deg,#ECFDF3,#F8FAFC)",
        borderTop: "1px solid #1a3d2330",
        borderBottom: "1px solid #1a3d2330",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        {stats.map((s, i) => (
          <StatBlock key={i} {...s} active={active} duration={1600} />
        ))}
      </div>
    </div>
  );
}
