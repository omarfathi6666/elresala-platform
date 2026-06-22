import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileInfoCard from "./ProfileInfoCard";

export default function ProfilePage() {
  return (
    <div className="space-y-8">

      <ProfileHeader />

      <ProfileStats />

      <div className="grid gap-6 md:grid-cols-2">

        <ProfileInfoCard
          label="رقم الهاتف"
          value="01000000000"
        />

        <ProfileInfoCard
          label="رقم ولي الأمر"
          value="01000000000"
        />

        <ProfileInfoCard
          label="المحافظة"
          value="القاهرة"
        />

        <ProfileInfoCard
          label="المرحلة الدراسية"
          value="الثالث الثانوي"
        />

        <ProfileInfoCard
          label="البريد الإلكتروني"
          value="غير مضاف"
        />

      </div>

    </div>
  );
}