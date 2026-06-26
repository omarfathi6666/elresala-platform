import { hashPassword } from "@/lib/auth/password";
import {
  StudentManagementListQuery,
  StudentManagementRepository,
} from "@/repositories/student-management";

interface StudentsQueryInput {
  search?: string;
  status?: "all" | "active" | "suspended";
  codeStatus?: "all" | "has-active-codes" | "no-active-codes";
  sort?: "newest" | "oldest" | "highest-progress" | "lowest-progress";
  page?: number;
  pageSize?: number;
}

interface StudentListItem {
  id: string;
  name: string;
  phone: string;
  parentPhone: string;
  email: string;
  activeCodes: number;
  courses: number;
  progress: number;
  examsTaken: number;
  averageScore: number;
  lastLoginAt: Date | null;
  createdAt: Date;
  status: "Active" | "Suspended";
}

export class StudentManagementService {
  private static normalizeQuery(
    query: StudentsQueryInput
  ): Required<StudentsQueryInput> {
    const page =
      Number.isFinite(query.page) && query.page && query.page > 0
        ? Math.floor(query.page)
        : 1;

    const pageSizeInput =
      Number.isFinite(query.pageSize) && query.pageSize && query.pageSize > 0
        ? Math.floor(query.pageSize)
        : 10;

    const pageSize = Math.min(50, pageSizeInput);

    return {
      search: query.search?.trim() ?? "",
      status: query.status ?? "all",
      codeStatus: query.codeStatus ?? "all",
      sort: query.sort ?? "newest",
      page,
      pageSize,
    };
  }

  private static computeAllowedExamCount(
    codes: Array<{
      courseId: string;
      chapterId: string | null;
      lectureId: string | null;
    }>,
    maps: {
      chapters: Array<{ id: string; courseId: string }>;
      lectures: Array<{ id: string; chapterId: string }>;
      exams: Array<{ id: string; lectureId: string }>;
    }
  ) {
    const chapterIdsByCourse = new Map<string, string[]>();
    for (const chapter of maps.chapters) {
      const list = chapterIdsByCourse.get(chapter.courseId) ?? [];
      list.push(chapter.id);
      chapterIdsByCourse.set(chapter.courseId, list);
    }

    const lectureIdsByChapter = new Map<string, string[]>();
    for (const lecture of maps.lectures) {
      const list = lectureIdsByChapter.get(lecture.chapterId) ?? [];
      list.push(lecture.id);
      lectureIdsByChapter.set(lecture.chapterId, list);
    }

    const examCountByLecture = new Map<string, number>();
    for (const exam of maps.exams) {
      examCountByLecture.set(
        exam.lectureId,
        (examCountByLecture.get(exam.lectureId) ?? 0) + 1
      );
    }

    const allowedLectureIds = new Set<string>();

    for (const code of codes) {
      if (code.lectureId) {
        allowedLectureIds.add(code.lectureId);
        continue;
      }

      if (code.chapterId) {
        const lectureIds = lectureIdsByChapter.get(code.chapterId) ?? [];
        for (const lectureId of lectureIds) {
          allowedLectureIds.add(lectureId);
        }
        continue;
      }

      const chapterIds = chapterIdsByCourse.get(code.courseId) ?? [];
      for (const chapterId of chapterIds) {
        const lectureIds = lectureIdsByChapter.get(chapterId) ?? [];
        for (const lectureId of lectureIds) {
          allowedLectureIds.add(lectureId);
        }
      }
    }

    let total = 0;
    for (const lectureId of allowedLectureIds) {
      total += examCountByLecture.get(lectureId) ?? 0;
    }

    return total;
  }

  private static toAveragePercentage(
    results: Array<{ score: number; total: number }>
  ) {
    if (results.length === 0) {
      return 0;
    }

    const valid = results.filter((item) => item.total > 0);

    if (valid.length === 0) {
      return 0;
    }

    const sum = valid.reduce(
      (acc, item) => acc + (item.score / item.total) * 100,
      0
    );

    return Math.round(sum / valid.length);
  }

