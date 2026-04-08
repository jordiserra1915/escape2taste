import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ExperienceCard } from "@/components/experience-card";
import { BookingForm } from "@/components/booking-form";
import { getExperiences } from "@/lib/experiences";
import { ValueProps } from "@/components/marketing/value-props";

export default async function HomePage() {
  const experiences = await getExperiences();
  const featured = experiences.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="container-site">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">Experiencias destacadas</h2>
          <Link
            href="/experiencias"
            className="inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      <ValueProps />
      <BookingForm experiences={experiences} />
    </>
  );
}
