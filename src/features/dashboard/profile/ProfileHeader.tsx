export default function ProfileHeader() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 p-8 text-white">
      <div className="flex items-center gap-5">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-700">
          م
        </div>

        <div>

          <h1 className="text-4xl font-extrabold">
            مصطفى
          </h1>

          <p className="mt-2 text-blue-100">
            طالب بالصف الثالث الثانوي
          </p>

        </div>

      </div>
    </div>
  );
}