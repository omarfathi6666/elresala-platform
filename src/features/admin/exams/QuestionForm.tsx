"use client";

import { useEffect, useState } from "react";

interface QuestionInitialData {
  question: string;
  image?: string | null;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
  explanation?: string | null;
  order: number;
}

interface QuestionFormProps {
  examId: string;
  questionId?: string;
  initialData?: QuestionInitialData;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function QuestionForm({
  examId,
  questionId,
  initialData,
  onSuccess,
  onCancel,
}: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [explanation, setExplanation] = useState("");
  const [order, setOrder] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setQuestion(initialData.question);
    setImage(initialData.image || "");
    setChoiceA(initialData.choiceA);
    setChoiceB(initialData.choiceB);
    setChoiceC(initialData.choiceC);
    setChoiceD(initialData.choiceD);
    setCorrectAnswer(initialData.correctAnswer);
    setExplanation(initialData.explanation || "");
    setOrder(initialData.order);
  }, [initialData]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(
      questionId
        ? `/api/admin/questions/${questionId}`
        : "/api/admin/questions",
      {
        method: questionId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId,
          question,
          image,
          choiceA,
          choiceB,
          choiceC,
          choiceD,
          correctAnswer,
          explanation,
          order,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    if (!questionId) {
      setQuestion("");
      setImage("");
      setChoiceA("");
      setChoiceB("");
      setChoiceC("");
      setChoiceD("");
      setCorrectAnswer("A");
      setExplanation("");
      setOrder(1);
    }

    setLoading(false);
    onSuccess?.();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl bg-white p-8 shadow-sm"
    >

      <h2 className="text-3xl font-black mb-8">
        {questionId ? "تعديل السؤال" : "إضافة سؤال"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <textarea
          className="rounded-2xl border p-4 md:col-span-2"
          placeholder="نص السؤال"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          className="rounded-2xl border p-4 md:col-span-2"
          placeholder="رابط الصورة (اختياري)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="rounded-2xl border p-4"
          placeholder="الاختيار A"
          value={choiceA}
          onChange={(e) => setChoiceA(e.target.value)}
        />

        <input
          className="rounded-2xl border p-4"
          placeholder="الاختيار B"
          value={choiceB}
          onChange={(e) => setChoiceB(e.target.value)}
        />

        <input
          className="rounded-2xl border p-4"
          placeholder="الاختيار C"
          value={choiceC}
          onChange={(e) => setChoiceC(e.target.value)}
        />

        <input
          className="rounded-2xl border p-4"
          placeholder="الاختيار D"
          value={choiceD}
          onChange={(e) => setChoiceD(e.target.value)}
        />

        <select
          className="rounded-2xl border p-4"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="A">الإجابة الصحيحة: A</option>
          <option value="B">الإجابة الصحيحة: B</option>
          <option value="C">الإجابة الصحيحة: C</option>
          <option value="D">الإجابة الصحيحة: D</option>
        </select>

        <input
          type="number"
          className="rounded-2xl border p-4"
          placeholder="ترتيب السؤال"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />

        <textarea
          className="rounded-2xl border p-4 md:col-span-2"
          placeholder="الشرح (اختياري)"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />

      </div>

      <div className="mt-8 flex gap-3">
        <button
          disabled={loading}
          className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
        >
          {loading
            ? "جاري الحفظ..."
            : questionId
              ? "تعديل السؤال"
              : "حفظ السؤال"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border px-8 py-4 font-bold"
          >
            إلغاء
          </button>
        )}
      </div>

    </form>
  );
}