"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { servicePlans, type ServicePlan } from "@/lib/service-plans";

export function ServicePlanSelector({
  experienceId,
  compact = false,
}: {
  experienceId: string;
  compact?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<ServicePlan["id"] | null>(null);

  async function handleCheckout(planId: ServicePlan["id"]) {
    setLoading(true);
    setSelectedId(planId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experienceId, planId }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "No fue posible iniciar el checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error inesperado de checkout.";
      alert(message);
      setLoading(false);
      setSelectedId(null);
    }
  }

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        {servicePlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => handleCheckout(plan.id)}
            disabled={loading}
            className={`inline-flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
              plan.highlighted
                ? "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                : "border border-white/15 bg-white/5 text-zinc-100 hover:border-amber-400/40 hover:bg-white/10"
            }`}
          >
            <span>{plan.name}</span>
            <span className="ml-3 tabular-nums">
              {loading && selectedId === plan.id ? "Redirigiendo..." : `${plan.price_eur} €`}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {servicePlans.map((plan) => (
        <div
          key={plan.id}
          className={`relative flex flex-col rounded-2xl border p-5 transition ${
            plan.highlighted
              ? "border-amber-500/50 bg-amber-500/10"
              : "border-white/10 bg-white/5"
          }`}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-zinc-950">
              Recomendado
            </span>
          )}
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{plan.tagline}</p>
          <p className="mt-4 text-3xl font-bold tabular-nums">
            {plan.price_eur} <span className="text-base font-normal text-zinc-400">€</span>
          </p>
          <ul className="mt-5 flex-1 space-y-2 text-sm text-zinc-300">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => handleCheckout(plan.id)}
            disabled={loading}
            className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
              plan.highlighted
                ? "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                : "border border-white/15 bg-white/5 text-zinc-100 hover:border-amber-400/40 hover:bg-white/10"
            }`}
          >
            {loading && selectedId === plan.id ? "Redirigiendo..." : "Contratar"}
          </button>
        </div>
      ))}
    </div>
  );
}
