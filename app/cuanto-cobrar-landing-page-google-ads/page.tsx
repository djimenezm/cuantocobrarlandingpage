import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-landing-page-google-ads';
const title = 'Cuanto cobrar una landing page para Google Ads';
const description =
  'Guia practica para calcular cuanto cobrar por una landing page para Google Ads con estrategia, copy, tracking, conversiones, revisiones, margen e IVA aparte.';

const faqItems = [
  {
    question: 'Cuanto cobrar por una landing page para Google Ads?',
    answer:
      'Depende del alcance: estrategia, numero de secciones, copy, diseno, desarrollo, formularios, tracking, pagina de gracias, pruebas y revisiones. Si la landing recibe trafico de pago, conviene presupuestar tambien medicion y QA.',
  },
  {
    question: 'Debo incluir la configuracion de Google Ads en el precio?',
    answer:
      'Solo si forma parte del servicio contratado. Si no gestionas campanas, deja claro que entregas la landing, la estructura de conversion y la medicion pactada, pero no la optimizacion de anuncios.',
  },
  {
    question: 'Que hace subir el precio de una landing para anuncios?',
    answer:
      'Suben el precio las variantes por campana, el copy persuasivo, integraciones con CRM, eventos de conversion, formularios complejos, urgencia, pruebas moviles y soporte posterior al lanzamiento.',
  },
  {
    question: 'Como protejo margen si el cliente pide cambios tras publicar?',
    answer:
      'Incluye un numero limitado de revisiones y separa claramente optimizacion posterior, nuevas variantes, cambios por resultados de campana y mantenimiento. Eso evita que el precio inicial absorba todo el ciclo de mejora.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuanto cobrar landing page google ads',
    'precio landing page google ads',
    'presupuesto landing page google ads',
    'landing page para anuncios precio',
    'cuanto cuesta landing page para google ads',
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

export default function CuantoCobrarLandingPageGoogleAdsPage() {
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
    datePublished: '2026-05-02',
    dateModified: '2026-05-02',
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
        id="precio-google-ads-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="precio-google-ads-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="precio-google-ads-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Precio para anuncios</span>
            <h1>Cuanto cobrar una landing page para Google Ads sin quedarte corto</h1>
            <p className="lead">
              Una landing para Google Ads no es solo una pagina bonita. Cada visita cuesta dinero,
              asi que el precio debe cubrir estrategia, mensaje, formulario, tracking, pruebas,
              revisiones y margen para no convertir la campana del cliente en trabajo gratis.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Google Ads</span>
              <span className="hero-badge">Tracking</span>
              <span className="hero-badge">Precio defendible</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio
              </Link>
              <Link href="/landing-page-para-google-ads" className="primary-button">
                Ver guia Google Ads
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Antes de presupuestar</h2>
            <ul className="article-list">
              <li>Confirma si entregas solo landing o tambien medicion.</li>
              <li>Separa copy, diseno, desarrollo, integraciones y QA.</li>
              <li>Define revisiones y cambios tras publicar.</li>
              <li>No incluyas gestion de campanas si no esta pactada.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por que esta landing se cobra distinto</h2>
          <p>
            En una landing normal puedes centrarte en explicar la oferta y cerrar una accion. En una
            landing para Google Ads, ademas debes cuidar la continuidad entre busqueda, anuncio,
            titular, CTA, formulario, pagina de gracias y evento de conversion. Si esa cadena falla,
            el cliente paga clics que no se convierten.
          </p>
          <p>
            Por eso el presupuesto debe contemplar mas que maquetacion. Necesita cubrir decisiones
            comerciales, medicion, pruebas y un cierre de alcance muy claro.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> si la landing va a recibir trafico de pago, el precio debe
            cubrir el riesgo de conversion, no solo el numero de secciones.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Partidas que cambian el precio">
          <article className="feature-card">
            <h2>Estrategia y copy</h2>
            <p>
              Entender intencion, oferta, objeciones y promesa principal requiere trabajo previo.
              Si tambien escribes textos, no lo escondas dentro de la maquetacion.
            </p>
          </article>

          <article className="feature-card">
            <h2>Tracking y conversion</h2>
            <p>
              Formularios, eventos, pagina de gracias, pixels, etiquetas o CRM elevan el alcance.
              Sin medir, el cliente no puede optimizar sus anuncios.
            </p>
          </article>

          <article className="feature-card">
            <h2>Variantes y revisiones</h2>
            <p>
              Campanas por servicio, zona o publico pueden necesitar mensajes distintos. Cada
              variante implica adaptacion, pruebas y control de calidad.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Formula para calcular el precio</h2>
            <ol className="article-list article-list-ordered">
              <li>Parte de tu tarifa interna por hora o de tu objetivo mensual.</li>
              <li>Estima estrategia, estructura, copy, diseno y desarrollo.</li>
              <li>Suma integraciones: formulario, email, CRM, calendario o automatizacion.</li>
              <li>Anade tracking: evento de conversion, pagina de gracias y pruebas.</li>
              <li>Incluye revisiones, ajustes responsive y QA antes de publicar.</li>
              <li>Aplica margen y separa IVA, urgencia, campanas y mantenimiento.</li>
            </ol>
            <p>
              Para entender primero la estructura ideal, revisa la guia de{' '}
              <Link href="/landing-page-para-google-ads">landing page para Google Ads</Link>. Si tu
              caso es mas general, puedes apoyarte en{' '}
              <Link href="/precio-landing-page-freelance">precio landing page freelance</Link>.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Fuera del precio base</h2>
            <ul className="article-list">
              <li>Gestion mensual de anuncios.</li>
              <li>Optimizacion continua de campanas.</li>
              <li>Nuevas variantes tras analizar datos.</li>
              <li>Copy de anuncios si no esta incluido.</li>
              <li>Mantenimiento o soporte recurrente.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como presentar el presupuesto al cliente</h2>
          <p>
            No lo presentes como &quot;una landing&quot;. Presentalo como una pieza de conversion
            para trafico de pago, con alcance claro: estructura, secciones, copy, diseno,
            desarrollo, integraciones, medicion y revisiones.
          </p>
          <p>
            Si el cliente quiere reducir precio, no bajes margen sin tocar alcance. Puedes quitar
            variantes, limitar revisiones, separar tracking avanzado, excluir copy o dejar la
            optimizacion posterior como servicio aparte.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi presupuesto
            </Link>
            <Link href="/ejemplo-presupuesto-landing-page" className="primary-button">
              Ver ejemplo de propuesta
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Usa la calculadora para validar si el precio respira</h2>
          <p>
            Introduce secciones, integraciones, revisiones, copy, costes directos y margen. Despues
            contrasta el resultado con lo que pensabas cobrar. Si la diferencia es grande, revisa
            si estabas olvidando estrategia, medicion, pruebas o cambios posteriores.
          </p>
          <p>
            El objetivo no es inflar el precio sin motivo. Es evitar que una landing que depende de
            anuncios de pago se venda como si fuera una pagina sencilla sin responsabilidad
            comercial.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Ir a la calculadora
            </Link>
            <Link href="/salida/kit-presupuesto" className="primary-button">
              Abrir kit de presupuesto
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt" id="faq-precio-google-ads">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre cuanto cobrar por una landing para Google Ads</h2>
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

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Convierte el alcance en una cifra defendible</h2>
          <p>
            Antes de enviar una propuesta para Google Ads, calcula el precio con tus datos reales,
            separa extras y deja por escrito que no incluye gestion de campanas si no forma parte
            del servicio.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular precio ahora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
