// components/Dropdown.jsx

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ title, items, icon: Icon }) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-full
          bg-white/70
          backdrop-blur-md
          border border-gray-200
          shadow-sm
          hover:shadow-md
          hover:bg-white
          transition-all duration-300
        "
      >
        {Icon && <Icon size={18} className="text-gray-700" />}

        <span className="font-medium text-gray-800">{title}</span>

        <ChevronDown
          size={18}
          className={`
            text-gray-600
            transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute left-0 top-14 w-64
          origin-top
          rounded-2xl
          border border-gray-100
          bg-white/95
          backdrop-blur-xl
          shadow-xl
          overflow-hidden
          transition-all duration-300 z-50

          ${
            open
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }
        `}
      >
        <div className="p-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="
                w-full text-left
                px-4 py-3
                rounded-xl
                text-gray-700
                hover:bg-gray-100
                hover:text-black
                transition-all duration-200
                flex items-center gap-3
              "
            >
              {item.icon && <item.icon size={18} />}

              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
