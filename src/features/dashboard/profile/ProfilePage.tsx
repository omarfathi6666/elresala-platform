import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";
import { StudentService } from "@/services/student/student.service";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileInfoCard from "./ProfileInfoCard";

export default async function ProfilePage() {
  const token = await getSession();

  let name = "الطالب";
  let phone = "غير مضاف";
  let parentPhone = "غير مضاف";
  let governorate = "غير مضاف";
  let grade = "غير مضاف";
  let email = "غير مضاف";
  let watchedLectures = 0;
  let examsCount = 0;
  let averageResult = 0;

  if (token) {
    try {
      const payload = await verifyToken(token);

      if (payload.role === "STUDENT") {
        const summary =
          await StudentService.getProfileSummary(
            payload.id
          );

        name = summary.name;
        phone = summary.phone;
        parentPhone = summary.parentPhone;
        governorate = summary.governorate;
        grade = summary.grade;
        email = summary.email;
        watchedLectures = summary.watchedLectures;
        examsCount = summary.examsCount;
        averageResult = summary.averageResult;
      }
    } catch {
      // Keep safe defaults on invalid session.
    }
  }

  return (
    <div className="space-y-8">

      <ProfileHeader
        name={name}
        grade={grade}
      />

      <ProfileStats
        watchedLectures={watchedLectures}
        examsCount={examsCount}
        averageResult={averageResult}
      />

      <div className="grid gap-6 md:grid-cols-2">

        <ProfileInfoCard
          label="رقم الهاتف"
          value={phone}
        />

        <ProfileInfoCard
          label="رقم ولي الأمر"
          value={parentPhone}
        />

        <ProfileInfoCard
          label="المحافظة"
          value={governorate}
        />

        <ProfileInfoCard
          label="المرحلة الدراسية"
          value={grade}
        />

        <ProfileInfoCard
          label="البريد الإلكتروني"
          value={email}
        />

      </div>

    </div>
  );
}