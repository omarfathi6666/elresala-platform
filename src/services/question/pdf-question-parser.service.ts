import pdf from "pdf-parse";

export interface ParsedQuestion {
  question: string;
  image?: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
  explanation?: string;
  order: number;
}

async function extractTextFromPdf(buffer: Buffer) {
  const parsed = await pdf(buffer);
  return parsed.text || "";
}

function parseQuestionsFromText(text: string): ParsedQuestion[] {
  const normalizeArabicDigits = (value: string) =>
    value
      .replace(/[٠-٩]/g, (digit) =>
        String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
      )
      .replace(/[۰-۹]/g, (digit) =>
        String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
      );

  const toAnswerCode = (value: string) => {
    const normalized = value.trim().toLowerCase();

    if (normalized === "a" || normalized === "واحد") {
      return "A";
    }

    if (normalized === "b" || normalized === "اثنين") {
      return "B";
    }

    if (normalized === "c" || normalized === "ثلاثة") {
      return "C";
    }

    if (normalized === "d" || normalized === "أربعة" || normalized === "اربعة") {
      return "D";
    }

    return "";
  };

  const normalized = text
    .replace(/\u200f|\u200e/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .split("\n")
    .map((line) => normalizeArabicDigits(line).trim())
    .filter(Boolean);

  const questionStartRegex = /^\d+[\.)-]\s*/;
  const choiceARegex = /^A[\).-]\s*(.+)$/i;
  const choiceBRegex = /^B[\).-]\s*(.+)$/i;
  const choiceCRegex = /^C[\).-]\s*(.+)$/i;
  const choiceDRegex = /^D[\).-]\s*(.+)$/i;
  const answerRegex = /^\s*(?:answer|correct\s*answer)\s*:\s*([A-D])\s*$/i;
  const arabicAnswerParenRegex = /^\s*الإجابة\s*الصحيحة\s*\(([^)]+)\)\s*$/i;
  const arabicAnswerColonRegex = /^\s*الإجابة\s*الصحيحة\s*:\s*(.+)\s*$/i;
  const explanationStartRegex = /^\s*(?:explanation|الشرح)\s*:\s*(.*)\s*$/i;
  const explanationParenRegex = /^\s*(?:explanation|الشرح)\s*\((.*)\)\s*$/i;

  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of normalized) {
    if (questionStartRegex.test(line)) {
      if (current.length > 0) {
        blocks.push(current);
      }

      current = [line];
    } else if (current.length > 0) {
      current.push(line);
    }
  }

  if (current.length > 0) {
    blocks.push(current);
  }

  const parsed: ParsedQuestion[] = [];

  for (const block of blocks) {
    let questionText = "";
    let choiceA = "";
    let choiceB = "";
    let choiceC = "";
    let choiceD = "";
    let correctAnswer = "A";
    let explanation = "";

    const questionLines: string[] = [];
    const explanationLines: string[] = [];
    let inExplanation = false;

    for (const rawLine of block) {
      const line = rawLine.replace(questionStartRegex, "");

      if (choiceARegex.test(line)) {
        choiceA = line.match(choiceARegex)?.[1]?.trim() || "";
        inExplanation = false;
        continue;
      }

      if (choiceBRegex.test(line)) {
        choiceB = line.match(choiceBRegex)?.[1]?.trim() || "";
        inExplanation = false;
        continue;
      }

      if (choiceCRegex.test(line)) {
        choiceC = line.match(choiceCRegex)?.[1]?.trim() || "";
        inExplanation = false;
        continue;
      }

      if (choiceDRegex.test(line)) {
        choiceD = line.match(choiceDRegex)?.[1]?.trim() || "";
        inExplanation = false;
        continue;
      }

      const answerMatch = line.match(answerRegex);
      if (answerMatch) {
        correctAnswer = answerMatch[1].toUpperCase();
        inExplanation = false;
        continue;
      }

      const arabicParenAnswerMatch = line.match(arabicAnswerParenRegex);
      if (arabicParenAnswerMatch) {
        const mapped = toAnswerCode(arabicParenAnswerMatch[1]);
        if (mapped) {
          correctAnswer = mapped;
        }
        inExplanation = false;
        continue;
      }

      const arabicColonAnswerMatch = line.match(arabicAnswerColonRegex);
      if (arabicColonAnswerMatch) {
        const mapped = toAnswerCode(arabicColonAnswerMatch[1]);
        if (mapped) {
          correctAnswer = mapped;
        }
        inExplanation = false;
        continue;
      }

      const explanationStartMatch = line.match(explanationStartRegex);
      if (explanationStartMatch) {
        inExplanation = true;
        if (explanationStartMatch[1]) {
          explanationLines.push(explanationStartMatch[1].trim());
        }
        continue;
      }

      const explanationParenMatch = line.match(explanationParenRegex);
      if (explanationParenMatch) {
        inExplanation = true;
        if (explanationParenMatch[1]) {
          explanationLines.push(explanationParenMatch[1].trim());
        }
        continue;
      }

      if (inExplanation) {
        explanationLines.push(line);
      } else if (!choiceA && !choiceB && !choiceC && !choiceD) {
        questionLines.push(line);
      }
    }

    questionText = questionLines.join(" ").trim();
    explanation = explanationLines.join(" ").trim();

    if (!questionText || !choiceA || !choiceB || !choiceC || !choiceD) {
      continue;
    }

    parsed.push({
      question: questionText,
      choiceA,
      choiceB,
      choiceC,
      choiceD,
      correctAnswer,
      explanation,
      order: parsed.length + 1,
    });
  }

  return parsed;
}

export class PdfQuestionParserService {
  static async parse(
    buffer: Buffer
  ): Promise<ParsedQuestion[]> {
    const text = await extractTextFromPdf(buffer);
    return parseQuestionsFromText(text);
  }
}
