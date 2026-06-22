import {
  Award,
  BookOpenCheck,
  ClipboardCheck,
  Headphones,
} from "lucide-react";

import Container from "@/components/ui/Container";
import WhyCard from "./WhyCard";

const items = [
  {
    icon: Award,
    title: "خبرة في تدريس الأحياء",
    description:
      "شرح مبسط ومنظم يساعد الطالب على الفهم وليس الحفظ فقط.",
  },
  {
    icon: ClipboardCheck,
    title: "امتحانات إلكترونية",
    description:
      "اختبارات بعد كل درس مع تصحيح فوري وتحليل للنتائج.",
  },
  {
    icon: BookOpenCheck,
    title: "محتوى محدث",
    description:
      "جميع المحاضرات والمراجعات متوافقة مع أحدث مواصفات الوزارة.",
  },
  {
    icon: Headphones,
    title: "دعم ومتابعة",
    description:
      "متابعة مستمرة والإجابة على أسئلة الطلاب أثناء الدراسة.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            لماذا منصة الرسالة؟
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            لماذا يختار الطلاب مستر عمر فتحي؟
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            تجربة تعليمية متكاملة تساعدك على تحقيق أفضل النتائج في الأحياء
            والعلوم المتكاملة.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <WhyCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}