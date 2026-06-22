"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({
  question,
  answer,
}: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-right"
      >
        <span className="text-lg font-bold text-slate-900">
          {question}
        </span>

        <ChevronDown
          size={22}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-slate-100 px-6 pb-6 pt-4">
          <p className="leading-8 text-slate-600">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}