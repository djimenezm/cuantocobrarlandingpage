import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Privacidad | Monitor Calculadoras' },
  description: 'Permisos, datos consultados, conservación y revocación del acceso de Monitor Calculadoras a Google AdSense.',
  alternates: { canonical: '/monitor-calculadoras/privacidad' },
};

export default function MonitorPrivacyPage() {
  return (
    <>
      <h1>Privacidad del monitor</h1>
      <p>
        Esta política se aplica a Monitor Calculadoras, el seguimiento privado de aprobación
        de sitios en AdSense. No sustituye la{' '}
        <Link href="/privacidad">política de privacidad de la calculadora</Link>.
      </p>

      <section className="legal-section">
        <h2>Responsable y finalidad</h2>
        <p>
          El responsable es <strong>{siteConfig.ownerName}</strong>. Puedes contactar en{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          La finalidad del monitor es consultar estados de aprobación y avisar de cambios
          al titular de los sitios, no analizar a los visitantes de las calculadoras.
        </p>
      </section>

      <section className="legal-section">
        <h2>Permiso de Google y datos consultados</h2>
        <p>
          El titular autoriza directamente en Google el ámbito{' '}
          <code>https://www.googleapis.com/auth/adsense.readonly</code>. Este permiso permite
          consultar datos de AdSense, pero no modificarlos. El proceso de seguimiento
          consulta el listado de sitios de la cuenta para localizar el dominio configurado;
          no solicita informes de ingresos ni datos de quienes usan las calculadoras.
        </p>
        <p>
          El archivo de resultado conserva el dominio, el identificador de la cuenta, el
          estado de aprobación, su etiqueta, la fecha y hora UTC de consulta, la fuente y
          la versión del formato. No contiene contraseñas, tokens ni claves del cliente OAuth.
        </p>
      </section>

      <section className="legal-section">
        <h2>Credenciales, proveedores y conservación</h2>
        <ul>
          <li>
            Google gestiona la autenticación y el consentimiento. La contraseña de la cuenta
            no se entrega al monitor.
          </li>
          <li>
            La autorización inicial usa un cliente local de escritorio. Su JSON queda bajo
            control del titular; el proceso no guarda un archivo local con el token de renovación.
          </li>
          <li>
            El identificador y el secreto del cliente, junto con el token de renovación,
            se guardan como secretos de GitHub Actions en un repositorio privado. Permiten
            ejecutar las consultas hasta su revocación, caducidad o retirada.
          </li>
          <li>
            Los archivos de estado de cada ejecución de consulta tienen una conservación
            configurada de siete días en GitHub Actions.
          </li>
          <li>
            Una automatización de Codex puede leer ese resultado y conservar la referencia
            necesaria para comparar estados y notificar cambios al titular. No se envían
            credenciales OAuth a la conversación. Los registros y avisos conservados en
            cada servicio se gestionan también desde ese servicio.
          </li>
        </ul>
        <p>
          Los datos se utilizan para este seguimiento solicitado por el titular. El monitor
          no los vende, no los destina a publicidad ni los utiliza para entrenar modelos de IA.
          No se publican estados de la cuenta en estas páginas.
        </p>
        <p>
          El uso y la transferencia de información recibida de las APIs de Google se
          ajustan a la{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Política de Datos del Usuario de los Servicios de las APIs de Google
          </a>, incluidas sus condiciones de uso limitado. Consulta también las políticas de{' '}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub</a>{' '}
          y <a href="https://openai.com/policies/privacy-policy/">OpenAI</a> para el tratamiento
          que corresponde a esos proveedores.
        </p>
      </section>

      <section className="legal-section">
        <h2>Retirar el acceso y eliminar datos</h2>
        <p>
          Puedes revocar el permiso desde las{' '}
          <a href="https://myaccount.google.com/connections">conexiones de tu Cuenta de Google</a>.
          Las consultas posteriores dejarán de funcionar si ya no disponen de una autorización
          válida; no se elude esa retirada ni se concede acceso nuevo automáticamente.
        </p>
        <p>
          La revocación no elimina por sí sola los archivos de estado ya generados. El titular
          puede eliminarlos, retirar los secretos en GitHub y borrar sus copias locales del
          JSON. También puede gestionar los avisos y registros de la automatización en Codex.
          Para consultas o solicitudes sobre tus datos, escribe al correo del responsable.
        </p>
      </section>

      <section className="legal-section">
        <h2>Visitas a estas páginas</h2>
        <p>
          Leer esta documentación no inicia una sesión de Google ni conecta tu cuenta.
          El alojamiento, los datos técnicos de acceso y la medición agregada de visitas se
          describen en la <Link href="/privacidad">política general del sitio</Link>.
        </p>
      </section>
    </>
  );
}
