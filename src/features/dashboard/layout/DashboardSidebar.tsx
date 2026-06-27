"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  FileText,
  User,
  LogOut,
  X,
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
    title: "المحاضرات",
    href: "/dashboard/lectures",
    icon: PlayCircle,
  },
  {
    title: "الاختبارات",
    href: "/dashboard/exams",
    icon: FileText,
  },
  {
    title: "حسابي",
    href: "/dashboard/profile",
    icon: User,
  },
];

interface DashboardSidebarProps {
  mobile?: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({
  mobile = false,
  mobileOpen = false,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!mobile || !mobileOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobile, mobileOpen, onClose]);

  const sidebarBody = (
    <>
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
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-blue-600 hover:text-white"
              }`}
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
    </>
  );

  if (mobile) {
    return (
      <>
        {mobileOpen ? (
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        ) : null}

        <aside
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-slate-950 text-white transition-transform duration-200 lg:hidden ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 p-4">
            <h2 className="text-lg font-bold">
              القائمة
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 p-2 text-slate-300"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex h-[calc(100%-57px)] flex-col overflow-y-auto">
            {sidebarBody}
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden w-72 bg-slate-950 text-white lg:flex lg:flex-col">
      {sidebarBody}
    </aside>
  );
}