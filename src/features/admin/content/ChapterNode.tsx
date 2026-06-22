import { FolderOpen } from "lucide-react";
import LectureNode from "./LectureNode";

interface Props {
  title: string;
}

export default function ChapterNode({
  title,
}: Props) {
  return (
    <div className="rounded-2xl border p-5">

      <div className="mb-5 flex items-center gap-3">

        <FolderOpen
          className="text-indigo-600"
          size={22}
        />

        <h3 className="text-xl font-bold">
          {title}
        </h3>

      </div>

      <div className="space-y-3 pl-8">

        <LectureNode
          title="المحاضرة الأولى"
        />

        <LectureNode
          title="المحاضرة الثانية"
        />

      </div>

    </div>
  );
}