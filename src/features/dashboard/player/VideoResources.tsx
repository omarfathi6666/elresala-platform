import {
  FileText,
  ClipboardList,
  FileQuestion,
  Paperclip,
} from "lucide-react";

const resources = [
  {
    title: "PDF",
    visible: true,
    icon: FileText,
  },
  {
    title: "الواجب",
    visible: false,
    icon: ClipboardList,
  },
  {
    title: "الامتحان",
    visible: true,
    icon: FileQuestion,
  },
  {
    title: "مرفقات",
    visible: false,
    icon: Paperclip,
  },
];

export default function VideoResources() {
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