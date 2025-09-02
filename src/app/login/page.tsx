"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication logic for demonstration
    if (email === '4ami@gmail.com' && password === '4ami') {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/next.svg" alt="AMI Logo" width={100} height={40} style={{ width: 'auto', height: 'auto' }} /> {/* Replace with actual AMI logo */}
          <span className="ml-2 text-lg font-semibold">ASSET MANAGEMENT INTERNATIONAL</span>
        </div>
        <div className="text-sm">
          New to 4AMI? <Link href="#" className="text-red-500 hover:underline">Sign Up</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
          {/* Left Section - Login Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-2">Log In</h2>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold">Welcome back!</span> Log in to access AMI's full suite of services designed to support your physical asset management needs.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="form-checkbox mr-2" />
                    Remember Password
                  </label>
                  <Link href="#" className="text-red-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>

          {/* Right Section - Image */}
          <div className="w-1/2 bg-gray-200 flex items-center justify-center p-4">
          <Image src="/window.svg" alt="Dashboard Illustration" width={400} height={300} /> {/* Replace with actual illustration */}
          </div>
        </div>
      </main>
    </div>
  );
}
