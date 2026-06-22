import { LucideIcon } from "lucide-react";

interface WhyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function WhyCard({
  icon: Icon,
  title,
  description,
}: WhyCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white transition-transform duration-300 group-hover:scale-110">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}
