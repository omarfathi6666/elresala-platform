import { Bell, Search } from "lucide-react";

export default function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          لوحة التحكم
        </h1>

        <p className="text-sm text-slate-500">
          أهلاً بك من جديد 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="بحث..."
            className="w-72 rounded-2xl border border-slate-300 py-3 pr-11 pl-4 outline-none focus:border-blue-600"
          />
        </div>

        <button className="rounded-2xl border border-slate-200 p-3">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}