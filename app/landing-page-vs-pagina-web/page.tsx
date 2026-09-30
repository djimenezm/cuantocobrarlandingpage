import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/landing-page-vs-pagina-web';
const title = 'Landing page vs. página web: diferencias, usos y como afecta al precio';
const description =
  'Guía práctica para decidir si un cliente necesita una landing page o una página web completa, qué cambia en alcance, secciones, copy, integraciones, mantenimiento y precio.';

const faqItems = [
  {
    question: '¿Qué diferencia hay entre una landing page y una página web?',
    answer:
      'Una landing page suele estar enfocada en una acción concreta, como captar leads, vender una oferta o validar una campaña. Una página web completa normalmente tiene más secciones, navegación, contenidos, estructura corporativa y objetivos diversos.',
  },
  {
    question: '¿Qué es mejor vender como freelance: landing o página web?',
    answer:
      'Depende del objetivo del cliente. Una landing encaja mejor cuando hay una oferta concreta y una acción principal. Una web completa encaja mejor cuando el cliente necesita presencia corporativa, varias páginas, contenidos y recorrido más amplio.',
  },
  {
    question: '¿Una landing page debería ser más barata que una web?',
    answer:
      'No siempre. Una landing sencilla puede ser más barata, pero una landing con estrategia, copy, integraciones, analítica, pruebas y urgencia puede tener más trabajo que una web básica.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'landing page vs. página web',
    'diferencia landing page página web',
    'landing page o página web',
    'cuánto cobrar landing page',
    'precio landing page vs. web',
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

export default function LandingPageVsPaginaWebPage() {
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
        id="landing-vs-web-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="landing-vs-web-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="landing-vs-web-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Decisión de alcance</span>
            <h1>Landing page vs. página web: diferencias, usos y como afecta al precio</h1>
            <p className="lead">
              No todo cliente que pide una web necesita una web completa, y no toda landing page es
              un proyecto pequeño. La diferencia real está en el objetivo, el alcance, el número de
              decisiones que hay que tomar y lo que ocurre después de publicar.
            </p>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio de landing
              </Link>
              <Link href="/precio-landing-page-freelance" className="primary-button">
                Ver guía de precios
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Landing page: una oferta, una acción principal y menos dispersión.</li>
              <li>Página web: más estructura, navegación, contenidos y objetivos.</li>
              <li>El precio sube por estrategia, copy, integraciones y revisiones.</li>
              <li>El mantenimiento posterior conviene presupuestarlo aparte.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Diferencias principales">
          <article className="feature-card">
            <h2>Landing page</h2>
            <p>
              Está pensada para una acción concreta: captar un lead, vender una oferta, apuntarse a
              una lista, reservar una llamada o medir una campaña. Menos navegación, más foco.
            </p>
          </article>

          <article className="feature-card">
            <h2>Página web</h2>
            <p>
              Sirve para explicar una marca, servicios, casos, contacto, contenidos y varias rutas
              de usuario. Tiene más arquitectura, más contenido y normalmente más mantenimiento.
            </p>
          </article>

          <article className="feature-card">
            <h2>Proyecto híbrido</h2>
            <p>
              A veces el cliente necesita una web pequeña con una landing fuerte como página
              principal. En ese caso conviene separar alcance base, landing comercial y extras.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Cuándo conviene vender una landing page</h2>
            <p>
              Una landing page encaja cuando el cliente tiene una oferta clara y necesita que el
              usuario haga una acción principal. Por ejemplo: dejar datos, comprar, reservar,
              descargar un recurso o validar una campaña.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Hay una oferta, producto, servicio o campaña concreta.</li>
              <li>La conversión principal se puede explicar en una sola página.</li>
              <li>No hace falta una arquitectura completa de contenidos.</li>
              <li>El objetivo es lanzar rápido, medir y mejorar.</li>
              <li>El cliente acepta limitar secciones, revisiones e integraciones.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Sube el precio si incluye</h2>
            <ul className="article-list">
              <li>Copywriting desde cero.</li>
              <li>Propuesta de valor y estructura persuasiva.</li>
              <li>CRM, email marketing, calendario o pagos.</li>
              <li>Eventos de analítica y medición.</li>
              <li>Urgencia, variantes o tests.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Cuándo conviene vender una página web completa</h2>
            <p>
              Una web completa tiene sentido cuando el cliente necesita explicar varios servicios,
              crear confianza, posicionar contenidos, mostrar casos, ordenar información corporativa
              o construir una presencia más estable.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Hay varias páginas o secciones con objetivos distintos.</li>
              <li>El cliente necesita navegación, blog, casos, servicios o equipo.</li>
              <li>La decisión de compra requiere más información.</li>
              <li>Hay trabajo de arquitectura, contenidos y mantenimiento posterior.</li>
              <li>El proyecto no cabe bien en una sola página enfocada.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Señales de que no basta una landing</h2>
            <ul className="article-list">
              <li>El cliente quiere posicionar varias palabras clave.</li>
              <li>Hay muchos servicios o públicos diferentes.</li>
              <li>Necesita estructura corporativa y contenidos vivos.</li>
              <li>Quiere crecer con nuevas páginas después.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo afecta esta decisión al presupuesto</h2>
          <p>
            Una landing suele ser más acotada, pero no siempre más barata. Si requiere copy,
            estrategia, integraciones, medición, urgencia o varias rondas de revisión, puede tener
            más trabajo que una web básica con contenido ya preparado.
          </p>
          <p>
            Para presupuestar mejor, separa el precio de la landing del mantenimiento posterior. Si
            la página va a necesitar cambios, soporte o revisiones mensuales, puedes calcular una
            cuota aparte con{' '}
            <a href="https://www.mantenimientowebmensual.es">Mantenimiento Web Mensual</a>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi landing
            </Link>
            <Link href="/ejemplo-presupuesto-landing-page" className="primary-button">
              Ver ejemplo de presupuesto
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Frase útil para explicar la diferencia al cliente</h2>
          <div className="disclaimer-box">
            <p>
              Si el objetivo es captar contactos para una oferta concreta, una landing page puede
              ser suficiente y más enfocada. Si necesitas explicar varios servicios, crear una
              estructura corporativa y crecer con contenidos, entonces conviene plantear una web
              completa o un proyecto por fases.
            </p>
          </div>
          <p>
            Esta frase ayuda a separar alcance sin sonar técnico. Y una vez separado el alcance, el
            precio deja de ser una comparación injusta entre una página y una web.
          </p>
          <div className="guide-cta">
            <Link href="/precio-landing-page-freelance" className="primary-button">
              Leer guía de precio
            </Link>
            <a href="https://www.cuantopresupuestar.es" className="primary-button">
              Calcular proyecto completo
            </a>
          </div>
        </div>
      </section>

      <section className="section alt" id="faq-landing-vs-web">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre landing page vs. página web</h2>
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
