interface Props {
  label: string;
  value: string;
}

export default function StudentInfoCard({
  label,
  value,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h2 className="mt-2 text-lg font-bold">
        {value}
      </h2>
    </div>
  );
}