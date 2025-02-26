import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path is not /login,
  // redirect the user to /login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    return NextResponse.redirect(redirectUrl)
  }

  // If user is signed in and the current path is /login,
  // redirect the user to /dashboard
  if (session && req.nextUrl.pathname === "/login") {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/dashboard"
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}

