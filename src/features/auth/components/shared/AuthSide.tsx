import Image from "next/image";

export default function AuthSide() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-12">
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 max-w-lg text-center text-white">
        <Image
          src="/images/omar-fathy.png"
          alt="Mr Omar Fathy"
          width={340}
          height={500}
          priority
          className="mx-auto mb-8 h-auto w-auto drop-shadow-2xl"
        />

        <h2 className="text-4xl font-extrabold leading-tight">
          مرحبًا بك في
          <br />
          منصة الرسالة التعليمية
        </h2>

        <p className="mt-6 text-lg leading-8 text-blue-100">
          تعلم الأحياء للصف الثالث الثانوي والعلوم المتكاملة للصف الأول
          الثانوي مع مستر عمر فتحي.
        </p>
      </div>
    </div>
  );
}