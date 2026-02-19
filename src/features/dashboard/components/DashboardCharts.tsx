"use client";

import { DashboardLineChart } from "./DashboardLineChart";
import { DashboardPieChart } from "./DashboardPieChart";

export function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Line / Bar Chart */}
      <div className="lg:col-span-2">
        <DashboardLineChart />
      </div>

      {/* Pie Chart */}
      <DashboardPieChart />
    </div>
  );
}
