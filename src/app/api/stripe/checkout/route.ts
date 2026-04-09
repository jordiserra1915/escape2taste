import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getStripeClient } from "@/lib/stripe/client";
import { getServicePlan, type ServicePlan } from "@/lib/service-plans";

type CheckoutBody = {
  experienceId: string;
  planId: ServicePlan["id"];
};

export async function POST(request: Request) {
  const { experienceId, planId } = (await request.json()) as CheckoutBody;

  if (!experienceId) {
    return NextResponse.json({ error: "experienceId es obligatorio." }, { status: 400 });
  }

  const plan = getServicePlan(planId);
  if (!plan) {
    return NextResponse.json({ error: "Plan de servicio no válido." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const { data: experience, error } = await supabase
    .from("experiences")
    .select("id, title")
    .eq("id", experienceId)
    .single();

  if (error || !experience) {
    return NextResponse.json({ error: "Experiencia no encontrada." }, { status: 404 });
  }

  const stripe = getStripeClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/experiencias/${experience.id}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          product_data: {
            name: `${plan.name} — ${experience.title}`,
            description: plan.tagline,
          },
          unit_amount: plan.price_eur * 100,
        },
      },
    ],
    metadata: {
      user_id: user.id,
      experience_id: experience.id,
      plan_id: plan.id,
      expected_amount_cents: String(plan.price_eur * 100),
    },
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
