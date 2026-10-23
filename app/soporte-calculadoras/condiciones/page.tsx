import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Condiciones de uso | Soporte Calculadoras' },
  description: 'Alcance y límites del seguimiento privado de respuestas de soporte con Gmail de solo lectura.',
  alternates: { canonical: '/soporte-calculadoras/condiciones' },
};

export default function SupportTermsPage() {
  return (
    <>
      <h1>Condiciones de uso</h1>
      <p>
        Soporte Calculadoras es una herramienta privada gestionada por{' '}
        <strong>{siteConfig.ownerName}</strong> para sus propias consultas a proveedores.
        No ofrece un servicio público de acceso a buzones ni sustituye el soporte oficial.
      </p>

      <section className="legal-section">
        <h2>Autorización independiente y finalidad</h2>
        <p>
          El titular debe completar personalmente el consentimiento de Google. El único
          permiso solicitado es lectura de Gmail; aunque su alcance técnico es el buzón
          completo, el programa limita la consulta a los metadatos de las respuestas a
          las tres consultas de seguridad configuradas. No permite enviar, modificar ni
          borrar correo en Gmail y no cambia las calculadoras o los otros seguimientos.
        </p>
        <p>
          Visitar estas páginas no autoriza ninguna cuenta. Las credenciales deben
          mantenerse privadas y no incorporarse al código público. La herramienta no
          debe ampliarse a otros buzones o finalidades sin una nueva autorización y
          la información correspondiente.
        </p>
      </section>

      <section className="legal-section">
        <h2>Qué significa un aviso</h2>
        <p>
          Un aviso confirma que se ha detectado un mensaje nuevo de un proveedor en el
          ámbito configurado, no que un parche esté desplegado ni que el servicio sea
          seguro. Puede tratarse de un acuse automático. El titular debe abrir y valorar
          la respuesta original antes de tomar decisiones.
        </p>
        <p>
          No se envían resúmenes periódicos ni correos de estado sin novedades. Los errores
          de acceso, remitentes no verificables o envíos inciertos no prueban que no haya
          respuestas: requieren revisar la ejecución. Un asunto que deje de incluir el
          tema original o la referencia conocida puede quedar fuera de la búsqueda y
          necesitar vinculación manual. Los avisos no sustituyen revisar el correo.
        </p>
      </section>

      <section className="legal-section">
        <h2>Disponibilidad, conservación y retirada</h2>
        <p>
          Tras su autorización y activación, GitHub Actions ejecuta las comprobaciones
          aunque el ordenador personal esté apagado. El funcionamiento depende de Google,
          GitHub y Brevo, de una autorización válida y de sus límites y disponibilidad.
          Los horarios pueden retrasarse y la aceptación de un aviso no garantiza su entrega.
          Un envío cuya aceptación no puede confirmarse queda pendiente de revisión en
          lugar de reenviarse sin control.
        </p>
        <p>
          El titular puede detener el seguimiento y retirar el permiso de Google.
          Los datos ya almacenados no se eliminan automáticamente al revocarlo. Su alcance,
          conservación y gestión se explican en la{' '}
          <Link href="/soporte-calculadoras/privacidad">política de privacidad del seguimiento</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2>Contacto e independencia</h2>
        <p>
          Para consultas, escribe a{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          Soporte Calculadoras no pertenece a Google ni representa a Brevo, Backblaze o UptimeRobot.
        </p>
      </section>
    </>
  );
}
