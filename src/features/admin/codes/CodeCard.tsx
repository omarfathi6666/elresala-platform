interface CodeCardProps {
  code: string;
  course: string;
  status: "available" | "used";
  maxDevices: number;
  expiresAt: string | null;
  usedCount: number;
  createdAt: string;
}

export default function CodeCard({
  code,
  course,
  status,
  maxDevices,
  expiresAt,
  usedCount,
  createdAt,
}: CodeCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-widest">
        {code}
      </h2>

      <p className="mt-3 text-slate-500">
        {course}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        عدد الأجهزة: {maxDevices} • مرات الاستخدام: {usedCount}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        تاريخ الإنشاء: {new Date(createdAt).toLocaleDateString("ar-EG")}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        الانتهاء: {expiresAt ? new Date(expiresAt).toLocaleDateString("ar-EG") : "غير محدد"}
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