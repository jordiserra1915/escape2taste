-- Elimina el set inicial de prototipo (Costa Brava / Barcelona / Priorat) por si aún existiera.
delete from purchases
where experience_id in ('costa-brava', 'barcelona-nocturna', 'priorat-secret');

delete from bookings
where experience_id in ('costa-brava', 'barcelona-nocturna', 'priorat-secret');

delete from experiences
where id in ('costa-brava', 'barcelona-nocturna', 'priorat-secret');

insert into experiences (id, title, city, duration_hours, level, price_eur, image_url, description, tags)
values
  (
    'costa-rica',
    'Costa Rica · Pura Vida & Coffee',
    'Costa Rica',
    6,
    'easy',
    129,
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    'Ruta en 4x4 con desayunos de gallo pinto, cafetales, frutas tropicales y aventura en Monteverde.',
    '{"américa","naturaleza","coffee"}'
  ),
  (
    'nueva-york',
    'Nueva York · The Big Apple Bite',
    'Nueva York',
    5,
    'intermediate',
    149,
    'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80',
    'Pizza en Brooklyn, dim sum en Chinatown, bagels y cócteles en azoteas de Manhattan.',
    '{"américa","urbano","street food"}'
  ),
  (
    'chicago',
    'Chicago · Deep Dish & Blues',
    'Chicago',
    5,
    'hard',
    139,
    'https://images.unsplash.com/photo-1477414956199-0c77f3c0e7dd?auto=format&fit=crop&w=1200&q=80',
    'La famosa pizza deep dish, hot dogs estilo Chicago y noches de música en bares legendarios.',
    '{"américa","pizza","música"}'
  ),
  (
    'apulia',
    'Italia · Apulia Roadtrip al Sur',
    'Apulia',
    4,
    'easy',
    119,
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    'Playas de roca, burrata fresca, focaccia y pueblos blancos con alma mediterránea.',
    '{"europa","roadtrip","italia"}'
  ),
  (
    'piemonte',
    'Piemonte · Trufas y Barolo',
    'Piemonte',
    6,
    'hard',
    189,
    'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1200&q=80',
    'Caza de trufa blanca en Alba y catas de tintos con cuerpo en colinas históricas.',
    '{"europa","vino","premium"}'
  ),
  (
    'provenza',
    'Francia · Provenza Lavanda y Rosé',
    'Provenza',
    4,
    'intermediate',
    159,
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    'Pueblos de artistas, mercados al aire libre y una ruta gastronómica entre viñedos.',
    '{"europa","francia","mercados"}'
  ),
  (
    'islas-griegas',
    'Islas Griegas · Azul Mediterráneo',
    'Islas Griegas',
    5,
    'easy',
    169,
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    'Tabernas junto al mar, pulpo a la brasa, queso feta y ferris entre islas.',
    '{"europa","islas","mediterráneo"}'
  ),
  (
    'japon',
    'Japón · Luces de Neón y Sushi',
    'Japón',
    6,
    'intermediate',
    199,
    'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80',
    'Izakayas ruidosas, ramen nocturno, trenes bala y mezcla única de tradición y cultura pop.',
    '{"asia","sushi","urbano"}'
  ),
  (
    'singapur',
    'Singapur · Hawker Centers',
    'Singapur',
    4,
    'intermediate',
    179,
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    'Comida callejera de clase mundial, jardines futuristas y mezcla cultural vibrante.',
    '{"asia","street food","futurista"}'
  ),
  (
    'seychelles',
    'Seychelles · Paraíso Tropical',
    'Seychelles',
    5,
    'easy',
    209,
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    'Senderismo en jungla, currys de pescado y paisajes de postal con ritmo isleño.',
    '{"exótico","playa","naturaleza"}'
  )
on conflict (id) do update set
  title = excluded.title,
  city = excluded.city,
  duration_hours = excluded.duration_hours,
  level = excluded.level,
  price_eur = excluded.price_eur,
  image_url = excluded.image_url,
  description = excluded.description,
  tags = excluded.tags;
