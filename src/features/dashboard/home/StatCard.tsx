interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-slate-500">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
        {value}
      </h3>
    </div>
  );
}