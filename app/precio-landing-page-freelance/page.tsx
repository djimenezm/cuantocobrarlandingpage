import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

const title = 'Precio landing page freelance: cuanto cobrar';
const description =
  'Guia para calcular el precio de una landing page freelance segun alcance, copy, integraciones, revisiones, urgencia y margen real.';

const faqItems = [
  {
    question: 'Cuanto cobrar por una landing page sencilla?',
    answer:
      'Para una landing page sencilla, el precio no deberia salir solo de una media de mercado. Conviene partir de tus horas reales, tu tarifa minima, el numero de secciones, el copy, las revisiones y los costes directos.',
  },
  {
    question: 'Es mejor cobrar por hora o por proyecto?',
    answer:
      'Para clientes finales suele ser mas facil vender un precio cerrado por proyecto, pero ese precio deberia construirse desde una tarifa por hora interna. Asi evitas regalar tiempo no visible.',
  },
  {
    question: 'Que hace subir el precio de una landing page?',
    answer:
      'Suben el precio el copywriting, las integraciones con formularios o CRM, las variantes responsive, las revisiones extra, la urgencia, la estrategia previa y cualquier trabajo posterior de medicion o mantenimiento.',
  },
  {
    question: 'Debo incluir el IVA dentro del precio?',
    answer:
      'Lo mas claro es calcular tu precio profesional sin IVA y mostrar el IVA aparte cuando corresponda. Asi no confundes tu ingreso real con impuestos que solo estas recaudando.',
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
            <span className="eyebrow">Guia de precios</span>
            <h1>Precio de una landing page freelance: cuanto cobrar sin quedarte corto</h1>
            <p className="lead">
              Una landing page puede parecer un proyecto pequeno, pero suele mezclar estrategia,
              diseno, copy, desarrollo, formularios, analitica, pruebas responsive y revisiones. Si
              solo miras lo que cobra otra persona, es facil dejar fuera horas que luego no puedes
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

          <aside className="feature-card article-summary" aria-label="Resumen rapido">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Usa una tarifa interna por hora aunque vendas precio cerrado.</li>
              <li>Separa precio profesional, costes directos e IVA.</li>
              <li>Incluye revisiones y cambios de alcance antes de enviar la propuesta.</li>
              <li>Si hay urgencia, estrategia o integraciones, el precio no debe ser basico.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Rangos orientativos">
          <article className="feature-card">
            <h2>Landing basica</h2>
            <p>
              Una pagina corta, con pocas secciones y contenido ya preparado, suele requerir menos
              trabajo de estrategia. Aun asi, incluye preparacion, maquetacion, responsive, pruebas
              y ajustes finales.
            </p>
          </article>

          <article className="feature-card">
            <h2>Landing de captacion</h2>
            <p>
              Si incluye formulario, propuesta de valor, estructura persuasiva, tracking y varias
              rondas de cambios, ya no es solo una pagina: es una pieza comercial completa.
            </p>
          </article>

          <article className="feature-card">
            <h2>Landing de venta</h2>
            <p>
              Cuando hay lanzamiento, urgencia, copy comercial, integraciones, pagos o medicion mas
              fina, el precio debe cubrir riesgo, responsabilidad y margen de revision.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>La formula practica para poner precio</h2>
            <p>
              El error habitual es empezar por una cifra redonda: 300, 600, 1.000 o 1.500 EUR. Esa
              cifra puede sonar bien, pero no dice nada sobre si el proyecto te deja margen real.
              Una forma mas solida es construir el precio desde dentro.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Define tu objetivo mensual neto y tus costes fijos.</li>
              <li>Calcula cuantas horas facturables tienes de verdad cada mes.</li>
              <li>Convierte ese dato en una tarifa interna minima por hora.</li>
              <li>Estima horas de estrategia, diseno, desarrollo, pruebas y gestion.</li>
              <li>Suma costes directos, margen de seguridad e impuestos aparte.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla sana:</strong> si una landing page te exige pensar, escribir,
              implementar, probar, coordinar y corregir, no la cobres como si solo fuera colocar
              bloques en una pagina.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Checklist antes de enviar precio</h2>
            <ul className="article-list">
              <li>Numero de secciones y variantes responsive.</li>
              <li>Quien aporta textos, imagenes y propuesta de valor.</li>
              <li>Formulario, email, CRM, calendario, pagos o automatizaciones.</li>
              <li>Numero de rondas de revision incluidas.</li>
              <li>Fecha limite y penalizacion por urgencia.</li>
              <li>Mantenimiento o soporte tras publicar.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Como defender el precio ante el cliente</h2>
          <p>
            El cliente no compra horas: compra una pagina que debe captar, explicar, convencer o
            vender. Por eso conviene presentar el precio ligado al resultado funcional: estructura
            del mensaje, velocidad, formularios, version movil, medicion y claridad del flujo.
          </p>
          <p>
            Si el cliente quiere bajar precio, no bajes margen sin tocar alcance. Puedes reducir
            secciones, limitar revisiones, dejar el copy fuera, eliminar integraciones o separar el
            mantenimiento posterior. Asi proteges tu trabajo sin convertir cada presupuesto en una
            negociacion a ciegas.
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
          <h2>Dudas habituales sobre cuanto cobrar</h2>
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
