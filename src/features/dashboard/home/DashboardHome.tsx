import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";
import { StudentService } from "@/services/student/student.service";
import WelcomeCard from "./WelcomeCard";
import StatsGrid from "./StatsGrid";
import ContinueCard from "./ContinueCard";
import ProgressCard from "./ProgressCard";

export default async function DashboardHome() {
  const token = await getSession();

  let studentName = "الطالب";
  let watchedLectures = 0;
  let examsCount = 0;
  let progress = 0;

  if (token) {
    try {
      const payload = await verifyToken(token);

      if (payload.role === "STUDENT") {
        const summary =
          await StudentService.getDashboardSummary(
            payload.id
          );

        studentName = summary.studentName;
        watchedLectures = summary.watchedLectures;
        examsCount = summary.examsCount;
        progress = summary.progress;
      }
    } catch {
      // Keep safe zero/default values if token is invalid.
    }
  }

  return (
    <div className="space-y-8">
      <WelcomeCard studentName={studentName} />

      <StatsGrid
        watchedLectures={watchedLectures}
        examsCount={examsCount}
        progress={progress}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ContinueCard />
        <ProgressCard progress={progress} />
      </div>
    </div>
  );
}