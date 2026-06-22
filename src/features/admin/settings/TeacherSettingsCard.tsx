export default function TeacherSettingsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        بيانات المستر
      </h2>

      <div className="space-y-5">

        <input
          className="w-full rounded-2xl border p-4"
          defaultValue="مستر عمر فتحي"
        />

        <input
          className="w-full rounded-2xl border p-4"
          defaultValue="01000000000"
        />

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white font-bold">
          حفظ
        </button>

      </div>

    </div>
  );
}