export default function AdminTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div>

        <h1 className="text-2xl font-black">
          لوحة التحكم
        </h1>

        <p className="text-slate-500">
          منصة الرسالة التعليمية
        </p>

      </div>

      <div className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white">
        مستر عمر فتحي
      </div>

    </header>
  );
}