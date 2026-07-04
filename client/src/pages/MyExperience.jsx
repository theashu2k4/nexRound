import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MyExperience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyExperiences = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/my-experiences`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        setExperiences(data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] text-[#064E3B] px-6 md:px-12 py-10">
      <Navbar />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-16 mb-12">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-[#064E3B] to-[#22C55E] bg-clip-text text-transparent">
            My Experiences
          </h1>
          <p className="mt-2 text-gray-500">
            Your interview journey, saved in one place
          </p>
        </div>

        <button
          onClick={() => navigate("/experience/new")}
          className="bg-linear-to-r from-[#064E3B] to-[#22C55E] text-white px-6 py-3 rounded-2xl shadow-lg shadow-green-200 hover:scale-105 transition font-semibold"
        >
          + Share Experience
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading experiences...</p>
      )}

      {!loading && experiences.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur border border-green-100 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-[#064E3B]">
            No experiences yet 🌱
          </h2>
          <p className="text-gray-500 mt-3">
            Share your first interview experience
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            onClick={() => navigate(`/interview/${exp.slug}`)}
            className="group bg-white/80 backdrop-blur rounded-3xl p-7 border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#064E3B] group-hover:text-[#22C55E] transition">
                  {exp.company}
                </h2>
                <p className="text-gray-500">{exp.role}</p>
              </div>
              <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full h-fit">
                {new Date(exp.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-800">
              {exp.postTitle}
            </h3>
            <p className="mt-3 text-gray-500 line-clamp-3">{exp.content}</p>

            <div className="flex gap-3 mt-6 flex-wrap">
              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm">
                {exp.noOfRounds} Rounds
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm">
                {exp.result}
              </span>
              <span className="bg-pink-50 text-pink-600 px-4 py-1 rounded-full text-sm">
                ❤️ {exp.likes?.count || 0}
              </span>
            </div>

            <div className="mt-7 pt-4 border-t border-green-50 text-sm text-gray-400">
              View experience →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyExperience;
