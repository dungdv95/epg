import {
  CircleUserRound,
  File,
  Inbox,
  Landmark,
  LucideIcon,
  Receipt,
  Recycle,
  Send,
  Settings,
  Store,
} from "lucide-react";

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
    title: "Hệ thống",
    icon: Settings,
    variant: "ghost",
    url: "/system",
    name: "System",
    items: [
      {
        title: "Settle Back",
        icon: Inbox,
        variant: "ghost",
        url: "/system/settle-back",
        name: "Settle Back",
        items: [],
      },
      {
        title: "Province",
        icon: Inbox,
        variant: "ghost",
        url: "/system/province",
        name: "Province",
        items: [],
      },
      {
        title: "District",
        icon: Inbox,
        variant: "ghost",
        url: "/system/district",
        name: "District",
        items: [],
      },
      {
        title: "User",
        icon: Inbox,
        variant: "ghost",
        url: "/system/user",
        name: "User",
        items: [],
      },
      {
        title: "Roles",
        icon: Inbox,
        variant: "ghost",
        url: "/system/roles",
        name: "Roles",
        items: [],
      },
      {
        title: "Payment Accept Method",
        icon: Inbox,
        variant: "ghost",
        url: "/system/payment-accept-method",
        name: "Payment Accept Method",
        items: [],
      },
    ],
  },
  {
    title: "Master Merchant",
    icon: Store,
    variant: "ghost",
    url: "/master-merchant",
    name: "Master Merchant",
    items: [
      {
        title: "Danh sách",
        icon: File,
        variant: "ghost",
        url: "/master-merchant/list",
        name: "Danh sách",
        items: [],
      },
      {
        title: "User",
        icon: File,
        variant: "ghost",
        url: "/master-merchant/user",
        name: "User",
        items: [],
      },
    ],
  },
  {
    title: "Merchant Personal",
    icon: CircleUserRound,
    variant: "ghost",
    url: "/merchant-personal",
    name: "Merchant Personal",
    items: [
      {
        title: "Danh sách",
        icon: File,
        variant: "ghost",
        url: "/merchant-personal/list",
        name: "Danh sách",
        items: [],
      },
      {
        title: "User",
        icon: File,
        variant: "ghost",
        url: "/merchant-personal/user",
        name: "User",
        items: [],
      },
    ],
  },
  {
    title: "Merchant Corp",
    icon: Landmark,
    variant: "ghost",
    url: "/merchant-corp",
    name: "Merchant Corp",
    items: [
      {
        title: "Danh sách",
        icon: File,
        variant: "ghost",
        url: "/merchant-corp/list",
        name: "Danh sách",
        items: [],
      },
      {
        title: "User",
        icon: File,
        variant: "ghost",
        url: "/merchant-corp/user",
        name: "User",
        items: [],
      },
    ],
  },
  {
    title: "Merchant CashIn",
    icon: Receipt,
    variant: "ghost",
    url: "/merchant-cashin",
    name: "Merchant CashIn",
    items: [
      {
        title: "Danh sách",
        icon: File,
        variant: "ghost",
        url: "/merchant-cashin/list",
        name: "Danh sách",
        items: [],
      },
      {
        title: "User",
        icon: File,
        variant: "ghost",
        url: "/merchant-cashin/user",
        name: "User",
        items: [],
      },
    ],
  },
  {
    title: "Merchant Branch",
    icon: Recycle,
    variant: "ghost",
    url: "/merchant-branch",
    name: "Merchant Branch",
    items: [
      {
        title: "Danh sách",
        icon: File,
        variant: "ghost",
        url: "/merchant-branch/list",
        name: "Danh sách",
        items: [],
      },
      {
        title: "User",
        icon: File,
        variant: "ghost",
        url: "/merchant-branch/user",
        name: "User",
        items: [],
      },
    ],
  },
];
