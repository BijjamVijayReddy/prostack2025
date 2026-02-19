"use client";

import ReactECharts from "echarts-for-react";
import { useDashboard } from "../useDashboard";

export function DashboardLineChart() {
  const { monthlyStats, loading } = useDashboard();

  if (loading || !monthlyStats) return null;

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: monthlyStats.daily.map((_, i) => `Day ${i + 1}`),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        smooth: true,
        data: monthlyStats.daily,
      },
    ],
  };

  return (
    <div className="rounded-xl bg-[#0E1628] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Daily Trend
      </h3>
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
}
