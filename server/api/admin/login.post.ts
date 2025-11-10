import { readBody, createError, defineEventHandler } from "h3";
import { startAdminSession } from "~/server/utils/admin";

export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event);
  const cfg = useRuntimeConfig(event);
  if (!password || password !== cfg.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  startAdminSession(event);
  return { ok: true };
});
