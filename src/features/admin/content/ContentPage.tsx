import ContentTree from "./ContentTree";

export default function ContentPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">
            إدارة المحتوى
          </h1>

          <p className="mt-2 text-slate-500">
            إدارة المواد والفصول والمحاضرات
          </p>

        </div>

        <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
          + إنشاء محتوى
        </button>

      </div>

      <ContentTree />

    </div>
  );
}