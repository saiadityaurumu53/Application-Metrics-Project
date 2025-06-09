'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome, {data?.user?.username} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Username:</strong> {data?.user?.username}
            </p>
            <p>
              <strong>Email:</strong> {data?.user?.email}
            </p>
            <p>
              <strong>Staff:</strong> {data?.user?.is_staff ? 'Yes' : 'No'}
            </p>
          </CardContent>
        </Card>

        {/* Protected Message Card */}
        <Card>
          <CardHeader>
            <CardTitle>Protected Message</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data?.message}</p>
          </CardContent>
        </Card>

        {/* Project Description Card */}
        {/* Project Description Card */}
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>About This Project</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-4">
            <p>
              This project is a full-stack, GitHub-style monitoring dashboard that visualizes system metrics like CPU load using interactive charts. It integrates InfluxDB Cloud to ingest real-time data from your machine via a Telegraf agent.
            </p>
            <p>
              The backend is powered by Django REST Framework with secure JWT-based authentication. The frontend is built with Next.js and styled using TailwindCSS and shadcn/ui components for a polished, developer-friendly UI.
            </p>
            <p>
              One key feature is AI-generated system insights: metrics are passed to Groq’s LLaMA model, which returns natural language summaries directly in the dashboard.
            </p>
            <p>
              <strong>Upcoming Features:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>Docker container metrics and health monitoring</li>
                <li>Kubernetes cluster integration</li>
                <li>Dark mode support</li>
                <li>AI-driven alerts and recommendations</li>
              </ul>
            </p>
            <p>
              This project is actively maintained as part of an InfluxDB Hackathon initiative and aims to provide a one-stop solution for cloud-native infrastructure monitoring.
            </p>
          </CardContent>
    </Card>


      </div>
    </div>
  );
}
