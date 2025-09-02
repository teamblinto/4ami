import Image from 'next/image';
import { useState } from 'react';

interface SendInvitationFormProps {
  onInvitationSent: () => void;
}

export default function SendInvitationForm({ onInvitationSent }: SendInvitationFormProps) {
  const [invitationCode, setInvitationCode] = useState('A7K3D');

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setInvitationCode(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Invitation Sent!');
    // Here you would typically send the form data to an API
    onInvitationSent(); // Go back to the dashboard view
  };

  return (
    <div className="flex-grow p-6">
      <h1 className="text-3xl font-bold mb-2">Send an Invitation</h1>
      <p className="text-gray-600 mb-6">
        Use this form to invite a business colleague or client to register and use the AMI website. Upon completion, a unique Invitation Code will be sent to your invitee. After they register, you will receive a notification email.
      </p>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input type="text" id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input type="text" id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
                Company
              </label>
              <input type="text" id="company" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input type="text" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <label htmlFor="extension" className="block text-gray-700 text-sm font-bold mb-2">
                Extension
              </label>
              <input type="text" id="extension" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-700 text-sm font-bold mb-2">
              Mobile
            </label>
            <input type="text" id="mobile" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="source" className="block text-gray-700 text-sm font-bold mb-2">
                Source
              </label>
              <p className="text-xs text-gray-500 mb-1">Where or how did we meet this person</p>
              <input type="text" id="source" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Select One</option>
                  <option>Admin</option>
                  <option>User</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="invitationCode" className="block text-gray-700 text-sm font-bold mb-2">
              Invitation Code
            </label>
            <div className="flex items-center space-x-2">
              <button type="button" onClick={generateCode} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Generate Code
              </button>
              <input type="text" id="invitationCode" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={invitationCode} readOnly />
            </div>
          </div>

          <div className="flex items-center justify-start space-x-4">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Invitation
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
