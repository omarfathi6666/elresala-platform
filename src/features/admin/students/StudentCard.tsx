import Link from "next/link";

interface StudentCardProps {
  id: string;
  name: string;
  phone: string;
  governorate: string;
  grade: string;
  active: boolean;
}

export default function StudentCard({
  id,
  name,
  phone,
  governorate,
  grade,
  active,
}: StudentCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>

          <p className="mt-1 text-slate-500">
            {phone}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-bold ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {active ? "نشط" : "موقوف"}
        </span>
      </div>

      <div className="mt-6 flex justify-between text-sm text-slate-500">
        <span>{governorate}</span>

        <span>{grade}</span>
      </div>

      <Link
        href={`/admin/students/${id}`}
        className="mt-6 block rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
      >
        عرض الملف
      </Link>
    </div>
  );
}