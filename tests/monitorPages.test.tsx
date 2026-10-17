import { render, screen, within } from '@testing-library/react';
import MonitorLayout, { metadata as layoutMetadata } from '@/app/monitor-calculadoras/layout';
import MonitorPage, { metadata as homeMetadata } from '@/app/monitor-calculadoras/page';
import MonitorPrivacyPage, { metadata as privacyMetadata } from '@/app/monitor-calculadoras/privacidad/page';
import MonitorTermsPage, { metadata as termsMetadata } from '@/app/monitor-calculadoras/condiciones/page';
import sitemap from '@/app/sitemap';
import { siteConfig } from '@/lib/site';

describe('Monitor Calculadoras information pages', () => {
  it('links the monitor homepage to its own policies without offering an account connection', () => {
    render(<MonitorPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Monitor Calculadoras' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'política de privacidad del monitor' }))
      .toHaveAttribute('href', '/monitor-calculadoras/privacidad');
    expect(screen.getByRole('link', { name: 'condiciones de uso' }))
      .toHaveAttribute('href', '/monitor-calculadoras/condiciones');
    expect(screen.getByText('https://www.googleapis.com/auth/adsense.readonly')).toBeVisible();
    expect(screen.getByText('https://www.googleapis.com/auth/webmasters.readonly')).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(document.querySelector('form, input, iframe')).toBeNull();
  });

  it('discloses the actual owner, storage, retention and revocation route', () => {
    const { container } = render(<MonitorPrivacyPage />);

    expect(screen.getByText(siteConfig.ownerName)).toBeVisible();
    expect(container).toHaveTextContent('repositorio privado');
    expect(container).toHaveTextContent('siete días');
    expect(container).toHaveTextContent('Codex');
    expect(container).toHaveTextContent('token de renovación separado para cada servicio');
    expect(container).toHaveTextContent('última fecha de rastreo');
    expect(container).toHaveTextContent('No se consultan informes de búsquedas, tráfico ni datos de visitantes');
    expect(screen.getByRole('link', { name: 'conexiones de tu Cuenta de Google' }))
      .toHaveAttribute('href', 'https://myaccount.google.com/connections');
    expect(screen.getByRole('link', { name: /Política de Datos del Usuario/ }))
      .toHaveAttribute('href', 'https://developers.google.com/terms/api-services-user-data-policy');
  });

  it('does not promise Google approval or treat failed checks as valid observations', () => {
    const { container } = render(<MonitorTermsPage />);

    expect(container).toHaveTextContent('ejecución fallida no acreditan');
    expect(container).toHaveTextContent('no acelera el proceso ni garantiza');
    expect(container).toHaveTextContent('Que una URL pueda indexarse no demuestra que ya esté indexada');
    expect(container).toHaveTextContent('retirar el acceso a Google');
  });

  it('keeps shared navigation accessible and provides one main region', () => {
    render(<MonitorLayout><MonitorPage /></MonitorLayout>);

    const navigation = screen.getByRole('navigation', { name: 'Información de Monitor Calculadoras' });
    expect(within(navigation).getAllByRole('link')).toHaveLength(3);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText('17 de octubre de 2026')).toHaveAttribute('dateTime', '2026-10-17');
  });

  it('uses dedicated canonicals and stays out of the commercial search sitemap', () => {
    expect(layoutMetadata.robots).toEqual({
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    });
    expect(layoutMetadata.applicationName).toBe('Monitor Calculadoras');
    expect(homeMetadata.alternates?.canonical).toBe('/monitor-calculadoras');
    expect(privacyMetadata.alternates?.canonical).toBe('/monitor-calculadoras/privacidad');
    expect(termsMetadata.alternates?.canonical).toBe('/monitor-calculadoras/condiciones');
    expect(sitemap().some((entry) => entry.url.includes('/monitor-calculadoras'))).toBe(false);
  });
});
