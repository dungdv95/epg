import { File, Inbox, LucideIcon, Send } from "lucide-react";

export type SidebarItem = {
  title: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  url: string;
  name: string;
  items: SidebarItem[];
};

export const navItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: Inbox,
    variant: "ghost",
    url: "/demo",
    name: "Dashboard",
    items: [],
  },
  {
    title: "Hệ thống",
    icon: File,
    variant: "ghost",
    url: "/home",
    name: "System",
    items: [],
  },
  {
    title: "Merchant",
    icon: File,
    variant: "ghost",
    url: "/admin/merchant",
    name: "Merchant",
    items: [],
  },
  {
    title: "Báo cáo",
    icon: File,
    variant: "ghost",
    url: "/admin/report",
    name: "Báo cáo",
    items: [],
  },
  {
    title: "Chi nội bộ",
    icon: File,
    variant: "ghost",
    url: "/admin/internalpay",
    name: "Internal Payment",
    items: [],
  },
  {
    title: "Cash by Code",
    icon: File,
    variant: "ghost",
    url: "/admin/cash-by-code",
    name: "Cash by Code",
    items: [],
  },
  {
    title: "App metrics",
    icon: File,
    variant: "ghost",
    url: "/appmetrics",
    name: "App metrics",
    items: [],
  },
];
