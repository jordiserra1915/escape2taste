type Purchase = {
  id: number;
  amount_eur: number;
  created_at: string;
  experiences: {
    title: string;
    city: string;
  } | null;
};

export function PurchasesList({ purchases }: { purchases: Purchase[] }) {
  if (purchases.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-zinc-300">
        Aún no tienes compras. Explora experiencias y completa tu primer checkout.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {purchases.map((purchase) => (
        <article
          key={purchase.id}
          className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 md:flex-row"
        >
          <div>
            <p className="text-lg font-semibold">
              {purchase.experiences?.title ?? "Experiencia"}
            </p>
            <p className="text-sm text-zinc-300">{purchase.experiences?.city ?? "Sin ciudad"}</p>
            <p className="mt-2 text-xs text-zinc-400">
              Compra: {new Date(purchase.created_at).toLocaleDateString("es-ES")}
            </p>
          </div>
          <p className="text-lg font-semibold text-amber-300">{purchase.amount_eur} EUR</p>
        </article>
      ))}
    </div>
  );
}
