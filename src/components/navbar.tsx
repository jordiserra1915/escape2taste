"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, UtensilsCrossed, Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
      <nav className="container-site flex h-14 items-center justify-between sm:h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Compass className="h-5 w-5 text-amber-400" />
          <span>Escape2Taste</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
          <Link href="/" className="hover:text-amber-400">
            Inicio
          </Link>
          <Link href="/experiencias" className="hover:text-amber-400">
            Destinos
          </Link>
          <Link href="/servicios" className="hover:text-amber-400">
            Servicios
          </Link>
          <Link href="/dashboard" className="hover:text-amber-400">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-amber-400">
            Login
          </Link>
          <a
            href="#reserva"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 font-medium text-zinc-950 transition hover:bg-amber-400"
          >
            <UtensilsCrossed className="h-4 w-4" />
            Reservar
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-200 hover:bg-white/10 md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-black/90 backdrop-blur md:hidden">
          <div className="container-site flex flex-col gap-1 py-4 text-sm">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-zinc-200 hover:bg-white/10 hover:text-amber-400"
            >
              Inicio
            </Link>
            <Link
              href="/experiencias"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-zinc-200 hover:bg-white/10 hover:text-amber-400"
            >
              Destinos
            </Link>
            <Link
              href="/servicios"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-zinc-200 hover:bg-white/10 hover:text-amber-400"
            >
              Servicios
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-zinc-200 hover:bg-white/10 hover:text-amber-400"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-zinc-200 hover:bg-white/10 hover:text-amber-400"
            >
              Login
            </Link>
            <a
              href="#reserva"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-amber-400"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Reservar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
