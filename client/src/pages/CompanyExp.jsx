import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE } from "../constants";

export default function CompanyExperiences() {
  const navigate = useNavigate();
  const { companyName: encodedName } = useParams();
  const companyName = decodeURIComponent(encodedName);

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${API_BASE}/experiences/company/${encodeURIComponent(companyName)}`,
          { credentials: "include" },
        );
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (!res.ok)
          throw new Error(data.message || "Failed to load experiences");
        setExperiences(data.data ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, [companyName]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5]">
      <Navbar />

      {/* HEADER */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 flex-wrap">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-green-600 hover:text-[#064E3B]"
          >
            Home
          </span>
          <span>›</span>
          <span
            onClick={() => navigate("/experience/popular-companies")}
            className="cursor-pointer text-green-600 hover:text-[#064E3B]"
          >
            Companies
          </span>
          <span>›</span>
          <span className="text-gray-500">{companyName}</span>
        </div>

        <div className="flex justify-between items-end flex-wrap gap-5">
          <div>
            <p className="text-xs font-semibold text-green-600 tracking-widest uppercase mb-2">
              Interview Experiences
            </p>
            <h1 className="text-4xl font-bold bg-linear-to-r from-[#064E3B] to-[#22C55E] bg-clip-text text-transparent">
              {companyName}
            </h1>
            <p className="mt-2 text-gray-500 text-sm max-w-md">
              {loading
                ? "Loading experiences…"
                : `${experiences.length} experience${experiences.length !== 1 ? "s" : ""} shared by students`}
            </p>
          </div>
          <button
            onClick={() => navigate("/experience/new")}
            className="bg-linear-to-r from-[#064E3B] to-[#22C55E] text-white px-6 py-3 rounded-2xl shadow-lg shadow-green-200 font-semibold text-sm hover:scale-105 transition whitespace-nowrap"
          >
            + Share your experience
          </button>
        </div>
      </div>

      {/* RESULTS */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {loading && (
          <div className="text-center py-20 text-gray-400">
            Loading experiences...
          </div>
        )}

        {!loading && error && (
          <div className="max-w-xl mx-auto text-center p-10 bg-red-50 border border-red-200 rounded-2xl">
            <div className="font-bold text-red-600 mb-2">
              Something went wrong
            </div>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="max-w-xl mx-auto text-center p-14 bg-white/80 backdrop-blur border border-green-100 rounded-3xl shadow-md">
            <div className="text-4xl mb-3">🌱</div>
            <div className="font-bold text-lg text-[#064E3B] mb-2">
              No experiences yet for {companyName}
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Be the first to share your interview journey here.
            </p>
            <button
              onClick={() => navigate("/experience/new")}
              className="bg-gradient-to-r from-[#064E3B] to-[#22C55E] text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:scale-105 transition"
            >
              + Share Experience
            </button>
          </div>
        )}

        {!loading && !error && experiences.length > 0 && (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
          >
            {experiences.map((exp) => (
              <div
                key={exp._id}
                onClick={() => navigate(`/interview/${exp.slug}`)}
                className="bg-white/80 backdrop-blur border border-green-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-lg text-[#064E3B]">
                      {exp.role}
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {exp.postTitle}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full h-fit whitespace-nowrap">
                    {new Date(exp.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-4 leading-relaxed line-clamp-3">
                  {exp.content}
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    {exp.noOfRounds} Rounds
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {exp.result}
                  </span>
                  <span className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full">
                    ❤️ {exp.likes?.count || 0}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-green-50 text-sm text-gray-400">
                  View experience →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
