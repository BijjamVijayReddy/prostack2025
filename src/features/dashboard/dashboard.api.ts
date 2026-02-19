import data from "@/data/db.json";
import { DashboardAnalytics } from "./dashboard.types";

export async function fetchDashboardAnalytics(): Promise<DashboardAnalytics> {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  return data as DashboardAnalytics;
}
