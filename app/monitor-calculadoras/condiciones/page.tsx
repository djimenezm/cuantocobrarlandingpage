import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Condiciones de uso | Monitor Calculadoras' },
  description: 'Alcance, límites y condiciones de uso del monitor privado de estados de aprobación de Google AdSense.',
  alternates: { canonical: '/monitor-calculadoras/condiciones' },
};

export default function MonitorTermsPage() {
  return (
    <>
      <h1>Condiciones de uso</h1>
      <p>
        Monitor Calculadoras es una herramienta privada gestionada por{' '}
        <strong>{siteConfig.ownerName}</strong> para el seguimiento de sus propios sitios.
        Estas páginas describen la herramienta; no ofrecen un servicio público de conexión
        de cuentas de AdSense.
      </p>

      <section className="legal-section">
        <h2>Autorización y alcance</h2>
        <p>
          Solo el titular o una persona autorizada puede completar el consentimiento de
          Google. El monitor solicita acceso de solo lectura y no obtiene permiso para
          activar anuncios, cambiar sitios o reenviar solicitudes de revisión.
          Sus credenciales no deben compartirse ni incorporarse al código público.
        </p>
      </section>

      <section className="legal-section">
        <h2>Resultados y avisos</h2>
        <p>
          Un estado corresponde a la respuesta de la API en la fecha indicada, no a una
          garantía de permanencia. Un error de acceso, un archivo antiguo o una ejecución
          fallida no acreditan que el estado del sitio siga igual. La automatización debe
          contrastar un posible cambio antes de notificarlo.
        </p>
        <p>
          La aprobación y los plazos de revisión dependen exclusivamente de Google.
          Esta herramienta no acelera el proceso ni garantiza que un sitio pueda mostrar anuncios.
          Los avisos complementan, pero no sustituyen, las comunicaciones y la consola de AdSense.
        </p>
      </section>

      <section className="legal-section">
        <h2>Disponibilidad y retirada</h2>
        <p>
          El funcionamiento depende de una autorización válida, de Google, de GitHub Actions
          y del servicio de automatización. Puede interrumpirse por caducidad, revocación,
          límites o fallos de esos servicios. No se garantiza una disponibilidad continua.
        </p>
        <p>
          El titular puede detener el seguimiento, retirar el acceso a Google y eliminar
          sus credenciales cuando lo decida. El tratamiento y la conservación de datos se
          explican en la <Link href="/monitor-calculadoras/privacidad">política de privacidad del monitor</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contacto e independencia</h2>
        <p>
          Para consultas, escribe a{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          Monitor Calculadoras no pertenece a Google y no representa a su equipo de AdSense.
        </p>
      </section>
    </>
  );
}
