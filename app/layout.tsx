import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { getSiteUrl, siteConfig } from '@/lib/site';
import './globals.css';

const siteUrl = getSiteUrl();
const trustedTypesPolicyScript = `
(() => {
  if (!window.trustedTypes) return;

  const blockedHtmlPattern = /<script\\b|<iframe\\b|<object\\b|<embed\\b|\\son\\w+\\s*=|javascript:/i;

  try {
    window.trustedTypes.createPolicy('default', {
      createHTML(value) {
        const html = String(value);

        if (blockedHtmlPattern.test(html)) {
          throw new TypeError('Blocked unsafe HTML by Trusted Types policy');
        }

        return html;
      },
      createScriptURL(value) {
        const url = new URL(String(value), window.location.origin);

        if (
          url.origin === window.location.origin ||
          url.origin === 'https://va.vercel-scripts.com'
        ) {
          return url.href;
        }

        throw new TypeError('Blocked unsafe script URL by Trusted Types policy');
      },
      createScript(value) {
        const script = String(value).trim();

        if (script.startsWith('{') || script.startsWith('[')) {
          const data = JSON.parse(script);
          const items = Array.isArray(data) ? data : [data];
          const isSchemaOrgJson = items.every((item) => (
            item &&
            typeof item === 'object' &&
            item['@context'] === 'https://schema.org'
          ));

          if (isSchemaOrgJson) {
            return script;
          }
        }

        throw new TypeError('Inline scripts must use a nonce');
      },
    });
  } catch (error) {
    if (!String(error).includes('already exists')) throw error;
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: 'finance',
  keywords: [...siteConfig.keywords],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: '/',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: trustedTypesPolicyScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
