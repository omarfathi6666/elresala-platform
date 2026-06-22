export default function QuestionsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">
        لديك سؤال؟
      </h3>

      <textarea
        placeholder="اكتب سؤالك هنا..."
        className="mt-4 h-32 w-full resize-none rounded-2xl border p-4 outline-none focus:border-blue-600"
      />

      <button className="mt-4 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
        إرسال
      </button>
    </div>
  );
}