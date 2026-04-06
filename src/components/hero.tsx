import { ChefHat, MapPinned, Trophy } from "lucide-react";

const highlights = [
  { icon: MapPinned, text: "Rutas urbanas y naturales exclusivas" },
  { icon: ChefHat, text: "Degustaciones premium con chefs locales" },
  { icon: Trophy, text: "Retos cooperativos para grupos y teams" }
];

export function Hero() {
  return (
    <section className="container-site py-18 md:py-24">
      <p className="mb-4 inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.14em] text-amber-300">
        Escape rooms + experiencias gastronómicas
      </p>
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
        Descubre ciudades a través de un juego inmersivo y una comida inolvidable.
      </h1>
      <p className="mt-5 max-w-2xl text-zinc-300 md:text-lg">
        Escape2Taste combina storytelling, gamificación y gastronomía local para crear planes
        memorables para parejas, grupos y empresas.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
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
