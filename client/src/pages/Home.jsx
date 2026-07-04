import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroCard from "../components/HeroCard";
import StatStrip from "../components/StatStrip";
import ExperienceCard from "../components/ExperienceCard";
import SkeletonCard from "../components/SkeletonCard";
import { API_BASE, HOW_IT_WORKS } from "../constants";

export default function Home() {
  const navigate = useNavigate();
  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(`${API_BASE}/feed`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Server error: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setFeedData(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  const experiences = feedData?.trendingExperiences ?? [];
  const topCompanies = feedData?.topCompanies ?? [];
  const trendingTags = feedData?.trendingTags ?? [];

  const stats = [
    { value: experiences.length, suffix: "+", label: "Experiences" },
    { value: topCompanies.length, suffix: "+", label: "Companies" },
    {
      value: experiences.reduce((acc, e) => acc + (e.likes?.count ?? 0), 0),
      suffix: "+",
      label: "Helpful Votes",
    },
  ];

  return (
    <div className="bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] text-[#064E3B] overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-[5%] pt-28 pb-20 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#22C55E 1px,transparent 1px),linear-gradient(90deg,#22C55E 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Background glow */}
        <div className="absolute top-[15%] right-[8%] w-[500px] h-[500px] rounded-full bg-green-200/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1160px] mx-auto w-full flex gap-14 items-center flex-wrap">
          {/* Left copy */}
          <div className="flex-1 min-w-[300px] basis-[480px]">
            <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 text-green-700 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              {loading
                ? "LOADING STORIES…"
                : `${experiences.length > 0 ? `${experiences.length}+` : "REAL"} PLACEMENT STORIES`}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-[#064E3B] mb-6">
              Every offer started
              <br />
              with someone clearing
              <br />
              <span className="relative text-[#22C55E]">
                one more round.
                <svg
                  viewBox="0 0 280 10"
                  className="absolute -bottom-1 left-0 w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q70,1 140,7 Q210,13 280,7"
                    fill="none"
                    stroke="#22C55E55"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base text-green-700 leading-relaxed max-w-md mb-8">
              nexRound is where students share exactly what happened in their
              placement interviews — round by round — so the next candidate
              walks in prepared, not guessing.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/experience/new")}
                className="bg-gradient-to-r from-[#064E3B] to-[#22C55E] text-white px-7 py-3.5 rounded-2xl font-semibold text-sm shadow-lg shadow-green-200 hover:scale-105 transition"
              >
                Share your experience →
              </button>
              <button
                onClick={() => navigate("/feed")}
                className="border border-green-200 text-[#064E3B] px-7 py-3.5 rounded-2xl font-semibold text-sm hover:bg-green-50 hover:border-[#22C55E] transition"
              >
                Read what others faced
              </button>
            </div>
          </div>

          {/* Right — hero card */}
          <div className="flex-none basis-[320px] animate-[float_4s_ease-in-out_infinite]">
            {experiences.length > 0 && (
              <HeroCard exp={experiences[0]} loading={loading} />
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatStrip stats={stats} />

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-6 md:px-[5%] py-24 max-w-[1160px] mx-auto"
      >
        <div className="text-xs font-bold text-green-600 tracking-widest uppercase mb-4">
          — How it works —
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#064E3B] mb-12">
          Three rounds of your own
        </h2>
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
        >
          {HOW_IT_WORKS.map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-8 shadow-md"
            >
              <div
                className="absolute top-0 left-0 bottom-0 w-[3px]"
                style={{
                  background: `linear-gradient(180deg,${s.accent},transparent)`,
                }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{
                  background: `${s.accent}18`,
                  border: `1px solid ${s.accent}30`,
                }}
              >
                {s.icon}
              </div>
              <div
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: s.accent }}
              >
                {s.round}
              </div>
              <h3 className="text-lg font-bold text-[#064E3B] mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCES FEED */}
      <section className="px-6 md:px-[5%] pb-24 max-w-[1160px] mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-9">
          <div>
            <div className="text-xs font-bold text-green-600 tracking-widest uppercase mb-3">
              — From the feed —
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#064E3B]">
              Real rounds, real outcomes
            </h2>
          </div>
          <button
            onClick={() => navigate("/feed")}
            className="text-green-600 border border-green-200 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-green-50 hover:border-[#22C55E] transition"
          >
            View all →
          </button>
        </div>

        {error && (
          <div className="p-5 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm mb-6">
            Could not load experiences — {error}
          </div>
        )}

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : experiences.map((exp, i) => (
                <ExperienceCard key={exp._id ?? i} exp={exp} />
              ))}
        </div>
      </section>

      {/* TRENDING TAGS */}
      {!loading && trendingTags.length > 0 && (
        <section className="px-6 md:px-[5%] pb-16 max-w-[1160px] mx-auto">
          <div className="text-xs font-bold text-green-600 tracking-widest uppercase mb-4">
            — Trending topics —
          </div>
          <div className="flex flex-wrap gap-2.5">
            {trendingTags.map((t, i) => (
              <button
                key={i}
                onClick={() =>
                  navigate(`/feed?tag=${encodeURIComponent(t.tag)}`)
                }
                className="bg-white/80 backdrop-blur border border-green-100 rounded-full px-4 py-2 text-sm text-gray-700 flex items-center gap-1.5 hover:border-[#22C55E] hover:text-green-700 transition shadow-sm"
              >
                {t.tag}
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* TOP COMPANIES */}
      {!loading && topCompanies.length > 0 && (
        <section className="px-6 md:px-[5%] pb-16 max-w-[1160px] mx-auto">
          <div className="text-xs font-bold text-green-600 tracking-widest uppercase mb-4">
            — Top companies —
          </div>
          <div className="flex flex-wrap gap-2.5">
            {topCompanies.map((c, i) => (
              <button
                key={i}
                onClick={() =>
                  navigate(
                    `/experience/popular-companies/${encodeURIComponent(c.name)}`,
                  )
                }
                className="bg-white/80 backdrop-blur border border-green-100 rounded-xl px-4.5 py-2.5 text-sm font-semibold text-[#064E3B] flex items-center gap-2 hover:border-[#22C55E] hover:bg-green-50 transition shadow-sm"
              >
                {c.name}
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                  {c.experienceCount}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="px-6 md:px-[5%] pb-24">
        <div className="relative overflow-hidden max-w-[1160px] mx-auto bg-linear-to-br from-green-50 via-[#22C55E] to-[#064E3B] rounded-3xl px-6 md:px-[5%] py-14 flex justify-between items-center flex-wrap gap-7 border border-green-200 shadow-xl">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-green-200/20 blur-2xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#064E3B] mb-2.5">
              Already cleared your rounds?
            </h2>
            <p className="text-sm text-[#064E3B] max-w-md leading-relaxed">
              Someone is preparing for that exact interview right now. Your
              two-minute writeup is their best prep material.
            </p>
          </div>
          <button
            onClick={() => navigate("/experience/new")}
            className="relative bg-white text-[#064E3B] px-8 py-3.5 rounded-2xl font-bold text-base shadow-lg hover:scale-105 transition whitespace-nowrap"
          >
            + Share your experience
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-green-100 px-6 md:px-[5%] py-9 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border-[1.5px] border-[#22C55E] bg-linear-to-br from-green-50 to-[#22C55E] flex items-center justify-center">
            <span className="font-extrabold text-[10px] text-white">NR</span>
          </div>
          <span className="font-bold text-[#064E3B] text-sm">
            nex<span className="text-[#22C55E]">Round</span>
          </span>
          <span className="text-gray-400 text-xs">
            · Share Experiences. Shape Futures.
          </span>
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-gray-400 text-xs hover:text-[#064E3B] transition"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="text-gray-400 text-xs">© 2025 nexRound</div>
      </footer>
    </div>
  );
}
