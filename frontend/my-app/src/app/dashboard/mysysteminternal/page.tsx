'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function SystemInternalMetricsPage() {
  const [data, setData] = useState([]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setAuthError(true);
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/api/load-internal-system/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json.metrics);
        setNote(json.note);
      } catch (err) {
        console.error(err);
        setAuthError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (authError) router.push('/signin');
  }, [authError, router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>System Internal Load Metrics</CardTitle>
        <CardDescription>{note}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={(tick) => tick.split('T')[1]} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="load1"
              stroke="#8884d8"
              fill="#8884d8"
              name="User Load (1m)"
            />
            <Area
              type="monotone"
              dataKey="load5"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="System Load (5m)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
