import { defineEventHandler } from "h3";
import { isAdmin } from "~/server/utils/admin";

export default defineEventHandler(async (event) => {
  return { isAdmin: isAdmin(event) };
});
