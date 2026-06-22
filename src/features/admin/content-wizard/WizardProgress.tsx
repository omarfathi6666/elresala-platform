const steps = [
  "المادة",
  "الفصل",
  "المحاضرة",
  "الفيديو",
  "PDF",
  "الامتحان",
];

export default function WizardProgress() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="grid grid-cols-6 gap-4">

        {steps.map((step, index) => (
          <div
            key={step}
            className="text-center"
          >
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full font-bold ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200"
              }`}
            >
              {index + 1}
            </div>

            <p className="mt-2 text-sm">
              {step}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}