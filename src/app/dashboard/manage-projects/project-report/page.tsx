"use client";

import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export default function ProjectReportPage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const analysisData = [
    { termMonth: 12, residualHigh: 80, residualLow: 70, valueHigh: 392000, valueLow: 333000, avgResidual: 75.0, avgValue: 362500 },
    { termMonth: 24, residualHigh: 75, residualLow: 65, valueHigh: 368000, valueLow: 310000, avgResidual: 70.0, avgValue: 339000 },
    { termMonth: 36, residualHigh: 70, residualLow: 60, valueHigh: 343000, valueLow: 294000, avgResidual: 65.0, avgValue: 318500 },
    { termMonth: 48, residualHigh: 65, residualLow: 55, valueHigh: 319000, valueLow: 270000, avgResidual: 60.0, avgValue: 294500 },
    { termMonth: 60, residualHigh: 60, residualLow: 50, valueHigh: 294000, valueLow: 245000, avgResidual: 55.0, avgValue: 269500 },
    { termMonth: 72, residualHigh: 55, residualLow: 45, valueHigh: 270000, valueLow: 221000, avgResidual: 50.0, avgValue: 245500 },
    { termMonth: 84, residualHigh: 50, residualLow: 40, valueHigh: 245000, valueLow: 196000, avgResidual: 45.0, avgValue: 220500 },
    { termMonth: 96, residualHigh: 45, residualLow: 35, valueHigh: 221000, valueLow: 172000, avgResidual: 40.0, avgValue: 196500 },
    { termMonth: 108, residualHigh: 40, residualLow: 30, valueHigh: 196000, valueLow: 147000, avgResidual: 35.0, avgValue: 171500 },
    { termMonth: 120, residualHigh: 30, residualLow: 20, valueHigh: 151000, valueLow: 112000, avgResidual: 25.0, avgValue: 131500 }
  ];

  // Inflation analysis (last 10 years)
  const inflationData = [
    { year: 2015, residualHigh: 0.1, residualLow: 0.0, valueHigh: 5.8, valueLow: 5.7 },
    { year: 2016, residualHigh: 1.3, residualLow: 0.9, valueHigh: 5.9, valueLow: 5.8 },
    { year: 2017, residualHigh: 2.1, residualLow: 1.6, valueHigh: 6.0, valueLow: 5.9 },
    { year: 2018, residualHigh: 2.5, residualLow: 2.0, valueHigh: 6.1, valueLow: 6.0 },
    { year: 2019, residualHigh: 1.8, residualLow: 1.5, valueHigh: 6.2, valueLow: 6.1 },
    { year: 2020, residualHigh: 1.9, residualLow: 1.4, valueHigh: 6.3, valueLow: 6.2 },
    { year: 2021, residualHigh: 5.0, residualLow: 3.8, valueHigh: 6.5, valueLow: 6.3 },
    { year: 2022, residualHigh: 7.6, residualLow: 6.1, valueHigh: 6.9, valueLow: 6.6 },
    { year: 2023, residualHigh: 3.5, residualLow: 2.7, valueHigh: 7.0, valueLow: 6.8 },
    { year: 2024, residualHigh: 2.2, residualLow: 1.8, valueHigh: 7.2, valueLow: 6.9 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Project Report</h1>
        <p className="text-gray-500 mt-1">Dashboard / Manage Projects / Project Report</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'summary'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('inflation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inflation'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inflation
            </button>
            <button
              onClick={() => setActiveTab('depreciation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'depreciation'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Depreciation
            </button>
            <button
              onClick={() => setActiveTab('utilization')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'utilization'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Utilization
            </button>
            <button
              onClick={() => setActiveTab('market-data')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'market-data'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Market Data
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Summary Tab Content */}
        {activeTab === 'summary' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Residual Value Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analysisData} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="termMonth" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 12 }} domain={[15, 90]} label={{ value: 'Residual %', angle: -90, position: 'insideLeft', offset: -5, fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Residuals Value ($)', angle: -90, position: 'insideRight', offset: -5, fill: '#ef4444' }} tickFormatter={(v)=>`$${v.toLocaleString()}`} />
                <Tooltip formatter={(val: any, name: any) => {
                  if (name.includes('Value')) return [`$${Number(val).toLocaleString()}`, name];
                  return [`${val}%`, name];
                }} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-sm text-gray-700">{value}</span>} />

                {/* Residual % lines (left axis) */}
                <Line yAxisId="left" type="monotone" dataKey="residualHigh" name="Residual % (High)" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="left" type="monotone" dataKey="residualLow" name="Residual % (Low)" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />

                {/* Residual value lines (right axis) */}
                <Line yAxisId="right" type="monotone" dataKey="valueHigh" name="Residual Value (High)" stroke="#111827" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="valueLow" name="Residual Value (Low)" stroke="#111827" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        )}

        {/* Inflation Tab Content */}
        {activeTab === 'inflation' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Inflation Analysis (Last 10 Years)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inflationData} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 12 }} domain={[0, 8]}
                       label={{ value: 'Residual %', angle: -90, position: 'insideLeft', offset: -5, fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }}
                       domain={[5.6, 7.4]}
                       label={{ value: 'Residuals Value ($)', angle: -90, position: 'insideRight', offset: -5, fill: '#ef4444' }} />
                <Tooltip formatter={(val: any, name: any) => {
                  if (name.includes('Value')) return [`$${Number(val).toLocaleString()}k`, name];
                  return [`${val}%`, name];
                }} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-sm text-gray-700">{value}</span>} />

                <Line yAxisId="left" type="monotone" dataKey="residualHigh" name="Residual % (High)" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="left" type="monotone" dataKey="residualLow" name="Residual % (Low)" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="valueHigh" name="Residual Value (High)" stroke="#111827" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="valueLow" name="Residual Value (Low)" stroke="#111827" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        )}

        {/* Analysis Data Points Table - only for Summary */}
        {activeTab === 'summary' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Data Points</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Term Month</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Residual % (High)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Residual % (Low)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Residual Value (High)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Residual Value (Low)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Average Residual %</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Average Residual Value</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">{row.termMonth}</td>
                    <td className="py-3 px-4 text-gray-900">{row.residualHigh}%</td>
                    <td className="py-3 px-4 text-gray-900">{row.residualLow}%</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(row.valueHigh)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(row.valueLow)}</td>
                    <td className="py-3 px-4 text-gray-900">{row.avgResidual}%</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(row.avgValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Collapsible Sections - keep visible on Summary */}
        {activeTab === 'summary' && (
        <div className="space-y-4">
          {[
            'Overview',
            'Key Findings',
            'Market Conditions',
            'Utilization Analysis',
            'Recommendations',
            'Next Steps'
          ].map((section) => (
            <div key={section} className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => toggleSection(section)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{section}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedSections[section] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections[section] && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4 text-gray-600">
                    <p>This section contains detailed information about {section.toLowerCase()}.</p>
                    <p className="mt-2">Click to expand and view comprehensive analysis and insights.</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
