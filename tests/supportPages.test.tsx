import { render, screen, within } from '@testing-library/react';
import SupportLayout, { metadata as layoutMetadata } from '@/app/soporte-calculadoras/layout';
import SupportPage, { metadata as homeMetadata } from '@/app/soporte-calculadoras/page';
import SupportPrivacyPage, { metadata as privacyMetadata } from '@/app/soporte-calculadoras/privacidad/page';
import SupportTermsPage, { metadata as termsMetadata } from '@/app/soporte-calculadoras/condiciones/page';
import sitemap from '@/app/sitemap';
import { siteConfig } from '@/lib/site';

describe('Soporte Calculadoras information pages', () => {
  it('discloses read-only mailbox-wide permission and limited implementation without connecting accounts', () => {
    const { container } = render(<SupportPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Soporte Calculadoras' })).toBeVisible();
    expect(screen.getByText('https://www.googleapis.com/auth/gmail.readonly')).toBeVisible();
    expect(container).toHaveTextContent('lectura del buzón completo');
    expect(container).toHaveTextContent('No descarga cuerpos');
    expect(container).toHaveTextContent('No envía ni borra correos desde Gmail');
    expect(screen.getByRole('link', { name: 'política de privacidad del seguimiento' }))
      .toHaveAttribute('href', '/soporte-calculadoras/privacidad');
    expect(screen.getByRole('link', { name: 'condiciones de uso' }))
      .toHaveAttribute('href', '/soporte-calculadoras/condiciones');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelector('form, input, iframe')).toBeNull();
  });

  it('explains independent secrets, metadata, durable state and limited email notices', () => {
    const { container } = render(<SupportPrivacyPage />);

    expect(screen.getByText(siteConfig.ownerName)).toBeVisible();
    expect(container).toHaveTextContent('token de renovación');
    expect(container).toHaveTextContent('secretos independientes');
    expect(container).toHaveTextContent('huellas SHA-256');
    expect(container).toHaveTextContent('no caducan a los siete días');
    expect(container).toHaveTextContent('Brevo recibe');
    expect(container).toHaveTextContent('el asunto de la respuesta');
    expect(container).toHaveTextContent('No recibe cuerpos, adjuntos ni credenciales de Google');
    expect(container).toHaveTextContent('spam y papelera');
    expect(container).toHaveTextContent('no utiliza modelos de IA');
    expect(screen.getByRole('link', { name: 'conexiones de su Cuenta de Google' }))
      .toHaveAttribute('href', 'https://myaccount.google.com/connections');
    expect(screen.getByRole('link', { name: /Política de Datos del Usuario/ }))
      .toHaveAttribute('href', 'https://developers.google.com/terms/api-services-user-data-policy');
  });

  it('does not expose the private mailbox, credentials or support conversation identifiers', () => {
    const { container } = render(<><SupportPage /><SupportPrivacyPage /><SupportTermsPage /></>);

    expect(container.innerHTML).not.toMatch(/diegothosi@gmail\.com|5634824|1a16aa44d6d0a618|ringed-land-512522-n2/);
    expect(container.querySelector('script, form, input, iframe')).toBeNull();
  });

  it('does not present new mail as a completed security patch or guarantee availability', () => {
    const { container } = render(<SupportTermsPage />);

    expect(container).toHaveTextContent('no que un parche esté desplegado');
    expect(container).toHaveTextContent('Puede tratarse de un acuse automático');
    expect(container).toHaveTextContent('No se envían resúmenes periódicos');
    expect(container).toHaveTextContent('puede quedar fuera de la búsqueda');
    expect(container).toHaveTextContent('aunque el ordenador personal esté apagado');
  });

  it('provides three accessible policy links, one main region and the update date', () => {
    render(<SupportLayout><SupportPage /></SupportLayout>);

    const navigation = screen.getByRole('navigation', { name: 'Información de Soporte Calculadoras' });
    expect(within(navigation).getAllByRole('link')).toHaveLength(3);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText('24 de octubre de 2026')).toHaveAttribute('dateTime', '2026-10-24');
  });

  it('keeps dedicated canonicals and stays out of the calculator search sitemap', () => {
    expect(layoutMetadata.robots).toEqual({
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    });
    expect(layoutMetadata.applicationName).toBe('Soporte Calculadoras');
    expect(homeMetadata.alternates?.canonical).toBe('/soporte-calculadoras');
    expect(privacyMetadata.alternates?.canonical).toBe('/soporte-calculadoras/privacidad');
    expect(termsMetadata.alternates?.canonical).toBe('/soporte-calculadoras/condiciones');
    expect(sitemap().some((entry) => entry.url.includes('/soporte-calculadoras'))).toBe(false);
  });
});
