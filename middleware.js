import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Authorization Header:", req.headers.get("authorization"));

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    console.log("Decoded User:", user);
    console.log("Decoded Password:", pwd);

    if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASS) {
      return NextResponse.next(); // Allow the request to continue
    }
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
