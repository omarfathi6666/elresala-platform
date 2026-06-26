import AdminLayout from "@/features/admin/layout";
import StudentsPage from "@/features/admin/students";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: "all" | "active" | "suspended";
    codeStatus?: "all" | "has-active-codes" | "no-active-codes";
    sort?: "newest" | "oldest" | "highest-progress" | "lowest-progress";
    page?: string;
    pageSize?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  const query = await searchParams;

  return (
    <AdminLayout>
      <StudentsPage query={query} />
    </AdminLayout>
  );
}