'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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
    } else {
      setError(data.detail || 'Login failed');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
  <Card className="w-full max-w-md shadow-lg">
    <CardHeader>
      <CardTitle className="text-2xl text-center">Sign In</CardTitle>
    </CardHeader>
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-6"> {/* Increased spacing between sections */}
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </CardContent>
      <CardFooter  className="mt-4">
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </CardFooter>
    </form>
  </Card>
</main>

  );
}
