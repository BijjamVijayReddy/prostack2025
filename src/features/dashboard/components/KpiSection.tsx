"use client";

import { useDashboard } from "../useDashboard";
import { KpiCard } from "./KpiCard";

export function KpiSection() {
  const { monthlyStats, loading } = useDashboard();

  if (loading || !monthlyStats) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard label="Joined" value={monthlyStats.joined} />
      <KpiCard label="Enquiries" value={monthlyStats.enquiry} />
      <KpiCard label="Walk-ins" value={monthlyStats.walkIn} />
      <KpiCard
        label="Paid Amount"
        value={`₹${monthlyStats.paidAmount.toLocaleString("en-IN")}`}
      />
    </div>
  );
}
