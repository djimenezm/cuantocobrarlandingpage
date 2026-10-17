import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Monitor Calculadoras | Seguimiento de AdSense' },
  description: 'Monitor privado de los estados de aprobación de las calculadoras en Google AdSense, mediante acceso autorizado de solo lectura.',
  alternates: { canonical: '/monitor-calculadoras' },
};

export default function MonitorPage() {
  return (
    <>
      <h1>Monitor Calculadoras</h1>
      <p>
        Herramienta privada de {siteConfig.ownerName} para consultar el estado de aprobación
        de sus sitios en Google AdSense y avisarle cuando cambia.
      </p>

      <section className="legal-section">
        <h2>Qué hace</h2>
        <p>
          El proceso de consulta utiliza la API oficial de Google AdSense. Busca el sitio
          configurado en la cuenta autorizada y genera un archivo con su estado y la fecha
          de comprobación. La automatización compara ese resultado con el último estado
          confirmado antes de avisar al titular.
        </p>
        <p>
          Las consultas preparadas para este monitor se ejecutan en GitHub Actions, sin
          depender de que el ordenador personal permanezca encendido. Su funcionamiento
          requiere completar la autorización de Google y verificar una consulta real.
        </p>
      </section>

      <section className="legal-section">
        <h2>Acceso de solo lectura</h2>
        <p>
          El único permiso solicitado es <code>https://www.googleapis.com/auth/adsense.readonly</code>.
          El monitor no activa anuncios, no cambia la configuración de los sitios y no
          solicita revisiones. Tampoco acelera ni garantiza la aprobación de Google.
        </p>
        <p>
          La autorización se completa directamente en Google por el titular de la cuenta.
          No se piden contraseñas en esta web ni se ofrece conectar cuentas de terceros.
          Visitar esta página no concede acceso a ninguna cuenta.
        </p>
      </section>

      <section className="legal-section">
        <h2>Información y contacto</h2>
        <p>
          Consulta la <Link href="/monitor-calculadoras/privacidad">política de privacidad del monitor</Link>{' '}
          y sus <Link href="/monitor-calculadoras/condiciones">condiciones de uso</Link> antes
          de autorizarlo. Puedes retirar el acceso en cualquier momento desde las{' '}
          <a href="https://myaccount.google.com/connections">conexiones de tu Cuenta de Google</a>.
        </p>
        <p>
          Responsable: <strong>{siteConfig.ownerName}</strong>. Contacto:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
        <p>
          Monitor Calculadoras es una herramienta independiente. No es un producto de Google
          ni forma parte de su equipo de revisión de AdSense.
        </p>
      </section>
    </>
  );
}
