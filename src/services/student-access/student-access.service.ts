import StudentRepository from "@/repositories/student/student.repository";
import { StudentAccessRepository } from "@/repositories/student-access";

interface AccessMap {
  courseIds: string[];
  chapterIds: string[];
  lectureIds: string[];
}

export class StudentAccessService {
  private static unique(values: string[]) {
    return Array.from(new Set(values));
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
      throw new Error("الطالب غير موجود");
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

    return {
      studentName: student.name,
      hasAccess: map.courseIds.length > 0,
      stats: {
        courses: map.courseIds.length,
        lectures: map.lectureIds.length,
        exams: (await StudentAccessRepository.findExamsByLectureIds(map.lectureIds)).length,
        results: results.length,
        progress: averageScore,
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
          href: "/dashboard/courses",
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
        lectures: chapter.lectures.filter((lecture) =>
          map.lectureIds.includes(lecture.id)
        ),
      }))
      .filter((chapter) => chapter.lectures.length > 0);

    const lectures = chapters.flatMap((chapter) =>
      chapter.lectures.map((lecture) => ({
        ...lecture,
        chapter,
      }))
    );

    const exams = chapters.flatMap((chapter) =>
      chapter.lectures.flatMap((lecture) =>
        lecture.exams.map((exam) => ({
          ...exam,
          lecture,
          chapter,
        }))
      )
    );

    const examResults =
      await StudentAccessRepository.findExamResultsByStudentId(
        studentId
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

    const lectures = chapter.lectures.filter((lecture) =>
      map.lectureIds.includes(lecture.id)
    );

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

    return StudentAccessRepository.findLectureWithContent(
      lectureId
    );
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

  static async getAllowedExams(studentId: string) {
    const map = await this.getAccessMap(studentId);

    return StudentAccessRepository.findExamsByLectureIds(
      map.lectureIds
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
      return null;
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
}
