"use client";
import React, { useState } from "react";

const ResidualAnalysisPage = () => {
  const [isSourceInfoOpen, setIsSourceInfoOpen] = useState(true);
  const [isClientInfoOpen, setIsClientInfoOpen] = useState(true);
  const [isTransactionInfoOpen, setIsTransactionInfoOpen] = useState(true);
  const [isUtilizationScenarioOpen, setIsUtilizationScenarioOpen] =
    useState(true);
  const [isEquipmentDetailsOpen, setIsEquipmentDetailsOpen] = useState(true);
  const [isFinancialInfoOpen, setIsFinancialInfoOpen] = useState(true);
  const [isLeaseTermOpen, setIsLeaseTermOpen] = useState(true);
  const [isCommunicationOpen, setCommunicationOpen] = useState(false);
  const [communicationValue, setCommunicationValue] = useState("No");
  const [isCommunicationOpen2, setCommunicationOpen2] = useState(false);
  const [communicationValue2, setCommunicationValue2] = useState("No");
  // Figma design styles
  const labelStyles = {
    color: "#6C757D",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px",
  };

  const inputStyles = {
    borderRadius: "8px",
    border: "1px solid #CED4DA",
    background: "#FBFBFB",
    height: "40px",
    padding: "0 12px",
    color: "#343A40",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "24px",
  };
  return (
    <div className="min-h-screen">
      <div className="mx-auto rounded-lg gap-[44px] flex flex-col">
        <div>
          <h1 className="font-medium text-[#343A40] text-2xl">
            Create Residual Analysis
          </h1>
          <p className="text-[#6C757D] mt-2 font-normal ">
            Dashboard / Services / Create Residual Analysis
          </p>
        </div>

        <form className="">
          {/* Project Information */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg ">
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
                  Project Name
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
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsClientInfoOpen(!isClientInfoOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Client Information
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isClientInfoOpen ? "rotate-180" : ""
                }`}
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
            {isClientInfoOpen && (
              <div className="space-y-4 mt-4">
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
                          borderTopRightRadius: "0",
                          borderBottomRightRadius: "0",
                          borderRight: "none",
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
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


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
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full text-left flex justify-between items-center"
                        style={inputStyles}
                        onClick={() => setCommunicationOpen(!isCommunicationOpen)}
                      >
                        {communicationValue}
                        <svg
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            isCommunicationOpen ? "rotate-180" : ""
                          }`}
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
                      </button>
                      {isCommunicationOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                          <ul>
                            <li
                              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setCommunicationValue("Yes");
                                setCommunicationOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  checked={communicationValue === "Yes"}
                                  readOnly
                                />
                                <span className="ml-2">Yes</span>
                              </div>
                            </li>
                            <li
                              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setCommunicationValue("No");
                                setCommunicationOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox text-red-600"
                                  checked={communicationValue === "No"}
                                  readOnly
                                />
                                <span className="ml-2">No</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Source Information */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsSourceInfoOpen(!isSourceInfoOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Source Information
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isSourceInfoOpen ? "rotate-180" : ""
                }`}
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
            {isSourceInfoOpen && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="source-no"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Source No
                    </label>
                    <input
                      type="text"
                      id="source-no"
                      defaultValue="S-1002"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="source-name"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Source Name
                    </label>
                    <input
                      type="text"
                      id="source-name"
                      defaultValue="GreenTech Machinery"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="source-type"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Source Type
                    </label>
                    <select
                      id="source-type"
                      className="w-full"
                      style={inputStyles}
                    >
                      <option value="">Select Source</option>
                      <option value="dealer">Dealer</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="broker">Broker</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      defaultValue="Blair Nolan"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      defaultValue="Sales Manager"
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
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full text-left flex justify-between items-center"
                        style={inputStyles}
                        onClick={() => setCommunicationOpen2(!isCommunicationOpen2)}
                      >
                        {communicationValue2}
                        <svg
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            isCommunicationOpen2 ? "rotate-180" : ""
                          }`}
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
                      </button>
                      {isCommunicationOpen2 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                          <ul>
                            <li
                              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setCommunicationValue2("Yes");
                                setCommunicationOpen2(false);
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  checked={communicationValue2 === "Yes"}
                                  readOnly
                                />
                                <span className="ml-2">Yes</span>
                              </div>
                            </li>
                            <li
                              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setCommunicationValue2("No");
                                setCommunicationOpen2(false);
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox text-red-600"
                                  checked={communicationValue2 === "No"}
                                  readOnly
                                />
                                <span className="ml-2">No</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="phone-1"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Phone Number 1
                    </label>
                    <input
                      type="text"
                      id="phone-1"
                      defaultValue="+(123) 456-7890"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone-2"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Phone Number 2
                    </label>
                    <input
                      type="text"
                      id="phone-2"
                      defaultValue="+(123) 555-6789"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue="b.nolan@greentechmachinery.com"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
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
                      defaultValue="www.greentechmachinery.com"
                      className="w-full"
                      style={inputStyles}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Information */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsTransactionInfoOpen(!isTransactionInfoOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Transaction Information
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isTransactionInfoOpen ? "rotate-180" : ""
                }`}
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
            {isTransactionInfoOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="current-meter"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Current Meter<span style={{ color: "red" }}>*</span>
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
                    Proposed Annual Utilization
                    <span style={{ color: "red" }}>*</span>
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
                    Meter Unit<span style={{ color: "red" }}>*</span>
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
                    Terms (Months)<span style={{ color: "red" }}>*</span>
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
                    Structure<span style={{ color: "red" }}>*</span>
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
                    Application<span style={{ color: "red" }}>*</span>
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
                    Environment<span style={{ color: "red" }}>*</span>
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
            )}
          </div>

          {/* Utilization Scenario */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setIsUtilizationScenarioOpen(!isUtilizationScenarioOpen)
              }
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Utilization Scenario
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isUtilizationScenarioOpen ? "rotate-180" : ""
                }`}
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
            {isUtilizationScenarioOpen && (
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #CED4DA",
                    background: "#FBFBFB",
                    height: "40px",
                    padding: "0 12px",
                    color: "#343A40",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "24px",
                  }}
                >
                  + Add Scenario
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #CED4DA",
                    background: "#FBFBFB",
                    height: "40px",
                    padding: "0 12px",
                    color: "#343A40",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "24px",
                  }}
                >
                  + Add Additional Equipment
                </button>
              </div>
            )}
          </div>

          {/* Equipment Details */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsEquipmentDetailsOpen(!isEquipmentDetailsOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Equipment Details
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isEquipmentDetailsOpen ? "rotate-180" : ""
                }`}
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
            {isEquipmentDetailsOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="industry"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Industry<span style={{ color: "red" }}>*</span>
                  </label>
                  <select id="industry" className="w-full" style={inputStyles}>
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
                    Asset class<span style={{ color: "red" }}>*</span>
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
                    Make<span style={{ color: "red" }}>*</span>
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
                    Model<span style={{ color: "red" }}>*</span>
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
                    Year<span style={{ color: "red" }}>*</span>
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
                    Current Meter Reading
                    <span style={{ color: "red" }}>*</span>
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
                    Meter Type<span style={{ color: "red" }}>*</span>
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
                    Proposed Utilization
                    <span style={{ color: "red" }}>*</span>
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
                    Environment Ranking<span style={{ color: "red" }}>*</span>
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
            )}
          </div>

          {/* Financial Information */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsFinancialInfoOpen(!isFinancialInfoOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Financial Information
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isFinancialInfoOpen ? "rotate-180" : ""
                }`}
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
            {isFinancialInfoOpen && (
              <div className="mt-4">
                <label
                  htmlFor="subject-price"
                  className="block mb-2"
                  style={labelStyles}
                >
                  Subject Price<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="subject-price"
                  placeholder="Enter subject price"
                  className="w-full"
                  style={inputStyles}
                />
              </div>
            )}
          </div>

          {/* Lease Term */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsLeaseTermOpen(!isLeaseTermOpen)}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                Lease Term
              </h2>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isLeaseTermOpen ? "rotate-180" : ""
                }`}
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
            {isLeaseTermOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="lease-terms-months"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Terms (Months)<span style={{ color: "red" }}>*</span>
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
                    Structure<span style={{ color: "red" }}>*</span>
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
                    Application<span style={{ color: "red" }}>*</span>
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
                    Environment<span style={{ color: "red" }}>*</span>
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
            )}
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
