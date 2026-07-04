import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE } from "../constants";

// Full static list from constants — sorted alphabetically already
const ALL_COMPANIES = [
  "ACT Fibernet",
  "AMD",
  "Accenture",
  "Adobe",
  "Airtel",
  "Amazon",
  "American Express",
  "Arcesium",
  "Atlassian",
  "BEL",
  "Bajaj Finserv",
  "Bank of America",
  "Barclays",
  "Bosch",
  "Byju's",
  "CDAC",
  "CRED",
  "Capgemini",
  "Cisco",
  "Citi",
  "Cognizant",
  "Comviva",
  "C-DOT",
  "D. E. Shaw",
  "DRDO",
  "Deloitte",
  "EY",
  "Flipkart",
  "Fractal",
  "Futures First",
  "Goldman Sachs",
  "Google",
  "Groww",
  "HSBC",
  "HCLTech",
  "HP",
  "Hexaware",
  "IBM",
  "ISRO",
  "Intel",
  "JP Morgan",
  "Juspay",
  "KPMG",
  "L&T",
  "L&T Technology Services",
  "Media.net",
  "Meesho",
  "Microsoft",
  "Morgan Stanley",
  "Mastercard",
  "Mu Sigma",
  "Myntra",
  "NVIDIA",
  "Nagarro",
  "Navi",
  "NIELIT",
  "O9 Solutions",
  "Oracle",
  "Optum",
  "PayPal",
  "Persistent",
  "PhonePe",
  "Physics Wallah",
  "Publicis Sapient",
  "PwC",
  "Qualcomm",
  "Razorpay",
  "Reliance Jio",
  "SAP",
  "Samsung",
  "ServiceNow",
  "Siemens",
  "Sprinklr",
  "Swiggy",
  "TCS",
  "Tech Mahindra",
  "ThoughtWorks",
  "Tiger Analytics",
  "Tredence",
  "Uber",
  "Unacademy",
  "UpGrad",
  "Vedantu",
  "Visa",
  "Walmart",
  "Warner Bros",
  "Wipro",
  "ZS Associates",
  "Zomato",
];

// Loosely bucket companies — used for the filter tabs
const SECTORS = {
  All: null,
  Product: [
    "Google",
    "Amazon",
    "Microsoft",
    "Adobe",
    "Atlassian",
    "Flipkart",
    "PhonePe",
    "Cisco",
    "Swiggy",
    "Uber",
    "Zomato",
    "Meesho",
    "Myntra",
    "CRED",
    "Razorpay",
    "Groww",
    "Navi",
    "Juspay",
    "Reliance Jio",
    "Samsung",
    "Qualcomm",
    "NVIDIA",
    "AMD",
    "Intel",
    "Media.net",
    "SAP",
    "Siemens",
    "Bosch",
    "HP",
    "IBM",
    "Oracle",
    "ServiceNow",
    "Sprinklr",
    "PayPal",
    "Visa",
    "Walmart",
    "Airtel",
    "ACT Fibernet",
    "O9 Solutions",
    "Warner Bros",
  ],
  Finance: [
    "Goldman Sachs",
    "Morgan Stanley",
    "American Express",
    "Mastercard",
    "HSBC",
    "Barclays",
    "Citi",
    "Bank of America",
    "JP Morgan",
    "D. E. Shaw",
    "Bajaj Finserv",
    "Futures First",
    "Arcesium",
    "ZS Associates",
    "Tiger Analytics",
    "Fractal",
    "Mu Sigma",
  ],
  "Consulting & IT": [
    "Accenture",
    "Deloitte",
    "EY",
    "PwC",
    "KPMG",
    "TCS",
    "Infosys",
    "Wipro",
    "Cognizant",
    "Capgemini",
    "Tech Mahindra",
    "HCLTech",
    "Hexaware",
    "Persistent",
    "Nagarro",
    "Publicis Sapient",
    "ThoughtWorks",
    "Tredence",
    "Comviva",
  ],
  EdTech: ["Byju's", "Unacademy", "Vedantu", "UpGrad", "Physics Wallah"],
  "PSU / Research": ["DRDO", "ISRO", "BEL", "CDAC", "C-DOT", "NIELIT"],
};

