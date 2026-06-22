import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function VideoHeader() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard/chapters"
        className="flex h-11 w-11 items-center justify-center rounded-xl border"
      >
        <ArrowRight size={20} />
      </Link>

      <div>
        <p className="text-sm text-slate-500">
          الفصل الأول
        </p>

        <h1 className="text-3xl font-bold">
          المحاضرة الثانية - الدعامة
        </h1>
      </div>
    </div>
  );
}