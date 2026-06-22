import ExamHeader from "./ExamHeader";
import ExamTimer from "./ExamTimer";
import ExamProgress from "./ExamProgress";
import ExamSidebar from "./ExamSidebar";
import QuestionCard from "./QuestionCard";

export default function ExamPage() {
  return (
    <div className="space-y-8">
      <ExamHeader />

      <div className="grid gap-8 xl:grid-cols-4">
        <div className="space-y-6 xl:col-span-3">
          <ExamProgress
            current={1}
            total={25}
          />

          <QuestionCard
            number={1}
            question="أي العضيات التالية مسؤولة عن إنتاج الطاقة داخل الخلية؟"
          />

          <div className="flex justify-between">
            <button className="rounded-2xl border px-6 py-3">
              السابق
            </button>

            <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
              التالي
            </button>
          </div>

          <button className="w-full rounded-2xl bg-red-600 py-4 text-lg font-bold text-white">
            إنهاء الامتحان
          </button>
        </div>

        <div className="space-y-6">
          <ExamTimer />

          <ExamSidebar />
        </div>
      </div>
    </div>
  );
}