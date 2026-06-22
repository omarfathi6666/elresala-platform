import Link from "next/link";
import {
  Lock,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";

interface LectureItemProps {
  title: string;
  duration: string;
  status: "completed" | "current" | "locked";
}

export default function LectureItem({
  title,
  duration,
  status,
}: LectureItemProps) {
  const icon =
    status === "completed" ? (
      <CheckCircle2
        className="text-green-500"
        size={22}
      />
    ) : status === "current" ? (
      <PlayCircle
        className="text-blue-600"
        size={22}
      />
    ) : (
      <Lock
        className="text-slate-400"
        size={20}
      />
    );

  const isLocked = status === "locked";

  return (
    <Link
      href={isLocked ? "#" : "/dashboard/player"}
      className={`flex items-center justify-between rounded-2xl border p-4 transition ${
        isLocked
          ? "pointer-events-none cursor-not-allowed bg-slate-100"
          : "hover:border-blue-500 hover:bg-blue-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}

        <div>
          <h4 className="font-semibold text-slate-900">
            {title}
          </h4>

          <p className="text-sm text-slate-500">
            {duration}
          </p>
        </div>
      </div>
    </Link>
  );
}