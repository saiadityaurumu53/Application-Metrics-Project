'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setAuthError(true);
        return;
      }

      const res = await fetch('http://localhost:8000/api/protected/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setAuthError(true);
      }
    };

    fetchProtectedData();
  }, []);

  useEffect(() => {
    if (authError) {
      router.push('/signin');
    }
  }, [authError]);

  if (!data && !authError) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
  <main className="min-h-screen p-6 bg-gray-50">
    <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {data?.user?.username} 👋</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Section 1 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p><strong>Username:</strong> {data?.user?.username}</p>
        <p><strong>Email:</strong> {data?.user?.email}</p>
        <p><strong>Staff:</strong> {data?.user?.is_staff ? 'Yes' : 'No'}</p>
      </div>

      {/* Section 2 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Protected Message</h2>
        <p>{data?.message}</p>
      </div>
    </div>

    <div className="text-center mt-8">
      <LogoutButton />
    </div>
  </main>
);
}
