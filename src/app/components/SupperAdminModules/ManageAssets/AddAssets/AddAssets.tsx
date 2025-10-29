"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

interface AddAssetsProps {
  onBack?: () => void;
}

export default function AddAssets({ onBack }: AddAssetsProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'equipment',
    value: '',
    residualValue: '',
    status: '',
    brand: '',
    model: '',
    notes: '',
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
      const assetData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        value: parseFloat(formData.value) || 0,
        residualValue: parseFloat(formData.residualValue) || 0,
        status: formData.status,
        properties: {
          brand: formData.brand,
          model: formData.model
        },
        metadata: {
          notes: formData.notes
        },
        projectId: formData.projectId
      };

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
        description: '',
        type: 'equipment',
        value: '',
        residualValue: '',
        status: '',
        brand: '',
        model: '',
        notes: '',
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
      description: '',
      type: 'equipment',
      value: '',
      residualValue: '',
      status: '',
      brand: '',
      model: '',
      notes: '',
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
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-[8px] text-sm font-medium flex items-center gap-2 cursor-pointer">
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
              {/* Asset Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#343A40] mb-2">
                  Asset Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                  placeholder="e.g., Laptop Computer"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                  placeholder="e.g., Dell Latitude 5520"
                />
              </div>

              {/* Asset Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                >
                  <option value="equipment">Equipment</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="furniture">Furniture</option>
                  <option value="technology">Technology</option>
                  <option value="machinery">Machinery</option>
                </select>
              </div>

              {/* Value and Residual Value Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Value */}
                <div>
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                    Value ($) *
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                    placeholder="1500"
                  />
                </div>

                {/* Residual Value */}
                <div>
                  <label htmlFor="residualValue" className="block text-sm font-medium text-gray-700 mb-2">
                    Residual Value ($) *
                  </label>
                  <input
                    type="number"
                    id="residualValue"
                    name="residualValue"
                    value={formData.residualValue}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                    placeholder="300"
                  />
                </div>
              </div>

              {/* Project ID */}
              <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-2">
                  Project ID *
                </label>
                <input
                  type="text"
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                  placeholder="123e4567-e89b-12d3-a456-426614174000"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                  placeholder="e.g., Dell"
                />
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
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                  placeholder="e.g., Latitude 5520"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#CED4DA] text-[#343A40] bg-[#FBFBFB] rounded-md focus:outline-none placeholder:text-[#343A40]"
                  placeholder="e.g., Company laptop"
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
