"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  FileText,
  Trophy,
  User,
  LogOut,
} from "lucide-react";

const links = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "موادي",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "محاضراتي",
    href: "/dashboard/lectures",
    icon: PlayCircle,
  },
  {
    title: "امتحاناتي",
    href: "/dashboard/exams",
    icon: FileText,
  },
  {
    title: "درجاتي",
    href: "/dashboard/exams",
    icon: Trophy,
  },
  {
    title: "حسابي",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden w-72 bg-slate-950 text-white lg:flex lg:flex-col">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-extrabold">
          منصة الرسالة
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Omar Fathy Platform
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-red-300 transition hover:bg-red-600 hover:text-white">
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}