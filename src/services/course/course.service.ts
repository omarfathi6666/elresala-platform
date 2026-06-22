import { prisma } from "@/lib/db/prisma";

export interface CreateCourseDto {
  title: string;
  description?: string;
  order: number;
}

export class CourseService {
  static async getAllCourses() {
    return prisma.course.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        chapters: true,
      },
    });
  }

  static async createCourse(data: CreateCourseDto) {
    return prisma.course.create({
      data,
    });
  }
}