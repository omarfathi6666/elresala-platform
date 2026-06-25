import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function LectureActionCard({
  icon,
  title,
  description,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="rounded-3xl bg-white p-6 text-right shadow-sm transition hover:shadow-lg hover:border-blue-500 border"
    >

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