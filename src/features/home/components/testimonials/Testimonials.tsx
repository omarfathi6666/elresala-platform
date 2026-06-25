"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  function slide(direction: "next" | "prev") {
    const container = sliderRef.current;

    if (!container) {
      return;
    }

    const amount = Math.max(280, container.clientWidth * 0.85);

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

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

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => slide("prev")}
              className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-blue-500 hover:text-blue-700"
            >
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => slide("next")}
              className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-blue-500 hover:text-blue-700"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="min-w-[85%] snap-start sm:min-w-[55%] lg:min-w-[32%]"
            >
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}