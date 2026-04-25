import Script from 'next/script';
import CalculatorForm from '@/components/CalculatorForm';
import FAQ, { faqItems } from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { siteConfig } from '@/lib/site';

export default function HomePage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    inLanguage: 'es',
    isAccessibleForFree: true,
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Calculadora para saber cuanto cobrar una landing page',
      'Referencia base por hora a partir de tu objetivo mensual',
      'Secciones, integraciones y revisiones',
      'IVA aparte y margen configurable',
    ],
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
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Cuanto Cobrar Landing Page</span>
            <h1>Calculadora para saber cuanto cobrar una landing page</h1>
            <p className="lead">
              Convierte tu objetivo mensual en un precio de landing page mas defendible. Calcula una
              referencia base por hora y bajala al proyecto segun secciones, integraciones,
              copywriting, revisiones, costes directos, margen extra e IVA aparte.
            </p>
            <div className="hero-badges" aria-label="Ventajas principales">
              <span className="hero-badge">Sin registro</span>
              <span className="hero-badge">Pensada para proyectos cerrados</span>
              <span className="hero-badge">IVA siempre aparte</span>
            </div>
            <ul className="hero-points">
              <li>Convierte una intuicion difusa en una cifra mas defendible para el cliente.</li>
              <li>Incluye secciones, integraciones, revisiones, copy y buffer de contingencia.</li>
              <li>Util para landing pages de captacion, ventas, lanzamientos o lead generation.</li>
            </ul>
            <p className="hero-cta-note">
              Si ya presupuestas por proyecto, usala para comprobar si tu precio de landing page te
              deja realmente el margen que buscas.
            </p>
          </div>

          <CalculatorForm />
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Puntos clave de la herramienta">
          <article className="feature-card">
            <h2>Que resuelve</h2>
            <p>
              Parte de tu objetivo mensual, tus costes fijos y tus horas facturables para sacar una
              referencia por hora. Despues la convierte en un precio de landing page con alcance,
              integraciones, revisiones, copy y margen.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuando te aporta mas valor</h2>
            <p>
              Cuando vendes proyectos cerrados y quieres validar si tu propuesta esta alineada con
              el trabajo real, el tiempo no vendible y el suelo economico de tu actividad.
            </p>
          </article>

          <article className="feature-card">
            <h2>Donde poner el filtro final</h2>
            <p>
              En proyectos mas grandes, funnels complejos, integraciones especiales o encajes
              contractuales finos. La herramienta esta pensada para orientar tu precio, no para
              sustituir una revision profesional.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container text-block">
          <h2>Como funciona la calculadora</h2>
          <p>
            Primero estima cuanto necesitas facturar al mes para sostener tu objetivo neto y tus
            costes fijos. Esa cifra se reparte entre tus horas facturables reales para obtener una
            referencia base por hora.
          </p>
          <p>
            Despues esa referencia se lleva a una landing page concreta: introduces numero de
            secciones, integraciones, revisiones, si incluyes copywriting, los costes directos y el
            margen extra que quieres defender. Con eso obtienes un precio minimo defendible, un
            precio recomendado y, si aplica, el total con IVA aparte.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> cobrar una landing page no deberia depender solo de lo que
            te parece razonable o de lo que cobra otra persona. Deberia salir de tu suelo economico
            y del alcance real del proyecto.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container conversion-grid">
          <div className="conversion-copy">
            <h2>No uses el precio como techo: usalo como suelo defendible</h2>
            <p>
              La herramienta te da una cifra para no presupuestar solo por intuicion o por presion
              del contexto. Si tu propuesta actual queda muy por debajo, probablemente te falte
              margen, tiempo o proteccion frente a cambios.
            </p>
            <p>
              La idea no es fijar un precio exacto al centimo, sino ayudarte a llegar a una cifra
              que puedas defender con mas criterio delante de un cliente.
            </p>
          </div>

          <div className="conversion-steps" aria-label="Como aprovechar mejor el resultado">
            <article className="conversion-step">
              <h3>1. Contrasta</h3>
              <p>Compara el resultado con tu propuesta actual y detecta si te deja margen real.</p>
            </article>

            <article className="conversion-step">
              <h3>2. Ajusta</h3>
              <p>Prueba cambios en alcance, integraciones o margen para encontrar tu minimo razonable.</p>
            </article>

            <article className="conversion-step">
              <h3>3. Presupuesta mejor</h3>
              <p>Usa el total recomendado como base para una propuesta cerrada mas defendible.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm source="home" />
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Otra herramienta</span>
          <h2>Si tu servicio no es solo una landing, prueba tambien Cuanto Presupuestar</h2>
          <p>
            Esta herramienta te ayuda a aterrizar el precio de una landing page concreta. Si quieres
            calcular presupuestos cerrados de proyectos mas amplios, tambien puedes usar{' '}
            <a href="https://www.cuantopresupuestar.es">Cuanto Presupuestar</a>.
          </p>
          <p>
            Y si despues del lanzamiento vas a vender soporte continuo, te puede encajar tambien{' '}
            <a href="https://www.mantenimientowebmensual.es">Mantenimiento Web Mensual</a> para
            transformar ese trabajo recurrente en una cuota defendible.
          </p>
          <p>
            Si quieres moverte entre todas las calculadoras del ecosistema, las tienes reunidas en{' '}
            <a href="https://www.paneldeherramientas.es">Panel de Herramientas</a>.
          </p>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
