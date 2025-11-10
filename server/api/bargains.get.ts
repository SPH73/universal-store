import type { H3Event } from "h3";
import { PaginatedQuery } from "~/server/utils/validators";

type BRow = Record<string, unknown> & { id: number };
interface BList {
  count?: number;
  results?: BRow[];
  rows?: BRow[];
}

function mapRow(r: BRow) {
  const photos = Array.isArray(r["Photos"])
    ? r["Photos"].map((f: any) => ({
        url: f.url,
        name: f.visible_name ?? f.name ?? "file",
      }))
    : [];
  return {
    id: r.id,
    sku: String(r["SKU"] ?? ""),
    name: String(r["Product Name"] ?? ""),
    category: String(r["Category"] ?? ""),
    description: String(r["Description"] ?? ""),
    originalPrice: Number(r["Original Price"] ?? 0),
    bargainPrice: Number(r["Bargain Price"] ?? 0),
    discountPct: Number(r["Discount %"] ?? 0),
    qty: Number(r["Quantity"] ?? 0),
    status: String(r["Status"] ?? ""),
    startsOn: String(r["Starts On"] ?? ""),
    endsOn: String(r["Ends On"] ?? ""),
    badges: r["Badges"] ?? [],
    photos,
  };
}

export default defineEventHandler(async (event: H3Event) => {
  const parsed = PaginatedQuery.safeParse(getQuery(event));
  if (!parsed.success) {
    setResponseStatus(event, 400, "Invalid query");
    return { error: "Bad query" };
  }
  const { q, category, badge, page, limit } = parsed.data;

  const cfg = useRuntimeConfig(event);
  const params = new URLSearchParams({
    user_field_names: "true",
    page: String(page),
    size: String(limit),
  });
  const url = `${cfg.baserowBaseUrl}/api/database/rows/table/${cfg.baserowTableIdBargain}/?${params}`;

  try {
    const res = await $fetch<BList>(url, {
      headers: { Authorization: `Token ${cfg.baserowTokenBargain}` },
    });
    let items = (res?.results ?? res?.rows ?? []).map(mapRow);

    // Lightweight search/filter for small catalogs
    if (q && typeof q === "string") {
      const lx = q.toLowerCase();
      items = items.filter(
        (r) =>
          r.name.toLowerCase().includes(lx) ||
          r.sku.toLowerCase().includes(lx) ||
          r.category.toLowerCase().includes(lx)
      );
    }
    if (category && typeof category === "string")
      items = items.filter((r) => r.category === category);
    if (badge && typeof badge === "string")
      items = items.filter((r) =>
        Array.isArray(r.badges) ? r.badges.includes(badge) : false
      );

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
      error: "Failed to fetch bargains from Baserow",
      detail: err?.message ?? String(err),
    };
  }
});
