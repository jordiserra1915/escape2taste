import { ChefHat, Globe, MapPinned } from "lucide-react";

const highlights = [
  { icon: MapPinned, text: "Rutas gastronómicas en ciudades únicas" },
  { icon: ChefHat, text: "Degustaciones premium con chefs locales" },
  { icon: Globe, text: "Experiencias auténticas para parejas, grupos y empresas" }
];

export function Hero() {
  return (
    <section className="container-site py-12 sm:py-18 md:py-24">
      <p className="mb-4 inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-amber-300 sm:px-4">
        Turismo gastronómico
      </p>
      <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
        Vive las ciudades a través de su gastronomía.
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-zinc-300 sm:mt-5 sm:text-base md:text-lg">
        Escape2Taste diseña experiencias de viaje únicas donde la gastronomía local es la
        protagonista. Descubre la esencia de cada ciudad a través de sus sabores, mercados y chefs.
      </p>

      <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
        {highlights.map(({ icon: Icon, text }) => (
          <div key={text} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Icon className="mb-3 h-5 w-5 text-amber-400" />
            <p className="text-sm text-zinc-200">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
