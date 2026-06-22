interface CodeCardProps {
  code: string;
  course: string;
  status: "available" | "used";
}

export default function CodeCard({
  code,
  course,
  status,
}: CodeCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-widest">
        {code}
      </h2>

      <p className="mt-3 text-slate-500">
        {course}
      </p>

      <span
        className={`mt-5 inline-block rounded-full px-4 py-2 text-sm font-bold ${
          status === "available"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status === "available"
          ? "متاح"
          : "تم الاستخدام"}
      </span>
    </div>
  );
}