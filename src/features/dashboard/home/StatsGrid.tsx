import StatCard from "./StatCard";

interface StatsGridProps {
  watchedLectures: number;
  examsCount: number;
  progress: number;
}

export default function StatsGrid({
  watchedLectures,
  examsCount,
  progress,
}: StatsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="الكورسات"
        value="0"
      />

      <StatCard
        title="المحاضرات"
        value={String(watchedLectures)}
      />

      <StatCard
        title="الامتحانات"
        value={String(examsCount)}
      />

      <StatCard
        title="نسبة الإنجاز"
        value={`${progress}%`}
      />
    </div>
  );
}