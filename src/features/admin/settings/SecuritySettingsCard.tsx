export default function SecuritySettingsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        إعدادات الأمان
      </h2>

      <div className="space-y-4">

        <label className="flex items-center justify-between">
          <span>السماح بإنشاء حساب جديد</span>

          <input type="checkbox" defaultChecked />
        </label>

        <label className="flex items-center justify-between">
          <span>السماح بتفعيل الأكواد</span>

          <input type="checkbox" defaultChecked />
        </label>

      </div>

    </div>
  );
}