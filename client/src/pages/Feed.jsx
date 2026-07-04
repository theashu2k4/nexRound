import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularCompanies from "../Components/PopularCompanies";
import ExperienceList from "../Components/ExperienceList";
import Navbar from "../Components/Navbar";

const JOB_TYPES = ["All", "Internship", "Full-time"];
const RESULTS = ["All", "Selected", "Rejected"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const Feed = () => {
  const navigate = useNavigate();
  const [topCompanies, setTopCompanies] = useState([]);
  const [trendingExperiences, setTrendingExperiences] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterJobType, setFilterJobType] = useState("All");
  const [filterResult, setFilterResult] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feed`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load feed");
        const data = await res.json();
        setTopCompanies(data.topCompanies || []);
        setTrendingExperiences(data.trendingExperiences || []);
        setTrendingTags(data.trendingTags || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const filteredExperiences = trendingExperiences.filter((exp) => {
    if (filterJobType !== "All" && exp.jobType !== filterJobType) return false;
    if (filterResult !== "All" && exp.result !== filterResult) return false;
    if (filterDifficulty !== "All" && exp.difficulty !== filterDifficulty)
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5]">
      <Navbar />

      {/* HERO */}
      <div className="max-w-[1100px] mx-auto px-6 pt-28 pb-6 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-[#064E3B] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            Live platform · 2.4k+ experiences
          </div>
          <h1 className="text-4xl font-bold text-[#064E3B] leading-tight tracking-tight">
            Ace your <span className="text-[#22C55E]">next round</span>,<br />
            learn from the last.
          </h1>
          <p className="mt-3 text-gray-500 text-[15px] max-w-lg leading-relaxed">
            Real interview experiences from students across India. Filter by
            company, role, and difficulty to prepare smarter.
          </p>
          <div className="flex gap-7 mt-6">
            {[
              ["1,240+", "Experiences"],
              ["180+", "Companies"],
              ["50+", "Colleges"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#064E3B]">{num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/experience/new")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#064E3B] to-[#22C55E] text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-green-200 hover:scale-105 transition whitespace-nowrap"
        >
          <span className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center text-base leading-none">
            +
          </span>
          Share your experience
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1100px] mx-auto px-6 pb-16 flex gap-6 items-start flex-col md:flex-row">
        {/* LEFT FEED */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-center text-sm">
              {error}. Please refresh and try again.
            </div>
          )}

          <div className="bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Popular Companies</SectionTitle>
              <button
                onClick={() => navigate("/experience/popular-companies")}
                className="text-xs text-green-600 font-semibold hover:text-[#064E3B] transition-colors"
              >
                See all →
              </button>
            </div>
            <PopularCompanies companies={topCompanies} loading={loading} />
          </div>

          <div className="bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <SectionTitle>Trending Experiences 🔥</SectionTitle>
            </div>
            <ExperienceList
              experiences={filteredExperiences}
              loading={loading}
            />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full md:w-[280px] flex-shrink-0 flex flex-col gap-5 md:sticky md:top-20">
          <div className="bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-5 shadow-md">
            <SectionTitle className="mb-4">Filter</SectionTitle>

            <FilterGroup
              label="Job type"
              options={JOB_TYPES}
              value={filterJobType}
              onChange={setFilterJobType}
            />
            <FilterGroup
              label="Result"
              options={RESULTS}
              value={filterResult}
              onChange={setFilterResult}
            />
            <FilterGroup
              label="Difficulty"
              options={DIFFICULTIES}
              value={filterDifficulty}
              onChange={setFilterDifficulty}
            />

            {(filterJobType !== "All" ||
              filterResult !== "All" ||
              filterDifficulty !== "All") && (
              <button
                onClick={() => {
                  setFilterJobType("All");
                  setFilterResult("All");
                  setFilterDifficulty("All");
                }}
                className="mt-2 text-xs text-gray-400 hover:text-[#064E3B] transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-5 shadow-md">
            <SectionTitle className="mb-4">Trending tags</SectionTitle>
            <div className="flex flex-col">
              {trendingTags.length > 0 ? (
                trendingTags.map(({ tag, count }, i) => (
                  <div
                    key={tag}
                    onClick={() =>
                      navigate(`/feed?tag=${encodeURIComponent(tag)}`)
                    }
                    className="flex items-center gap-3 py-2 border-b border-green-50 last:border-0 cursor-pointer group"
                  >
                    <span className="text-sm font-bold text-green-300 min-w-[20px]">
                      #{i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-[#064E3B] transition-colors">
                        {tag}
                      </div>
                      <div className="text-xs text-gray-400">{count} posts</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400 py-4 text-center">
                  No trending tags yet.
                </div>
              )}
            </div>
          </div>

          <div className="bg-linear-to-br from-[#064E3B] to-[#22C55E] rounded-2xl p-5 text-center shadow-lg shadow-green-200">
            <div className="text-2xl mb-2">✍️</div>
            <div className="text-sm font-bold text-white mb-1">
              Share your story
            </div>
            <div className="text-xs text-green-100 mb-4 leading-relaxed">
              Help the next student crack their dream company.
            </div>
            <button
              onClick={() => navigate("/experience/new")}
              className="bg-white text-[#064E3B] text-sm font-bold w-full py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              + Share Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ children, className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="w-[3px] h-4 bg-[#22C55E] rounded-full" />
    <span className="text-[15px] font-bold text-[#064E3B]">{children}</span>
  </div>
);

const FilterGroup = ({ label, options, value, onChange }) => (
  <div className="mb-4">
    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">
      {label}
    </div>
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`text-xs px-3 py-1 rounded-lg border transition-all ${
            value === opt
              ? "bg-green-100 border-[#22C55E] text-[#064E3B] font-semibold"
              : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[#22C55E] hover:text-[#064E3B]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default Feed;
