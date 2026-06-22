interface Props {
  title: string;
  value: string;
  color: string;
}

export default function LectureStatusCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-slate-500">
        {title}
      </p>

      <h2 className={`mt-3 text-3xl font-black ${color}`}>
        {value}
      </h2>
    </div>
  );
}