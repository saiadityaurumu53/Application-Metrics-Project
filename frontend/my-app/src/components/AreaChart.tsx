"use client"

import * as React from "react";
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const chartData = [
  { date: "2025-04-01", load1: 2.13, load5: 3.87 },
  { date: "2025-04-02", load1: 1.75, load5: 2.94 },
  { date: "2025-04-03", load1: 3.45, load5: 4.61 },
  { date: "2025-04-04", load1: 0.98, load5: 1.56 },
  { date: "2025-04-05", load1: 4.12, load5: 5.01 },
  { date: "2025-04-06", load1: 2.78, load5: 3.39 },
  { date: "2025-04-07", load1: 3.66, load5: 4.42 },
  { date: "2025-04-08", load1: 1.24, load5: 2.31 },
  { date: "2025-04-09", load1: 2.59, load5: 3.77 },
  { date: "2025-04-10", load1: 3.01, load5: 4.55 },
  { date: "2025-04-11", load1: 2.93, load5: 4.28 },
  { date: "2025-04-12", load1: 3.76, load5: 4.79 },
  { date: "2025-04-13", load1: 2.15, load5: 3.63 },
  { date: "2025-04-14", load1: 1.88, load5: 2.92 },
  { date: "2025-04-15", load1: 3.41, load5: 4.89 },
  { date: "2025-04-16", load1: 4.04, load5: 5.42 },
  { date: "2025-04-17", load1: 2.32, load5: 3.74 },
  { date: "2025-04-18", load1: 1.95, load5: 3.26 },
  { date: "2025-04-19", load1: 2.75, load5: 3.67 },
  { date: "2025-04-20", load1: 1.63, load5: 2.54 },
  { date: "2025-04-21", load1: 3.11, load5: 4.23 },
  { date: "2025-04-22", load1: 2.48, load5: 3.59 },
  { date: "2025-04-23", load1: 3.34, load5: 4.62 },
  { date: "2025-04-24", load1: 4.55, load5: 5.33 },
  { date: "2025-04-25", load1: 2.91, load5: 3.85 },
  { date: "2025-04-26", load1: 1.07, load5: 1.92 },
  { date: "2025-04-27", load1: 4.03, load5: 5.17 },
  { date: "2025-04-28", load1: 2.16, load5: 3.14 },
  { date: "2025-04-29", load1: 3.67, load5: 4.48 },
  { date: "2025-04-30", load1: 4.74, load5: 5.69 },
  { date: "2024-05-01", load1: 2.33, load5: 3.72 },
  { date: "2024-05-02", load1: 3.81, load5: 4.96 },
  { date: "2024-05-03", load1: 2.65, load5: 3.77 },
  { date: "2024-05-04", load1: 4.05, load5: 5.38 },
  { date: "2024-05-05", load1: 4.92, load5: 5.71 },
  { date: "2024-05-06", load1: 4.97, load5: 5.89 },
  { date: "2024-05-07", load1: 3.72, load5: 4.43 },
  { date: "2024-05-08", load1: 2.08, load5: 3.26 },
  { date: "2024-05-09", load1: 2.54, load5: 3.68 },
  { date: "2024-05-10", load1: 3.47, load5: 4.62 },
  { date: "2024-05-11", load1: 3.88, load5: 4.35 },
  { date: "2024-05-12", load1: 2.12, load5: 3.17 },
  { date: "2024-05-13", load1: 2.09, load5: 2.96 },
  { date: "2024-05-14", load1: 4.34, load5: 5.27 },
  { date: "2024-05-15", load1: 4.77, load5: 5.36 },
  { date: "2024-05-16", load1: 3.29, load5: 4.91 },
  { date: "2024-05-17", load1: 5.00, load5: 5.89 },
  { date: "2024-05-18", load1: 3.39, load5: 4.72 },
  { date: "2024-05-19", load1: 2.56, load5: 3.28 },
  { date: "2024-05-20", load1: 2.03, load5: 2.97 },
  { date: "2024-05-21", load1: 1.44, load5: 2.13 },
  { date: "2024-05-22", load1: 1.25, load5: 1.78 },
  { date: "2024-05-23", load1: 3.15, load5: 4.01 },
  { date: "2024-05-24", load1: 3.92, load5: 4.35 },
  { date: "2024-05-25", load1: 2.33, load5: 3.55 },
  { date: "2024-05-26", load1: 2.79, load5: 3.04 },
  { date: "2024-05-27", load1: 4.37, load5: 5.47 },
  { date: "2024-05-28", load1: 3.06, load5: 3.97 },
  { date: "2024-05-29", load1: 1.17, load5: 2.28 },
  { date: "2024-05-30", load1: 3.67, load5: 4.65 },
  { date: "2024-05-31", load1: 2.11, load5: 3.45 },
  { date: "2024-06-01", load1: 2.08, load5: 3.24 },
  { date: "2024-06-02", load1: 4.89, load5: 5.23 },
  { date: "2024-06-03", load1: 1.64, load5: 2.74 },
  { date: "2024-06-04", load1: 4.51, load5: 5.16 },
  { date: "2024-06-05", load1: 1.03, load5: 1.93 },
  { date: "2024-06-06", load1: 3.79, load5: 4.12 },
  { date: "2024-06-07", load1: 4.12, load5: 4.88 },
  { date: "2024-06-08", load1: 4.23, load5: 4.75 },
  { date: "2024-06-09", load1: 4.71, load5: 5.68 },
  { date: "2024-06-10", load1: 2.25, load5: 3.04 },
  { date: "2024-06-11", load1: 1.49, load5: 2.21 },
  { date: "2024-06-12", load1: 4.94, load5: 5.41 },
  { date: "2024-06-13", load1: 1.25, load5: 2.03 },
  { date: "2024-06-14", load1: 4.33, load5: 4.96 },
  { date: "2024-06-15", load1: 3.28, load5: 4.32 },
  { date: "2024-06-16", load1: 3.94, load5: 4.22 },
  { date: "2024-06-17", load1: 4.81, load5: 5.63 },
  { date: "2024-06-18", load1: 1.59, load5: 2.76 },
  { date: "2024-06-19", load1: 3.12, load5: 4.03 },
  { date: "2024-06-20", load1: 4.55, load5: 5.14 },
  { date: "2024-06-21", load1: 2.08, load5: 3.23 },
  { date: "2024-06-22", load1: 3.66, load5: 4.51 },
  { date: "2024-06-23", load1: 4.98, load5: 5.82 },
  { date: "2024-06-24", load1: 1.77, load5: 2.88 },
  { date: "2024-06-25", load1: 1.84, load5: 2.95 },
  { date: "2024-06-26", load1: 4.47, load5: 5.11 },
  { date: "2024-06-27", load1: 4.63, load5: 5.38 },
  { date: "2024-06-28", load1: 1.93, load5: 3.06 },
  { date: "2024-06-29", load1: 1.64, load5: 2.83 },
  { date: "2024-06-30", load1: 4.52, load5: 5.17 }
];


