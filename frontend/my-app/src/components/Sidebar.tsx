'use client';

import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">ServerMetrics</h2>
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className="hover:text-blue-300">Dashboard</Link>
        <Link href="/dashboard/profile" className="hover:text-blue-300">Profile</Link>
        <Link href="/dashboard/metrics" className="hover:text-blue-300">Metrics</Link>
        <Link href="/dashboard/settings" className="hover:text-blue-300">Settings</Link>
      </nav>
      <div className="mt-auto pt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
