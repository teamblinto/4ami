import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SendInvitationFormProps {
  onInvitationSent: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  role: string;
  source: string;
}


export default function SendInvitationForm({ onInvitationSent }: SendInvitationFormProps) {
  const [invitationCode, setInvitationCode] = useState('A7K3D');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    email: '',
    role: '',
    source: ''
  });

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setInvitationCode(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data first
      if (!formData.firstName.trim()) {
        throw new Error('First Name is required');
      }
      if (!formData.lastName.trim()) {
        throw new Error('Last Name is required');
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Please enter a valid email address');
      }
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.company.trim()) {
        throw new Error('Company is required');
      }
      if (!formData.role.trim()) {
        throw new Error('Role is required');
      }
      if (!formData.source.trim()) {
        throw new Error('Source is required');
      }

      // Map role values to API expected values
      const roleMapping: Record<string, string> = {
        // 'Admin': 'ADMIN',
        'Customer Admin': 'CUSTOMER_ADMIN',
        // 'Company User': 'CUSTOMER_USER',
        // 'Appraiser': 'APPRAISER'
      };

      // Prepare invitation data for API (matching API requirements)
      const invitationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        // phone: '', // Empty phone field as required by API
        company: formData.company.trim(),
        role: roleMapping[formData.role] ,
        source: formData.source.trim(),
        invitationCode: invitationCode,
        // title: formData.title.trim(),
        // Removed 'title' field as API says it should not exist
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
      toast.success('Invitation sent successfully!');
      onInvitationSent(); // back to dashboard
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
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col lg:flex-row w-full gap-8 overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full lg:w-3/5 min-w-0 flex-shrink">

          <form onSubmit={handleSubmit}>
            {/* First/Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

            {/* Title/Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

            {/* Email */}
            <div className="mb-8">
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
                className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
              />
            </div>


            {/* Role/Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4 mb-8">
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
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded focus:outline-none focus:border-gray-500"
                >
                  <option value="">Select One</option>
                  {/* <option value="Admin">Admin</option> */}
                  <option value="Customer Admin">Customer Admin</option>
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
                  className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                />
              </div>
            </div>

            {/* Invitation Code */}
            <div className="mb-8">
              <label htmlFor="invitationCode" className="block text-gray-700 text-sm font-bold mb-2">
                Invitation Code
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={generateCode}
                  className="text-gray-800 font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-[200px]"
                >
                  Generate Code
                </button>
                <input
                  type="text"
                  id="invitationCode"
                  className="shadow appearance-none border rounded border-gray-300 bg-gray-50 w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
                className={`${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-700'
                } text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-auto flex items-center justify-center`}
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
                onClick={onInvitationSent}
                className="text-gray-800 font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Image & Links */}
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4 min-w-0">
          <Image
            src="/invitation-img.png"
            alt="Dashboard Illustration"
            width={400}
            height={800}
            className="w-full h-auto max-w-full max-h-[1000px] object-contain"
          />

          <div className="w-full mt-6 text-sm text-end flex flex-wrap justify-end gap-4">
            <a href="#" className="underline hover:text-gray-600">Terms of Use</a>{' '}
            <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
            <a href="#" className="underline hover:text-gray-600">Cookie Policy</a>{' '}
            <a href="#" className="underline hover:text-gray-600">Anti Bribery Policy</a>
          </div>
        </div>

      </div>
  );
}
