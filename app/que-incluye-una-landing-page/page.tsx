import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/que-incluye-una-landing-page';
const title = 'Qué incluye una landing page y qué conviene cobrar aparte';
const description =
  'Guía práctica para definir qué incluye una landing page: secciones, copy, diseño, desarrollo, responsive, formularios, integraciones, revisiones, medición y extras.';

const faqItems = [
  {
    question: '¿Qué incluye normalmente una landing page?',
    answer:
      'Suele incluir estructura de secciones, diseño responsive, maquetación, formulario o llamada a la acción, ajustes básicos, pruebas y una o varias rondas de revisión. El copy, integraciones avanzadas y medición pueden ir incluidos o presupuestarse aparte.',
  },
  {
    question: '¿El copywriting debe entrar en el precio de una landing?',
    answer:
      'Depende del servicio. Si el cliente entrega textos finales, el precio puede ser menor. Si tienes que definir mensaje, propuesta de valor y textos comerciales, conviene presupuestarlo como parte importante del proyecto.',
  },
  {
    question: '¿Qué tareas deberían cobrarse aparte en una landing page?',
    answer:
      'Nuevas secciones, integraciones no previstas, copy completo, estrategia, fotografías, campañas, urgencias, revisiones extra, variantes para tests y mantenimiento posterior suelen cobrarse aparte.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'qué incluye una landing page',
    'que debe tener una landing page',
    'servicio landing page freelance',
    'presupuesto landing page alcance',
    'landing page secciones integraciones revisiones',
  ],
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: route,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteConfig.name}`,
    description,
  },
};

export default function QueIncluyeUnaLandingPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'es',
    author: {
      '@type': 'Organization',
      name: siteConfig.ownerName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    mainEntityOfPage: pageUrl,
    datePublished: '2026-04-26',
    dateModified: '2026-04-26',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: new URL('/', siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: pageUrl,
      },
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
        id="que-incluye-landing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="que-incluye-landing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="que-incluye-landing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Alcance de proyecto</span>
            <h1>Qué incluye una landing page y qué conviene cobrar aparte</h1>
            <p className="lead">
              Una landing page no es solo una página bonita. Puede incluir estrategia, estructura,
              copy, diseño, desarrollo, formularios, integraciones, medición, revisiones y soporte
              posterior. Si no separas bien cada bloque, es fácil presupuestarla demasiado barata.
            </p>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio
              </Link>
              <Link href="/ejemplo-presupuesto-landing-page" className="primary-button">
                Ver ejemplo de presupuesto
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Define secciones, copy, diseño, desarrollo, integraciones y revisiones.</li>
              <li>No mezcles estrategia, campañas o mantenimiento dentro del precio básico.</li>
              <li>Separa el IVA y los costes directos de tu ingreso real.</li>
              <li>Si hay cambios de alcance, deben presupuestarse antes de hacerlos.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Bloques incluidos en una landing">
          <article className="feature-card">
            <h2>Estructura y secciones</h2>
            <p>
              Hero, beneficios, prueba social, proceso, FAQ, llamada a la acción y formulario. El
              número de secciones cambia mucho el tiempo de diseño, maquetación y revisión.
            </p>
          </article>

          <article className="feature-card">
            <h2>Diseño y desarrollo</h2>
            <p>
              Incluye composición visual, responsive, maquetación, ajustes en móvil, pruebas
              básicas y publicación en el entorno acordado.
            </p>
          </article>

          <article className="feature-card">
            <h2>Conversión y medición</h2>
            <p>
              Formularios, eventos, píxeles, analítica, CRM o email marketing pueden convertir una
              landing simple en un proyecto con más responsabilidad.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Qué puede entrar en un precio base</h2>
            <p>
              El precio base debería cubrir lo que puedes estimar con bastante seguridad. Si
              vendes una landing sencilla, puedes definir un paquete cerrado con secciones,
              entregables y revisiones limitadas.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Brief inicial y definición del objetivo principal.</li>
              <li>Estructura de secciones acordada antes de diseñar.</li>
              <li>Diseño responsive y maquetación de la landing.</li>
              <li>Formulario o llamada a la acción sencilla.</li>
              <li>Optimización básica para móvil y pruebas visuales.</li>
              <li>Una o dos rondas de revisión claramente definidas.</li>
              <li>Publicación en el entorno pactado si no requiere migraciones complejas.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Conviene concretar</h2>
            <ul className="article-list">
              <li>Quién entrega textos e imágenes.</li>
              <li>Cuántas secciones entran.</li>
              <li>Qué integraciones incluye.</li>
              <li>Cuántas revisiones hay.</li>
              <li>Qué pasa después de publicar.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Qué debería cobrarse aparte</h2>
          <p>
            Lo que cambia el alcance, añade riesgo o requiere pensar más allá de la página debería
            quedar fuera del precio base. No es solo una cuestión de dinero: también evita que el
            cliente espere trabajo ilimitado por una cifra cerrada.
          </p>
          <div className="feature-grid" aria-label="Extras habituales">
            <article className="feature-card">
              <h3>Copy y estrategia</h3>
              <p>
                Mensaje, propuesta de valor, textos comerciales, investigación, tono y arquitectura
                persuasiva.
              </p>
            </article>

            <article className="feature-card">
              <h3>Integraciones</h3>
              <p>
                CRM, automatizaciones, pagos, calendario, email marketing, píxeles o eventos
                avanzados.
              </p>
            </article>

            <article className="feature-card">
              <h3>Trabajo posterior</h3>
              <p>
                Tests, nuevas variantes, cambios por campaña, mantenimiento, soporte o reporting
                mensual.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo llevar el alcance a precio</h2>
          <p>
            Una vez sepas qué incluye la landing, calcula horas por sección, copy, integraciones,
            revisiones, costes directos y margen. Después separa el precio profesional del IVA y
            deja por escrito que nuevas secciones o cambios de alcance se presupuestan aparte.
          </p>
          <p>
            Si el cliente todavía duda entre landing y web completa, revisa también la guía de{' '}
            <Link href="/landing-page-vs-pagina-web">landing page vs. página web</Link>. Si ya tienes
            claro qué es una landing, usa la calculadora para bajar ese alcance a una cifra.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi landing
            </Link>
            <Link href="/precio-landing-page-freelance" className="primary-button">
              Leer guía de precio
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Texto útil para incluir en una propuesta</h2>
          <div className="disclaimer-box">
            <p>
              El presupuesto incluye el diseño y desarrollo de una landing page con hasta seis
              secciones, formulario de contacto, adaptación responsive y dos rondas de revisión.
              No incluye copywriting completo, nuevas secciones, integraciones no previstas,
              campañas, mantenimiento posterior ni variantes para test A/B.
            </p>
          </div>
          <p>
            Este bloque ayuda a que el cliente entienda que la landing tiene un alcance concreto.
            No hace falta sonar defensivo: solo hace falta que el proyecto quede bien delimitado.
          </p>
          <div className="guide-cta">
            <Link href="/ejemplo-presupuesto-landing-page" className="primary-button">
              Ver ejemplo completo
            </Link>
            <a href="/salida/kit-presupuesto" className="primary-button">
              Abrir kit de presupuesto
            </a>
          </div>
        </div>
      </section>

      <section className="section alt" id="faq-que-incluye-landing">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre qué incluye una landing page</h2>
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
