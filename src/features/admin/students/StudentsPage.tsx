import Link from "next/link";
import { StudentManagementService } from "@/services/student-management";

interface StudentsPageProps {
  query: {
    search?: string;
    status?: "all" | "active" | "suspended";
    codeStatus?: "all" | "has-active-codes" | "no-active-codes";
    sort?: "newest" | "oldest" | "highest-progress" | "lowest-progress";
    page?: string;
    pageSize?: string;
  };
}

function formatDate(value: Date | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

export default async function StudentsPage({
  query,
}: StudentsPageProps) {
  const page = Number(query.page ?? "1");
  const pageSize = Number(query.pageSize ?? "10");

  const [studentsData, stats] = await Promise.all([
    StudentManagementService.getStudents({
      search: query.search,
      status: query.status,
      codeStatus: query.codeStatus,
      sort: query.sort,
      page,
      pageSize,
    }),
    StudentManagementService.getStudentStatistics(),
  ]);

  const paginationBase = {
    search: studentsData.query.search,
    status: studentsData.query.status,
    codeStatus: studentsData.query.codeStatus,
    sort: studentsData.query.sort,
    pageSize: String(studentsData.pagination.pageSize),
  };

  const prevPage = Math.max(1, studentsData.pagination.page - 1);
  const nextPage = Math.min(
    studentsData.pagination.totalPages,
    studentsData.pagination.page + 1
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black">
          الطلاب
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-slate-500">Total Students</p>
          <h2 className="mt-2 text-3xl font-black">{stats.totalStudents}</h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-slate-500">Active Students</p>
          <h2 className="mt-2 text-3xl font-black">{stats.activeStudents}</h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-slate-500">Suspended Students</p>
          <h2 className="mt-2 text-3xl font-black">{stats.suspendedStudents}</h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-slate-500">Average Progress</p>
          <h2 className="mt-2 text-3xl font-black">{stats.averageProgress}%</h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-slate-500">Average Score</p>
          <h2 className="mt-2 text-3xl font-black">{stats.averageScore}%</h2>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-slate-500">Codes Activated Today</p>
          <h2 className="mt-2 text-3xl font-black">{stats.codesActivatedToday}</h2>
        </div>
      </div>

      <form className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-5">
        <input
          name="search"
          defaultValue={studentsData.query.search}
          placeholder="Search name, phone, parent phone"
          className="rounded-2xl border bg-white p-3 outline-none focus:border-blue-600 md:col-span-2"
        />

        <select
          name="status"
          defaultValue={studentsData.query.status}
          className="rounded-2xl border bg-white p-3 outline-none"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          name="codeStatus"
          defaultValue={studentsData.query.codeStatus}
          className="rounded-2xl border bg-white p-3 outline-none"
        >
          <option value="all">All Codes</option>
          <option value="has-active-codes">Has Active Codes</option>
          <option value="no-active-codes">No Active Codes</option>
        </select>

        <select
          name="sort"
          defaultValue={studentsData.query.sort}
          className="rounded-2xl border bg-white p-3 outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest-progress">Highest Progress</option>
          <option value="lowest-progress">Lowest Progress</option>
        </select>

        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="pageSize" value={String(studentsData.pagination.pageSize)} />

        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white md:col-span-1"
        >
          Apply
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="min-w-[1300px] w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50 text-right">
              <th className="p-4 font-bold">Student Name</th>
              <th className="p-4 font-bold">Phone</th>
              <th className="p-4 font-bold">Parent Phone</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Active Codes</th>
              <th className="p-4 font-bold">Courses</th>
              <th className="p-4 font-bold">Progress %</th>
              <th className="p-4 font-bold">Exams Taken</th>
              <th className="p-4 font-bold">Average Score</th>
              <th className="p-4 font-bold">Last Login</th>
              <th className="p-4 font-bold">Registration Date</th>
              <th className="p-4 font-bold">Status</th>
            </tr>
          </thead>

          <tbody>
            {studentsData.students.map((student) => (
              <tr key={student.id} className="border-b last:border-b-0">
                <td className="p-4 font-semibold">
                  <Link href={`/admin/students/${student.id}`} className="text-blue-700 hover:underline">
                    {student.name}
                  </Link>
                </td>
                <td className="p-4">{student.phone}</td>
                <td className="p-4">{student.parentPhone}</td>
                <td className="p-4">{student.email}</td>
                <td className="p-4">{student.activeCodes}</td>
                <td className="p-4">{student.courses}</td>
                <td className="p-4">{student.progress}%</td>
                <td className="p-4">{student.examsTaken}</td>
                <td className="p-4">{student.averageScore}%</td>
                <td className="p-4">{formatDate(student.lastLoginAt)}</td>
                <td className="p-4">{formatDate(student.createdAt)}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}

            {studentsData.students.length === 0 ? (
              <tr>
                <td colSpan={12} className="p-8 text-center text-slate-500">
                  No students found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-600">
          Page {studentsData.pagination.page} of {studentsData.pagination.totalPages}
        </p>

        <div className="flex gap-2">
          <Link
            href={{ query: { ...paginationBase, page: String(prevPage) } }}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
          >
            Previous
          </Link>
          <Link
            href={{ query: { ...paginationBase, page: String(nextPage) } }}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}