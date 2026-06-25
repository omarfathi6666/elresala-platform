"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";

const navLinks = [
  { title: "الرئيسية", href: "/" },
  { title: "المواد", href: "#courses" },
  { title: "المميزات", href: "#features" },
  { title: "الأسئلة الشائعة", href: "#faq" },
  { title: "تواصل معنا", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-700"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </header>
  );
}