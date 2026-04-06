import { fallbackExperiences } from "@/lib/data";
import { normalizeExperienceRow } from "@/lib/experience-normalize";
import { getSupabaseClient } from "@/lib/supabase";
import { Experience } from "@/lib/types";

const experienceColumns =
  "id, title, city, duration_hours, level, price_eur, image_url, description, tags, long_description, highlights";

export async function getExperiences(): Promise<Experience[]> {
  const supabase = getSupabaseClient();

  if (!supabase) return fallbackExperiences;

  const { data, error } = await supabase
    .from("experiences")
    .select(experienceColumns)
    .order("price_eur", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row) => normalizeExperienceRow(row as Record<string, unknown>));
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackExperiences.find((item) => item.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("experiences")
    .select(experienceColumns)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return fallbackExperiences.find((item) => item.id === id) ?? null;
  }

  return normalizeExperienceRow(data as Record<string, unknown>);
}
