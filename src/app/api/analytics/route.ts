import { collect } from "@/lib/analytics";
import { sameOrigin } from "@/lib/admin-auth";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  type: z.enum(["pageview", "cta", "contact", "lead"]),
  visitorId: z.string().uuid(),
  path: z.string().max(180).regex(/^\/(?!admin|api)/),
  referrer: z.string().max(600).optional(),
  source: z.string().max(80).optional(),
  medium: z.string().max(80).optional(),
  campaign: z.string().max(80).optional(),
  target: z.string().max(90).optional(),
}).strict();

const rate = new Map<string, { at: number; hits: number }>();

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 2500) return new Response(null, { status: 413 });
  const agent = request.headers.get("user-agent") || "";
  if (/bot|crawl|spider|headless|lighthouse|pagespeed/i.test(agent)) return new Response(null, { status: 204 });
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "";
  const now = Date.now();
  const bucket = rate.get(ip);
  if (bucket && now - bucket.at < 60000) {
    if (++bucket.hits > 100) return new Response(null, { status: 429 });
  } else rate.set(ip, { at: now, hits: 1 });
  if (rate.size > 2000) for (const [key, value] of rate) if (now - value.at > 60000) rate.delete(key);
  try {
    const payload = schema.safeParse(await request.json());
    if (!payload.success) return new Response(null, { status: 400 });
    collect(payload.data, ip, agent);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Analytics:", error instanceof Error ? error.message : "failed");
    return new Response(null, { status: 503 });
  }
}
