import Link from "next/link";

import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100">
            ابدأ رحلتك الآن
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            مستقبلك يبدأ بخطوة...
            <br />
            ابدأ مع مستر عمر فتحي اليوم.
          </h2>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            انضم إلى منصة الرسالة التعليمية، واستفد من الشرح الاحترافي،
            الامتحانات الإلكترونية، والمتابعة المستمرة حتى تحقق هدفك.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-700 transition hover:bg-blue-50"
            >
              ابدأ الآن
            </Link>

            <Link
              href="#subjects"
              className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              تصفح المواد
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}