import {
  BookOpen,
  FolderOpen,
  PlayCircle,
  Video,
  FileText,
  FileQuestion,
} from "lucide-react";

import WizardProgress from "./WizardProgress";
import StepCard from "./StepCard";

export default function ContentWizardPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          إنشاء محتوى جديد
        </h1>

        <p className="mt-2 text-slate-500">
          اتبع الخطوات لإضافة محاضرة كاملة.
        </p>

      </div>

      <WizardProgress />

      <div className="grid gap-6 lg:grid-cols-2">

        <StepCard
          icon={<BookOpen size={34} />}
          title="اختيار المادة"
          description="الأحياء أو العلوم المتكاملة"
        />

        <StepCard
          icon={<FolderOpen size={34} />}
          title="اختيار الفصل"
          description="أو إنشاء فصل جديد"
        />

        <StepCard
          icon={<PlayCircle size={34} />}
          title="إنشاء المحاضرة"
          description="اسم وترتيب المحاضرة"
        />

        <StepCard
          icon={<Video size={34} />}
          title="رفع الفيديو"
          description="فيديو واحد للمحاضرة"
        />

        <StepCard
          icon={<FileText size={34} />}
          title="إضافة PDF"
          description="اختياري"
        />

        <StepCard
          icon={<FileQuestion size={34} />}
          title="إنشاء الامتحان"
          description="يدوي أو استيراد PDF"
        />

      </div>

    </div>
  );
}