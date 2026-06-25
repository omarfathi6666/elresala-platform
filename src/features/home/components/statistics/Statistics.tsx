import Container from "@/components/ui/Container";
import StatisticCard from "./StatisticCard";

const statistics = [
  {
    icon: "users",
    target: 500,
    prefix: "+",
    label: "الطلاب",
  },
  {
    icon: "book",
    target: 150,
    prefix: "+",
    label: "المحاضرات",
  },
  {
    icon: "exam",
    target: 80,
    prefix: "+",
    label: "الامتحانات",
  },
  {
    icon: "trophy",
    target: 98,
    suffix: "%",
    label: "نسبة النجاح",
  },
] as const;

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