import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/experience/popular-companies/${company.name}`)}
      className="flex flex-col items-center justify-between bg-[#FAFDFB] border border-[#0B3D24]/12 rounded-xl p-4 cursor-pointer min-w-32.5 hover:border-[#4CAF3D] hover:bg-white hover:shadow-md transition-all duration-200 group"
    >
      <div className="w-12 h-12 rounded-lg bg-[#0B3D24]/10 flex items-center justify-center mb-3 overflow-hidden">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <span className="text-[#0B3D24] font-bold text-lg">
            {company.name.charAt(0)}
          </span>
        )}
      </div>

      <p className="text-[#0B3D24] text-sm font-medium text-center leading-tight mb-2">
        {company.name}
      </p>

      <span className="text-xs text-[#4CAF3D] font-medium">
        {company.experienceCount} Experiences
      </span>
    </div>
  );
};

export default CompanyCard;
