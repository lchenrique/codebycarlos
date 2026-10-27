import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sameOrigin, validSession } from "@/lib/admin-auth";
import { siteSettingsSchema } from "@/lib/public-site-settings";
import { updatePublicSiteSettings } from "@/lib/site-settings-db";

export const runtime = "nodejs";

export async function PUT(request: Request) {
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!validSession(cookie)) return NextResponse.json({ error: "Entre no painel antes de salvar." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 6000) return NextResponse.json({ error: "Dados excedem o limite." }, { status: 413 });
  try {
    const parsed = siteSettingsSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Confira os campos antes de salvar.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    const saved = updatePublicSiteSettings(parsed.data);
    return NextResponse.json({ ok: true, settings: saved }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Não foi possível gravar no SQLite. Tente novamente." }, { status: 503 });
  }
}
