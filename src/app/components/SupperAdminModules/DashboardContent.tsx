"use client";

import React from 'react';
import Link from 'next/link';

// --- MOCK DATA ---
const statsData = [
  { title: 'Pending Requests', value: '10', change: 'Requests awaiting approval', changeColor: 'text-red-600', icon: '📋' },
  { title: 'Users', value: '52', change: '↑ 12.5% from last month', changeColor: 'text-green-600', icon: '👥' },
  { title: 'Ongoing Projects', value: '20', change: 'Services currently enabled', changeColor: 'text-gray-500', icon: '🚧' },
  { title: 'Completed Project', value: '30', change: '↓ 5% from last month', changeColor: 'text-red-500', icon: '✔️' },
];

const projectsData = [
    { id: 'P101', name: 'Residual Analysis', time: '12 June - 25 June', status: 'Completed' },
    { id: 'P102', name: 'Comparative Analysis', time: '11 June - 22 June', status: 'Completed' },
    { id: 'P103', name: 'Transportation Quotation', time: '25 July - 12 August', status: 'In Process' },
];

const activityData = [  
    { user: 'Emma Johnson', action: 'Created new analysis report', date: '28 April, 2025' },
    { user: 'John Smith', action: 'Updated service pricing', date: '18 April, 2025' },
    { user: 'David Chen', action: 'Added new role permissions', date: '15 April, 2025' },
    { user: 'Sarah Wilson', action: 'Created new user account', date: '12 April, 2025' },
];

const quickActionsData = [
    { title: 'Add New User', subtitle: 'Text need to change', icon: '👤' },
    { title: 'Generate Test', subtitle: 'Create a new service offering', icon: '🔬' },
    { title: 'Add New asset', subtitle: '', icon: '+' },
];


// --- HELPER FUNCTIONS & PROPS ---
interface DashboardContentProps {
  setActiveContent: (content: string) => void;
}

const getStatusClass = (status: string) => {
    return status === 'Completed' 
        ? 'border border-red-200 bg-red-50 text-red-600' 
        : 'border border-gray-300 bg-white text-gray-600';
};


// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, change, changeColor, icon }: typeof statsData[0]) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
        <div>
            <div className="text-sm text-gray-500 flex items-center">{title} {title === 'Pending Requests' && <span className="ml-1 text-xs">▼</span>}</div>
            <div className="text-2xl font-bold text-[#080607]">{value}</div>
            <div className={`text-xs font-semibold ${changeColor}`}>{change}</div>
        </div>
        <div className="text-2xl bg-gray-100 p-2 rounded-md">{icon}</div>
    </div>
);

const ProjectsTable = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Projects</h3>
            <Link href="#" className="text-red-500 hover:underline text-sm font-semibold">View All</Link>
        </div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
                <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
                    <option>ProjectID All</option>
                </select>
                <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
                    <option>Status All</option>
                </select>
                <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-1">
                    <span className="text-[10px]">▼</span>
                    Add Filter
                </button>
                <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600">
                    Clear Filter
                </button>
                <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-1">
                    Edit Column
                    <span className="text-[10px]">▼</span>
                </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-500">Rows per page:</span>
                <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-0 border-t border-gray-200">
                <thead>
                    <tr className="bg-white">
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200 border-l border-r">Project ID</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200 border-r">Project</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200 border-r">Time (Month to Date)</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200 border-r">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsData.map((project, index) => {
                        const isStriped = index % 2 === 0;
                        return (
                            <tr key={project.id} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                                <td className="p-3 text-gray-800 font-medium border-b border-gray-200 border-l border-r">{project.id}</td>
                                <td className="p-3 text-gray-800 border-b border-gray-200 border-r">{project.name}</td>
                                <td className="p-3 text-gray-800 border-b border-gray-200 border-r">{project.time}</td>
                                <td className="p-3 border-b border-gray-200 border-r">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(project.status)}`}>{project.status}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

const RecentActivity = () => (
    <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <Link href="#" className="text-red-500 text-sm font-semibold inline-block">View All</Link>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-0 border border-gray-200 rounded-md">
                <thead>
                    <tr className="bg-white">
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200 border-r">User</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200 border-r">Action</th>
                        <th className="p-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {activityData.map((activity, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="p-3 whitespace-nowrap text-gray-800 border-b border-gray-200 border-r">{activity.user}</td>
                            <td className="p-3 whitespace-nowrap text-gray-800 border-b border-gray-200 border-r">{activity.action}</td>
                            <td className="p-3 whitespace-nowrap text-gray-500 border-b border-gray-200">{activity.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const QuickActions = ({ setActiveContent }: DashboardContentProps) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <ul>
            {quickActionsData.map((action, index) => (
                <li key={index} className="mb-3">
                    <button className="w-full flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-full mr-3 text-lg flex items-center justify-center w-8 h-8 ${
                            action.title === 'Add New asset' ? 'bg-red-500 text-white' : 'bg-gray-200'
                        }`}>
                           {action.icon}
                        </div>
                        <div className="text-left">
                            <div className="font-semibold">{action.title}</div>
                            {action.subtitle && <div className="text-sm text-gray-500">{action.subtitle}</div>}
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    </div>
);


// --- MAIN COMPONENT ---

export default function DashboardContent({ setActiveContent }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>
      
      <ProjectsTable />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity />
        <QuickActions setActiveContent={setActiveContent} />
      </div>
    </div>
  );
}
