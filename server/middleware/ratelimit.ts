// Simple in-memory rate limiting store
const ipRequestCounts = new Map<
  string,
  { count: number; windowStart: number }
>();

const WINDOW_SIZE_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;

export default defineEventHandler(async (event) => {
  // Only rate limit API routes
  if (!event.node.req.url?.startsWith("/api/")) {
    return;
  }

  const ip =
    (event.node.req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    event.node.req.socket.remoteAddress ||
    "unknown";
  const now = Date.now();

  // Get or create tracking for this IP
  let ipData = ipRequestCounts.get(ip);

  // Reset window if expired
  if (!ipData || now - ipData.windowStart >= WINDOW_SIZE_MS) {
    ipData = { count: 0, windowStart: now };
    ipRequestCounts.set(ip, ipData);
  }

  // Increment count
  ipData.count++;

  // Add rate limit headers
  setHeader(event, "X-RateLimit-Limit", MAX_REQUESTS_PER_WINDOW.toString());
  setHeader(
    event,
    "X-RateLimit-Remaining",
    Math.max(0, MAX_REQUESTS_PER_WINDOW - ipData.count).toString()
  );
  setHeader(
    event,
    "X-RateLimit-Reset",
    Math.ceil((ipData.windowStart + WINDOW_SIZE_MS) / 1000).toString()
  );

  // Check if rate limit exceeded
  if (ipData.count > MAX_REQUESTS_PER_WINDOW) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
      data: {
        error: "Rate limit exceeded",
        retryAfter: Math.ceil(
          (ipData.windowStart + WINDOW_SIZE_MS - now) / 1000
        ),
      },
    });
  }

  // Cleanup old entries periodically (every 100 requests)
  if (ipRequestCounts.size > 100 && Math.random() < 0.01) {
    for (const [key, data] of ipRequestCounts.entries()) {
      if (now - data.windowStart >= WINDOW_SIZE_MS) {
        ipRequestCounts.delete(key);
      }
    }
  }
});
