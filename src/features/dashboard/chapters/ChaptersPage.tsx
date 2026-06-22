import ChapterCard from "./ChapterCard";

const chapters = [
  {
    id: "chapter-1",
    title: "الفصل الأول - الدعامة والحركة",
    lectures: 12,
    exams: 1,
    progress: 68,
  },
  {
    id: "chapter-2",
    title: "الفصل الثاني - النقل",
    lectures: 10,
    exams: 1,
    progress: 15,
  },
  {
    id: "chapter-3",
    title: "الفصل الثالث - التكاثر",
    lectures: 9,
    exams: 1,
    progress: 0,
  },
  {
    id: "chapter-4",
    title: "الفصل الرابع - الوراثة",
    lectures: 14,
    exams: 2,
    progress: 0,
  },
];

export default function ChaptersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          فصول الأحياء
        </h1>

        <p className="mt-2 text-slate-500">
          اختر الفصل الذي تريد دراسته.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            {...chapter}
          />
        ))}
      </div>
    </div>
  );
}