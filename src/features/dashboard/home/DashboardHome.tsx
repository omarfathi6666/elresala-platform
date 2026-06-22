import WelcomeCard from "./WelcomeCard";
import StatsGrid from "./StatsGrid";
import ContinueCard from "./ContinueCard";
import ProgressCard from "./ProgressCard";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <WelcomeCard />

      <StatsGrid />

      <div className="grid gap-8 lg:grid-cols-2">
        <ContinueCard />
        <ProgressCard />
      </div>
    </div>
  );
}