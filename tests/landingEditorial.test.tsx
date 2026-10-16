import { render, screen } from '@testing-library/react';
import PriceGuide from '@/app/precio-landing-page-freelance/page';
import ProposalGuide from '@/app/ejemplo-presupuesto-landing-page/page';
import { calculateLandingPageQuote, LANDING_ESTIMATION } from '@/lib/calculator';
import { landingExampleInputs, landingExampleQuotes } from '@/lib/landingExamples';
import { getLandingProposalText, landingProposalDownload } from '@/lib/landingProposal';

describe('verifiable landing guidance', () => {
  it('documents the actual model and its limitations in server-renderable content', () => {
    render(<PriceGuide />);

    const method = screen.getByRole('region', { name: 'De dónde sale cada cifra' });
    expect(method).toHaveTextContent('no una encuesta de precios');
    expect(method).toHaveTextContent('Recargo no es margen sobre ventas.');
    expect(method).toHaveTextContent(/no garantiza rentabilidad ni conversiones/i);
    expect(method).toHaveTextContent('1,25 h por integración');
    expect(method).toHaveTextContent('0,75 h por sección');
    expect(method).toHaveAttribute('id', 'metodo');
    expect(screen.getByRole('link', { name: /ver cómo se presenta este cálculo/i }))
      .toHaveAttribute('href', '/ejemplo-presupuesto-landing-page#modelo-presupuesto');
  });

  it('shows exactly the proposal available in the local download', () => {
    const { container } = render(<ProposalGuide />);

    expect(container.querySelector('.proposal-preview')?.textContent).toBe(getLandingProposalText());
    for (const link of screen.getAllByRole('link', { name: 'Descargar este ejemplo en texto' })) {
      expect(link).toHaveAttribute('href', landingProposalDownload);
      expect(link).toHaveAttribute('download');
    }
    expect(container.querySelector('a[href^="/salida/"]')).toBeNull();
  });

  it('preserves the base estimate and closes the visible monetary amounts', () => {
    const quote = landingExampleQuotes.capture;

    expect(LANDING_ESTIMATION).toEqual({
      discoveryHours: 2,
      hoursPerSection: 1.4,
      hoursPerIntegration: 1.25,
      minimumCopyHours: 1.5,
      copyHoursPerSection: 0.75,
      hoursPerRevision: 1,
      qaLaunchHours: 2.5,
    });
    expect(quote).toMatchObject({
      estimatedProjectHours: 21.9,
      bufferedProjectHours: 25.18,
      minimumLandingPrice: 947.22,
      recommendedLandingPrice: 1041.94,
      vatAmount: 218.81,
      totalWithVAT: 1260.75,
    });
    const withoutVat = calculateLandingPageQuote({ ...landingExampleInputs.capture, hasIVA: false });
    expect(withoutVat.vatAmount).toBe(0);
    expect(withoutVat.totalWithVAT).toBe(withoutVat.recommendedLandingPrice);
  });
});
