import { NextResponse } from "next/server";

export function middleware(request) {
  // Tambahkan logging detail untuk debugging
  console.log("Raw Pathname:", request.nextUrl.pathname);
  
  const adminToken = request.cookies.get("adminAuthToken")?.value;
  
  // Cek apakah path dimulai dengan /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log("Admin path detected");
    console.log("Admin token exists:", !!adminToken);
    
    // Jika path adalah login dan sudah ada token
    if (request.nextUrl.pathname === '/admin/login' && adminToken) {
      console.log("Redirecting to dashboard from login");
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    
    // Jika bukan path login dan tidak ada token
    if (request.nextUrl.pathname !== '/admin/login' && !adminToken) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Tangkap semua path yang dimulai dengan /admin
    '/admin/:path*'
  ]
};