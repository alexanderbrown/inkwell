import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

console.log('Middleware loaded');

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  console.log('User Agent:', request.headers.get('user-agent'));

  // Check if the device is a mobile
  if (device.type === 'mobile') {
    // Redirect to the custom mobile-not-supported page
    const mobileRedirectUrl = new URL('/mobile-not-supported', request.url);
    return NextResponse.rewrite(mobileRedirectUrl);
  }

  // Allow the request to proceed for non-mobile devices
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
   matcher: ["/studies", "/study/:path*", "/study"],
};