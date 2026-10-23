import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Privacidad | Soporte Calculadoras' },
  description: 'Acceso de Gmail de solo lectura, datos consultados, avisos mediante Brevo, conservación y retirada del permiso de Soporte Calculadoras.',
  alternates: { canonical: '/soporte-calculadoras/privacidad' },
};

export default function SupportPrivacyPage() {
  return (
    <>
      <h1>Privacidad de Soporte Calculadoras</h1>
      <p>
        Esta política describe exclusivamente el seguimiento privado de respuestas de soporte.
        No sustituye la <Link href="/privacidad">política general de la calculadora</Link> ni
        las políticas de Monitor Calculadoras.
      </p>

      <section className="legal-section">
        <h2>Responsable y finalidad</h2>
        <p>
          El responsable es <strong>{siteConfig.ownerName}</strong>. Contacto:{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          La finalidad es detectar respuestas nuevas a las consultas de seguridad remitidas
          a Brevo, Backblaze y UptimeRobot y avisar al titular, no analizar su correspondencia
          general ni los datos de quienes utilizan las calculadoras.
        </p>
      </section>

      <section className="legal-section">
        <h2>Acceso, límites y datos consultados</h2>
        <p>
          El titular autoriza en Google únicamente{' '}
          <code>https://www.googleapis.com/auth/gmail.readonly</code>. Este permiso permite
          técnicamente leer el buzón completo; no existe una restricción OAuth a estas tres
          conversaciones. El programa comprueba la dirección de la cuenta autorizada y
          limita la búsqueda por fecha, dominios de los proveedores, asuntos originales y
          referencia de soporte conocida. La búsqueda incluye mensajes archivados, spam y papelera.
        </p>
        <p>
          Se consulta la dirección del perfil para verificar la cuenta, y de los mensajes
          coincidentes se solicitan identificadores de mensaje y conversación, fecha de
          recepción, etiquetas y cabeceras seleccionadas: remitente, destinatario, asunto,
          fecha, resultados de autenticación y señal de respuesta automática. Se comprueba
          la autenticación del dominio del remitente antes de considerar una respuesta nueva.
        </p>
        <p>
          No se descargan cuerpos, fragmentos de texto ni adjuntos. No se envían correos
          desde Gmail, no se borran mensajes, no se crean filtros y no se cambian etiquetas
          ni estados de lectura. El proceso no utiliza modelos de IA para leer o clasificar el correo.
        </p>
      </section>

      <section className="legal-section">
        <h2>Proveedores, almacenamiento y conservación</h2>
        <ul>
          <li>
            Google gestiona el consentimiento y la API de Gmail. La contraseña de la
            cuenta no se entrega al programa. La autorización inicial usa un cliente de
            escritorio; su JSON queda bajo control del titular y el asistente no guarda
            un archivo local con el token de renovación.
          </li>
          <li>
            GitHub Actions ejecuta el seguimiento. El identificador y secreto del cliente,
            el token de renovación y el destinatario se guardan en secretos independientes
            de un repositorio privado. No se sustituyen las credenciales de otros seguimientos.
          </li>
          <li>
            Una rama privada independiente conserva huellas SHA-256 de mensajes ya
            notificados, una huella del buzón, referencias de envíos pendientes y fechas.
            No conserva cuerpos, adjuntos, asuntos, direcciones ni identificadores de
            mensaje en claro en ese archivo de estado. Las huellas siguen siendo referencias
            seudonimizadas, no una garantía de anonimato.
          </li>
          <li>
            Los justificantes de ejecución guardan fecha, identidad de la ejecución y
            recuentos, sin texto de los mensajes. Su conservación configurada es de siete
            días. El estado persistente, el historial de Git y las copias de seguridad
            no caducan a los siete días; los gestiona el titular mientras mantiene el seguimiento.
          </li>
          <li>
            Brevo recibe el remitente y destinatario del aviso, el nombre del proveedor,
            el asunto de la respuesta, su fecha y un enlace a la conversación en Gmail.
            No recibe cuerpos, adjuntos ni credenciales de Google. Para evitar duplicados
            tras un envío incierto, se pueden consultar sus eventos del aviso concreto.
            La aceptación de un correo por Brevo no garantiza su entrega en la bandeja de entrada.
          </li>
          <li>
            Codex se utiliza a petición del titular para preparar o revisar la configuración.
            Las consultas programadas se ejecutan en GitHub Actions, sin depender de este
            ordenador ni enviar tokens a la conversación.
          </li>
        </ul>
        <p>
          Los datos no se venden, no se destinan a publicidad ni se utilizan para entrenar
          modelos de IA. No se publican mensajes o resultados del buzón en estas páginas.
          El uso y transferencia de información de Google se limitan a la finalidad descrita
          y se ajustan a la{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Política de Datos del Usuario de los Servicios de las APIs de Google
          </a>, incluidas sus condiciones de uso limitado.
        </p>
        <p>
          Consulta también las políticas de{' '}
          <a href="https://policies.google.com/privacy">Google</a>,{' '}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub</a>,{' '}
          <a href="https://www.brevo.com/legal/privacypolicy/">Brevo</a>{' '}
          y <a href="https://openai.com/policies/privacy-policy/">OpenAI</a> para el tratamiento
          que corresponde a esos proveedores.
        </p>
      </section>

      <section className="legal-section">
        <h2>Retirada del permiso y eliminación</h2>
        <p>
          El titular puede revocar Soporte Calculadoras desde las{' '}
          <a href="https://myaccount.google.com/connections">conexiones de su Cuenta de Google</a>.
          La retirada de esta autorización independiente no revoca las de Monitor Calculadoras.
          Sin permiso válido, las consultas posteriores fallarán; el proceso no recupera
          acceso por otra cuenta ni utiliza tokens de otros servicios.
        </p>
        <p>
          Revocar el acceso no borra por sí solo los datos ya conservados. El titular puede
          detener este seguimiento, retirar sus secretos de GitHub y gestionar su rama de
          estado, historial, justificantes, copias de seguridad, JSON local y avisos o registros
          de Brevo. Para consultas o solicitudes sobre los datos, escribe al responsable.
        </p>
      </section>

      <section className="legal-section">
        <h2>Visitas a estas páginas</h2>
        <p>
          Esta documentación no inicia sesión ni concede acceso a Gmail. El alojamiento,
          los datos técnicos de acceso y la medición agregada de visitas se describen en la{' '}
          <Link href="/privacidad">política general del sitio</Link>.
        </p>
      </section>
    </>
  );
}
