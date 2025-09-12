'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterCompany() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    companyEmail: '',
    regionBranch: '',
    phone: '',
    mobile: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const [administrators, setAdministrators] = useState([
    { id: 1, email: 'michael@gmail.com' },
    { id: 2, email: 'scofield@gmail.com' }
  ]);

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAdministrator = () => {
    if (newAdminEmail.trim()) {
      const newAdmin = {
        id: Date.now(),
        email: newAdminEmail.trim()
      };
      setAdministrators(prev => [...prev, newAdmin]);
      setNewAdminEmail('');
    }
  };

  const removeAdministrator = (id: number) => {
    setAdministrators(prev => prev.filter(admin => admin.id !== id));
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleStayOnPage = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Company registration data:', { formData, administrators });
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col">
      {/* Header */}
      <header className="px-12 py-4">
        <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Main Content Card */}
          <div className="bg-white rounded-lg p-8  ">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Register Your Company
              </h1>
              <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Add your company details to start using your dashboard and invite team members
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#343A40] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Company Details
                </h3>
                
                {/* Row 1: Company Name & User Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      User Name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Row 2: Company Email */}
                <div>
                  <label htmlFor="companyEmail" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Company Email
                  </label>
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* Row 3: Region/Branch (Optional) */}
                <div>
                  <label htmlFor="regionBranch" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Region/Branch (Optional)
                  </label>
                  <input
                    type="text"
                    id="regionBranch"
                    name="regionBranch"
                    value={formData.regionBranch}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                {/* Row 4: Phone & Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Phone
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 border border-[#CED4DA] border-r-0 rounded-l-md bg-gray-50">
                        <span className="text-sm text-[#343A40]">🇺🇸</span>
                        <select className="ml-2 bg-transparent border-none outline-none text-sm text-[#343A40]">
                          <option value="+1">+1</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-[#CED4DA] rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Mobile
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Row 5: Address 1 & Address 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address1" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Address 1
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="address2" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Address 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Row 6: City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Row 7: ZIP & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ZIP
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#CED4DA] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* System Administration Section */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-[#343A40] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  System Administration
                </h3>

                {/* Administrators Table */}
                <div className="bg-white border border-[#CED4DA] rounded-md overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left text-sm font-medium text-[#343A40] py-3 px-4 border-b border-[#CED4DA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Email
                        </th>
                        <th className="text-left text-sm font-medium text-[#343A40] py-3 px-4 border-b border-[#CED4DA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {administrators.map((admin, index) => (
                        <tr key={admin.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-3 px-4 border-b border-[#CED4DA]">
                            <div className="px-3 py-2 border border-[#CED4DA] rounded-md bg-white">
                              <span className="text-[#343A40]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {admin.email}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-[#CED4DA]">
                            {admin.email === 'michael@gmail.com' ? (
                              <button
                                type="button"
                                onClick={addAdministrator}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                <span className="text-xs">+</span>
                                Add Administrator
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => removeAdministrator(admin.id)}
                                className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                <span className="text-xs">🗑️</span>
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isLoading ? 'Registering...' : 'Register Company'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="flex-1 bg-white text-[#343A40] py-3 px-4 rounded-md border border-[#CED4DA] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-[#343A40] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Are you sure you want to cancel?
            </h3>
            <p className="text-[#6C757D] text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              You have unsaved changes. If you cancel now, your progress will be lost. Do you want to proceed?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleStayOnPage}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                No, Stay
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-white text-[#343A40] py-2 px-4 rounded-md border border-[#CED4DA] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
