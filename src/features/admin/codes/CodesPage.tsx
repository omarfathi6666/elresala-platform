import CodeCard from "./CodeCard";
import CreateCodesForm from "./CreateCodesForm";

const codes = [
  {
    code: "RS-8K2P-X91A",
    course: "الأحياء",
    status: "available" as const,
  },
  {
    code: "RS-1L8Q-T4MN",
    course: "الأحياء",
    status: "used" as const,
  },
];

export default function CodesPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-black">
        أكواد الاشتراك
      </h1>

      <CreateCodesForm />

      <div className="grid gap-6 lg:grid-cols-2">
        {codes.map((code) => (
          <CodeCard
            key={code.code}
            {...code}
          />
        ))}
      </div>

    </div>
  );
}