import { ReactNode } from "react";

interface StepCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function StepCard({
  title,
  description,
  icon,
}: StepCardProps) {
  return (
    <button className="rounded-3xl border bg-white p-6 text-right shadow-sm transition hover:border-blue-500 hover:shadow-md">

      <div className="mb-5">
        {icon}
      </div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </button>
  );
}