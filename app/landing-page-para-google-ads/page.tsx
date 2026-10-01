import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/landing-page-para-google-ads';
const title = 'Landing page para Google Ads: estructura, precio y conversión';
const description =
  'Guía para crear y presupuestar una landing page para Google Ads: mensaje, CTA, formulario, velocidad, tracking, conversiones y alcance del proyecto.';

const faqItems = [
  {
    question: '¿Qué debe tener una landing page para Google Ads?',
    answer:
      'Debe tener una promesa alineada con el anuncio, CTA claro, contenido relevante para la búsqueda, formulario o acción principal, velocidad de carga, versión móvil cuidada y medición de conversiones.',
  },
  {
    question: '¿Cuánto cuesta una landing page para Google Ads?',
    answer:
      'Depende del alcance: número de secciones, copy, diseño, desarrollo, formularios, integraciones, tracking, variantes y revisiones. Si la landing depende de anuncios de pago, conviene presupuestar también QA y medición.',
  },
  {
    question: '¿Es distinta a una landing para captar leads?',
    answer:
      'Puede compartir estructura, pero en Google Ads pesa más la coherencia entre palabra clave, anuncio, mensaje de la landing, velocidad, calidad móvil y evento de conversión.',
  },
  {
    question: '¿Debo incluir configuración de Google Ads en el precio?',
    answer:
      'Solo si forma parte del alcance. Si no gestionas campañas, deja claro que entregas la landing y la medición básica, pero no la optimización de anuncios.',
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
    'página de aterrizaje google ads',
    'landing page para campañas de pago',
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
    dateModified: '2026-10-02',
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
            <h1>Landing page para Google Ads: estructura, precio y conversión</h1>
            <p className="lead">
              Si vas a enviar tráfico de pago a una landing, cada clic desperdiciado cuesta dinero.
              La página debe responder exactamente a la búsqueda, cargar rápido, explicar la oferta
              sin rodeos y medir la conversión que importa.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Tráfico de pago</span>
              <span className="hero-badge">Conversiones</span>
              <span className="hero-badge">Tracking</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular precio
              </Link>
              <Link href="/cuanto-cobrar-landing-page-google-ads" className="primary-button">
                Cuánto cobrar
              </Link>
              <Link href="/landing-page-para-captar-leads" className="primary-button">
                Ver captación de leads
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>La landing debe coincidir con la intención del anuncio.</li>
              <li>Velocidad, móvil y claridad afectan al coste de oportunidad.</li>
              <li>El precio debe incluir tracking y pruebas si la campaña depende de conversión.</li>
              <li>No mezcles gestión de anuncios con construcción de landing si no está pactado.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por qué una landing para Google Ads exige más precisión</h2>
          <p>
            En una landing orgánica puedes permitirte explicar más contexto. En una landing para
            Google Ads, el usuario llega con una intención concreta y el anunciante paga por esa
            visita. Si la página no confirma rápido que está en el sitio correcto, el clic se pierde.
          </p>
          <p>
            Por eso el trabajo no es solo diseñar una página bonita. Hay que conectar palabra clave,
            anuncio, titular, CTA, formulario, objeciones, prueba de confianza y evento de
            conversión. Esa coordinación también debe aparecer en el presupuesto.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una landing para Google Ads no se mide solo por estética;
            se mide por claridad, velocidad, relevancia y capacidad de convertir tráfico pagado.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Elementos clave para Google Ads">
          <article className="feature-card">
            <h2>Mensaje alineado</h2>
            <p>
              El titular debe continuar la promesa del anuncio. Si el anuncio habla de presupuesto,
              consulta, demo o servicio local, la landing no puede abrir con un mensaje genérico.
            </p>
          </article>

          <article className="feature-card">
            <h2>Conversión medible</h2>
            <p>
              Formulario, llamada, WhatsApp, descarga o reserva deben tener evento claro. Sin
              medición, no hay forma de saber qué anuncios traen oportunidades reales.
            </p>
          </article>

          <article className="feature-card">
            <h2>Alcance cerrado</h2>
            <p>
              Define si incluyes copy, diseño, implementación, eventos, página de gracias,
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
              <li>Subtitulo con beneficio, público objetivo y siguiente paso.</li>
              <li>CTA visible arriba del todo y repetido en puntos clave.</li>
              <li>Beneficios concretos vinculados a la intención de búsqueda.</li>
              <li>Prueba de confianza: casos, datos, garantías, logos o testimonios.</li>
              <li>Formulario o acción principal con fricción proporcional al valor ofrecido.</li>
              <li>FAQ para resolver objeciones antes de pagar otro clic.</li>
              <li>Página de gracias o confirmación con evento de conversión.</li>
            </ol>
            <p>
              Si el tráfico viene de campañas distintas, puede tener sentido crear variantes por
              servicio, zona, tipo de cliente o nivel de intención. No siempre hace falta una landing
              por palabra clave, pero si una sola página habla demasiado genérico, la conversión se
              diluye.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Lista de comprobación técnica</h2>
            <ul className="article-list">
              <li>Carga rápida en móvil.</li>
              <li>Formulario probado de extremo a extremo.</li>
              <li>Evento de conversión configurado.</li>
              <li>Página de gracias o mensaje posterior claro.</li>
              <li>Política de privacidad enlazada junto al formulario.</li>
              <li>UTM o fuente de lead conservada si hay CRM.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="ejemplo-mensaje-google-ads">
        <div className="container text-block">
          <span className="eyebrow">Ejemplo de recorrido</span>
          <h2 id="ejemplo-mensaje-google-ads">De una búsqueda concreta a una solicitud medible</h2>
          <p>
            Imagina una campaña para solicitar presupuestos de reforma de baño en Madrid. El anuncio
            promete una valoración inicial; la landing debería continuar con ese servicio, esa zona
            y esa acción. Abrir con &quot;Construimos tus sueños&quot; obligaría a la persona a volver a
            buscar qué se le ofrece.
          </p>
          <ol className="article-list article-list-ordered">
            <li><strong>Anuncio:</strong> valoración inicial para reformar un baño en Madrid.</li>
            <li><strong>Titular de la landing:</strong> solicita un presupuesto para reformar tu baño en Madrid.</li>
            <li><strong>Acción:</strong> formulario breve con tipo de reforma, zona y contacto.</li>
            <li><strong>Confirmación:</strong> página de gracias tras enviar el formulario; ahí se comprueba el evento de conversión.</li>
          </ol>
          <p>
            Antes de publicar, prueba un envío real en móvil y verifica que el aviso llega al
            destinatario correcto. Si necesitas distintas ofertas o zonas, presupuesta las
            variantes como trabajo adicional. El ejemplo es ficticio y no implica una tasa de
            conversión garantizada.
          </p>
          <p>
            Para convertir este alcance en una cifra, consulta el{' '}
            <Link href="/cuanto-cobrar-landing-page-google-ads">ejemplo de precio para Google Ads</Link>.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo afecta al precio de una landing para Google Ads</h2>
          <p>
            El precio sube cuando la landing no solo presenta una oferta, sino que debe soportar
            tráfico de pago, conversiones medibles y decisiones comerciales. Una página sin tracking
            puede parecer más barata, pero deja al cliente sin datos para optimizar.
          </p>
          <div className="feature-grid" aria-label="Factores que cambian el precio">
            <article className="feature-card">
              <h3>Más estrategia</h3>
              <p>
                Revisar intención de búsqueda, oferta, CTA y objeciones requiere trabajo antes de
                diseñar.
              </p>
            </article>

            <article className="feature-card">
              <h3>Más medición</h3>
              <p>
                Conversiones, eventos, formularios, página de gracias y pruebas elevan el alcance.
              </p>
            </article>

            <article className="feature-card">
              <h3>Más variantes</h3>
              <p>
                Si hay campañas por servicio, público o zona, cada variante exige adaptación y QA.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores comunes al presupuestarla</h2>
          <ol className="article-list article-list-ordered">
            <li>Cobrar solo una página cuando en realidad hay estrategia, copy y medición.</li>
            <li>No aclarar si el cliente aporta textos, imágenes y propuesta de valor.</li>
            <li>Prometer conversiones sin controlar tráfico, oferta ni campañas.</li>
            <li>No incluir pruebas del formulario, del evento y de la versión móvil.</li>
            <li>Mezclar landing, campañas y mantenimiento sin separar partidas.</li>
            <li>No dejar margen para ajustes después de ver los primeros datos.</li>
          </ol>
          <p>
            Si el objetivo principal es conseguir contactos, revisa también la guía de{' '}
            <Link href="/landing-page-para-captar-leads">landing page para captar leads</Link>. Para
            delimitar entregables, te ayudará ver{' '}
            <Link href="/que-incluye-una-landing-page">qué incluye una landing page</Link>.
          </p>
          <p>
            Si ya estás en fase de presupuesto, la guía sobre{' '}
            <Link href="/cuanto-cobrar-landing-page-google-ads">
              cuánto cobrar una landing page para Google Ads
            </Link>{' '}
            baja la pieza a horas, medición, revisiones, margen e IVA aparte.
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
