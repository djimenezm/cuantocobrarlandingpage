import { getSiteUrl, siteConfig } from '@/lib/site';

type LeadMagnetFormProps = {
  source: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function LeadMagnetForm({
  source,
  title = 'Te enviamos el kit de landing page',
  description = 'Deja tu email y te enviaremos acceso al kit con brief base, estructura de presupuesto y checklist para vender mejor una landing page.',
  buttonLabel = 'Quiero el kit',
}: LeadMagnetFormProps) {
  const siteUrl = getSiteUrl();
  const thankYouUrl = new URL('/gracias-kit-landing', siteUrl).toString();
  const resourceUrl = new URL('/kit-landing-page', siteUrl).toString();
  const downloadUrl = new URL('/recursos/kit-landing-page.txt', siteUrl).toString();
  const formAction = `https://formsubmit.co/${siteConfig.leadCaptureEmail}`;

  return (
    <section className="lead-card" aria-labelledby={`lead-form-title-${source}`}>
      <div className="lead-card-copy">
        <span className="eyebrow">Recurso gratuito</span>
        <h2 id={`lead-form-title-${source}`}>{title}</h2>
        <p>{description}</p>
      </div>

      <form className="lead-form" action={formAction} method="POST">
        <input
          type="hidden"
          name="_subject"
          value="Nueva solicitud del kit de landing page"
        />
        <input
          type="hidden"
          name="_autoresponse"
          value={`Gracias por pedir el kit de landing page. Puedes verlo aqui: ${resourceUrl} y descargar la version en texto aqui: ${downloadUrl}. Si publicamos mejoras importantes, te avisaremos en este mismo email.`}
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={thankYouUrl} />
        <input type="hidden" name="origen" value={source} />
        <input type="hidden" name="interes" value="kit-landing-page" />
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="tu@email.com" required />
        </label>
        <input type="text" name="_honey" className="honey-field" tabIndex={-1} autoComplete="off" />
        <button type="submit" className="primary-button">
          {buttonLabel}
        </button>
        <p className="form-note">
          Al enviar el formulario aceptas que usemos tu email para darte acceso a este recurso y
          avisarte de futuras actualizaciones relacionadas. Mas informacion en{' '}
          <a href="/privacidad">privacidad</a>.
        </p>
      </form>
    </section>
  );
}
