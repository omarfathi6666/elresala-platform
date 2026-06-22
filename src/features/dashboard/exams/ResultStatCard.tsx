interface ResultStatCardProps {
  title: string;
  value: string;
  color: string;
}

export default function ResultStatCard({
  title,
  value,
  color,
}: ResultStatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-slate-500">{title}</p>

      <h2
        className={`mt-3 text-4xl font-extrabold ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}