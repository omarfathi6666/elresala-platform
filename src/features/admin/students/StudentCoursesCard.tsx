interface StudentCoursesCardProps {
  items: string[];
}

export default function StudentCoursesCard({
  items,
}: StudentCoursesCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">
        الكورسات المشتركة
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-xl border p-4">
            {item}
          </div>
        ))}

        {items.length === 0 ? (
          <p className="text-slate-500">لا توجد بيانات بعد.</p>
        ) : null}
      </div>
    </div>
  );
}