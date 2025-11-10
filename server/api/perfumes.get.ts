import type { H3Event } from "h3";
import { PaginatedQuery } from "~/server/utils/validators";

type BaserowRow = Record<string, unknown> & { id: number };
interface BaserowListResponse {
  count?: number;
  results?: BaserowRow[];
  rows?: BaserowRow[];
}

function mapPerfumeRow(row: BaserowRow) {
  const photos = Array.isArray(row["Photos"])
    ? row["Photos"].map((f: any) => ({
        url: f.url,
        name: f.visible_name ?? f.name ?? "file",
      }))
    : [];

  return {
    id: row.id as number,
    sku: (row["SKU"] ?? "") as string,
    name: (row["Product Name"] ?? "") as string,
    brand: (row["Brand"] ?? "") as string,
    category: (row["Category"] ?? "") as string,
    notes: (row["Fragrance Notes"] ?? "") as string,
    volume: Number(row["Volume (ml)"] ?? 0),
    condition: (row["Condition"] ?? "") as string,
    qty: Number(row["Quantity"] ?? 0),
    sellingPrice: Number(row["Selling Price"] ?? 0),
    supplier: (row["Supplier"] ?? "") as string,
    arrivalDate: (row["Arrival Date"] ?? "") as string,
    status: (row["Status"] ?? "") as string,
    photos,
  };
}

export default defineEventHandler(async (event: H3Event) => {
  const parsed = PaginatedQuery.safeParse(getQuery(event));
  if (!parsed.success) {
    setResponseStatus(event, 400, "Invalid query");
    return { error: "Bad query" };
  }
  const { q, category, brand, page, limit } = parsed.data;

  const config = useRuntimeConfig(event);

  const params = new URLSearchParams({
    user_field_names: "true",
    page: String(page),
    size: String(limit),
  });
  const url = `${config.baserowBaseUrl}/api/database/rows/table/${
    config.baserowTableIdPerf
  }/?${params.toString()}`;

  try {
    const res = await $fetch<BaserowListResponse>(url, {
      headers: { Authorization: `Token ${config.baserowTokenPerf}` },
    });

    let items = (res?.results ?? res?.rows ?? []).map(mapPerfumeRow);

    // Lightweight in-process search for small catalogs
    if (q && typeof q === "string") {
      const lx = q.toLowerCase();
      items = items.filter(
        (r) =>
          r.name.toLowerCase().includes(lx) ||
          r.sku.toLowerCase().includes(lx) ||
          r.brand.toLowerCase().includes(lx)
      );
    }
    if (category && typeof category === "string") {
      items = items.filter((r) => r.category === category);
    }
    if (brand && typeof brand === "string") {
      items = items.filter((r) => r.brand === brand);
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
      error: "Failed to fetch perfumes from Baserow",
      detail: err?.message ?? String(err),
    };
  }
});
