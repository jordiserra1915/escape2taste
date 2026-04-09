import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { servicePlans } from "@/lib/service-plans";

export const metadata: Metadata = {
  title: "Servicios | Escape2Taste",
  description:
    "Elige el nivel de servicio que mejor encaja contigo: asesoría de ruta, planificación completa o planificación con reservas incluidas.",
};

export default function ServiciosPage() {
  return (
    <section className="container-site py-10 pb-20 sm:py-16 sm:pb-28">
      <Link
        href="/experiencias"
        className="inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Ver destinos
      </Link>

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.16em] text-amber-300/90">
          Nuestros servicios
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Viaja con quien sabe
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          Elige el nivel de acompañamiento que necesitas. Desde una ruta bien
          pensada hasta un viaje llave en mano con todo reservado.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
        {servicePlans.map((plan) => (
          <article
            key={plan.id}
            className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 transition ${
              plan.highlighted
                ? "border-amber-500/50 bg-amber-500/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-zinc-950">
                Recomendado
              </span>
            )}

            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{plan.tagline}</p>

            <p className="mt-6 text-4xl font-bold tabular-nums">
              {plan.price_eur}{" "}
              <span className="text-lg font-normal text-zinc-400">€</span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">por destino</p>

            <ul className="mt-8 flex-1 space-y-3 text-sm text-zinc-300">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/experiencias"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                  : "border border-white/15 bg-white/5 text-zinc-100 hover:border-amber-400/40 hover:bg-white/10"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Elegir destino
            </Link>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
        <h3 className="text-lg font-semibold">¿No tienes claro qué plan elegir?</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Escríbenos y te ayudamos a decidir. Sin compromiso.
        </p>
        <a
          href="mailto:hola@escape2taste.com"
          className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-amber-400/40 hover:bg-white/10"
        >
          Contactar
        </a>
      </div>
    </section>
  );
}
