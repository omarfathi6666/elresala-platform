import LectureItem from "./LectureItem";
import ContinueWatching from "./ContinueWatching";
import ResourcesCard from "./ResourcesCard";

export default function LecturesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          الفصل الأول - الدعامة والحركة
        </h1>

        <p className="mt-2 text-slate-500">
          اختر المحاضرة التي تريد مشاهدتها.
        </p>
      </div>

      <ContinueWatching />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <LectureItem
            title="المحاضرة الأولى - مقدمة"
            duration="18 دقيقة"
            status="completed"
          />

          <LectureItem
            title="المحاضرة الثانية - الدعامة"
            duration="32 دقيقة"
            status="current"
          />

          <LectureItem
            title="المحاضرة الثالثة - الحركة"
            duration="40 دقيقة"
            status="locked"
          />

          <LectureItem
            title="المحاضرة الرابعة - النقل"
            duration="35 دقيقة"
            status="locked"
          />

          <LectureItem
            title="امتحان الفصل"
            duration="20 سؤال"
            status="locked"
          />
        </div>

        <div>
          <ResourcesCard />
        </div>
      </div>
    </div>
  );
}