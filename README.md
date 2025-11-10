# 🏪 Multi-Store Online Catalog (Nuxt 4 + Baserow)

A comprehensive multi-store catalog system featuring hydraulic components, perfumes, and bargain items with admin management capabilities.

## ✨ Features

- **🔧 Hydraulic Components Store** - Industrial parts catalog with technical specifications
- **💎 Perfumes Store** - Beauty products with brand and fragrance information
- **🎯 Bargain Box** - Clearance and discounted items with deal tracking
- **🛡️ Admin Dashboard** - Secure product management with authentication
- **🎨 Icon System** - Consistent Heroicons-based UI with contextual icons
- **🔒 Security Features** - Input validation, rate limiting, and CSRF protection

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ (managed via `.nvmrc`)
- npm 10+

### Setup

```bash
# Use correct Node version (if you have nvm installed)
nvm use

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Baserow credentials for each store
# See Environment Variables section below

# Start development server
npm run dev
```

Visit `http://localhost:3000/` to explore the catalog stores.

## 🗂️ Project Structure

```env
├── components/           # Reusable Vue components
│   ├── ui/Icon.vue      # Centralized icon system
│   ├── SearchBar.vue    # Search functionality
│   ├── ProductCard.vue  # Product display
│   └── Pagination.vue   # Navigation
├── layouts/             # Store-specific layouts
│   ├── default.vue      # Main catalog layout
│   ├── hydraulics.vue   # Blue industrial theme
│   ├── perfumes.vue     # Pink beauty theme
│   └── bargain.vue      # Green deals theme
├── pages/               # Route pages
│   ├── index.vue        # Store selection
│   ├── inventory.vue    # Hydraulics catalog
│   ├── perfumes.vue     # Perfumes catalog
│   ├── bargain-box.vue  # Bargain deals
│   └── admin/           # Admin management
├── server/              # Backend API
│   ├── api/             # REST endpoints
│   ├── middleware/      # Security & rate limiting
│   └── utils/           # Validation & utilities
└── middleware/          # Route guards
```

## 🌐 Available Stores

| Store            | URL            | Description                     |
| ---------------- | -------------- | ------------------------------- |
| **Catalog Home** | `/`            | Store selection and navigation  |
| **Hydraulics**   | `/inventory`   | Industrial components and parts |
| **Perfumes**     | `/perfumes`    | Beauty products and fragrances  |
| **Bargain Box**  | `/bargain-box` | Clearance and discounted items  |
| **Admin**        | `/admin`       | Secure product management       |

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Baserow API Configuration
NUXT_BASEROW_BASE_URL=https://api.baserow.io

# Hydraulic Components Store
NUXT_BASEROW_TOKEN_HYDRAULIC=your_hydraulics_token
NUXT_BASEROW_TABLE_ID_HYDRAULIC=your_hydraulics_table_id

# Perfumes Store
NUXT_BASEROW_TOKEN_PERF=your_perfumes_token
NUXT_BASEROW_TABLE_ID_PERF=your_perfumes_table_id

# Bargain Box Store
NUXT_BASEROW_TOKEN_BARGAIN=your_bargains_token
NUXT_BASEROW_TABLE_ID_BARGAIN=your_bargains_table_id

# Admin Authentication
NUXT_ADMIN_PASSWORD=your_secure_admin_password
```

## 📊 Data Models

### Hydraulic Components

- SKU, Part Name, OEM P/N, Category, Specifications
- Condition, Quantity, Target Price, Storage Location
- Photos, Supplier, Purchase Date, Status

### Perfumes

- SKU, Product Name, Brand, Category, Volume
- Fragrance Notes, Condition, Quantity, Selling Price
- Supplier, Arrival Date, Status, Photos

### Bargain Items

- SKU, Product Name, Category, Description
- Original Price, Bargain Price, Discount Percentage
- Quantity, Status, Start/End Dates, Badges, Photos

## 🛡️ Security Features

- **Input Validation** - Zod schema validation for all API inputs
- **Admin Authentication** - Password-protected admin routes
- **Rate Limiting** - Token bucket limiting on sensitive endpoints
- **Security Headers** - CSP, X-Frame-Options, and other security headers
- **Route Guards** - Client-side protection for admin pages

## 🎨 Icon System

The project uses a centralized icon system with Heroicons:

- **Search, Filter, Sort** - UI navigation icons
- **Cylinder** - Hydraulic components identifier
- **Notes/Sparkles** - Perfume/fragrance indicator
- **Discount** - Bargain/deals marker
- **Status, Warning** - State indicators

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Support

Optional local Baserow instance:

```bash
# Start local Baserow
docker compose up -d

# Access at http://localhost
```

## 🛠️ Development

### Tech Stack

- **Nuxt 4** - Full-stack Vue framework
- **Vue 3** - Frontend framework with Composition API
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Heroicons** - Consistent icon system
- **Zod** - Runtime type validation
- **H3** - Server-side routing

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔍 Troubleshooting

### Common Issues

1. **Node Version** - Ensure you're using Node 22+ (`nvm use`)
2. **Environment Variables** - Check all required Baserow tokens are set
3. **Admin Access** - Verify `NUXT_ADMIN_PASSWORD` is configured
4. **Icon Warnings** - Icons auto-import from components directory

### API Endpoints

- `GET /api/components` - Hydraulic components with search/filter
- `GET /api/perfumes` - Perfumes with brand/category filters
- `GET /api/bargains` - Bargain items with badge filters
- `POST /api/*/` - Admin endpoints for adding new items (requires auth)

## 📝 License

Private project - all rights reserved.
