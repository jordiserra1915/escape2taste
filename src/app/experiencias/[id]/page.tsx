import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Download,
  MapPin,
  Plane,
  Sun,
  Wallet,
  Wrench,
} from "lucide-react";
import { ServicePlanSelector } from "@/components/service-plan-selector";
import { getExperienceContent } from "@/lib/experience-content";
import { getExperienceById } from "@/lib/experiences";
import {
  getTravelInfo,
  getBudgetLabel,
  getLogisticsColor,
} from "@/lib/travel-info";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) return { title: "Destino | Escape2Taste" };
  return { title: `${experience.title} | Escape2Taste` };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) notFound();

  const { longDescription, highlights, essentialTips } = getExperienceContent(experience);
  const travel = getTravelInfo(experience.id);

  return (
    <article className="container-site py-8 pb-16 sm:py-12 sm:pb-20">
      <Link
        href="/experiencias"
        className="inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al mapa de destinos
      </Link>

      <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={experience.image_url}
              alt={experience.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>

          <div className="mt-8 space-y-5">
            <p className="text-sm uppercase tracking-[0.16em] text-amber-300/90">{experience.city}</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">{experience.title}</h1>
            <p className="text-lg text-zinc-300">{experience.description}</p>
            <p className="text-zinc-200 leading-relaxed">{longDescription}</p>
          </div>
        </div>

        <aside className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:rounded-3xl sm:p-6 md:p-8">
          {travel && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Información práctica</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-medium text-zinc-100">{travel.days}</p>
                    <p className="text-xs text-zinc-400">Días recomendados</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                  <Sun className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-medium text-zinc-100">{travel.bestSeason}</p>
                    <p className="text-xs text-zinc-400">Mejor época</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-medium text-zinc-100">{travel.budgetCouple}</p>
                    <p className="text-xs text-zinc-400">Presupuesto pareja</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                  <Plane className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-medium text-zinc-100">{travel.flightEstimate}</p>
                    <p className="text-xs text-zinc-400">Vuelo ida/vuelta</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className={`font-medium ${getLogisticsColor(travel.logistics)}`}>
                      {travel.logistics.charAt(0).toUpperCase() + travel.logistics.slice(1)}
                    </p>
                    <p className="text-xs text-zinc-400">Logística</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-medium text-zinc-100">{getBudgetLabel(travel.budgetLevel)}</p>
                    <p className="text-xs text-zinc-400">Nivel presupuesto</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">* Presupuesto sin vuelos. Precios orientativos actualizados a 2026.</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold">Highlights</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {essentialTips.length ? (
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <p className="text-sm font-semibold text-amber-200">Imprescindibles (también en el PDF)</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200/90">
                {essentialTips.map((tip) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div id="servicios" className="space-y-4 scroll-mt-20">
            <h2 className="text-lg font-semibold">Nuestros servicios</h2>
            <ServicePlanSelector experienceId={experience.id} compact />
            <a
              href={`/api/ebooks/${experience.id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:border-amber-400/40 hover:bg-white/10"
            >
              <Download className="h-4 w-4 text-amber-400" />
              Descargar ebook gratuito (PDF)
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
