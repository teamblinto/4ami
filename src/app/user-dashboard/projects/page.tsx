"use client";

import React, { useState } from "react";

export default function UserProjectsPage() {
  const [notificationRequired, setNotificationRequired] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("24 hours");

  const dropdownOptions = ["24 hours", "48 hours", "72 hours", "2 week", "Others"];

  return (
    <div className="space-y-6 text-custom-text">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-2">Manage and track your projects</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Project Information */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="project-id" className="block text-sm font-medium">Project ID</label>
              <input type="text" id="project-id" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="project-name" className="block text-sm font-medium">Project Name</label>
              <input type="text" id="project-name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium">Start Date</label>
              <input type="date" id="start-date" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
          </div>
        </div>

        {/* Equipment Details */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Equipment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium">Industry</label>
              <input type="text" id="industry" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="asset-class" className="block text-sm font-medium">Asset Class</label>
              <input type="text" id="asset-class" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="color" className="block text-sm font-medium">Color</label>
              <input type="text" id="color" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium">Model</label>
              <input type="text" id="model" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="length" className="block text-sm font-medium">Length</label>
              <input type="text" id="length" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium">Weight</label>
              <input type="text" id="weight" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium">Height</label>
              <input type="text" id="height" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="width" className="block text-sm font-medium">Width</label>
              <input type="text" id="width" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </div>
          </div>
        </div>

        {/* Transport Requirements */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transport Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium">Is the equipment operational?</label>
              <div className="mt-2 flex items-center space-x-4">
                <label className="inline-flex items-center"><input type="radio" name="operational" value="yes" className="form-radio text-red-600" /><span className="ml-2">Yes</span></label>
                <label className="inline-flex items-center"><input type="radio" name="operational" value="no" className="form-radio text-red-600" /><span className="ml-2">No</span></label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Are specialized trailers or permits required for pickup and drop-off location?</label>
              <div className="mt-2 flex items-center space-x-4">
                <label className="inline-flex items-center"><input type="radio" name="specialized" value="yes" className="form-radio text-red-600" /><span className="ml-2">Yes</span></label>
                <label className="inline-flex items-center"><input type="radio" name="specialized" value="no" className="form-radio text-red-600" /><span className="ml-2">No</span></label>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">Notification required before pickup?</label>
              <div className="mt-2 flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="notification"
                    value="yes"
                    className="form-radio text-red-600"
                    checked={notificationRequired}
                    onChange={() => setNotificationRequired(true)}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="notification"
                    value="no"
                    className="form-radio text-red-600"
                    checked={!notificationRequired}
                    onChange={() => setNotificationRequired(false)}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {notificationRequired && (
                <div className="mt-2">
                  <button
                    type="button"
                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="block truncate">{selectedOption || "Notify me before"}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {dropdownOptions.map((option) => (
                        <li
                          key={option}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedOption(option);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className={`block truncate ${selectedOption === option ? "font-semibold" : "font-normal"}`}>
                            {selectedOption === option && (
                              <span className="text-red-600 absolute inset-y-0 left-0 flex items-center pl-1.5">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                            <span className="ml-6">{option}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pickup Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 pb-6 mb-6">
          {/* Pickup Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup Location</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="pickup-address1" className="block text-sm font-medium">Pickup Address</label>
                <input type="text" id="pickup-address1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="pickup-address2" className="block text-sm font-medium">Address Line 2 (Optional)</label>
                <input type="text" id="pickup-address2" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="pickup-city" className="block text-sm font-medium">City</label>
                  <input type="text" id="pickup-city" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="pickup-state" className="block text-sm font-medium">State</label>
                  <input type="text" id="pickup-state" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="pickup-zip" className="block text-sm font-medium">Zip Code (Optional)</label>
                  <input type="text" id="pickup-zip" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="pickup-hours" className="block text-sm font-medium">Hours of Business</label>
                <input type="text" id="pickup-hours" placeholder="e.g., Monday-Friday, 09:00 am - 05:00 pm" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </div>
          </div>
          {/* Pickup Contacts and Scheduling */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup Contacts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickup-phone1" className="block text-sm font-medium">Phone Number 1</label>
                <input type="text" id="pickup-phone1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="pickup-phone2" className="block text-sm font-medium">Phone Number 2 (Optional)</label>
                <input type="text" id="pickup-phone2" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="pickup-extension" className="block text-sm font-medium">Extension (Optional)</label>
                <input type="text" id="pickup-extension" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Pickup Scheduling</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickup-date" className="block text-sm font-medium">Preferred Date</label>
                <input type="date" id="pickup-date" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="pickup-time" className="block text-sm font-medium">Preferred Time</label>
                <input type="time" id="pickup-time" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="pickup-instructions" className="block text-sm font-medium">Special Instructions</label>
              <textarea id="pickup-instructions" rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center">
            <img
              src="/draganddrop.svg"
              alt="Drag and Drop"
              className="w-24 h-24 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Drag and Drop Your File Here!
            </h2>
            <p className="text-gray-600">
              Upload pictures, release confirmation, bill of lading, etc.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              A file maximum size should be 5MB
            </p>
            <button className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
              Import a file
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Drop-off Location
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="dropoff-address1"
                  className="block text-sm font-medium"
                >
                  Drop-off Address
                </label>
                <input
                  type="text"
                  id="dropoff-address1"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoff-address2"
                  className="block text-sm font-medium"
                >
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="dropoff-address2"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="dropoff-city"
                    className="block text-sm font-medium"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="dropoff-city"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dropoff-state"
                    className="block text-sm font-medium"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="dropoff-state"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dropoff-zip"
                    className="block text-sm font-medium"
                  >
                    Zip Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="dropoff-zip"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="dropoff-hours"
                  className="block text-sm font-medium"
                >
                  Hours of Business
                </label>
                <input
                  type="text"
                  id="dropoff-hours"
                  placeholder="e.g., Monday-Friday, 09:00 am - 05:00 pm"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Drop-off Contacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dropoff-phone1"
                  className="block text-sm font-medium"
                >
                  Phone Number 1
                </label>
                <input
                  type="text"
                  id="dropoff-phone1"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoff-phone2"
                  className="block text-sm font-medium"
                >
                  Phone Number 2 (Optional)
                </label>
                <input
                  type="text"
                  id="dropoff-phone2"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoff-extension"
                  className="block text-sm font-medium"
                >
                  Extension (Optional)
                </label>
                <input
                  type="text"
                  id="dropoff-extension"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
              Drop-off Scheduling
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dropoff-date"
                  className="block text-sm font-medium"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="dropoff-date"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoff-time"
                  className="block text-sm font-medium"
                >
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="dropoff-time"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="dropoff-notification"
                className="block text-sm font-medium"
              >
                Notification Required Drop-off
              </label>
              <select
                id="dropoff-notification"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option>Notify me before</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="dropoff-instructions"
                className="block text-sm font-medium"
              >
                Special Instructions
              </label>
              <textarea
                id="dropoff-instructions"
                rows={3}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
          </button>
          <button className="ml-4 px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Submit Transport Request
          </button>
        </div>
      </div>
    </div>
  );
}
