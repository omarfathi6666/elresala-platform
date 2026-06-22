interface QuestionCardProps {
  number: number;
  question: string;
}

const answers = [
  "الميتوكوندريا",
  "جهاز جولجي",
  "الريبوسومات",
  "النواة",
];

export default function QuestionCard({
  number,
  question,
}: QuestionCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <p className="mb-3 text-blue-600 font-bold">
        السؤال {number}
      </p>

      <h2 className="mb-8 text-2xl font-bold leading-9">
        {question}
      </h2>

      <div className="space-y-4">
        {answers.map((answer) => (
          <label
            key={answer}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <input
              type="radio"
              name={`question-${number}`}
            />

            <span>{answer}</span>
          </label>
        ))}
      </div>
    </div>
  );
}