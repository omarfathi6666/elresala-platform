interface QuestionPaletteProps {
  current: number;
}

export default function QuestionPalette({
  current,
}: QuestionPaletteProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-xl font-bold">
        التنقل بين الأسئلة
      </h3>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 25 }, (_, i) => (
          <button
            key={i}
            className={`h-11 rounded-xl font-bold transition ${
              i + 1 === current
                ? "bg-blue-600 text-white"
                : "border hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}