"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchDashboardAnalytics } from "./dashboard.api";
import {
  DashboardAnalytics,
  MonthStats,
  YearlyData,
} from "./dashboard.types";

interface DashboardContextType {
  loading: boolean;

  selectedMonth: string;
  setSelectedMonth: (month: string) => void;

  selectedYear: string;
  setSelectedYear: (year: string) => void;

  availableMonths: string[];
  availableYears: string[];

  monthlyStats?: MonthStats;
  yearlyStats?: YearlyData;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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

  const monthlyStats = data?.monthly[selectedMonth];
  const yearlyStats = data?.yearly[selectedYear];

  return (
    <DashboardContext.Provider
      value={{
        loading,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        availableMonths,
        availableYears,
        monthlyStats,
        yearlyStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }
  return context;
}
