import { Dna, Microscope } from "lucide-react";

import Container from "@/components/ui/Container";
import SubjectCard from "./SubjectCard";

const subjects = [
  {
    title: "الأحياء",
    grade: "الصف الثالث الثانوي",
    description:
      "شرح المنهج بالكامل، مراجعات نهائية، امتحانات إلكترونية وبنك أسئلة شامل.",
    lessons: 42,
    exams: 18,
    students: 500,
    href: "/courses/biology",
    icon: Dna,
  },
  {
    title: "العلوم المتكاملة",
    grade: "الصف الأول الثانوي",
    description:
      "شرح مبسط مع تدريبات مستمرة وامتحانات تساعدك على إتقان المنهج.",
    lessons: 24,
    exams: 10,
    students: 250,
    href: "/courses/integrated-science",
    icon: Microscope,
  },
];

export default function Subjects() {
  return (
    <section id="courses" className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            المواد المتاحة
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            كورسات تعليمية منظمة باحتراف
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            محتوى أكاديمي مصمم بعناية لطلاب الأحياء والعلوم المتكاملة مع متابعة
            مستمرة وامتحانات دورية.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {subjects.map((subject) => (
            <SubjectCard key={subject.title} {...subject} />
          ))}
        </div>
      </Container>
    </section>
  );
}