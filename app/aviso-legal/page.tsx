import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: `Condiciones de uso y limitación de responsabilidad de ${siteConfig.name}.`,
};

export default function AvisoLegalPage() {
  return (
    <main className="legal-page container">
      <h1>Aviso legal</h1>
      <div className="legal-card">
        <p>
          Titular del sitio: <strong>{siteConfig.ownerName}</strong>
        </p>
        <p>
          Contacto: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
        <p>Ámbito de actividad: {siteConfig.country}</p>
      </div>

      <section className="legal-section">
        <h2>Objeto del sitio</h2>
        <p>
          Este sitio ofrece una calculadora orientativa para estimar cuánto cobrar por una landing
          page a partir de un objetivo mensual, unos costes fijos, unas horas facturables y varias
          dimensiones del proyecto, como secciones, integraciones, copywriting, revisiones, costes
          directos y margen. La información se facilita con fines informativos y no sustituye el
          asesoramiento profesional fiscal, contable, comercial, contractual o legal.
        </p>
      </section>

      <section className="legal-section">
        <h2>Condiciones de uso</h2>
        <p>
          Al utilizar esta web aceptas hacer un uso adecuado de sus contenidos y no emplearla para
          actividades ilícitas, fraudulentas o que puedan afectar al funcionamiento del servicio.
        </p>
      </section>

      <section className="legal-section">
        <h2>Limitación de responsabilidad</h2>
        <p>
          Los resultados mostrados son estimaciones basadas en la información que introduces y en
          criterios simplificados de cálculo. El titular no garantiza la ausencia de errores o
          desviaciones respecto al tiempo real del proyecto, a su complejidad efectiva o a tus
          condiciones fiscales, técnicas o contractuales concretas, y no asume responsabilidad por
          decisiones tomadas a partir de estas simulaciones.
        </p>
      </section>

      <section className="legal-section">
        <h2>Propiedad intelectual</h2>
        <p>
          Los textos, la estructura de la web y los elementos propios de esta herramienta pertenecen
          a su titular o se usan con autorización. No se permite su reproducción total o parcial con
          fines comerciales sin permiso previo.
        </p>
      </section>
    </main>
  );
}
