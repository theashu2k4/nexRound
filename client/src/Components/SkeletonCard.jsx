export default function SkeletonCard() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        padding: 22,
      }}
    >
      {[100, 60, 80, 120, 40].map((w, i) => (
        <div
          key={i}
          style={{
            height: i === 0 ? 16 : 12,
            width: `${w}%`,
            background: "#F3F4F6",
            borderRadius: 6,
            marginBottom: 10,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>
  );
}