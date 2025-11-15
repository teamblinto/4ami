"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ProjectType {
  id?: string;
  name: string;
  type?: string;
}

export default function UserProjectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [showProjectList, setShowProjectList] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPrintItems, setSelectedPrintItems] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [, setLoading] = useState(true);
  const router = useRouter();

  // Fetch project types from API
  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem('authToken');
        
        const response = await fetch('/api/projects/types', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Project types API response:', data);
          
          // Handle different possible response structures
          let projectTypes: ProjectType[] = [];
          if (Array.isArray(data)) {
            projectTypes = data;
          } else if (data.data && Array.isArray(data.data)) {
            projectTypes = data.data;
          } else if (data.projectTypes && Array.isArray(data.projectTypes)) {
            projectTypes = data.projectTypes;
          } else if (data.types && Array.isArray(data.types)) {
            projectTypes = data.types;
          }

          // Extract names from project types
          const names = projectTypes.map((type: ProjectType) => type.name || type.type || String(type));
          setItems(names);
        } else {
          console.error('Failed to fetch project types:', response.status);
          // Fallback to default items on error
          setItems([
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
          ]);
        }
      } catch (error) {
        console.error('Error fetching project types:', error);
        // Fallback to default items on error
        setItems([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectTypes();
  }, []);

  // Convert project type name to route-friendly slug
  const getRouteFromProjectType = (projectType: string): string => {
    // Convert to lowercase and replace special characters with hyphens
    const slug = projectType
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    return `/company-admin/${slug}`;
  };

  const handleNext = () => {
    if (!selected) return;
    
    const route = getRouteFromProjectType(selected);
    router.push(`${route}?type=${encodeURIComponent(selected)}`);
  };

  const printItems = [
    "Burleson Sand Volvo A40G Water Truck",
    "Henderson Quarry CAT 745C Dump Truck",
    "Riverside Mining Komatsu HM400 Water Truck",
  ];

  const toggleItem = (item: string) => {
    setSelected(selected === item ? null : item);
  };

  const togglePrintItem = (item: string) => {
    setSelectedPrintItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handlePrintButtonClick = () => {
    if (isPrintOpen) {
      setIsPrintOpen(false);
      setShowProjectList(false);
    } else {
      setIsPrintOpen(true);
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
          className="absolute -left-55 mt-4 z-10 flex"
          style={{
            borderRadius: "8px",
            background: "#FFF",
            boxShadow: "2px 2px 15px 0 rgba(0, 0, 0, 0.10)",
          }}
        >
          {/* Category List */}
          <div style={{ width: "218px", maxHeight: "409px", overflowY: "auto" }}>
            <ul className="text-sm text-[#343A40] font-normal  ">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    if (item === "Residual Analysis") {
                      setShowProjectList(true);
                    } else {
                      setShowProjectList(false); // Hide project list for other categories
                    }
                  }}
                  className="flex items-center justify-between pl-4 pr-[10px] py-[10px] hover:bg-gray-100 cursor-pointer"
                >
                  <span>{item}</span>
                  <span className="text-gray-400">
                    <Image
                      src="/mingcute_down-fill.svg"
                      alt="Right Arrow"
                      width={16}
                      height={16}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Project List (conditionally shown) */}
          {showProjectList && (
            <div style={{ width: "350px", borderLeft: "1px solid #eee", maxHeight: "415px", overflowY: "auto" }}>
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
            maxHeight: "425px",
          }}
        >
          <ul className="text-sm  text-[#343A40] font-normal ">
            {items.map((item, idx) => (
              <li key={idx}>
                <label className="flex items-center  pl-4 pr-[10px] py-[6px] hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected === item}
                    onChange={() => toggleItem(item)}
                    className="mr-[10px] cursor-pointer accent-[#ED272C]"
                    style={{
                      width: "15px",
                      height: "15px",
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
              disabled={!selected}
              className={`w-full px-4 py-2 rounded-lg ${
                selected
                  ? 'bg-red-500 text-white cursor-pointer hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

