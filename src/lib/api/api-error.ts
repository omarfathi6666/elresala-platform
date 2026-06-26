import { fail } from "./api-response";

export function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof Error) {
    return fail(error.message, 500);
  }

  return fail("Something went wrong.", 500);
}