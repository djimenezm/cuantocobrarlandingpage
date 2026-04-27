import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/landing-page-para-google-ads';
const title = 'Landing page para Google Ads: estructura, precio y conversion';
const description =
  'Guia para crear y presupuestar una landing page para Google Ads: mensaje, CTA, formulario, velocidad, tracking, conversiones y alcance del proyecto.';

const faqItems = [
  {
    question: 'Que debe tener una landing page para Google Ads?',
    answer:
      'Debe tener una promesa alineada con el anuncio, CTA claro, contenido relevante para la busqueda, formulario o accion principal, velocidad de carga, version movil cuidada y medicion de conversiones.',
  },
  {
    question: 'Cuanto cuesta una landing page para Google Ads?',
    answer:
      'Depende del alcance: numero de secciones, copy, diseno, desarrollo, formularios, integraciones, tracking, variantes y revisiones. Si la landing depende de anuncios de pago, conviene presupuestar tambien QA y medicion.',
  },
  {
    question: 'Es distinta a una landing para captar leads?',
    answer:
      'Puede compartir estructura, pero en Google Ads pesa mas la coherencia entre palabra clave, anuncio, mensaje de la landing, velocidad, calidad movil y evento de conversion.',
  },
  {
    question: 'Debo incluir configuracion de Google Ads en el precio?',
    answer:
      'Solo si forma parte del alcance. Si no gestionas campanas, deja claro que entregas la landing y la medicion basica, pero no la optimizacion de anuncios.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'landing page para google ads',
    'landing page anuncios google',
    'precio landing page google ads',
    'pagina de aterrizaje google ads',
    'landing page para campanas de pago',
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

export default function LandingPageParaGoogleAdsPage() {
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
        id="landing-google-ads-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="landing-google-ads-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="landing-google-ads-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Google Ads</span>
            <h1>Landing page para Google Ads: estructura, precio y conversion</h1>
            <p className="lead">
              Si vas a enviar trafico de pago a una landing, cada clic desperdiciado cuesta dinero.
              La pagina debe responder exactamente a la busqueda, cargar rapido, explicar la oferta
              sin rodeos y medir la conversion que importa.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Trafico de pago</span>
              <span className="hero-badge">Conversiones</span>
              <span className="hero-badge">Tracking</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio
              </Link>
              <Link href="/landing-page-para-captar-leads" className="primary-button">
                Ver captacion de leads
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>La landing debe coincidir con la intencion del anuncio.</li>
              <li>Velocidad, movil y claridad afectan al coste de oportunidad.</li>
              <li>El precio debe incluir tracking y pruebas si la campana depende de conversion.</li>
              <li>No mezcles gestion de anuncios con construccion de landing si no esta pactado.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por que una landing para Google Ads exige mas precision</h2>
          <p>
            En una landing organica puedes permitirte explicar mas contexto. En una landing para
            Google Ads, el usuario llega con una intencion concreta y el anunciante paga por esa
            visita. Si la pagina no confirma rapido que esta en el sitio correcto, el clic se pierde.
          </p>
          <p>
            Por eso el trabajo no es solo disenar una pagina bonita. Hay que conectar palabra clave,
            anuncio, titular, CTA, formulario, objeciones, prueba de confianza y evento de
            conversion. Esa coordinacion tambien debe aparecer en el presupuesto.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una landing para Google Ads no se mide solo por estetica;
            se mide por claridad, velocidad, relevancia y capacidad de convertir trafico pagado.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Elementos clave para Google Ads">
          <article className="feature-card">
            <h2>Mensaje alineado</h2>
            <p>
              El titular debe continuar la promesa del anuncio. Si el anuncio habla de presupuesto,
              consulta, demo o servicio local, la landing no puede abrir con un mensaje generico.
            </p>
          </article>

          <article className="feature-card">
            <h2>Conversion medible</h2>
            <p>
              Formulario, llamada, WhatsApp, descarga o reserva deben tener evento claro. Sin
              medicion, no hay forma de saber que anuncios traen oportunidades reales.
            </p>
          </article>

          <article className="feature-card">
            <h2>Alcance cerrado</h2>
            <p>
              Define si incluyes copy, diseno, implementacion, eventos, pagina de gracias,
              integraciones, variantes y soporte tras publicar.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Estructura recomendada para anuncios de pago</h2>
            <ol className="article-list article-list-ordered">
              <li>Titular que repite o mejora la promesa principal del anuncio.</li>
              <li>Subtitulo con beneficio, publico objetivo y siguiente paso.</li>
              <li>CTA visible arriba del todo y repetido en puntos clave.</li>
              <li>Beneficios concretos vinculados a la intencion de busqueda.</li>
              <li>Prueba de confianza: casos, datos, garantias, logos o testimonios.</li>
              <li>Formulario o accion principal con friccion proporcional al valor ofrecido.</li>
              <li>FAQ para resolver objeciones antes de pagar otro clic.</li>
              <li>Pagina de gracias o confirmacion con evento de conversion.</li>
            </ol>
            <p>
              Si el trafico viene de campanas distintas, puede tener sentido crear variantes por
              servicio, zona, tipo de cliente o nivel de intencion. No siempre hace falta una landing
              por palabra clave, pero si una sola pagina habla demasiado generico, la conversion se
              diluye.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Checklist tecnico</h2>
            <ul className="article-list">
              <li>Carga rapida en movil.</li>
              <li>Formulario probado de extremo a extremo.</li>
              <li>Evento de conversion configurado.</li>
              <li>Pagina de gracias o mensaje posterior claro.</li>
              <li>Politica de privacidad enlazada junto al formulario.</li>
              <li>UTM o fuente de lead conservada si hay CRM.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como afecta al precio de una landing para Google Ads</h2>
          <p>
            El precio sube cuando la landing no solo presenta una oferta, sino que debe soportar
            trafico de pago, conversiones medibles y decisiones comerciales. Una pagina sin tracking
            puede parecer mas barata, pero deja al cliente sin datos para optimizar.
          </p>
          <div className="feature-grid" aria-label="Factores que cambian el precio">
            <article className="feature-card">
              <h3>Mas estrategia</h3>
              <p>
                Revisar intencion de busqueda, oferta, CTA y objeciones requiere trabajo antes de
                disenar.
              </p>
            </article>

            <article className="feature-card">
              <h3>Mas medicion</h3>
              <p>
                Conversiones, eventos, formularios, pagina de gracias y pruebas elevan el alcance.
              </p>
            </article>

            <article className="feature-card">
              <h3>Mas variantes</h3>
              <p>
                Si hay campanas por servicio, publico o zona, cada variante exige adaptacion y QA.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores comunes al presupuestarla</h2>
          <ol className="article-list article-list-ordered">
            <li>Cobrar solo una pagina cuando en realidad hay estrategia, copy y medicion.</li>
            <li>No aclarar si el cliente aporta textos, imagenes y propuesta de valor.</li>
            <li>Prometer conversiones sin controlar trafico, oferta ni campanas.</li>
            <li>No incluir pruebas del formulario, del evento y de la version movil.</li>
            <li>Mezclar landing, campanas y mantenimiento sin separar partidas.</li>
            <li>No dejar margen para ajustes despues de ver los primeros datos.</li>
          </ol>
          <p>
            Si el objetivo principal es conseguir contactos, revisa tambien la guia de{' '}
            <Link href="/landing-page-para-captar-leads">landing page para captar leads</Link>. Para
            delimitar entregables, te ayudara ver{' '}
            <Link href="/que-incluye-una-landing-page">que incluye una landing page</Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi precio
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
          <h2>Dudas habituales sobre landings para Google Ads</h2>
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
