import { NextResponse, type NextRequest } from 'next/server';

const CAPSTONE_SESSION_TOKEN = process.env.CAPSTONE_SESSION_TOKEN || 'capstone-session-token';

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const userToken = !!request.cookies.get(CAPSTONE_SESSION_TOKEN);
//   const currentPathname = request.nextUrl.pathname;
//   if (!userToken && currentPathname !== '/login') {
//     return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
//   }
//   if (userToken && currentPathname === '/login') {
//     return NextResponse.redirect(new URL('/home', request.nextUrl.origin));
//   }
//   return NextResponse.next();
// }

export function middleware(request: NextRequest) {
  const userToken = !!request.cookies.get(CAPSTONE_SESSION_TOKEN);
  const currentPathname = request.nextUrl.pathname;

  // Check userToken and currentPathname for redirection
  if (!userToken && currentPathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }
  if (userToken && currentPathname === '/login') {
    return NextResponse.redirect(new URL('/home', request.nextUrl.origin));
  }

  // Generate nonce and create CSP header
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  // Set nonce in request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  // Set CSP header in response headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/home', '/create', '/edit/:path*', '/detail/:path*'],
};
