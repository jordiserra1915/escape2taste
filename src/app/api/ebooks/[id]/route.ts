import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getExperienceContent } from "@/lib/experience-content";
import { getExperienceById } from "@/lib/experiences";

function wrapWords(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const experience = await getExperienceById(id);
  if (!experience) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { longDescription, highlights, essentialTips } = getExperienceContent(experience);

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageSize: [number, number] = [595.28, 841.89];
  const margin = 52;
  const bottomLimit = 80;
  let page = pdf.addPage(pageSize);
  let y = 798;

  const ensureSpace = (lines: number, lineHeight: number) => {
    if (y - lines * lineHeight < bottomLimit) {
      page = pdf.addPage(pageSize);
      y = 798;
    }
  };

  const drawLines = (lines: string[], size: number, lineHeight: number, f: typeof font, colorRgb: [number, number, number]) => {
    const [r, g, b] = colorRgb;
    for (const single of lines) {
      ensureSpace(1, lineHeight);
      page.drawText(single, {
        x: margin,
        y,
        size,
        font: f,
        color: rgb(r, g, b)
      });
      y -= lineHeight;
    }
  };

  drawLines(wrapWords("Escape2Taste", 40), 10, 14, font, [0.45, 0.45, 0.48]);
  y -= 4;
  drawLines(wrapWords(experience.title, 34), 18, 22, fontBold, [0.08, 0.09, 0.11]);
  y -= 4;
  drawLines(wrapWords(experience.city, 50), 12, 16, font, [0.35, 0.35, 0.38]);
  y -= 12;

  drawLines(wrapWords(longDescription, 92), 11, 15, font, [0.18, 0.18, 0.2]);
  y -= 10;

  drawLines(wrapWords("Highlights", 40), 13, 18, fontBold, [0.1, 0.1, 0.12]);
  for (const item of highlights) {
    drawLines(wrapWords(`• ${item}`, 92), 10, 14, font, [0.18, 0.18, 0.2]);
    y -= 2;
  }
  y -= 6;

  drawLines(wrapWords("Imprescindibles del destino", 48), 13, 18, fontBold, [0.1, 0.1, 0.12]);
  for (const tip of essentialTips) {
    drawLines(wrapWords(`• ${tip}`, 92), 10, 14, font, [0.18, 0.18, 0.2]);
    y -= 2;
  }

  page.drawText("www.escape2taste.com", {
    x: margin,
    y: 48,
    size: 9,
    font,
    color: rgb(0.52, 0.52, 0.55)
  });

  const bytes = await pdf.save();
  const filename = `${experience.id}-escape2taste-tips.pdf`;
  const body = Buffer.from(bytes);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
