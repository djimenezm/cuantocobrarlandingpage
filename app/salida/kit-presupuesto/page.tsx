import type { Metadata } from 'next';
import TrackedRedirectPage from '@/components/TrackedRedirectPage';

const destination =
  'https://www.cuantopresupuestar.es/kit-presupuesto-freelance?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-link&utm_campaign=kit-recomendado';

export const metadata: Metadata = {
  title: 'Abriendo kit recomendado',
  description: 'Ruta interna para medir clics al kit recomendado.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitPresupuestoRedirectPage() {
  return (
    <TrackedRedirectPage
      destination={destination}
      title="Abriendo el kit recomendado"
      description="Registro este clic dentro de la landing y te llevo al kit real de Cuánto Presupuestar."
      buttonLabel="Ir al kit ahora"
    />
  );
}
