interface ProfileInfoCardProps {
  label: string;
  value: string;
}

export default function ProfileInfoCard({
  label,
  value,
}: ProfileInfoCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="mt-2 text-lg font-bold">
        {value}
      </h3>
    </div>
  );
}