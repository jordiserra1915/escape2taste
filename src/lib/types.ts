export type Experience = {
  id: string;
  title: string;
  city: string;
  duration_hours: number;
  level: "easy" | "intermediate" | "hard";
  price_eur: number;
  image_url: string;
  description: string;
  tags: string[];
  /** Texto largo para ficha; si falta, se usa contenido editorial local o `description`. */
  long_description?: string | null;
  highlights?: string[] | null;
  /** URLs de fotos para la galería de la ficha de detalle. */
  gallery?: string[];
};

export type BookingPayload = {
  fullName: string;
  email: string;
  people: number;
  experienceId: string;
  date: string;
};
