import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { landingProposalDownload } from '@/lib/landingProposal';

export const metadata: Metadata = {
  title: 'Descargando versión en texto',
  description: 'Descarga del ejemplo de presupuesto de landing page en texto.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitPresupuestoTextoRedirectPage() {
  redirect(landingProposalDownload);
}
