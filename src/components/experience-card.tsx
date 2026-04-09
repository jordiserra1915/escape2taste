import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock3, MapPin, Tag, Wallet } from "lucide-react";
import { Experience } from "@/lib/types";
import { CheckoutButton } from "@/components/checkout-button";
import { getTravelInfo } from "@/lib/travel-info";

function levelLabel(level: Experience["level"]) {
  if (level === "easy") return "Fácil";
  if (level === "hard") return "Avanzado";
  return "Intermedio";
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  const href = `/experiencias/${experience.id}`;
  const travel = getTravelInfo(experience.id);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20">
      <Link href={href} className="relative block h-44 sm:h-52">
        <Image
          src={experience.image_url}
          alt={experience.title}
          fill
          className="object-cover transition duration-500 hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">
          <Link href={href} className="hover:text-amber-200">
            {experience.title}
          </Link>
        </h3>
        <p className="text-sm text-zinc-300">{experience.description}</p>

        <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1">
            <MapPin className="h-3.5 w-3.5" />
            {experience.city}
          </span>
          {travel ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1">
              <Calendar className="h-3.5 w-3.5" />
              {travel.days}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1">
              <Clock3 className="h-3.5 w-3.5" />
              {experience.duration_hours}h · {levelLabel(experience.level)}
            </span>
          )}
          {travel ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1">
              <Wallet className="h-3.5 w-3.5" />
              {travel.budgetCouple} / pareja
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1">
              <Tag className="h-3.5 w-3.5" />
              Desde {experience.price_eur} EUR
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
          <Link
            href={href}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-amber-400/40 hover:bg-white/10"
          >
            Ver destino
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <CheckoutButton experienceId={experience.id} />
        </div>
      </div>
    </article>
  );
}
