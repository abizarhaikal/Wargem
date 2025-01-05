import { NextResponse } from "next/server";

export function middleware(request) {
  const adminToken = request.cookies.get("adminAuthToken")?.value;
  const userToken = request.cookies.get("userAuthToken")?.value;
  console.log("Requested Path:", request.nextUrl.pathname); // Log path yang diminta
  const protectedPaths = [
    "/admin/Dashboard",
    "/admin/HalamanProduk",
    "/admin/logout",
    "/admin/orders",
    "/admin/Pemasukan",
    "/admin/Pengaturan",
    "/menu",
    "/menu/makanan"
  ];

  // Perbaikan di sini: pathname bukan pathName
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !adminToken) {
    // Tambahkan new URL untuk redirect yang benar
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Perbaikan pathname
  if (request.nextUrl.pathname === "/admin/login" && adminToken) {
    return NextResponse.redirect(new URL("/admin/Dashboard", request.url));
  }

  if (request.nextUrl.pathname === "/menu" && userToken) {
    return NextResponse.redirect(new URL("/loginsignup/login", request.url));
  }

  if (isProtectedPath && !userToken) {
    // Tambahkan new URL untuk redirect yang benar
    return NextResponse.redirect(new URL("/loginsignup/login", request.url));
  }

  // Perbaikan pathname
  if (request.nextUrl.pathname === "/loginsignup/login" && userToken) {
    return NextResponse.redirect(new URL("/menu", request.url));
  }

  return NextResponse.next();
}

// Tambahkan config untuk matcher
export const config = {
  matcher: [
    "/admin/:path*", // Ini akan menangkap semua path yang dimulai dengan /admin/
    "/menu",
    "/menu/:path*", 
  ],
};
