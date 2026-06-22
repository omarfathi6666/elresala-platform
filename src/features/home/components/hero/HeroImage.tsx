import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
      <div className="absolute h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute h-[340px] w-[340px] rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl" />

      <Image
        src="/images/omar-fathy.png"
        alt="Mr Omar Fathy"
        width={430}
        height={620}
        priority
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      />

      <div className="absolute right-0 top-10 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
        <p className="text-xs text-blue-100">المادة الأساسية</p>
        <h3 className="mt-1 text-lg font-bold text-white">
          الأحياء | 3 ثانوي
        </h3>
      </div>

      <div className="absolute bottom-10 left-0 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
        <p className="text-xs text-blue-100">مادة إضافية</p>
        <h3 className="mt-1 text-lg font-bold text-white">
          العلوم المتكاملة
        </h3>
      </div>
    </div>
  );
}