"use client";

import { ReactNode, useState } from "react";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <main className="min-h-screen bg-slate-100">
      <DashboardSidebar
        mobile
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex">
        <DashboardSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <DashboardTopbar
            onOpenMobileMenu={() =>
              setMobileMenuOpen(true)
            }
          />

          <div className="flex-1 p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}