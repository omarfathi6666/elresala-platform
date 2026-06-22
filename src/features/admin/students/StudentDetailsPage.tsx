import StudentInfoCard from "./StudentInfoCard";
import StudentCoursesCard from "./StudentCoursesCard";
import StudentCodesCard from "./StudentCodesCard";
import StudentExamsCard from "./StudentExamsCard";

export default function StudentDetailsPage() {
  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 p-8 text-white">

        <h1 className="text-4xl font-black">
          مصطفى
        </h1>

        <p className="mt-2">
          الملف الشخصي للطالب
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <StudentInfoCard
          label="رقم الهاتف"
          value="01000000000"
        />

        <StudentInfoCard
          label="ولي الأمر"
          value="01000000000"
        />

        <StudentInfoCard
          label="المحافظة"
          value="القاهرة"
        />

        <StudentInfoCard
          label="المرحلة"
          value="الثالث الثانوي"
        />

      </div>

      <StudentCoursesCard />

      <StudentCodesCard />

      <StudentExamsCard />

      <div className="flex gap-4">

        <button className="rounded-2xl bg-green-600 px-6 py-3 font-bold text-white">
          تفعيل الحساب
        </button>

        <button className="rounded-2xl bg-red-600 px-6 py-3 font-bold text-white">
          إيقاف الحساب
        </button>

      </div>

    </div>
  );
}