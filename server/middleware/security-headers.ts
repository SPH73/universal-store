export default defineEventHandler((event) => {
  const h = event.node.res.setHeader.bind(event.node.res);
  h("X-Frame-Options", "SAMEORIGIN");
  h("X-Content-Type-Options", "nosniff");
  h("Referrer-Policy", "no-referrer-when-downgrade");
  h("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  h(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'"
  );
});
