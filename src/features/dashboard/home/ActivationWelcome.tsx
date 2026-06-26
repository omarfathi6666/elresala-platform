"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ActivationWelcomeProps {
  studentName: string;
}

export default function ActivationWelcome({
  studentName,
}: ActivationWelcomeProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function activate() {
    if (!code.trim()) {
      alert("Invalid activation code.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      "/api/student/subscription/activate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    toast.success("Activation successful.");

    setIsOpen(false);
    setCode("");
    setLoading(false);

    router.refresh();

    const scope = result.data?.scope;

    if (scope?.lectureId) {
      router.push(
        `/dashboard/player/${scope.lectureId}`
      );
      return;
    }

    if (scope?.chapterId) {
      router.push(
        `/dashboard/chapters/${scope.chapterId}`
      );
      return;
    }

    if (scope?.courseId) {
      router.push(
        `/dashboard/courses/${scope.courseId}`
      );
      return;
    }
  }

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

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-10 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
        >
          تفعيل كود
        </button>
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900">
              تفعيل الاشتراك
            </h2>

            <label className="mt-6 block text-sm font-bold text-slate-700">
              كود الاشتراك
            </label>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="RS-XXXX-XXXX"
              className="mt-2 w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!loading) {
                    setIsOpen(false);
                  }
                }}
                className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={activate}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
              >
                {loading ? "جاري التفعيل..." : "تفعيل"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
