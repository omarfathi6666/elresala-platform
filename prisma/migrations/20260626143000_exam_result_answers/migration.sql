CREATE TABLE "ExamResultAnswer" (
  "id" TEXT NOT NULL,
  "resultId" TEXT NOT NULL,
  "questionId" TEXT NOT NULL,
  "studentAnswer" TEXT NOT NULL,
  "correctAnswer" TEXT NOT NULL,
  "isCorrect" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ExamResultAnswer_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ExamResultAnswer_resultId_idx" ON "ExamResultAnswer"("resultId");
CREATE INDEX "ExamResultAnswer_questionId_idx" ON "ExamResultAnswer"("questionId");

ALTER TABLE "ExamResultAnswer"
ADD CONSTRAINT "ExamResultAnswer_resultId_fkey"
FOREIGN KEY ("resultId") REFERENCES "ExamResult"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ExamResultAnswer"
ADD CONSTRAINT "ExamResultAnswer_questionId_fkey"
FOREIGN KEY ("questionId") REFERENCES "Question"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
