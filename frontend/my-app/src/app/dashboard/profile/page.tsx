'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
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
        setProfile(json.user); // Only extract user data
      } else {
        setAuthError(true);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (authError) {
      router.push('/signin');
    }
  }, [authError]);

  if (!profile && !authError) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <p className="text-lg"><strong>Username:</strong> {profile?.username}</p>
        </div>
        <div>
          <p className="text-lg"><strong>Email:</strong> {profile?.email}</p>
        </div>
        <div>
          <p className="text-lg"><strong>Staff:</strong> {profile?.is_staff ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
