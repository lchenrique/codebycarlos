import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sameOrigin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/admin", maxAge: 0 });
  return response;
}
