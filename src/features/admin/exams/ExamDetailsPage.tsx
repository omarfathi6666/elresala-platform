"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ExamForm from "./ExamForm";
import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";
import ImportQuestionsFromPdf from "./ImportQuestionsFromPdf";

interface Exam {
  id: string;
  title: string;
  duration: number;
  totalMarks: number;
  availabilityMode:
    | "IMMEDIATELY"
    | "AFTER_LECTURE_COMPLETION"
    | "SPECIFIC_DATE"
    | "HIDDEN";
  availableFrom?: string | null;
  questions: ExamQuestion[];
}

interface ExamQuestion {
  id: string;
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

interface LectureExamEntry {
  id: string;
  title: string;
  chapter: {
    title: string;
    course: {
      title: string;
    };
  };
  exams: Exam[];
}

interface ExamDetailsPageProps {
  lectureId: string;
}

export default function ExamDetailsPage({
  lectureId,
}: ExamDetailsPageProps) {
  const router = useRouter();
  const [lecture, setLecture] =
    useState<LectureExamEntry | null>(null);
  const [showQuestionForm, setShowQuestionForm] =
    useState(false);
  const [showExamForm, setShowExamForm] =
    useState(false);
  const [showEditExamForm, setShowEditExamForm] =
    useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<ExamQuestion | null>(null);

  async function loadLecture() {
    const response = await fetch(
      `/api/admin/lectures/${lectureId}`
    );

    const result = await response.json();

    if (result.success) {
      setLecture(result.data);
    }
  }

  useEffect(() => {
    loadLecture();
  }, [lectureId]);

  const exam = useMemo(
    () => lecture?.exams?.[0],
    [lecture]
  );

  const sortedQuestions = useMemo(
    () =>
      [...(exam?.questions || [])].sort(
        (a, b) => a.order - b.order
      ),
    [exam]
  );

  async function deleteQuestion(questionId: string) {
    if (!confirm("هل أنت متأكد من حذف السؤال؟")) {
      return;
    }

    const response = await fetch(
      `/api/admin/questions/${questionId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    await loadLecture();
  }

  async function deleteExam(examId: string) {
    if (!confirm("هل أنت متأكد من حذف الامتحان؟")) {
      return;
    }

    const response = await fetch(
      `/api/admin/exams/${examId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.push(`/admin/lectures/${lectureId}`);
  }

  if (!lecture) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">
            {lecture.title}
          </h1>

          <p className="text-slate-500 mt-2">
            {lecture.chapter.course.title} • {lecture.chapter.title}
          </p>
        </div>
      </div>

      {!exam ? (
        <>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black">
              لا يوجد امتحان لهذه المحاضرة
            </h2>

            <button
              className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
              onClick={() => setShowExamForm(true)}
            >
              إنشاء امتحان
            </button>
          </div>

          {showExamForm && (
            <ExamForm
              lectureId={lecture.id}
              onSuccess={async () => {
                setShowExamForm(false);
                await loadLecture();
              }}
            />
          )}
        </>
      ) : (
        <>
          <div className="rounded-3xl bg-white p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-3xl font-black">
                {exam.title}
              </h2>

              <p className="mt-2 text-slate-500">
                {exam.duration} دقيقة • {exam.totalMarks} درجة • {exam.questions.length} سؤال
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
                onClick={() => setShowEditExamForm(true)}
              >
                تعديل الامتحان
              </button>

              <button
                className="rounded-2xl bg-red-600 px-6 py-3 font-bold text-white"
                onClick={() => deleteExam(exam.id)}
              >
                حذف الامتحان
              </button>

              <button
                className="rounded-2xl border px-6 py-3 font-bold"
                onClick={() => {
                  setEditingQuestion(null);
                  setShowQuestionForm(true);
                }}
              >
                إدارة الأسئلة
              </button>

              <ImportQuestionsFromPdf
                examId={exam.id}
                onImported={loadLecture}
              />
            </div>
          </div>

          {showEditExamForm && (
            <ExamForm
              lectureId={lecture.id}
              examId={exam.id}
              initialData={{
                title: exam.title,
                duration: exam.duration,
                totalMarks: exam.totalMarks,
                availabilityMode: exam.availabilityMode,
                availableFrom: exam.availableFrom,
              }}
              onSuccess={async () => {
                setShowEditExamForm(false);
                await loadLecture();
              }}
            />
          )}

          {(showQuestionForm || editingQuestion) && (
            <QuestionForm
              examId={exam.id}
              questionId={editingQuestion?.id}
              initialData={
                editingQuestion
                  ? {
                      question: editingQuestion.question,
                      image: editingQuestion.image,
                      choiceA: editingQuestion.choiceA,
                      choiceB: editingQuestion.choiceB,
                      choiceC: editingQuestion.choiceC,
                      choiceD: editingQuestion.choiceD,
                      correctAnswer: editingQuestion.correctAnswer,
                      explanation: editingQuestion.explanation,
                      order: editingQuestion.order,
                    }
                  : undefined
              }
              onCancel={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
              onSuccess={async () => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
                await loadLecture();
              }}
            />
          )}

          <div className="space-y-5">
            {sortedQuestions.map((question, index) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                number={index + 1}
                question={question.question}
                image={question.image}
                choiceA={question.choiceA}
                choiceB={question.choiceB}
                choiceC={question.choiceC}
                choiceD={question.choiceD}
                correctAnswer={question.correctAnswer}
                explanation={question.explanation}
                order={question.order}
                onEdit={() => {
                  setEditingQuestion(question);
                  setShowQuestionForm(false);
                }}
                onDelete={() => deleteQuestion(question.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}