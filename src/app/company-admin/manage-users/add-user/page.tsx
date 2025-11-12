"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

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
  source: string;
  title: string;
}

export default function AddUserPage() {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    role: 'Customer User',
    username: '',
    invitationCode: '',
    sendNotification: true,
    source: '',
    title: ''
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

      // Map role values to API expected values
      const roleMapping: Record<string, string> = {
        'Customer User': 'CUSTOMER_USER',
      };

      // Prepare invitation data for API (matching API requirements)
      const invitationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        company: formData.companyName.trim(),
        role: roleMapping[formData.role] || 'CUSTOMER_USER',
        source: formData.source || 'Company Admin',
        invitationCode: invitationCode,
        title: formData.title.trim(),
      };

      console.log('Sending invitation data:', invitationData);

      // Get the auth token from localStorage
      const authToken = localStorage.getItem('authToken');
      
      // Prepare headers  
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
        console.log('Using auth token for invitation request');
      } else {
        console.warn('No auth token found in localStorage');
      }

      // Call the API endpoint
      const response = await fetch('/api/users/invite', {
        method: 'POST',
        headers,
        body: JSON.stringify(invitationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      console.log('Invitation API Success:', result);
      toast.success('User invitation sent successfully!');
      
      // Navigate back to manage users page
      router.push('/company-admin/manage-users');
    } catch (error: unknown) {
      console.error('Error sending invitation:', error);
      
      let errorMessage = 'Failed to send invitation. ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please check your internet connection and try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-lg flex flex-col lg:flex-row w-full gap-8 overflow-hidden">

      {/* Form Section */}
      <div className="w-full lg:w-3/5 p-6 min-w-0 flex-shrink">
        <div className="mb-[28px]">
          <h1 className="text-3xl font-bold text-black ">Add User</h1>
          <p className="text-gray-500">Use this form to add a new user to your company. Upon completion, a unique Invitation Code will be sent to the user. After they register, you will receive a notification email</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First/Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="shadow rounded-[8px] appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="shadow rounded-[8px] appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Title/Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
                className="shadow rounded-[8px] appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
                Company*
              </label>
              <input
                type="text"
                id="company"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="shadow rounded-[8px] appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="shadow rounded-[8px] appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>


          {/* Role/Source */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4 mb-4">
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
                style={{ height: '42px' }}
                className="block w-full rounded-[8px] bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded focus:outline-none focus:border-gray-500"
              >
                <option value="" disabled hidden>Select One</option>
                {/* <option value="Admin">Admin</option> */}
                <option value="Customer User">Customer User</option>
                {/* <option value="Company User">Company User</option> */}
                {/* <option value="Appraiser">Appraiser</option> */}
              </select>
            </div>
            <div>
              <label htmlFor="source" className="block text-gray-700 text-sm font-bold mb-2">
                Source
              </label>
              <p className="text-sm text-gray-500 mb-1">Where or how did we meet this person</p>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                required
                className="shadow rounded-[8px] appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Invitation Code */}
          <div className="mb-6">
            <label htmlFor="invitationCode" className="block text-gray-700 text-sm font-bold mb-2">
              Invitation Code
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={generateCode}
                className="text-gray-800 font-bold cursor-pointer rounded-[8px] py-[10px] px-[32px] border text-[13px] rounded focus:outline-none focus:shadow-outline w-full sm:w-[200px]"
              >
                Generate Code
              </button>
              <input
                type="text"
                id="invitationCode"
                className="shadow appearance-none border rounded-[8px] border-gray-300 bg-gray-50 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={invitationCode}
                readOnly
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#ED272C] hover:bg-red-700'
                } text-white font-bold py-[10px] px-[32px] cursor-pointer rounded-[8px] border text-[14px] rounded focus:outline-none focus:shadow-outline w-full sm:w-auto flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Invitation'
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push('/company-admin/manage-users')}
              className="text-gray-800 font-bold py-[10px] px-[32px] rounded-[8px] cursor-pointer border text-[14px] rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
          </form>
        </div>

      {/* Image & Links */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4 min-w-0">
        <div style={{ width: '450px', maxHeight: '600px', position: 'relative', aspectRatio: '1/2' }}>
          <Image
            src="/invitation-img.png"
            alt="Dashboard Illustration"
            fill
            priority
            className="object-cover"
            sizes="450px"
          />
        </div>

        <div className="w-full mt-6 text-sm text-end text-black flex flex-wrap justify-end gap-4">
          <a href="#" className="underline hover:text-gray-600">Terms of Use</a>{' '}
          <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
          <a href="#" className="underline hover:text-gray-600">Cookie Policy</a>{' '}
          <a href="#" className="underline hover:text-gray-600">Anti Bribery Policy</a>
        </div>
      </div>

    </div>




  );
}
