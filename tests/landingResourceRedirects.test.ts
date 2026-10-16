import { redirect } from 'next/navigation';
import ProposalRedirect from '@/app/salida/kit-presupuesto/page';
import DownloadRedirect from '@/app/salida/kit-presupuesto-texto/page';
import { landingProposalDownload } from '@/lib/landingProposal';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(() => { throw new Error('NEXT_REDIRECT'); }),
}));

describe('legacy resource links', () => {
  beforeEach(() => {
    vi.mocked(redirect).mockClear();
  });

  it('redirects old kit links to the local proposal without client JavaScript', () => {
    expect(ProposalRedirect).toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/ejemplo-presupuesto-landing-page#modelo-presupuesto');
  });

  it('redirects old text links to the matching local download', () => {
    expect(DownloadRedirect).toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith(landingProposalDownload);
  });
});
