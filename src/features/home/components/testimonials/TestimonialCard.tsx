interface TestimonialCardProps {
  name: string;
  grade: string;
  comment: string;
}

export default function TestimonialCard({
  name,
  grade,
  comment,
}: TestimonialCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
          {name.charAt(0)}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            {grade}
          </p>
        </div>
      </div>

      <p className="mt-6 leading-8 text-slate-600">
        "{comment}"
      </p>
    </div>
  );
}