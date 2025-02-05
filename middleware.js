import { NextResponse } from "next/server";

export function middleware(request) {
  // Tambahkan logging detail untuk debugging
  console.log("Raw Pathname:", request.nextUrl.pathname);
  
  const adminToken = request.cookies.get("adminAuthToken")?.value;
  const userToken = request.cookies.get("userAuthToken")?.value;

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

  if (request.nextUrl.pathname.startsWith('/menu')){
    console.log('Path menu');

    if (request.nextUrl.pathname === '/loginsignup/login' || userToken) {
      console.log("Redirecting to menu page from login");
      return NextResponse.redirect(new URL('/menu', request.url));
    }

    if (request.nextUrl.pathname !== '/loginsignup/login' && !userToken) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL('/loginsignup/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Tangkap semua path yang dimulai dengan /admin
    '/admin/:path*',
    '/menu',
    '/menu/:path*',
  ]
};