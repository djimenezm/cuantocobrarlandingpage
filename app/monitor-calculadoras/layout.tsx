import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import LegalShell from '@/components/LegalShell';
import styles from './monitor.module.css';

const description = 'Información del monitor privado de aprobación de sitios en Google AdSense.';

export const metadata: Metadata = {
  applicationName: 'Monitor Calculadoras',
  category: 'technology',
  keywords: [],
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'Monitor Calculadoras',
    title: 'Monitor Calculadoras',
    description,
    url: '/monitor-calculadoras',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Monitor Calculadoras',
    description,
    images: [],
  },
};

export default function MonitorLayout({ children }: { children: ReactNode }) {
  return (
    <LegalShell>
      <nav className={styles.navigation} aria-label="Información de Monitor Calculadoras">
        <Link href="/monitor-calculadoras">Monitor Calculadoras</Link>
        <Link href="/monitor-calculadoras/privacidad">Privacidad del monitor</Link>
        <Link href="/monitor-calculadoras/condiciones">Condiciones de uso</Link>
      </nav>
      <div className={styles.content}>{children}</div>
      <p className={styles.updated}>
        Última actualización: <time dateTime="2026-10-17">17 de octubre de 2026</time>.
      </p>
    </LegalShell>
  );
}
