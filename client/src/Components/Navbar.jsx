import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/mainLogo.png"; // imported so Vite resolves and bundles it correctly

export default function Navbar({ scrolled }) {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    {
      label: "How it Works",
      action: () =>
        document
          .getElementById("how-it-works")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    { label: "Experiences", action: () => navigate("/feed") },
    {
      label: "Companies",
      action: () => navigate("/experience/popular-companies"),
    },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        padding: "0 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(6,13,8,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid #1a3d2340" : "none",
        transition: "all 0.3s",
      }}
    >
      {/* Clickable Logo */}
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #4ADE80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="nexRound logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <span
          style={{
            fontFamily: "'Sora',sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
          }}
        >
          nex<span style={{ color: "#4ADE80" }}>Round</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {navLinks.map(({ label, action }) => (
          <button
            key={label}
            className="nbtn"
            onClick={action}
            style={{ color: "#16A34A", fontSize: "0.87rem", fontWeight: 500 }}
          >
            {label}
          </button>
        ))}

        {/* Auth section */}
        {loading ? (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#4ADE8020",
            }}
          />
        ) : user ? (
          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="nbtn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 6px 4px 4px",
                borderRadius: 30,
                border: "1px solid #4ADE8030",
              }}
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name ?? "Profile"}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#4ADE80,#22C55E)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    color: "#ECFDF3",
                  }}
                >
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#16A34A",
                  maxWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.name ?? "Profile"}
              </span>
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: 180,
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: 14,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  zIndex: 200,
                }}
              >
                <button
                  className="nbtn"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/my-experiences");
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: "0.85rem",
                    color: "#111827",
                  }}
                >
                  My Experiences
                </button>
                <button
                  className="nbtn"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: "0.85rem",
                    color: "#111827",
                  }}
                >
                  Profile Settings
                </button>
                <button
                  className="nbtn"
                  onClick={handleLogout}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: "0.85rem",
                    color: "#EF4444",
                    borderTop: "1px solid #F3F4F6",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="nbtn"
            onClick={() => navigate("/login")}
            style={{ color: "#16A34A", fontSize: "0.87rem" }}
          >
            Log In
          </button>
        )}

        <button
          className="pbtn"
          onClick={() => navigate("/experience/new")}
          style={{ padding: "9px 20px", fontSize: "0.82rem" }}
        >
          Share Experience
        </button>
      </div>
    </nav>
  );
}