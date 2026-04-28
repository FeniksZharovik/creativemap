import { countCreators } from '@/lib/repos/creators'
import {
  countCreatorsBySector,
  countCreatorsByProvince,
  getCreatorsRegistrationTrend
} from '@/lib/repos/stats'
import { formatNumber } from '@/lib/utils'
import DashboardCharts from './DashboardCharts'

export const dynamic = 'force-dynamic'

export default async function DashboardPage () {
  const [
    totalCreators,
    bySectorRaw,
    byProvinceRaw,
    byGender,
    byYouth,
    byIndigenous,
    monthly
  ] = await Promise.all([
    countCreators(),
    countCreatorsBySector(),
    countCreatorsByProvince(50),
    countCreators({ gender: 'FEMALE' }),
    countCreators({ isYouth: true }),
    countCreators({ isIndigenous: true }),
    getCreatorsRegistrationTrend('creators_registered')
  ])

  const bySector = bySectorRaw
    .map(row => ({ name: row.sectorName, value: row.count }))
    .sort((a, b) => b.value - a.value)

  const byProvince = byProvinceRaw
    .map(row => ({ name: row.provinceName, value: row.count }))
    .sort((a, b) => b.value - a.value)

  const monthlyData = monthly.map(m => ({
    month: new Date(m.date).toLocaleDateString('id-ID', {
      month: 'short',
      year: '2-digit'
    }),
    value: m.value
  }))

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 py-10'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Dashboard Industri Kreatif
        </h1>
        <p className='mt-2 text-zinc-600 max-w-2xl'>
          Visualisasi data sektor kreatif Indonesia untuk mendukung pengambilan
          keputusan dan kebijakan budaya berbasis data.
        </p>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <KPI
          label='Total kreator terverifikasi'
          value={totalCreators}
          accent='zinc'
        />
        <KPI
          label='Kreator perempuan'
          value={byGender}
          suffix={`(${Math.round((byGender / totalCreators) * 100)}%)`}
          accent='rose'
        />
        <KPI
          label='Pemuda (18-30)'
          value={byYouth}
          suffix={`(${Math.round((byYouth / totalCreators) * 100)}%)`}
          accent='sky'
        />
        <KPI
          label='Komunitas adat'
          value={byIndigenous}
          suffix={`(${Math.round((byIndigenous / totalCreators) * 100)}%)`}
          accent='emerald'
        />
      </div>

      <DashboardCharts
        bySector={bySector}
        byProvince={byProvince}
        monthly={monthlyData}
      />

      <div className='mt-8 rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-900'>
        <strong>Open Data:</strong> Semua data agregat dapat diakses publik
        melalui API di{' '}
        <code className='bg-amber-100 px-1 rounded'>/api/stats</code>. Cocok
        untuk peneliti, jurnalis, dan dinas kebudayaan dalam menyusun kebijakan.
      </div>
    </div>
  )
}

function KPI ({
  label,
  value,
  suffix,
  accent
}: {
  label: string
  value: number
  suffix?: string
  accent: 'zinc' | 'rose' | 'sky' | 'emerald'
}) {
  const colors = {
    zinc: 'border-zinc-200',
    rose: 'border-rose-200 bg-rose-50',
    sky: 'border-sky-200 bg-sky-50',
    emerald: 'border-emerald-200 bg-emerald-50'
  }
  return (
    <div className={`rounded-xl border bg-white p-5 ${colors[accent]}`}>
      <div className='text-sm text-zinc-600'>{label}</div>
      <div className='mt-2 text-3xl font-bold tabular-nums'>
        {formatNumber(value)}{' '}
        {suffix && (
          <span className='text-sm font-medium opacity-70'>{suffix}</span>
        )}
      </div>
    </div>
  )
}
