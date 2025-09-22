"use client";

import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

interface ImportUsersProps {
  onBack?: () => void;
}

export default function ImportUsers({ onBack }: ImportUsersProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<Array<{
    username: string;
    fullName: string;
    role: string;
    email: string;
    phoneNumber: string;
  }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastShownRef = useRef(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setHasError(true);
        setErrorMessage('File size exceeds 5MB limit');
        setSelectedFile(file);
        return;
      }
      // Check if it's a CSV or JSON file
      if (file.type === 'text/csv' || file.name.endsWith('.csv') ||
        file.type === 'application/json' || file.name.endsWith('.json')) {
        setSelectedFile(file);
        setHasError(false);
        setErrorMessage('');
      } else {
        setHasError(true);
        setErrorMessage('The File Type is Wrong!');
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setHasError(true);
        setErrorMessage('File size exceeds 5MB limit');
        setSelectedFile(file);
        return;
      }
      // Check if it's a CSV or JSON file
      if (file.type === 'text/csv' || file.name.endsWith('.csv') ||
        file.type === 'application/json' || file.name.endsWith('.json')) {
        setSelectedFile(file);
        setHasError(false);
        setErrorMessage('');
      } else {
        setHasError(true);
        setErrorMessage('The File Type is Wrong!');
        setSelectedFile(file);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (selectedFile && !hasError) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsUploading(false);
              console.log('File uploaded:', selectedFile.name);
              
              // Generate preview data
              const mockPreviewData = [
                { username: 'michael55', fullName: 'Michael Adams', role: 'Admin', email: 'michael55@gmail.com', phoneNumber: '(212) 555-0198' },
                { username: 'Jaiden_Nixon@2025', fullName: 'Jaiden Nixon', role: 'User', email: 'jaiden.n@gmail.com', phoneNumber: '(310) 555-0243' },
                { username: 'ace.fo', fullName: 'Ace Foster', role: 'Admin', email: 'ace.fo@yahoo.com', phoneNumber: '(415) 555-0372' },
                { username: 'nikolai.schmidt', fullName: 'Nikolai Schmidt', role: 'User', email: 'nikolai.schmidt1964@outlook.com', phoneNumber: '(617) 555-0110' },
                { username: 'me.cc2', fullName: 'Clark Clayton', role: 'Admin', email: 'me@clayton.com', phoneNumber: '(702) 555-0824' },
                { username: 'Chen1997', fullName: 'Prince Chen', role: 'User', email: 'prince.chen1997@gmail.com', phoneNumber: '(305) 555-0660' },
                { username: 'Duran', fullName: 'Duran Reece', role: 'Admin', email: 'reece@yahoo.com', phoneNumber: '(503) 555-0951' },
                { username: 'anastasia.spring', fullName: 'Anastasia Spring', role: 'User', email: 'anastasia.spring@mcdaniel12.com', phoneNumber: '(718) 555-0345' },
                { username: 'Me.boyle', fullName: 'Matthew Boyle', role: 'Admin', email: 'Me.boyle@gmail.com', phoneNumber: '(917) 555-0789' }
              ];
              
              setPreviewData(mockPreviewData);
              setShowPreview(true);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleCancel = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFile(null);
    setHasError(false);
    setErrorMessage('');
    setShowPreview(false);
    setPreviewData([]);
    toastShownRef.current = false; // Reset toast flag
  };

  const handleStartImporting = () => {
    // Only show toast once
    if (!toastShownRef.current) {
      toast.success('Users imported successfully!', {
        style: {
          background: "#000",  // black background
          color: "#fff",       // white text
        },
        icon: null,           // remove the tick mark ✅
      });
      toastShownRef.current = true;
    }
    
    // After successful import, redirect back
    if (onBack) {
      onBack();
    }
  };

  const handleDiscardChanges = () => {
    setShowPreview(false);
    setPreviewData([]);
    setSelectedFile(null);
    setHasError(false);
    setErrorMessage('');
  };

  const handleEnterManually = () => {
    // Navigate to Add User form manually
    if (onBack) {
      onBack();
    }
  };

  const handleDownloadTemplate = () => {
    // Create a sample CSV template for users
    const csvContent = "Full Name,Role,Email,Phone Number\nJohn Doe,Admin,john.doe@company.com,+1234567890\nJane Smith,User,jane.smith@company.com,+1234567891";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Show uploading screen
  if (isUploading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Uploading Content */}
        <div className="bg-white rounded-lg p-12 text-center max-w-md mx-auto">
          {/* File Icon */}
          <div className="mb-6">
            <div className="w-16 h-20 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {/* File Name */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900">{selectedFile?.name}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">{uploadProgress}%</span>
            </div>
          </div>

          {/* Uploading Text */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900">Uploading..</p>
          </div>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Show preview table after upload
  if (showPreview) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Preview Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                    Username
                  </th>
                  <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                    Full Name
                  </th>
                  <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                    Role
                  </th>
                  <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                    E-Mail
                  </th>
                  <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                    Phone Number
                  </th>
                  <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((user, index) => {
                  const isStriped = index % 2 === 0;
                  return (
                    <tr key={index} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] font-medium border border-[#D0D5DD]">
                        {user.username}
                      </td>
                      <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                        {user.fullName}
                      </td>
                      <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                        {user.role}
                      </td>
                      <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                        {user.email}
                      </td>
                      <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                        {user.phoneNumber}
                      </td>
                      <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD]">
                        <button className="p-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                          <img src="/pencil.svg" alt="" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start items-center mt-6 space-x-4">
          <button
            onClick={handleStartImporting}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Start Importing
          </button>
          <button
            onClick={handleDiscardChanges}
            className="bg-white text-gray-700 px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            Discard Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Instructions Section */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-[#080607] mb-4">Instructions</h2>
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <p>1. Please ensure the file of the form includes the following fields in this order: <strong className="text-red-600">Full Name, Role, Email, Phone Number</strong></p>
          <p>2. Upload your completed file below</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-[#080607] mb-2">Use this template to easily import User data</p>
          <button
            onClick={handleDownloadTemplate}
            className="flex gap-2 underline items-center text-sm font-medium text-[#080607] cursor-pointer "
          >
            <img src="/arrow-drag.svg" alt="" />
            Download Pre-Mapped Template
          </button>
        </div>

        {/* Drag and Drop Area or Error State */}
        {hasError ? (
          <div className="text-center py-16">
            {/* File Info Box */}
            <div className="max-w-md mx-auto mb-6">
              <div className="border border-red-300 rounded-lg p-4 bg-red-50">
                <p className="text-sm font-medium text-red-600">{selectedFile?.name}</p>
                <p className="text-xs text-gray-500">{selectedFile ? Math.round(selectedFile.size / 1024) : 0} KB</p>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{errorMessage}</h3>
              <p className="text-sm text-gray-600 mb-2">Please upload JSON or CSV files</p>
              <p className="text-xs text-gray-500">A file maximum size should be 5MB</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBrowseClick}
                className="inline-flex items-center cursor-pointer px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                Import a File
              </button>
              <button
                onClick={handleEnterManually}
                className="inline-flex items-center px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium border border-gray-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Enter Manually
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-16 text-center transition-all duration-200 ${isDragOver
              ? 'border-red-400 bg-red-50'
              : selectedFile
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
              }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Cloud Upload Icon */}
            <div className='flex justify-center items-center'>
              <img src="/draganddrop.svg" alt="" />
            </div>
            {selectedFile ? (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">File Selected!</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">File size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Drag and Drop Your File Here!</h3>
                <p className="text-sm text-gray-600 mb-2">Please upload JSON or CSV files</p>
                <p className="text-xs text-gray-500">A file maximum size should be 5MB</p>
              </div>
            )}

            {/* Import Button */}
            {selectedFile ? (
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`inline-flex items-center px-6 py-2 rounded-md text-sm font-medium ${isUploading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                {isUploading ? 'Uploading...' : 'Import a File'}
              </button>
            ) : (
              <button
                onClick={handleBrowseClick}
                className="inline-flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                Import a File
              </button>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

      </div>
    </div>
  );
}
