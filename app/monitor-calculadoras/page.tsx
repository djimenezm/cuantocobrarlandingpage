import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Monitor Calculadoras | AdSense y Search Console' },
  description: 'Seguimiento privado de aprobación en AdSense e indexación de guías en Search Console, con acceso autorizado de solo lectura.',
  alternates: { canonical: '/monitor-calculadoras' },
};

export default function MonitorPage() {
  return (
    <>
      <h1>Monitor Calculadoras</h1>
      <p>
        Herramienta privada de {siteConfig.ownerName} para consultar el estado de aprobación
        de sus sitios en Google AdSense y la indexación de cuatro guías en Search Console.
        Le avisa únicamente cuando confirma un cambio.
      </p>

      <section className="legal-section">
        <h2>Qué hace</h2>
        <p>
          El proceso utiliza las APIs oficiales de Google. En AdSense consulta los estados
          de aprobación de los cuatro sitios configurados. En Search Console inspecciona
          las cuatro URLs exactas de las guías y su versión registrada en el índice de Google,
          no una prueba de la página publicada. Guarda los resultados y la fecha de consulta.
          La automatización compara cada resultado con su última referencia y confirma
          cualquier cambio mediante una segunda consulta independiente antes de avisar.
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
          Cada seguimiento tiene su propia autorización de solo lectura:{' '}
          <code>https://www.googleapis.com/auth/adsense.readonly</code> para AdSense y{' '}
          <code>https://www.googleapis.com/auth/webmasters.readonly</code> para Search Console.
          El monitor no activa anuncios, no cambia los sitios, no solicita revisiones ni
          reenvía peticiones de indexación. Tampoco acelera ni garantiza las decisiones de Google.
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
          ni forma parte de sus equipos de AdSense o Search Console.
        </p>
      </section>
    </>
  );
}
