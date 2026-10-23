import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Soporte Calculadoras | Seguimiento privado de soporte' },
  description: 'Seguimiento privado de respuestas de soporte con Gmail de solo lectura y avisos de mensajes nuevos mediante Brevo.',
  alternates: { canonical: '/soporte-calculadoras' },
};

export default function SupportPage() {
  return (
    <>
      <h1>Soporte Calculadoras</h1>
      <p>
        Herramienta privada de {siteConfig.ownerName} para detectar respuestas nuevas a
        tres consultas de seguridad enviadas a Brevo, Backblaze y UptimeRobot sobre PHP2Shell.
        No es un servicio público para conectar buzones de otras personas.
      </p>

      <section className="legal-section">
        <h2>Qué consulta y cuándo avisa</h2>
        <p>
          Utiliza la API oficial de Gmail para buscar los asuntos de las tres consultas
          originales y la referencia de soporte conocida. Comprueba el remitente y lee
          únicamente cabeceras seleccionadas, identificadores y fechas. No descarga cuerpos,
          fragmentos de texto ni adjuntos y no sigue los enlaces de los mensajes.
        </p>
        <p>
          La automatización está preparada para ejecutarse en GitHub Actions, sin depender
          del ordenador personal. Tras su autorización y activación, conserva una referencia
          independiente y utiliza Brevo para avisar al destinatario elegido por el titular
          solo de respuestas nuevas que aún no se hayan notificado. Un acuse automático
          también puede ser un mensaje nuevo; el aviso no certifica que una vulnerabilidad
          esté resuelta.
        </p>
      </section>

      <section className="legal-section">
        <h2>Permiso de Gmail de solo lectura</h2>
        <p>
          El único ámbito solicitado es <code>https://www.googleapis.com/auth/gmail.readonly</code>.
          Google concede técnicamente lectura del buzón completo, no solo de tres conversaciones.
          La implementación limita sus búsquedas a las consultas de soporte indicadas y
          solicita solo metadatos de los mensajes coincidentes. No envía ni borra correos
          desde Gmail, no cambia etiquetas y no marca mensajes como leídos.
        </p>
        <p>
          El titular completa la autorización directamente en Google. Esta web no pide
          contraseñas y visitarla no conecta ninguna cuenta. La aplicación y sus credenciales
          son independientes de Monitor Calculadoras y de los seguimientos de AdSense y Search Console.
        </p>
      </section>

      <section className="legal-section">
        <h2>Información y contacto</h2>
        <p>
          Consulta la <Link href="/soporte-calculadoras/privacidad">política de privacidad del seguimiento</Link>{' '}
          y sus <Link href="/soporte-calculadoras/condiciones">condiciones de uso</Link> antes de autorizarlo.
          Puedes retirar el permiso desde las{' '}
          <a href="https://myaccount.google.com/connections">conexiones de tu Cuenta de Google</a>.
        </p>
        <p>
          Responsable: <strong>{siteConfig.ownerName}</strong>. Contacto:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          Soporte Calculadoras es una herramienta independiente; no pertenece a Google
          ni representa a los proveedores consultados.
        </p>
      </section>
    </>
  );
}
