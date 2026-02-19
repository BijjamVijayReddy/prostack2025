import type { SidebarKey } from "./sidebar.types";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export interface SidebarItem {
  key: SidebarKey;
  label: string;
  icon: React.ComponentType<any>;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    key: "students",
    label: "Students",
    icon: UserGroupIcon,
  },
  {
    key: "enquiry",
    label: "Enquiry",
    icon: DocumentTextIcon,
  },
  {
    key: "reports",
    label: "Reports",
    icon: ChartBarIcon,
  },
];
