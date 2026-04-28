# Tech Architecture — CreativeMap.id
 
## High-Level Diagram
 
```
┌──────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │  Leaflet Map   │  │  Recharts      │  │  HTML Forms    │     │
│  │  (interactive) │  │  (dashboard)   │  │  (filter/auth) │     │
│  └────────────────┘  └────────────────┘  └────────────────┘     │
└──────────────────────────────┬───────────────────────────────────┘
                               │ HTTPS
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Next.js 16 App Router (Vercel)                  │
│                                                                  │
│  ┌─────────────────────────┐    ┌──────────────────────────┐    │
│  │   React Server          │    │   Route Handlers         │    │
│  │   Components (RSC)      │    │   (REST/JSON API)        │    │
│  │   - Landing page        │    │   /api/stats             │    │
│  │   - /map                │    │   /api/creators          │    │
│  │   - /creators           │    │   /api/courses           │    │
│  │   - /dashboard          │    │                          │    │
│  │   - /learn              │    │                          │    │
│  └───────────┬─────────────┘    └────────────┬─────────────┘    │
│              │                                │                  │
│              └────────────┬───────────────────┘                  │
│                           ▼                                      │
│              ┌──────────────────────────┐                        │
│              │  src/lib/prisma.ts       │                        │
│              │  (singleton client)      │                        │
│              └────────────┬─────────────┘                        │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │  Prisma 7 ORM            │
              │  + adapter-pg            │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │  PostgreSQL 14+          │
              │  (lokal & production)    │
              └──────────────────────────┘
```
 
External services (post-prototype):
- **Auth**: NextAuth.js / Clerk
- **Storage**: Cloudinary / Supabase Storage (foto profil, karya)
- **Email**: Resend (verification, notifications)
- **Map tiles**: OpenStreetMap (gratis) atau Mapbox (production)
- **Analytics**: Plausible / PostHog
- **Hosting**: Vercel (frontend + API) + Supabase/Neon (DB)
 
---
 
## Routing & Pages
 
| Route | Type | Komponen utama | Data source |
|---|---|---|---|
| `/` | RSC | `page.tsx` | Prisma queries |
| `/map` | RSC + Client | `MapView.tsx` (client) | Prisma + dynamic Leaflet |
| `/creators` | RSC | `page.tsx` (filter form) | Prisma with filters |
| `/creators/[slug]` | RSC | `page.tsx` | Prisma findUnique |
| `/dashboard` | RSC + Client | `DashboardCharts.tsx` (client) | Prisma groupBy |
| `/learn` | RSC | `page.tsx` | Prisma |
| `/learn/[slug]` | RSC | `page.tsx` | Prisma |
| `/api/stats` | Route handler | `route.ts` | Prisma aggregations |
| `/api/creators` | Route handler | `route.ts` | Prisma with filters |
 
**Convention:** Server components fetch data via Prisma directly. Client components (interactive maps, charts, forms) hydrate dengan props dari RSC.
 
---
 
## Database Schema (Ringkas)
 
Lihat `prisma/schema.prisma` untuk versi penuh.
 
### Entitas Inti
 
```
User ──1:1── CreatorProfile ──N:1── Sector
                  │           │
                  │           └──N:1── Province ──1:N── City
                  │
                  ├──1:N── Work
                  └──1:N── TrainingRecord
 
User ──1:N── ForumPost ──1:N── ForumComment
User ──1:N── CourseEnrollment ──N:1── Course ──1:N── CourseModule
 
ImpactMetric (standalone, time-series)
AuditLog (untuk akuntabilitas IFCD)
```
 
### Enums
 
- `Role`: ADMIN, CREATOR, PARTNER, RESEARCHER
- `Gender`: FEMALE, MALE, NON_BINARY, PREFER_NOT_TO_SAY
- `BusinessScale`: INDIVIDUAL, MICRO, SMALL, MEDIUM, COOPERATIVE
- `VerificationStatus`: PENDING, VERIFIED, REJECTED
- `CourseLevel`: BEGINNER, INTERMEDIATE, ADVANCED
 
### Indeks utama
- `CreatorProfile`: sectorId, provinceId, cityId, gender, isYouth, verificationStatus
- `City`: provinceId
- `ForumPost`: authorId, category
- `AuditLog`: userId, action, createdAt
 
---
 
## State Management
 
Karena banyak halaman bersifat data-fetch + readonly, pendekatannya:
 
- **Server-fetched data**: di RSC via Prisma (tanpa SWR/React Query)
- **Local UI state** (filter, modal): React `useState` di client components
- **URL state** (filter di /creators): query string + RSC re-render
- **Form state**: progressive (saat ini placeholder; nanti pakai Zod + Server Actions)
 
---
 
## Auth (next phase)
 
Rencana implementasi:
 
```ts
// menggunakan NextAuth.js v5 (Auth.js)
import { auth } from "@/lib/auth";
 
const session = await auth();
if (!session?.user) redirect("/login");
```
 
Provider:
- Email/password (untuk admin & kreator)
- Google OAuth (untuk kreator)
- Magic link (Resend)
 
---
 
## Deployment
 
### Vercel + Supabase (rekomendasi)
 
```bash
# 1. Push ke GitHub
git remote add origin git@github.com:<user>/creativemap-id.git
git push -u origin main
 
# 2. Import ke Vercel
#   - Connect repo
#   - Tambahkan env vars:
#       DATABASE_URL=postgresql://... (Supabase)
#       NEXTAUTH_SECRET=...
#       NEXTAUTH_URL=https://creativemap.id
 
# 3. Migrate
#   Supabase: pakai connection string dari Supabase
#   Run: npx prisma migrate deploy
```
 
### Self-host (Docker)
 
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
 
---
 
## Performance Considerations
 
- RSC + streaming → fast initial load
- Leaflet di-load secara dynamic (client-only) untuk hindari SSR errors
- Image lazy loading via `<Image>` Next.js
- Database indexes di kolom yang sering di-filter
- API caching: `Cache-Control: public, max-age=60` untuk `/api/stats`
 
---
 
## Security Considerations
 
| Concern | Mitigation |
|---|---|
| Password storage | bcrypt + salt (saat auth diimplementasi) |
| SQL injection | Prisma parameterized queries (built-in) |
| XSS | React auto-escaping + sanitize markdown content |
| CSRF | NextAuth.js built-in tokens |
| Personal data | `consentToShare` flag, non-public by default |
| API rate limiting | Tambahkan `@vercel/edge` rate limit di production |
| Sensitive logs | Tidak log `email`, `passwordHash`, NPWP di console |
 
---
 
## Open Data Strategy
 
Kompatibilitas dengan filosofi UNESCO IFCD:
 
1. **Public API**: `/api/stats`, `/api/creators` tanpa auth
2. **License**: CC BY 4.0 untuk data agregat
3. **Privacy**: Data pribadi (email, phone, NPWP) tidak pernah di-expose
4. **Consent**: Kreator opt-in via `consentToShare`
5. **Export**: Tombol export CSV/Excel untuk pemerintah & peneliti (next phase)
 
---
 
## Ekstensi yang direncanakan
 
- **Multilingual**: i18n via `next-intl` (ID/EN/FR — sesuai bahasa IFCD)
- **Notifications**: Email reminder untuk kreator yg belum lengkapi profil
- **Search**: Algolia / Meilisearch untuk full-text search
- **Mobile app**: React Native (share schema via Prisma + tRPC)
- **AI assistance**: Claude API untuk membantu kreator menulis bio profesional