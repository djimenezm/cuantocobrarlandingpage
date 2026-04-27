import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/landing-page-para-captar-leads';
const title = 'Landing page para captar leads: estructura, formulario y precio';
const description =
  'Guia practica para crear y presupuestar una landing page para captar leads: oferta, CTA, formulario, lead magnet, integraciones, seguimiento y precio.';

const faqItems = [
  {
    question: 'Que debe tener una landing page para captar leads?',
    answer:
      'Debe tener una promesa clara, beneficio principal, prueba de confianza, CTA visible, formulario adecuado al nivel de compromiso, mensaje posterior al envio y seguimiento del lead.',
  },
  {
    question: 'Cuanto cuesta una landing page para captar leads?',
    answer:
      'Depende del numero de secciones, copy, diseno, formulario, integraciones, automatizaciones y revisiones. Una landing de captacion suele costar mas si incluye estrategia, medicion y automatizaciones.',
  },
  {
    question: 'Es mejor pedir pocos datos en el formulario?',
    answer:
      'En general, cuantos menos datos pides, menor friccion. Pero si el lead requiere cualificacion, puede tener sentido pedir mas informacion siempre que el valor percibido lo justifique.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'landing page para captar leads',
    'landing page captacion leads',
    'landing page con formulario',
    'pagina de captacion de leads',
    'precio landing page captacion',
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

export default function LandingPageParaCaptarLeadsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();

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
    datePublished: '2026-04-27',
    dateModified: '2026-04-27',
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
        id="landing-captar-leads-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="landing-captar-leads-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="landing-captar-leads-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Captacion de leads</span>
            <h1>Landing page para captar leads: estructura, formulario y precio</h1>
            <p className="lead">
              Una landing de captacion no se mide por lo bonita que queda, sino por si convierte
              trafico en contactos utiles. Para presupuestarla bien necesitas definir oferta,
              formulario, integraciones, seguimiento y que pasa despues de cada envio.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Formulario</span>
              <span className="hero-badge">Lead magnet</span>
              <span className="hero-badge">Seguimiento</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio
              </Link>
              <Link href="/estructura-landing-page-que-convierte" className="primary-button">
                Ver estructura
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>La oferta debe justificar que el usuario deje sus datos.</li>
              <li>El formulario debe pedir lo minimo necesario para cualificar.</li>
              <li>Las integraciones y automatizaciones afectan al precio.</li>
              <li>Sin seguimiento, una landing solo recoge contactos; no crea oportunidades.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Que significa captar leads con una landing</h2>
          <p>
            Captar leads no es poner un formulario al final de una pagina y esperar. Es construir
            una secuencia: atraer a la persona adecuada, explicar una promesa clara, reducir dudas,
            pedir una accion razonable y entregar una respuesta inmediata.
          </p>
          <p>
            Por eso una landing de captacion suele requerir mas criterio que una pagina informativa.
            Necesita mensaje, conversion, medicion y un minimo proceso posterior.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una landing de captacion vale mas cuando incluye el camino
            completo: visita, formulario, confirmacion, entrega y seguimiento.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Elementos clave para captar leads">
          <article className="feature-card">
            <h2>Oferta o incentivo</h2>
            <p>
              Puede ser una consulta, presupuesto, demo, checklist, guia, calculadora o recurso
              descargable. Lo importante es que tenga valor suficiente para pedir datos.
            </p>
          </article>

          <article className="feature-card">
            <h2>Formulario</h2>
            <p>
              Debe equilibrar conversion y cualificacion. Pedir solo email aumenta volumen; pedir
              mas datos puede filtrar mejor, pero tambien frena envios.
            </p>
          </article>

          <article className="feature-card">
            <h2>Seguimiento</h2>
            <p>
              Despues del envio puede haber email automatico, redireccion, aviso interno, CRM,
              etiqueta de origen o evento de analytics.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Estructura recomendada para captar leads</h2>
            <ol className="article-list article-list-ordered">
              <li>Hero con promesa, publico objetivo y CTA principal.</li>
              <li>Problema o deseo que conecta con la busqueda del usuario.</li>
              <li>Beneficios concretos del recurso, servicio o siguiente paso.</li>
              <li>Prueba de confianza: ejemplos, datos, casos, logos o autoridad.</li>
              <li>Formulario con campos justificados y mensaje de privacidad claro.</li>
              <li>Confirmacion de que ocurrira despues del envio.</li>
              <li>FAQ para resolver objeciones antes de dejar datos.</li>
              <li>CTA final para recuperar usuarios que han llegado hasta el cierre.</li>
            </ol>
            <p>
              La estructura puede ser corta si el trafico ya viene caliente. Si el usuario llega
              desde busqueda fria o anuncios, normalmente necesita mas contexto y mas confianza.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Campos habituales</h2>
            <ul className="article-list">
              <li>Email para recurso descargable.</li>
              <li>Nombre y email para newsletter o consulta simple.</li>
              <li>Telefono solo si el siguiente paso es llamada.</li>
              <li>Presupuesto, web o necesidad si necesitas cualificar.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como afecta al precio de una landing page</h2>
          <p>
            Una landing para captar leads puede parecer sencilla, pero el precio cambia mucho segun
            el nivel de estrategia, copy, integraciones y automatizacion. Un formulario basico no
            cuesta lo mismo que una captacion conectada a CRM, email de bienvenida, evento de
            conversion y pagina de gracias.
          </p>
          <div className="feature-grid" aria-label="Factores de precio">
            <article className="feature-card">
              <h3>Mas copy y oferta</h3>
              <p>Definir promesa, beneficios, objeciones, CTA y mensaje posterior lleva tiempo.</p>
            </article>

            <article className="feature-card">
              <h3>Mas integraciones</h3>
              <p>Formularios, email marketing, CRM, automatizaciones y tracking suman alcance.</p>
            </article>

            <article className="feature-card">
              <h3>Mas revision</h3>
              <p>Pruebas responsive, validacion de formularios, entregas y QA protegen conversion.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores comunes en landings de captacion</h2>
          <ol className="article-list article-list-ordered">
            <li>Pedir demasiados datos para una oferta poco concreta.</li>
            <li>No explicar que recibira el usuario despues de enviar el formulario.</li>
            <li>No tener pagina de gracias, email de confirmacion o aviso interno.</li>
            <li>Usar el mismo CTA para trafico frio y usuarios que ya conocen la marca.</li>
            <li>No medir conversiones ni diferenciar origen del lead.</li>
            <li>No dejar claro si la captacion incluye copy, formulario o integraciones.</li>
          </ol>
          <p>
            Para delimitar mejor el alcance, revisa{' '}
            <Link href="/que-incluye-una-landing-page">que incluye una landing page</Link>. Si
            quieres bajar ese alcance a euros, usa la calculadora o mira el{' '}
            <Link href="/ejemplo-presupuesto-landing-page">ejemplo de presupuesto</Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi landing
            </Link>
            <Link href="/precio-landing-page-freelance" className="primary-button">
              Ver guia de precios
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre landing pages para captar leads</h2>
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

      <Footer />
    </main>
  );
}
