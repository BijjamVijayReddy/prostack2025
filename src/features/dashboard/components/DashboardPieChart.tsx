"use client";

import ReactECharts from "echarts-for-react";
import { useDashboard } from "../useDashboard";

export function DashboardPieChart() {
  const { monthlyStats, loading } = useDashboard();

  if (loading || !monthlyStats) return null;

  const option = {
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0,
      textStyle: { color: "#ccc" },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        label: { show: false },
        data: [
          { value: monthlyStats.joined, name: "Joined" },
          { value: monthlyStats.enquiry, name: "Enquiry" },
          { value: monthlyStats.walkIn, name: "Walk-in" }
        ],
      },
    ],
  };

  return (
    <div className="rounded-xl bg-[#0E1628] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Distribution
      </h3>
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
}
