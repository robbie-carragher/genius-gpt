
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/chat(.*)',
  '/profile(.*)',
  '/tours(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/image|_next/static|favicon.ico).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
