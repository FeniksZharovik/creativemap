import Link from "next/link";
import { notFound } from "next/navigation";
import { findCreatorBySlug } from "@/lib/repos/creators";
 
type Params = Promise<{ slug: string }>;
 
export const dynamic = "force-dynamic";
 
export default async function CreatorDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
 
  const creator = await findCreatorBySlug(slug);
 
  if (!creator || !creator.isPublic) notFound();
 
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <Link href="/creators" className="text-sm text-amber-600 hover:text-amber-700">
          ← Kembali ke direktori
        </Link>
 
        <div className="mt-6 grid md:grid-cols-[200px_1fr] gap-8">
          <div>
            <div className="aspect-square w-full bg-gradient-to-br from-amber-200 to-rose-200 rounded-2xl flex items-center justify-center text-6xl font-bold text-white">
              {creator.fullName.charAt(0)}
            </div>
            <div className="mt-4 space-y-1 text-sm">
              <div className="text-zinc-500">Sektor</div>
              <div className="font-medium">{creator.sector.nameId}</div>
              {creator.subSector && (
                <div className="text-xs text-zinc-600">{creator.subSector}</div>
              )}
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="text-zinc-500">Lokasi</div>
              <div className="font-medium">{creator.city.name}</div>
              <div className="text-xs text-zinc-600">{creator.province.name}</div>
            </div>
            {creator.businessScale && (
              <div className="mt-3 space-y-1 text-sm">
                <div className="text-zinc-500">Skala usaha</div>
                <div className="font-medium">{creator.businessScale}</div>
              </div>
            )}
          </div>
 
          <div>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">{creator.fullName}</h1>
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Terverifikasi
              </span>
            </div>
 
            <div className="mt-3 flex flex-wrap gap-2">
              {creator.gender === "FEMALE" && <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded">Perempuan</span>}
              {creator.isYouth && <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded">Pemuda</span>}
              {creator.isIndigenous && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Komunitas Adat</span>}
              {creator.ethnicGroup && (
                <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">Etnis: {creator.ethnicGroup}</span>
              )}
            </div>
 
            <div className="mt-6 prose prose-zinc max-w-none">
              <p className="text-zinc-800 leading-relaxed">{creator.bio}</p>
            </div>
 
            {creator.businessName && (
              <div className="mt-6 rounded-xl bg-zinc-50 border border-zinc-200 p-4">
                <div className="text-xs text-zinc-500 mb-1">Bisnis / Karya</div>
                <div className="font-semibold">{creator.businessName}</div>
                {creator.yearStarted && (
                  <div className="text-xs text-zinc-600 mt-1">Aktif sejak {creator.yearStarted}</div>
                )}
              </div>
            )}
 
            {creator.works.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Karya</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {creator.works.map((w) => (
                    <div key={w.id} className="rounded-lg border border-zinc-200 p-4">
                      <div className="font-medium">{w.title}</div>
                      {w.year && <div className="text-xs text-zinc-500">{w.year}</div>}
                      {w.description && <p className="text-sm text-zinc-700 mt-2">{w.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {creator.website && (
                <a href={creator.website} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                  Website ↗
                </a>
              )}
              {creator.instagram && (
                <a href={`https://instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                  Instagram ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}