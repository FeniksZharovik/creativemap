import Link from "next/link";
import { findCreators } from "@/lib/repos/creators";
import { findAllSectors } from "@/lib/repos/sectors";
import { findAllProvinces } from "@/lib/repos/provinces";
 
type SearchParams = Promise<{
  sector?: string;
  province?: string;
  gender?: string;
  youth?: string;
  indigenous?: string;
  q?: string;
}>;
 
export const dynamic = "force-dynamic";
 
export default async function CreatorsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
 
  const [creators, sectors, provinces] = await Promise.all([
    findCreators({
      sectorSlug: params.sector,
      provinceCode: params.province,
      gender: params.gender === "female" ? "FEMALE" : undefined,
      isYouth: params.youth === "1",
      isIndigenous: params.indigenous === "1",
      search: params.q,
      limit: 200,
    }),
    findAllSectors(),
    findAllProvinces(),
  ]);
 
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Direktori Pelaku Kreatif</h1>
          <p className="mt-2 text-zinc-600">
            {creators.length} kreator ditemukan{params.q ? ` untuk pencarian "${params.q}"` : ""}.
          </p>
        </div>
      </div>
 
      <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 bg-white border border-zinc-200 rounded-xl p-4 mb-6">
        <input
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Cari nama, bio…"
          className="lg:col-span-2 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <select name="sector" defaultValue={params.sector ?? ""} aria-label="Sektor" className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="">Semua sektor</option>
          {sectors.map((s) => (
            <option key={s.id} value={s.slug}>{s.nameId}</option>
          ))}
        </select>
        <select name="province" defaultValue={params.province ?? ""} aria-label="Provinsi" className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="">Semua provinsi</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.code}>{p.name}</option>
          ))}
        </select>
        <select name="gender" defaultValue={params.gender ?? ""} aria-label="Gender" className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="">Semua gender</option>
          <option value="female">Perempuan</option>
        </select>
        <button className="rounded-md bg-zinc-900 text-white px-4 py-2 text-sm font-semibold hover:bg-zinc-800">
          Filter
        </button>
        <div className="flex gap-3 col-span-full text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="youth" value="1" defaultChecked={params.youth === "1"} />
            Pemuda (18-30)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="indigenous" value="1" defaultChecked={params.indigenous === "1"} />
            Komunitas adat
          </label>
        </div>
      </form>
 
      {creators.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center text-zinc-600">
          Tidak ada kreator yang sesuai dengan filter.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((c) => (
            <Link
              key={c.id}
              href={`/creators/${c.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-400 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-semibold text-zinc-900 group-hover:text-amber-700">{c.fullName}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{c.city.name}, {c.province.name}</div>
                </div>
                <span className="inline-flex text-[10px] font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-700 px-2 py-1 rounded">
                  {c.sector.nameId}
                </span>
              </div>
              <p className="text-sm text-zinc-700 line-clamp-3">{c.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {c.gender === "FEMALE" && <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded">Perempuan</span>}
                {c.isYouth && <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded">Pemuda</span>}
                {c.isIndigenous && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Komunitas Adat</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}