import { useLayout } from "@/components/layout/LayoutContext";

export function DashboardContent() {
  const { active } = useLayout();

  switch (active) {
    case "users":
      return <div>Users Table Here</div>;

    case "projects":
      return <div>Projects Content</div>;

    case "reports":
      return <div>Reports Content</div>;

    default:
      return <div>Dashboard Overview</div>;
  }
}
