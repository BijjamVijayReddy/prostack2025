import React from "react";

interface KpiCardProps {
  label: string;
  value: number | string;
}

export const KpiCard = React.memo(function KpiCard({
  label,
  value,
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0E1628] p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
});
