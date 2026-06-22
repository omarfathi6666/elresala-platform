import StudentCard from "./StudentCard";

const students = [
  {
    id: "1",
    name: "مصطفى",
    phone: "01000000000",
    governorate: "القاهرة",
    grade: "الثالث الثانوي",
    active: true,
  },
  {
    id: "2",
    name: "أحمد",
    phone: "01111111111",
    governorate: "الجيزة",
    grade: "الثالث الثانوي",
    active: false,
  },
];

export default function StudentsPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-black">
          الطلاب
        </h1>

        <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
          + طالب جديد
        </button>

      </div>

      <input
        placeholder="بحث بالاسم أو رقم الهاتف..."
        className="w-full rounded-2xl border bg-white p-4 outline-none focus:border-blue-600"
      />

      <div className="grid gap-6 lg:grid-cols-2">

        {students.map((student) => (
          <StudentCard
            key={student.id}
            {...student}
          />
        ))}

      </div>

    </div>
  );
}