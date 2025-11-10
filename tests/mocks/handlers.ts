import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock Hydraulic Components API
  http.get("/api/components", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";

    const mockComponents = [
      {
        id: 1,
        sku: "HYD001",
        name: "Hydraulic Pump Model A",
        category: "Pumps",
        description: "High-performance hydraulic pump for heavy machinery",
        price: 299.99,
        qty: 15,
        status: "In Stock",
        photos: [{ url: "/images/pump-a.jpg", name: "Pump A" }],
      },
      {
        id: 2,
        sku: "HYD002",
        name: 'Hydraulic Cylinder 12"',
        category: "Cylinders",
        description: "12-inch hydraulic cylinder with dual action",
        price: 189.5,
        qty: 8,
        status: "In Stock",
        photos: [{ url: "/images/cylinder-12.jpg", name: 'Cylinder 12"' }],
      },
    ];

    let filteredComponents = mockComponents;
    if (q) {
      filteredComponents = mockComponents.filter(
        (item) =>
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.sku.toLowerCase().includes(q.toLowerCase()) ||
          item.category.toLowerCase().includes(q.toLowerCase())
      );
    }

    return HttpResponse.json({
      items: filteredComponents,
      meta: {
        count: filteredComponents.length,
        page: 1,
        limit: 20,
      },
    });
  }),

  // Mock Perfumes API
  http.get("/api/perfumes", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";

    const mockPerfumes = [
      {
        id: 1,
        sku: "PERF001",
        name: "Elegant Rose",
        brand: "Luxury Scents",
        category: "Floral",
        description: "A sophisticated rose fragrance with hints of jasmine",
        sellingPrice: 89.99,
        qty: 25,
        status: "In Stock",
        photos: [{ url: "/images/elegant-rose.jpg", name: "Elegant Rose" }],
      },
      {
        id: 2,
        sku: "PERF002",
        name: "Ocean Breeze",
        brand: "Fresh Collection",
        category: "Fresh",
        description: "Light and refreshing ocean-inspired fragrance",
        sellingPrice: 65.99,
        qty: 12,
        status: "In Stock",
        photos: [{ url: "/images/ocean-breeze.jpg", name: "Ocean Breeze" }],
      },
    ];

    let filteredPerfumes = mockPerfumes;
    if (q) {
      filteredPerfumes = mockPerfumes.filter(
        (item) =>
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.brand.toLowerCase().includes(q.toLowerCase()) ||
          item.category.toLowerCase().includes(q.toLowerCase())
      );
    }

    return HttpResponse.json({
      items: filteredPerfumes,
      meta: {
        count: filteredPerfumes.length,
        page: 1,
        limit: 20,
      },
    });
  }),

  // Mock Bargains API
  http.get("/api/bargains", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";

    const mockBargains = [
      {
        id: 1,
        sku: "BARG001",
        name: "Clearance Tool Set",
        category: "Tools",
        description: "Professional tool set - last units available",
        originalPrice: 199.99,
        bargainPrice: 99.99,
        discountPct: 50,
        qty: 3,
        status: "Clearance",
        startsOn: "2024-01-01",
        endsOn: "2024-12-31",
        badges: ["Last Units", "Clearance"],
        photos: [{ url: "/images/tool-set.jpg", name: "Tool Set" }],
      },
    ];

    let filteredBargains = mockBargains;
    if (q) {
      filteredBargains = mockBargains.filter(
        (item) =>
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.category.toLowerCase().includes(q.toLowerCase())
      );
    }

    return HttpResponse.json({
      items: filteredBargains,
      meta: {
        count: filteredBargains.length,
        page: 1,
        limit: 20,
      },
    });
  }),

  // Mock Admin Session API
  http.get("/api/admin/session", () => {
    return HttpResponse.json({ isAdmin: false });
  }),

  // Mock Admin Login API
  http.post("/api/admin/login", async ({ request }) => {
    const { password } = (await request.json()) as { password: string };

    if (password === "test-admin-password") {
      return HttpResponse.json({ success: true });
    }

    return HttpResponse.json({ error: "Invalid password" }, { status: 401 });
  }),

  // Mock Admin Logout API
  http.post("/api/admin/logout", () => {
    return HttpResponse.json({ success: true });
  }),
];
