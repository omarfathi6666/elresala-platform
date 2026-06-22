import { ReactNode } from "react";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <DashboardSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <DashboardTopbar />

          <div className="flex-1 p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}