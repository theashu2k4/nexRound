import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#0B3D24]/8">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-[#0B3D24] flex items-center justify-center font-bold text-[10px]">
            N
          </div>
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            nex<span className="text-[#4CAF3D]">Round</span>
          </span>
        </div>
        <p className="text-xs text-[#0B3D24]/40">
          Share experiences. Shape futures. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
