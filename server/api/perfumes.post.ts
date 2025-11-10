import { readBody, createError, defineEventHandler } from "h3";
import { isAdmin } from "~/server/utils/admin";
import { PerfumeCreate } from "~/server/utils/validators";

export default defineEventHandler(async (event) => {
  if (!isAdmin(event))
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const parsed = PerfumeCreate.safeParse(await readBody(event));
  if (!parsed.success)
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
  const b = parsed.data;

  const cfg = useRuntimeConfig(event);
  const row = {
    SKU: b.sku,
    "Product Name": b.name,
    Brand: b.brand,
    Category: b.category,
    "Fragrance Notes": b.notes,
    "Volume (ml)": b.volume,
    Condition: b.condition,
    Quantity: b.qty,
    "Selling Price": b.sellingPrice,
    Supplier: b.supplier,
    "Arrival Date": b.arrivalDate,
    Status: b.status,
  };
  const url = `${cfg.baserowBaseUrl}/api/database/rows/table/${cfg.baserowTableIdPerf}/?user_field_names=true`;
  const res = await $fetch(url, {
    method: "POST",
    headers: { Authorization: `Token ${cfg.baserowTokenPerf}` },
    body: row,
  });
  return { ok: true, res };
});
