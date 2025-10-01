"use client";
import React from "react";

const ResidualAnalysisPage = () => {
  // Figma design styles
  const labelStyles = {
    color: '#6C757D',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px'
  };

  const inputStyles = {
    borderRadius: '8px',
    border: '1px solid #CED4DA',
    background: '#FBFBFB',
    height: '40px',
    padding: '0 12px',
    color: '#343A40',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '24px'
  };
  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white rounded-lg" style={{ padding: '20px 32px' }}>
        <h1 className="text-2xl font-bold text-gray-800">
          Create Residual Analysis
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Dashboard / Services / Create Residual Analysis
        </p>

        <form>
          {/* Project Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Project Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="project-id"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Project ID
                </label>
                <input
                  type="text"
                  id="project-id"
                  defaultValue="1123-0452"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="project-name"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Pr
                  {/* oject Name */}
                </label>
                <input
                  type="text"
                  id="project-name"
                  defaultValue="Reference: Semi-Gotha A160 Many-Trans"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="start-date"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Client Information
              </h2>
              <svg
                className="w-5 h-5 text-gray-400 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <div className="space-y-4">
              {/* First row - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Client Name
                  </label>
                  <input
                    type="text"
                    id="client-name"
                    placeholder="Your name"
                    className="w-full"
                    style={inputStyles}
                  />
                </div>
                <div>
                  <label
                    htmlFor="client-email"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Client email
                  </label>
                  <input
                    type="email"
                    id="client-email"
                    defaultValue="yorkerho@gmail.com"
                    className="w-full"
                    style={inputStyles}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lease-phone"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Lease Phone
                  </label>
                  <div className="flex">
                    <select 
                      className="rounded-l-md"
                      style={{
                        ...inputStyles,
                        borderTopRightRadius: '0',
                        borderBottomRightRadius: '0',
                        borderRight: 'none'
                      }}
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                    </select>
                    <input
                      type="tel"
                      id="lease-phone"
                      className="flex-1 rounded-r-md"
                      style={{
                        ...inputStyles,
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0'
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Second row - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    defaultValue="www.lorem.com"
                    className="w-full"
                    style={inputStyles}
                  />
                </div>
                <div>
                  <label
                    htmlFor="communication"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Communication
                  </label>
                  <select
                    id="communication"
                    defaultValue="Yes"
                    className="w-full"
                    style={inputStyles}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Source Information */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                Source Information
              </h2>
              <svg
                className="w-5 h-5 text-gray-400 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Transaction Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Transaction Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="current-meter"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Current Meter<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="current-meter"
                  placeholder="Enter current meter"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="proposed-annual-utilization"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Proposed Annual Utilization<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="proposed-annual-utilization"
                  defaultValue="2,580"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="meter-unit"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Meter Unit<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="meter-unit"
                  defaultValue="vPY"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="vPY">vPY</option>
                  <option value="hours">Hours</option>
                  <option value="miles">Miles</option>
                  <option value="kilometers">Kilometers</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="maintenance-records"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Maintenance Records
                </label>
                <input
                  type="text"
                  id="maintenance-records"
                  defaultValue="N/A"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="inspection-report"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Inspection Report
                </label>
                <input
                  type="text"
                  id="inspection-report"
                  defaultValue="N/A"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="terms-months"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Terms (Months)<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="terms-months"
                  placeholder="Number only"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="structure"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Structure<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="structure"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select</option>
                  <option value="operating">Operating</option>
                  <option value="capital">Capital</option>
                  <option value="sale-leaseback">Sale Leaseback</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="application"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Application<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="application"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select</option>
                  <option value="construction">Construction</option>
                  <option value="mining">Mining</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="transportation">Transportation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="environment"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Environment<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="environment"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Utilization Scenario */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Utilization Scenario
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #CED4DA',
                  background: '#FBFBFB',
                  height: '40px',
                  padding: '0 12px',
                  color: '#343A40',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '24px'
                }}
              >
                + Add Scenario
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #CED4DA',
                  background: '#FBFBFB',
                  height: '40px',
                  padding: '0 12px',
                  color: '#343A40',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '24px'
                }}
              >
                + Add Additional Equipment
              </button>
            </div>
          </div>

          {/* Equipment Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Equipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="industry"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Industry<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="industry"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select Industry</option>
                  <option value="construction">Construction</option>
                  <option value="mining">Mining</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="transportation">Transportation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="asset-class"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Asset class<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="asset-class"
                  placeholder="Enter asset class"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="make"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Make<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="make"
                  placeholder="Enter make"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Model<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  placeholder="Enter model"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="year"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Year<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="year"
                  placeholder="Enter year"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="current-meter-reading"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Current Meter Reading<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="current-meter-reading"
                  placeholder="Number type"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="meter-type"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Meter Type<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="meter-type"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">select meter type</option>
                  <option value="hours">Hours</option>
                  <option value="miles">Miles</option>
                  <option value="kilometers">Kilometers</option>
                  <option value="cycles">Cycles</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="proposed-utilization"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Proposed Utilization<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="proposed-utilization"
                  placeholder="report estimation"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="environment-ranking"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Environment Ranking<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="environment-ranking"
                  defaultValue="New"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Financial Information
            </h2>
            <div>
              <label
                htmlFor="subject-price"
                className="block mb-2"
                style={labelStyles}
              >
                Subject Price<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                id="subject-price"
                placeholder="Enter subject price"
                className="w-full"
                style={inputStyles}
              />
            </div>
          </div>

          {/* Lease Term */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Lease Term
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lease-terms-months"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Terms (Months)<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  id="lease-terms-months"
                  placeholder="Number only"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="lease-structure"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Structure<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="lease-structure"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select</option>
                  <option value="operating">Operating</option>
                  <option value="capital">Capital</option>
                  <option value="sale-leaseback">Sale Leaseback</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="lease-application"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Application<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="lease-application"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select</option>
                  <option value="construction">Construction</option>
                  <option value="mining">Mining</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="transportation">Transportation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="lease-environment"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Environment<span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id="lease-environment"
                  className="w-full"
                  style={inputStyles}
                >
                  <option value="">Select</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResidualAnalysisPage;
