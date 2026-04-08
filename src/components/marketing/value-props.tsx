import { Sparkles, ShieldCheck, CreditCard } from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Experiencias curadas",
    description: "Cada ruta mezcla narrativa, retos y gastronomía local seleccionada."
  },
  {
    icon: ShieldCheck,
    title: "Acceso seguro",
    description: "Autenticación con Supabase y arquitectura preparada para producción."
  },
  {
    icon: CreditCard,
    title: "Pagos con Stripe",
    description: "Checkout profesional para completar compras de forma rápida y segura."
  }
];

export function ValueProps() {
  return (
    <section className="container-site mt-12 sm:mt-20">
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
            <Icon className="h-5 w-5 text-amber-400" />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
