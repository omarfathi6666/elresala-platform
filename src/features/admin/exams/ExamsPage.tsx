import ExamForm from "./ExamForm";
import ExamCard from "./ExamCard";

const exams = [
  {
    id: "1",
    title: "امتحان الدعامة",
    questions: 25,
    duration: 40,
  },
];

export default function ExamsPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-black">
        الامتحانات
      </h1>

      <ExamForm />

      <div className="grid gap-6">

        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            {...exam}
          />
        ))}

      </div>

    </div>
  );
}