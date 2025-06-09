'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChartAreaInteractive } from '@/components/AreaChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

type LoadData = {
  date: string;
  load1: number;
  load5: number;
};

export default function MetricsPage() {
  const [data, setData] = useState<LoadData[]>([]);
  const [note, setNote] = useState('');
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
          setNote(json.note || '');
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
      <p className="mb-4 text-muted-foreground">
        Here you’ll find live metrics from your servers or containers.
      </p>

      {loading ? (
        <p className="mt-6">Loading chart...</p>
      ) : error ? (
        <p className="mt-6 text-red-500">{error}</p>
      ) : (
        <>
          <ChartAreaInteractive data={data} />

          {note && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System load Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown>{note}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
