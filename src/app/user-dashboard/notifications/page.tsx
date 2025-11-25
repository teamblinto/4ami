"use client";

import { useState } from 'react';
import Image from 'next/image';

interface Notification {
  id: string;
  title: string;
  date: string;
  avatar?: string;
  read?: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'There are pending service approvals that need your attention. Please review the service details to approve or reject',
      date: 'April 15, 2025',
      avatar: '/Display-Picture.svg',
    },
    {
      id: '2',
      title: 'The residual value analysis for [Asset Name] has been completed. Please review the results',
      date: 'April 15, 2025',
      avatar: '/Display-Picture.svg',
    },
    {
      id: '3',
      title: 'A new service request has been submitted. Review the request details to proceed',
      date: 'April 15, 2025',
      avatar: '/Display-Picture.svg',
    },
    {
      id: '4',
      title: 'A new user has registered on the platform. Please review their details and approve the account if necessary',
      date: 'March 20, 2025',
      avatar: '/Display-Picture.svg',
    },
    {
      id: '5',
      title: 'There are pending service approvals that need your attention. Please review the service details to approve or reject',
      date: 'April 13, 2025',
      avatar: '/Display-Picture.svg',
    },
    {
      id: '6',
      title: 'The residual value analysis for [Asset Name] has been completed. Please review the results',
      date: 'April 12, 2025',
      avatar: '/Display-Picture.svg',
    },
  ]);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const today = new Date();
  const todayDateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const todayNotifications = notifications.filter(n => n.date === todayDateString);
  const earlierNotifications = notifications.filter(n => n.date !== todayDateString);

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500 mt-1">User Dashboard / Notifications</p>
      </div>

      {/* Today Section */}
      {todayNotifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {todayNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={notification.avatar || '/Display-Picture.svg'}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </div>
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  aria-label="Dismiss notification"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earlier Section */}
      {earlierNotifications.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Earlier</h2>
          <div className="bg-white rounded-lg shadow-sm">
            {earlierNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={notification.avatar || '/Display-Picture.svg'}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </div>
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                  aria-label="Dismiss notification"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No notifications</p>
        </div>
      )}
    </div>
  );
}

