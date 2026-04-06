import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(projectRoot, ".env.local");

function loadEnvLocal() {
  if (!existsSync(envPath)) {
    console.error("No encuentro .env.local en la raíz del proyecto:");
    console.error(envPath);
    console.error("");
    console.error("Crea el archivo: cp .env.example .env.local");
    console.error("O ejecuta desde la carpeta escape2taste: npm run db:check");
    process.exit(1);
  }

  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!url || !anonKey) {
  console.error("Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local");
  process.exit(1);
}

let host;
try {
  host = new URL(url).host;
} catch {
  console.error("NEXT_PUBLIC_SUPABASE_URL no es una URL válida (debe ser https://....supabase.co)");
  process.exit(1);
}

console.log("Proyecto Supabase (host):", host);

const supabase = createClient(url, anonKey);

const { data, error } = await supabase
  .from("experiences")
  .select("id, title, price_eur")
  .limit(5);

if (error) {
  console.error("");
  console.error("Error al leer la tabla experiences:");
  console.error("  Mensaje:", error.message);
  if (error.code) console.error("  Código:", error.code);
  if (error.details) console.error("  Detalle:", error.details);
  if (error.hint) console.error("  Pista:", error.hint);
  console.error("");
  console.error("Comprueba en Supabase → Settings → API:");
  console.error('  - "Project URL" = NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - clave "anon" / "public" = NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.error("Si acabas de activar RLS, ejecuta de nuevo supabase/schema.sql (política de lectura).");
  process.exit(2);
}

const n = data?.length ?? 0;
console.log("Filas en experiences:", n);
if (n > 0) console.log(data);

if (n === 0) {
  console.log("");
  console.log("La tabla está vacía en ESTE proyecto.");
  console.log("1) Supabase → SQL Editor → pega y ejecuta supabase/schema.sql");
  console.log("2) Luego ejecuta supabase/seed.sql");
  console.log("3) Vuelve a correr: npm run db:check");
}
