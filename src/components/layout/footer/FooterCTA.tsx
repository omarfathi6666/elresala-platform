import Link from "next/link";

export default function FooterCTA() {
  return (
    <div className="rounded-3xl bg-blue-600 p-8 text-center">
      <h3 className="text-3xl font-extrabold text-white">
        جاهز تبدأ رحلتك؟
      </h3>

      <p className="mt-4 text-blue-100">
        انضم الآن لمنصة مستر عمر فتحي وابدأ أول محاضرة.
      </p>

      <Link
        href="/login"
        className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50"
      >
        ابدأ الآن
      </Link>
    </div>
  );
}