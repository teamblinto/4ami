"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('summary');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [haircutPct, setHaircutPct] = useState<number>(-5); // global haircut in percent
  const [archivedTerms, setArchivedTerms] = useState<Set<number>>(new Set());
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const [reportSelections, setReportSelections] = useState<{ pdf: boolean; excel: boolean }>({ pdf: true, excel: false });
  const reportMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (reportMenuRef.current && !reportMenuRef.current.contains(e.target as Node)) {
        setReportMenuOpen(false);
      }
    };
    if (reportMenuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [reportMenuOpen]);

  const downloadJsonFile = (data: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadCsv = (rows: Record<string, unknown>[], filename: string) => {
    if (!rows || rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csv = [headers.join(',')]
      .concat(
        rows.map((r) => headers.map((h) => String((r as Record<string, unknown>)[h] ?? '')).join(','))
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSelected = () => {
    const payload = { summary: analysisData, inflation: inflationData, depreciation: depreciationData, utilization: utilizationData, market: marketDataRows };
    if (reportSelections.pdf) {
      downloadJsonFile(payload, 'equipment-analysis-report.json');
    }
    if (reportSelections.excel) {
      downloadCsv(analysisData as unknown as Record<string, unknown>[], 'analysis-data.csv');
    }
    setReportMenuOpen(false);
  };
  const tabsOrder = ['summary', 'inflation', 'depreciation', 'utilization', 'market-data', 'overview'] as const;

  const goNext = () => {
    const idx = tabsOrder.indexOf(activeTab as typeof tabsOrder[number]);
    if (idx > -1 && idx < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[idx + 1]);
    }
  };

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

  // Depreciation methods comparison (Year 0 - Year 10)
  const depreciationData = [
    { year: 'Year 0', sl: 500000, ddb: 500000, syd: 500000, macrs: 500000 },
    { year: 'Year 1', sl: 450000, ddb: 300000, syd: 380000, macrs: 280000 },
    { year: 'Year 2', sl: 400000, ddb: 240000, syd: 320000, macrs: 200000 },
    { year: 'Year 3', sl: 350000, ddb: 192000, syd: 270000, macrs: 140000 },
    { year: 'Year 4', sl: 300000, ddb: 153600, syd: 230000, macrs: 120000 },
    { year: 'Year 5', sl: 250000, ddb: 122880, syd: 195000, macrs: 100000 },
    { year: 'Year 6', sl: 200000, ddb: 98304, syd: 165000, macrs: 90000 },
    { year: 'Year 7', sl: 150000, ddb: 78643, syd: 140000, macrs: 85000 },
    { year: 'Year 8', sl: 100000, ddb: 62915, syd: 120000, macrs: 82000 },
    { year: 'Year 9', sl: 50000, ddb: 50332, syd: 105000, macrs: 80000 },
    { year: 'Year 10', sl: 0, ddb: 40265, syd: 90000, macrs: 78000 },
  ];

  // Utilization chart data (Hours/Year vs Residual % and Effective Age)
  const utilizationData = [
    { hoursYear: 700, residual: 45, effectiveAge: 11.5 },
    { hoursYear: 750, residual: 40, effectiveAge: 11.3 },
    { hoursYear: 800, residual: 35, effectiveAge: 11.1 },
    { hoursYear: 850, residual: 30, effectiveAge: 11.0 },
    { hoursYear: 900, residual: 25, effectiveAge: 11.2 },
    { hoursYear: 950, residual: 20, effectiveAge: 12.8 },
    { hoursYear: 1000, residual: 18, effectiveAge: 13.9 },
    { hoursYear: 1050, residual: 17, effectiveAge: 13.6 },
    { hoursYear: 1100, residual: 16, effectiveAge: 13.5 },
  ];

  const utilizationTable = [
    { source: 1, makeModel: '80% / 2010', year: 2010, age: 15, totalHours: '10,232', hoursYear: 721, currentPrice: 182000, residual: 43, effectiveAge: 15 },
    { source: 2, makeModel: '70% / 2021', year: 2021, age: 4, totalHours: '10,232', hoursYear: 543, currentPrice: 334000, residual: 46, effectiveAge: 14 },
    { source: 3, makeModel: '68% / 2023', year: 2023, age: 2, totalHours: '10,232', hoursYear: 198, currentPrice: 252000, residual: 32, effectiveAge: 10 },
    { source: 4, makeModel: '60% / 2004', year: 2004, age: 21, totalHours: '10,232', hoursYear: 134, currentPrice: 189000, residual: 29, effectiveAge: 9 },
    { source: 5, makeModel: '80% / 2003', year: 2003, age: 22, totalHours: '10,232', hoursYear: 455, currentPrice: 172000, residual: 24, effectiveAge: 11 },
    { source: 6, makeModel: '65% / 2015', year: 2015, age: 10, totalHours: '10,232', hoursYear: 643, currentPrice: 169000, residual: 33, effectiveAge: 13 },
    { source: 7, makeModel: '45% / 2019', year: 2019, age: 6, totalHours: '10,232', hoursYear: 328, currentPrice: 156000, residual: 29, effectiveAge: 12 },
    { source: 8, makeModel: '35% / 2016', year: 2016, age: 9, totalHours: '10,232', hoursYear: 546, currentPrice: 142000, residual: 40, effectiveAge: 9 },
    { source: 9, makeModel: '70% / 2014', year: 2014, age: 11, totalHours: '10,232', hoursYear: 365, currentPrice: 157500, residual: 53, effectiveAge: 7 },
    { source: 10, makeModel: '30% / 2023', year: 2023, age: 2, totalHours: '10,232', hoursYear: 594, currentPrice: 176000, residual: 68, effectiveAge: 4 },
  ];

  // Market data comparables table
  const marketDataRows = [
    { description: '2010 VOLVO A30G Off-Highway Trucks', year: 2009, hours: '10,232', serialNo: '119501', dealer: 'Alta Equipment Co.', location: 'Princeton, West Virginia 24740', phone: '+1 407-234-6529', price: 73000, listing: '#' },
    { description: '2021 VOLVO A30G Off-Highway Trucks', year: 2021, hours: '2,300', serialNo: '118071', dealer: 'White Grading Inc.', location: 'Mocksville, North Carolina 27028', phone: '+1 813-716-7600', price: 722, listing: '#' },
    { description: '2002 VOLVO A30C Off-Highway Trucks', year: 2005, hours: '16,610', serialNo: 'N/A', dealer: 'Ritchie Equip Inc', location: 'Saint Louis, Missouri 63139', phone: '+1 913-676-7600', price: 145000, listing: '#' },
    { description: '2024 VOLVO A30G Off-Highway Trucks', year: 2024, hours: '1,733', serialNo: '173341', dealer: 'Goodwin Brothers Construction Co.', location: 'N/A', phone: '+362 1337-0769', price: 111, listing: '#' },
    { description: '2010 A40E Off-Highway Trucks', year: 2023, hours: '23,686', serialNo: '118071', dealer: 'White Grading Inc', location: 'Saint Louis, Missouri 63139', phone: '+1 234-770-6814', price: 920, listing: '#' },
    { description: '2011 VOLVO A30F Off-Highway Trucks', year: 2015, hours: '10,232', serialNo: 'VCM923456 678976569', dealer: 'Goodwin Brothers Construction Co.', location: 'Mocksville, North Carolina 27028', phone: '+1 478-272-1553', price: 81400, listing: '#' },
    { description: '2010 A40E Off-Highway Trucks', year: 2010, hours: '10,232', serialNo: '119501', dealer: 'Alta Equipment', location: 'Mocksville, North Carolina 27028', phone: '+1 234-789-4314', price: 57000, listing: '#' },
    { description: '2019 VOLVO A30G Off-Highway Trucks', year: 2019, hours: '10,232', serialNo: 'VCM923456 689765296', dealer: 'White Grading Inc.', location: 'Princeton, West Virginia 24740', phone: 'N/A', price: 256700, listing: '#' },
    { description: '2020 VOLVO A30G Off-Highway Trucks', year: 2024, hours: '10,232', serialNo: 'VCM923456 689765296', dealer: 'White Grading Inc.', location: 'Mocksville, NC', phone: '+1 813-716-7600', price: 71000, listing: '#' },
    { description: '2022 VOLVO A30G Off-Highway Trucks', year: 2022, hours: '18,420', serialNo: 'VCM923456 689765296', dealer: 'White Grading Inc.', location: 'N/A', phone: 'N/A', price: 82100, listing: '#' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatSignedPercent = (value: number) => {
    const sign = value > 0 ? '+' : value < 0 ? '-' : '';
    return `${sign}${Math.abs(value).toString().padStart(2, '0')}%`;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Project Report</h1>
        <p className="text-gray-500 mt-1">Dashboard / Manage Projects / Project Report</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-4 px-1 border-b-5 rounded-sm w-[188px] font-medium text-sm cursor-pointer ${activeTab === 'summary'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('inflation')}
              className={`py-4 px-1 border-b-5 rounded-sm w-[188px]  font-medium text-sm cursor-pointer ${activeTab === 'inflation'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Inflation
            </button>
            <button
              onClick={() => setActiveTab('depreciation')}
              className={`py-4 px-1 border-b-5 rounded-sm w-[188px]  font-medium text-sm cursor-pointer ${activeTab === 'depreciation'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Depreciation
            </button>
            <button
              onClick={() => setActiveTab('utilization')}
              className={`py-4 px-1 border-b-5 rounded-sm w-[188px]  font-medium text-sm cursor-pointer ${activeTab === 'utilization'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Utilization
            </button>
            <button
              onClick={() => setActiveTab('market-data')}
              className={`py-4 px-1 border-b-5 rounded-sm w-[188px]  font-medium text-sm cursor-pointer ${activeTab === 'market-data'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Market Data
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-5 rounded-sm w-[188px]  font-medium text-sm cursor-pointer ${activeTab === 'overview'
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
          <div className=" rounded-lg mx-auto w-[950px] p-6">
            <h2 className="text-xl font-semibold text-gray-900 text-start mb-6">Residual Value Analysis</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">

                 <LineChart data={analysisData} margin={{ top: 10, right: 40, left: 40, bottom: 0 }}  >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="termMonth" tick={{ fill: '#6b7280', fontSize: 12, }} tickMargin={6} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickMargin={10}
                    width={60}
                    domain={[15, 95]}
                    label={{ value: 'Residual %', angle: -90, position: 'left', offset: 15,fontSize: 12,fill: '#6b7280' }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickMargin={12}
                    width={80}
                    domain={[150000, 400000]}
                    label={{ value: 'Residual Value ($)', angle: 90, position: 'right', offset: 28, fontSize: 12,fill: '#ef4444' }}
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                  />
                  <Tooltip formatter={(val: number | string, name: string) => {
                    if (name.includes('Value')) return [`$${Number(val).toLocaleString()}`, name];
                    return [`${val}%`, name];
                  }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ marginTop: 80  }} formatter={(value) => <span className="text-sm text-gray-700">{value}</span>} />

                  {/* Residual % lines (left axis) */}
                  <Line yAxisId="left" type="monotone" dataKey="residualHigh" fontSize={12} name="Residual % (High)" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="left" type="monotone" dataKey="residualLow" fontSize={12} name="Residual % (Low)" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />


                  {/* Residual value lines (right axis) */}
                  <Line yAxisId="right" type="monotone" dataKey="valueHigh" fontSize={12} name="Residual Value (High)" stroke="#111827" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="right" type="monotone" dataKey="valueLow" fontSize={12} name="Residual Value (Low)" stroke="#111827" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>


              </ResponsiveContainer>
            </div>
          </div>
        )}




        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Equipment Analysis Overview</h2>

            {/* Project Details */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-gray-500">Project ID</div>
                  <div className="text-gray-900">P101</div>
                </div>
                <div>
                  <div className="text-gray-500">Initiator Name</div>
                  <div className="text-gray-900">2023 VOLVO A25G Off-Highway Trucks</div>
                </div>
                <div>
                  <div className="text-gray-500">Project Name</div>
                  <div className="text-gray-900">2023 VOLVO A25G Off-Highway Trucks</div>
                </div>
                <div>
                  <div className="text-gray-500">Equipment Make</div>
                  <div className="text-gray-900">VOLVO</div>
                </div>
                <div>
                  <div className="text-gray-500">Equipment Model</div>
                  <div className="text-gray-900">A25G</div>
                </div>
              </div>
            </div>

            {/* Status + Processing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Data Quality Status */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Data Quality Status</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    'Inflation Data',
                    'Utilization Data',
                    'Depreciation Data',
                    'Oee Residual Data',
                    'Market Comps Data',
                    'Executive Summary',
                  ].map((label) => (
                    <li key={label} className="flex items-center justify-between pr-4">
                      <span className="text-gray-700">{label}</span>
                      <span className="flex items-center text-red-500">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Available
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Processing Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Processing Details</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="text-gray-700">Project Start</div>
                  <div className="text-gray-900 text-right">20 May, 2025 &nbsp; 11:16:51 AM</div>

                  <div className="text-gray-700">Project Submitted</div>
                  <div className="text-gray-900 text-right">20 May, 2025 &nbsp; 12:14:44 AM</div>

                  <div className="text-gray-700">Project Reviewed</div>
                  <div className="text-gray-900 text-right">20 May, 2025 &nbsp; 4:53 PM</div>

                  <div className="text-gray-700">Total Data Source</div>
                  <div className="text-gray-900 text-right">6</div>

                  <div className="text-gray-700">Analysis Status</div>
                  <div className="text-green-600 text-right font-medium">Completed</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end mt-10 space-x-3">
              <button onClick={() => router.push('/company-admin/manage-projects')} className="px-4 py-2 border border-[#D0D5DD] rounded-md text-sm text-[#343A40] hover:bg-[#F8F9FA] cursor-pointer">Go back to all projects</button>
              <div className="relative" ref={reportMenuRef}>
                <button onClick={() => setReportMenuOpen((s) => !s)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm cursor-pointer">Download Report ▾</button>
                {reportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D0D5DD] rounded-md shadow-sm p-3">
                    <label className="flex items-center space-x-2 text-sm text-[#343A40] py-1">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#ED272C]"
                        checked={reportSelections.pdf}
                        onChange={(e) => setReportSelections((s) => ({ ...s, pdf: e.target.checked }))}
                      />
                      <span>Pdf Report</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-[#343A40] py-1">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#ED272C]"
                        checked={reportSelections.excel}
                        onChange={(e) => setReportSelections((s) => ({ ...s, excel: e.target.checked }))}
                      />
                      <span>Excel Data</span>
                    </label>
                    <button onClick={handleDownloadSelected} className="mt-2 w-full px-3 py-2 bg-[#F8F9FA] border border-[#D0D5DD] rounded-md text-sm text-[#343A40] hover:bg-white cursor-pointer">Download Selected</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        
  
        {/* Market Data Tab Content */}
        {activeTab === 'market-data' && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Equipment Market Comparable Analysis</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Description</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Year</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Hours</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Serial No.</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Dealer</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Location</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Phone</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Price</th>
                    <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Listing</th>
                  </tr>
                </thead>
                <tbody>
                  {marketDataRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.description}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.year}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.hours}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.serialNo}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.dealer}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.location}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{row.phone}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] border border-[#D0D5DD]">{`$${row.price.toLocaleString()}`}</td>
                      <td className="py-3 text-[14px] px-4 text-[#343A40] underline cursor-pointer border border-[#D0D5DD]">
                        <a href={row.listing} target="_blank" rel="noreferrer">View Listing</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Utilization Tab Content */}
        {activeTab === 'utilization' && (
          <>
            <div className=" rounded-lg w-[950px] mx-auto p-6">
              <h2 className="text-xl font-semibold text-gray-900 text-start mb-6">Equipment Utilization vs Residual Values</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={utilizationData} margin={{ top: 10, right: 40, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                    <XAxis dataKey="hoursYear" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={6} label={{ value: 'Hours per Year', position: 'insideBottom', offset: -2, fill: '#6b7280', fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={10} width={60} domain={[0, 50]} label={{ value: 'Residual %', angle: -90, position: 'left', offset: 15, fontSize: 12, fill: '#6b7280' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={12} width={80} domain={[10, 14]}
                      label={{ value: 'Effective Age', angle: 90, position: 'right', offset: 28, fontSize: 12, fill: '#ef4444' }} />
                      
                    <Tooltip formatter={(val: number | string, name: string) => name === 'Residual %' ? [`${val}%`, name] : [val, name]} labelFormatter={(l) => `Hours/Year: ${l}`} />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ marginTop: 80 }} />

                    <Line yAxisId="left" type="monotone" dataKey="residual" name="Residual %" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                    <Line yAxisId="right" type="monotone" dataKey="effectiveAge" name="Effective Age" stroke="#111827" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Residual Analysis Data Details table */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Residual Analysis Data Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Source</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Make/Model</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Year</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Age</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Total Hours</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Hours/Year</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Current Price</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Residual %</th>
                      <th className="text-left py-3 px-4 text-[16px] font-medium text-[#343A40] border border-[#D0D5DD] bg-[#F8F9FA]">Effective Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilizationTable.map((row, idx) => (
                      <tr key={row.source} className={idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.source}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.makeModel}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.year}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.age}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.totalHours}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.hoursYear}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{`$${row.currentPrice.toLocaleString()}`}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{`${row.residual}%`}</td>
                        <td className="py-3 px-4 text-[#343A40] border text-[14px] border-[#D0D5DD]">{row.effectiveAge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Depreciation Tab Content */}
        {activeTab === 'depreciation' && (
          <div className="rounded-lg w-[950px]  mx-auto p-6">
            <h2 className="text-xl font-semibold text-gray-900 text-start mb-6">Depreciation Methods Comparison</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={depreciationData} margin={{ top: 10, right: 40, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={6} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={10} width={60} tickFormatter={(v) => `$${v.toLocaleString()}`} domain={[0, 500000]} />
                  <Tooltip formatter={(val: number | string) => `$${Number(val).toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ marginTop: 80 }} formatter={(value) => <span className="text-sm text-gray-700">{value === 'sl' ? 'Straight-Line Methods' : value === 'ddb' ? 'Double Declining Balance' : value === 'syd' ? 'Sum-of-Years-Digits' : 'MACRS'}</span>} />

                  <Line type="monotone" dataKey="sl" name="Straight-Line Methods" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="ddb" name="Double Declining Balance" stroke="#111827" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="syd" name="Sum-of-Years-Digits" stroke="#6b7280" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="macrs" name="MACRS" stroke="#000000" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Inflation Tab Content */}
        {activeTab === 'inflation' && (
          <div className="rounded-lg w-[950px] mx-auto p-6">
            <h2 className="text-xl font-semibold text-gray-900 text-start mb-6">Inflation Analysis (Last 10 Years)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inflationData} margin={{ top: 10, right: 40, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={6} />
                  <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={10} width={60} domain={[0, 8]}
                    label={{ value: 'Residual %', angle: -90, position: 'left', offset: 15, fontSize: 12, fill: '#6b7280' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={12} width={80}
                    domain={[5.6, 7.4]}
                    label={{ value: 'Residual Value ($)', angle: 90, position: 'right', offset: 28, fontSize: 12, fill: '#ef4444' }} />
                  <Tooltip formatter={(val: number | string, name: string) => {
                    if (name.includes('Value')) return [`$${Number(val).toLocaleString()}k`, name];
                    return [`${val}%`, name];
                  }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ marginTop: 80  }} formatter={(value) => <span className="text-sm text-gray-700">{value}</span>} />

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
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Data Points</h2>

            {/* Haircut control */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
                <span className="font-medium">Haircut</span>
                <span className="text-right text-gray-600 flex items-center space-x-2">
                  <span className="font-semibold inline-block w-14 text-right tabular-nums">{formatSignedPercent(haircutPct)}</span>
                  <span className="text-gray-400">Global Haircut</span>
                </span>
              </div>
              <input
                type="range"
                min={-20}
                max={20}
                step={1}
                value={haircutPct}
                onChange={(e) => setHaircutPct(Number(e.target.value))}
                className="w-full accent-gray-900"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Term Month</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Residual % (High)</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Residual % (Low)</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Residual Value (High)</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Residual Value (Low)</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Average Residual %</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA]">Average Residual Value</th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA] whitespace-nowrap">Adjusted <span className="inline-block w-14 text-right tabular-nums">({formatSignedPercent(haircutPct)})</span></th>
                    <th className="text-left py-3 px-4 text-[16px] font-medium text-gray-700 border border-[#D0D5DD] bg-[#F8F9FA] whitespace-nowrap w-28">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.map((row, index) => {
                    const adjusted = Math.round(row.avgValue * (1 + haircutPct / 100));
                    const isArchived = archivedTerms.has(row.termMonth);
                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"}>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{row.termMonth}</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{row.residualHigh}%</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{row.residualLow}%</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{formatCurrency(row.valueHigh)}</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{formatCurrency(row.valueLow)}</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{row.avgResidual}%</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{formatCurrency(row.avgValue)}</td>
                        <td className="py-3 px-4 text-gray-900 tabular-nums border text-[14px] border-[#D0D5DD]">{formatCurrency(adjusted)}</td>
                        <td className="py-3 px-4 w-28 border border-[#D0D5DD]">
                          <button
                            onClick={() =>
                              setArchivedTerms(prev => {
                                const next = new Set(prev);
                                if (next.has(row.termMonth)) next.delete(row.termMonth); else next.add(row.termMonth);
                                return next;
                              })
                            }
                            className={`w-24 text-center px-0 py-1 rounded-md text-sm border ${isArchived ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-red-500 text-red-600 hover:bg-red-50'}`}
                          >
                            {isArchived ? 'Unarchive' : 'Archive'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-gray-900">{section}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections[section] ? 'rotate-180' : ''
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

      {/* Next Button for all tabs except Overview */}
      {activeTab !== 'overview' && (
        <div className="flex justify-end mt-8">
          <button onClick={goNext} className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-colors">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
