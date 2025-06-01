'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      alert('✅ Logged in successfully!');
      router.push('/dashboard');
      // You can navigate to a dashboard here
    } else {
      setError(data.detail || 'Login failed');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-semibold mb-6">Sign In</h2>
      <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Sign In
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
