export interface KpiItem {
  id: string;
  label: string;
  value: string;
}

export interface DashboardData {
  kpis: KpiItem[];
}

export interface MonthStats {
  joined: number;
  enquiry: number;
  walkIn: number;
  paidAmount: number;
  daily: number[];
}

export interface MonthlyData {
  [month: string]: MonthStats; 
}

export interface YearlyData {
  joined: number[];
  enquiry: number[];
  walkIn: number[];
  paidAmount: number[];
}

export interface DashboardAnalytics {
  monthly: MonthlyData;
  yearly: {
    [year: string]: YearlyData; 
  };
}

