import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-90"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
        <GraduationCap size={24} strokeWidth={2.2} />
      </div>

      {showText && (
        <div className="leading-tight">
          <h1 className="text-lg font-bold text-slate-900">
            Elresala
          </h1>

          <p className="text-xs text-slate-500">
            Educational Platform
          </p>
        </div>
      )}
    </Link>
  );
}