"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ClientContent() {
  const [email, setEmail] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAutoPopulated, setIsAutoPopulated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    phone: "",
    source: "",
    role: "Company User",
    agreeTerms: false,
  });
  const [countryCode, setCountryCode] = useState("+1");

  const searchParams = useSearchParams();
  const router = useRouter();

  
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const codeParam = searchParams.get("code");
    const token = searchParams.get("token");
    const roleParam = searchParams.get("role");

    // Console log all URL parameters (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log("=== URL Parameters ===");
      console.log("email:", emailParam);
      console.log("code:", codeParam);
      console.log("token:", token);
      console.log("role:", roleParam);
      console.log("All search params:", Object.fromEntries(searchParams.entries()));
      console.log("=====================");
    }

    if (emailParam) setEmail(emailParam);
    if (codeParam) setInvitationCode(codeParam);
    
    // Set role from URL parameter if provided, otherwise keep default
    if (roleParam) {
      const mappedRole = mapApiRoleToFormRole(roleParam);
      if (mappedRole) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Setting role from URL param:", roleParam, "->", mappedRole);
        }
        setFormData(prev => ({ ...prev, role: mappedRole }));
      }
    }

    // If only token is present (no code), treat token as invitation code and skip verification
    if (!codeParam && token) {
      setInvitationCode(token);
      setIsAutoPopulated(true);
      return;
    }

    // If token equals the provided code, skip verification
    if (token && codeParam && token === codeParam) {
      setIsAutoPopulated(true);
      return;
    }

    // If token is present and different from the code, verify
    if (token && token !== codeParam) {
      fetchVerificationData(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Function to map API role values to form option values
  const mapApiRoleToFormRole = (apiRole: string): string => {
    const roleMapping: Record<string, string> = {
      'ADMIN': 'Admin',
      'CUSTOMER_ADMIN': 'Customer Admin',
      'CUSTOMER_USER': 'Company User',
      'APPRAISER': 'Appraiser'
    };
    return roleMapping[apiRole] || '';
  };

  // Function to map form option values back to API role enums
  const mapFormRoleToApiRole = (formRole: string): string => {
    const reverseMapping: Record<string, string> = {
      'Admin': 'ADMIN',
      'Customer Admin': 'CUSTOMER_ADMIN',
      'Company User': 'CUSTOMER_USER',
      'Appraiser': 'APPRAISER'
    };
    return reverseMapping[formRole] || '';
  };

  const fetchVerificationData = async (token: string) => {
    setIsVerifying(true);
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Fetching verification data for token:', token);
      }
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(response);
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        if (process.env.NODE_ENV === 'development') {
          console.log('Non-JSON response:', textResponse);
        }
        toast.error('Invalid response from verification service');
        return;
      }

      const data = await response.json();
      if (process.env.NODE_ENV === 'development') {
        console.log('Response data:', data);
      }

      if (response.ok) {
        // Auto-populate fields based on the response data
        if (data.user) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Auto-populating fields with user data:', data.user);
          }
          
          // Map email from user object
          if (data.user.email) {
            setEmail(data.user.email);
            if (process.env.NODE_ENV === 'development') {
              console.log('Set email:', data.user.email);
            }
          }
          
          // Map invitation code from emailVerificationToken
          if (data.user.emailVerificationToken) {
            setInvitationCode(data.user.emailVerificationToken);
            if (process.env.NODE_ENV === 'development') {
              console.log('Set invitation code:', data.user.emailVerificationToken);
            }
          }

          // Map role from API to form option value
          const mappedRole = mapApiRoleToFormRole(data.user.role);
          if (process.env.NODE_ENV === 'development') {
            console.log('API role:', data.user.role, 'Mapped to form role:', mappedRole);
          }

          // Auto-populate form fields from user data
          const newFormData = {
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            company: data.user.company || "",
            source: data.user.source || "",
            role: mappedRole,
            title: data.user.title || "",
            phone: data.user.phone || "",
            agreeTerms: false,
          };
          
          if (process.env.NODE_ENV === 'development') {
            console.log('Setting form data:', newFormData);
          }
          setFormData(newFormData);
        }

        setIsAutoPopulated(true);
        toast.success('Email verification data loaded successfully!');
      } else {
        // Handle different error cases
        if (response.status === 400) {
          toast.error(data.message || 'Invalid verification token');
        } else if (response.status === 404) {
          toast.error('Verification token not found');
        } else {
          toast.error(data.message || `Failed to verify email (Status: ${response.status})`);
        }
      }
    } catch (error) {
      console.error('Error fetching verification data:', error);
      if (error instanceof SyntaxError) {
        toast.error('Invalid response format from server');
      } else {
        toast.error('Failed to load verification data. Please check your connection.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apiRole = mapFormRoleToApiRole(formData.role);
    if (!apiRole) {
      toast.error('Please select a valid role');
      return;
    }
    if (process.env.NODE_ENV === 'development') {
      console.log("Account creation data:", {
        ...formData,
        email,
        invitationCode,
        role: apiRole,
      });
    }
    const fullPhoneNumber = `${countryCode}${formData.phone}`;
    router.push(
      `/signup?email=${encodeURIComponent(
        email
      )}&code=${encodeURIComponent(
        invitationCode
      )}&firstName=${encodeURIComponent(
        formData.firstName
      )}&lastName=${encodeURIComponent(formData.lastName)}&title=${encodeURIComponent(
        formData.title
      )}&company=${encodeURIComponent(formData.company)}&phone=${encodeURIComponent(
        fullPhoneNumber
      )}&source=${encodeURIComponent(formData.source)}&role=${encodeURIComponent(apiRole)}`
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen  bg-[#FBFBFB] flex flex-col">
      <header className="px-12 py-4">
        <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
      </header>
      <main className="flex-grow flex items-center  mt-4 justify-center">
        <div
          className="rounded-lg "
          style={{ width: "1210px", maxWidth: "1210px" }}
        >
          <div className="flex gap-[64px] p-6 bg-white text-black min-h-[600px]">
            {/* Form Section */}
            <div className="flex-1  flex flex-col ">
              <h1 className="text-3xl font-bold text-black mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 mb-6">
                Please provide your details below to set up your new account.
                This will allow you to access all services and manage your
                profile securely.
              </p>

              {/* Loading indicator for verification */}
              {isVerifying && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                    <span className="text-blue-700 text-sm">Loading verification data...</span>
                  </div>
                </div>
              )}

              {/* Step Progress */}
              <div className="mb-8">
                <div className="flex justify-end mb-1">
                  <p className="text-sm font-medium text-gray-600">
                    <span className="text-red-500">Step 2</span> of 3
                  </p>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-2 bg-red-500 rounded-full w-2/3"></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                    {/* {isAutoPopulated && (
                      <p className="text-xs text-gray-500 mt-1">Pre-filled from verification (editable)</p>
                    )} */}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                    {/* {isAutoPopulated && (
                      <p className="text-xs text-gray-500 mt-1">Pre-filled from verification (editable)</p>
                    )} */}
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                    {/* {isAutoPopulated && (
                      <p className="text-xs text-gray-500 mt-1">Pre-filled from verification (editable)</p>
                    )} */}
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                    {/* {isAutoPopulated && (
                      <p className="text-xs text-gray-500 mt-1">Pre-filled from verification (editable)</p>
                    )} */}
                  </div>
                  <div className="">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <div className="flex">
                      <div className="relative">
                        <select 
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="appearance-none bg-white border border-gray-300 rounded-l-md p-2 pr-8 text-gray-700"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+880">🇧🇩 +880</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter phone number"
                        className="flex-1 p-2 border-t border-b border-r border-gray-300 rounded-r-md bg-white"
                      />
                    </div>
                  </div>
                </div>
                {/* here  */}
                <div className="flex justify-between gap-6 mt-6 ">
                  <div className="flex-1">
                    <label
                      htmlFor="source"
                      className=" text-sm font-medium text-gray-700 mb-1"
                    >
                      Source
                    </label>
                    <input
                      type="text"
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      placeholder="Where or how did you hear about us"
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                    {/* {isAutoPopulated && (
                      <p className="text-xs text-gray-500 mt-1">Pre-filled from verification (editable)</p>
                    )} */}
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Role
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full appearance-none border border-gray-300 text-gray-700 py-2 px-3 rounded-md bg-white"
                      >
                        <option value="">Select One</option>
                        {/* <option value="Admin">Admin</option> */}
                        <option value="Customer Admin">Customer Admin</option>
                        <option value="Company User">Company User</option>
                        {/* <option value="Appraiser">Appraiser</option> */}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {isAutoPopulated && (
                      <p className="text-xs text-gray-500 mt-1">Pre-filled from verification (editable)</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 mr-2 h-4 w-4"
                    />
                    <span className="text-sm text-gray-600">
                      I acknowledge that I have read and agree to the{" "}
                      <a href="#" className="text-red-500 underline">
                        Terms of Use
                      </a>
                      ,{" "}
                      <a href="#" className="text-red-500 underline">
                        Privacy Policy
                      </a>
                      ,{" "}
                      <a href="#" className="text-red-500 underline">
                        Cookie Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-red-500 underline">
                        Anti Bribery Policy
                      </a>
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className={`font-semibold py-2 px-6 rounded-md ${
                      isVerifying
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-red-500 text-white cursor-pointer'
                    }`}
                  >
                    {isVerifying ? 'Loading...' : 'Next'}
                  </button>
                </div>
              </form>
            </div>

            {/* Gap - 64px */}
            {/* <div style={{ width: "64px" }}></div> */}

            {/* Image & Links */}
            <div className=" flex flex-col items-center justify-center">
              <Image
                src="/banner.svg"
                alt="Dashboard Illustration"
                width={400}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="p-6 ">
            <div className="flex justify-end space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">
                Terms of Use
              </a>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Anti Bribery Policy
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function CreateAccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientContent />
    </Suspense>
  );
}
