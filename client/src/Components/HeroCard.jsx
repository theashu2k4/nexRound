import RoundBadge from "./RoundBadge";
import { RESULT_COLORS } from "../constants";

const CheckIcon = () => (
  <div
    style={{
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#4ADE80,#22C55E)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width="9" height="7" viewBox="0 0 9 7">
      <path
        d="M1 3.5L3 5.5L8 1"
        stroke="#ECFDF3"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
);

function SkeletonHeroCard() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 20,
        padding: 22,
      }}
    >
      {[100, 60, 80, 120, 40].map((w, i) => (
        <div
          key={i}
          style={{
            height: 14,
            width: `${w}%`,
            background: "#F3F4F6",
            borderRadius: 6,
            marginBottom: 12,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroCard({ exp, loading }) {
  if (loading) return <SkeletonHeroCard />;
  if (!exp) return null;

  const resultColor = RESULT_COLORS[exp.result] ?? "#94A3B8";

  const rows = [
    exp.noOfRounds > 0
      ? `${exp.noOfRounds} Interview Round${exp.noOfRounds !== 1 ? "s" : ""}`
      : null,
    exp.difficulty ? `Difficulty: ${exp.difficulty}` : null,
    ...(exp.tags?.slice(0, 2) ?? []),
  ].filter(Boolean);

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 20,
        padding: 22,
        boxShadow: "0 0 60px #4ADE8015, 0 20px 50px #00000055",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#111827",
            }}
          >
            {exp.company}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#4ADE80", marginTop: 2 }}>
            {exp.role} · {exp.jobType}
          </div>
        </div>
        <RoundBadge label={exp.result ?? "Unknown"} color={resultColor} />
      </div>

      {/* Rows */}
      {rows.map((text, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
            borderBottom: i < rows.length - 1 ? "1px solid #152018" : "none",
          }}
        >
          <CheckIcon />
          <span style={{ fontSize: "0.81rem", color: "#374151" }}>{text}</span>
        </div>
      ))}

      {/* Content preview */}
      {exp.content && (
        <div
          style={{
            marginTop: 14,
            padding: "9px 13px",
            background: "#4ADE8010",
            borderRadius: 10,
            border: "1px solid #4ADE8022",
            fontSize: "0.76rem",
            color: "#16A34A",
            fontStyle: "italic",
            lineHeight: 1.55,
          }}
        >
          "{exp.content.slice(0, 120)}…"
        </div>
      )}
    </div>
  );
}
