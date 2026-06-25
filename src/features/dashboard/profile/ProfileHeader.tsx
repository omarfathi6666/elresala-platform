interface ProfileHeaderProps {
  name: string;
  grade: string;
}

export default function ProfileHeader({
  name,
  grade,
}: ProfileHeaderProps) {
  const firstLetter =
    name.trim().charAt(0) || "ط";

  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 p-8 text-white">
      <div className="flex items-center gap-5">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-700">
          {firstLetter}
        </div>

        <div>

          <h1 className="text-4xl font-extrabold">
            {name}
          </h1>

          <p className="mt-2 text-blue-100">
            طالب بالصف {grade}
          </p>

        </div>

      </div>
    </div>
  );
}