import { readBody, createError, defineEventHandler } from "h3";
import { isAdmin } from "~/server/utils/admin";
import { HydraulicsCreate } from "~/server/utils/validators";

export default defineEventHandler(async (event) => {
  if (!isAdmin(event))
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const parsed = HydraulicsCreate.safeParse(await readBody(event));
  if (!parsed.success)
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
  const b = parsed.data;

  const cfg = useRuntimeConfig(event);
  const row = {
    SKU: b.sku,
    "Part Name": b.name,
    "OEM P/N": b.oemPartNumber,
    Category: b.category,
    Specs: b.specs,
    Condition: b.condition,
    Quantity: b.qty,
    "Target Price": b.targetPrice,
    "Storage Location": b.storageLocation,
    Supplier: b.supplier,
    "Purchase Date": b.purchaseDate,
    Status: b.status,
  };
  const url = `${cfg.baserowBaseUrl}/api/database/rows/table/${cfg.baserowTableIdHydraulic}/?user_field_names=true`;
  const res = await $fetch(url, {
    method: "POST",
    headers: { Authorization: `Token ${cfg.baserowTokenHydraulic}` },
    body: row,
  });
  return { ok: true, res };
});
