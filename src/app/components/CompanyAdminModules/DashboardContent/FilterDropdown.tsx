"use client";
import React, { useEffect, useRef, useState } from "react";

export default function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState("startToEnd");
  const [order, setOrder] = useState("asc");

  // wrapper ref includes both button + dropdown
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Close with Escape key when open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleConfirm = () => {
    // do whatever filtering logic you need
    console.log("Filter:", filterType, order);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-0 px-2 py-0 text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <span>Time (Start to End)</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-0 w-80 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50">
          <h3 className="text-gray-700 font-medium mb-3">Filter by</h3>

          <div className="inline-flex items-center gap-6">

          <div className="mb-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 text-[#343A40] rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="startToEnd">Start to End</option>
              <option value="endToStart">End to Start</option>
            </select>
          </div>

          <div className="mb-3">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-300 text-[#343A40] rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          </div>

          <button
            onClick={handleConfirm}
            className="w-30 text-[#343A40] border border-[#6C757D]  py-2 rounded-md transition"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
