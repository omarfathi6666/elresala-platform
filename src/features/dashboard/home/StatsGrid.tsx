import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="الكورسات"
        value="2"
      />

      <StatCard
        title="المحاضرات"
        value="34"
      />

      <StatCard
        title="الامتحانات"
        value="12"
      />

      <StatCard
        title="نسبة الإنجاز"
        value="68%"
      />
    </div>
  );
}