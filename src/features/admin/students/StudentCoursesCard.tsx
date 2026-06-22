export default function StudentCoursesCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        الكورسات المشتركة
      </h2>

      <div className="space-y-3">

        <div className="rounded-xl border p-4">
          الأحياء - الثالث الثانوي
        </div>

        <div className="rounded-xl border p-4">
          العلوم المتكاملة - الأول الثانوي
        </div>

      </div>

    </div>
  );
}