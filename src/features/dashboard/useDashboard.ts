"use client";

import { useEffect, useState } from "react";
import { fetchDashboardAnalytics } from "./dashboard.api";
import {
  DashboardAnalytics,
  MonthStats,
  YearlyData,
} from "./dashboard.types";

export function useDashboard() {
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // selected filters
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    fetchDashboardAnalytics().then((res) => {
      setData(res);

      const months = Object.keys(res.monthly).sort();
      const years = Object.keys(res.yearly).sort();

      setSelectedMonth(months[months.length - 1]);
      setSelectedYear(years[years.length - 1]);

      setLoading(false);
    });
  }, []);

  const availableMonths = data ? Object.keys(data.monthly).sort() : [];
  const availableYears = data ? Object.keys(data.yearly).sort() : [];

  const monthlyStats: MonthStats | undefined =
    data?.monthly[selectedMonth];

  const yearlyStats: YearlyData | undefined =
    data?.yearly[selectedYear];

  return {
    loading,

    // filters
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    availableMonths,
    availableYears,

    monthlyStats,
    yearlyStats,

    raw: data,
  };
}
