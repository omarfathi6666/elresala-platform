interface WelcomeCardProps {
  studentName: string;
}

export default function WelcomeCard({
  studentName,
}: WelcomeCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white shadow-xl">
      <p className="text-blue-100">
        أهلاً بعودتك
      </p>

      <h2 className="mt-2 text-3xl font-extrabold">
        {studentName} 👋
      </h2>

      <p className="mt-4 max-w-2xl text-blue-100 leading-8">
        استمر في التعلم، لقد أنهيت جزءًا رائعًا من رحلتك التعليمية.
      </p>
    </div>
  );
}