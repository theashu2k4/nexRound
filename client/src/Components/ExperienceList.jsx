import { useNavigate } from "react-router-dom";
import ExperienceCard from "./ExperienceCard";

const ExperienceCardSkeleton = () => (
  <div className="bg-white border border-[#0B3D24]/15 rounded-xl p-5 animate-pulse">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-lg bg-[#0B3D24]/10" />
      <div className="flex flex-col gap-1.5">
        <div className="h-3 w-32 bg-[#0B3D24]/10 rounded" />
        <div className="h-3 w-24 bg-[#0B3D24]/10 rounded" />
      </div>
    </div>
    <div className="h-3 w-3/4 bg-[#0B3D24]/10 rounded mb-3" />
    <div className="flex gap-2 mb-3">
      <div className="h-5 w-14 bg-[#0B3D24]/10 rounded-full" />
      <div className="h-5 w-14 bg-[#0B3D24]/10 rounded-full" />
    </div>
    <div className="h-3 w-full bg-[#0B3D24]/10 rounded mb-1" />
    <div className="h-3 w-2/3 bg-[#0B3D24]/10 rounded" />
  </div>
);

const ExperienceList = ({ experiences, loading }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col gap-3">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => <ExperienceCardSkeleton key={i} />)
        ) : experiences?.length > 0 ? (
          experiences.map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))
        ) : (
          <div className="text-center text-[#0B3D24]/50 py-16 text-sm">
            No experiences yet. Be the first to share yours.
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceList;
