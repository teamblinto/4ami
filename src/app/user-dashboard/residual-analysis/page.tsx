"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ResidualAnalysisPage = () => {
  const router = useRouter();

  // Phone number validation function
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's a valid phone number (7-15 digits)
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
  };
  const [isSourceInfoOpen, setIsSourceInfoOpen] = useState(true);
  const [isClientInfoOpen, setIsClientInfoOpen] = useState(true);
  const [isTransactionInfoOpen, setIsTransactionInfoOpen] = useState(true);
  const [isUtilizationScenarioOpen, setIsUtilizationScenarioOpen] =
    useState(true);
  const [isEquipmentDetailsOpen, setIsEquipmentDetailsOpen] = useState(true);
  const [isFinancialInfoOpen, setIsFinancialInfoOpen] = useState(true);
  const [isCommunicationOpen, setCommunicationOpen] = useState(false);
  const [communicationValue, setCommunicationValue] = useState("No");
  const [isCommunicationOpen2, setCommunicationOpen2] = useState(false);
  const [communicationValue2, setCommunicationValue2] = useState("No");

  // Phone validation states
  const [phoneErrors, setPhoneErrors] = useState({
    lesseePhone: "",
    sourcePhone1: "",
    sourcePhone2: ""
  });

  // Phone validation handlers
  const handlePhoneChange = (phoneType: string, value: string) => {
    const isValid = validatePhoneNumber(value);
    setPhoneErrors(prev => ({
      ...prev,
      [phoneType]: isValid || value === "" ? "" : "Please enter a valid phone number"
    }));

    // Update the respective phone state
    switch (phoneType) {
      case 'lesseePhone':
        setLesseePhone(value);
        break;
      case 'sourcePhone1':
        setSourcePhone1(value);
        break;
      case 'sourcePhone2':
        setSourcePhone2(value);
        break;
    }
  };

  // Utilization Scenario state
  const [scenarios, setScenarios] = useState<{
    id: number;
    scenario: string;
    termsMonths: string;
    annualUtilization: string;
    cost: string;
    subsidy: string;
    warranty: string;
    pms: string;
    unitPrice: string;
  }[]>([
    {
      id: 1,
      scenario: "Q1",
      termsMonths: "",
      annualUtilization: "",
      cost: "",
      subsidy: "",
      warranty: "",
      pms: "",
      unitPrice: ""
    }
  ]);
  const [utilizationNote, setUtilizationNote] = useState("");

  // Basic project fields
  const [projectId] = useState(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const rnd = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `RA-${y}${m}${day}-${rnd}`;
  });
  const [startDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [submittedDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectNote, setProjectNote] = useState("");

  // Client fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [lesseePhone, setLesseePhone] = useState("");
  const [clientCountryCode, setClientCountryCode] = useState("US");
  const [clientWebsite, setClientWebsite] = useState("");

  // Source fields
  const [sourceNo, setSourceNo] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [sourceContact, setSourceContact] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourcePhone1, setSourcePhone1] = useState("");
  const [sourcePhone2, setSourcePhone2] = useState("");
  const [sourceEmail, setSourceEmail] = useState("");
  const [sourceWebsite, setSourceWebsite] = useState("");

  // Equipment fields
  // const [equipmentId, setEquipmentId] = useState("");
  const [industry, setIndustry] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [currentMeterReading, setCurrentMeterReading] = useState("");
  const [meterType, setMeterType] = useState("");
  const [environmentRanking, setEnvironmentRanking] = useState("New");
  const [productRequirement, setProductRequirement] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Financial fields
  const [subjectPrice, setSubjectPrice] = useState("");
  const [concession, setConcession] = useState("");
  const [extendedWarranty, setExtendedWarranty] = useState("");
  const [maintenancePMs, setMaintenancePMs] = useState("");

  // Transaction fields
  const [currentMeter, setCurrentMeter] = useState("");
  const [proposedAnnualUtilization] = useState("");
  const [meterUnit] = useState("");
  const [maintenanceRecords] = useState("");
  const [inspectionReport] = useState("");
  const [terms] = useState("");
  const [structure, setStructure] = useState("");
  const [application, setApplication] = useState("");
  const [environment, setEnvironment] = useState("");

  // removed useEffect; lazy initialize in useState above

  // Functions for managing scenarios
  const addScenario = () => {
    const newScenario = {
      id: Math.max(...scenarios.map(s => s.id), 0) + 1,
      scenario: `Q${scenarios.length + 1}`,
      termsMonths: "",
      annualUtilization: "",
      cost: "",
      subsidy: "",
      warranty: "",
      pms: "",
      unitPrice: ""
    };
    setScenarios([...scenarios, newScenario]);
  };

  const addAdditionalEquipment = () => {
    // This would typically add a new equipment row or open a modal
    console.log("Add Additional Equipment clicked");
  };

  const deleteScenario = (id: number) => {
    if (scenarios.length > 1) {
      const updatedScenarios = scenarios
        .filter(scenario => scenario.id !== id)
        .map((scenario, index) => ({
          ...scenario,
          scenario: `Q${index + 1}`
        }));
      setScenarios(updatedScenarios);
    }
  };

  const updateScenario = (id: number, field: string, value: string) => {
    setScenarios(scenarios.map(scenario =>
      scenario.id === id ? { ...scenario, [field]: value } : scenario
    ));
  };

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 5MB.`);
          return false;
        }
        return true;
      });
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for phone validation errors
    const hasPhoneErrors = Object.values(phoneErrors).some(error => error !== "");
    if (hasPhoneErrors) {
      alert("Please fix phone number validation errors before submitting.");
      return;
    }

    const firstScenario = scenarios[0];
    const proposedUtilization = firstScenario?.annualUtilization
      ? Number(String(firstScenario.annualUtilization).replace(/[^0-9.]/g, ""))
      : undefined;

    const payload: ResidualAnalysisPayload = {
      projectTypeCode: "residual_analysis",
      name: projectName || projectId,
      description: projectNote,
      startDate: startDate && startDate.trim() ? startDate : undefined,
      endDate: submittedDate && submittedDate.trim() ? submittedDate : undefined,
      status: "draft",
      metadata: {
        priority: "high",
        category: "infrastructure",
      },
      client: {
        clientName,
        clientEmail,
        lesseePhone,
        countryCode: clientCountryCode,
        website: clientWebsite,
        communicationPreference: communicationValue === "Yes",
      },
      source: {
        sourceNo,
        sourceName,
        sourceType,
        contact: sourceContact,
        title: sourceTitle,
        communication: communicationValue2 === "Yes",
        phoneNumber1: sourcePhone1,
        phoneNumber2: sourcePhone2,
        email: sourceEmail,
        website: sourceWebsite,
      },
      equipments: [
        {
          industry,
          assetClass,
          make,
          model,
          year: year ? Number(year) : undefined,
          currentMeterReading: currentMeterReading ? Number(currentMeterReading) : undefined,
          meterType,
          proposedUtilization,
          environmentRanking,
          note: productRequirement,
          // description: equipmentDescription,
        },
      ],
      financial: {
        subjectPrice: subjectPrice ? Number(subjectPrice) : undefined,
        concession: concession ? Number(concession) : undefined,
        extendedWarranty,
        maintenancePMs,
      },
      transaction: {
        currentMeter: currentMeter ? Number(currentMeter) : undefined,
        proposedAnnualUtilization: proposedAnnualUtilization ? Number(proposedAnnualUtilization) : undefined,
        meterUnit,
        maintenanceRecords,
        inspectionReport,
        terms: terms ? Number(terms) : undefined,
        structure,
        application,
        environment,
      },
      utilizationScenarios: scenarios.map((scenario, index) => ({
        scenarioNo: index + 1,
        terms: scenario.termsMonths ? Number(scenario.termsMonths.replace(/[^0-9]/g, "")) : undefined,
        proposedUtilization: scenario.annualUtilization ? Number(scenario.annualUtilization.replace(/[^0-9.]/g, "")) : undefined,
        unitPrice: scenario.unitPrice ? Number(scenario.unitPrice.replace(/[^0-9.]/g, "")) : undefined,
      })),
    } as ResidualAnalysisPayload;

    try {
      const storedToken =
        (typeof window !== 'undefined' && (localStorage.getItem('authToken') || sessionStorage.getItem('authToken'))) || '';

      console.log('Retrieved token:', storedToken ? 'Token found' : 'No token found');

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (storedToken) {
        headers['Authorization'] = storedToken.startsWith('Bearer ') ? storedToken : `Bearer ${storedToken}`;
      }

      console.log('Request headers:', headers);
      console.log('Payload being sent:', payload);

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await response.json() : { message: await response.text() };

      if (!response.ok) {
        console.error('Project create failed:', data);
        alert((data && (data.message || data.error)) || 'Failed to submit project');
        return;
      }

      router.push('/user-dashboard/thank-you');
    } catch (err) {
      console.error('Project submit error:', err);
      alert('Network error. Please try again.');
    }
  };

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

        <form className="" onSubmit={handleSubmit}>
          {/* Project Information */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Project Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="project-id"
                  className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
                >
                  Project ID
                </label>
                <input
                  type="text"
                  id="project-id"
                  placeholder="Auto-generated"
                  className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1  focus:border-transparent"
                  value={projectId}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="start-date"
                  className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent"
                  value={startDate}
                  readOnly
                />
              </div>

            </div>
            <div className="mt-4">
              <label
                htmlFor="project-name"
                className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
              >
                Project Name<span>*</span>
              </label>
              <input
                required={true}
                type="text"
                id="project-name"
                placeholder="Burleson Sand Volvo A40G Water Truck"
                className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="project-note"
                className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
              >
                Project Note
              </label>
              <textarea
                id="project-note"
                rows={3}
                placeholder="Type here...."
                className="w-full px-3 py-2 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent resize-none"
                value={projectNote}
                onChange={(e) => setProjectNote(e.target.value)}
              />
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
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isClientInfoOpen ? "rotate-180" : ""
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
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      style={inputStyles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="client-email"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Client email*
                    </label>
                    <input
                      required
                      type="email"
                      id="client-email"
                      placeholder="yorkerho@gmail.com"
                      className="w-full"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
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
                        required={true}
                        className="rounded-l-md"
                        style={{
                          ...inputStyles,
                          borderTopRightRadius: "0",
                          borderBottomRightRadius: "0",
                          borderRight: "none",
                        }}
                        onChange={(e) => setClientCountryCode(e.target.value === "+1" ? "US" : e.target.value)}
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                      </select>
                      <input
                        type="number"
                        id="lease-phone"
                        className="flex-1 rounded-r-md"
                        value={lesseePhone}
                        onChange={(e) => handlePhoneChange('lesseePhone', e.target.value)}
                        style={{
                          ...inputStyles,
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                          borderColor: phoneErrors.lesseePhone ? "#dc2626" : "#CED4DA"
                        }}
                      />
                    </div>
                    {phoneErrors.lesseePhone && (
                      <p className="text-red-600 text-xs mt-1">{phoneErrors.lesseePhone}</p>
                    )}
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
                      placeholder="www.lorem.com"
                      className="w-full"
                      value={clientWebsite}
                      onChange={(e) => setClientWebsite(e.target.value)}
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <div className="flex items-center  gap-2">
                      <label
                        htmlFor="communication"
                        className="block mb-2"
                        style={labelStyles}
                      >
                        Communication
                      </label>
                      <Image className="mb-[5px]" src="/communication.svg" alt="communication" width={12} height={12} />
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full text-left flex justify-between items-center cursor-pointer"
                        style={inputStyles}
                        onClick={() =>
                          setCommunicationOpen(!isCommunicationOpen)
                        }
                      >
                        {communicationValue}
                        <svg
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${isCommunicationOpen ? "rotate-180" : ""
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
                                  className="form-checkbox accent-[#ED272C]"
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
                                  className="form-checkbox  accent-[#ED272C]"
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
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isSourceInfoOpen ? "rotate-180" : ""
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
                      placeholder="S-1002"
                      className="w-full"
                      value={sourceNo}
                      onChange={(e) => setSourceNo(e.target.value)}
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
                      placeholder="GreenTech Machinery"
                      className="w-full"
                      value={sourceName}
                      onChange={(e) => setSourceName(e.target.value)}
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
                      value={sourceType}
                      onChange={(e) => setSourceType(e.target.value)}
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
                      placeholder="Blair Nolan"
                      className="w-full"
                      value={sourceContact}
                      onChange={(e) => setSourceContact(e.target.value)}
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
                      placeholder="Sales Manager"
                      className="w-full"
                      value={sourceTitle}
                      onChange={(e) => setSourceTitle(e.target.value)}
                      style={inputStyles}
                    />
                  </div>
                  <div>
                    <div className="flex items-center  gap-2">
                      <label
                        htmlFor="communication"
                        className="block mb-2"
                        style={labelStyles}
                      >
                        Communication
                      </label>
                      <Image className="mb-[5px]" src="/communication.svg" alt="communication" width={12} height={12} />
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        className="w-full text-left flex justify-between items-center"
                        style={inputStyles}
                        onClick={() =>
                          setCommunicationOpen2(!isCommunicationOpen2)
                        }
                      >
                        {communicationValue2}
                        <svg
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${isCommunicationOpen2 ? "rotate-180" : ""
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
                                  className="form-checkbox accent-[#ED272C]"
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
                                  className="form-checkbox  accent-[#ED272C]"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="phone-1"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Phone Number 1
                    </label>
                    <input

                      type="number"
                      id="phone-1"
                      placeholder="+(123) 456-7890"
                      className="w-full"
                      value={sourcePhone1}
                      onChange={(e) => handlePhoneChange('sourcePhone1', e.target.value)}
                      style={{
                        ...inputStyles,
                        borderColor: phoneErrors.sourcePhone1 ? "#dc2626" : "#CED4DA"
                      }}
                    />
                    {phoneErrors.sourcePhone1 && (
                      <p className="text-red-600 text-xs mt-1">{phoneErrors.sourcePhone1}</p>
                    )}
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

                      type="number"
                      id="phone-2"
                      placeholder="+(123) 555-6789"
                      className="w-full"
                      value={sourcePhone2}
                      onChange={(e) => handlePhoneChange('sourcePhone2', e.target.value)}
                      style={{
                        ...inputStyles,
                        borderColor: phoneErrors.sourcePhone2 ? "#dc2626" : "#CED4DA"
                      }}
                    />
                    {phoneErrors.sourcePhone2 && (
                      <p className="text-red-600 text-xs mt-1">{phoneErrors.sourcePhone2}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Email*
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="b.nolan@greentechmachinery.com"
                      className="w-full"
                      value={sourceEmail}
                      onChange={(e) => setSourceEmail(e.target.value)}
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
                      placeholder="www.greentechmachinery.com"
                      className="w-full"
                      value={sourceWebsite}
                      onChange={(e) => setSourceWebsite(e.target.value)}
                      style={inputStyles}
                    />
                  </div>
                </div>
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
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isEquipmentDetailsOpen ? "rotate-180" : ""
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
              <div className="flex flex-col gap-4" >


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="industry"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Industry<span>*</span>
                    </label>
                    <select id="industry" required={true} className="w-full" style={inputStyles} value={industry} onChange={(e) => setIndustry(e.target.value)}>
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
                      Asset class<span>*</span>
                    </label>
                    <input
                      required={true}
                      type="text"
                      id="asset-class"
                      placeholder="Enter asset class"
                      className="w-full"
                      value={assetClass}
                      onChange={(e) => setAssetClass(e.target.value)}
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="make"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Make<span>*</span>
                    </label>
                    <input
                      required={true}
                      type="text"
                      id="make"
                      placeholder="Enter make"
                      className="w-full"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="model"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Model<span>*</span>
                    </label>
                    <input
                      required={true}
                      type="text"
                      id="model"
                      placeholder="Enter model"
                      className="w-full"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="year"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Year<span  >*</span>
                    </label>
                    <input
                      type="number"
                      id="year"
                      placeholder="Enter year"
                      className="w-full"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      style={inputStyles}
                      required
                      min="1900"
                      max="2030"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="current-meter-reading"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Current Meter Reading
                      <span  >*</span>
                    </label>
                    <input
                      type="number"
                      id="current-meter-reading"
                      placeholder="Enter current meter reading"
                      className="w-full"
                      value={currentMeterReading}
                      onChange={(e) => setCurrentMeterReading(e.target.value)}
                      style={inputStyles}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="meter-type"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Meter Type<span>*</span>
                    </label>
                    <select
                      required={true}
                      id="meter-type"
                      className="w-full"
                      value={meterType}
                      onChange={(e) => setMeterType(e.target.value)}
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
                      htmlFor="environment-ranking"
                      className="block mb-2"
                      style={labelStyles}
                    >
                      Environment Ranking<span  >*</span>
                    </label>
                    <select
                      id="environment-ranking"
                      className="w-full"
                      value={environmentRanking}
                      onChange={(e) => setEnvironmentRanking(e.target.value)}
                      style={inputStyles}
                    >
                      <option value="New">New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                </div>

                <div className="w-full" >
                  <label
                    htmlFor="product-requirement"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Note
                  </label>
                  <textarea
                    id="product-requirement"
                    rows={3}
                    placeholder="Type here...."
                    className="w-full px-3 py-2 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent resize-none"
                    value={productRequirement}
                    onChange={(e) => setProductRequirement(e.target.value)}
                  />
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
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isFinancialInfoOpen ? "rotate-180" : ""
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="subject-price"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Subject Price<span  >*</span>
                  </label>
                  <input
                    type="number"
                    id="subject-price"
                    placeholder="Enter subject price"
                    className="w-full"
                    value={subjectPrice}
                    onChange={(e) => setSubjectPrice(e.target.value)}
                    style={inputStyles}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label
                    htmlFor="concession"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Concession<span  >*</span>
                  </label>
                  <input
                    type="number"
                    id="concession"
                    placeholder="Enter concession"
                    className="w-full"
                    value={concession}
                    onChange={(e) => setConcession(e.target.value)}
                    style={inputStyles}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label
                    htmlFor="extended-warranty"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Extended Warranty
                  </label>
                  <input
                    type="text"
                    id="extended-warranty"
                    placeholder="Enter extended warranty"
                    className="w-full"
                    value={extendedWarranty}
                    onChange={(e) => setExtendedWarranty(e.target.value)}
                    style={inputStyles}
                  />
                </div>
                <div>
                  <label
                    htmlFor="maintenance-pms"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Maintenance/PMs
                  </label>
                  <input
                    type="text"
                    id="maintenance-pms"
                    placeholder="Enter maintenance/PMs"
                    className="w-full"
                    value={maintenancePMs}
                    onChange={(e) => setMaintenancePMs(e.target.value)}
                    style={inputStyles}
                  />
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
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isTransactionInfoOpen ? "rotate-180" : ""
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="current-meter"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Current Meter<span  >*</span>
                  </label>
                  <input
                    type="number"
                    id="current-meter"
                    placeholder="Enter current meter"
                    className="w-full"
                    value={currentMeter}
                    onChange={(e) => setCurrentMeter(e.target.value)}
                    style={inputStyles}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>





                <div>
                  <label
                    htmlFor="structure"
                    className="block mb-2"
                    style={labelStyles}
                  >
                    Structure<span>*</span>
                  </label>
                  <select id="structure" required={true} className="w-full" style={inputStyles} value={structure} onChange={(e) => setStructure(e.target.value)}>
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
                    Application
                  </label>
                  <select

                    id="application"
                    className="w-full"
                    style={inputStyles}
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
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
                    Environment<span  >*</span>
                  </label>
                  <select
                    required={true}
                    id="environment"
                    className="w-full"
                    style={inputStyles}
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
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

          {/* File Upload Section */}
          <div className="mb-6 bg-white px-4 py-5 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              File Upload
            </h2>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Upload Illustration */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Main cloud with arrow */}
                  <div className="w-20 h-16 bg-red-500 rounded-full flex items-center justify-center relative">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Folder icon */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-400 rounded-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>

                  {/* Document icon */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Clock icon */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Plant icon */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drag and Drop Your File Here!
              </h3>
              <p className="text-gray-600 mb-2">
                Upload pictures, release confirmation, bill of lading, etc
              </p>
              <p className="text-gray-500 text-sm mb-6">
                A file maximum size should be 5MB
              </p>

              <button
                type="button"
                onClick={() => document.getElementById('file-input')?.click()}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Import a File
              </button>

              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files:</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
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
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isUtilizationScenarioOpen ? "rotate-180" : ""
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
              <div className="mt-4">
                {/* Action Buttons */}
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={addScenario}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
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
                    onClick={addAdditionalEquipment}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
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

                {/* Interactive Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Scenario
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Term (mo)
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Annual Utilization
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Funding ($)
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Subsidy ($)
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Warranty ($)
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          PMs ($)
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Unit Price ($)
                        </th>
                        <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenarios.map((scenario) => (
                        <tr key={scenario.id}>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="text"
                              value={scenario.scenario}
                              onChange={(e) => updateScenario(scenario.id, 'scenario', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none"
                              style={{ color: "#343A40", fontFamily: "Inter" }}
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.termsMonths}
                              onChange={(e) => updateScenario(scenario.id, 'termsMonths', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter term in months"

                              min="1"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.annualUtilization}
                              onChange={(e) => updateScenario(scenario.id, 'annualUtilization', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter annual utilization (hours, miles, cycles, etc.)"

                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.cost}
                              onChange={(e) => updateScenario(scenario.id, 'cost', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter total funding amount"

                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.subsidy}
                              onChange={(e) => updateScenario(scenario.id, 'subsidy', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter subsidy amount"

                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.warranty}
                              onChange={(e) => updateScenario(scenario.id, 'warranty', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter warranty amount"

                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.pms}
                              onChange={(e) => updateScenario(scenario.id, 'pms', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter PMs amount"

                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <input
                              type="number"
                              value={scenario.unitPrice}
                              onChange={(e) => updateScenario(scenario.id, 'unitPrice', e.target.value)}
                              className="w-full border-none bg-transparent text-sm focus:outline-none text-gray-500"
                              style={{ fontFamily: "Inter" }}
                              placeholder="Enter unit price"

                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="border border-gray-200 px-3 py-2">
                            <button
                              type="button"
                              onClick={() => deleteScenario(scenario.id)}
                              className="text-red-600 cursor-pointer w-10 h-10 flex items-center justify-center hover:text-red-800 text-sm"
                              disabled={scenarios.length === 1}
                            >
                              <Image src="/delete.svg" alt="delete" width={12} height={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Utilization Note */}
                <div className="mt-4">
                  <label
                    htmlFor="utilization-note"
                    className="block mb-2 text-sm font-medium text-gray-700"
                    style={labelStyles}
                  >
                    Utilization Note
                  </label>
                  <textarea
                    id="utilization-note"
                    value={utilizationNote}
                    onChange={(e) => setUtilizationNote(e.target.value)}
                    placeholder="Type here..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 "
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #CED4DA",
                      background: "#FBFBFB",
                      color: "#343A40",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "24px",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

// Define a type for the payload
interface ResidualAnalysisPayload {
  projectTypeCode: "residual_analysis";
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  status: string;
  metadata: {
    priority: string;
    category: string;
  };
  client: {
    clientName: string;
    clientEmail: string;
    lesseePhone: string;
    countryCode: string;
    website: string;
    communicationPreference: boolean;
  };
  source: {
    sourceNo: string;
    sourceName: string;
    sourceType: string;
    contact: string;
    title: string;
    communication: boolean;
    phoneNumber1: string;
    phoneNumber2: string;
    email: string;
    website: string;
  };
  equipments: Array<{
    industry: string;
    assetClass: string;
    make: string;
    model: string;
    year?: number;
    currentMeterReading?: number;
    meterType: string;
    proposedUtilization?: number;
    environmentRanking: string;
    note?: string | null;
  }>;
  financial: {
    subjectPrice?: number;
    concession?: number;
    extendedWarranty: string;
    maintenancePMs: string;
  };
  transaction: {
    currentMeter?: number;
    proposedAnnualUtilization?: number;
    meterUnit: string;
    maintenanceRecords: string;
    inspectionReport: string;
    terms?: number;
    structure: string;
    application: string;
    environment: string;
  };
  utilizationScenarios: Array<{
    scenarioNo: number;
    terms?: number;
    proposedUtilization?: number;
    unitPrice?: number;
  }>;
}

export default ResidualAnalysisPage;
