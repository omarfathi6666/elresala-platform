import Container from "@/components/ui/Container";

const steps = [
  {
    number: "1",
    title: "إنشاء حساب",
    description:
      "سجّل بياناتك الأساسية في أقل من دقيقة لبدء رحلتك التعليمية.",
  },
  {
    number: "2",
    title: "تفعيل الكود",
    description:
      "أدخل كود الاشتراك الخاص بك ليتم فتح المواد المناسبة لحسابك.",
  },
  {
    number: "3",
    title: "ابدأ التعلم",
    description:
      "شاهد المحاضرات، حمل ملفات PDF، واختبر نفسك عبر الامتحانات الإلكترونية.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            كيف تبدأ؟
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            خطوات بسيطة للانطلاق
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            ابدأ الدراسة على منصة الرسالة التعليمية في ثلاث خطوات واضحة وسريعة.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-8 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
