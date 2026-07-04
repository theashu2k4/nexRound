import { useNavigate } from "react-router-dom";
import CompanyCard from "./CompanyCard";

const CompanyCardSkeleton = () => (
  <div className="flex flex-col items-center bg-[#FAFDFB] border border-[#0B3D24]/12 rounded-xl p-4 min-w-32.5 animate-pulse">
    <div className="w-12 h-12 rounded-lg bg-[#0B3D24]/10 mb-3" />
    <div className="h-3 w-16 bg-[#0B3D24]/10 rounded mb-2" />
    <div className="h-3 w-12 bg-[#0B3D24]/10 rounded" />
  </div>
);

const PopularCompanies = ({ companies, loading }) => {
  const navigate = useNavigate();

  return (
    <section className="mb-10">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <CompanyCardSkeleton key={i} />)
          : companies?.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
      </div>
    </section>
  );
};

export default PopularCompanies;
