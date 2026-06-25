import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Link
        href="/register"
        className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-700 transition hover:scale-105 hover:bg-blue-50"
      >
        ابدأ الآن
      </Link>

      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
      >
        تسجيل الدخول
      </Link>
    </div>
  );
}