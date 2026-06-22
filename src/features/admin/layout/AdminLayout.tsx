import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="flex flex-1 flex-col">

        <AdminTopbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}