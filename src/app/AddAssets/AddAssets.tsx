"use client";

import { useState } from 'react';

interface AddAssetsProps {
  onBack?: () => void;
}

export default function AddAssets({ onBack }: AddAssetsProps) {
  const [formData, setFormData] = useState({
    industry: 'Construction',
    subjectAssetType: 'Excavator',
    make: 'Volvo',
    model: 'A40G',
    length: '',
    width: '',
    height: '',
    weight: '',
    specialTransportationConsideration: '',
    yearOfManufacture: '2003'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    
    // After successful submission, go back to the list
    if (onBack) {
      onBack();
    }
  };

  const handleDiscardChanges = () => {
    setFormData({
      industry: 'Construction',
      subjectAssetType: 'Excavator',
      make: 'Volvo',
      model: 'A40G',
      length: '',
      width: '',
      height: '',
      weight: '',
      specialTransportationConsideration: '',
      yearOfManufacture: '2003'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Asset</h1>
            <p className="text-gray-500">Dashboard / Manage Assets / Add Asset Type</p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Bulk Import
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="Construction">Construction</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>

              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                />
              </div>

              {/* Length */}
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                  Length <span className="text-gray-400">(meter unit)</span>
                </label>
                <input
                  type="text"
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  placeholder=""
                />
              </div>

              {/* Width */}
              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
                  Width <span className="text-gray-400">(meter unit)</span>
                </label>
                <input
                  type="text"
                  id="width"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  placeholder=""
                />
              </div>

              {/* Special Transportation Consideration */}
              <div>
                <label htmlFor="specialTransportationConsideration" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Transportation Consideration <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="specialTransportationConsideration"
                  name="specialTransportationConsideration"
                  value={formData.specialTransportationConsideration}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  placeholder=""
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Subject Asset Type */}
              <div>
                <label htmlFor="subjectAssetType" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Asset Type
                </label>
                <select
                  id="subjectAssetType"
                  name="subjectAssetType"
                  value={formData.subjectAssetType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="Excavator">Excavator</option>
                  <option value="Bulldozer">Bulldozer</option>
                  <option value="Crane">Crane</option>
                  <option value="Forklift">Forklift</option>
                </select>
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                />
              </div>

              {/* Height */}
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height <span className="text-gray-400">(meter unit)</span>
                </label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  placeholder=""
                />
              </div>

              {/* Weight */}
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight <span className="text-gray-400">(pound unit)</span>
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  placeholder=""
                />
              </div>

              {/* Year of Manufacture */}
              <div>
                <label htmlFor="yearOfManufacture" className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Manufacture
                </label>
                <input
                  type="text"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md font-medium border border-gray-300"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md font-medium border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
