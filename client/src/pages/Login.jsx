import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      await refetchUser();
      navigate("/feed");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        * { font-family: 'Manrope', system-ui, sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }

        .fade-up   { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s 0.08s ease both; }
        .fade-up-2 { animation: fadeUp 0.5s 0.16s ease both; }
        .fade-up-3 { animation: fadeUp 0.5s 0.24s ease both; }
        .fade-up-4 { animation: fadeUp 0.5s 0.32s ease both; }
        .fade-up-5 { animation: fadeUp 0.5s 0.40s ease both; }

        .login-input {
          width: 100%;
          background: #F7FBF8;
          border: 1.5px solid #D5E8DC;
          border-radius: 10px;
          padding: 13px 16px;
          color: #1B4332;
          font-size: 14.5px;
          font-weight: 500;
          font-family: 'Manrope', sans-serif;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #52B72B;
          background: #FFFFFF;
          box-shadow: 0 0 0 3.5px rgba(82,183,43,0.12);
        }
        .login-input::placeholder { color: #A8C4B2; font-weight: 400; }

        .login-btn {
          width: 100%;
          background: #1B4332;
          color: #ffffff;
          font-weight: 700;
          font-size: 14.5px;
          font-family: 'Manrope', sans-serif;
          letter-spacing: 0.1px;
          padding: 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
        }
        .login-btn:hover:not(:disabled) {
          background: #52B72B;
          box-shadow: 0 4px 16px rgba(82,183,43,0.25);
        }
        .login-btn:active:not(:disabled) { transform: scale(0.985); }
        .login-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .login-card {
          width: 100%;
          max-width: 1060px;
          display: flex;
          border: 1.5px solid #D5E8DC;
          border-radius: 20px;
          overflow: hidden;
          min-height: 600px;
          box-shadow: 0 8px 40px rgba(27,67,50,0.07);
        }

        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px 52px;
          background: #1B4332;
          animation: fadeIn 0.7s ease forwards;
          position: relative;
          overflow: hidden;
        }
        .left-panel::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(82,183,43,0.08);
          pointer-events: none;
        }
        .left-panel::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(82,183,43,0.06);
          pointer-events: none;
        }

        .right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 56px 52px;
          background: #FFFFFF;
        }

        .stat-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #52B72B;
          animation: pulse-dot 2s infinite;
          flex-shrink: 0;
        }

        .show-hide-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #52B72B;
          cursor: pointer;
          font-size: 12.5px;
          font-weight: 600;
          font-family: 'Manrope', sans-serif;
          padding: 0;
        }
        .show-hide-btn:hover { color: #1B4332; }

        .exp-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .input-label {
          color: #2D6A4F;
          font-size: 12.5px;
          font-weight: 600;
          display: block;
          margin-bottom: 7px;
          letter-spacing: 0.2px;
        }

        @media (max-width: 768px) {
          .login-card {
            flex-direction: column;
            border-radius: 16px;
            min-height: unset;
          }
          .left-panel { display: none; }
          .right-panel { padding: 40px 28px; }
        }
      `}</style>

      <div className="login-card">
        {/* ── Left Panel — Branding ── */}
        <div className="left-panel">
          {/* Logo wordmark */}
          <div style={{ marginBottom: "44px" }}>
            <span
              style={{
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "21px",
                letterSpacing: "-0.4px",
              }}
            >
              nex<span style={{ color: "#52B72B" }}>Round</span>
            </span>
          </div>

          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "38px",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: "14px",
              letterSpacing: "-1px",
            }}
          >
            Real interviews.
            <br />
            <span style={{ color: "#52B72B" }}>Real stories.</span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.58)",
              fontSize: "15px",
              lineHeight: 1.75,
              maxWidth: "340px",
              marginBottom: "36px",
            }}
          >
            Learn from thousands of placement experiences shared by students
            just like you.
          </p>

          {/* Live stats */}
          <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "40px" }}
          >
            <div className="stat-chip">
              <span className="dot"></span>1,200+ experiences
            </div>
            <div className="stat-chip">
              <span className="dot" style={{ animationDelay: "0.5s" }}></span>
              80+ companies
            </div>
            <div className="stat-chip">
              <span className="dot" style={{ animationDelay: "1s" }}></span>
              Updated daily
            </div>
          </div>

          {/* Decorative experience cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "380px",
            }}
          >
            {[
              {
                company: "Google",
                role: "SDE Intern",
                result: "Selected",
                selected: true,
              },
              {
                company: "Amazon",
                role: "SDE-1",
                result: "Selected",
                selected: true,
              },
              {
                company: "Microsoft",
                role: "Software Engineer",
                result: "Rejected",
                selected: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="exp-card"
                style={{
                  opacity: 1 - i * 0.2,
                  transform: `scale(${1 - i * 0.018})`,
                  transformOrigin: "top center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(82,183,43,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#52B72B",
                      fontWeight: 800,
                      fontSize: "13px",
                    }}
                  >
                    {item.company[0]}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#FFFFFF",
                        fontSize: "13px",
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {item.company}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.42)",
                        fontSize: "11px",
                        margin: 0,
                      }}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    color: item.selected ? "#52B72B" : "#F87171",
                    fontSize: "12px",
                    fontWeight: 600,
                    background: item.selected
                      ? "rgba(82,183,43,0.15)"
                      : "rgba(248,113,113,0.12)",
                    border: `1px solid ${item.selected ? "rgba(82,183,43,0.3)" : "rgba(248,113,113,0.25)"}`,
                    borderRadius: "999px",
                    padding: "3px 10px",
                  }}
                >
                  {item.result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel — Form ── */}
        <div className="right-panel">
          <div style={{ width: "100%", maxWidth: "380px" }}>
            {/* Header */}
            <div className="fade-up-1" style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  color: "#1B4332",
                  fontSize: "25px",
                  fontWeight: 800,
                  marginBottom: "6px",
                  letterSpacing: "-0.5px",
                }}
              >
                Welcome back
              </h2>
              <p style={{ color: "#7A9B87", fontSize: "13.5px" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#52B72B",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div
              className="fade-up-1"
              style={{
                borderBottom: "1.5px solid #EAF4EC",
                marginBottom: "24px",
              }}
            />

            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Email */}
                <div className="fade-up-2">
                  <label className="input-label">Email</label>
                  <input
                    className="login-input"
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="fade-up-3">
                  <label className="input-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="login-input"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      style={{ paddingRight: "60px" }}
                    />
                    <button
                      type="button"
                      className="show-hide-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    className="fade-up"
                    style={{
                      background: "#FEF2F2",
                      border: "1.5px solid #FECACA",
                      borderRadius: "10px",
                      padding: "11px 14px",
                      color: "#DC2626",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="fade-up-4" style={{ marginTop: "4px" }}>
                  <button
                    className="login-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing in…" : "Sign in →"}
                  </button>
                </div>
              </div>
            </form>

            {/* Back link */}
            <div
              className="fade-up-5"
              style={{ marginTop: "22px", textAlign: "center" }}
            >
              <Link
                to="/"
                style={{
                  color: "#A8C4B2",
                  fontSize: "13px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
