import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

const route = '/ejemplo-presupuesto-landing-page';
const title = 'Ejemplo de presupuesto de landing page para presentar mejor tu precio';
const description =
  'Ejemplo práctico de presupuesto de landing page con alcance, secciones, copy, integraciones, revisiones, precio, IVA y exclusiones para defender mejor una propuesta.';

const faqItems = [
  {
    question: '¿Qué debe incluir un presupuesto de landing page?',
    answer:
      'Debe incluir objetivo de la landing, secciones, entregables, copywriting, integraciones, revisiones, plazos, precio, IVA, exclusiones y condiciones de cambios extra.',
  },
  {
    question: '¿Sirve un ejemplo de presupuesto para cualquier landing?',
    answer:
      'Sirve como estructura base, pero conviene adaptarlo según si la landing es sencilla, de captación, de venta, de lanzamiento o si requiere integraciones y medición.',
  },
  {
    question: '¿Cómo evito regalar cambios en una landing page?',
    answer:
      'Define revisiones incluidas, ejemplos de cambios fuera de alcance, precio de extras y qué ocurre si el cliente pide nuevas secciones o modificaciones no previstas.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'ejemplo presupuesto landing page',
    'presupuesto landing page ejemplo',
    'modelo presupuesto landing page',
    'presupuesto pagina de aterrizaje',
    'propuesta landing page freelance',
  ],
  openGraph: {
    title,
    description,
    url: route,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function EjemploPresupuestoLandingPage() {
  const pageUrl = new URL(route, siteConfig.url).toString();

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
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: new URL('/', siteConfig.url).toString(),
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
        id="ejemplo-presupuesto-landing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="ejemplo-presupuesto-landing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="ejemplo-presupuesto-landing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Ejemplo práctico</span>
            <h1>Ejemplo de presupuesto de landing page para presentar mejor tu precio</h1>
            <p className="lead">
              Una landing page no debería presupuestarse como una página suelta. El presupuesto debe
              explicar objetivo, secciones, copy, diseño, desarrollo, formularios, revisiones,
              medición y límites para que el cliente entienda qué está comprando.
            </p>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi precio
              </Link>
              <Link href="/salida/kit-presupuesto" className="primary-button">
                Abrir kit de presupuesto
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué incluye este ejemplo</h2>
            <ul className="article-list">
              <li>Una estructura adaptable para presentar el presupuesto.</li>
              <li>Bloques de alcance, entregables, revisiones y exclusiones.</li>
              <li>Una forma sencilla de separar precio, IVA y extras.</li>
              <li>Enlaces para calcular el precio antes de enviarlo.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Antes del ejemplo: calcula la cifra desde dentro</h2>
          <p>
            El ejemplo te ayuda a presentar mejor, pero no sustituye el cálculo. Antes de redactar
            conviene estimar horas, secciones, integraciones, revisiones, costes directos, buffer y
            margen. Si no haces esa cuenta, una propuesta bonita puede esconder un precio demasiado
            bajo.
          </p>
          <p>
            Para sacar esa base, usa primero la{' '}
            <Link href="/#calculadora">calculadora de precio de landing page</Link>. Después puedes
            trasladar el resultado a esta estructura de presupuesto.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una buena propuesta no arregla un precio mal calculado,
            pero sí ayuda a defender una cifra que ya tiene sentido.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Estructura base de un presupuesto de landing page</h2>
            <ol className="article-list article-list-ordered">
              <li>Contexto del proyecto y objetivo principal de la landing.</li>
              <li>Secciones incluidas: hero, beneficios, prueba social, FAQ y CTA.</li>
              <li>Responsable del copywriting y de los materiales visuales.</li>
              <li>Diseño responsive, maquetación y pruebas en móvil.</li>
              <li>Formulario, integración con email, CRM, calendario o analítica.</li>
              <li>Número de revisiones incluidas y precio de revisiones extra.</li>
              <li>Precio sin IVA, IVA si aplica y total final.</li>
              <li>Exclusiones, plazos, forma de pago y siguiente paso.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Bloque de ejemplo</h2>
            <p>
              Presupuesto para landing page de captación con hasta seis secciones, diseño
              responsive, formulario conectado a email, configuración básica de medición y dos
              rondas de revisión.
            </p>
            <p>
              No incluye campañas, redacción completa de textos largos, fotografías, nuevas
              integraciones no previstas ni mantenimiento posterior a la publicación.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Partes del presupuesto">
          <article className="feature-card">
            <h2>1. Alcance visible</h2>
            <p>
              Define cuántas secciones entran, qué pantallas o variantes móviles se entregan y qué
              elementos no están incluidos para evitar ambigüedad.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Integraciones y medición</h2>
            <p>
              Un formulario simple no es lo mismo que conectar CRM, calendario, email marketing,
              pagos o eventos de analítica. Déjalo separado.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Revisiones y extras</h2>
            <p>
              Aclara cuántas rondas entran, cuánto dura cada fase y cómo se presupuestan cambios de
              alcance o nuevas secciones.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Texto de ejemplo para presentar el precio</h2>
          <div className="disclaimer-box">
            <p>
              El precio de la landing page es de 950 EUR + IVA. Incluye el alcance descrito en esta
              propuesta, dos rondas de revisión y publicación en el entorno acordado. Cualquier
              nueva sección, integración o cambio de alcance se presupuestará aparte antes de
              realizarse.
            </p>
          </div>
          <p>
            Lo importante no es copiar la cifra, sino la estructura: precio, alcance, revisiones y
            exclusiones aparecen juntos. Así evitas que el presupuesto se convierta en una promesa
            abierta.
          </p>
          <div className="guide-cta">
            <Link href="/precio-landing-page-freelance" className="primary-button">
              Ver guía de precios
            </Link>
            <Link href="/salida/kit-presupuesto-texto" className="primary-button">
              Descargar versión en texto
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores habituales al presupuestar una landing page</h2>
          <ol className="article-list article-list-ordered">
            <li>Cobrarla como si solo fuera maquetar una página.</li>
            <li>No separar copywriting, estrategia, diseño e integraciones.</li>
            <li>No limitar revisiones ni cambios de alcance.</li>
            <li>No aclarar si el IVA va aparte.</li>
            <li>No dejar por escrito qué pasa después de publicar.</li>
          </ol>
          <p>
            Si la landing va a convertirse en soporte recurrente, también puede interesarte calcular
            una cuota con{' '}
            <a href="https://www.mantenimientowebmensual.es">Mantenimiento Web Mensual</a>.
          </p>
        </div>
      </section>

      <section className="section alt" id="faq-ejemplo-presupuesto-landing">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre presupuestos de landing page</h2>
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
