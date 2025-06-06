// components/GraphWidget.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

type GraphWidgetProps = {
  title: string;
  data: { timestamp: string; value: number }[];
};

export default function GraphWidget({ title, data }: GraphWidgetProps) {
  return (
    <Card className="w-full h-96">
      <CardContent className="h-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}