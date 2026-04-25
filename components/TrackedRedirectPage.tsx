'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type TrackedRedirectPageProps = {
  destination: string;
  title: string;
  description: string;
  buttonLabel: string;
};

export default function TrackedRedirectPage({
  destination,
  title,
  description,
  buttonLabel,
}: TrackedRedirectPageProps) {
  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.assign(destination);
    }, 250);

    return () => window.clearTimeout(redirectTimer);
  }, [destination]);

  return (
    <main>
      <Header />
      <section className="section redirect-page">
        <div className="container">
          <div className="redirect-card">
            <span className="eyebrow">Salida medida</span>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className="redirect-note">
              Te redirijo automaticamente en un instante. Si no ocurre, usa el enlace manual.
            </p>
            <a href={destination} className="primary-button">
              {buttonLabel}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
