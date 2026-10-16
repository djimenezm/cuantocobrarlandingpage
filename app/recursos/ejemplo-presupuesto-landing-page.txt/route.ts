import { getLandingProposalText } from '@/lib/landingProposal';

export const dynamic = 'force-static';

export function GET() {
  return new Response(getLandingProposalText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ejemplo-presupuesto-landing-page.txt"',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
}
