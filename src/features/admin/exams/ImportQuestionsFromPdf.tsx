"use client";

import { useState } from "react";

interface ParsedQuestion {
  question: string;
  image?: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
  explanation?: string;
  order: number;
}

interface ImportQuestionsFromPdfProps {
  examId: string;
  onImported: () => Promise<void> | void;
}

export default function ImportQuestionsFromPdf({
  examId,
  onImported,
}: ImportQuestionsFromPdfProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loadingPreview, setLoadingPreview] =
    useState(false);
  const [loadingImport, setLoadingImport] =
    useState(false);
  const [parsedQuestions, setParsedQuestions] =
    useState<ParsedQuestion[]>([]);
  const [previewRequested, setPreviewRequested] =
    useState(false);

  async function parsePdf() {
    if (!file) {
      alert("اختر ملف PDF أولاً");
      return;
    }

    setLoadingPreview(true);
    setPreviewRequested(false);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "/api/admin/questions/import/preview",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoadingPreview(false);
      return;
    }

    setParsedQuestions(result.data ?? []);
    setPreviewRequested(true);
    setLoadingPreview(false);
  }

  function removeQuestion(index: number) {
    setParsedQuestions((current) =>
      current
        .filter((_, i) => i !== index)
        .map((item, idx) => ({
          ...item,
          order: idx + 1,
        }))
    );
  }

  function updateQuestion(
    index: number,
    field: keyof ParsedQuestion,
    value: string | number
  ) {
    setParsedQuestions((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  async function importAll() {
    if (parsedQuestions.length === 0) {
      alert("لا توجد أسئلة للاستيراد");
      return;
    }

    setLoadingImport(true);

    const response = await fetch(
      "/api/admin/questions/import/commit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId,
          questions: parsedQuestions,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoadingImport(false);
      return;
    }

    setParsedQuestions([]);
    setFile(null);
    setOpen(false);
    setLoadingImport(false);
    await onImported();
  }

  return (
    <>
      <button
        className="rounded-2xl border px-6 py-3 font-bold"
        onClick={() => setOpen(true)}
      >
        استيراد PDF
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-black">
                استيراد الأسئلة من PDF
              </h2>

              <button onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm space-y-4">
              <input
                type="file"
                accept="application/pdf"
                className="w-full rounded-2xl border p-4"
                onChange={(event) =>
                  setFile(event.target.files?.[0] || null)
                }
              />

              <button
                className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
                onClick={parsePdf}
                disabled={loadingPreview}
              >
                {loadingPreview
                  ? "جاري التحليل..."
                  : "تحليل PDF"}
              </button>
            </div>

            {parsedQuestions.length > 0 && (
              <div className="mt-6 space-y-5">
                {parsedQuestions.map((item, index) => (
                  <div
                    key={`${item.order}-${index}`}
                    className="rounded-3xl bg-white p-6 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        السؤال {index + 1}
                      </h3>

                      <button
                        className="rounded-xl border border-red-300 px-4 py-2 text-red-600"
                        onClick={() => removeQuestion(index)}
                      >
                        حذف
                      </button>
                    </div>

                    <textarea
                      className="w-full rounded-2xl border p-4"
                      value={item.question}
                      onChange={(event) =>
                        updateQuestion(
                          index,
                          "question",
                          event.target.value
                        )
                      }
                    />

                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        className="rounded-2xl border p-4"
                        value={item.choiceA}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "choiceA",
                            event.target.value
                          )
                        }
                        placeholder="A"
                      />

                      <input
                        className="rounded-2xl border p-4"
                        value={item.choiceB}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "choiceB",
                            event.target.value
                          )
                        }
                        placeholder="B"
                      />

                      <input
                        className="rounded-2xl border p-4"
                        value={item.choiceC}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "choiceC",
                            event.target.value
                          )
                        }
                        placeholder="C"
                      />

                      <input
                        className="rounded-2xl border p-4"
                        value={item.choiceD}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "choiceD",
                            event.target.value
                          )
                        }
                        placeholder="D"
                      />
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <select
                        className="rounded-2xl border p-4"
                        value={item.correctAnswer}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "correctAnswer",
                            event.target.value
                          )
                        }
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>

                      <input
                        className="rounded-2xl border p-4"
                        type="number"
                        value={item.order}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "order",
                            Number(event.target.value)
                          )
                        }
                        placeholder="الترتيب"
                      />

                      <input
                        className="rounded-2xl border p-4"
                        value={item.image || ""}
                        onChange={(event) =>
                          updateQuestion(
                            index,
                            "image",
                            event.target.value
                          )
                        }
                        placeholder="رابط الصورة (اختياري)"
                      />
                    </div>

                    <textarea
                      className="w-full rounded-2xl border p-4"
                      value={item.explanation || ""}
                      onChange={(event) =>
                        updateQuestion(
                          index,
                          "explanation",
                          event.target.value
                        )
                      }
                      placeholder="الشرح (اختياري)"
                    />
                  </div>
                ))}

                <button
                  className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
                  onClick={importAll}
                  disabled={loadingImport}
                >
                  {loadingImport
                    ? "جاري الاستيراد..."
                    : "استيراد كل الأسئلة"}
                </button>
              </div>
            )}

            {previewRequested && !loadingPreview && parsedQuestions.length === 0 && (
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-slate-600 font-bold">
                  لم يتم العثور على أسئلة في الملف.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
