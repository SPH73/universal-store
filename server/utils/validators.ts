import { z } from "zod";

export const PaginatedQuery = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  badge: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(25),
});

export const HydraulicsCreate = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  oemPartNumber: z.string().optional().default(""),
  category: z.string().optional().default(""),
  specs: z.string().optional().default(""),
  condition: z.string().optional().default("New"),
  qty: z.coerce.number().int().nonnegative().default(0),
  targetPrice: z.coerce.number().nonnegative().default(0),
  storageLocation: z.string().optional().default(""),
  supplier: z.string().optional().default(""),
  purchaseDate: z.string().optional().default(""),
  status: z.string().optional().default("Available"),
});

export const PerfumeCreate = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().optional().default(""),
  category: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  volume: z.coerce.number().nonnegative().default(0),
  condition: z.string().optional().default("New"),
  qty: z.coerce.number().int().nonnegative().default(0),
  sellingPrice: z.coerce.number().nonnegative().default(0),
  supplier: z.string().optional().default(""),
  arrivalDate: z.string().optional().default(""),
  status: z.string().optional().default("In Stock"),
});

export const BargainCreate = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  category: z.string().optional().default("Clearance"),
  description: z.string().optional().default(""),
  originalPrice: z.coerce.number().nonnegative().default(0),
  bargainPrice: z.coerce.number().positive(),
  qty: z.coerce.number().int().nonnegative().default(0),
  status: z.string().optional().default("In Stock"),
  startsOn: z.string().optional().default(""),
  endsOn: z.string().optional().default(""),
  badges: z
    .union([
      z.array(z.string()),
      z.string().transform((s) =>
        s
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      ),
    ])
    .optional()
    .default([]),
});
