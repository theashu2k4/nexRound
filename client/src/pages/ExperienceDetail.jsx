import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ExperienceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/experience/${slug}`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setExperience(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading experience...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm">
          {error}
        </div>
      </div>
    );

  const resultColor =
    {
      Selected: "text-green-700 bg-green-100 border-green-200",
      Rejected: "text-red-600 bg-red-50 border-red-200",
      Pending: "text-yellow-700 bg-yellow-50 border-yellow-200",
    }[experience.result] || "text-gray-600 bg-gray-100 border-gray-200";

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] text-[#064E3B]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#064E3B] text-sm mb-8 transition"
        >
          ← Back
        </button>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            {experience.company}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
            {experience.role}
          </span>
          <span
            className={`px-3 py-1 rounded-full border text-sm font-medium ${resultColor}`}
          >
            {experience.result}
          </span>
        </div>

        <h1 className="text-3xl font-bold leading-tight mb-4 tracking-tight text-[#064E3B]">
          {experience.postTitle}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-8 flex-wrap">
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
            {experience.author?.name?.[0]}
          </span>
          <span>{experience.author?.name}</span>
          {experience.author?.college && (
            <>
              <span>·</span>
              <span>{experience.author.college}</span>
            </>
          )}
          <span>·</span>
          <span>
            {new Date(experience.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Meta Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Job Type", value: experience.jobType },
            { label: "Mode", value: experience.mode },
            { label: "Rounds", value: experience.noOfRounds },
            {
              label: "CTC",
              value: experience.ctc ? `${experience.ctc} LPA` : "N/A",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/80 backdrop-blur border border-green-100 rounded-xl p-4"
            >
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className="font-semibold text-[#064E3B]">{value}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {experience.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-green-100 mb-8" />

        {/* Rounds */}
        {experience.rounds?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-5 text-[#064E3B]">
              Interview Rounds
            </h2>
            <div className="space-y-4">
              {experience.rounds.map((round, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-[#064E3B]">
                      {round.roundName}
                    </h3>
                  </div>
                  {round.questionsAsked && (
                    <div className="mb-4">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
                        Questions Asked
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {round.questionsAsked}
                      </p>
                    </div>
                  )}
                  {round.roundExperience && (
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
                        Experience
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {round.roundExperience}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overall Experience */}
        {experience.content && (
          <div className="bg-white/80 backdrop-blur border border-green-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-[#064E3B]">
              Overall Experience
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
              {experience.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceDetail;
