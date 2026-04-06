import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { PurchasesList } from "@/components/dashboard/purchases-list";

export const metadata = {
  title: "Dashboard | Escape2Taste"
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id, amount_eur, created_at, experiences(title, city)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <section className="container-site py-14">
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Tu panel de compras</h1>
      <p className="mt-4 max-w-3xl text-zinc-300">
        Aquí verás todas las experiencias adquiridas y el histórico de pagos.
      </p>

      <div className="mt-10">
        <PurchasesList purchases={(purchases ?? []) as never[]} />
      </div>
    </section>
  );
}
