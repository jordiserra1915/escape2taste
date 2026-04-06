import { Experience } from "@/lib/types";

export type ExperienceRichContent = {
  longDescription: string;
  highlights: string[];
  essentialTips: string[];
};

const details: Record<string, ExperienceRichContent> = {
  "costa-rica": {
    longDescription:
      "Costa Rica mezcla selva, volcanes y una cultura gastronómica donde el café y la fruta tropical son el hilo conductor. Esta experiencia está pensada para parejas activas: días largos con sabor local, paradas en mercados y momentos de naturaleza que refrescan el ritmo. Es un viaje de contrastes: calor humano, rutas con intención y mesas sencillas pero memorables.",
    highlights: [
      "Ruta en 4x4 y micro-aventura con enfoque foodie (sin perder comodidad).",
      "Gallo pinto, café de especialidad y fruta de estación como ritual diario.",
      "Selva y canopy en clave slow: energía, no carrera."
    ],
    essentialTips: [
      "Lleva capa ligera impermeable: el clima cambia en horas.",
      "Prueba soda típica al mediodía: casado y plato del día son la mejor carta posible.",
      "Reserva tiempo “sin plan” tras el mercado: los mejores bocados salen del improviso."
    ]
  },
  "nueva-york": {
    longDescription:
      "Nueva York es un rompecabezas delicioso: barrios que se saben distintos, ritmo alto y propuestas infinitas. Aquí el viaje se entiende caminando: un trozo de pizza aquí, un dim sum allá, un buen bagel al amanecer. La ciudad premia a quien organiza bien el día y deja huecos para el azar.",
    highlights: [
      "Brooklyn y Manhattan en clave sibarita (sin postureo).",
      "Chinatown como aula viva de contrastes y aromas.",
      "Atardeceres en azotea con bebida bien elegida."
    ],
    essentialTips: [
      "Camina con zapatillas cómodas; aquí el metro y la calle son el 80% del viaje.",
      "Reserva 1–2 restaurantes ‘must’, el resto déjalo mercado/street.",
      "Evita cadenas en zonas ultra turísticas: cruza dos calles y cambia el precio y el sabor."
    ]
  },
  chicago: {
    longDescription:
      "Chicago es sabor americano con alma de barrio: deep dish que divide opiniones (en el buen sentido), hot dogs con reglas no escritas y una escena musical que acompaña la noche. Ideal si te gusta ciudad con carácter, conversación en barra y platos que reconfortan.",
    highlights: [
      "Deep dish, clásicos urbanos y bares con historia.",
      "Ritmo de blues y vida nocturna con propósito (no solo “salir”).",
      "Arquitectura y paseos junto al lago para oxigenar la ruta."
    ],
    essentialTips: [
      "Compara dos estilos de pizza: la experiencia está en entender la tradición local.",
      "Pide recomendación al camarero: aquí el servicio suele ser parte del show.",
      "Planifica layers de ropa: el viento del lago cambia la sensación térmica."
    ]
  },
  apulia: {
    longDescription:
      "Apulia es olivo, sal y cocina de proximidad: mesas largas, productos honestos y pueblos que invitan a quedarse un café más. Un roadtrip pausado por el sur italiano, con focaccia reciente, mar cercano y conversaciones sencillas que saben a lujo real.",
    highlights: [
      "Roadtrip mediterráneo con paradas de mercado y productores.",
      "Quesos frescos, verdura de huerto y focaccia como religión.",
      "Pueblos blancos y calas sin necesidad de ‘postureo’."
    ],
    essentialTips: [
      "Alquila coche: aquí el ritmo lo marca la costa y los interior roads.",
      "Cena tarde y sin prisa: el sur entiende la mesa como tiempo de calidad.",
      "Pregunta por el vino local del pueblo: suele ser la mejor relación calidad/emoción."
    ]
  },
  piemonte: {
    longDescription:
      "Piemonte es tierra de intención: colinas ordenadas, nieblas suaves y una cocina que abraza. Es un destino para paladares curiosos que disfrutan bodega, bosque y tradición. La trufa y el Barolo no son un tick: son el telón de fondo de una escapada profunda.",
    highlights: [
      "Experiencia gourmet con pies en el territorio (no solo restaurante).",
      "Vinotecas y visitas con conversación, sin prisa.",
      "Paisajes de colinas que en otoño se vuelven icónicos."
    ],
    essentialTips: [
      "Reserva catas con antelación en temporada alta.",
      "Combina ciudad pequeña + paisaje: el contraste enriquece.",
      "Si pruebas trufa, confía en la temporada: el sabor cambia muchísimo."
    ]
  },
  provenza: {
    longDescription:
      "Provenza huele a hierbas, mercados al sol y rosé honesto. Es un viaje de pueblos con nombre propio, terrazas lentas y cocina que entiende el producto como protagonista. Perfecto para quien quiere belleza sin estridencia.",
    highlights: [
      "Mercados al aire libre y cocina de proximidad.",
      "Pueblos con encanto y rutas cortas entre viñedos.",
      "Rosé y cocina mediterránea con mano ligera."
    ],
    essentialTips: [
      "Muévete en coche: la magia está entre un pueblo y el siguiente.",
      "Compra en mercado por la mañana: lo mejor vuela pronto.",
      "Lleva sombrero y agua: el sol en julio es serie."
    ]
  },
  "islas-griegas": {
    longDescription:
      "Las islas invitan a ritmo marinero: paseos cortos, almuerzos largos y cenas con el rumor del agua cerquísima. Grecia se disfruta con apetito y calendario flexible, descubriendo tabernas que no necesitan filtros para ser perfectas.",
    highlights: [
      "Tabernas junto al mar y pesca del día como filosofía.",
      "Saltos entre islas con tiempo para no hacer nada (bien hecho).",
      "Sabores mediterráneos directos: aceite, hierbas, limón."
    ],
    essentialTips: [
      "Evita solo ‘los puntos más famosos’: a veces la isla vecina lo paga con calma.",
      "Pregunta el meze del día: suele ser oro.",
      "Protege del viento marino en barco: una chaqueta fina salva la tarde."
    ]
  },
  japon: {
    longDescription:
      "Japón es contraste en equilibrio: orden, sabor intenso y detalle obsesivo. Entre izakayas, ramen de medianoche y trenes que cambian de paisaje en minutos, el viaje se vive con curiosidad y respeto por las pequeñas reglas que hacen que todo funcione mejor.",
    highlights: [
      "Noches de izakaya y sabores umami sin complicarse.",
      "Tren y ciudad: eficiencia que multiplica tiempo libre.",
      "Cultura pop y tradición conviviendo sin discutir."
    ],
    essentialTips: [
      "Lleva efectivo: sigue siendo rey en muchos sitios pequeños.",
      "Aprende 3 frases básicas: se nota en la hospitalidad de la barra.",
      "Respeta colas y turnos: el flujo del servicio depende de eso."
    ]
  },
  singapur: {
    longDescription:
      "Singapur condensa Asia en un cruce de sabores: hawker centers donde el mundo comparte mesa, jardines imposibles y una limpieza que sorprende. Es un destino corto pero intenso, perfecto para comer fuerte y pasear entre contrastes futuristas y tradición.",
    highlights: [
      "Street food de altísimo nivel sin pose.",
      "Mezcla cultural traducida en platos y barrios.",
      "Arquitectura y verde urbano con aire casi sci-fi."
    ],
    essentialTips: [
      "Ve con hambre y lista corta: demasiadas opciones pueden paralizar.",
      "Combina barrios en el mismo día, pero sin exceso de calor si viajas en temporada húmeda.",
      "Hidrátate: el clima puede pasar factura rápido."
    ]
  },
  seychelles: {
    longDescription:
      "Seychelles es naturaleza con ritmo isleño: selva, playas increíbles y cocina que habla de mar y especias. Más allá del cliché postal, hay rutas que piden calzado serio, puestos donde el pescado manda y tardes lentas que saben a premio.",
    highlights: [
      "Selva y playa en el mismo día (con el ritmo adecuado).",
      "Currys y pescado con influencias que cuentan una historia.",
      "Escapada romántica sin perder espíritu aventurero."
    ],
    essentialTips: [
      "Protección solar seria + repelente: la naturaleza aquí es real, no decorativa.",
      "Pregunta por pescado local y fruta de temporada: cambia el viaje.",
      "Planea traslados con margen: el tiempo isleño es distinto."
    ]
  }
};

export function getExperienceContent(experience: Experience): ExperienceRichContent {
  const fallback = details[experience.id];
  const longDescription =
    (experience.long_description && experience.long_description.trim()) ||
    fallback?.longDescription ||
    experience.description;
  const highlights =
    experience.highlights && experience.highlights.length > 0
      ? experience.highlights
      : (fallback?.highlights ?? []);
  const essentialTips = fallback?.essentialTips ?? [];

  return { longDescription, highlights, essentialTips };
}
