'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setAuthError(true);
        return;
      }

      try {
        // Fetch user info from /api/protected/
        const userRes = await fetch('http://localhost:8000/api/protected/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userRes.ok) {
          const userJson = await userRes.json();
          setUser(userJson.user);
        } else {
          setAuthError(true);
          return;
        }

        // Fetch profile info from /api/profile/
        const profileRes = await fetch('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.ok) {
          const profileJson = await profileRes.json();
          setProfile(profileJson.profile || {});
        }
      } catch (error) {
        setAuthError(true);
      }
    };

    fetchUserAndProfile();
  }, []);

  useEffect(() => {
    if (authError) {
      router.push('/signin');
    }
  }, [authError, router]);

  if (!user && !authError) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {user?.username} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Section 1 - Django Auth User Info */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Account Info</h2>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Staff:</strong> {user?.is_staff ? 'Yes' : 'No'}</p>
        </div>

        {/* Section 2 - MongoDB Profile Info */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Profile Info</h2>
          <p><strong>Full Name:</strong> {profile?.full_name || ''}</p>
          <p><strong>Phone:</strong> {profile?.phone || ''}</p>
          <p><strong>Theme:</strong> {profile?.theme || ''}</p>
          <p><strong>Avatar URL:</strong> {profile?.avatar_url || ''}</p>
          <p><strong>Bio:</strong> {profile?.bio || ''}</p>
          <p><strong>Skills:</strong> {(profile?.skills || []).join(', ')}</p>
        </div>
      </div>
    </main>
  );
}
