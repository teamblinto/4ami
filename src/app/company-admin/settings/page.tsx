"use client";

import { useState } from 'react';
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'notification' | 'preference'>('account');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [accountData, setAccountData] = useState({
    firstName: 'Michael',
    lastName: 'Adams',
    username: 'm.adams@25',
    email: '',
    jobTitle: '',
    department: '',
    linkedin: '',
    phone1: '',
    phone2: 'Not Set',
    mobile: '',
    oldPassword: '',
    newPassword: '',
  });
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    projectSubmission: true,
    projectAssignedToReviewer: true,
    requiredMoreInformation: true,
    reviewCompletion: false,
    newCompanyOnboarded: true,
    suspiciousLoginAttempt: false,
    tokenDeductionFailed: true,
    tokenRefillRequestPending: true,
    systemMaintenanceScheduled: true,
    supportTicketUpdates: true,
  });

  // Preference settings state
  const [preferences, setPreferences] = useState({
    defaultLanguage: 'English',
    dateTimeFormat: 'mm/dd/yyyy',
    timezone: '(GMT-6) Chicago',
    textSize: 'Medium',
    loginAlerts: true,
    rememberDevice: true,
  });

  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: currentValue === 'Not Set' ? '' : currentValue });
  };

  const handleSave = (field: string) => {
    if (editValues[field] !== undefined) {
      setAccountData({ ...accountData, [field]: editValues[field] || 'Not Set' });
    }
    setEditingField(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValues({});
  };

  const handleProfileSave = () => {
    if (editValues.firstName !== undefined) {
      setAccountData({ ...accountData, firstName: editValues.firstName || accountData.firstName });
    }
    if (editValues.lastName !== undefined) {
      setAccountData({ ...accountData, lastName: editValues.lastName || accountData.lastName });
    }
    setIsProfileEditing(false);
    setEditValues({});
  };

  const handleProfileCancel = () => {
    setIsProfileEditing(false);
    setEditValues({});
  };

  const handleProfileEdit = () => {
    setIsProfileEditing(true);
    setEditValues({ firstName: accountData.firstName, lastName: accountData.lastName });
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Company Admin / Settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('account')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition-colors ${
                activeTab === 'account'
                  ? 'border-[#ED272C] text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab('notification')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition-colors ${
                activeTab === 'notification'
                  ? 'border-[#ED272C] text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Notification Settings
            </button>
            <button
              onClick={() => setActiveTab('preference')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition-colors ${
                activeTab === 'preference'
                  ? 'border-[#ED272C] text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Preference
            </button>
          </nav>
        </div>
      </div>

      {/* Account Settings Tab Content */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-[#F8F9FA] rounded-lg p-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-lg bg-[#ED272C] flex items-center justify-center relative overflow-hidden">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-opacity">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  {isProfileEditing ? (
                    <input
                      type="text"
                      value={editValues.firstName || accountData.firstName}
                      onChange={(e) => setEditValues({ ...editValues, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                      placeholder="Type your first name"
                    />
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-900">{accountData.firstName}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  {isProfileEditing ? (
                    <input
                      type="text"
                      value={editValues.lastName || accountData.lastName}
                      onChange={(e) => setEditValues({ ...editValues, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                      placeholder="Type your last name"
                    />
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-900">{accountData.lastName}</div>
                  )}
                </div>
                <div className="flex items-end gap-2">
                  {isProfileEditing ? (
                    <>
                      <button
                        onClick={handleProfileSave}
                        className="px-4 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleProfileCancel}
                        className="px-4 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleProfileEdit}
                      className="px-4 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="bg-[#F8F9FA] rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Information</h2>
            <div className="space-y-4">
              {/* Username - Read Only */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Username</div>
                  <div className="text-sm text-gray-900">{accountData.username}</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
                  {editingField === 'email' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={editValues.email || accountData.email}
                        onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                        placeholder="Type your email"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave('email')}
                        className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{accountData.email || 'Not Set'}</div>
                  )}
                </div>
                {editingField !== 'email' && (
                  <button
                    onClick={() => handleEdit('email', accountData.email)}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Job Title */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Job Title</div>
                  {editingField === 'jobTitle' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValues.jobTitle || accountData.jobTitle}
                        onChange={(e) => setEditValues({ ...editValues, jobTitle: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                        placeholder="Type your job title"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave('jobTitle')}
                        className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{accountData.jobTitle || 'Not Set'}</div>
                  )}
                </div>
                {editingField !== 'jobTitle' && (
                  <button
                    onClick={() => handleEdit('jobTitle', accountData.jobTitle)}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Department */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Department</div>
                  {editingField === 'department' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValues.department || accountData.department}
                        onChange={(e) => setEditValues({ ...editValues, department: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                        placeholder="Type your department"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave('department')}
                        className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{accountData.department || 'Not Set'}</div>
                  )}
                </div>
                {editingField !== 'department' && (
                  <button
                    onClick={() => handleEdit('department', accountData.department)}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">LinkedIn</div>
                  {editingField === 'linkedin' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValues.linkedin || accountData.linkedin}
                        onChange={(e) => setEditValues({ ...editValues, linkedin: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                        placeholder="Type your profile link"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave('linkedin')}
                        className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{accountData.linkedin || 'Not Set'}</div>
                  )}
                </div>
                {editingField !== 'linkedin' && (
                  <button
                    onClick={() => handleEdit('linkedin', accountData.linkedin)}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Phone 1 */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Phone 1</div>
                  {editingField === 'phone1' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValues.phone1 || accountData.phone1}
                        onChange={(e) => setEditValues({ ...editValues, phone1: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                        placeholder="Type phone number"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave('phone1')}
                        className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{accountData.phone1 || 'Not Set'}</div>
                  )}
                </div>
                {editingField !== 'phone1' && (
                  <button
                    onClick={() => handleEdit('phone1', accountData.phone1)}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Phone 2 */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Phone 2</div>
                  <div className="text-sm text-gray-900">{accountData.phone2}</div>
                </div>
                <button
                  onClick={() => handleEdit('phone2', accountData.phone2)}
                  className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* Mobile */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Mobile</div>
                  {editingField === 'mobile' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValues.mobile || accountData.mobile}
                        onChange={(e) => setEditValues({ ...editValues, mobile: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                        placeholder="Type your mobile number"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSave('mobile')}
                        className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">{accountData.mobile || 'Not Set'}</div>
                  )}
                </div>
                {editingField !== 'mobile' && (
                  <button
                    onClick={() => handleEdit('mobile', accountData.mobile)}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Password */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">Password</div>
                  {editingField === 'password' ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-600 mb-1">Old Password</label>
                          <input
                            type="password"
                            value={editValues.oldPassword || accountData.oldPassword}
                            onChange={(e) => setEditValues({ ...editValues, oldPassword: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                            placeholder="Enter old password"
                            autoFocus
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-600 mb-1">New Password</label>
                          <input
                            type="password"
                            value={editValues.newPassword || accountData.newPassword}
                            onChange={(e) => setEditValues({ ...editValues, newPassword: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ED272C] focus:border-transparent"
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSave('password')}
                          className="px-3 py-2 bg-[#ED272C] text-white rounded-md text-sm hover:bg-[#D11F24] cursor-pointer transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-2 border border-[#ED272C] text-gray-700 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">********</div>
                  )}
                </div>
                {editingField !== 'password' && (
                  <button
                    onClick={() => handleEdit('password', '')}
                    className="ml-4 px-3 py-1.5 text-[#ED272C] text-sm hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Tab Content */}
      {activeTab === 'notification' && (
        <div className="bg-[#F8F9FA] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
          
          <div className="space-y-8">
            {/* Project Notification */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Notification</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'projectSubmission',
                    title: 'Project Submission',
                    description: 'Receive notification when successfully submit a new project',
                  },
                  {
                    key: 'projectAssignedToReviewer',
                    title: 'Project Assigned to Reviewer',
                    description: 'Receive notification when a newly submitted project has been assigned to appraiser for valuation and review.',
                  },
                  {
                    key: 'requiredMoreInformation',
                    title: 'Required More Information',
                    description: 'Receive notification when reviewer needs additional details or clarification before continuing the analysis.',
                  },
                  {
                    key: 'reviewCompletion',
                    title: 'Review Completion',
                    description: 'Receive notification when project review is completed',
                  },
                ].map(({ key, title, description }) => (
                  <div key={key} className="flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ED272C] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED272C]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* User & Account Notification */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User & Account Notification</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'newCompanyOnboarded',
                    title: 'New Company Onboarded',
                    description: 'Receive notification when a new client company has been successfully onboarded and added to the 4AMI ecosystems.',
                  },
                  {
                    key: 'suspiciousLoginAttempt',
                    title: 'Suspicious Login Attempt',
                    description: 'Receive notification when a login attempt was made from an unusual device or location. Security verification recommended.',
                  },
                ].map(({ key, title, description }) => (
                  <div key={key} className="flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ED272C] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED272C]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Token & Usage Notifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Token & Usage Notifications</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'tokenDeductionFailed',
                    title: 'Token Deduction Failed',
                    description: 'Receive notification when system could not deduct tokens due to insufficient balance or billing system errors.',
                  },
                  {
                    key: 'tokenRefillRequestPending',
                    title: 'Token Refill Request Pending',
                    description: 'Receive notification when a company has requested more tokens. Requires 4AMI Admin approval',
                  },
                ].map(({ key, title, description }) => (
                  <div key={key} className="flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ED272C] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED272C]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* System & Support Notifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System & Support Notifications</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'systemMaintenanceScheduled',
                    title: 'System Maintenance Scheduled',
                    description: 'Receive notification on upcoming maintenance window that may temporarily limit platform access.',
                  },
                  {
                    key: 'supportTicketUpdates',
                    title: 'Support Ticket Updates',
                    description: 'Receive notification when your support issue has been successfully resolved and marked as completed',
                  },
                ].map(({ key, title, description }) => (
                  <div key={key} className="flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ED272C] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED272C]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preference Tab Content */}
      {activeTab === 'preference' && (
        <div className="bg-[#F8F9FA] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preferences</h2>
          
          <div className="space-y-8">
            {/* Language & Localization */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Localization</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'defaultLanguage',
                    label: 'Default language',
                    options: ['English', 'Spanish', 'French', 'German', 'Chinese'],
                  },
                  {
                    key: 'dateTimeFormat',
                    label: 'Date & time format',
                    options: ['mm/dd/yyyy', 'dd/mm/yyyy', 'yyyy-mm-dd', 'Month DD, YYYY'],
                  },
                  {
                    key: 'timezone',
                    label: 'Timezone',
                    options: ['(GMT-6) Chicago', '(GMT-5) New York', '(GMT-8) Los Angeles', '(GMT+0) London', '(GMT+1) Paris'],
                  },
                ].map(({ key, label, options }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen({ ...dropdownOpen, [key]: !dropdownOpen[key] })}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 hover:bg-gray-50 cursor-pointer min-w-[180px] justify-between"
                      >
                        <span>{preferences[key as keyof typeof preferences]}</span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen[key] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {dropdownOpen[key] && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setDropdownOpen({ ...dropdownOpen, [key]: false })}
                          ></div>
                          <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
                            {options.map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setPreferences({ ...preferences, [key]: option });
                                  setDropdownOpen({ ...dropdownOpen, [key]: false });
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 cursor-pointer first:rounded-t-md last:rounded-b-md"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessibility Preferences</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'textSize',
                    label: 'Text size',
                    options: ['Small', 'Medium', 'Large', 'Extra Large'],
                  },
                ].map(({ key, label, options }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen({ ...dropdownOpen, [key]: !dropdownOpen[key] })}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 hover:bg-gray-50 cursor-pointer min-w-[180px] justify-between"
                      >
                        <span>{preferences[key as keyof typeof preferences]}</span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen[key] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {dropdownOpen[key] && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setDropdownOpen({ ...dropdownOpen, [key]: false })}
                          ></div>
                          <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
                            {options.map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setPreferences({ ...preferences, [key]: option });
                                  setDropdownOpen({ ...dropdownOpen, [key]: false });
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 cursor-pointer first:rounded-t-md last:rounded-b-md"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Preferences</h3>
              <div className="space-y-4">
                {[
                  {
                    key: 'loginAlerts',
                    label: 'Login alerts',
                  },
                  {
                    key: 'rememberDevice',
                    label: 'Remember device',
                  },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[key as keyof typeof preferences] as boolean}
                        onChange={(e) =>
                          setPreferences({ ...preferences, [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ED272C] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ED272C]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

