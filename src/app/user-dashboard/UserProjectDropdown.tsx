"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function UserProjectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [printView, setPrintView] = useState("categories"); // 'categories' or 'projects'
  const [selected, setSelected] = useState(["Residual Analysis"]);
  const [selectedPrintItems, setSelectedPrintItems] = useState<string[]>([]);
  const router = useRouter();

  const handleNext = () => {
    if (selected.includes("Residual Analysis")) {
      router.push("/user-dashboard/residual-analysis");
    }
  };

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

  const printItems = [
    "Burleson Sand Volvo A40G Water Truck",
    "Henderson Quarry CAT 745C Dump Truck",
    "Riverside Mining Komatsu HM400 Water Truck",
  ];

  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const togglePrintItem = (item: string) => {
    setSelectedPrintItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handlePrintButtonClick = () => {
    if (isPrintOpen) {
      setIsPrintOpen(false);
    } else {
      setIsPrintOpen(true);
      setPrintView("categories");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex gap-4 ">
        <button onClick={handlePrintButtonClick} className=" py-1 px-4 cursor-pointer text-sm font-medium  bg-[#E9E9E9] text-[#343A40] rounded-lg" >Print Report</button>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-500 cursor-pointer  text-white px-2 py-2 rounded-lg hover:bg-red-600 flex justify-center w-[218px] "
        >
          + Create New Project
        </button>
      </div>
      {/* Print Report Dropdown */}
      {isPrintOpen && (
        <div
          className="absolute left-0 mt-2 z-10"
          style={{
            borderRadius: "8px",
            background: "#FFF",
            boxShadow: "2px 2px 15px 0 rgba(0, 0, 0, 0.10)",
          }}
        >
          {printView === "categories" && (
            <div style={{ width: "218px" }}>
              <ul className="text-sm text-[#343A40] font-normal">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      if (item === "Residual Analysis") {
                        setPrintView("projects");
                      }
                    }}
                    className="flex items-center justify-between pl-4 pr-[10px] py-[10px] hover:bg-gray-100 cursor-pointer"
                  >
                    <span>{item}</span>
                    <span className="text-gray-400">&gt;</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {printView === "projects" && (
            <div style={{ width: "350px" }}>
              <ul className="text-sm  text-[#343A40] font-normal ">
                {printItems.map((item, idx) => (
                  <li key={idx}>
                    <label className="flex items-center  pl-4 pr-[10px] py-[10px] hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPrintItems.includes(item)}
                        onChange={() => togglePrintItem(item)}
                        className="mr-[10px] cursor-pointer accent-[#ED272C]"
                        style={{
                          width: "18px",
                          height: "18px",
                          aspectRatio: "1/1",
                        }}
                      />
                      {item}
                    </label>
                  </li>
                ))}
              </ul>

              {/* Footer Button */}
              <div className="p-2">
                <button
                  onClick={() => console.log("Printing:", selectedPrintItems)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Print ({selectedPrintItems.length})
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 overflow-y-auto"
          style={{
            borderRadius: "8px",
            background: "#FFF",
            boxShadow: "2px 2px 15px 0 rgba(0, 0, 0, 0.10)",
            width: "218px",
          }}
        >
          <ul className="text-sm  text-[#343A40] font-normal ">
            {items.map((item, idx) => (
              <li key={idx}>
                <label className="flex items-center  pl-4 pr-[10px] py-[10px] hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => toggleItem(item)}
                    className="mr-[10px] cursor-pointer accent-[#ED272C]"
                    style={{
                      width: "18px",
                      height: "18px",
                      aspectRatio: "1/1",
                    }}
                  />
                  {item}
                </label>
              </li>
            ))}
          </ul>

          {/* Footer Button */}
          <div className="p-2">
            <button
              onClick={handleNext}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
