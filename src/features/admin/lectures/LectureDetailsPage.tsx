import {
  Upload,
  FileText,
  FileQuestion,
  Eye,
  EyeOff,
} from "lucide-react";

import LectureStatusCard from "./LectureStatusCard";
import LectureActionCard from "./LectureActionCard";

export default function LectureDetailsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          الدعامة في النبات
        </h1>

        <p className="mt-2 text-slate-500">
          الأحياء • الفصل الأول
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <LectureStatusCard
          title="الفيديو"
          value="مرفوع"
          color="text-green-600"
        />

        <LectureStatusCard
          title="PDF"
          value="غير موجود"
          color="text-red-500"
        />

        <LectureStatusCard
          title="الامتحان"
          value="مضاف"
          color="text-blue-600"
        />

        <LectureStatusCard
          title="الحالة"
          value="منشورة"
          color="text-green-600"
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <LectureActionCard
          icon={<Upload size={34} />}
          title="رفع أو استبدال الفيديو"
          description="رفع فيديو المحاضرة"
        />

        <LectureActionCard
          icon={<FileText size={34} />}
          title="رفع PDF"
          description="إضافة مذكرة المحاضرة"
        />

        <LectureActionCard
          icon={<FileQuestion size={34} />}
          title="إدارة الامتحان"
          description="إضافة أو تعديل الامتحان"
        />

        <LectureActionCard
          icon={<Eye size={34} />}
          title="معاينة المحاضرة"
          description="فتح صفحة الطالب"
        />

        <LectureActionCard
          icon={<EyeOff size={34} />}
          title="إخفاء المحاضرة"
          description="عدم ظهورها للطلاب"
        />

      </div>

    </div>
  );
}