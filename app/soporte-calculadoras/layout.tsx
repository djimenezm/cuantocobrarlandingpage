import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import LegalShell from '@/components/LegalShell';
import styles from './support.module.css';

const description = 'Información del seguimiento privado de respuestas de soporte de Brevo, Backblaze y UptimeRobot.';

export const metadata: Metadata = {
  applicationName: 'Soporte Calculadoras',
  category: 'technology',
  keywords: [],
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'Soporte Calculadoras',
    title: 'Soporte Calculadoras',
    description,
    url: '/soporte-calculadoras',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Soporte Calculadoras',
    description,
    images: [],
  },
};

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <LegalShell>
      <nav className={styles.navigation} aria-label="Información de Soporte Calculadoras">
        <Link href="/soporte-calculadoras">Soporte Calculadoras</Link>
        <Link href="/soporte-calculadoras/privacidad">Privacidad del seguimiento</Link>
        <Link href="/soporte-calculadoras/condiciones">Condiciones de uso</Link>
      </nav>
      <div className={styles.content}>{children}</div>
      <p className={styles.updated}>
        Última actualización: <time dateTime="2026-10-24">24 de octubre de 2026</time>.
      </p>
    </LegalShell>
  );
}
