"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CompanyAdminManageProfilePage() {
  const [activeTab, setActiveTab] = useState("company-info");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "Evergreen Equipment Leasing",
    companyType: "Lessor",
    companySize: "30-50",
    companyWebsite: "",
    companyDescription: "",

    // Address
    addressLine1: "Birmingham City Hall 710 20th St N",
    addressLine2: "",
    country: "us",
    city: "Birmingham",
    stateProvince: "al",
  });

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
    { value: "af", label: "Afghanistan" },
    { value: "al", label: "Albania" },
    { value: "dz", label: "Algeria" },
    { value: "as", label: "American Samoa" },
    { value: "ad", label: "Andorra" },
    { value: "ao", label: "Angola" },
    { value: "ar", label: "Argentina" },
    { value: "au", label: "Australia" },
    { value: "at", label: "Austria" },
    { value: "az", label: "Azerbaijan" },
    { value: "bs", label: "Bahamas" },
    { value: "bh", label: "Bahrain" },
    { value: "bd", label: "Bangladesh" },
    { value: "bb", label: "Barbados" },
    { value: "by", label: "Belarus" },
    { value: "be", label: "Belgium" },
    { value: "bz", label: "Belize" },
    { value: "bj", label: "Benin" },
    { value: "bt", label: "Bhutan" },
    { value: "bo", label: "Bolivia" },
    { value: "ba", label: "Bosnia and Herzegovina" },
    { value: "bw", label: "Botswana" },
    { value: "br", label: "Brazil" },
    { value: "bn", label: "Brunei" },
    { value: "bg", label: "Bulgaria" },
    { value: "bf", label: "Burkina Faso" },
    { value: "bi", label: "Burundi" },
    { value: "kh", label: "Cambodia" },
    { value: "cm", label: "Cameroon" },
    { value: "cv", label: "Cape Verde" },
    { value: "cf", label: "Central African Republic" },
    { value: "td", label: "Chad" },
    { value: "cl", label: "Chile" },
    { value: "cn", label: "China" },
    { value: "co", label: "Colombia" },
    { value: "km", label: "Comoros" },
    { value: "cg", label: "Congo" },
    { value: "cd", label: "Congo, Democratic Republic" },
    { value: "cr", label: "Costa Rica" },
    { value: "ci", label: "Côte d'Ivoire" },
    { value: "hr", label: "Croatia" },
    { value: "cu", label: "Cuba" },
    { value: "cy", label: "Cyprus" },
    { value: "cz", label: "Czech Republic" },
    { value: "dk", label: "Denmark" },
    { value: "dj", label: "Djibouti" },
    { value: "dm", label: "Dominica" },
    { value: "do", label: "Dominican Republic" },
    { value: "ec", label: "Ecuador" },
    { value: "eg", label: "Egypt" },
    { value: "sv", label: "El Salvador" },
    { value: "gq", label: "Equatorial Guinea" },
    { value: "er", label: "Eritrea" },
    { value: "ee", label: "Estonia" },
    { value: "et", label: "Ethiopia" },
    { value: "fj", label: "Fiji" },
    { value: "fi", label: "Finland" },
    { value: "fr", label: "France" },
    { value: "ga", label: "Gabon" },
    { value: "gm", label: "Gambia" },
    { value: "ge", label: "Georgia" },
    { value: "de", label: "Germany" },
    { value: "gh", label: "Ghana" },
    { value: "gr", label: "Greece" },
    { value: "gd", label: "Grenada" },
    { value: "gt", label: "Guatemala" },
    { value: "gn", label: "Guinea" },
    { value: "gw", label: "Guinea-Bissau" },
    { value: "gy", label: "Guyana" },
    { value: "ht", label: "Haiti" },
    { value: "hn", label: "Honduras" },
    { value: "hu", label: "Hungary" },
    { value: "is", label: "Iceland" },
    { value: "in", label: "India" },
    { value: "id", label: "Indonesia" },
    { value: "ir", label: "Iran" },
    { value: "iq", label: "Iraq" },
    { value: "ie", label: "Ireland" },
    { value: "il", label: "Israel" },
    { value: "it", label: "Italy" },
    { value: "jm", label: "Jamaica" },
    { value: "jp", label: "Japan" },
    { value: "jo", label: "Jordan" },
    { value: "kz", label: "Kazakhstan" },
    { value: "ke", label: "Kenya" },
    { value: "ki", label: "Kiribati" },
    { value: "kp", label: "North Korea" },
    { value: "kr", label: "South Korea" },
    { value: "kw", label: "Kuwait" },
    { value: "kg", label: "Kyrgyzstan" },
    { value: "la", label: "Laos" },
    { value: "lv", label: "Latvia" },
    { value: "lb", label: "Lebanon" },
    { value: "ls", label: "Lesotho" },
    { value: "lr", label: "Liberia" },
    { value: "ly", label: "Libya" },
    { value: "li", label: "Liechtenstein" },
    { value: "lt", label: "Lithuania" },
    { value: "lu", label: "Luxembourg" },
    { value: "mk", label: "Macedonia" },
    { value: "mg", label: "Madagascar" },
    { value: "mw", label: "Malawi" },
    { value: "my", label: "Malaysia" },
    { value: "mv", label: "Maldives" },
    { value: "ml", label: "Mali" },
    { value: "mt", label: "Malta" },
    { value: "mh", label: "Marshall Islands" },
    { value: "mr", label: "Mauritania" },
    { value: "mu", label: "Mauritius" },
    { value: "fm", label: "Micronesia" },
    { value: "md", label: "Moldova" },
    { value: "mc", label: "Monaco" },
    { value: "mn", label: "Mongolia" },
    { value: "me", label: "Montenegro" },
    { value: "ma", label: "Morocco" },
    { value: "mz", label: "Mozambique" },
    { value: "mm", label: "Myanmar" },
    { value: "na", label: "Namibia" },
    { value: "nr", label: "Nauru" },
    { value: "np", label: "Nepal" },
    { value: "nl", label: "Netherlands" },
    { value: "nz", label: "New Zealand" },
    { value: "ni", label: "Nicaragua" },
    { value: "ne", label: "Niger" },
    { value: "ng", label: "Nigeria" },
    { value: "no", label: "Norway" },
    { value: "om", label: "Oman" },
    { value: "pk", label: "Pakistan" },
    { value: "pw", label: "Palau" },
    { value: "pa", label: "Panama" },
    { value: "pg", label: "Papua New Guinea" },
    { value: "py", label: "Paraguay" },
    { value: "pe", label: "Peru" },
    { value: "ph", label: "Philippines" },
    { value: "pl", label: "Poland" },
    { value: "pt", label: "Portugal" },
    { value: "qa", label: "Qatar" },
    { value: "ro", label: "Romania" },
    { value: "ru", label: "Russia" },
    { value: "rw", label: "Rwanda" },
    { value: "kn", label: "Saint Kitts and Nevis" },
    { value: "lc", label: "Saint Lucia" },
    { value: "vc", label: "Saint Vincent and the Grenadines" },
    { value: "ws", label: "Samoa" },
    { value: "sm", label: "San Marino" },
    { value: "st", label: "São Tomé and Príncipe" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "sn", label: "Senegal" },
    { value: "rs", label: "Serbia" },
    { value: "sc", label: "Seychelles" },
    { value: "sl", label: "Sierra Leone" },
    { value: "sg", label: "Singapore" },
    { value: "sk", label: "Slovakia" },
    { value: "si", label: "Slovenia" },
    { value: "sb", label: "Solomon Islands" },
    { value: "so", label: "Somalia" },
    { value: "za", label: "South Africa" },
    { value: "es", label: "Spain" },
    { value: "lk", label: "Sri Lanka" },
    { value: "sd", label: "Sudan" },
    { value: "sr", label: "Suriname" },
    { value: "sz", label: "Swaziland" },
    { value: "se", label: "Sweden" },
    { value: "ch", label: "Switzerland" },
    { value: "sy", label: "Syria" },
    { value: "tw", label: "Taiwan" },
    { value: "tj", label: "Tajikistan" },
    { value: "tz", label: "Tanzania" },
    { value: "th", label: "Thailand" },
    { value: "tl", label: "Timor-Leste" },
    { value: "tg", label: "Togo" },
    { value: "to", label: "Tonga" },
    { value: "tt", label: "Trinidad and Tobago" },
    { value: "tn", label: "Tunisia" },
    { value: "tr", label: "Turkey" },
    { value: "tm", label: "Turkmenistan" },
    { value: "tv", label: "Tuvalu" },
    { value: "ug", label: "Uganda" },
    { value: "ua", label: "Ukraine" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "uk", label: "United Kingdom" },
    { value: "uy", label: "Uruguay" },
    { value: "uz", label: "Uzbekistan" },
    { value: "vu", label: "Vanuatu" },
    { value: "va", label: "Vatican City" },
    { value: "ve", label: "Venezuela" },
    { value: "vn", label: "Vietnam" },
    { value: "ye", label: "Yemen" },
    { value: "zm", label: "Zambia" },
    { value: "zw", label: "Zimbabwe" },
  ];

  const states = [
    { value: "al", label: "Alabama" },
    { value: "ak", label: "Alaska" },
    { value: "az", label: "Arizona" },
    { value: "ar", label: "Arkansas" },
    { value: "ca", label: "California" },
    { value: "co", label: "Colorado" },
    { value: "ct", label: "Connecticut" },
    { value: "de", label: "Delaware" },
    { value: "fl", label: "Florida" },
    { value: "ga", label: "Georgia" },
    { value: "hi", label: "Hawaii" },
    { value: "id", label: "Idaho" },
    { value: "il", label: "Illinois" },
    { value: "in", label: "Indiana" },
    { value: "ia", label: "Iowa" },
    { value: "ks", label: "Kansas" },
    { value: "ky", label: "Kentucky" },
    { value: "la", label: "Louisiana" },
    { value: "me", label: "Maine" },
    { value: "md", label: "Maryland" },
    { value: "ma", label: "Massachusetts" },
    { value: "mi", label: "Michigan" },
    { value: "mn", label: "Minnesota" },
    { value: "ms", label: "Mississippi" },
    { value: "mo", label: "Missouri" },
    { value: "mt", label: "Montana" },
    { value: "ne", label: "Nebraska" },
    { value: "nv", label: "Nevada" },
    { value: "nh", label: "New Hampshire" },
    { value: "nj", label: "New Jersey" },
    { value: "nm", label: "New Mexico" },
    { value: "ny", label: "New York" },
    { value: "nc", label: "North Carolina" },
    { value: "nd", label: "North Dakota" },
    { value: "oh", label: "Ohio" },
    { value: "ok", label: "Oklahoma" },
    { value: "or", label: "Oregon" },
    { value: "pa", label: "Pennsylvania" },
    { value: "ri", label: "Rhode Island" },
    { value: "sc", label: "South Carolina" },
    { value: "sd", label: "South Dakota" },
    { value: "tn", label: "Tennessee" },
    { value: "tx", label: "Texas" },
    { value: "ut", label: "Utah" },
    { value: "vt", label: "Vermont" },
    { value: "va", label: "Virginia" },
    { value: "wa", label: "Washington" },
    { value: "wv", label: "West Virginia" },
    { value: "wi", label: "Wisconsin" },
    { value: "wy", label: "Wyoming" },
  ];

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Robert Johnson",
      position: "CFO",
      email: "robert2@gmail.com",
      phone: "(415) 987-6543",
      department: "Finance",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CEO",
      email: "jane.smith@gmail.com",
      phone: "(718) 234-5678",
      department: "Technology",
    },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    toast.success("Company profile updated successfully!");
  };

  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: "",
      position: "",
      email: "",
      phone: "",
      department: "",
    };
    setContacts([...contacts, newContact]);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditContact = (id: number) => {
    toast.success("Edit contact functionality will be implemented");
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  const handleCountrySelect = (countryValue: string) => {
    setFormData((prev) => ({
      ...prev,
      country: countryValue,
    }));
    setIsCountryDropdownOpen(false);
  };

  const getSelectedCountryLabel = () => {
    const selectedCountry = countries.find(
      (country) => country.value === formData.country
    );
    return selectedCountry ? selectedCountry.label : "Select One";
  };

  const handleStateSelect = (stateValue: string) => {
    setFormData((prev) => ({
      ...prev,
      stateProvince: stateValue,
    }));
    setIsStateDropdownOpen(false);
  };

  const getSelectedStateLabel = () => {
    const selectedState = states.find(
      (state) => state.value === formData.stateProvince
    );
    return selectedState ? selectedState.label : "Select One";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        <h1 className="font-medium text-[#343A40] text-2xl">Manage Profile</h1>
        <p className="text-gray-500 mt-1">
          Dashboard / Manage Profile / Company Profile
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("company-info")}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === "company-info"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Company Information
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === "address"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Address
            </button>
            <button
              onClick={() => setActiveTab("key-contacts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === "key-contacts"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Key Contacts
            </button>
          </nav>
        </div>
      </div>

      {/* Company Information Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Company Information
            </h2>
            <p className="text-sm text-gray-600">
              Basic details about your organizations
            </p>
          </div>

          <div className="space-y-6">
            {/* Company Name - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="Enter company name"
              />
            </div>

            {/* Company Type and Company Size - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <select
                  value={formData.companyType}
                  onChange={(e) =>
                    handleInputChange("companyType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select One</option>
                  <option value="corporation">Corporation</option>
                  <option value="llc">LLC</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole-proprietorship">
                    Sole Proprietorship
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) =>
                    handleInputChange("companySize", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select One</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            {/* Company Website - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <input
                type="url"
                value={formData.companyWebsite}
                onChange={(e) =>
                  handleInputChange("companyWebsite", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="https://www.company.com"
              />
            </div>

            {/* Company Description - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                value={formData.companyDescription}
                onChange={(e) =>
                  handleInputChange("companyDescription", e.target.value)
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="Describe your company..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Address
            </h2>
          </div>

          <div className="space-y-6">
            {/* Address Line 1 - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) =>
                  handleInputChange("addressLine1", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="Enter address line 1"
              />
            </div>

            {/* Address Line 2 - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                value={formData.addressLine2}
                onChange={(e) =>
                  handleInputChange("addressLine2", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="Enter address line 2"
              />
            </div>

            {/* Country, City, State/Province - Horizontal Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900 text-left bg-white flex items-center justify-between cursor-pointer"
                  >
                    <span>{getSelectedCountryLabel()}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isCountryDropdownOpen ? "rotate-180" : ""
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

                  {isCountryDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {countries.map((country) => (
                        <div
                          key={country.value}
                          onClick={() => handleCountrySelect(country.value)}
                          className={`px-3 py-2 cursor-pointer flex items-center hover:bg-gray-50 ${
                            formData.country === country.value
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                              formData.country === country.value
                                ? "border-red-500 bg-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.country === country.value && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-900">{country.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900"
                  placeholder="Enter city"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent text-gray-900 text-left bg-white flex items-center justify-between cursor-pointer"
                  >
                    <span>{getSelectedStateLabel()}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isStateDropdownOpen ? "rotate-180" : ""
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

                  {isStateDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {states.map((state) => (
                        <div
                          key={state.value}
                          onClick={() => handleStateSelect(state.value)}
                          className={`px-3 py-2 cursor-pointer flex items-center hover:bg-gray-50 ${
                            formData.stateProvince === state.value
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                              formData.stateProvince === state.value
                                ? "border-red-500 bg-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.stateProvince === state.value && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-900">{state.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Contacts Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Key Contacts
                </h2>
                <p className="text-sm text-gray-600">
                  Primary points of contact for your organization
                </p>
              </div>
              <button
                onClick={handleAddContact}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer "
              >
                + Add Contact
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm font-medium text-gray-700 py-3 px-4 border-b border-gray-200">
                    Name
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 py-3 px-4 border-b border-gray-200">
                    Position
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 py-3 px-4 border-b border-gray-200">
                    Email
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 py-3 px-4 border-b border-gray-200">
                    Phone
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 py-3 px-4 border-b border-gray-200">
                    Department
                  </th>
                  <th className="text-left text-sm font-medium text-gray-700 py-3 px-4 border-b border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={contact.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      <span className="text-gray-900">{contact.name}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <span className="text-gray-900">{contact.position}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <span className="text-gray-900">{contact.email}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <span className="text-gray-900">{contact.phone}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <span className="text-gray-900">
                        {contact.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditContact(contact.id)}
                          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer "
                        >
                          <Image
                            src="/pencil.svg"
                            alt="/pencil.svg"
                            width={40}
                            height={40}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          <Image
                            src="/bin.svg"
                            alt="Delete"
                            width={40}
                            height={40}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-start">
        <button
          onClick={handleSaveChanges}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
