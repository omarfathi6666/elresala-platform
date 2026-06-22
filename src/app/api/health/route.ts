import { apiHandler } from "@/lib/api/api-handler";
import { success } from "@/lib/api/api-response";

export async function GET() {
  return apiHandler(async () => {
    return success({
      api: "working",
      database: "connected",
      version: "1.0.0",
    });
  });
}