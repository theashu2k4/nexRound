import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { API_BASE } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, refetchUser } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    college: "",
    graduationYear: "",
    branch: "",
    skills: "",
  });
  const [savingInfo, setSavingInfo] = useState(false);
  const [infoMsg, setInfoMsg] = useState({ type: "", text: "" });

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingPw, setSavingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState({ type: "", text: "" });
  const [scrolled, setScrolled] = useState(false);

  // Redirect to login if definitely not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  // Populate form once user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? "",
        emailId: user.emailId ?? "",
        college: user.college ?? "",
        graduationYear: user.graduationYear ?? "",
        branch: user.branch ?? "",
        skills: Array.isArray(user.skills) ? user.skills.join(", ") : "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleInfoChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInfoMsg({ type: "", text: "" });
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    setInfoMsg({ type: "", text: "" });
    try {
      const payload = {
        name: formData.name,
        emailId: formData.emailId,
        college: formData.college,
        branch: formData.branch,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (formData.graduationYear) {
        payload.graduationYear = Number(formData.graduationYear);
      }

      const res = await fetch(`${API_BASE}/profile/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      await refetchUser();
      setInfoMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setInfoMsg({ type: "error", text: err.message });
    } finally {
      setSavingInfo(false);
    }
  };

  const handlePwChange = (e) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
    setPwMsg({ type: "", text: "" });
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    setPwMsg({ type: "", text: "" });

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg({ type: "error", text: "New passwords don't match." });
      return;
    }

    setSavingPw(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/change-password`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: pwForm.currentPassword,
            newPassword: pwForm.newPassword,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password change failed");

      setPwMsg({ type: "success", text: "Password updated successfully." });
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwMsg({ type: "error", text: err.message });
    } finally {
      setSavingPw(false);
    }
  };

  const handleAvatarSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarMsg({ type: "", text: "" });
    setUploadingAvatar(true);
    try {
      const body = new FormData();
      body.append("avatar", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/avatar`, {
        method: "POST",
        credentials: "include",
        body, // no Content-Type header — browser sets the multipart boundary
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      await refetchUser();
      setAvatarMsg({ type: "success", text: "Avatar updated." });
    } catch (err) {
      setAvatarMsg({ type: "error", text: err.message });
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  };

  if (authLoading || !user) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
        <Navbar scrolled={scrolled} />
        <div
          style={{
            paddingTop: 140,
            textAlign: "center",
            color: "#6B7280",
            fontFamily: "'Inter',sans-serif",
          }}
        >
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#F8FAFC",
        color: "#111827",
        fontFamily: "'Inter',sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box}
        .field-label{font-size:0.82rem;font-weight:600;color:#374151;display:block;margin-bottom:6px}
        .field-input{
          width:100%;background:#F9FAFB;border:1.5px solid #E5E7EB;border-radius:10px;
          padding:11px 14px;font-size:0.9rem;color:#111827;outline:none;
          transition:border-color .18s, box-shadow .18s, background .18s;
          font-family:'Inter',sans-serif;
        }
        .field-input:focus{border-color:#4ADE80;background:#fff;box-shadow:0 0 0 3px rgba(74,222,128,0.14)}
        .save-btn{
          background:#16A34A;color:#fff;font-weight:700;font-size:0.88rem;
          padding:11px 24px;border:none;border-radius:10px;cursor:pointer;
          transition:background .18s, transform .1s;
        }
        .save-btn:hover:not(:disabled){background:#15803D}
        .save-btn:active:not(:disabled){transform:scale(0.98)}
        .save-btn:disabled{opacity:0.55;cursor:not-allowed}
        .msg-success{background:#F0FDF4;border:1px solid #BBF7D0;color:#15803D;padding:10px 14px;border-radius:8px;font-size:0.83rem;margin-top:12px}
        .msg-error{background:#FEF2F2;border:1px solid #FECACA;color:#DC2626;padding:10px 14px;border-radius:8px;font-size:0.83rem;margin-top:12px}
        .avatar-upload-btn{
          font-size:0.8rem;font-weight:600;color:#16A34A;background:#F0FDF4;
          border:1px solid #BBF7D0;border-radius:8px;padding:7px 14px;cursor:pointer;
          transition:background .18s;
        }
        .avatar-upload-btn:hover{background:#DCFCE7}
      `}</style>

      <Navbar scrolled={scrolled} />

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "120px 5% 80px",
        }}
      >
        <div style={{ marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 800,
              fontSize: "1.9rem",
              color: "#111827",
              marginBottom: 6,
            }}
          >
            Account settings
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
            Manage your profile, password, and avatar.
          </p>
        </div>

        {/* AVATAR CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: "28px 28px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #E5E7EB",
              }}
            />
          ) : (
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#4ADE80,#22C55E)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#ECFDF3",
                flexShrink: 0,
              }}
            >
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 2 }}>
              {user.name}
            </p>
            <p style={{ color: "#6B7280", fontSize: "0.84rem", marginBottom: 12 }}>
              {user.emailId}
            </p>
            <button
              className="avatar-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              type="button"
            >
              {uploadingAvatar ? "Uploading…" : "Change avatar"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              style={{ display: "none" }}
            />
            {avatarMsg.text && (
              <div className={avatarMsg.type === "success" ? "msg-success" : "msg-error"}>
                {avatarMsg.text}
              </div>
            )}
          </div>
        </div>

        {/* PROFILE INFO CARD */}
        <form
          onSubmit={handleInfoSubmit}
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: "28px 28px",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: 20,
            }}
          >
            Profile information
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label className="field-label">Full name</label>
              <input
                className="field-input"
                name="name"
                value={formData.name}
                onChange={handleInfoChange}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleInfoChange}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label className="field-label">College</label>
              <input
                className="field-input"
                name="college"
                value={formData.college}
                onChange={handleInfoChange}
                placeholder="Your college"
              />
            </div>
            <div>
              <label className="field-label">Graduation year</label>
              <input
                className="field-input"
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInfoChange}
                placeholder="2026"
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="field-label">Branch</label>
            <input
              className="field-input"
              name="branch"
              value={formData.branch}
              onChange={handleInfoChange}
              placeholder="Computer Science"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="field-label">Skills (comma-separated)</label>
            <input
              className="field-input"
              name="skills"
              value={formData.skills}
              onChange={handleInfoChange}
              placeholder="React, Node.js, DSA"
            />
          </div>

          <button className="save-btn" type="submit" disabled={savingInfo}>
            {savingInfo ? "Saving…" : "Save changes"}
          </button>

          {infoMsg.text && (
            <div className={infoMsg.type === "success" ? "msg-success" : "msg-error"}>
              {infoMsg.text}
            </div>
          )}
        </form>

        {/* PASSWORD CARD */}
        <form
          onSubmit={handlePwSubmit}
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            padding: "28px 28px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Sora',sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: 20,
            }}
          >
            Change password
          </h2>

          <div style={{ marginBottom: 16 }}>
            <label className="field-label">Current password</label>
            <input
              className="field-input"
              type="password"
              name="currentPassword"
              value={pwForm.currentPassword}
              onChange={handlePwChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label className="field-label">New password</label>
              <input
                className="field-input"
                type="password"
                name="newPassword"
                value={pwForm.newPassword}
                onChange={handlePwChange}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="field-label">Confirm new password</label>
              <input
                className="field-input"
                type="password"
                name="confirmPassword"
                value={pwForm.confirmPassword}
                onChange={handlePwChange}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>

          <button className="save-btn" type="submit" disabled={savingPw}>
            {savingPw ? "Updating…" : "Update password"}
          </button>

          {pwMsg.text && (
            <div className={pwMsg.type === "success" ? "msg-success" : "msg-error"}>
              {pwMsg.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}