import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATH_ALIASES } from "@/content/nav";

export function proxy(request: NextRequest) {
  const dest = PATH_ALIASES[request.nextUrl.pathname];
  if (dest) {
    return NextResponse.redirect(new URL(dest, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/overview", "/southwest", "/calculator", "/fieldtest"],
};
