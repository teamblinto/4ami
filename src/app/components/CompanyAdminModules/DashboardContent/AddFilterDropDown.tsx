"use client";
import React, { useState } from "react";

export default function AddFilterDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  const [industry, setIndustry] = useState("");
  const [assetType, setAssetType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const handleConfirm = () => {
    console.log("Filters:", { industry, assetType, make, model });
    setIsOpen(false);
  };

  return (
    <div>
      {/* Trigger Button */}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border border-gray-300 rounded-lg px-4 py-2 p-6 pl-6 text-sm text-red-500 flex items-center gap-1 hover:bg-red-50"
      >
        {isOpen ? "Add Filter" : "Add Filter"}

        <svg className="ml-2" width="10" height="8" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.40349 4.94425C4.26286 5.0847 4.07224 5.16359 3.87349 5.16359C3.67474 5.16359 3.48411 5.0847 3.34349 4.94425L0.514485 2.11625C0.373854 1.97555 0.294875 1.78475 0.294922 1.58582C0.294969 1.3869 0.374038 1.19613 0.514735 1.0555C0.655433 0.91487 0.846233 0.835891 1.04516 0.835938C1.24409 0.835984 1.43485 0.915054 1.57549 1.05575L3.87349 3.35375L6.17149 1.05575C6.31287 0.919064 6.50229 0.843378 6.69894 0.844994C6.89559 0.846609 7.08374 0.925397 7.22286 1.06439C7.36198 1.20338 7.44095 1.39145 7.44275 1.5881C7.44455 1.78475 7.36904 1.97424 7.23249 2.11575L4.40399 4.94475L4.40349 4.94425Z" fill="#ED272C"/>
        </svg>

        
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="absolute left-0 w-[1000px] z-50">
        {/* <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"> */}
          {/* Modal Box */}
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-700 mb-6 text-start">
              Filter by
            </h2>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Industry */}

              <div>
                <label className="block text-sm text-start text-gray-600 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={industry}  // ✅ fixed binding
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Type or Select One"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  list="industryOptions"
                />
                <datalist id="industryOptions">
                  <option value="Construction" />
                  <option value="Mining" />
                  <option value="Other" />
                </datalist>
              </div>

              {/* <div>
                <label className="block text-sm text-start text-gray-600 mb-1">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Other</option>
                  <option value="industry">Select Industry</option>
                  <option value="construction">Construction</option>
                  <option value="mining">Mining</option>
                </select>
              </div> */}

              {/* Asset Type */}
              <div>
                <label className="block text-sm text-start text-gray-600 mb-1">
                  Asset Type
                </label>
                <input
                  type="text"
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  placeholder="Type or Select One"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  list="assetOptions"
                />
                <datalist id="assetOptions">
                  <option value="Excavator" />
                  <option value="Solar Hybrid Excavator" />
                  <option value="Loader" />
                </datalist>
              </div>

              {/* Make */}
              <div>
                <label className="block text-sm text-start text-gray-600 mb-1">Make</label>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  placeholder="Type or Select One"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  list="makeOptions"
                />
                <datalist id="makeOptions">
                  <option value="Caterpillar" />
                  <option value="Volvo" />
                  <option value="Hitachi" />
                </datalist>
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm text-start text-gray-600 mb-1">Model</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Type or Select One"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  list="modelOptions"
                />
                <datalist id="modelOptions">
                  <option value="Model 1" />
                  <option value="Model 2" />
                  <option value="Model 3" />
                </datalist>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition flex items-start justify-start"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
