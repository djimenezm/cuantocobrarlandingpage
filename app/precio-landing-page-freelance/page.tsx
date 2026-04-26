import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
    author: {
      '@type': 'Organization',
      name: siteConfig.ownerName,
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
      <Script
        id="precio-landing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="precio-landing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <Link href="/salida/kit-presupuesto" className="primary-button">
                Abrir kit de presupuesto
              </Link>
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
        <div className="container feature-grid" aria-label="Rangos orientativos">
          <article className="feature-card">
            <h2>Landing básica</h2>
            <p>
              Una página corta, con pocas secciones y contenido ya preparado, suele requerir menos
              trabajo de estrategia. Aun así, incluye preparación, maquetación, responsive, pruebas
              y ajustes finales.
            </p>
          </article>

          <article className="feature-card">
            <h2>Landing de captación</h2>
            <p>
              Si incluye formulario, propuesta de valor, estructura persuasiva, tracking y varias
              rondas de cambios, ya no es solo una página: es una pieza comercial completa.
            </p>
          </article>

          <article className="feature-card">
            <h2>Landing de venta</h2>
            <p>
              Cuando hay lanzamiento, urgencia, copy comercial, integraciones, pagos o medición más
              fina, el precio debe cubrir riesgo, responsabilidad y margen de revisión.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>La fórmula práctica para poner precio</h2>
            <p>
              El error habitual es empezar por una cifra redonda: 300, 600, 1.000 o 1.500 EUR. Esa
              cifra puede sonar bien, pero no dice nada sobre si el proyecto te deja margen real.
              Una forma más sólida es construir el precio desde dentro.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Define tu objetivo mensual neto y tus costes fijos.</li>
              <li>Calcula cuántas horas facturables tienes de verdad cada mes.</li>
              <li>Convierte ese dato en una tarifa interna mínima por hora.</li>
              <li>Estima horas de estrategia, diseño, desarrollo, pruebas y gestión.</li>
              <li>Suma costes directos, margen de seguridad e impuestos aparte.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla sana:</strong> si una landing page te exige pensar, escribir,
              implementar, probar, coordinar y corregir, no la cobres como si solo fuera colocar
              bloques en una página.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Checklist antes de enviar precio</h2>
            <ul className="article-list">
              <li>Número de secciones y variantes responsive.</li>
              <li>Quién aporta textos, imágenes y propuesta de valor.</li>
              <li>Formulario, email, CRM, calendario, pagos o automatizaciones.</li>
              <li>Número de rondas de revisión incluidas.</li>
              <li>Fecha límite y penalización por urgencia.</li>
              <li>Mantenimiento o soporte tras publicar.</li>
            </ul>
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
