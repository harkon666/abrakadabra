import {
  ChartNoAxesColumnIncreasing,
  Database,
  Files,
  PencilLine,
  Settings,
  User,
  UserCog2,
  Users,
  type LucideIcon,
} from "lucide-react";

type TMenuList = {
  title: string;
  url?: string;
  icon: LucideIcon;
  key: string;
  sub?: {
    title: string;
    url?: string;
    key?: string;
  }[];
}[];

export const menuList: TMenuList = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartNoAxesColumnIncreasing,
    sub: undefined,
    key: "/dashboard",
  },
  {
    title: "Customer",
    url: "/customer?page=1&limit=20",
    icon: Users,
    sub: undefined,
    key: "/customer",
  },
  {
    title: "Patient",
    url: "/patient?registered=true&page=1&limit=20",
    icon: Users,
    key: "/patient",
  },
  {
    title: "Partner",
    url: undefined,
    icon: Users,
    key: "/partner",
  },
  {
    title: "Registration",
    url: undefined,
    icon: User,
    key: "/registration",
    sub: [
      {
        title: "Patient",
        url: "/registration/patient?registered=false&page=1&limit=20",
        key: "/registration/patient",
      },
      {
        title: "Report Sending WA",
        url: undefined,
      },
      {
        title: "Audiometri",
        url: undefined,
      },
      {
        title: "Radiologi",
        url: undefined,
      },
      {
        title: "Drug Screening",
        url: undefined,
      },
      {
        title: "Formula",
        url: undefined,
      },
    ],
  },
  {
    title: "Database",
    url: undefined,
    icon: Database,
    key: "/database",
    sub: [
      {
        title: "Medical Check Up",
        url: undefined,
      },
      {
        title: "Report Sending WA",
        url: undefined,
      },
      {
        title: "Audiometri",
        url: undefined,
      },
      {
        title: "Radiologi",
        url: undefined,
      },
      {
        title: "Drug Screening",
        url: undefined,
      },
      {
        title: "Formula",
        url: undefined,
      },
      {
        title: "Package",
        url: "/database/package",
        key: "/database/package",
      },
    ],
  },
  {
    title: "Report",
    url: undefined,
    icon: Files,
    key: "/report",
    sub: [
      {
        title: "Pasien",
        url: undefined,
      },
      {
        title: "Top 10 Diseases",
        url: undefined,
      },
      {
        title: "All Diseases",
        url: undefined,
      },
      {
        title: "Audiometri",
        url: undefined,
      },
      {
        title: "Spirometri",
        url: undefined,
      },
      {
        title: "Radiologi",
        url: undefined,
      },
      {
        title: "Statistik Umum",
        url: undefined,
      },
    ],
  },

  {
    title: "User Management",
    url: undefined,
    icon: UserCog2,
    key: "/user-management",
    sub: [
      {
        title: "User",
        url: undefined,
      },
      {
        title: "User Group",
        url: undefined,
      },
      {
        title: "Menu",
        url: undefined,
      },
    ],
  },

  {
    title: "Tools",
    url: undefined,
    icon: Settings,
    key: "/tools",
    sub: [
      {
        title: "Backup Database",
        url: undefined,
      },
      {
        title: "Restore Database",
        url: undefined,
      },
    ],
  },

  {
    title: "TTD Dokter Spesialist",
    url: undefined,
    icon: PencilLine,
    sub: undefined,
    key: "/ttd",
  },
];
