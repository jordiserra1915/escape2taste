import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <section className='container-site py-20'>
      <h1 className='text-3xl font-bold'>Pago completado</h1>
      <p className='mt-3 text-zinc-300'>Tu compra fue registrada correctamente.</p>
      <Link href='/dashboard' className='mt-6 inline-block rounded-xl bg-amber-500 px-4 py-2 font-semibold text-zinc-950'>
        Ver mis compras
      </Link>
    </section>
  );
}
