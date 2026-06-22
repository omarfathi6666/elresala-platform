import ExamHeader from "./ExamHeader";
import ExamTimer from "./ExamTimer";
import ExamProgress from "./ExamProgress";
import QuestionCard from "./QuestionCard";
import QuestionPalette from "./QuestionPalette";
import ExamActions from "./ExamActions";

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

          <ExamActions />

        </div>

        <div className="space-y-6">

          <ExamTimer />

          <QuestionPalette current={1} />

        </div>

      </div>

    </div>
  );
}