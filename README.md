# Escape2Taste

Aplicación web profesional construida con Next.js (App Router), Tailwind CSS, Lucide React y Supabase.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Lucide React
- Supabase
- Stripe Checkout

## Configuración local

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea tu archivo de entorno:

   ```bash
   cp .env.example .env.local
   ```

3. Configura tus credenciales de Supabase y Stripe en `.env.local`.

4. Crea las tablas en Supabase ejecutando `supabase/schema.sql`.
5. (Opcional) Inserta datos iniciales con `supabase/seed.sql`.

6. Inicia el servidor:

   ```bash
   npm run dev
   ```

## Funcionalidades incluidas

- Home marketing de alto impacto para Escape2Taste
- Catálogo de experiencias
- Autenticación (Login/Registro) con Supabase
- Checkout de pagos con Stripe
- Webhook base para registrar compras
- Dashboard de usuario con histórico de compras
- Integración con Supabase y fallback de datos demo

## Estructura base

- `src/app/(auth)/login` y `src/app/(auth)/registro`: pantallas de autenticación
- `src/app/(main)/dashboard`: panel de usuario autenticado
- `src/app/api/stripe/checkout`: creación de sesión de pago de Stripe
- `src/app/api/stripe/webhook`: recepción de eventos de Stripe
- `src/app/api/auth/callback`: callback de autenticación de Supabase
- `src/components/auth`: componentes de formularios auth
- `src/components/dashboard`: componentes del panel de compras
- `src/lib/supabase-browser.ts` y `src/lib/supabase-server.ts`: helpers de cliente/servidor
- `src/lib/stripe/client.ts`: cliente servidor de Stripe
- `supabase/migrations/20260406_init.sql`: esquema inicial con experiencias y compras

Para pruebas locales de pagos, sigue `STRIPE_LOCAL_SETUP.md`.

Si no ves experiencias en la web, comprueba datos y proyecto con:

```bash
npm run db:check
```
