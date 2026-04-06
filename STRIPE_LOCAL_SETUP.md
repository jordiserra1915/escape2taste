# Stripe local setup

## 1) Instalar Stripe CLI (macOS)

```bash
brew install stripe/stripe-cli/stripe
```

## 2) Login en Stripe CLI

```bash
stripe login
```

## 3) Variables en `.env.local`

Añade estas variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

`STRIPE_WEBHOOK_SECRET` te lo da el comando del listener (paso 5).

## 4) Arrancar app

```bash
npm run dev
```

## 5) Escuchar webhooks y reenviar a Next.js

En otra terminal:

```bash
npm run stripe:listen
```

Cuando arranque verás algo como:

`Ready! Your webhook signing secret is whsec_...`

Copia ese valor en `STRIPE_WEBHOOK_SECRET` y reinicia `npm run dev`.

## 6) Probar flujo real de compra

1. Regístrate o haz login en la app.
2. Ve a `http://localhost:3000/experiencias`.
3. Pulsa `Comprar` en una experiencia.
4. En Stripe Checkout usa tarjeta de test `4242 4242 4242 4242`, fecha futura y CVC cualquiera.
5. Al completar, vuelve a `/checkout/success`.
6. Verifica compra en `/dashboard`.

## 7) (Opcional) Disparar evento de prueba desde CLI

```bash
npm run stripe:trigger
```

Esto envía un `checkout.session.completed` de prueba al webhook local.
