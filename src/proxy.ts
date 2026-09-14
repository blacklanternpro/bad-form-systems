import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATH_ALIASES } from "@/content/nav";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const dest = PATH_ALIASES[path];
  if (dest) {
    return NextResponse.redirect(new URL(dest, request.url));
  }
  if (path.startsWith("/lab/")) {
    return NextResponse.redirect(new URL("/coexistence", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/overview",
    "/southwest",
    "/calculator",
    "/fieldtest",
    "/pricing",
    "/ghost-tax",
    "/lab",
    "/lab/:path*",
  ],
};
