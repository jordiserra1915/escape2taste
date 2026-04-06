import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const experienceId = session.metadata?.experience_id;
    const totalCents = session.amount_total ?? 0;

    if (userId && experienceId) {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.from("purchases").insert({
          user_id: userId,
          experience_id: experienceId,
          stripe_session_id: session.id,
          amount_eur: Math.round(totalCents / 100)
        });
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
