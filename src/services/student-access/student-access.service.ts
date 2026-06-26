import StudentRepository from "@/repositories/student/student.repository";
import { StudentAccessRepository } from "@/repositories/student-access";

type ExamAvailabilityMode =
  | "IMMEDIATELY"
  | "AFTER_LECTURE_COMPLETION"
  | "SPECIFIC_DATE"
  | "HIDDEN";

interface ExamVisibilityShape {
  lectureId: string;
  availabilityMode: ExamAvailabilityMode;
  availableFrom: Date | null;
}

interface AccessMap {
  courseIds: string[];
  chapterIds: string[];
  lectureIds: string[];
}

interface LectureExamEntry {
  id: string;
  title: string;
  isAvailable: boolean;
  hasSubmitted: boolean;
}

interface SubmitExamDto {
  examId: string;
  answers: Record<string, string>;
}

export class StudentAccessService {
  private static normalizeAnswer(value: string) {
    return value.trim().toUpperCase();
  }

  private static unique(values: string[]) {
    return Array.from(new Set(values));
  }

  private static isExamVisible(
    exam: ExamVisibilityShape,
    now: Date,
    completedLectureIds: Set<string>
  ) {
    if (exam.availabilityMode === "HIDDEN") {
      return false;
    }

    if (
      exam.availabilityMode ===
      "AFTER_LECTURE_COMPLETION"
    ) {
      return completedLectureIds.has(exam.lectureId);
    }

    if (exam.availabilityMode === "SPECIFIC_DATE") {
      if (!exam.availableFrom) {
        return false;
      }

      return exam.availableFrom <= now;
    }

    return true;
  }

  private static async getCompletedLectureIds(studentId: string) {
    const results =
      await StudentAccessRepository.findExamResultsByStudentId(
        studentId
      );

    return new Set(
      results.map((result) => result.exam.lectureId)
    );
  }

  static async getAccessMap(studentId: string): Promise<AccessMap> {
    const activeCodes =
      await StudentAccessRepository.findActiveCodesByStudentId(
        studentId,
        new Date()
      );

    if (activeCodes.length === 0) {
      return {
        courseIds: [],
        chapterIds: [],
        lectureIds: [],
      };
    }

    const courseIds = this.unique(
      activeCodes.map((code) => code.courseId)
    );

    const explicitChapterIds = this.unique(
      activeCodes
        .map((code) => code.chapterId)
        .filter((value): value is string => Boolean(value))
    );

    const explicitLectureIds = this.unique(
      activeCodes
        .map((code) => code.lectureId)
        .filter((value): value is string => Boolean(value))
    );

    const courseScopedCourseIds = this.unique(
      activeCodes
        .filter(
          (code) => !code.chapterId && !code.lectureId
        )
        .map((code) => code.courseId)
    );

    const chapterIdsFromCourseScope = (
      await StudentAccessRepository.findChaptersByCourseIds(
        courseScopedCourseIds
      )
    ).map((chapter) => chapter.id);

    const chapterIdsFromLectureScope = this.unique(
      activeCodes
        .map((code) => code.lecture?.chapterId)
        .filter((value): value is string => Boolean(value))
    );

    const chapterIds = this.unique([
      ...explicitChapterIds,
      ...chapterIdsFromCourseScope,
      ...chapterIdsFromLectureScope,
    ]);

    const lectureIdsFromChapterScope = (
      await StudentAccessRepository.findLecturesByChapterIds(
        chapterIds
      )
    ).map((lecture) => lecture.id);

    const lectureIds = this.unique([
      ...explicitLectureIds,
      ...lectureIdsFromChapterScope,
    ]);

    return {
      courseIds,
      chapterIds,
      lectureIds,
    };
  }

  static async hasAnyAccess(studentId: string) {
    const map = await this.getAccessMap(studentId);

    return map.courseIds.length > 0;
  }

  static async getHomeData(studentId: string) {
    const student = await StudentRepository.findById(studentId);

    if (!student) {
      throw new Error("Student not found.");
    }

    const map = await this.getAccessMap(studentId);

    const results =
      await StudentAccessRepository.findExamResultsByStudentId(
        studentId
      );

    const averageScore =
      results.length === 0
        ? 0
        : Math.round(
            results.reduce((sum, item) => {
              if (item.total <= 0) {
                return sum;
              }

              return sum + (item.score / item.total) * 100;
            }, 0) / results.length
          );

    const completedExamIds = this.unique(
      results.map((result) => result.examId)
    );

    const completedLectureIds = this.unique(
      results.map((result) => result.exam.lectureId)
    );

    const allowedExams =
      await StudentAccessRepository.findExamsByLectureIds(
        map.lectureIds
      );

    const progress =
      allowedExams.length === 0
        ? 0
        : Math.round(
            (completedExamIds.length /
              allowedExams.length) *
              100
          );

    const latestResult = results[0];

    const latestLecture = latestResult
      ? {
          id: latestResult.exam.lecture.id,
          title: latestResult.exam.lecture.title,
        }
      : null;

    return {
      studentName: student.name,
      hasAccess: map.courseIds.length > 0,
      stats: {
        completedLectures: completedLectureIds.length,
        completedExams: completedExamIds.length,
        averageScore,
        progress,
        latestLecture,
      },
      quickCards: [
        {
          title: "📚 موادي",
          href: "/dashboard/courses",
        },
        {
          title: "📝 امتحاناتي",
          href: "/dashboard/exams",
        },
        {
          title: "📈 تقدمي",
          href: "/dashboard",
        },
        {
          title: "🏆 درجاتي",
          href: "/dashboard/exams",
        },
        {
          title: "⚙️ حسابي",
          href: "/dashboard/profile",
        },
      ],
    };
  }

