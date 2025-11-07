import { NextRequest, NextResponse } from 'next/server';

export const config = {
  // Match all routes except for static files and API routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|static/).*)',
  ],
};

export default function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;
  
  // Extract subdomain
  const hostParts = hostname.split('.');
  
  // Local development handling
  if (hostname.includes('localhost')) {
    const subdomain = hostParts[0].split(':')[0];
    
    // Add tenant info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant-subdomain', subdomain);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // Production subdomain routing
  if (hostParts.length >= 3) {
    const subdomain = hostParts[0];
    
    // Reserved subdomains
    const reserved = ['www', 'api', 'admin', 'app'];
    if (reserved.includes(subdomain)) {
      return NextResponse.next();
    }
    
    // Add tenant subdomain to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant-subdomain', subdomain);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}
