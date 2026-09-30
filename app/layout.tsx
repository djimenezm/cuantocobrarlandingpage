import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import AdSenseScript from '@/components/AdSenseScript';
import { fontVariables } from '@/lib/fonts';
import { getSiteUrl, siteConfig } from '@/lib/site';
import './globals.css';

const siteUrl = getSiteUrl();
const homeTitle = 'Cuánto cobrar por una landing page | Calculadora';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: homeTitle,
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
    title: homeTitle,
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
    title: homeTitle,
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
    <html lang="es" data-scroll-behavior="smooth" className={fontVariables}>
      <head />
      <body>
        {children}
        <AdSenseScript nonce={nonce} />
        <Analytics />
      </body>
    </html>
  );
}
