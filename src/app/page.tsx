import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardClient } from "@/features/dashboard/DashboardClient";

export default function Home() {
  return (
    <DashboardShell>
      <DashboardClient />
    </DashboardShell>
  );
}
