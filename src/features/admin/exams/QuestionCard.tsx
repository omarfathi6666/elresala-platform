import { Pencil, Trash2 } from "lucide-react";

interface Props {
  id: string;
  number: number;
  question: string;
  image?: string | null;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
  explanation?: string | null;
  order: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function QuestionCard({
  id,
  number,
  question,
  image,
  choiceA,
  choiceB,
  choiceC,
  choiceD,
  correctAnswer,
  explanation,
  order,
  onEdit,
  onDelete,
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

          {image && (
            <p className="mt-2 text-slate-500 text-sm">
              صورة: {image}
            </p>
          )}

          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <p>A: {choiceA}</p>
            <p>B: {choiceB}</p>
            <p>C: {choiceC}</p>
            <p>D: {choiceD}</p>
          </div>

          <p className="mt-3 text-green-700 font-bold">
            الإجابة الصحيحة: {correctAnswer}
          </p>

          {explanation && (
            <p className="mt-2 text-slate-500">
              الشرح: {explanation}
            </p>
          )}

          <p className="mt-2 text-slate-400 text-sm">
            الترتيب: {order}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            className="rounded-xl border p-3"
            onClick={onEdit}
          >
            <Pencil size={18} />
          </button>

          <button
            className="rounded-xl border border-red-300 text-red-600 p-3"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}