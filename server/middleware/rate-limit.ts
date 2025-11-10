const buckets = new Map<string, { tokens: number; ts: number }>();

function take(ip: string, rate = 10, perMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(ip) ?? { tokens: rate, ts: now };
  const elapsed = now - b.ts;
  b.tokens = Math.min(rate, b.tokens + (elapsed / perMs) * rate);
  b.ts = now;
  if (b.tokens < 1) {
    buckets.set(ip, b);
    return false;
  }
  b.tokens -= 1;
  buckets.set(ip, b);
  return true;
}

export default defineEventHandler((event) => {
  const url = event.path;
  if (
    url.startsWith("/api/admin/login") ||
    (url.startsWith("/api/bargains") && event.method === "POST") ||
    (url.startsWith("/api/components") && event.method === "POST") ||
    (url.startsWith("/api/perfumes") && event.method === "POST")
  ) {
    const ip =
      getRequestHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ||
      event.node.req.socket.remoteAddress ||
      "local";
    if (!take(ip, 10, 60_000)) {
      setResponseStatus(event, 429, "Too Many Requests");
      return { error: "Rate limited" };
    }
  }
});