  static async getAllowedCourses(studentId: string) {
    const map = await this.getAccessMap(studentId);

    return StudentAccessRepository.findCoursesByIds(map.courseIds);
  }

  static async getCoursesWithAccess(studentId: string) {
    const map = await this.getAccessMap(studentId);
    const courses = await StudentAccessRepository.findAllCourses();

    return courses.map((course) => ({
      ...course,
      isLocked: !map.courseIds.includes(course.id),
    }));
  }

  static async getAllowedChapters(studentId: string) {
    const map = await this.getAccessMap(studentId);

    const chapters =
      await StudentAccessRepository.findChaptersByCourseIds(
        map.courseIds
      );

    return chapters.filter((chapter) =>
      map.chapterIds.includes(chapter.id)
    );
  }

  static async getChaptersWithAccess(studentId: string) {
    const map = await this.getAccessMap(studentId);
    const chapters = await StudentAccessRepository.findAllChapters();

    return chapters.map((chapter) => ({
      ...chapter,
      isLocked: !map.chapterIds.includes(chapter.id),
    }));
  }

  static async getCoursePageData(
    studentId: string,
    courseId: string
  ) {
    const map = await this.getAccessMap(studentId);

    if (!map.courseIds.includes(courseId)) {
      return null;
    }

    const course =
      await StudentAccessRepository.findCourseWithContent(
        courseId
      );

    if (!course) {
      return null;
    }

    const chapters = course.chapters
      .filter((chapter) => map.chapterIds.includes(chapter.id))
      .map((chapter) => ({
        ...chapter,
        lectures: chapter.lectures
          .filter((lecture) =>
            map.lectureIds.includes(lecture.id)
          )
          .map((lecture) => ({
            ...lecture,
            exams: lecture.exams,
          })),
      }))
      .filter((chapter) => chapter.lectures.length > 0);

    const lectures = chapters.flatMap((chapter) =>
      chapter.lectures.map((lecture) => ({
        ...lecture,
        chapter,
      }))
    );

    const examResults =
      await StudentAccessRepository.findExamResultsByStudentId(
        studentId
      );

    const completedLectureIds = new Set(
      examResults.map((result) => result.exam.lectureId)
    );

    const now = new Date();

    const exams = chapters.flatMap((chapter) =>
      chapter.lectures.flatMap((lecture) =>
        lecture.exams
          .filter((exam) =>
            this.isExamVisible(
              exam,
              now,
              completedLectureIds
            )
          )
          .map((exam) => ({
            ...exam,
            lecture,
            chapter,
          }))
      )
    );

    const courseResults = examResults.filter(
      (result) =>
        result.exam.lecture.chapter.courseId === courseId
    );

    const progress =
      exams.length === 0
        ? 0
        : Math.round(
            (courseResults.length / exams.length) * 100
          );

    return {
      course,
      chapters,
      lectures,
      exams,
      progress,
    };
  }

  static async getChapterPageData(
    studentId: string,
    chapterId: string
  ) {
    const map = await this.getAccessMap(studentId);

    if (!map.chapterIds.includes(chapterId)) {
      return null;
    }

    const chapter =
      await StudentAccessRepository.findChapterWithContent(
        chapterId
      );

    if (!chapter) {
      return null;
    }

    const completedLectureIds =
      await this.getCompletedLectureIds(studentId);
    const now = new Date();

    const lectures = chapter.lectures
      .filter((lecture) => map.lectureIds.includes(lecture.id))
      .map((lecture) => ({
        ...lecture,
        exams: lecture.exams.filter((exam) =>
          this.isExamVisible(
            exam,
            now,
            completedLectureIds
          )
        ),
      }));

    return {
      chapter,
      lectures,
      exams: lectures.flatMap((lecture) => lecture.exams),
    };
  }

