-- Ensure parent phone can be shared across multiple students.
DROP INDEX IF EXISTS "Student_parentPhone_key";

-- Add availability controls for exams.
CREATE TYPE "ExamAvailabilityMode" AS ENUM (
  'IMMEDIATELY',
  'AFTER_LECTURE_COMPLETION',
  'SPECIFIC_DATE',
  'HIDDEN'
);

ALTER TABLE "Exam"
ADD COLUMN "availabilityMode" "ExamAvailabilityMode" NOT NULL DEFAULT 'IMMEDIATELY',
ADD COLUMN "availableFrom" TIMESTAMP(3);
