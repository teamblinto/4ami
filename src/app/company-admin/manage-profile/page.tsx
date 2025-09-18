"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CompanyAdminManageProfilePage() {
  const [activeTab, setActiveTab] = useState('company-info');
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyType: '',
    companySize: '',
    companyWebsite: '',
    companyDescription: '',
    
    // Address
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    stateProvince: '',
  });

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Robert Johnson',
      position: 'CFO',
      email: 'robert2@gmail.com',
      phone: '(415) 987-6543',
      department: 'Finance'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'CEO',
      email: 'jane.smith@gmail.com',
      phone: '(718) 234-5678',
      department: 'Technology'
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    toast.success('Company profile updated successfully!');
  };

  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: '',
      position: '',
      email: '',
      phone: '',
      department: ''
    };
    setContacts([...contacts, newContact]);
  };

  const handleEditContact = (id: number) => {
    toast.success('Edit contact functionality will be implemented');
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success('Contact deleted successfully');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Company Profile</h1>
        <p className="text-gray-500">Dashboard / Manage Profile / Company Profile</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('company-info')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'company-info'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Company Information
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'address'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Address
            </button>
            <button
              onClick={() => setActiveTab('key-contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'key-contacts'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Key Contacts
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Company Information Tab */}
          {activeTab === 'company-info' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Company Information</h2>
                <p className="text-sm text-gray-600">Basic details about your organizations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Type
                  </label>
                  <select
                    value={formData.companyType}
                    onChange={(e) => handleInputChange('companyType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select One</option>
                    <option value="corporation">Corporation</option>
                    <option value="llc">LLC</option>
                    <option value="partnership">Partnership</option>
                    <option value="sole-proprietorship">Sole Proprietorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select One</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  value={formData.companyDescription}
                  onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Describe your company..."
                />
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter address line 1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter address line 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select One</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province
                  </label>
                  <select
                    value={formData.stateProvince}
                    onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select One</option>
                    <option value="ca">California</option>
                    <option value="ny">New York</option>
                    <option value="tx">Texas</option>
                    <option value="fl">Florida</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Key Contacts Tab */}
          {activeTab === 'key-contacts' && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Key Contacts</h2>
                    <p className="text-sm text-gray-600">Primary points of contact for your organization.</p>
                  </div>
                  <button
                    onClick={handleAddContact}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    + Add Contact
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
                      <tr key={contact.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
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
                          <span className="text-gray-900">{contact.department}</span>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditContact(contact.id)}
                              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              <img src="/pencil.svg" alt="Edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              <img src="/bin.svg" alt="Delete" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-start">
        <button
          onClick={handleSaveChanges}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
