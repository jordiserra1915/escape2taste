import { Experience } from "@/lib/types";

export function normalizeExperienceRow(row: Record<string, unknown>): Experience {
  return {
    id: row.id as string,
    title: row.title as string,
    city: row.city as string,
    duration_hours: row.duration_hours as number,
    level: row.level as Experience["level"],
    price_eur: row.price_eur as number,
    image_url: row.image_url as string,
    description: row.description as string,
    tags: (row.tags as string[] | null) ?? [],
    long_description: (row.long_description as string | null | undefined) ?? null,
    highlights: (row.highlights as string[] | null | undefined) ?? null
  };
}
