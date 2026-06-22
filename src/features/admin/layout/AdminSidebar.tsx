"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  KeyRound,
  BookOpen,
  FolderTree,
  PlaySquare,
  FileQuestion,
  Bell,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "الرئيسية",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "الطلاب",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "الأكواد",
    href: "/admin/codes",
    icon: KeyRound,
  },
  {
    title: "المواد",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "الفصول",
    href: "/admin/chapters",
    icon: FolderTree,
  },
  {
    title: "المحاضرات",
    href: "/admin/lectures",
    icon: PlaySquare,
  },
  {
    title: "الامتحانات",
    href: "/admin/exams",
    icon: FileQuestion,
  },
  {
    title: "الإشعارات",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="min-h-screen w-72 border-l bg-white p-6">

      <h2 className="mb-8 text-3xl font-black text-blue-700">
        الرسالة
      </h2>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}