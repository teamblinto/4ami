"use client";

import { useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function ProjectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(["Residual Analysis"]);

  const items = [
    "Appraisal – Valuation",
    "Credit Risk",
    "Condition Report",
    "Existing Project",
    "Extended Warranty",
    "Inspection",
    "Insurance",
    "Transportation",
    "Maintenance Provisions",
    "Portfolio Monitoring",
    "Property Tax Assessment",
    "Residual Analysis",
    "Repossession",
    "Residual Insurance",
    "Return Provisions",
    "Tax Title & License",
    "VIN & Serial Number Verification",
    "Others - Schedule a Call",
  ];

  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="relative inline-block text-left w-60">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 flex justify-center w-60"
      >
        
        + Create New Project
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-10 w-full shadow-lg max-h-150 overflow-y-auto"
          style={{
            borderRadius: "4px",
            border: "1px solid #CED4DA",
            background: "#FFF",
          }}
        >
          <ul className="py-2 text-sm text-gray-700 space-y-1">
            {items.map((item, idx) => (
              <li key={idx}>
          <label className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => toggleItem(item)}
              className="mr-2 accent-[#ED272C]"
              style={{ width: "18px", height: "18px", aspectRatio: "1/1" }}
            />
            {item}
          </label>
              </li>
            ))}
          </ul>

          {/* Footer Button */}
          <div className="p-2">
            <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
