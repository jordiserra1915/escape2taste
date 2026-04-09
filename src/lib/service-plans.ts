export type ServicePlan = {
  id: "asesoria" | "planificacion" | "integral";
  name: string;
  tagline: string;
  price_eur: number;
  features: string[];
  highlighted?: boolean;
};

export const servicePlans: ServicePlan[] = [
  {
    id: "asesoria",
    name: "Asesoría de ruta",
    tagline: "Te diseñamos la ruta ideal para tu destino",
    price_eur: 50,
    features: [
      "Itinerario personalizado día a día",
      "Recomendaciones gastronómicas locales",
      "Mapa interactivo con puntos clave",
      "Consejos prácticos y timing",
    ],
  },
  {
    id: "planificacion",
    name: "Planificación completa",
    tagline: "Organizamos todo el viaje por ti",
    price_eur: 250,
    features: [
      "Todo lo de Asesoría de ruta",
      "Planificación detallada de transporte",
      "Selección de alojamientos recomendados",
      "Agenda optimizada con alternativas",
      "Soporte por email durante el viaje",
    ],
    highlighted: true,
  },
  {
    id: "integral",
    name: "Planificación + Reservas",
    tagline: "Viaja sin preocuparte de nada",
    price_eur: 600,
    features: [
      "Todo lo de Planificación completa",
      "Reserva de vuelos y traslados",
      "Reserva de hoteles y alojamientos",
      "Reserva de restaurantes destacados",
      "Soporte prioritario durante el viaje",
    ],
  },
];

export function getServicePlan(id: ServicePlan["id"]): ServicePlan | undefined {
  return servicePlans.find((p) => p.id === id);
}
