import LectureCard from "./LectureCard";
import LectureForm from "./LectureForm";

const lectures = [
  {
    id: "1",
    title: "الدعامة في النبات",
    duration: "2 ساعة 15 دقيقة",
    hasPdf: true,
    hasExam: true,
  },
  {
    id: "2",
    title: "الأنسجة النباتية",
    duration: "1 ساعة 45 دقيقة",
    hasPdf: false,
    hasExam: false,
  },
];

export default function LecturesPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-black">
          المحاضرات
        </h1>

      </div>

      <LectureForm />

      <div className="grid gap-6">

        {lectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            {...lecture}
          />
        ))}

      </div>

    </div>
  );
}