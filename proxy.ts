import { NextRequest, NextResponse } from 'next/server';

const strictTransportSecurity = 'max-age=63072000; includeSubDomains; preload';
const crossOriginOpenerPolicy = 'same-origin';
const xFrameOptions = 'DENY';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';
  const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://formsubmit.co;
    frame-ancestors 'none';
    trusted-types default nextjs nextjs#bundler;
    require-trusted-types-for 'script';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('Strict-Transport-Security', strictTransportSecurity);
  response.headers.set('Cross-Origin-Opener-Policy', crossOriginOpenerPolicy);
  response.headers.set('X-Frame-Options', xFrameOptions);
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
