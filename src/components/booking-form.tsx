"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Experience } from "@/lib/types";

type FormState = {
  fullName: string;
  email: string;
  people: number;
  experienceId: string;
  date: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  people: 2,
  experienceId: "",
  date: ""
};

export function BookingForm({ experiences }: { experiences: Experience[] }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "No se pudo completar la reserva.");
      setLoading(false);
      return;
    }

    setMessage(data.message ?? "Reserva enviada.");
    setForm(initialState);
    setLoading(false);
  }

  return (
    <section id="reserva" className="container-site mt-20">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Reserva tu experiencia</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Te confirmamos disponibilidad por email en menos de 24h.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Nombre completo"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 placeholder:text-zinc-500 focus:ring-2"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 placeholder:text-zinc-500 focus:ring-2"
          />
          <select
            required
            value={form.experienceId}
            onChange={(e) => setForm({ ...form, experienceId: e.target.value })}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 focus:ring-2"
          >
            <option value="">Selecciona experiencia</option>
            {experiences.map((experience) => (
              <option key={experience.id} value={experience.id}>
                {experience.title}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={20}
            required
            value={form.people}
            onChange={(e) => setForm({ ...form, people: Number(e.target.value) })}
            placeholder="Personas"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 placeholder:text-zinc-500 focus:ring-2"
          />
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 focus:ring-2"
          />
          <button
            type="submit"
            disabled={loading || experiences.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {loading ? "Enviando..." : "Confirmar reserva"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-zinc-200">{message}</p> : null}
        {experiences.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-400">
            No hay experiencias cargadas en Supabase para reservar.
          </p>
        ) : null}
      </div>
    </section>
  );
}
