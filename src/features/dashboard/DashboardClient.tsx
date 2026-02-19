"use client";

import { KpiSection } from "./components/KpiSection";
import { DashboardCharts } from "./components/DashboardCharts";

export function DashboardClient() {
  return (
    <>
      <KpiSection />
      <DashboardCharts />
    </>
  );
}
