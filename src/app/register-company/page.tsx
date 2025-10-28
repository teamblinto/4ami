'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProtectedRoute from '../components/ProtectedRoute';

export default function RegisterCompany() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    einTaxId: '',
    regionBranch: '',
    phone: '',
    companyTelephone: '',
    companySize: '',
    industry: '',
    website: '',
    note: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const [administrators, setAdministrators] = useState<Array<{ id: number; email: string }>>([]);

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAdministrator = () => {
    const trimmedEmail = (newAdminEmail || '').trim();
    if (!trimmedEmail) return;
    const newAdmin = { id: Date.now(), email: trimmedEmail };
    setAdministrators(prev => [...prev, newAdmin]);
    setNewAdminEmail('');
  };

  const saveAdministratorEmail = (id: number, rawEmail: string) => {
    const trimmed = (rawEmail || '').trim();
    setAdministrators(prev => prev.map(a => a.id === id ? { ...a, email: trimmed } : a));
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
    setShowRegisterModal(true);
  };

  const handleRegisterCompany = () => {
    setShowRegisterModal(false);
    // Stay on the same page (register-company)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the registration data strictly as backend expects
      const registrationData = {
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        einTaxId: String(formData.einTaxId || ''),
        regionBranch: formData.regionBranch,
        phone: formData.phone,
        mobile: formData.companyTelephone,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      };

      console.log('Sending company registration data:', registrationData);

      // Call the API endpoint
      const storedToken =
        (typeof window !== 'undefined' && (localStorage.getItem('authToken') || sessionStorage.getItem('authToken'))) || '';

      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: storedToken.startsWith('Bearer ') ? storedToken : `Bearer ${storedToken}` } : {}),
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      console.log('Company registration success:', result);
      try {
        localStorage.setItem('companyRegistered', 'true');
      } catch { }
      // Show success confirmation UI; user can click Continue to go to dashboard
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      // You can add toast notification here if needed
      // toast.error('Failed to register company. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="CUSTOMER_ADMIN">
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--Background, #FBFBFB)' }}>
        {/* Header */}
        <header className="px-12 py-4">
          <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4">
          {isSuccess ? (
            <div className="max-w-[803px] w-full">
              <div className="bg-white rounded-lg p-10 text-center shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-[#343A40] mb-1">Company Registered Successfully!</h2>
                <p className="text-sm text-[#6C757D] mb-6">Your company has been registered successfully.</p>
                <button
                  onClick={() => router.push('/company-admin')}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-[803px] w-full">
              {/* Main Content Card */}
              <div className=" ">
                {/* Header */}
                <div className="text-start mb-8">
                  <h1 className="text-2xl font-semibold  text-[#343A40] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Register Your Company
                  </h1>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Add your company details to start using your dashboard and invite team members
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-8">
                  {/* Company Details Section */}
                  <div className="space-y-4">





                    {/* Row 1: Company Name & EIN/Tax ID */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="companyName" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Company Name <samp className='text-[#6C757D] text-sm  '>(Full Legal Name)</samp>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>

                      {/* Row 2: Company Email */}
                      <div>
                        <label htmlFor="companyEmail" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Company Email
                        </label>
                        <input
                          type="email"
                          id="companyEmail"
                          name="companyEmail"
                          value={formData.companyEmail}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>




                    </div>
                    {/* here */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                      <div>
                        <label htmlFor="einTaxId" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          EIN/Tax ID
                        </label>
                        <input
                          type="text"
                          id="einTaxId"
                          name="einTaxId"
                          value={formData.einTaxId}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                      {/* Row 3: Region/Branch (Optional) */}
                      <div>
                        <label htmlFor="regionBranch" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Region/Branch (Optional)
                        </label>
                        <input
                          type="text"
                          id="regionBranch"
                          name="regionBranch"
                          value={formData.regionBranch}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-md focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>


                    </div>
                    <h2 className='text-[#343A40] font-semibold text-lg' >Address of headquarter</h2>
                    {/* Row 4: Phone & Mobile */}

                    {/* Row 5: Address 1 & Address 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="address1" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Address 1
                        </label>
                        <input
                          type="text"
                          id="address1"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="address2" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Address 2
                        </label>
                        <input
                          type="text"
                          id="address2"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Row 6: City & State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Row 7: ZIP & Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zip" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          ZIP
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Phone
                        </label>
                        <div className="flex">
                          <div className="flex items-center px-2 py-2 border-r-0 rounded-l-[8px] bg-[#FBFBFB]" style={{ border: '1px solid var(--Neutral-400, #CED4DA)' }}>
                            <span className="text-sm text-[#343A40]">🇺🇸</span>
                            <select className="ml-2 cursor-pointer bg-transparent border-none outline-none text-sm text-[#343A40]">
                              <option value="+1">+1</option>
                            </select>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-r-[8px] focus:border-transparent"
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              border: '1px solid var(--Neutral-400, #CED4DA)'
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="companyTelephone" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Company Telephone
                        </label>
                        <input
                          type="tel"
                          id="companyTelephone"
                          name="companyTelephone"
                          value={formData.companyTelephone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>

                      {/* Company Size & Industry */}
                      <div>
                        <label htmlFor="companySize" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Company Size
                        </label>
                        <input
                          type="text"
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Industry
                        </label>
                        <input
                          type="text"
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>






                      {/* Website & Note */}
                      <div>
                        <label htmlFor="website" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Website
                        </label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="note" className="block text-[#343A40] mb-2" style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '500'
                        }}>
                          Note
                        </label>
                        <input
                          type="text"
                          id="note"
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#FBFBFB] text-[#343A40] rounded-[8px] focus:border-transparent"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid var(--Neutral-400, #CED4DA)'
                          }}
                        />
                      </div>



                    </div>

                  </div>

                  {/* System Administration Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#343A40] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                      System Administration
                    </h3>

                    {/* Administrators Table */}
                    <div className="bg-white rounded-md overflow-hidden" style={{ border: '1px solid var(--Neutral-400, #CED4DA)' }}>
                      <table className="min-w-full border-collapse">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left text-sm font-medium text-[#343A40] py-3 px-4 border-b border-[#CED4DA] border-r border-[#CED4DA]" style={{
                              fontFamily: 'Inter, sans-serif',
                              width: '70%'
                            }}>
                              Email
                            </th>
                            <th className="text-left text-sm font-medium text-[#343A40] py-3 px-4 border-b border-[#CED4DA]" style={{
                              fontFamily: 'Inter, sans-serif',
                              width: '30%'
                            }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Entry row for adding a new administrator */}
                          <tr className="bg-white">
                            <td className="py-3 px-4 border-b border-[#CED4DA] border-r border-[#CED4DA]" style={{ width: '70%' }}>
                              <div className="px-3 py-2 rounded-md bg-white border border-[#CED4DA]">
                                <input
                                  type="email"
                                  value={newAdminEmail}
                                  onChange={(e) => setNewAdminEmail(e.target.value)}
                                  placeholder="Email"
                                  className="w-full text-[#343A40] focus:outline-none"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b border-[#CED4DA]" style={{ width: '30%' }}>
                              <button
                                type="button"
                                onClick={addAdministrator}
                                className="flex cursor-pointer items-center gap-1 px-2 py-1 text-[#343A40] text-sm font-medium transition-colors"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                <span className="text-lg">+</span>
                                Add Administrator
                              </button>
                            </td>
                          </tr>

                          {/* Existing administrators list */}
                          {administrators.map((admin, index) => (
                            <tr key={admin.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="py-3 px-4 border-b border-[#CED4DA] border-r border-[#CED4DA]" style={{ width: '70%' }}>
                                <div className="px-3 py-2 rounded-md bg-white border border-[#CED4DA]">
                                  <input
                                    type="email"
                                    value={admin.email}
                                    onChange={(e) => saveAdministratorEmail(admin.id, e.target.value)}
                                    placeholder="Email"
                                    className="w-full text-[#343A40] focus:outline-none"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-4 border-b border-[#CED4DA]" style={{ width: '30%' }}>
                                <button
                                  type="button"
                                  onClick={() => removeAdministrator(admin.id)}
                                  className="flex cursor-pointer items-center gap-1 px-2 py-1 rounded text-sm text-[#343A40] font-medium transition-colors"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  <span>
                                    <Image src="/bin.svg" alt="Delete" width={12} height={12} />
                                  </span>
                                  Delete
                                </button>
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
                      className=" cursor-pointer bg-red-600 text-white px-8 py-[10px] rounded-[8px] hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {isLoading ? 'Registering...' : 'Register Company'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className=" cursor-pointer bg-white text-[#343A40] py-[10px] px-8 rounded-[8px] border border-[#CED4DA] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-[#E9ECEF] rounded-[8px] px-[70px] py-[40px] text-center max-w-[656px] w-full mx-4 shadow-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-[#343A40] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                Are you sure you want to cancel?
              </h3>
              <p className="text-[#6C757D] text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                You have unsaved changes. If you cancel now, your progress will be lost. Do you want to proceed?
              </p>
              <div className="flex gap-[24px] text-center justify-center">
                <button
                  onClick={handleStayOnPage}
                  className=" bg-red-600 cursor-pointer text-white py-[10px] px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  No, Stay
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className=" bg-white text-[#343A40] cursor-pointer  py-[10px] px-4 rounded-md border border-[#CED4DA] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Register Company Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-[#E9ECEF] rounded-[8px] px-[70px] py-[40px] text-center max-w-[656px] w-full mx-4 shadow-xl border border-gray-200">
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="">
                  <Image src="/worn.svg" alt="Warning" width={80} height={80} />

                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#343A40] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                Register Your Company
              </h3>
              <p className="text-[#6C757D] text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Register your company before start a project
              </p>

              <div className="flex justify-center">
                <button
                  onClick={handleRegisterCompany}
                  className="bg-red-600 text-white py-[10px] px-6 rounded-[8px] hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Register Company
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>

  );
}
