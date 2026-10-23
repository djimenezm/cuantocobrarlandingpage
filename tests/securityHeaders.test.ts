// @vitest-environment node
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { proxy } from '@/proxy';

const origin = 'https://www.cuantocobrarlandingpage.es';

function pagePolicy(path = '/') {
  const response = proxy(new NextRequest(new URL(path, origin)));
  const policy = response.headers.get('Content-Security-Policy') ?? '';
  const directives = Object.fromEntries(
    policy.split(';').filter((part) => part.trim()).map((part) => {
      const [name, ...sources] = part.trim().split(/\s+/);
      return [name, sources];
    }),
  );
  return { response, policy, directives };
}

describe('external service permissions', () => {
  it.each(['/', '/precio-landing-page-freelance', '/monitor-calculadoras'])(
    'only permits same-origin form submissions on %s',
    (path) => {
      const { policy, directives } = pagePolicy(path);

      expect(directives['form-action']).toEqual(["'self'"]);
      expect(policy).not.toContain('formsubmit.co');
    },
  );

  it('keeps the rendered page and forwarded request on the same nonce policy', () => {
    const { response, policy } = pagePolicy();
    const nonce = response.headers.get('x-middleware-request-x-nonce');

    expect(nonce).toBeTruthy();
    expect(policy).toContain(`'nonce-${nonce}'`);
    expect(response.headers.get('x-middleware-request-content-security-policy')).toBe(policy);
  });

  it('still generates a fresh nonce for every page request', () => {
    expect(pagePolicy().policy).not.toBe(pagePolicy().policy);
  });

  it('preserves the separate ad and analytics permissions', () => {
    const { directives } = pagePolicy();

    expect(directives['connect-src']).toContain('https://*.vercel-insights.com');
    expect(directives['frame-src']).toEqual([
      'https://*.googlesyndication.com',
      'https://*.doubleclick.net',
    ]);
    expect(directives['object-src']).toEqual(["'none'"]);
    expect(directives['frame-ancestors']).toEqual(["'none'"]);
  });
});
