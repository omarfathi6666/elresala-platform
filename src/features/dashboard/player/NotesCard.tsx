export default function NotesCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold">
        ملاحظاتي
      </h3>

      <textarea
        placeholder="اكتب ملاحظاتك أثناء الشرح..."
        className="mt-4 h-40 w-full resize-none rounded-2xl border p-4 outline-none focus:border-blue-600"
      />
    </div>
  );
}