import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <section className='container-site py-20'>
      <h1 className='text-3xl font-bold'>Pago cancelado</h1>
      <p className='mt-3 text-zinc-300'>No se realizó ningún cargo. Puedes intentarlo de nuevo cuando quieras.</p>
      <Link href='/experiencias' className='mt-6 inline-block rounded-xl border border-white/20 px-4 py-2 font-semibold'>
        Volver a experiencias
      </Link>
    </section>
  );
}
