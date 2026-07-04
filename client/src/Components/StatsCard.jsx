import React from "react";

const StatsCard = ({
  icon,
  title,
  subtitle,
  badge,
  bgColor,
  borderColor,
  badgeColor,
}) => {
  return (
    <div
      className={`
        ${bgColor}
        ${borderColor}
        border
        rounded-3xl
        p-6
        min-h-[180px]
        w-full
        hover:-translate-y-1
        transition-all
        duration-300
      `}
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <span className="text-3xl">{icon}</span>

        <span
          className={`
            ${badgeColor}
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
          `}
        >
          {badge}
        </span>
      </div>

      {/* Number */}
      <h2 className="text-3xl lg:text-4xl font-bold mt-6 break-words">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mt-4 text-base leading-relaxed">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
