export const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

export const RESULT_COLORS = {
  Selected: "#4ADE80",
  Rejected: "#F87171",
  Pending: "#F59E0B",
  Other: "#94A3B8",
};

export const DIFFICULTY_COLORS = {
  Easy: "#4ADE80",
  Medium: "#F59E0B",
  Hard: "#F87171",
  Other: "#94A3B8",
};

export const HOW_IT_WORKS = [
  {
    round: "Round 1",
    title: "Write it while it's fresh",
    desc: "Log the company, role, and every round in detail — your exact experience, not the polished version.",
    icon: "✍️",
    accent: "#4ADE80",
  },
  {
    round: "Round 2",
    title: "Tag what mattered",
    desc: "Mark the topics, difficulty, and resources so others can filter straight to the rounds that matter most.",
    icon: "🏷️",
    accent: "#60A5FA",
  },
  {
    round: "Round 3",
    title: "Help someone clear there",
    desc: "Your post becomes the prep material for the next candidate walking into that same interview room.",
    icon: "🎯",
    accent: "#F59E0B",
  },
];
