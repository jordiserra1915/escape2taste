import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { BookingPayload } from "@/lib/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as BookingPayload;

  if (
    !payload.fullName ||
    !payload.email ||
    !payload.date ||
    !payload.experienceId ||
    payload.people < 1
  ) {
    return NextResponse.json({ error: "Datos inválidos en la solicitud." }, { status: 400 });
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      {
        message:
          "Reserva recibida en modo demo. Configura Supabase para almacenar las reservas en la base de datos."
      },
      { status: 200 }
    );
  }

  const { error } = await supabase.from("bookings").insert({
    full_name: payload.fullName,
    email: payload.email,
    people: payload.people,
    experience_id: payload.experienceId,
    booking_date: payload.date
  });

  if (error) {
    return NextResponse.json(
      { error: "No fue posible guardar la reserva en este momento." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Reserva registrada correctamente." }, { status: 201 });
}
