// @vitest-environment node
import { GET } from '@/app/recursos/ejemplo-presupuesto-landing-page.txt/route';
import { formatCurrency } from '@/lib/format';
import { landingExampleInputs, landingExampleQuotes } from '@/lib/landingExamples';
import { getLandingProposalText, landingProposal } from '@/lib/landingProposal';

describe('landing proposal resource', () => {
  it('uses the same prices and scope as the visible worked example', () => {
    const text = getLandingProposalText();
    const quote = landingExampleQuotes.capture;

    expect(text).toContain(`Base sin IVA: ${formatCurrency(quote.recommendedLandingPrice)}`);
    expect(text).toContain(`IVA del 21 % en esta simulación: ${formatCurrency(quote.vatAmount)}`);
    expect(text).toContain(`Total con IVA: ${formatCurrency(quote.totalWithVAT)}`);
    expect(text).toContain(`${formatCurrency(landingExampleInputs.capture.directProjectCosts)} de costes directos`);
    for (const item of [...landingProposal.scope, ...landingProposal.exclusions, ...landingProposal.conditions]) {
      expect(text).toContain(item);
    }
    expect(text).toContain('Ejemplo ficticio');
    expect(text).toContain('No se suman otra vez.');
  });

  it('delivers a local UTF-8 download, not an HTML page or an external redirect', async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="ejemplo-presupuesto-landing-page.txt"');
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex');
    expect(response.headers.has('Location')).toBe(false);
    expect(await response.text()).toBe(getLandingProposalText());
  });
});
