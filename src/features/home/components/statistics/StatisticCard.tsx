import { LucideIcon } from "lucide-react";

interface StatisticCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function StatisticCard({
  icon: Icon,
  value,
  label,
}: StatisticCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-4xl font-extrabold text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-base font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}