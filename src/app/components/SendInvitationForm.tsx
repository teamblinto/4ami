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
    onInvitationSent(); // back to dashboard
  };

  return (
    <div className="flex-grow p-4 sm:p-6 w-full">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col lg:flex-row w-full gap-20">
        
        {/* Form Section */}
        <div className="w-full lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Send an Invitation</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Use this form to invite a business colleague or client to register and use the AMI website. 
            Upon completion, a unique Invitation Code will be sent to your invitee. After they register, 
            you will receive a notification email.
          </p>

          <form onSubmit={handleSubmit}>
            {/* First/Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input type="text" id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input type="text" id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
              </div>
            </div>

            {/* Title/Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
              </div>
              <div>
                <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
                  Company
                </label>
                <input type="text" id="company" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
              </div>
            </div>

            {/* Email */}
            <div className="mb-8">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
            </div>

            {/* Role/Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-4 mb-8">
              <div>
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  id="role"
                  style={{ height: '42px' }}
                  className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded focus:outline-none focus:border-gray-500"
                >
                  <option>Select One</option>
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>
              <div>
                <label htmlFor="source" className="block text-gray-700 text-sm font-bold mb-2">
                  Source
                </label>
                <p className="text-sm text-gray-500 mb-1">Where or how did we meet this person</p>
                <input type="text" id="source" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
              </div>
            </div>

            {/* Invitation Code */}
            <div className="mb-8">
              <label htmlFor="invitationCode" className="block text-gray-700 text-sm font-bold mb-2">
                Invitation Code
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={generateCode}
                  className="text-gray-800 font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-[200px]"
                >
                  Generate Code
                </button>
                <input
                  type="text"
                  id="invitationCode"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  value={invitationCode}
                  readOnly
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Send Invitation
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Image & Links */}
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4">
          <Image
            src="/invitation-img.png"
            alt="Dashboard Illustration"
            width={600}
            height={1000}
            className="max-w-full h-auto"
          />

          <div className="w-full mt-6 text-sm text-end flex flex-wrap justify-end gap-4">
            <a href="#" className="underline hover:text-gray-600">Terms of Use</a>{' '}
            <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
            <a href="#" className="underline hover:text-gray-600">Cookie Policy</a>{' '}
            <a href="#" className="underline hover:text-gray-600">Anti Bribery Policy</a>
          </div>
        </div>

      </div>
    </div>
  );
}
