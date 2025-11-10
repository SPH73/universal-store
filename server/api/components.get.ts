import type { H3Event } from "h3";
import type {
  BaserowListResponse,
  BaserowRow,
  PublicComponent,
} from "~/types/baserow";
import { PaginatedQuery } from "~/server/utils/validators";

function mapRow(row: BaserowRow): PublicComponent {
  const photos = Array.isArray(row["Photos"])
    ? row["Photos"].map((f: any) => ({
        url: f.url,
        name: f.visible_name ?? f.name ?? "file",
      }))
    : [];

  return {
    id: row.id as number,
    sku: (row["SKU"] ?? "") as string,
    name: (row["Part Name"] ?? "") as string,
    oemPartNumber: (row["OEM P/N"] ?? "") as string,
    category: (row["Category"] ?? "") as string,
    specs: (row["Specs"] ?? "") as string,
    condition: (row["Condition"] ?? "") as string,
    qty: Number(row["Quantity"] ?? 0),
    targetPrice: Number(row["Target Price"] ?? 0),
    storageLocation: (row["Storage Location"] ?? "") as string,
    photos,
    status: (row["Status"] ?? "") as any,
  };
}

export default defineEventHandler(async (event: H3Event) => {
  const parsed = PaginatedQuery.safeParse(getQuery(event));
  if (!parsed.success) {
    setResponseStatus(event, 400, "Invalid query");
    return { error: "Bad query" };
  }
  const { q, category, page, limit } = parsed.data;

  const config = useRuntimeConfig(event);

  const params = new URLSearchParams({
    user_field_names: "true",
    page: String(page),
    size: String(limit),
  });
  const url = `${config.baserowBaseUrl}/api/database/rows/table/${
    config.baserowTableIdHydraulic
  }/?${params.toString()}`;

  try {
    const res = await $fetch<BaserowListResponse>(url, {
      headers: { Authorization: `Token ${config.baserowTokenHydraulic}` },
    });

    let items = (res?.results ?? res?.rows ?? []).map(mapRow);
    if (q && typeof q === "string") {
      const lx = q.toLowerCase();
      items = items.filter(
        (r) =>
          r.name.toLowerCase().includes(lx) ||
          r.sku.toLowerCase().includes(lx) ||
          r.oemPartNumber.toLowerCase().includes(lx)
      );
    }
    if (category && typeof category === "string") {
      items = items.filter((r) => r.category === category);
    }

    return {
      items,
      meta: {
        count: res?.count ?? items.length,
        page: Number(page),
        limit: Number(limit),
      },
    };
  } catch (err: any) {
    setResponseStatus(event, 502, "Upstream Error");
    return {
      error: "Failed to fetch components from Baserow",
      detail: err?.message ?? String(err),
    };
  }
});
