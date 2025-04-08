import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { WIX_SESSION_COOKIE } from "./lib/constants";

const wixClient = createClient({
  auth: OAuthStrategy({ clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID }),
});


export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const sessionCookie = cookies.get(WIX_SESSION_COOKIE);

  let sessionTokens = sessionCookie
    ? (JSON.parse(sessionCookie.value) as Tokens)
    : await wixClient.auth.generateVisitorTokens();

  if (sessionTokens?.accessToken?.expiresAt < Math.floor(Date.now() / 1000)) {
    try {
      sessionTokens = await wixClient.auth.renewToken(
        sessionTokens.refreshToken,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      sessionTokens = await wixClient.auth.generateVisitorTokens();
    }
  }

  
  // Check if user is logged in and trying to access signin or signup pages
  const url = request.nextUrl.clone();
  const isLoggedIn = sessionTokens.refreshToken && sessionTokens?.refreshToken?.role === "member";
  const isAuthPage = url.pathname === '/signin' || url.pathname === '/signup';

  if (isLoggedIn && isAuthPage) {
    // Redirect to home page if logged in user tries to access auth pages
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  request.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens));

  const res = NextResponse.next({ request });

  res.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
