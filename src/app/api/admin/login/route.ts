import { NextResponse } from "next/server";
import { ADMIN_COOKIE, clearFailures, createSession, loginAllowed, passwordMatches, registerFailure, sameOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!loginAllowed(ip)) return NextResponse.json({ error: "Muitas tentativas. Tente novamente em 15 minutos." }, { status: 429 });
  const { password } = await request.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || !passwordMatches(password)) {
    registerFailure(ip);
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }
  clearFailures(ip);
  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createSession(), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/admin",
      maxAge: 7 * 86400,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Acesso não configurado no servidor." }, { status: 503 });
  }
}
