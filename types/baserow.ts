export type BaserowRow = Record<string, unknown> & { id: number };

export interface BaserowListResponse {
  count?: number;
  results?: BaserowRow[];
  rows?: BaserowRow[];
}

export interface PublicComponent {
  id: number;
  sku: string;
  name: string;
  oemPartNumber: string;
  category: string;
  specs?: string;
  condition?: string;
  qty?: number;
  targetPrice?: number;
  storageLocation?: string;
  photos?: Array<{ url: string; name: string }>;
  status?: "Available" | "Reserved" | "Sold" | string;
}
