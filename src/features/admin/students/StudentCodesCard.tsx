interface StudentCodesCardProps {
  codes: string[];
}

export default function StudentCodesCard({
  codes,
}: StudentCodesCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">
        الأكواد المستخدمة
      </h2>
      <div className="space-y-3">
        {codes.map((code) => (
          <div key={code} className="rounded-xl border p-4">
            {code}
          </div>
        ))}

        {codes.length === 0 ? (
          <p className="text-slate-500">لا توجد بيانات بعد.</p>
        ) : null}
      </div>
    </div>
  );
}