type Props = {
  data: {
    date: string;
    load1: number;
    load5: number;
  }[];
};


// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig



// export function ChartAreaInteractive({ data }: Props) {
//   const [timeRange, setTimeRange] = React.useState("90d")

//   const filteredData = chartData.filter((item) => {
//     const date = new Date(item.date)
//     const referenceDate = new Date("2024-06-30")
//     let daysToSubtract = 90
//     if (timeRange === "30d") {
//       daysToSubtract = 30
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7
//     }
//     const startDate = new Date(referenceDate)
//     startDate.setDate(startDate.getDate() - daysToSubtract)
//     return date >= startDate
//   })

const chartConfig = {
  load1: {
    label: "Load 1m",
    color: "var(--color-desktop)",
  },
  load5: {
    label: "Load 5m",
    color: "var(--color-mobile)",
  },
};

export function ChartAreaInteractive({ data }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const sourceData = data && data.length > 0 ? data : chartData;

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date(); // today
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract);

    return sourceData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate;
    });
  }, [sourceData, timeRange]);


 return (
  <Card className="pt-0">
    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div className="grid flex-1 gap-1">
        <CardTitle>System CPU metrics</CardTitle>
        <CardDescription>
          Showing Aditya-CPU load metrics
        </CardDescription>
      </div>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger
          className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
          <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
          <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
                indicator="dot"
              />
            }
          />
          <Area
            dataKey="load5"
            type="natural"
            fill="url(#fillMobile)"
            stroke="var(--color-mobile)"
            stackId="a"
            name="Load 5m"
          />
          <Area
            dataKey="load1"
            type="natural"
            fill="url(#fillDesktop)"
            stroke="var(--color-desktop)"
            stackId="a"
            name="Load 1m"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
)};
