import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/estructura-landing-page-que-convierte';
const title = 'Estructura de una landing page que convierte: secciones y orden';
const description =
  'Guía práctica para definir la estructura de una landing page que convierte: hero, problema, beneficios, prueba social, oferta, formulario, FAQ, CTA, revisiones y extras.';

const faqItems = [
  {
    question: '¿Cuál es la estructura básica de una landing page?',
    answer:
      'Una estructura habitual incluye hero con propuesta de valor, problema, beneficios, prueba social, cómo funciona, oferta o entregable, formulario o CTA, FAQ y cierre. El orden puede cambiar según objetivo y tráfico.',
  },
  {
    question: '¿Cuántas secciones debe tener una landing page?',
    answer:
      'No hay un número único. Una landing sencilla puede funcionar con 5 o 6 secciones. Una oferta más cara, fría o compleja puede necesitar más contexto, prueba social, objeciones y detalle.',
  },
  {
    question: '¿La estructura afecta al precio de una landing?',
    answer:
      'Sí. Más secciones implican más copy, diseño, maquetación, revisiones y pruebas. Por eso conviene definir estructura antes de cerrar precio.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'estructura landing page',
    'estructura de una landing page',
    'landing page que convierte',
    'secciones landing page',
    'como estructurar una landing page',
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

export default function EstructuraLandingPageQueConviertePage() {
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
        id="estructura-landing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="estructura-landing-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="estructura-landing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Estructura y conversión</span>
            <h1>Estructura de una landing page que convierte: secciones y orden</h1>
            <p className="lead">
              Una landing que convierte no se improvisa juntando bloques bonitos. Necesita una
              secuencia clara: captar atención, explicar el valor, resolver objeciones, demostrar
              confianza y llevar al usuario hacia una acción concreta.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Secciones clave</span>
              <span className="hero-badge">CTA y formularios</span>
              <span className="hero-badge">Prueba social</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio
              </Link>
              <Link href="/que-incluye-una-landing-page" className="primary-button">
                Ver qué incluye
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>La estructura debe responder al objetivo de conversión.</li>
              <li>Más secciones implican más copy, diseño, maquetación y revisión.</li>
              <li>El formulario y el CTA deben estar pensados desde el inicio.</li>
              <li>La prueba social reduce fricción y ayuda a justificar la oferta.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Antes de pensar en diseño, define la acción principal</h2>
          <p>
            Una landing puede buscar una llamada, una solicitud de presupuesto, una descarga, una
            compra o una reserva. La estructura cambia según esa acción. Si no hay una acción
            principal clara, es fácil acabar con una página informativa que no convierte.
          </p>
          <p>
            La pregunta inicial no es cuantas secciones quieres, sino que necesita entender el
            usuario antes de dar el siguiente paso.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una landing no es una web pequeña. Es una página con una
            secuencia pensada para que una persona tome una decisión concreta.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Secciones clave de una landing">
          <article className="feature-card">
            <h2>Hero</h2>
            <p>
              Debe explicar qué ofreces, para quién es y qué resultado promete. Si el hero no se
              entiende rápido, el resto de la landing trabaja cuesta arriba.
            </p>
          </article>

          <article className="feature-card">
            <h2>Problema y beneficios</h2>
            <p>
              Conecta con la situación del usuario y traduce características en beneficios claros.
              No basta con listar servicios: hay que explicar por qué importan.
            </p>
          </article>

          <article className="feature-card">
            <h2>CTA y formulario</h2>
            <p>
              La llamada a la acción debe estar alineada con el nivel de compromiso. Pedir una
              llamada no es lo mismo que pedir un email o una compra directa.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Orden recomendado para una landing page</h2>
            <ol className="article-list article-list-ordered">
              <li>Hero con promesa clara, público objetivo y CTA principal.</li>
              <li>Contexto del problema o situación que quiere resolver el usuario.</li>
              <li>Beneficios principales explicados con lenguaje concreto.</li>
              <li>Cómo funciona el proceso o qué pasos vienen después.</li>
              <li>Prueba social, casos, datos, logos, testimonios o ejemplos.</li>
              <li>Oferta, entregable, servicio o paquete con límites claros.</li>
              <li>Formulario, calendario, botón de contacto o acción principal.</li>
              <li>FAQ para resolver objeciones antes del cierre final.</li>
            </ol>
            <p>
              Este orden es una base, no una regla rígida. Una landing para tráfico frío suele
              necesitar más contexto que una landing para usuarios que ya conocen la marca.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Preguntas que debe responder</h2>
            <ul className="article-list">
              <li>¿Qué es esto?</li>
              <li>¿Es para mí?</li>
              <li>¿Qué gano?</li>
              <li>¿Por qué debería confiar?</li>
              <li>¿Qué tengo que hacer ahora?</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo cambia el precio según la estructura</h2>
          <p>
            Una landing de cinco secciones con textos entregados por el cliente no tiene el mismo
            esfuerzo que una landing con copy completo, prueba social, integraciones, eventos,
            formulario avanzado y varias rondas de revisión.
          </p>
          <div className="feature-grid" aria-label="Factores que afectan al precio">
            <article className="feature-card">
              <h3>Más secciones</h3>
              <p>Más estrategia, wireframe, diseño, maquetación, contenido y pruebas responsive.</p>
            </article>

            <article className="feature-card">
              <h3>Más conversión</h3>
              <p>Más trabajo de copy, objeciones, CTA, formularios, medición y seguimiento.</p>
            </article>

            <article className="feature-card">
              <h3>Más integraciones</h3>
              <p>Más riesgo técnico, configuración, validaciones, automatizaciones y QA.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores comunes al estructurar una landing</h2>
          <ol className="article-list article-list-ordered">
            <li>Meter demasiados objetivos en una sola página.</li>
            <li>Empezar por el diseño sin definir mensaje ni acción principal.</li>
            <li>Poner formularios largos para usuarios que aún no confían.</li>
            <li>No incluir prueba social, ejemplos o razones para creer.</li>
            <li>Esconder el CTA o cambiarlo en cada sección.</li>
            <li>No aclarar qué pasa después de enviar el formulario.</li>
          </ol>
          <p>
            Si lo que necesitas es delimitar el alcance completo del servicio, revisa también{' '}
            <Link href="/que-incluye-una-landing-page">qué incluye una landing page</Link>. Si ya
            tienes claro el alcance, baja la estructura a precio con la calculadora.
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

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre estructura de landing page</h2>
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
