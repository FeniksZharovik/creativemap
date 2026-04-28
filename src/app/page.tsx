import Link from 'next/link'
import { countCreators, findFeaturedCreators } from '@/lib/repos/creators'
import { countSectors } from '@/lib/repos/sectors'
import { countProvinces } from '@/lib/repos/provinces'
import { findPublishedTestimonials } from '@/lib/repos/testimonials'
import { formatNumber } from '@/lib/utils'

async function getStats () {
  const [creators, sectors, provinces, women, youth, indigenous] =
    await Promise.all([
      countCreators(),
      countSectors(),
      countProvinces(),
      countCreators({ gender: 'FEMALE' }),
      countCreators({ isYouth: true }),
      countCreators({ isIndigenous: true })
    ])
  return { creators, sectors, provinces, women, youth, indigenous }
}

async function getFeatured () {
  return findFeaturedCreators()
}

async function getTestimonials () {
  return findPublishedTestimonials(3)
}

export default async function Home () {
  const stats = await getStats()
  const featured = await getFeatured()
  const testimonials = await getTestimonials()

  return (
    <div>
      {/* HERO */}
      <section className='bg-gradient-to-br from-amber-50 via-rose-50 to-white border-b border-zinc-200'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24'>
          <div className='grid md:grid-cols-2 gap-10 items-center'>
            <div>
              <span className='inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4'>
                UNESCO IFCD aligned
              </span>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight'>
                Memetakan ekosistem{' '}
                <span className='text-amber-600'>industri kreatif</span>{' '}
                Indonesia.
              </h1>
              <p className='mt-6 text-lg text-zinc-700 max-w-lg'>
                Platform open-data untuk pelaku kreatif, NGO, dinas kebudayaan,
                dan peneliti. Memperkuat akses pasar, capacity building, dan
                kebijakan berbasis data — dengan fokus pada perempuan kreator,
                pemuda, dan komunitas adat.
              </p>
              <div className='mt-8 flex flex-wrap gap-3'>
                <Link
                  href='/map'
                  className='inline-flex items-center rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-semibold hover:bg-zinc-800'
                >
                  Jelajahi Peta
                </Link>
                <Link
                  href='/register'
                  className='inline-flex items-center rounded-full bg-white text-zinc-900 border border-zinc-300 px-6 py-3 text-sm font-semibold hover:bg-zinc-50'
                >
                  Daftar Sebagai Kreator
                </Link>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <StatCard
                label='Pelaku Kreatif'
                value={stats.creators}
                accent='amber'
              />
              <StatCard label='Sektor' value={stats.sectors} accent='rose' />
              <StatCard
                label='Provinsi'
                value={stats.provinces}
                accent='emerald'
              />
              <StatCard
                label='Kreator Perempuan'
                value={stats.women}
                accent='violet'
              />
              <StatCard
                label='Pemuda (18-30)'
                value={stats.youth}
                accent='sky'
              />
              <StatCard
                label='Komunitas Adat'
                value={stats.indigenous}
                accent='orange'
              />
            </div>
          </div>
        </div>
      </section>

      {/* ALIGNMENT WITH IFCD */}
      <section className='py-16 md:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold tracking-tight'>
              Selaras dengan prioritas UNESCO IFCD
            </h2>
            <p className='mt-3 text-zinc-600 max-w-2xl mx-auto'>
              Setiap fitur dirancang berdasarkan tipe proyek yang didanai oleh
              International Fund for Cultural Diversity (IFCD).
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-6'>
            <FeatureCard
              tag='Mapping & Data'
              title='Decision-making tools'
              desc='Database & visualisasi pelaku kreatif untuk perencanaan kebijakan budaya berbasis data — sesuai brief IFCD.'
            />

            <FeatureCard
              tag='Capacity Building'
              title='Pedagogical capacities'
              desc='Modul belajar online untuk pelaku kreatif daerah, dengan modul khusus perempuan & pemuda.'
            />
            <FeatureCard
              tag='Market Access'
              title='New financing opportunities'
              desc='Akses pasar nasional & internasional via direktori publik, profil terverifikasi, dan API terbuka.'
            />
            <FeatureCard
              tag='Gender Equality'
              title='Empowering women creators'
              desc='Spesifik mengangkat data, pelatihan, dan jaringan kreator perempuan di seluruh Indonesia.'
            />
            <FeatureCard
              tag='Youth & Indigenous'
              title='Vulnerable groups participation'
              desc='Visibilitas dan dukungan untuk kreator muda (18–30) dan komunitas adat di seluruh Nusantara.'
            />
            <FeatureCard
              tag='Digital Environment'
              title='Cultural industries online'
              desc='Memperkuat sektor kreatif di ranah digital sesuai roadmap UNESCO untuk Konvensi 2005.'
            />
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS */}
      <section className='py-16 md:py-20 bg-white border-t border-b border-zinc-200'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='flex items-end justify-between mb-8 flex-wrap gap-4'>
            <div>
              <h2 className='text-3xl font-bold tracking-tight'>
                Kreator terbaru
              </h2>
              <p className='mt-2 text-zinc-600'>
                Profil pelaku kreatif yang terverifikasi di platform.
              </p>
            </div>
            <Link
              href='/creators'
              className='text-sm font-semibold text-amber-600 hover:text-amber-700'
            >
              Lihat semua →
            </Link>
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {featured.map(c => (
              <Link
                key={c.id}
                href={`/creators/${c.slug}`}
                className='group rounded-xl border border-zinc-200 p-5 bg-white hover:border-amber-400 hover:shadow-md transition'
              >
                <div className='flex items-start justify-between gap-3 mb-3'>
                  <div>
                    <div className='font-semibold text-zinc-900 group-hover:text-amber-700'>
                      {c.fullName}
                    </div>
                    <div className='text-xs text-zinc-500 mt-0.5'>
                      {c.city.name}, {c.province.name}
                    </div>
                  </div>
                  <span className='inline-flex text-[10px] font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-700 px-2 py-1 rounded'>
                    {c.sector.nameId}
                  </span>
                </div>
                <p className='text-sm text-zinc-700 line-clamp-3'>{c.bio}</p>
                <div className='mt-3 flex flex-wrap gap-1'>
                  {c.gender === 'FEMALE' && <Tag color='rose'>Perempuan</Tag>}
                  {c.isYouth && <Tag color='sky'>Pemuda</Tag>}
                  {c.isIndigenous && <Tag color='emerald'>Komunitas Adat</Tag>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className='py-16 md:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <h2 className='text-3xl font-bold tracking-tight text-center mb-12'>
            Suara dari komunitas
          </h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {testimonials.map(t => (
              <figure
                key={t.id}
                className='rounded-xl bg-white border border-zinc-200 p-6'
              >
                <blockquote className='text-zinc-800 italic'>
                  "{t.quote}"
                </blockquote>
                <figcaption className='mt-4 text-sm'>
                  <div className='font-semibold'>{t.authorName}</div>
                  <div className='text-zinc-500'>{t.authorRole}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 md:py-20 bg-zinc-900 text-white'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold tracking-tight'>
            Bergabunglah dengan ekosistem kreatif Indonesia.
          </h2>
          <p className='mt-4 text-zinc-300 max-w-2xl mx-auto'>
            Apakah Anda kreator, peneliti, NGO, atau pejabat dinas — platform
            ini terbuka untuk Anda. Open data, open source, untuk Indonesia.
          </p>
          <div className='mt-8 flex flex-wrap justify-center gap-3'>
            <Link
              href='/register'
              className='inline-flex items-center rounded-full bg-amber-500 text-zinc-900 px-6 py-3 text-sm font-semibold hover:bg-amber-400'
            >
              Daftar Sekarang
            </Link>
            <Link
              href='/about'
              className='inline-flex items-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold hover:bg-zinc-800'
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatCard ({
  label,
  value,
  accent
}: {
  label: string
  value: number
  accent: 'amber' | 'rose' | 'emerald' | 'violet' | 'sky' | 'orange'
}) {
  const colors = {
    amber: 'bg-amber-100 text-amber-900 border-amber-200',
    rose: 'bg-rose-100 text-rose-900 border-rose-200',
    emerald: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    violet: 'bg-violet-100 text-violet-900 border-violet-200',
    sky: 'bg-sky-100 text-sky-900 border-sky-200',
    orange: 'bg-orange-100 text-orange-900 border-orange-200'
  }
  return (
    <div className={`rounded-xl border p-4 ${colors[accent]}`}>
      <div className='text-3xl font-bold tabular-nums'>
        {formatNumber(value)}
      </div>
      <div className='text-xs font-medium mt-1 opacity-80'>{label}</div>
    </div>
  )
}

function FeatureCard ({
  tag,
  title,
  desc
}: {
  tag: string
  title: string
  desc: string
}) {
  return (
    <div className='rounded-xl border border-zinc-200 bg-white p-6'>
      <span className='inline-block text-[10px] font-bold tracking-widest uppercase text-amber-600 mb-2'>
        {tag}
      </span>
      <h3 className='font-semibold text-lg text-zinc-900'>{title}</h3>
      <p className='text-sm text-zinc-600 mt-2 leading-relaxed'>{desc}</p>
    </div>
  )
}

function Tag ({
  children,
  color
}: {
  children: React.ReactNode
  color: 'rose' | 'sky' | 'emerald'
}) {
  const colors = {
    rose: 'bg-rose-100 text-rose-700',
    sky: 'bg-sky-100 text-sky-700',
    emerald: 'bg-emerald-100 text-emerald-700'
  }
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded ${colors[color]}`}
    >
      {children}
    </span>
  )
}
