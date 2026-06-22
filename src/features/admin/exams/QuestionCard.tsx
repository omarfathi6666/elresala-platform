import { Pencil, Trash2, Copy } from "lucide-react";

interface Props {
  number: number;
  question: string;
}

export default function QuestionCard({
  number,
  question,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-blue-600 font-bold">
            السؤال {number}
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {question}
          </h2>

        </div>

        <div className="flex gap-2">

          <button className="rounded-xl border p-3">
            <Pencil size={18} />
          </button>

          <button className="rounded-xl border p-3">
            <Copy size={18} />
          </button>

          <button className="rounded-xl border border-red-300 text-red-600 p-3">
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}