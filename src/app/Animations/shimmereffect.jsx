"use client";

import React from "react";

// Shimmer effect component for loading states - goes left to right
export const ShimmerEffect = ({ className = "", width = "100%" }) => {
  return (
    <div
      className={`relative overflow-hidden rounded ${className}`}
      style={{ width }}
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-gray-200"></div>
      {/* Animated shimmer overlay - moves left to right */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear',
        }}
      ></div>
    </div>
  );
};

// Shimmer card component for stat cards - matches exact structure of StatCard
// Using exact same classes and structure to prevent layout shift
export const ShimmerCard = () => {
  return (
    <div className="bg-[#FFFFFF] py-3 px-[18px] rounded-lg relative" style={{ height: '104px' }}>
      <div className="flex flex-col gap-1 h-full">
        {/* Title shimmer - matches text-sm font-medium */}
        <div className="text-sm font-medium text-[#6C757D] flex items-center" style={{ height: '20px' }}>
          <ShimmerEffect className="h-[14px] w-24" />
        </div>
        {/* Value shimmer - matches text-2xl font-bold */}
        <div className="text-2xl font-bold text-[#080607] flex items-center" style={{ height: '36px' }}>
          <ShimmerEffect className="h-[32px] w-16" />
        </div>
        {/* Change text shimmer - matches text-xs */}
        <div className="text-xs flex items-center" style={{ height: '16px' }}>
          <ShimmerEffect className="h-[12px] w-32" />
        </div>
      </div>
      {/* Icon shimmer - matches absolute top-3 right-[18px] with 38x38 */}
      <div className="absolute top-3 right-[18px]">
        <ShimmerEffect className="w-[38px] h-[38px] rounded-full" />
      </div>
    </div>
  );
};

// Shimmer table row component - matches exact structure of table rows
export const ShimmerTableRow = ({ colSpan = 4, isStriped = false }) => {
  return (
    <tr className={isStriped ? "bg-gray-50" : "bg-white"} style={{ height: '64px' }}>
      {/* Single shimmer effect spanning all columns */}
      <td colSpan={colSpan} className="px-6 py-4 align-middle" style={{ height: '64px' }}>
        <ShimmerEffect className="h-5 w-full" />
      </td>
    </tr>
  );
};

// Shimmer table component - matches exact structure with striped rows
export const ShimmerTable = ({ rows = 3, cols = 4 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <ShimmerTableRow 
          key={rowIndex} 
          colSpan={cols} 
          isStriped={rowIndex % 2 === 0}
        />
      ))}
    </>
  );
};

