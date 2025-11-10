# Vercel Deployment Guide

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SPH73/universal-store)

## 📋 Environment Variables

Configure these environment variables in your Vercel dashboard:

### Baserow API Configuration

- `NUXT_BASEROW_BASE_URL` - Your Baserow instance URL (e.g., `https://api.baserow.io`)
- `NUXT_BASEROW_TOKEN_HYDRAULIC` - API token for hydraulic components table
- `NUXT_BASEROW_TABLE_ID_HYDRAULIC` - Table ID for hydraulic components
- `NUXT_BASEROW_TOKEN_PERF` - API token for perfumes table
- `NUXT_BASEROW_TABLE_ID_PERF` - Table ID for perfumes
- `NUXT_BASEROW_TOKEN_BARGAIN` - API token for bargains table
- `NUXT_BASEROW_TABLE_ID_BARGAIN` - Table ID for bargains

### Admin Configuration

- `NUXT_ADMIN_PASSWORD` - Admin panel password

## 🔧 Deployment Steps

1. **Fork/Clone Repository**

   ```bash
   git clone https://github.com/SPH73/universal-store.git
   cd universal-store
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Nuxt framework

3. **Configure Environment Variables**

   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all the variables listed above
   - Use your actual Baserow API credentials

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - First deployment may take 2-3 minutes

## 🏗️ Build Configuration

The project is configured with:

- **Framework**: Nuxt 4.2.1 with Nitro

- **Node Version**: 22.x (specified in package.json engines)
- **Build Command**: `npm run build`
- **Output Directory**: `.output`
- **API Routes**: Server-side rendered in `/server/api/`

## 🔒 Security Features

- **API Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Environment Variables**: All sensitive data stored as environment variables
- **Function Timeout**: 30 seconds max for API routes
- **Admin Authentication**: Cookie-based session management

## 🧪 Testing Before Deploy

Run these commands locally to verify everything works:

```bash
# Install dependencies
npm install

# Run type checking
npm run typecheck

# Run tests
npm run test:all

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Performance Optimizations

- **Static Generation**: Pages pre-rendered where possible
- **API Caching**: 5-minute cache for catalog endpoints
- **Image Optimization**: Automatic via Nuxt/Vercel
- **Bundle Analysis**: Use `npx nuxi analyze` to check bundle size

## 🔍 Monitoring

- **Build Logs**: Available in Vercel dashboard
- **Function Logs**: Real-time API logging
- **Analytics**: Built-in Vercel Web Analytics
- **Error Tracking**: Console errors logged in Vercel Functions

## 🌐 Custom Domain

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain name
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

## 📱 Multi-Store Architecture

The deployed app includes:

- **Hydraulic Components** (`/inventory`) - Industrial parts catalog
- **Perfume Inventory** (`/perfumes`) - Fragrance collection
- **Bargain Box** (`/bargain-box`) - Clearance deals
- **Admin Panel** - Content management (protected)

Each store connects to separate Baserow tables for complete data isolation.
