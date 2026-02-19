import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

export type SidebarKey =
  | "dashboard"
  | "users"
  | "projects"
  | "reports";

export const SIDEBAR_ITEMS: {
  key: SidebarKey;
  label: string;
  icon: React.ComponentType<any>;
}[] = [
  { key: "dashboard", label: "Dashboard", icon: HomeIcon },
  { key: "users", label: "Users", icon: UsersIcon },
  { key: "projects", label: "Projects", icon: FolderIcon },
  { key: "reports", label: "Reports", icon: ChartPieIcon },
];
