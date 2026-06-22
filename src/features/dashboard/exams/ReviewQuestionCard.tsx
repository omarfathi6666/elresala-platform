interface ReviewQuestionCardProps {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation?: string;
}

export default function ReviewQuestionCard({
  question,
  userAnswer,
  correctAnswer,
  explanation,
}: ReviewQuestionCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        {question}
      </h2>

      <div className="mt-8 space-y-4">

        <div className="rounded-2xl border border-red-300 bg-red-50 p-4">
          ❌ إجابتك: {userAnswer}
        </div>

        <div className="rounded-2xl border border-green-300 bg-green-50 p-4">
          ✅ الإجابة الصحيحة: {correctAnswer}
        </div>

        {explanation && (
          <div className="rounded-2xl bg-blue-50 p-5">

            <h3 className="font-bold text-blue-700">
              شرح مستر عمر
            </h3>

            <p className="mt-3 leading-8">
              {explanation}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}