  static async getLecturePageData(
    studentId: string,
    lectureId: string
  ) {
    const map = await this.getAccessMap(studentId);

    if (!map.lectureIds.includes(lectureId)) {
      return null;
    }

    const lecture =
      await StudentAccessRepository.findLectureWithContent(
        lectureId
      );

    if (!lecture) {
      return null;
    }

    const completedLectureIds =
      await this.getCompletedLectureIds(studentId);
    const results =
      await StudentAccessRepository.findExamResultsByStudentId(
        studentId
      );
    const submittedExamIds = new Set(
      results.map((result) => result.examId)
    );
    const now = new Date();

    const exams: LectureExamEntry[] = lecture.exams
      .filter((exam) => exam.availabilityMode !== "HIDDEN")
      .map((exam) => {
        const isAvailable = this.isExamVisible(
          exam,
          now,
          completedLectureIds
        );

        return {
          id: exam.id,
          title: exam.title,
          isAvailable,
          hasSubmitted: submittedExamIds.has(exam.id),
        };
      });

    return {
      ...lecture,
      exams,
    };
  }

  static async getAllowedLectures(studentId: string) {
    const map = await this.getAccessMap(studentId);

    const lectureIds = map.lectureIds;

    if (lectureIds.length === 0) {
      return [];
    }

    const lectures =
      await StudentAccessRepository.findLecturesByChapterIds(
        map.chapterIds
      );

    return lectures.filter((lecture) =>
      lectureIds.includes(lecture.id)
    );
  }

  static async getLecturesWithAccess(studentId: string) {
    const map = await this.getAccessMap(studentId);
    const lectures = await StudentAccessRepository.findAllLectures();

    return lectures.map((lecture) => ({
      ...lecture,
      isLocked: !map.lectureIds.includes(lecture.id),
    }));
  }

  static async getAllowedExams(studentId: string) {
    const map = await this.getAccessMap(studentId);

    const completedLectureIds =
      await this.getCompletedLectureIds(studentId);
    const now = new Date();

    const exams =
      await StudentAccessRepository.findExamsByLectureIds(
        map.lectureIds
      );

    return exams.filter((exam) =>
      this.isExamVisible(exam, now, completedLectureIds)
    );
  }

  static async getExamPageData(
    studentId: string,
    examId: string
  ) {
    const map = await this.getAccessMap(studentId);

    const exam = await StudentAccessRepository.findExamById(examId);

    if (!exam) {
      return null;
    }

    if (!map.lectureIds.includes(exam.lectureId)) {
      throw new Error("Access denied.");
    }

    const completedLectureIds =
      await this.getCompletedLectureIds(studentId);

    if (
      !this.isExamVisible(
        exam,
        new Date(),
        completedLectureIds
      )
    ) {
      throw new Error("Exam not available.");
    }

    return exam;
  }

  static async getExamResultPageData(
    studentId: string,
    examId: string
  ) {
    const exam = await this.getExamPageData(studentId, examId);

    if (!exam) {
      return null;
    }

    const latestResult =
      await StudentAccessRepository.findLatestExamResult(
        studentId,
        examId
      );

    return {
      exam,
      latestResult,
    };
  }

  static async getExamReviewPageData(
    studentId: string,
    examId: string
  ) {
    const exam = await this.getExamPageData(studentId, examId);

    if (!exam) {
      return null;
    }

    const latestResult =
      await StudentAccessRepository.findLatestExamResult(
        studentId,
        examId
      );

    if (!latestResult) {
      return {
        exam,
        latestResult: null,
        reviewItems: [],
      };
    }

    const answersByQuestionId = new Map(
      latestResult.answers.map((answer) => [
        answer.questionId,
        answer,
      ])
    );

    const reviewItems = exam.questions.map((question) => {
      const answer = answersByQuestionId.get(question.id);

      return {
        id: question.id,
        question: question.question,
        explanation: question.explanation,
        studentAnswer: answer?.studentAnswer ?? "-",
        correctAnswer: question.correctAnswer,
        isCorrect: answer?.isCorrect ?? false,
      };
    });

    return {
      exam,
      latestResult,
      reviewItems,
    };
  }

  static async submitExam(
    studentId: string,
    data: SubmitExamDto
  ) {
    const exam = await this.getExamPageData(
      studentId,
      data.examId
    );

    if (!exam) {
      throw new Error("Exam not available.");
    }

    const latestResult =
      await StudentAccessRepository.findLatestExamResult(
        studentId,
        data.examId
      );

    if (latestResult) {
      return latestResult;
    }

    const correctAnswers = new Map(
      exam.questions.map((question) => [
        question.id,
        question.correctAnswer,
      ])
    );

    const answerRows = exam.questions.map((question) => {
      const expectedRaw =
        correctAnswers.get(question.id) ?? "";
      const expected = this.normalizeAnswer(expectedRaw);
      const studentRaw = data.answers[question.id] ?? "";
      const student = this.normalizeAnswer(studentRaw);
      const isCorrect = student !== "" && student === expected;

      return {
        questionId: question.id,
        studentAnswer: student,
        correctAnswer: expected,
        isCorrect,
      };
    });

    const score = answerRows.filter(
      (item) => item.isCorrect
    ).length;

    const now = new Date();

    return StudentAccessRepository.createExamResult({
      studentId,
      examId: data.examId,
      score,
      total: exam.questions.length,
      startedAt: now,
      submittedAt: now,
      answers: answerRows,
    });
  }
}
