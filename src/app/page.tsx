"use client";

import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardClient } from "@/features/dashboard/DashboardClient";
import { StudentsClient } from "@/features/students/StudentsClient";
import { useLayout } from "@/components/layout/LayoutContext";

export default function Home() {
  const { active } = useLayout();

  return (
    <DashboardShell>
      {active === "dashboard" && <DashboardClient />}
      {active === "students" && <StudentsClient />}
    </DashboardShell>
  );
}
