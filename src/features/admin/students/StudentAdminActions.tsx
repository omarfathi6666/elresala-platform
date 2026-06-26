"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface StudentAdminActionsProps {
  studentId: string;
  isActive: boolean;
}

export default function StudentAdminActions({
  studentId,
  isActive,
}: StudentAdminActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState("");

  async function callAction(url: string, method: string) {
    setLoadingAction(url);

    const response = await fetch(url, {
      method,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Something went wrong.");
      setLoadingAction("");
      return;
    }

    if (result.data?.temporaryPassword) {
      alert(`Temporary password: ${result.data.temporaryPassword}`);
    }

    setLoadingAction("");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-3">
      {isActive ? (
        <button
          type="button"
          disabled={loadingAction.length > 0}
          onClick={() =>
            callAction(
              `/api/admin/students/${studentId}/suspend`,
              "PATCH"
            )
          }
          className="rounded-2xl bg-red-600 px-6 py-3 font-bold text-white"
        >
          Suspend Student
        </button>
      ) : (
        <button
          type="button"
          disabled={loadingAction.length > 0}
          onClick={() =>
            callAction(
              `/api/admin/students/${studentId}/activate`,
              "PATCH"
            )
          }
          className="rounded-2xl bg-green-600 px-6 py-3 font-bold text-white"
        >
          Activate Student
        </button>
      )}

      <button
        type="button"
        disabled={loadingAction.length > 0}
        onClick={() =>
          callAction(
            `/api/admin/students/${studentId}/reset-password`,
            "PATCH"
          )
        }
        className="rounded-2xl border border-slate-300 px-6 py-3 font-bold text-slate-700"
      >
        Reset Password
      </button>
    </div>
  );
}
