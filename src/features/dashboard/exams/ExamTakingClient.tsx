"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface QuestionItem {
  id: string;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
}

interface ExamTakingClientProps {
  examId: string;
  questions: QuestionItem[];
}

export default function ExamTakingClient({
  examId,
  questions,
}: ExamTakingClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];

  const currentChoices = useMemo(() => {
    if (!currentQuestion) {
      return [];
    }

    return [
      { key: "A", value: currentQuestion.choiceA },
      { key: "B", value: currentQuestion.choiceB },
      { key: "C", value: currentQuestion.choiceC },
      { key: "D", value: currentQuestion.choiceD },
    ];
  }, [currentQuestion]);

  async function submitExam() {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    const response = await fetch(
      `/api/student/exams/${examId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Something went wrong.");
      setSubmitting(false);
      return;
    }

    router.push(`/dashboard/exams/${examId}/result`);
    router.refresh();
  }

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-slate-200 p-4 text-slate-500">
        No questions available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 p-4">
        <p className="font-semibold text-slate-500">
          Question {currentIndex + 1} / {questions.length}
        </p>
        <p className="mt-2 font-bold text-slate-900">
          {currentQuestion.question}
        </p>
      </div>

      <div className="space-y-3">
        {currentChoices.map((choice) => (
          <label
            key={choice.key}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4"
          >
            <input
              type="radio"
              name={currentQuestion.id}
              value={choice.key}
              checked={answers[currentQuestion.id] === choice.key}
              onChange={() => {
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: choice.key,
                }));
              }}
            />
            <span>{choice.value}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between gap-3">
        <button
          type="button"
          className="rounded-2xl border px-6 py-3"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((value) => value - 1)}
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            type="button"
            className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
            onClick={() =>
              setCurrentIndex((value) => value + 1)
            }
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="rounded-2xl bg-red-600 px-6 py-3 font-bold text-white"
            disabled={submitting}
            onClick={submitExam}
          >
            {submitting ? "Submitting..." : "Submit Exam"}
          </button>
        )}
      </div>
    </div>
  );
}
