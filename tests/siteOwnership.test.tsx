import type { ComponentProps } from 'react';
import { render, screen, within } from '@testing-library/react';
import LegalNotice from '@/app/aviso-legal/page';
import PrivacyNotice from '@/app/privacidad/page';
import PriceGuide from '@/app/precio-landing-page-freelance/page';
import ProposalGuide from '@/app/ejemplo-presupuesto-landing-page/page';
import ScopeGuide from '@/app/que-incluye-una-landing-page/page';
import ComparisonGuide from '@/app/landing-page-vs-pagina-web/page';
import { siteConfig } from '@/lib/site';

vi.mock('next/script', () => ({
  default: (props: ComponentProps<'script'>) => <script {...props} />,
}));

describe('public site ownership', () => {
  it('identifies the confirmed owner in the legal notice and footer', () => {
    render(<LegalNotice />);

    expect(siteConfig.ownerName).toBe('Diego Antonio Jiménez Moreno');
    expect(within(screen.getByRole('main')).getByText(siteConfig.ownerName)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent(`Titular: ${siteConfig.ownerName}`);
    expect(screen.queryByText(/Equipo de Cuánto Cobrar Landing Page/)).not.toBeInTheDocument();
  });

  it('identifies the same responsible person in the privacy notice', () => {
    render(<PrivacyNotice />);

    expect(within(screen.getByRole('main')).getByText(siteConfig.ownerName)).toBeInTheDocument();
  });

  it.each([
    [PriceGuide, 'precio-landing-article-schema'],
    [ProposalGuide, 'ejemplo-presupuesto-landing-article-schema'],
    [ScopeGuide, 'que-incluye-landing-article-schema'],
    [ComparisonGuide, 'landing-vs-web-article-schema'],
  ] as const)('keeps editorial brand attribution separate from ownership (%s)', (Page, schemaId) => {
    const { container } = render(<Page />);
    const schema = JSON.parse(container.querySelector(`script[id="${schemaId}"]`)!.textContent!);

    expect(schema.author).toEqual({ '@type': 'Organization', name: siteConfig.name });
    expect(schema.author.name).not.toBe(siteConfig.ownerName);
  });
});
