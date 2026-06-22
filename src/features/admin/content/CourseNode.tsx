import { ChevronDown, BookOpen } from "lucide-react";
import ChapterNode from "./ChapterNode";

interface Props {
  title: string;
}

export default function CourseNode({ title }: Props) {
  return (
    <div className="rounded-3xl bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-6">

        <div className="flex items-center gap-3">

          <BookOpen
            className="text-blue-600"
            size={24}
          />

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

        </div>

        <ChevronDown />

      </div>

      <div className="space-y-4 p-6">

        <ChapterNode
          title="الدعامة والحركة"
        />

        <ChapterNode
          title="التكاثر"
        />

      </div>

    </div>
  );
}