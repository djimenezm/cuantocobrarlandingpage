import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/que-incluye-una-landing-page';
const title = 'Que incluye una landing page y que conviene cobrar aparte';
const description =
  'Guia practica para definir que incluye una landing page: secciones, copy, diseno, desarrollo, responsive, formularios, integraciones, revisiones, medicion y extras.';

const faqItems = [
  {
    question: 'Que incluye normalmente una landing page?',
    answer:
      'Suele incluir estructura de secciones, diseno responsive, maquetacion, formulario o llamada a la accion, ajustes basicos, pruebas y una o varias rondas de revision. El copy, integraciones avanzadas y medicion pueden ir incluidos o presupuestarse aparte.',
  },
  {
    question: 'El copywriting debe entrar en el precio de una landing?',
    answer:
      'Depende del servicio. Si el cliente entrega textos finales, el precio puede ser menor. Si tienes que definir mensaje, propuesta de valor y textos comerciales, conviene presupuestarlo como parte importante del proyecto.',
  },
  {
    question: 'Que tareas deberian cobrarse aparte en una landing page?',
    answer:
      'Nuevas secciones, integraciones no previstas, copy completo, estrategia, fotografias, campanas, urgencias, revisiones extra, variantes para tests y mantenimiento posterior suelen cobrarse aparte.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'que incluye una landing page',
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
            <h1>Que incluye una landing page y que conviene cobrar aparte</h1>
            <p className="lead">
              Una landing page no es solo una pagina bonita. Puede incluir estrategia, estructura,
              copy, diseno, desarrollo, formularios, integraciones, medicion, revisiones y soporte
              posterior. Si no separas bien cada bloque, es facil presupuestarla demasiado barata.
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
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Define secciones, copy, diseno, desarrollo, integraciones y revisiones.</li>
              <li>No mezcles estrategia, campanas o mantenimiento dentro del precio basico.</li>
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
              Hero, beneficios, prueba social, proceso, FAQ, llamada a la accion y formulario. El
              numero de secciones cambia mucho el tiempo de diseno, maquetacion y revision.
            </p>
          </article>

          <article className="feature-card">
            <h2>Diseno y desarrollo</h2>
            <p>
              Incluye composicion visual, responsive, maquetacion, ajustes en movil, pruebas
              basicas y publicacion en el entorno acordado.
            </p>
          </article>

          <article className="feature-card">
            <h2>Conversion y medicion</h2>
            <p>
              Formularios, eventos, pixels, analitica, CRM o email marketing pueden convertir una
              landing simple en un proyecto con mas responsabilidad.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Que puede entrar en un precio base</h2>
            <p>
              El precio base deberia cubrir lo que puedes estimar con bastante seguridad. Si
              vendes una landing sencilla, puedes definir un paquete cerrado con secciones,
              entregables y revisiones limitadas.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Brief inicial y definicion del objetivo principal.</li>
              <li>Estructura de secciones acordada antes de disenar.</li>
              <li>Diseno responsive y maquetacion de la landing.</li>
              <li>Formulario o llamada a la accion sencilla.</li>
              <li>Optimizacion basica para movil y pruebas visuales.</li>
              <li>Una o dos rondas de revision claramente definidas.</li>
              <li>Publicacion en el entorno pactado si no requiere migraciones complejas.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Conviene concretar</h2>
            <ul className="article-list">
              <li>Quien entrega textos e imagenes.</li>
              <li>Cuantas secciones entran.</li>
              <li>Que integraciones incluye.</li>
              <li>Cuantas revisiones hay.</li>
              <li>Que pasa despues de publicar.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Que deberia cobrarse aparte</h2>
          <p>
            Lo que cambia el alcance, anade riesgo o requiere pensar mas alla de la pagina deberia
            quedar fuera del precio base. No es solo una cuestion de dinero: tambien evita que el
            cliente espere trabajo ilimitado por una cifra cerrada.
          </p>
          <div className="feature-grid" aria-label="Extras habituales">
            <article className="feature-card">
              <h3>Copy y estrategia</h3>
              <p>
                Mensaje, propuesta de valor, textos comerciales, investigacion, tono y arquitectura
                persuasiva.
              </p>
            </article>

            <article className="feature-card">
              <h3>Integraciones</h3>
              <p>
                CRM, automatizaciones, pagos, calendario, email marketing, pixels o eventos
                avanzados.
              </p>
            </article>

            <article className="feature-card">
              <h3>Trabajo posterior</h3>
              <p>
                Tests, nuevas variantes, cambios por campana, mantenimiento, soporte o reporting
                mensual.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como llevar el alcance a precio</h2>
          <p>
            Una vez sepas que incluye la landing, calcula horas por seccion, copy, integraciones,
            revisiones, costes directos y margen. Despues separa el precio profesional del IVA y
            deja por escrito que nuevas secciones o cambios de alcance se presupuestan aparte.
          </p>
          <p>
            Si el cliente todavia duda entre landing y web completa, revisa tambien la guia de{' '}
            <Link href="/landing-page-vs-pagina-web">landing page vs pagina web</Link>. Si ya tienes
            claro que es una landing, usa la calculadora para bajar ese alcance a una cifra.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi landing
            </Link>
            <Link href="/precio-landing-page-freelance" className="primary-button">
              Leer guia de precio
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Texto util para incluir en una propuesta</h2>
          <div className="disclaimer-box">
            <p>
              El presupuesto incluye el diseno y desarrollo de una landing page con hasta seis
              secciones, formulario de contacto, adaptacion responsive y dos rondas de revision.
              No incluye copywriting completo, nuevas secciones, integraciones no previstas,
              campanas, mantenimiento posterior ni variantes para test A/B.
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
          <h2>Dudas habituales sobre que incluye una landing page</h2>
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
