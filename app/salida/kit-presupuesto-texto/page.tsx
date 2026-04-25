import type { Metadata } from 'next';
import TrackedRedirectPage from '@/components/TrackedRedirectPage';

const destination =
  'https://www.cuantopresupuestar.es/recursos/kit-presupuesto-freelance.txt?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-link&utm_campaign=kit-recomendado';

export const metadata: Metadata = {
  title: 'Descargando version en texto',
  description: 'Ruta interna para medir clics a la version en texto del kit recomendado.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitPresupuestoTextoRedirectPage() {
  return (
    <TrackedRedirectPage
      destination={destination}
      title="Abriendo la version en texto"
      description="Registro este clic dentro de la landing y te llevo a la descarga del kit en texto."
      buttonLabel="Ir a la descarga"
    />
  );
}
