import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { PdfQuestionParserService } from "@/services/question/pdf-question-parser.service";
import pdf from "pdf-parse";

export async function POST(request: Request) {
  return apiHandler(async () => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return fail("ملف PDF مطلوب", 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Temporary debug logs for PDF extraction visibility.
    const extracted = await pdf(pdfBuffer);
    const extractedText = extracted.text || "";

    console.log(
      "[PDF IMPORT DEBUG] Extracted text length:",
      extractedText.length
    );
    console.log(
      "[PDF IMPORT DEBUG] Extracted text preview (first 1000 chars):\n",
      extractedText.slice(0, 1000)
    );

    const parsed = await PdfQuestionParserService.parse(
      pdfBuffer
    );

    console.log(
      "[PDF IMPORT DEBUG] Parsed questions count:",
      parsed.length
    );

    return success(parsed);
  });
}
