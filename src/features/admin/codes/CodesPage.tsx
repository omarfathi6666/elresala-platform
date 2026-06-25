"use client";

import { useEffect, useState } from "react";
import CodeCard from "./CodeCard";
import CreateCodesForm from "./CreateCodesForm";

interface CodeItem {
  id: string;
  code: string;
  course: {
    title: string;
  };
  maxDevices: number;
  expiresAt: string | null;
  usedCount: number;
  isUsed: boolean;
  createdAt: string;
}

export default function CodesPage() {
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCodes() {
    const response = await fetch("/api/admin/codes");
    const result = await response.json();

    if (result.success) {
      setCodes(result.data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadCodes();
  }, []);

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-black">
        أكواد الاشتراك
      </h1>

      <CreateCodesForm onSuccess={loadCodes} />

      {loading ? (
        <div>جاري التحميل...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {codes.map((code) => (
            <CodeCard
              key={code.id}
              code={code.code}
              course={code.course.title}
              status={code.isUsed ? "used" : "available"}
              maxDevices={code.maxDevices}
              expiresAt={code.expiresAt}
              usedCount={code.usedCount}
              createdAt={code.createdAt}
            />
          ))}
        </div>
      )}

    </div>
  );
}