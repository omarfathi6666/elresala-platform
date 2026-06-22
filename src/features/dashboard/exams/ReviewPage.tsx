import ReviewQuestionCard from "./ReviewQuestionCard";

export default function ReviewPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-extrabold">
        مراجعة الامتحان
      </h1>

      <ReviewQuestionCard
        question="أي العضيات مسؤولة عن إنتاج الطاقة؟"
        userAnswer="جهاز جولجي"
        correctAnswer="الميتوكوندريا"
        explanation="الميتوكوندريا هي المسؤولة عن إنتاج ATP داخل الخلية."

      />

    </div>
  );
}