import { prisma } from "@/lib/db";

class StudentAccessRepository {
  async findActiveCodesByStudentId(studentId: string, now: Date) {
    return prisma.code.findMany({
      where: {
        studentId,
        OR: [
          {
            expiresAt: null,
          },
          {
            expiresAt: {
              gte: now,
            },
          },
        ],
      },
      include: {
        lecture: {
          select: {
            id: true,
            chapterId: true,
          },
        },
      },
    });
  }

  async findCoursesByIds(ids: string[]) {
    if (ids.length === 0) {
      return [];
    }

    return prisma.course.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  async findChaptersByCourseIds(courseIds: string[]) {
    if (courseIds.length === 0) {
      return [];
    }

    return prisma.chapter.findMany({
      where: {
        courseId: {
          in: courseIds,
        },
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  async findLecturesByChapterIds(chapterIds: string[]) {
    if (chapterIds.length === 0) {
      return [];
    }

    return prisma.lecture.findMany({
      where: {
        chapterId: {
          in: chapterIds,
        },
      },
      include: {
        chapter: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  async findCourseWithContent(courseId: string) {
    return prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            lectures: {
              include: {
                exams: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async findChapterWithContent(chapterId: string) {
    return prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        course: true,
        lectures: {
          include: {
            exams: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async findLectureWithContent(lectureId: string) {
    return prisma.lecture.findUnique({
      where: {
        id: lectureId,
      },
      include: {
        chapter: {
          include: {
            course: true,
          },
        },
        exams: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  async findExamsByLectureIds(lectureIds: string[]) {
    if (lectureIds.length === 0) {
      return [];
    }

    return prisma.exam.findMany({
      where: {
        lectureId: {
          in: lectureIds,
        },
      },
      include: {
        lecture: {
          include: {
            chapter: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findExamById(examId: string) {
    return prisma.exam.findUnique({
      where: {
        id: examId,
      },
      include: {
        lecture: {
          include: {
            chapter: {
              include: {
                course: true,
              },
            },
          },
        },
        questions: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async countExamResultsByStudentId(studentId: string) {
    return prisma.examResult.count({
      where: {
        studentId,
      },
    });
  }

  async findExamResultsByStudentId(studentId: string) {
    return prisma.examResult.findMany({
      where: {
        studentId,
      },
      include: {
        exam: {
          include: {
            lecture: {
              include: {
                chapter: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findLatestExamResult(
    studentId: string,
    examId: string
  ) {
    return prisma.examResult.findFirst({
      where: {
        studentId,
        examId,
      },
      orderBy: {
        submittedAt: "desc",
      },
    });
  }
}

export default new StudentAccessRepository();
