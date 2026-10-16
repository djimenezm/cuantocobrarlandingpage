import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ejemplo de presupuesto de landing page',
  description: 'Acceso al ejemplo de propuesta de esta calculadora.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitPresupuestoRedirectPage() {
  redirect('/ejemplo-presupuesto-landing-page#modelo-presupuesto');
}
