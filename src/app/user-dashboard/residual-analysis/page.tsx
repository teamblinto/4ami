"use client";
import React from "react";

const ResidualAnalysisPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Residual Analysis
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Dashboard / Services / Create Residual Analysis
        </p>

        <form>
          {/* Project Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Project Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="project-id"
                  className="block text-sm font-medium text-gray-600"
                >
                  Project ID
                </label>
                <input
                  type="text"
                  id="project-id"
                  defaultValue="P1013492"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="project-name"
                  defaultValue="Burleson Sand Volvo A600 Water Truck"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-600"
                >
                  Start Date
                </label>
                <input
                  type="text"
                  id="start-date"
                  defaultValue="21/08/2025"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Client Name"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Client email"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Website"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Lease Phone"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Equipment Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Equipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Industry"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Asset class"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Make"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Model"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Year"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Current Meter Reading"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Meter Type"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Proposed Utilization"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Environment Ranking"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Financial Information
            </h2>
            <input
              type="text"
              placeholder="Subject Price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Meter Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Meter Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Current Meter"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Proposed Meter"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Meter Unit"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Lease Term */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Lease Term
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Terms (Months)"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Structure"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Application"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Environment"
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResidualAnalysisPage;
