"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ActivationActionsProps {
  studentId: string;
  codeId: string;
}

export default function ActivationActions({
  studentId,
  codeId,
}: ActivationActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function run(method: "PATCH" | "DELETE") {
    setLoading(true);

    const response = await fetch(
      `/api/admin/students/${studentId}/activations/${codeId}`,
      {
        method,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Something went wrong.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={loading}
        onClick={() => run("PATCH")}
        className="rounded-xl border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700"
      >
        Deactivate Code
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={() => run("DELETE")}
        className="rounded-xl border border-red-200 px-3 py-1 text-xs font-bold text-red-600"
      >
        Delete Activation
      </button>
    </div>
  );
}
