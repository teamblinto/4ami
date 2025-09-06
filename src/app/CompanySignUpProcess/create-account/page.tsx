"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const [email, setEmail] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    phone: '',
    source: '',
    role: '',
    agreeTerms: false
  });
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get email and code from URL parameters
    const emailParam = searchParams.get('email');
    const codeParam = searchParams.get('code');
    
    if (emailParam) setEmail(emailParam);
    if (codeParam) setInvitationCode(codeParam);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Account creation data:', { ...formData, email, invitationCode });
    
    // Redirect to signup page with the user data
    router.push(`/CompanySignUpProcess/signup?email=${encodeURIComponent(email)}&code=${encodeURIComponent(invitationCode)}&firstName=${encodeURIComponent(formData.firstName)}&lastName=${encodeURIComponent(formData.lastName)}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        <div className="flex-grow p-4 sm:p-6 w-full">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col lg:flex-row w-full gap-8">
            
            {/* Form Section */}
            <div className="w-full lg:w-3/5">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Please provide your details below to set up your new account. This will allow you to access all services and manage your profile securely.
              </p>

              {/* Step Progress */}
              <div className="mb-6">
                <div className="flex justify-end mb-2">
                  <p className="text-sm font-medium">
                    <span className="text-red-500 font-medium">Step 2</span> of 3
                  </p>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-3 bg-red-500 rounded-full w-2/3"></div>
                </div>
              </div>
    
              <form onSubmit={handleSubmit}>
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                    />
                  </div>
                </div>

                {/* Title & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                      Title
                    </label>
                    <input 
                      type="text" 
                      id="title" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
                      Company
                    </label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="bg-gray-50 border border-gray-300 rounded-l px-3 py-2 text-gray-700">
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+880">🇧🇩 +880</option>
                    </select>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded-r w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Source & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="source" className="block text-gray-700 text-sm font-bold mb-2">
                      Source
                    </label>
                    <p className="text-sm text-gray-500 mb-1">Where or how did you hear about us</p>
                    <input 
                      type="text" 
                      id="source" 
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded focus:outline-none focus:border-gray-500"
                    >
                      <option value="">Select One</option>
                      <option value="Admin">Admin</option>
                      <option value="Company Admin">Company Admin</option>
                      <option value="Company User">Company User</option>
                      <option value="Appraiser">Appraiser</option>
                    </select>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="mb-6">
                  <label className="flex items-start">
                    <input 
                      type="checkbox" 
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 mr-3" 
                    />
                    <span className="text-sm text-gray-700">
                      I acknowledge that I have read and agree to the{' '}
                      <a href="#" className="text-red-500 underline">Terms of Use</a>,{' '}
                      <a href="#" className="text-red-500 underline">Privacy Policy</a>,{' '}
                      <a href="#" className="text-red-500 underline">Cookie Policy</a>{' '}
                      and{' '}
                      <a href="#" className="text-red-500 underline">Anti Bribery Policy</a>
                    </span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
    
            {/* Image & Links */}
            <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4">
              <Image
                src="/invitation-img.png"
                alt="Dashboard Illustration"
                width={600}
                height={800}
                className="w-full h-auto max-w-full max-h-[500px] object-contain"
              />
    
              <div className="w-full mt-6 text-sm text-end flex flex-wrap justify-end gap-4">
                <a href="#" className="underline hover:text-gray-600">Terms of Use</a>{' '}
                <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
                <a href="#" className="underline hover:text-gray-600">Cookie Policy</a>{' '}
                <a href="#" className="underline hover:text-gray-600">Anti Bribery Policy</a>
              </div>
            </div>
    
          </div>
        </div>
      </main>
    </div>
  );
}
