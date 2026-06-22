import { handleApiError } from "./api-error";

export async function apiHandler(
  callback: () => Promise<Response>
) {
  try {
    return await callback();
  } catch (error) {
    return handleApiError(error);
  }
}