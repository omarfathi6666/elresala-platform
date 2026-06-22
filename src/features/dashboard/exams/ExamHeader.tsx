export default function ExamHeader() {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-blue-600 p-6 text-white">
      <div>
        <h1 className="text-3xl font-bold">
          امتحان الفصل الأول
        </h1>

        <p className="mt-2 text-blue-100">
          25 سؤال
        </p>
      </div>

      <div className="text-center">
        <p className="text-sm">
          الوقت المتبقي
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          39:58
        </h2>
      </div>
    </div>
  );
}