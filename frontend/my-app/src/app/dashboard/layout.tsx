'use client';

import Sidebar from '@/components/Sidebar'; 
import Navbar from '@/components/Navbar'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
