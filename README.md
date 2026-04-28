# CreativeMap.id

> **Platform pemetaan & pemberdayaan pelaku industri kreatif Indonesia.**
> Open data, open source, selaras dengan UNESCO IFCD (International Fund for Cultural Diversity) dan Konvensi 2005.

rototype starter untuk proyek mahasiswa IT yang ingin mengajukan proposal ke UNESCO IFCD atau hibah serupa di sektor industri kreatif dan budaya.
 
---
 
## Apa ini?
 
`CreativeMap.id` adalah platform yang:
 
1. **Memetakan** pelaku industri kreatif Indonesia (musisi, desainer, pengrajin, sineas, penulis, performer, seniman digital) di seluruh provinsi.
2. **Memberdayakan** mereka melalui modul belajar online (capacity building).
3. **Menyediakan data terbuka** untuk pemerintah, NGO, peneliti, dan pelaku usaha sebagai dasar pengambilan keputusan.
4. **Memprioritaskan** kelompok yang menjadi prioritas UNESCO IFCD: perempuan kreator, pemuda (18-30), dan komunitas adat / Indigenous.
 
Dirancang berdasarkan tipe proyek yang eksplisit didanai oleh UNESCO IFCD ([brosur Call 2026](https://www.unesco.org/creativity/en/international-fund-cultural-diversity)).
 
---
 
## Tech Stack
 
| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router, RSC) + TypeScript |
| Styling | Tailwind CSS 4 |
| Database | **PostgreSQL 14+** (lokal & production) |
| ORM | Prisma 7 + `@prisma/adapter-pg` |
| GUI Database | pgAdmin 4 (opsional) atau Prisma Studio |
| Maps | Leaflet + React-Leaflet + OpenStreetMap |
| Charts | Recharts |
| Icons | Lucide React |
 
Lihat [`docs/architecture.md`](docs/architecture.md) untuk detail arsitektur.
 
---
 
## Cepat memulai
 
### Prasyarat
- Node.js 20+
- npm 10+
- **PostgreSQL 14+** (lihat panduan instalasi di bawah)
- pgAdmin 4 (opsional, untuk GUI database)
 
### Step 1 — Install PostgreSQL Local
 
**Windows / macOS:**
1. Download installer dari https://www.postgresql.org/download/
2. Saat instalasi, **catat password** yang Anda tetapkan untuk user `postgres`
3. Installer otomatis menyertakan **pgAdmin 4** (GUI database)
 
**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
# Set password user postgres
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'devpass';"
# (Opsional) Install pgAdmin
sudo apt install -y pgadmin4
```
 
**macOS via Homebrew:**
```bash
brew install postgresql@14
brew services start postgresql@14
brew install --cask pgadmin4
```
 
Verifikasi:
```bash
psql --version    # PostgreSQL 14.x atau lebih baru
```
 
### Step 2 — Buat Database `creativemap`
 
**Via terminal (semua OS):**
```bash
# Linux/macOS
sudo -u postgres createdb creativemap
 
# Windows (di Command Prompt)
createdb -U postgres creativemap
```
 
**Atau via pgAdmin:**
1. Buka pgAdmin 4
2. Login server `localhost` (user `postgres`, password yang Anda set)
3. Klik kanan pada **Databases** → **Create** → **Database**
4. Beri nama `creativemap`, klik **Save**
 
### Step 3 — Setup Project
 
```bash
# 1. Copy file env
cp .env.example .env
# Edit .env, sesuaikan password & host PostgreSQL Anda
 
# 2. Install dependencies
npm install
 
# 3. Generate Prisma client + apply migrations + seed data
npm run db:setup
 
# 4. Run dev server
npm run dev

Buka http://localhost:3000

### Step 4 — Verifikasi via pgAdmin (opsional)
1. Buka pgAdmin 4
2. Refresh database `creativemap`
3. Navigasi ke **Schemas → public → Tables**
4. Anda akan lihat tabel: `User`, `CreatorProfile`, `Sector`, `Province`, dll.
5. Klik kanan tabel `CreatorProfile` → **View/Edit Data → All Rows** (akan muncul 30 kreator)

### Format `DATABASE_URL`
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Contoh default:
```
postgresql://postgres:devpass@127.0.0.1:5432/creativemap?schema=public
```

### Skrip yang tersedia
```bash
npm run dev          # development server
npm run build        # production build
npm run start        # production server
npm run lint         # eslint
npm run db:setup     # generate + migrate + seed
npm run db:reset     # reset DB & seed ulang
npm run db:studio    # buka Prisma Studio (GUI database)
```
---
 
## Lisensi
 
- **Kode**: MIT License
- **Data agregat publik**: CC BY 4.0
- **Data pribadi kreator**: tidak dipublikasi tanpa consent eksplisit
 
---
 