import { CourseRepository } from "@/repositories/course";

export interface CreateCourseDto {
  title: string;
  description?: string;
  order: number;
}

export class CourseService {
  static async getAllCourses() {
    return CourseRepository.findAll();
  }

  static async createCourse(data: CreateCourseDto) {
    return CourseRepository.create(data);
  }

  static async updateCourse(
    id: string,
    data: CreateCourseDto
  ) {
    return CourseRepository.update(id, data);
  }

  static async getCourse(id: string) {
    return CourseRepository.findById(id);
  }

  static async deleteCourse(id: string) {
    return CourseRepository.delete(id);
  }
}