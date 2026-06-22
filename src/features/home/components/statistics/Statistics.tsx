import { Users, BookOpen, Trophy, FileCheck } from "lucide-react";

import Container from "@/components/ui/Container";
import StatisticCard from "./StatisticCard";

const statistics = [
  {
    icon: Users,
    value: "+500",
    label: "طالب على المنصة",
  },
  {
    icon: BookOpen,
    value: "+150",
    label: "محاضرة",
  },
  {
    icon: FileCheck,
    value: "+80",
    label: "امتحان إلكتروني",
  },
  {
    icon: Trophy,
    value: "98%",
    label: "نسبة النجاح",
  },
];

export default function Statistics() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900">
            أرقام نفتخر بها
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            رحلة نجاح مستمرة مع طلاب مستر عمر فتحي.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item) => (
            <StatisticCard key={item.label} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}