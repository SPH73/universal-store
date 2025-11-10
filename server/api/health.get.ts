export default defineEventHandler(async (event) => {
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    region: process.env.VERCEL_REGION || "local",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  };
});
