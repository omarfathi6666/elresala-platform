import QuestionCard from "./QuestionCard";
import QuestionForm from "./QuestionForm";

const questions = [
  {
    number: 1,
    question: "أي العضيات مسؤولة عن إنتاج الطاقة داخل الخلية؟",
  },
  {
    number: 2,
    question: "ما الوحدة البنائية للكائن الحي؟",
  },
];

export default function ExamDetailsPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">
            امتحان الدعامة
          </h1>

          <p className="text-slate-500 mt-2">
            25 سؤال
          </p>

        </div>

        <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
          + إضافة سؤال
        </button>

      </div>

      <QuestionForm />

      <div className="space-y-5">

        {questions.map((question) => (
          <QuestionCard
            key={question.number}
            {...question}
          />
        ))}

      </div>

    </div>
  );
}