  static async getStudents(input: StudentsQueryInput) {
    const query = this.normalizeQuery(input);
    const now = new Date();

    const [rawStudents, maps] = await Promise.all([
      StudentManagementRepository.getStudents(
        {
          search: query.search,
          status: query.status,
          codeStatus: query.codeStatus,
          sort: query.sort,
        },
        now
      ),
      StudentManagementRepository.getAllScopeMaps(),
    ]);

    const rows: StudentListItem[] = rawStudents.map((student) => {
      const activeCodes = student.codes.length;
      const courses = new Set(
        student.codes.map((code) => code.courseId)
      ).size;
      const examsTaken = student.results.length;
      const averageScore = this.toAveragePercentage(student.results);
      const allowedExamCount = this.computeAllowedExamCount(
        student.codes,
        maps
      );
      const progress =
        allowedExamCount === 0
          ? 0
          : Math.min(
              100,
              Math.round((examsTaken / allowedExamCount) * 100)
            );

      return {
        id: student.id,
        name: student.name,
        phone: student.phone,
        parentPhone: student.parentPhone ?? "-",
        email: student.email ?? "-",
        activeCodes,
        courses,
        progress,
        examsTaken,
        averageScore,
        lastLoginAt: student.lastLoginAt,
        createdAt: student.createdAt,
        status: student.isActive ? "Active" : "Suspended",
      };
    });

    const sorted = [...rows].sort((a, b) => {
      if (query.sort === "oldest") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }

      if (query.sort === "highest-progress") {
        return b.progress - a.progress;
      }

      if (query.sort === "lowest-progress") {
        return a.progress - b.progress;
      }

      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
    const page = Math.min(query.page, totalPages);
    const start = (page - 1) * query.pageSize;
    const end = start + query.pageSize;

    return {
      students: sorted.slice(start, end),
      pagination: {
        page,
        pageSize: query.pageSize,
        total,
        totalPages,
      },
      query,
    };
  }

  static async searchStudents(input: StudentsQueryInput) {
    return this.getStudents({
      ...input,
      page: 1,
      pageSize: 50,
    });
  }

  static async getStudentById(studentId: string) {
    const student = await StudentManagementRepository.getStudentById(
      studentId,
      new Date()
    );

    if (!student) {
      throw new Error("Student not found.");
    }

    return student;
  }

  static async getStudentSubscriptions(studentId: string) {
    const now = new Date();
    const subscriptions =
      await StudentManagementRepository.getStudentSubscriptions(
        studentId,
        now
      );

    return subscriptions.map((item) => ({
      id: item.id,
      code: item.code,
      course: item.course?.title ?? "-",
      chapter: item.chapter?.title ?? "-",
      lecture: item.lecture?.title ?? "-",
      activatedAt: item.usedAt ?? item.createdAt,
      expiresAt: item.expiresAt,
      status:
        item.expiresAt && item.expiresAt < now
          ? "Expired"
          : "Active",
    }));
  }

  static async getStudentExamHistory(studentId: string) {
    const history =
      await StudentManagementRepository.getStudentExamHistory(studentId);

    return history.map((item) => {
      const total = item.total;
      const score = item.score;
      const percentage =
        total > 0 ? Math.round((score / total) * 100) : 0;
      const correct = item.answers.filter(
        (answer) => answer.isCorrect
      ).length;
      const wrong = Math.max(0, total - correct);

      return {
        id: item.id,
        examId: item.examId,
        examTitle: item.exam.title,
        score,
        correct,
        wrong,
        percentage,
        submittedAt: item.submittedAt,
      };
    });
  }

  static async getStudentProgress(studentId: string) {
    const now = new Date();
    const [progressData, maps] = await Promise.all([
      StudentManagementRepository.getStudentProgress(studentId, now),
      StudentManagementRepository.getAllScopeMaps(),
    ]);

    const allowedExamCount = this.computeAllowedExamCount(
      progressData.codes,
      maps
    );

    const completedLectureIds = new Set(
      progressData.results.map((item) => item.exam.lectureId)
    );

    const coursesMap = new Map<
      string,
      {
        courseId: string;
        courseTitle: string;
        totalChapters: Set<string>;
        completedChapters: Set<string>;
        totalLectures: Set<string>;
        completedLectures: Set<string>;
        timeSpentLearning: number;
        lastLectureWatched: string;
      }
    >();

    for (const result of progressData.results) {
      const courseId = result.exam.lecture.chapter.courseId;
      const courseTitle = result.exam.lecture.chapter.course.title;
      const chapterId = result.exam.lecture.chapterId;
      const chapterTitle = result.exam.lecture.chapter.title;
      const lectureId = result.exam.lectureId;
      const lectureTitle = result.exam.lecture.title;
      const lectureDuration = result.exam.lecture.duration ?? 0;

      const entry =
        coursesMap.get(courseId) ??
        {
          courseId,
          courseTitle,
          totalChapters: new Set<string>(),
          completedChapters: new Set<string>(),
          totalLectures: new Set<string>(),
          completedLectures: new Set<string>(),
          timeSpentLearning: 0,
          lastLectureWatched: "-",
        };

      entry.completedChapters.add(chapterId);
      entry.completedLectures.add(lectureId);
      entry.totalLectures.add(lectureId);
      entry.totalChapters.add(chapterId);
      entry.timeSpentLearning += lectureDuration;
      if (entry.lastLectureWatched === "-") {
        entry.lastLectureWatched = `${chapterTitle} - ${lectureTitle}`;
      }

      coursesMap.set(courseId, entry);
    }

    for (const code of progressData.codes) {
      const courseId = code.courseId;
      const chapterIds = maps.chapters
        .filter((chapter) => chapter.courseId === courseId)
        .map((chapter) => chapter.id);

      const lectureIds = maps.lectures
        .filter((lecture) => chapterIds.includes(lecture.chapterId))
        .map((lecture) => lecture.id);

      const courseEntry =
        coursesMap.get(courseId) ??
        {
          courseId,
          courseTitle: "Course",
          totalChapters: new Set<string>(),
          completedChapters: new Set<string>(),
          totalLectures: new Set<string>(),
          completedLectures: new Set<string>(),
          timeSpentLearning: 0,
          lastLectureWatched: "-",
        };

      if (code.lectureId) {
        courseEntry.totalLectures.add(code.lectureId);
        const lecture = maps.lectures.find((item) => item.id === code.lectureId);
        if (lecture) {
          courseEntry.totalChapters.add(lecture.chapterId);
        }
      } else if (code.chapterId) {
        courseEntry.totalChapters.add(code.chapterId);
        for (const lectureId of lectureIds.filter((id) => {
          const lecture = maps.lectures.find((item) => item.id === id);
          return lecture?.chapterId === code.chapterId;
        })) {
          courseEntry.totalLectures.add(lectureId);
        }
      } else {
        for (const chapterId of chapterIds) {
          courseEntry.totalChapters.add(chapterId);
        }
        for (const lectureId of lectureIds) {
          courseEntry.totalLectures.add(lectureId);
        }
      }

      coursesMap.set(courseId, courseEntry);
    }

    const courses = Array.from(coursesMap.values()).map((course) => {
      const totalLectures = course.totalLectures.size;
      const progress =
        totalLectures === 0
          ? 0
          : Math.round((course.completedLectures.size / totalLectures) * 100);

      return {
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        progress,
        chaptersCompleted: course.completedChapters.size,
        lecturesWatched: course.completedLectures.size,
        videosCompleted: course.completedLectures.size,
        lastLectureWatched: course.lastLectureWatched,
        timeSpentLearning: course.timeSpentLearning,
      };
    });

    const overallProgress =
      allowedExamCount === 0
        ? 0
        : Math.round((progressData.results.length / allowedExamCount) * 100);

    return {
      overallProgress,
      completedLectures: completedLectureIds.size,
      courses,
    };
  }

  static async getStudentStatistics() {
    const now = new Date();
    const stats =
      await StudentManagementRepository.getStudentStatistics(now);

    const studentProgress = stats.students.map((student) => {
      const examsTaken = student.results.length;
      const activeCodes = student.codes.length;
      if (activeCodes === 0) {
        return 0;
      }

      return Math.min(100, Math.round((examsTaken / (activeCodes * 2)) * 100));
    });

    const averageProgress =
      studentProgress.length === 0
        ? 0
        : Math.round(
            studentProgress.reduce((acc, value) => acc + value, 0) /
              studentProgress.length
          );

    const allResults = stats.students.flatMap((student) => student.results);
    const averageScore = this.toAveragePercentage(allResults);

    return {
      totalStudents: stats.totalStudents,
      activeStudents: stats.activeStudents,
      suspendedStudents: stats.suspendedStudents,
      averageProgress,
      averageScore,
      codesActivatedToday: stats.activatedToday,
    };
  }

  static async suspendStudent(studentId: string) {
    return StudentManagementRepository.suspendStudent(studentId);
  }

  static async activateStudent(studentId: string) {
    return StudentManagementRepository.activateStudent(studentId);
  }

  static async resetStudentPassword(studentId: string) {
    const tempPassword = Math.random().toString(36).slice(-10);
    const hashed = await hashPassword(tempPassword);

    await StudentManagementRepository.resetStudentPassword(
      studentId,
      hashed
    );

    return {
      temporaryPassword: tempPassword,
    };
  }

  static async deactivateCode(studentId: string, codeId: string) {
    const result = await StudentManagementRepository.deactivateCode(
      studentId,
      codeId,
      new Date()
    );

    if (result.count === 0) {
      throw new Error("Activation not found.");
    }

    return {
      success: true,
    };
  }

  static async deleteActivation(studentId: string, codeId: string) {
    const result = await StudentManagementRepository.deleteActivation(
      studentId,
      codeId
    );

    if (result.count === 0) {
      throw new Error("Activation not found.");
    }

    return {
      success: true,
    };
  }
}
