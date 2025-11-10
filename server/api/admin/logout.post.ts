import { defineEventHandler } from "h3";
import { endAdminSession } from "~/server/utils/admin";

export default defineEventHandler(async (event) => {
  endAdminSession(event);
  return { ok: true };
});