const SECTOR_KEYS = Object.keys(SECTORS);

function getInitial(name) {
  return name
    .replace(/^(L&T|D\.\s*E\.)/, (m) => m[0])
    .trim()[0]
    .toUpperCase();
}

// Deterministic muted color per company initial — stays consistent on re-render
const INITIAL_COLORS = {
  A: "#4ADE80",
  B: "#60A5FA",
  C: "#F59E0B",
  D: "#A78BFA",
  E: "#34D399",
  F: "#FB923C",
  G: "#4ADE80",
  H: "#60A5FA",
  I: "#F59E0B",
  J: "#A78BFA",
  K: "#34D399",
  L: "#FB923C",
  M: "#4ADE80",
  N: "#60A5FA",
  O: "#F59E0B",
  P: "#A78BFA",
  Q: "#34D399",
  R: "#FB923C",
  S: "#4ADE80",
  T: "#60A5FA",
  U: "#F59E0B",
  V: "#A78BFA",
  W: "#34D399",
  X: "#FB923C",
  Y: "#4ADE80",
  Z: "#60A5FA",
};

function CompanyCard({ name, count, onClick }) {
  const [hov, setHov] = useState(false);
  const initial = getInitial(name);
  const color = INITIAL_COLORS[initial] ?? "#4ADE80";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#F4FDF7" : "#FFFFFF",
        border: `1px solid ${hov ? "#4ADE8045" : "#E5E7EB"}`,
        borderRadius: 16,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.22s",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "0 12px 32px #4ADE8012" : "none",
        display: "flex",
        alignItems: "center",
        gap: 14,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 3,
          background: `linear-gradient(180deg, ${color}, transparent)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.22s",
        }}
      />

      {/* Avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          flexShrink: 0,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Sora', sans-serif",
          fontWeight: 800,
          fontSize: "1rem",
          color,
        }}
      >
        {initial}
      </div>

      {/* Name + count */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#111827",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginTop: 2 }}>
          {count != null
            ? `${count} experience${count !== 1 ? "s" : ""}`
            : "Be the first to share"}
        </div>
      </div>

      {/* Arrow */}
      <div
        style={{
          color: hov ? "#4ADE80" : "#D1D5DB",
          fontSize: "1rem",
          transition: "color 0.22s",
          flexShrink: 0,
        }}
      >
        →
      </div>
    </div>
  );
}

export default function PopularCompanies() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [countMap, setCountMap] = useState({});

  // Scroll for nav
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Fetch topCompanies from feed to get experience counts
  useEffect(() => {
    fetch(`${API_BASE}/feed`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const map = {};
        (data.topCompanies ?? []).forEach((c) => {
          map[c.name] = c.experienceCount;
        });
        setCountMap(map);
      })
      .catch(() => {}); // counts are optional — page works fine without them
  }, []);

  // Filter logic
  const sectorList = sector === "All" ? null : SECTORS[sector];
  const filtered = ALL_COMPANIES.filter((name) => {
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchesSector = sectorList == null || sectorList.includes(name);
    return matchesSearch && matchesSector;
  });

  // Sort: companies with experiences first, then alphabetical
  const sorted = [...filtered].sort((a, b) => {
    const ca = countMap[a] ?? 0;
    const cb = countMap[b] ?? 0;
    if (cb !== ca) return cb - ca;
    return a.localeCompare(b);
  });

  const totalWithExperiences = ALL_COMPANIES.filter(
    (c) => countMap[c] != null,
  ).length;

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#111827",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nbtn { background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }
        .pbtn { background: linear-gradient(135deg,#4ADE80,#22C55E); color: #ECFDF3; font-weight: 700; font-family: 'Sora',sans-serif; border: none; cursor: pointer; border-radius: 50px; transition: all 0.2s; box-shadow: 0 4px 20px #4ADE8030; }
        .pbtn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px #4ADE8050; }
        .search-input::placeholder { color: #9CA3AF; }
        .search-input:focus { outline: none; border-color: #4ADE80; box-shadow: 0 0 0 3px #4ADE8018; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #1a3d23; border-radius: 3px; }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* PAGE HEADER */}
      <div
        style={{
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: "5%",
          paddingRight: "5%",
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, #ECFDF3 0%, #F8FAFC 70%)",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
              color: "#9CA3AF",
              marginBottom: 20,
            }}
          >
            <span
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", color: "#4ADE80" }}
            >
              Home
            </span>
            <span>›</span>
            <span style={{ color: "#6B7280" }}>Companies</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#4ADE80",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                — COMPANIES —
              </div>
              <h1
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#111827",
                  lineHeight: 1.1,
                  marginBottom: 12,
                }}
              >
                Find your target company
              </h1>
              <p
                style={{
                  fontSize: "0.93rem",
                  color: "#6B7280",
                  lineHeight: 1.65,
                  maxWidth: 500,
                }}
              >
                {ALL_COMPANIES.length} companies, {totalWithExperiences} with
                real interview experiences from students who've been there.
              </p>
            </div>

            <button
              className="pbtn"
              onClick={() => navigate("/experience/new")}
              style={{
                padding: "11px 24px",
                fontSize: "0.88rem",
                whiteSpace: "nowrap",
              }}
            >
              + Share your experience
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div
        style={{
          position: "sticky",
          top: 64,
          zIndex: 50,
          background: "rgba(248,250,252,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E5E7EB",
          padding: "14px 5%",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div
            style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}
          >
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
                fontSize: "0.9rem",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              className="search-input"
              type="text"
              placeholder="Search companies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px 9px 34px",
                border: "1px solid #E5E7EB",
                borderRadius: 50,
                fontSize: "0.85rem",
                background: "#FFFFFF",
                color: "#111827",
                transition: "all 0.2s",
              }}
            />
          </div>

          {/* Sector tabs */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {SECTOR_KEYS.map((s) => (
              <button
                key={s}
                className="nbtn"
                onClick={() => setSector(s)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 50,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  border: `1px solid ${sector === s ? "#4ADE80" : "#E5E7EB"}`,
                  background: sector === s ? "#4ADE8018" : "#FFFFFF",
                  color: sector === s ? "#16A34A" : "#6B7280",
                  transition: "all 0.18s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div
        style={{ maxWidth: 1160, margin: "0 auto", padding: "36px 5% 80px" }}
      >
        {/* Result count */}
        <div
          style={{
            fontSize: "0.78rem",
            color: "#9CA3AF",
            marginBottom: 20,
          }}
        >
          {sorted.length === ALL_COMPANIES.length
            ? `All ${sorted.length} companies`
            : `${sorted.length} compan${sorted.length === 1 ? "y" : "ies"} found`}
          {search && (
            <button
              className="nbtn"
              onClick={() => setSearch("")}
              style={{
                marginLeft: 10,
                color: "#4ADE80",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Grid */}
        {sorted.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {sorted.map((name) => (
              <CompanyCard
                key={name}
                name={name}
                count={countMap[name] ?? null}
                onClick={() =>
                  navigate(
                    `/experience/popular-companies/${encodeURIComponent(name)}`,
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "#9CA3AF",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔍</div>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              No companies match "{search}"
            </div>
            <div style={{ fontSize: "0.85rem", marginBottom: 20 }}>
              Try a different name, or browse all companies.
            </div>
            <button
              className="nbtn"
              onClick={() => {
                setSearch("");
                setSector("All");
              }}
              style={{
                color: "#4ADE80",
                border: "1px solid #4ADE8040",
                padding: "8px 20px",
                borderRadius: 50,
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
            >
              Show all companies
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
