// app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChartAreaInteractive } from '@/components/AreaChart';

type LoadData = {
  date: string;
  load1: number;
  load5: number;
};



export default function MetricsPage() {
  const [data, setData] = useState<LoadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/signin');
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/api/load-system-data/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (res.ok) {
          setData(json.data);
        } else {
          setError(json.detail || 'Failed to load system data');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Metrics</h1>
      <p>Here you’ll find live metrics from your servers or containers.</p>

      {loading ? (
        <p className="mt-6">Loading chart...</p>
      ) : error ? (
        <p className="mt-6 text-red-500">{error}</p>
      ) : (
        <ChartAreaInteractive data={data}  />
      )}
    </div>
  );
}
