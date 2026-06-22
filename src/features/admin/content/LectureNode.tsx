import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface Props {
  title: string;
}

export default function LectureNode({
  title,
}: Props) {
  return (
    <Link
      href="/admin/lectures/1"
      className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50"
    >
      <div className="flex items-center gap-3">

        <PlayCircle
          className="text-blue-600"
          size={20}
        />

        <span className="font-medium">
          {title}
        </span>

      </div>

      <span className="text-sm text-slate-500">
        إدارة
      </span>
    </Link>
  );
}