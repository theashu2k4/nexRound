import { useState } from "react";
import Navbar from "../Components/Navbar";
import companies from "../constants/companies";
import roles from "../constants/roles";
import tags from "../constants/tags";
import { useNavigate } from "react-router-dom";

const steps = [
  "Basic Details",
  "Overview & Tags",
  "Interview Rounds",
  "Final Review",
];

const SharePost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    jobType: "",
    result: "",
    interviewMode: "",
    numberOfRounds: "",
    ctc: "",
    title: "",
    excerpt: "",
    tags: [],
    finalExperience: "",
    authorName: "",
    college: "",
    rounds: [{ roundName: "", questionsAsked: "", roundExperience: "" }],
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleRoundChange = (index, field, value) => {
    const updatedRounds = [...formData.rounds];
    updatedRounds[index][field] = value;
    setFormData({ ...formData, rounds: updatedRounds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/experience`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            company: formData.company,
            role: formData.role,
            jobType: formData.jobType,
            result: formData.result,
            mode: formData.interviewMode,
            ctc: formData.ctc ? Number(formData.ctc) : undefined,
            postTitle: formData.title,
            tags: formData.tags,
            rounds: formData.rounds,
            content: formData.finalExperience,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate("/my-experiences");
      window.location.reload();
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectClass =
    "w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-green-100";
  const inputClass = selectClass;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5]">
      <Navbar />
      <div className="px-4 pt-24 pb-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-green-100 bg-white/80 backdrop-blur p-6 shadow-md md:p-10">
          {/* Header */}
          <div className="mb-10">
            <p className="flex items-center gap-2 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]"></span>
              Share Your Placement Journey
            </p>
            <h1 className="py-4 text-5xl font-bold bg-linear-to-r from-[#064E3B] to-[#22C55E] bg-clip-text text-transparent">
              Create Interview Experience
            </h1>
            <p className="font-medium text-gray-500">
              Help students prepare smarter by sharing your real interview
              experience, questions asked, and preparation tips.
            </p>
          </div>

          {/* Progress Header */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex min-w-max items-center gap-8">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setCurrentStep(stepNumber)}
                    className={`flex items-center gap-4 rounded-2xl border px-5 py-3 transition ${
                      isActive
                        ? "border-[#22C55E] bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                        isCompleted || isActive
                          ? "bg-linear-to-r from-[#064E3B] to-[#22C55E] text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    <p
                      className={`text-sm font-semibold ${isActive ? "text-[#064E3B]" : "text-gray-700"}`}
                    >
                      {step}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1 */}
            {currentStep === 1 && (
              <section>
                <div className="mb-6">
                  <h2 className="mb-4 text-2xl font-semibold text-[#064E3B]">
                    Basic Details
                  </h2>
                  <p className="mb-4 text-gray-600">
                    Add core information about your interview process.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#064E3B]">
                      Company Name
                    </label>
                    <select
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select Company
                      </option>
                      {companies.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#064E3B]">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#064E3B]">
                      Job Type
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      <option value="On-Campus">On-Campus</option>
                      <option value="Off-Campus">Off-Campus</option>
                      <option value="Internship">Internship</option>
                      <option value="PPO">PPO</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#064E3B]">
                      Result
                    </label>
                    <select
                      name="result"
                      value={formData.result}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select Result
                      </option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#064E3B]">
                      Mode
                    </label>
                    <select
                      name="interviewMode"
                      value={formData.interviewMode}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select Mode
                      </option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Number of Rounds
                    </label>
                    <input
                      type="number"
                      name="numberOfRounds"
                      value={formData.numberOfRounds}
                      onChange={handleChange}
                      placeholder="e.g. 4"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      CTC (LPA)
                    </label>
                    <input
                      type="number"
                      name="ctc"
                      value={formData.ctc}
                      onChange={handleChange}
                      placeholder="e.g. 45"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <section>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#064E3B]">
                      Experience Overview
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Give your experience a strong and descriptive title.
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Post Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Google SWE Internship Interview Experience"
                      className={inputClass}
                    />
                  </div>
                </section>
                <section>
                  <div className="mt-12 mb-6">
                    <h2 className="text-2xl font-semibold text-[#064E3B]">
                      Topics & Tags
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Select important topics discussed during interviews.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                          formData.tags.includes(tag)
                            ? "border-[#22C55E] bg-green-50 text-[#064E3B]"
                            : "border-gray-300 text-gray-700 hover:border-[#22C55E]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-[#064E3B]">
                      Interview Rounds
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Add round-wise details and questions asked.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        rounds: [
                          ...prev.rounds,
                          {
                            roundName: "",
                            questionsAsked: "",
                            roundExperience: "",
                          },
                        ],
                      }))
                    }
                    className="rounded-2xl bg-linear-to-r from-[#064E3B] to-[#22C55E] px-5 py-3 text-lg font-medium text-white hover:scale-105 transition"
                  >
                    + Add Round
                  </button>
                </div>
                {formData.rounds.map((round, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-green-100 bg-white/60 p-6 mb-4"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-[#064E3B]">
                        Round {index + 1}
                      </h2>
                      {formData.rounds.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              rounds: prev.rounds.filter((_, i) => i !== index),
                            }))
                          }
                          className="text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Round Name
                        </label>
                        <input
                          type="text"
                          value={round.roundName}
                          onChange={(e) =>
                            handleRoundChange(
                              index,
                              "roundName",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. Online Assessment"
                          className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Questions Asked
                        </label>
                        <textarea
                          rows="4"
                          value={round.questionsAsked}
                          onChange={(e) =>
                            handleRoundChange(
                              index,
                              "questionsAsked",
                              e.target.value,
                            )
                          }
                          placeholder="Mention questions asked..."
                          className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-4 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
                        />
                      </div>
                      <div>
                        <label className="my-2 block text-sm font-medium text-gray-700">
                          Round Experience
                        </label>
                        <textarea
                          rows="5"
                          value={round.roundExperience}
                          onChange={(e) =>
                            handleRoundChange(
                              index,
                              "roundExperience",
                              e.target.value,
                            )
                          }
                          placeholder="Describe your complete experience for this round..."
                          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-[#064E3B]">
                    Final Experience
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Share your overall journey, preparation strategy, and advice
                    for juniors.
                  </p>
                </div>
                <textarea
                  rows="10"
                  name="finalExperience"
                  value={formData.finalExperience}
                  onChange={handleChange}
                  placeholder="Tell Your Complete Interview Experience Here..."
                  className="w-full rounded-3xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-green-100"
                />
              </section>
            )}

            {submitError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {submitError}
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-4 border-t border-green-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="rounded-2xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < steps.length && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="rounded-2xl bg-linear-to-r from-[#064E3B] to-[#22C55E] px-6 py-3 font-medium text-white transition hover:scale-105"
                  >
                    Next →
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  className="rounded-2xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Save Draft
                </button>
                {currentStep === steps.length && (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-2xl bg-linear-to-r from-[#064E3B] to-[#22C55E] px-8 py-4 font-semibold text-white transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Publishing..." : "Publish Experience →"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SharePost;
