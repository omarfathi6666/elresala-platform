import { success } from "@/lib/api/api-response";

export async function GET() {
  return success({
    message: "Admin Login API works",
  });
}