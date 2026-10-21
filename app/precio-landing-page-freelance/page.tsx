import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LANDING_ESTIMATION } from '@/lib/calculator';
import { formatCurrency, formatNumber } from '@/lib/format';
import { landingExampleInputs, landingExampleQuotes } from '@/lib/landingExamples';
import { siteConfig } from '@/lib/site';

const title = 'Precio landing page freelance: cuánto cobrar';
const description =
  'Guía para calcular el precio de una landing page freelance según alcance, copy, integraciones, revisiones, urgencia y margen real.';

const faqItems = [
  {
    question: '¿Cuánto cobrar por una landing page sencilla?',
    answer:
      'Para una landing page sencilla, el precio no debería salir solo de una media de mercado. Conviene partir de tus horas reales, tu tarifa mínima, el número de secciones, el copy, las revisiones y los costes directos.',
  },
  {
    question: '¿Es mejor cobrar por hora o por proyecto?',
    answer:
      'Para clientes finales suele ser más fácil vender un precio cerrado por proyecto, pero ese precio debería construirse desde una tarifa por hora interna. Así evitas regalar tiempo no visible.',
  },
  {
    question: '¿Qué hace subir el precio de una landing page?',
    answer:
      'Suben el precio el copywriting, las integraciones con formularios o CRM, las variantes responsive, las revisiones extra, la urgencia, la estrategia previa y cualquier trabajo posterior de medición o mantenimiento.',
  },
  {
    question: '¿Debo incluir el IVA dentro del precio?',
    answer:
      'Lo más claro es calcular tu precio profesional sin IVA y mostrar el IVA aparte cuando corresponda. Así no confundes tu ingreso real con impuestos que solo estás recaudando.',
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/precio-landing-page-freelance',
  },
  openGraph: {
    title,
    description,
    url: '/precio-landing-page-freelance',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function PrecioLandingPageFreelancePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'es',
    dateModified: '2026-10-16',
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    mainEntityOfPage: new URL('/precio-landing-page-freelance', siteConfig.url).toString(),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        id="precio-landing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
      <script
        id="precio-landing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Guía de precios</span>
            <h1>Precio de una landing page freelance: cuánto cobrar sin quedarte corto</h1>
            <p className="lead">
              Una landing page puede parecer un proyecto pequeño, pero suele mezclar estrategia,
              diseño, copy, desarrollo, formularios, analítica, pruebas responsive y revisiones. Si
              solo miras lo que cobra otra persona, es fácil dejar fuera horas que luego no puedes
              facturar.
            </p>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi precio
              </Link>
              <a href="#metodo" className="primary-button">
                Ver fórmulas y límites
              </a>
            </div>
          </div>

          <aside className="feature-card article-summary" aria-label="Resumen rápido">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Usa una tarifa interna por hora aunque vendas precio cerrado.</li>
              <li>Separa precio profesional, costes directos e IVA.</li>
              <li>Incluye revisiones y cambios de alcance antes de enviar la propuesta.</li>
              <li>Si hay urgencia, estrategia o integraciones, el precio no debe ser básico.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Tres alcances con la misma tarifa de partida</h2>
          <p>
            Estos no son precios de mercado. Son resultados de la calculadora para una persona con
            {' '}{formatCurrency(landingExampleInputs.basic.targetMonthlyNet)} de objetivo neto,
            {' '}{formatCurrency(landingExampleInputs.basic.monthlyFixedCosts)} de costes fijos,
            {' '}{landingExampleInputs.basic.billableHoursPerMonth} horas facturables y un
            {' '}{landingExampleInputs.basic.profitMarginPercent}% de recargo sobre el mínimo.
            Los importes son sin IVA.
          </p>
        </div>
        <div className="container feature-grid" aria-label="Rangos orientativos">
          <article className="feature-card">
            <h2>Landing básica</h2>
            <p>
              {landingExampleInputs.basic.sections} secciones, textos aportados por el cliente,
              {' '}{landingExampleInputs.basic.integrationsCount} integración y
              {' '}{landingExampleInputs.basic.revisionRounds} ronda de revisión. Incluye preparación,
              maquetación responsive y pruebas.
            </p>
            <p className="scenario-price">{formatCurrency(landingExampleQuotes.basic.recommendedLandingPrice)} sin IVA</p>
          </article>

          <article className="feature-card">
            <h2>Landing de captación</h2>
            <p>
              {landingExampleInputs.capture.sections} secciones con textos breves,
              {' '}{landingExampleInputs.capture.integrationsCount} integraciones y
              {' '}{landingExampleInputs.capture.revisionRounds} rondas de revisión. El{' '}
              <Link href="/ejemplo-presupuesto-landing-page">ejemplo de presupuesto</Link> detalla
              {' '}este caso.
            </p>
            <p className="scenario-price">{formatCurrency(landingExampleQuotes.capture.recommendedLandingPrice)} sin IVA</p>
          </article>

          <article className="feature-card">
            <h2>Landing de venta</h2>
            <p>
              {landingExampleInputs.expanded.sections} secciones con textos breves,
              {' '}{landingExampleInputs.expanded.integrationsCount} integraciones y
              {' '}{landingExampleInputs.expanded.revisionRounds} rondas. Urgencias, campañas y
              estrategia adicional se presupuestan aparte.
            </p>
            <p className="scenario-price">{formatCurrency(landingExampleQuotes.expanded.recommendedLandingPrice)} sin IVA</p>
          </article>
        </div>
      </section>

      <section className="section alt" id="metodo" aria-labelledby="metodo-title">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Método del sitio · 16 de octubre de 2026</span>
            <h2 id="metodo-title">De dónde sale cada cifra</h2>
            <p>
              La calculadora utiliza un modelo propio de estimación, no una encuesta de precios ni
              horas medidas en encargos reales. Estos son sus supuestos de partida; comprueba si
              describen tu trabajo antes de utilizar el resultado.
            </p>
            <dl className="worked-example">
              <div><dt>Preparación y definición del encargo</dt><dd>{formatNumber(LANDING_ESTIMATION.discoveryHours)} h</dd></div>
              <div><dt>Diseño y maquetación por sección</dt><dd>{formatNumber(LANDING_ESTIMATION.hoursPerSection)} h</dd></div>
              <div><dt>Conexión sencilla con un servicio externo</dt><dd>{formatNumber(LANDING_ESTIMATION.hoursPerIntegration, 2)} h por integración</dd></div>
              <div><dt>Textos breves, si están incluidos</dt><dd>{formatNumber(LANDING_ESTIMATION.copyHoursPerSection, 2)} h por sección; mínimo {formatNumber(LANDING_ESTIMATION.minimumCopyHours)} h</dd></div>
              <div><dt>Revisión del alcance aprobado</dt><dd>{formatNumber(LANDING_ESTIMATION.hoursPerRevision)} h por ronda</dd></div>
              <div><dt>Pruebas y publicación</dt><dd>{formatNumber(LANDING_ESTIMATION.qaLaunchHours)} h</dd></div>
            </dl>
            <h3>Las operaciones, en orden</h3>
            <ol className="article-list article-list-ordered">
              <li><strong>Objetivo antes de reserva:</strong> neto deseado / (1 − reserva fiscal / 100).</li>
              <li><strong>Tarifa interna:</strong> (objetivo antes de reserva + costes fijos mensuales) / horas facturables mensuales.</li>
              <li><strong>Horas presupuestadas:</strong> suma de las tareas × (1 + contingencia / 100).</li>
              <li><strong>Mínimo del modelo:</strong> horas presupuestadas × tarifa interna + costes directos del encargo.</li>
              <li><strong>Recomendado:</strong> mínimo × (1 + recargo / 100). El IVA, si se selecciona, se añade después.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Recargo no es margen sobre ventas.</strong> Sobre un mínimo de 1.000 EUR,
              un recargo del 20 % produce 1.200 EUR: los 200 EUR representan un 16,67 % del precio
              final sin IVA. El campo de la calculadora aplica el primer criterio.
            </div>
            <h3>Comprueba el ejemplo de captación</h3>
            <p>
              Con {formatCurrency(landingExampleInputs.capture.targetMonthlyNet)} de objetivo,
              {' '}{landingExampleInputs.capture.taxReservePercent}% de reserva,
              {' '}{formatCurrency(landingExampleInputs.capture.monthlyFixedCosts)} de costes y
              {' '}{landingExampleInputs.capture.billableHoursPerMonth} horas mensuales, la tarifa
              es {formatCurrency(landingExampleQuotes.capture.baseHourlyRate)}/h. Las tareas suman
              {' '}{formatNumber(landingExampleQuotes.capture.estimatedProjectHours, 2)} h; con
              {' '}{landingExampleInputs.capture.contingencyBufferPercent}% de contingencia quedan
              {' '}{formatNumber(landingExampleQuotes.capture.bufferedProjectHours, 2)} h.
            </p>
            <p>
              Al incorporar {formatCurrency(landingExampleInputs.capture.directProjectCosts)} de
              costes directos, el mínimo es {formatCurrency(landingExampleQuotes.capture.minimumLandingPrice)}.
              {' '}El recargo del {landingExampleInputs.capture.profitMarginPercent}% lo lleva a
              {' '}{formatCurrency(landingExampleQuotes.capture.recommendedLandingPrice)} sin IVA.
              Las operaciones internas conservan su precisión. El precio recomendado se redondea
              a céntimos antes de calcular el IVA; el total suma esos dos importes mostrados.
              Multiplicar la tarifa y las horas ya redondeadas puede dar unos céntimos de diferencia.
            </p>
            <Link href="/ejemplo-presupuesto-landing-page#modelo-presupuesto">
              Ver cómo se presenta este cálculo al cliente
            </Link>
          </div>

          <aside className="feature-card article-summary">
            <h2>Cuándo no basta este modelo</h2>
            <ul className="article-list">
              <li>Una integración con API propia, pagos o datos sensibles no se puede asumir resuelta en {formatNumber(LANDING_ESTIMATION.hoursPerIntegration, 2)} h.</li>
              <li>Investigación, identidad visual, textos extensos, traducciones y variantes requieren estimación propia.</li>
              <li>Una ronda compleja puede exceder {formatNumber(LANDING_ESTIMATION.hoursPerRevision)} h. Acordar una lista de cambios evita revisiones abiertas.</li>
              <li>La reserva fiscal no calcula tu IRPF real. El IVA del 21 % es una hipótesis del selector, no una comprobación de tu situación fiscal.</li>
              <li>El mínimo solo cubre lo que hayas declarado y lo que estime el modelo. No garantiza rentabilidad ni conversiones.</li>
            </ul>
            <p>
              Si tus horas reales no encajan, prepara un desglose independiente antes de cerrar
              precio. No aumentes secciones o integraciones ficticias para forzar un resultado.
            </p>
            <a href={`mailto:${siteConfig.contactEmail}`}>Comunicar una duda o un error del modelo</a>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo defender el precio ante el cliente</h2>
          <p>
            El cliente no compra horas: compra una página que debe captar, explicar, convencer o
            vender. Por eso conviene presentar el precio ligado al resultado funcional: estructura
            del mensaje, velocidad, formularios, versión móvil, medición y claridad del flujo.
          </p>
          <p>
            Si el cliente quiere bajar precio, no bajes margen sin tocar alcance. Puedes reducir
            secciones, limitar revisiones, dejar el copy fuera, eliminar integraciones o separar el
            mantenimiento posterior. Así proteges tu trabajo sin convertir cada presupuesto en una
            negociación a ciegas.
          </p>
          <p>
            Si la landing va a recibir tráfico de pago, revisa también{' '}
            <Link href="/cuanto-cobrar-landing-page-google-ads">
              cuánto cobrar una landing page para Google Ads
            </Link>{' '}
            antes de cerrar el precio, porque tracking, eventos y pruebas pueden cambiar el alcance.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Usar la calculadora gratis
            </Link>
            <Link href="/" className="primary-button">
              Volver a la herramienta
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt" id="faq-precio-landing">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre cuánto cobrar</h2>
          {faqItems.map((item) => (
            <article className="disclaimer-box" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
