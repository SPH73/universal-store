import { readBody, createError, defineEventHandler } from "h3";
import { isAdmin } from "~/server/utils/admin";
import { BargainCreate } from "~/server/utils/validators";

export default defineEventHandler(async (event) => {
  if (!isAdmin(event))
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const parsed = BargainCreate.safeParse(await readBody(event));
  if (!parsed.success)
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
  const b = parsed.data;

  const cfg = useRuntimeConfig(event);
  const row = {
    SKU: b.sku,
    "Product Name": b.name,
    Category: b.category,
    Description: b.description,
    "Original Price": b.originalPrice,
    "Bargain Price": b.bargainPrice,
    Quantity: b.qty,
    Status: b.status,
    "Starts On": b.startsOn,
    "Ends On": b.endsOn,
    Badges: b.badges,
  };
  const url = `${cfg.baserowBaseUrl}/api/database/rows/table/${cfg.baserowTableIdBargain}/?user_field_names=true`;
  try {
    const res = await $fetch(url, {
      method: "POST",
      headers: { Authorization: `Token ${cfg.baserowTokenBargain}` },
      body: row,
    });
    return { ok: true, res };
  } catch (e: any) {
    throw createError({
      statusCode: 502,
      statusMessage: "Baserow upstream error",
      data: e?.data ?? e?.message,
    });
  }
});
