export type TravelInfo = {
  /** Días recomendados de viaje */
  days: string;
  /** Mejor época para viajar */
  bestSeason: string;
  /** Presupuesto orientativo por pareja (sin vuelos) */
  budgetCouple: string;
  /** Nivel de presupuesto: low, mid, high */
  budgetLevel: "low" | "mid" | "high";
  /** Dificultad logística */
  logistics: "fácil" | "moderada" | "compleja";
  /** Zona geográfica */
  zone: "europa" | "américa" | "asia" | "islas";
  /** Vuelo medio ida/vuelta desde España (por persona) */
  flightEstimate: string;
};

const travelData: Record<string, TravelInfo> = {
  "costa-rica": {
    days: "10–14 días",
    bestSeason: "Dic – Abr",
    budgetCouple: "2.200–2.800 €",
    budgetLevel: "mid",
    logistics: "moderada",
    zone: "américa",
    flightEstimate: "550–750 €",
  },
  "nueva-york": {
    days: "5–7 días",
    bestSeason: "Abr – Jun / Sep – Nov",
    budgetCouple: "2.400–3.200 €",
    budgetLevel: "mid",
    logistics: "fácil",
    zone: "américa",
    flightEstimate: "350–550 €",
  },
  chicago: {
    days: "4–6 días",
    bestSeason: "May – Oct",
    budgetCouple: "2.000–2.600 €",
    budgetLevel: "mid",
    logistics: "fácil",
    zone: "américa",
    flightEstimate: "400–600 €",
  },
  apulia: {
    days: "5–7 días",
    bestSeason: "May – Oct",
    budgetCouple: "1.000–1.500 €",
    budgetLevel: "low",
    logistics: "fácil",
    zone: "europa",
    flightEstimate: "80–180 €",
  },
  piemonte: {
    days: "4–6 días",
    bestSeason: "Sep – Nov",
    budgetCouple: "1.200–1.800 €",
    budgetLevel: "low",
    logistics: "fácil",
    zone: "europa",
    flightEstimate: "60–150 €",
  },
  provenza: {
    days: "5–7 días",
    bestSeason: "Jun – Sep",
    budgetCouple: "1.100–1.600 €",
    budgetLevel: "low",
    logistics: "fácil",
    zone: "europa",
    flightEstimate: "60–140 €",
  },
  "islas-griegas": {
    days: "7–10 días",
    bestSeason: "May – Oct",
    budgetCouple: "1.400–2.000 €",
    budgetLevel: "low",
    logistics: "moderada",
    zone: "europa",
    flightEstimate: "120–250 €",
  },
  japon: {
    days: "12–16 días",
    bestSeason: "Mar – May / Oct – Nov",
    budgetCouple: "3.500–5.000 €",
    budgetLevel: "high",
    logistics: "compleja",
    zone: "asia",
    flightEstimate: "500–800 €",
  },
  singapur: {
    days: "4–6 días",
    bestSeason: "Feb – Abr",
    budgetCouple: "2.000–2.800 €",
    budgetLevel: "mid",
    logistics: "fácil",
    zone: "asia",
    flightEstimate: "400–650 €",
  },
  seychelles: {
    days: "8–12 días",
    bestSeason: "Abr – May / Oct – Nov",
    budgetCouple: "3.200–4.500 €",
    budgetLevel: "high",
    logistics: "moderada",
    zone: "islas",
    flightEstimate: "500–800 €",
  },
};

export function getTravelInfo(experienceId: string): TravelInfo | null {
  return travelData[experienceId] ?? null;
}

export function getBudgetLabel(level: TravelInfo["budgetLevel"]): string {
  if (level === "low") return "Económico";
  if (level === "high") return "Premium";
  return "Moderado";
}

export function getLogisticsColor(logistics: TravelInfo["logistics"]): string {
  if (logistics === "fácil") return "text-green-400";
  if (logistics === "compleja") return "text-amber-400";
  return "text-yellow-300";
}
