"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

interface AddAssetsProps {
  onBack?: () => void;
}

interface AssetProperties {
  brand?: string;
  model?: string;
  length?: string;
  width?: string;
  height?: string;
  weight?: string;
  yearOfManufacture?: string;
}

interface AssetMetadata {
  notes?: string;
}

interface AssetPayload {
  name: string;
  type: string;
  description?: string;
  value?: number;
  residualValue?: number;
  status?: string;
  properties?: AssetProperties;
  metadata?: AssetMetadata;
  projectId?: string;
}

export default function AddAssets({ onBack }: AddAssetsProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: 'equipment',
    description: '',
    value: '',
    residualValue: '',
    status: '',
    industry: '',
    industryTag: '',
    assetType: '',
    assetTypeTag: '',
    make: '',
    model: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    yearOfManufacture: '',
    specialTransportationConsideration: '',
    projectId: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAsIndustry = () => {
    if (formData.industry.trim()) {
      setFormData(prev => ({
        ...prev,
        industryTag: prev.industry,
        industry: ''
      }));
      toast.success('Industry added successfully!');
    }
  };

  const handleAddAsAssetType = () => {
    if (formData.assetType.trim()) {
      setFormData(prev => ({
        ...prev,
        assetTypeTag: prev.assetType,
        assetType: ''
      }));
      toast.success('Asset type added successfully!');
    }
  };

  const handleAddAsMake = () => {
    if (formData.make.trim()) {
      toast.success('Make added successfully!');
      // You can add logic here to save to database if needed
    }
  };

  const handleAddAsModel = () => {
    if (formData.model.trim()) {
      toast.success('Model added successfully!');
      // You can add logic here to save to database if needed
    }
  };

  const handleRemoveIndustryTag = () => {
    setFormData(prev => ({
      ...prev,
      industryTag: ''
    }));
  };

  const handleRemoveAssetTypeTag = () => {
    setFormData(prev => ({
      ...prev,
      assetTypeTag: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authToken = localStorage.getItem('authToken');
      console.log('Auth token found:', authToken ? 'Yes' : 'No');
      console.log('Auth token value:', authToken);

      if (!authToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Prepare the data according to the API structure
      const assetData: AssetPayload = {
        name: formData.assetTypeTag || formData.assetType || 'Asset',
        type: formData.type
      };

      // Add optional fields only if they have values
      if (formData.description) {
        assetData.description = formData.description;
      }
      if (formData.value) {
        assetData.value = parseFloat(formData.value);
      }
      if (formData.residualValue) {
        assetData.residualValue = parseFloat(formData.residualValue);
      }
      if (formData.status) {
        assetData.status = formData.status;
      }
      if (formData.projectId) {
        assetData.projectId = formData.projectId;
      }

      // Build properties object if any property fields have values
      const properties: AssetProperties = {};
      if (formData.make) properties.brand = formData.make;
      if (formData.model) properties.model = formData.model;
      if (formData.length) properties.length = formData.length;
      if (formData.width) properties.width = formData.width;
      if (formData.height) properties.height = formData.height;
      if (formData.weight) properties.weight = formData.weight;
      if (formData.yearOfManufacture) properties.yearOfManufacture = formData.yearOfManufacture;

      if (Object.keys(properties).length > 0) {
        assetData.properties = properties;
      }

      // Build metadata object if notes field has value
      if (formData.specialTransportationConsideration) {
        assetData.metadata = {
          notes: formData.specialTransportationConsideration
        };
      }

      console.log('Submitting asset data:', assetData);

      const headers = getAuthHeaders(authToken);
      console.log('Request headers:', headers);

      const response = await fetch(getApiUrl('/assets'), {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(assetData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create asset');
      }

      const result = await response.json();
      console.log('Asset created successfully:', result);

      toast.success('Asset created successfully!');

      // Reset form
      setFormData({
        name: '',
        type: 'equipment',
        description: '',
        value: '',
        residualValue: '',
        status: '',
        industry: '',
        industryTag: '',
        assetType: '',
        assetTypeTag: '',
        make: '',
        model: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        yearOfManufacture: '',
        specialTransportationConsideration: '',
        projectId: ''
      });

      // After successful submission, go back to the list
      if (onBack) {
        onBack();
      }
    } catch (error) {
      console.error('Error creating asset:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create asset');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscardChanges = () => {
    setFormData({
      name: '',
      type: 'equipment',
      description: '',
      value: '',
      residualValue: '',
      status: '',
      industry: '',
      industryTag: '',
      assetType: '',
      assetTypeTag: '',
      make: '',
      model: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      yearOfManufacture: '',
      specialTransportationConsideration: '',
      projectId: ''
    });
    toast.success('Changes discarded successfully!');
  };

  return (
    <div className="max-w-6xl ">


      {/* Form Container */}
      <div className="bg-white  rounded-[8px] p-8">
        {/* Top Right Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => router.push('/dashboard/manage-assets/import')}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-[8px] text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Bulk Import
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-[#343A40] mb-2">
                  Industry
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    {formData.industryTag ? (
                      <div className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md flex items-center justify-between">
                        <span>{formData.industryTag}</span>
                        <button
                          type="button"
                          onClick={handleRemoveIndustryTag}
                          className="text-gray-500 hover:text-gray-700 ml-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                        placeholder="If typed industry is not available in database"
                      />
                    )}
                  </div>

                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddAsIndustry}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add as Industry
                  </button>
                </div>
              </div>

              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-[#343A40] mb-2">
                  Make
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                    placeholder="If typed make is not available in database"
                  />
  
                </div>
                <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={handleAddAsMake}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add as Make
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Length */}
                <div>
                  <label htmlFor="length" className="block text-sm font-medium text-[#343A40] mb-2">
                    Length (meter unit)
                  </label>
                  <input
                    type="text"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>
                {/* Width */}
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-[#343A40] mb-2">
                    Width (meter unit)
                  </label>
                  <input
                    type="text"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>
              </div>

              {/* Special Transportation Consideration */}
              <div>
                <label htmlFor="specialTransportationConsideration" className="block text-sm font-medium text-[#343A40] mb-2">
                  Special Transportation Consideration <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="specialTransportationConsideration"
                  name="specialTransportationConsideration"
                  value={formData.specialTransportationConsideration}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Subject Asset Type */}
              <div>
                <label htmlFor="assetType" className="block text-sm font-medium text-[#343A40] mb-2">
                  Subject Asset Type
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    {formData.assetTypeTag ? (
                      <div className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md flex items-center justify-between">
                        <span>{formData.assetTypeTag}</span>
                        <button
                          type="button"
                          onClick={handleRemoveAssetTypeTag}
                          className="text-gray-500 hover:text-gray-700 ml-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        id="assetType"
                        name="assetType"
                        value={formData.assetType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                        placeholder="If typed asset type is not available in database"
                      />
                    )}
                  </div>

                </div>
                <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={handleAddAsAssetType}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add as Asset Type
                  </button>
                </div>
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-[#343A40] mb-2">
                  Model
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                    placeholder="If typed model is not available in database"
                  />

                </div>
                <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={handleAddAsModel}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    + Add as Model
                  </button>
                </div>
              </div>



              <div className="grid grid-cols-2 gap-4">
                {/* Height */}
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-[#343A40] mb-2">
                    Height (meter unit)
                  </label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-[#343A40] mb-2">
                    Weight (pound unit)
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                  />
                </div>

              </div>
              {/* Year of Manufacture */}
              <div>
                <label htmlFor="yearOfManufacture" className="block text-sm font-medium text-[#343A40] mb-2">
                  Year of Manufacture
                </label>
                <input
                  type="text"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#6C757D]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-2 rounded-md font-medium border border-[#6C757D] cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-[#080607] px-4 py-2 rounded-md font-medium border border-[#6C757D] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
