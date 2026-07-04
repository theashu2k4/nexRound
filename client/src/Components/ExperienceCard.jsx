import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoundBadge from "./RoundBadge";
import { RESULT_COLORS, DIFFICULTY_COLORS } from "../constants";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function ExperienceCard({ exp }) {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();

  const resultColor = RESULT_COLORS[exp.result] ?? "#94A3B8";
  const diffColor = DIFFICULTY_COLORS[exp.difficulty] ?? "#94A3B8";
  const authorName = exp.author?.name ?? "Anonymous";
  const college = exp.author?.college ?? "";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => exp.slug && navigate(`/interview/${exp.slug}`)}
      style={{
        background: hov ? "#F4FDF7" : "#FFFFFF",
        border: `1px solid ${hov ? "#4ADE8045" : "#E5E7EB"}`,
        borderRadius: 16,
        padding: 22,
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "0 16px 40px #4ADE8015" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top shimmer on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${resultColor}80, transparent)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
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
          <div style={{ fontSize: "0.75rem", color: "#4ADE80", marginTop: 2 }}>
            {exp.role} · {exp.jobType}
          </div>
        </div>
        <RoundBadge label={exp.result ?? "Unknown"} color={resultColor} />
      </div>

      {/* Post title */}
      {exp.postTitle && (
        <div
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          {exp.postTitle}
        </div>
      )}

      {/* Pills row */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}
      >
        {exp.noOfRounds > 0 && (
          <span
            style={{
              background: "#FFFFFF",
              color: "#16A34A",
              fontSize: "0.65rem",
              padding: "2px 9px",
              borderRadius: 20,
              border: "1px solid #1a3220",
            }}
          >
            {exp.noOfRounds} Round{exp.noOfRounds > 1 ? "s" : ""}
          </span>
        )}
        {exp.difficulty && (
          <span
            style={{
              background: `${diffColor}12`,
              color: diffColor,
              fontSize: "0.65rem",
              padding: "2px 9px",
              borderRadius: 20,
              border: `1px solid ${diffColor}40`,
            }}
          >
            {exp.difficulty}
          </span>
        )}
        {exp.tags?.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            style={{
              background: "#FFFFFF",
              color: "#6B7280",
              fontSize: "0.65rem",
              padding: "2px 9px",
              borderRadius: 20,
              border: "1px solid #E5E7EB",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content preview */}
      {exp.content && (
        <p
          style={{
            fontSize: "0.83rem",
            color: "#6B7280",
            lineHeight: 1.65,
            marginBottom: 14,
            fontStyle: "italic",
          }}
        >
          "{exp.content.slice(0, 160)}
          {exp.content.length > 160 ? "…" : ""}"
        </p>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {exp.author?.profilePicture ? (
            <img
              src={exp.author.profilePicture}
              alt={authorName}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#4ADE80,#22C55E)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.68rem",
                fontWeight: 800,
                color: "#ECFDF3",
                flexShrink: 0,
              }}
            >
              {authorName[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <div
              style={{ fontSize: "0.76rem", fontWeight: 600, color: "#1F2937" }}
            >
              {authorName}
            </div>
            {college && (
              <div style={{ fontSize: "0.66rem", color: "#6B7280" }}>
                {college}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: "0.66rem",
              color: "#9CA3AF",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            ♥ {exp.likes?.count ?? 0}
          </span>
          <span style={{ fontSize: "0.66rem", color: "#9CA3AF" }}>
            💬 {exp.commentsCount ?? 0}
          </span>
          <div style={{ fontSize: "0.66rem", color: "#9CA3AF" }}>
            {timeAgo(exp.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
