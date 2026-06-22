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
    icon: BookOpen,
    title: "شرح منظم",
    description: "كل الكورسات مرتبة بشكل يسهل عليك المذاكرة خطوة بخطوة.",
  },
  {
    icon: Video,
    title: "محاضرات بجودة عالية",
    description: "شاهد جميع الدروس في أي وقت ومن أي جهاز.",
  },
  {
    icon: FileText,
    title: "مذكرات وملفات",
    description: "تحميل جميع الملازم والملفات الخاصة بكل درس.",
  },
  {
    icon: Trophy,
    title: "امتحانات",
    description: "اختبر نفسك بعد كل درس واعرف مستواك الحقيقي.",
  },
  {
    icon: BarChart3,
    title: "متابعة التقدم",
    description: "اعرف نسبة إنجازك في كل كورس بسهولة.",
  },
  {
    icon: Smartphone,
    title: "يعمل على كل الأجهزة",
    description: "كمبيوتر، تابلت أو موبايل بدون أي مشاكل.",
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