import PlatformSettingsCard from "./PlatformSettingsCard";
import TeacherSettingsCard from "./TeacherSettingsCard";
import SecuritySettingsCard from "./SecuritySettingsCard";
import SystemSettingsCard from "./SystemSettingsCard";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-black">
        إعدادات المنصة
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        <PlatformSettingsCard />

        <TeacherSettingsCard />

        <SecuritySettingsCard />

        <SystemSettingsCard />

      </div>

    </div>
  );
}