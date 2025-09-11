"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  role: string;
  username: string;
  invitationCode: string;
  sendNotification: boolean;
}

export default function AddUserPage() {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState('A7K3D');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    role: '',
    username: '',
    invitationCode: '',
    sendNotification: true
  });

  const generateCode = () => {
    // Generate a more secure invitation code using crypto API
    const generateSecureCode = () => {
      // Use crypto.getRandomValues for cryptographically secure random numbers
      const array = new Uint8Array(8);
      crypto.getRandomValues(array);
      
      // Convert to base36 for shorter, URL-safe codes
      const code = Array.from(array, byte => byte.toString(36)).join('').toUpperCase();
      
      // Take first 8 characters and format as XXXX-XXXX
      return code.substring(0, 8).replace(/(.{4})/g, '$1-').slice(0, -1);
    };

    const newCode = generateSecureCode();
    setInvitationCode(newCode);
    
    // Generate professional username when invitation code is generated
    const generateUsername = (firstName: string, lastName: string) => {
      if (!firstName || !lastName) return '';
      
      // Clean names: remove special characters, convert to lowercase
      const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
      const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
      
      // Generate random suffix for uniqueness
      const randomSuffix = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
      
      // Professional format: firstname.lastname.XXXX
      return `${cleanFirst}.${cleanLast}.${randomSuffix}`;
    };

    setFormData(prev => ({
      ...prev,
      invitationCode: newCode,
      username: generateUsername(prev.firstName, prev.lastName)
    }));
  };

  const generateUsername = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return '';
    
    // Clean names: remove special characters, convert to lowercase
    const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
    const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
    
    // Generate random suffix for uniqueness
    const randomSuffix = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    
    // Professional format: firstname.lastname.XXXX
    return `${cleanFirst}.${cleanLast}.${randomSuffix}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.firstName.trim()) {
        throw new Error('First Name is required');
      }
      if (!formData.lastName.trim()) {
        throw new Error('Last Name is required');
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      if (!formData.role.trim()) {
        throw new Error('Role is required');
      }
      if (!invitationCode) {
        throw new Error('Please generate an invitation code first');
      }

      // Navigate to create account page with form data
      const queryParams = new URLSearchParams({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        role: formData.role,
        username: formData.username,
        invitationCode: invitationCode,
        sendNotification: formData.sendNotification.toString()
      });

      router.push(`/create-user-account?${queryParams.toString()}`);
    } catch (error: unknown) {
      console.error('Error validating form:', error);
      
      let errorMessage = 'Please complete all required fields. ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleImportUserData = () => {
    toast.success('Import User Data functionality will be implemented');
  };

  const handleDiscardChanges = () => {
    if (confirm('Are you sure you want to discard all changes?')) {
      router.push('/company-admin/manage-users');
    }
  };

  const handleCancel = () => {
    router.push('/company-admin/manage-users');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Add User</h1>
        <p className="text-gray-500">Company Admin / Manage Users / Add User</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {/* Header with Import Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleImportUserData}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import User Data
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* First Name */}
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
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                />
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
                  Company Name
                </label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                />
              </div>

              {/* Invitation Code */}
              <div>
                <label htmlFor="invitationCode" className="block text-gray-700 text-sm font-bold mb-2">
                  Invitation Code
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={generateCode}
                    className="bg-gray-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded focus:outline-none focus:shadow-outline whitespace-nowrap"
                  >
                    Generate Code
                  </button>
                  <input
                    type="text"
                    id="invitationCode"
                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    value={invitationCode}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Last Name */}
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
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border border-gray-300 rounded flex-1 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                  />
                </div>
              </div>

              {/* Role */}
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
                  className="block w-full border border-gray-300 text-gray-700 py-2 px-3 rounded focus:outline-none focus:border-gray-500"
                >
                  <option value="">Select One</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                />
                <p className="text-sm text-gray-500 mt-1">
                  Username will be auto generated when generate invitation code
                </p>
              </div>
            </div>
          </div>

          {/* Send User Notification */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sendNotification"
                checked={formData.sendNotification}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-gray-700 font-bold">Send User Notification</span>
            </label>
            <p className="text-sm text-gray-500 ml-6">
              Send the new user an email about their account
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-700'
              } text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline`}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="bg-white text-gray-800 font-bold py-2 px-6 border border-gray-300 rounded focus:outline-none focus:shadow-outline hover:bg-gray-50"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white text-gray-800 font-bold py-2 px-6 border border-gray-300 rounded focus:outline-none focus:shadow-outline hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
