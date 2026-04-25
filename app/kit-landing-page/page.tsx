import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/kit-landing-page';
const title = 'Kit de landing page';
const description =
  'Recurso practico con brief base, estructura de presupuesto y checklist para vender mejor una landing page sin presupuestarla a ojo.';

const faqItems = [
  {
    question: 'Que incluye este kit de landing page?',
    answer:
      'Incluye un brief base para detectar alcance, una estructura corta de presupuesto y una checklist para revisar la oferta antes de enviarla.',
  },
  {
    question: 'Este kit sustituye la calculadora?',
    answer:
      'No. El kit te ayuda a presentar mejor la propuesta. La calculadora sigue siendo la pieza para aterrizar un minimo defendible y una zona recomendada de precio.',
  },
  {
    question: 'Puedo descargarlo y adaptarlo?',
    answer:
      'Si. Hay una version descargable en texto para que la adaptes a tu servicio, proceso comercial y forma de trabajar.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'kit landing page',
    'brief landing page',
    'presupuesto landing page',
    'checklist landing page',
    'recurso para vender landing pages',
  ],
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: route,
    type: 'article',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
};

export default function KitLandingPagePage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();
  const downloadUrl = new URL('/recursos/kit-landing-page.txt', siteUrl).toString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'es',
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    datePublished: '2026-04-25',
    dateModified: '2026-04-25',
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
        id="kit-landing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="kit-landing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="kit-landing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Recurso gratuito</span>
            <h1>Kit de landing page</h1>
            <p className="lead">
              Un recurso simple para pasar de una intuicion rapida a una propuesta mas clara.
              Incluye brief base, estructura de presupuesto y checklist final para vender mejor una
              landing page sin quedarte corto.
            </p>
            <div className="hero-badges" aria-label="Que incluye el kit">
              <span className="hero-badge">Brief base</span>
              <span className="hero-badge">Presupuesto</span>
              <span className="hero-badge">Checklist final</span>
            </div>
            <div className="guide-cta">
              <a href={downloadUrl} className="primary-button" download>
                Descargar version en texto
              </a>
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Que te llevas</h2>
            <ul className="article-list">
              <li>Un brief base para aterrizar alcance y complejidad.</li>
              <li>Una estructura corta para ordenar el presupuesto.</li>
              <li>Una checklist final antes de enviar la propuesta.</li>
              <li>Una version descargable para adaptarla a tu proceso.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>1. Brief base para una landing page</h2>
          <ol className="article-list article-list-ordered">
            <li>Objetivo principal de la landing: captar leads, vender o validar una oferta.</li>
            <li>Origen del trafico: ads, SEO, email, social o trafico caliente.</li>
            <li>Numero estimado de secciones y complejidad del mensaje.</li>
            <li>Necesidad de copywriting, formularios, integraciones o automatizaciones.</li>
            <li>Materiales disponibles: textos, branding, capturas, testimonios, creatividades.</li>
            <li>Fecha objetivo y limites de revisiones.</li>
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>2. Estructura corta de presupuesto</h2>
          <ol className="article-list article-list-ordered">
            <li>Resumen del objetivo de la landing.</li>
            <li>Alcance del trabajo y entregables incluidos.</li>
            <li>Numero de revisiones y limites del proyecto.</li>
            <li>Integraciones o extras incluidos.</li>
            <li>Precio del proyecto e IVA aparte.</li>
            <li>Forma de pago y plazos.</li>
          </ol>
          <p>
            La idea no es escribir un documento eterno. Es que el cliente vea rapido que compra, que
            no compra y que tiene que pasar para aprobar.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>3. Checklist antes de enviar la propuesta</h2>
          <ol className="article-list article-list-ordered">
            <li>El precio parte de una base economica sana y no de una intuicion rapida.</li>
            <li>El alcance deja claro que incluye y que queda fuera.</li>
            <li>Las integraciones y revisiones estan bien definidas.</li>
            <li>El IVA y la forma de pago estan claros.</li>
            <li>El cliente sabe cual es el siguiente paso para aprobar.</li>
          </ol>
          <div className="disclaimer-box">
            <strong>Recuerda:</strong> este kit mejora la presentacion y la revision final, pero la
            calculadora sigue siendo la pieza para aterrizar un precio minimo y una zona recomendada
            antes de redactar nada.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Recursos relacionados">
          <article className="feature-card">
            <h2>Proyecto mas amplio</h2>
            <p>
              Si tu trabajo no es solo una landing, apóyate tambien en{' '}
              <a href="https://www.cuantopresupuestar.es">Cuanto Presupuestar</a>.
            </p>
          </article>

          <article className="feature-card">
            <h2>Mantenimiento despues</h2>
            <p>
              Si luego vendes soporte continuo, te puede encajar tambien{' '}
              <a href="https://www.mantenimientowebmensual.es">Mantenimiento Web Mensual</a>.
            </p>
          </article>

          <article className="feature-card">
            <h2>Numero base</h2>
            <p>
              Si aun no tienes clara la cifra, vuelve a la calculadora antes de cerrar tu propuesta.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="kit-landing-faq-title">
        <div className="container text-block">
          <h2 id="kit-landing-faq-title">Preguntas frecuentes sobre el kit</h2>

          <div className="faq-list">
            {faqItems.map((item) => (
              <article className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Descarga el kit o vuelve a calcular tu precio</h2>
          <p>
            Si ya tienes una propuesta en marcha, puedes descargar la version en texto y adaptarla.
            Si sigues afinando la cifra, vuelve antes a la calculadora.
          </p>
          <div className="guide-cta">
            <a href={downloadUrl} className="primary-button" download>
              Descargar el kit
            </a>
            <Link href="/#calculadora" className="primary-button">
              Probar la calculadora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
