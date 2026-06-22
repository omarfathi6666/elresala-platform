import Container from "@/components/ui/Container";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "أحمد محمد",
    grade: "الصف الثالث الثانوي",
    comment:
      "أسلوب شرح مستر عمر فرق معايا جدًا، وبقيت أفهم الأحياء بسهولة ودرجاتي اتحسنت بشكل كبير.",
  },
  {
    name: "سارة علي",
    grade: "الصف الأول الثانوي",
    comment:
      "العلوم المتكاملة كانت صعبة بالنسبة لي، لكن المنصة خلت المذاكرة ممتعة ومنظمة.",
  },
  {
    name: "يوسف خالد",
    grade: "الصف الثالث الثانوي",
    comment:
      "الامتحانات الإلكترونية وبنك الأسئلة ساعدوني أراجع المنهج بالكامل قبل الامتحان.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            آراء الطلاب
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            ماذا يقول طلاب مستر عمر؟
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            نفخر بثقة طلابنا ونسعى دائمًا لتقديم أفضل تجربة تعليمية.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}