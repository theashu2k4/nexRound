export default function RoundBadge({ label, color }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: `${color}18`,
        border: `1px solid ${color}50`,
        color,
        fontSize: "0.68rem",
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 20,
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      {label.toUpperCase()}
    </span>
  );
}
