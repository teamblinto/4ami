"use client";
import React, { useEffect, useRef, useState } from "react";

export default function FilterProjectStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState("startToEnd");
  const [order, setOrder] = useState("asc");

  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (containerRef.current && e.target && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Close with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleConfirm = () => {
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
        <span>Status</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50">
          <h3 className="text-gray-700 font-medium mb-4">Filter by</h3>

          <div className="flex items-center gap-4 mb-4">
            {/* Filter Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 text-[#343A40] rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="startToEnd">Generated</option>
              <option value="endToStart">Pending</option>
              <option value="endToStart">Submitted</option>
              <option value="endToStart">In Process</option>
              <option value="endToStart">Attention</option>
              <option value="endToStart">Amendment</option>
              <option value="endToStart">Completed</option>
            </select>

            {/* Order */}
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-300 text-[#343A40] rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Confirm Button */}
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
