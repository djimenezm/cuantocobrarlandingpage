import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Condiciones de uso | Monitor Calculadoras' },
  description: 'Alcance y límites del seguimiento privado de aprobación en AdSense e indexación en Search Console.',
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
        de cuentas de AdSense o Search Console.
      </p>

      <section className="legal-section">
        <h2>Autorización y alcance</h2>
        <p>
          Solo el titular o una persona autorizada puede completar el consentimiento de
          Google. El monitor solicita acceso de solo lectura y no obtiene permiso para
          activar anuncios, cambiar sitios o reenviar solicitudes de revisión o indexación.
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
          La aprobación, la indexación y sus plazos dependen exclusivamente de Google.
          Esta herramienta no acelera el proceso ni garantiza anuncios o posicionamiento.
          Que una URL pueda indexarse no demuestra que ya esté indexada. Los cambios de
          motivo de exclusión, las fechas de rastreo y los fallos de acceso no son por sí
          solos cambios de indexación. Los avisos complementan, pero no sustituyen, las
          comunicaciones y consolas de AdSense y Search Console.
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
          Monitor Calculadoras no pertenece a Google y no representa a sus equipos de AdSense o Search Console.
        </p>
      </section>
    </>
  );
}
