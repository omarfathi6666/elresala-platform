import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLogo() {
  return (
    <Link
      href="/"
      className="mb-10 inline-flex items-center gap-3"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
        <GraduationCap size={30} />
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          منصة الرسالة
        </h1>

        <p className="text-sm text-slate-500">
          Mr. Omar Fathy
        </p>
      </div>
    </Link>
  );
}