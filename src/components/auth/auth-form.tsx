"use client";

import Link from "next/link";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/dashboard";
      } else {
        const origin = window.location.origin;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/api/auth/callback`,
            data: { full_name: fullName }
          }
        });

        if (error) throw error;
        setMessage("Cuenta creada. Revisa tu email para confirmar el acceso.");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "No se pudo completar la operación.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  const title = mode === "login" ? "Inicia sesión" : "Crea tu cuenta";

  return (
    <section className="container-site py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-zinc-300">
          {mode === "login"
            ? "Accede para ver tus compras y reservar nuevas experiencias."
            : "Regístrate para gestionar tus reservas y pagos en un solo lugar."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "register" ? (
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Nombre completo"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 placeholder:text-zinc-500 focus:ring-2"
            />
          ) : null}
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 placeholder:text-zinc-500 focus:ring-2"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-amber-400 placeholder:text-zinc-500 focus:ring-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Procesando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-zinc-200">{message}</p> : null}

        <p className="mt-5 text-sm text-zinc-300">
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <Link
            href={mode === "login" ? "/registro" : "/login"}
            className="font-medium text-amber-300 hover:text-amber-200"
          >
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </Link>
        </p>
      </div>
    </section>
  );
}
