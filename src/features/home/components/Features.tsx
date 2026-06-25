import {
  BookOpen,
  Video,
  FileText,
  Trophy,
  BarChart3,
  Smartphone,
} from "lucide-react";

import Container from "@/components/ui/Container";

const features = [
  {
    icon: Video,
    title: "فيديوهات عالية الجودة",
    description: "محاضرات مصورة بوضوح عالٍ مع شرح تدريجي يراعي كل مستويات الطلاب.",
  },
  {
    icon: FileText,
    title: "ملفات PDF",
    description: "ملخصات ومذكرات منظمة لكل درس تساعدك على المراجعة السريعة.",
  },
  {
    icon: Trophy,
    title: "امتحانات إلكترونية",
    description: "اختبارات تدريبية وتقييمات فورية لقياس الفهم قبل الامتحان النهائي.",
  },
  {
    icon: BarChart3,
    title: "متابعة التقدم",
    description: "لوحة متابعة تبين مستوى إنجازك ونقاط القوة التي تحتاج إلى تحسين.",
  },
  {
    icon: Smartphone,
    title: "تعمل على جميع الأجهزة",
    description: "تجربة سلسة على الموبايل والتابلت والكمبيوتر بنفس الجودة.",
  },
  {
    icon: BookOpen,
    title: "محتوى تعليمي احترافي",
    description: "خطة تعلم واضحة تربط بين الشرح والتدريب والمراجعة لتحقيق أفضل نتيجة.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <Container>
        <div className="text-center">
          <span className="text-blue-600 font-semibold">
            مميزات المنصة
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            كل اللي تحتاجه في مكان واحد
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            صممنا منصة الرسالة لتوفر للطالب تجربة تعليمية سهلة وسريعة
            تساعده على التركيز في المذاكرة وتحقيق أفضل النتائج.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}