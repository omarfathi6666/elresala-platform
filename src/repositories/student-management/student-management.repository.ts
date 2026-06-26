import { prisma } from "@/lib/db";

export interface StudentManagementListQuery {
  search?: string;
  status?: "all" | "active" | "suspended";
  codeStatus?: "all" | "has-active-codes" | "no-active-codes";
  sort?: "newest" | "oldest" | "highest-progress" | "lowest-progress";
}

class StudentManagementRepository {
  private buildStudentWhere(
    query: StudentManagementListQuery,
    now: Date
  ) {
    const where: {
      OR?: Array<Record<string, unknown>>;
      isActive?: boolean;
      codes?: {
        some?: {
          studentId: {
            not: null;
          };
          OR: Array<Record<string, unknown>>;
        };
        none?: {
          studentId: {
            not: null;
          };
          OR: Array<Record<string, unknown>>;
        };
      };
    } = {};

    if (query.search?.trim()) {
      const term = query.search.trim();
      where.OR = [
        {
          name: {
            contains: term,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: term,
            mode: "insensitive",
          },
        },
        {
          parentPhone: {
            contains: term,
            mode: "insensitive",
          },
        },
      ];
    }

    if (query.status === "active") {
      where.isActive = true;
    }

    if (query.status === "suspended") {
      where.isActive = false;
    }

    if (query.codeStatus === "has-active-codes") {
      where.codes = {
        some: {
          studentId: {
            not: null,
          },
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
      };
    }

    if (query.codeStatus === "no-active-codes") {
      where.codes = {
        none: {
          studentId: {
            not: null,
          },
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
      };
    }

    return where;
  }

  async getStudents(
    query: StudentManagementListQuery,
    now: Date
  ) {
    const where = this.buildStudentWhere(query, now);

    return prisma.student.findMany({
      where,
      select: {
        id: true,
        name: true,
        phone: true,
        parentPhone: true,
        email: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
        codes: {
          where: {
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
          select: {
            id: true,
            courseId: true,
            chapterId: true,
            lectureId: true,
          },
        },
        results: {
          select: {
            id: true,
            score: true,
            total: true,
            createdAt: true,
            exam: {
              select: {
                id: true,
                lectureId: true,
                lecture: {
                  select: {
                    chapterId: true,
                    chapter: {
                      select: {
                        courseId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async searchStudents(
    query: StudentManagementListQuery,
    now: Date
  ) {
    return this.getStudents(query, now);
  }

  async getStudentById(studentId: string, now: Date) {
    return prisma.student.findUnique({
      where: {
        id: studentId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        parentPhone: true,
        email: true,
        governorate: true,
        grade: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
        codes: {
          where: {
            studentId,
          },
          select: {
            id: true,
            code: true,
            createdAt: true,
            usedAt: true,
            expiresAt: true,
            isUsed: true,
            course: {
              select: {
                title: true,
              },
            },
            chapter: {
              select: {
                title: true,
              },
            },
            lecture: {
              select: {
                title: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        results: {
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
            answers: {
              include: {
                question: {
                  select: {
                    question: true,
                    explanation: true,
                  },
                },
              },
            },
          },
          orderBy: {
            submittedAt: "desc",
          },
        },
      },
    });
  }

  async getStudentProgress(studentId: string, now: Date) {
    const codes = await prisma.code.findMany({
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
      select: {
        courseId: true,
        chapterId: true,
        lectureId: true,
      },
    });

    const results = await prisma.examResult.findMany({
      where: {
        studentId,
      },
      select: {
        submittedAt: true,
        exam: {
          select: {
            lectureId: true,
            lecture: {
              select: {
                title: true,
                duration: true,
                chapterId: true,
                chapter: {
                  select: {
                    courseId: true,
                    title: true,
                    course: {
                      select: {
                        title: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return {
      codes,
      results,
    };
  }

  async getStudentExamHistory(studentId: string) {
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
        answers: true,
      },
      orderBy: {
        submittedAt: "desc",
      },
    });
  }

  async getStudentSubscriptions(studentId: string, now: Date) {
    return prisma.code.findMany({
      where: {
        studentId,
      },
      include: {
        course: true,
        chapter: true,
        lecture: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getStudentStatistics(now: Date) {
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalStudents,
      activeStudents,
      suspendedStudents,
      students,
      activatedToday,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({
        where: {
          isActive: true,
        },
      }),
      prisma.student.count({
        where: {
          isActive: false,
        },
      }),
      prisma.student.findMany({
        select: {
          id: true,
          codes: {
            where: {
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
            select: {
              id: true,
            },
          },
          results: {
            select: {
              score: true,
              total: true,
            },
          },
        },
      }),
      prisma.code.count({
        where: {
          studentId: {
            not: null,
          },
          usedAt: {
            gte: startOfToday,
          },
        },
      }),
    ]);

    return {
      totalStudents,
      activeStudents,
      suspendedStudents,
      students,
      activatedToday,
    };
  }

  async suspendStudent(studentId: string) {
    return prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        isActive: false,
      },
      select: {
        id: true,
      },
    });
  }

  async activateStudent(studentId: string) {
    return prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        isActive: true,
      },
      select: {
        id: true,
      },
    });
  }

  async resetStudentPassword(
    studentId: string,
    hashedPassword: string
  ) {
    return prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
  }

  async deactivateCode(studentId: string, codeId: string, now: Date) {
    return prisma.code.updateMany({
      where: {
        id: codeId,
        studentId,
      },
      data: {
        expiresAt: now,
      },
    });
  }

  async deleteActivation(studentId: string, codeId: string) {
    return prisma.code.updateMany({
      where: {
        id: codeId,
        studentId,
      },
      data: {
        studentId: null,
      },
    });
  }

  async getAllScopeMaps() {
    const [chapters, lectures, exams] = await Promise.all([
      prisma.chapter.findMany({
        select: {
          id: true,
          courseId: true,
        },
      }),
      prisma.lecture.findMany({
        select: {
          id: true,
          chapterId: true,
        },
      }),
      prisma.exam.findMany({
        select: {
          id: true,
          lectureId: true,
        },
      }),
    ]);

    return {
      chapters,
      lectures,
      exams,
    };
  }
}

export default new StudentManagementRepository();
