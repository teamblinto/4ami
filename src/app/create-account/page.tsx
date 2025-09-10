"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ClientContent() {
  const [email, setEmail] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    phone: "",
    source: "",
    role: "",
    agreeTerms: false,
  });

  

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const codeParam = searchParams.get("code");

    if (emailParam) setEmail(emailParam);
    if (codeParam) setInvitationCode(codeParam);
  }, [searchParams]);

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
    console.log("Account creation data:", {
      ...formData,
      email,
      invitationCode,
    });
    router.push(
      `/signup?email=${encodeURIComponent(
        email
      )}&code=${encodeURIComponent(
        invitationCode
      )}&firstName=${encodeURIComponent(
        formData.firstName
      )}&lastName=${encodeURIComponent(formData.lastName)}`
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen  bg-[#FBFBFB] flex flex-col">
      <header className="px-12 py-4">
        <img src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
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
                  </div>
                  <div className="">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <div className="flex">
                      <div className="">
                        <select className="appearance-none bg-white border border-gray-300 rounded-l-md p-2 pr-8 text-gray-700">
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
                        className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md"
                      >
                        <option value="">Select One</option>
                        <option value="Admin">Admin</option>
                        <option value="Company Admin">Company Admin</option>
                        <option value="Company User">Company User</option>
                        <option value="Appraiser">Appraiser</option>
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
                    className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 text-white font-semibold py-2 px-6 rounded-md"
                  >
                    Next
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
