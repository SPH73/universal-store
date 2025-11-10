<template>
  <main class="mx-auto max-w-6xl p-6">
    <h1 class="text-2xl font-semibold mb-6">Catalogs</h1>
    <div class="grid gap-4 md:grid-cols-3">
      <CatalogCard
        title="Hydraulic Components"
        description="Search surplus components and cylinders."
        to="/inventory"
      />
      <CatalogCard
        title="Perfume Inventory"
        description="Browse fragrances by brand and category."
        to="/perfumes"
      />
      <CatalogCard
        title="Bargain Box"
        description="Clearance items and special deals."
        to="/bargain-box"
      />
    </div>
  </main>
</template>
