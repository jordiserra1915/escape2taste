"use client";

import { useState } from "react";

export function CheckoutButton({
  experienceId,
  className
}: {
  experienceId: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experienceId })
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "No fue posible iniciar el checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado de checkout.";
      alert(message);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={`inline-flex flex-1 min-w-[140px] items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70 ${className ?? ""}`}
    >
      {loading ? "Redirigiendo..." : "Comprar"}
    </button>
  );
}
