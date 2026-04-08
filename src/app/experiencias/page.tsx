import { ExperienceCard } from "@/components/experience-card";
import { getExperiences } from "@/lib/experiences";

export const metadata = {
  title: "Experiencias | Escape2Taste"
};

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <section className="container-site py-10 sm:py-14">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">Todas las experiencias</h1>
      <p className="mt-3 max-w-3xl text-sm text-zinc-300 sm:mt-4 sm:text-base">
        Elige el reto gastronómico que mejor encaja con tu grupo: urbano, outdoor, nocturno o
        premium.
      </p>

      <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
      {experiences.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-zinc-300">
          No hay experiencias disponibles en Supabase. Carga datos en la tabla `experiences`
          (puedes usar `supabase/seed.sql`) y vuelve a recargar.
        </p>
      ) : null}
    </section>
  );
}
