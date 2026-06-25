import Container from "@/components/ui/Container";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "كيف أشترك في المنصة؟",
    answer:
      "يمكنك إنشاء حساب ثم اختيار المادة المناسبة وإتمام عملية الاشتراك لتبدأ الدراسة مباشرة.",
  },
  {
    question: "هل يمكن مشاهدة المحاضرات أكثر من مرة؟",
    answer:
      "نعم، يمكنك مشاهدة جميع المحاضرات المتاحة في اشتراكك أكثر من مرة طوال مدة الاشتراك.",
  },
  {
    question: "هل يوجد امتحانات بعد كل درس؟",
    answer:
      "نعم، تحتوي المنصة على امتحانات وتدريبات إلكترونية بعد الدروس لمساعدتك على تقييم مستواك.",
  },
  {
    question: "هل المنصة تعمل على الموبايل؟",
    answer:
      "نعم، المنصة تعمل على الكمبيوتر والتابلت والموبايل بدون أي مشاكل.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            الأسئلة الشائعة
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            كل ما تريد معرفته
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            إجابات على أكثر الأسئلة التي يطرحها الطلاب قبل الاشتراك.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-5">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}