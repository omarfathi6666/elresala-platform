import {
  FileText,
  ClipboardList,
  FileQuestion,
} from "lucide-react";

export default function ResourcesCard() {
  const resources = [
    {
      title: "ملف PDF",
      icon: FileText,
      visible: true,
    },
    {
      title: "الواجب",
      icon: ClipboardList,
      visible: false,
    },
    {
      title: "الامتحان",
      icon: FileQuestion,
      visible: true,
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-xl font-bold">
        مرفقات المحاضرة
      </h3>

      <div className="space-y-3">
        {resources
          .filter((item) => item.visible)
          .map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className="flex w-full items-center gap-3 rounded-2xl border p-4 hover:bg-slate-50"
              >
                <Icon size={20} />
                {item.title}
              </button>
            );
          })}
      </div>
    </div>
  );
}