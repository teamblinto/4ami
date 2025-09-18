"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UserProfilePage() {
  const [nameData, setNameData] = useState({
    firstName: "Michael",
    lastName: "Adams"
  });

  const [formData, setFormData] = useState({
    firstName: "Michael",
    lastName: "Adams",
    email: "m.adams@gmail.com",
    department: "",
    linkedin: "",
    companyName: "Evergreen Equipment Leasing",
    companyWebsite: "www.evergreenequipmentleasing.com",
    phoneNumber1: "",
    phoneNumber2: "",
    mobilePhone: "+(718) 234-5678"
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleNameChange = (field: string, value: string) => {
    setNameData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveName = () => {
    setFormData(prev => ({
      ...prev,
      firstName: nameData.firstName,
      lastName: nameData.lastName
    }));
    setIsEditingName(false);
    toast.success('Name updated successfully!');
  };

  const handleCancelName = () => {
    setNameData({
      firstName: formData.firstName,
      lastName: formData.lastName
    });
    setIsEditingName(false);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Profile</h1>
        <p className="text-gray-500">Dashboard / Profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - User Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-red-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Name Fields */}
              {isEditingName ? (
                <div className="w-full space-y-4 mb-4">
                  <input
                    type="text"
                    value={nameData.firstName}
                    onChange={(e) => handleNameChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={nameData.lastName}
                    onChange={(e) => handleNameChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Last Name"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveName}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelName}
                      className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-600 mb-4">{formData.email}</p>
                  
                  {/* Professional Information */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Job Title:</span> Senior Leasing Manager</p>
                    <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                    <p><span className="font-medium">Website:</span> {formData.companyWebsite}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            {!isEditingName && (
              <button
                onClick={handleEditProfile}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Edit Profile
              </button>
            )}

            {/* Personal Information List (when not editing name) */}
            {!isEditingName && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">First Name</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.firstName}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Name</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.lastName}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.email}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Department</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.department || "Not Set"}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">LinkedIn</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.linkedin || "Not Set"}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Company Name</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.companyName}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Company Website</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.companyWebsite}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Phone Number 1</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.phoneNumber1 || "Not Set"}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Phone Number 2</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.phoneNumber2 || "Not Set"}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mobile Phone</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{formData.mobilePhone}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Personal Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <p className="text-sm text-gray-600 mt-1">Update your personal details to keep your profile accurate and up to date</p>
            </div>

            {isEditingProfile ? (
              /* Editable Form */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleFormChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleFormChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email*
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleFormChange('department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter department"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => handleFormChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter LinkedIn profile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleFormChange('companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="text"
                      value={formData.companyWebsite}
                      onChange={(e) => handleFormChange('companyWebsite', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number 1
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber1}
                      onChange={(e) => handleFormChange('phoneNumber1', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number 2
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber2}
                      onChange={(e) => handleFormChange('phoneNumber2', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Phone*
                    </label>
                    <input
                      type="tel"
                      value={formData.mobilePhone}
                      onChange={(e) => handleFormChange('mobilePhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    onClick={handleCancelProfile}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* Display Mode */
              <div className="space-y-4">
                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">First Name</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.firstName}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Last Name</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.lastName}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Email</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.email}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Department</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.department || "Not Set"}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">LinkedIn</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.linkedin || "Not Set"}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Company Name</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.companyName}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Company Website</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.companyWebsite}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Phone Number 1</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.phoneNumber1 || "Not Set"}</span>
                  </div>
                </div>

                <div className="flex items-center py-3 border-b border-gray-100">
                  <div className="w-1/3">
                    <span className="text-gray-600">Phone Number 2</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.phoneNumber2 || "Not Set"}</span>
                  </div>
                </div>

                <div className="flex items-center py-3">
                  <div className="w-1/3">
                    <span className="text-gray-600">Mobile Phone</span>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-gray-900">|</span>
                  </div>
                  <div className="w-1/3">
                    <span className="text-gray-900">{formData.mobilePhone}</span>
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
