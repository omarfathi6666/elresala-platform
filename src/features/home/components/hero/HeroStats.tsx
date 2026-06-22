const stats = [
  {
    value: "+500",
    label: "طالب",
  },
  {
    value: "+150",
    label: "محاضرة",
  },
  {
    value: "98%",
    label: "نسبة النجاح",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-14 grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-md"
        >
          <h3 className="text-3xl font-extrabold text-white">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm font-medium text-blue-100">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}