import ActivateCodeButton from "./ActivateCodeButton";

interface ActivationWelcomeProps {
  studentName: string;
}

export default function ActivationWelcome({
  studentName,
}: ActivationWelcomeProps) {
  return (
    <>
      <section className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-10 text-right shadow-sm">
        <h1 className="text-4xl font-black text-slate-900">
          👋 أهلاً {studentName}
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          مرحبًا بك في منصة الرسالة التعليمية.
        </p>

        <p className="mt-2 text-lg leading-8 text-slate-600">
          لبدء الدراسة قم بتفعيل كود الاشتراك الخاص بك.
        </p>

        <div className="mt-10">
          <ActivateCodeButton label="تفعيل كود" />
        </div>
      </section>
    </>
  );
}
