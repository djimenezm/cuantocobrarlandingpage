// @vitest-environment node
import { GET, dynamic } from '@/app/ads.txt/route';
import { getAdsTxtRecord } from '@/lib/ads';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';
import { config } from '@/proxy';
import nextConfig from '@/next.config';

vi.mock('@/lib/ads', () => ({
  getAdsTxtRecord: vi.fn(),
}));

describe('crawler delivery', () => {
  beforeEach(() => {
    vi.mocked(getAdsTxtRecord).mockReset();
  });

  it('prerenders ads.txt with the configured seller record and public caching', async () => {
    const record = 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n';
    vi.mocked(getAdsTxtRecord).mockReturnValue(record);
    const response = GET();

    expect(dynamic).toBe('force-static');
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=3600');
    expect(await response.text()).toBe(record);
  });

  it('does not publish a seller record when the publisher is unconfigured', async () => {
    vi.mocked(getAdsTxtRecord).mockReturnValue('');
    const response = GET();

    expect(response.status).toBe(404);
    expect(await response.text()).toBe('');
  });

  it('keeps server rendering close to Spanish visitors', () => {
    const deploymentConfig = JSON.parse(
      readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'),
    );
    expect(deploymentConfig.regions).toEqual(['cdg1']);
  });

  it.each([
    '/ads.txt',
    '/ads.txt?check=1',
    '/robots.txt',
    '/sitemap.xml',
    '/favicon.svg',
    '/favicon.ico',
    '/manifest.webmanifest',
    '/opengraph-image',
    '/_next/static/chunks/app.js',
    '/_next/image?url=hero.png',
  ])('serves %s without generating an HTML nonce', (url) => {
    expect(unstable_doesMiddlewareMatch({ config, nextConfig, url })).toBe(false);
  });

  it.each(['/', '/privacidad', '/ads.txt-guide', '/guide/ads.txt'])(
    'keeps the HTML security policy on %s',
    (url) => {
      expect(unstable_doesMiddlewareMatch({ config, nextConfig, url })).toBe(true);
    },
  );
});
