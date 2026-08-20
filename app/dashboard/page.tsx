import React from 'react';
import Sidebar from '../components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#11131a] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#11131a] p-6">
        {children}
      </main>
    </div>
  );
}