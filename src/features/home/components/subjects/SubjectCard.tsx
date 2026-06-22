import Link from "next/link";
import { LucideIcon, ArrowLeft } from "lucide-react";

interface SubjectCardProps {
  title: string;
  grade: string;
  description: string;
  lessons: number;
  exams: number;
  students: number;
  href: string;
  icon: LucideIcon;
}

export default function SubjectCard({
  title,
  grade,
  description,
  lessons,
  exams,
  students,
  href,
  icon: Icon,
}: SubjectCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white transition-transform duration-300 group-hover:scale-110">
        <Icon size={32} />
      </div>

      <h3 className="mt-8 text-3xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 font-semibold text-blue-600">
        {grade}
      </p>

      <p className="mt-5 leading-8 text-slate-600">
        {description}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl bg-slate-50 p-4">
        <div className="text-center">
          <h4 className="text-xl font-bold text-slate-900">
            {lessons}
          </h4>

          <span className="text-sm text-slate-500">
            محاضرة
          </span>
        </div>

        <div className="text-center">
          <h4 className="text-xl font-bold text-slate-900">
            {exams}
          </h4>

          <span className="text-sm text-slate-500">
            امتحان
          </span>
        </div>

        <div className="text-center">
          <h4 className="text-xl font-bold text-slate-900">
            {students}+
          </h4>

          <span className="text-sm text-slate-500">
            طالب
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 font-bold text-blue-600">
        ابدأ التعلم
        <ArrowLeft size={18} />
      </div>
    </Link>
  );
}