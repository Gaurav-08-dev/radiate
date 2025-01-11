// setting the cookie for the cart
import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { WIX_SESSION_COOKIE } from "./lib/constants";

const wixClient = createClient({
  auth: OAuthStrategy({
    clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
  }),
});

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const session = cookies.get(WIX_SESSION_COOKIE);

  let sessionTokens = session
    ? (JSON.parse(session.value) as Tokens)
    : await wixClient.auth.generateVisitorTokens();

  if (sessionTokens.accessToken.expiresAt < Math.floor(Date.now() / 1000)) {
    // refresh the session tokens if they exist
    try {
      sessionTokens = await wixClient.auth.renewToken(
        sessionTokens.refreshToken,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      sessionTokens = await wixClient.auth.generateVisitorTokens();
    }
  }

  req.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens)); // for current request

  const response = NextResponse.next({ request: req });
  response.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 14, // 14 days
    secure: process.env.NODE_ENV === "production",
  }); // for future requests


  return response;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
