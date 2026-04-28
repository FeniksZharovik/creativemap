import { findCreatorsForMap } from "@/lib/repos/creators";
import { findAllSectors } from "@/lib/repos/sectors";
import MapView from "./MapView";
 
export const dynamic = "force-dynamic";
 
export default async function MapPage() {
  const [creators, sectors] = await Promise.all([
    findCreatorsForMap(),
    findAllSectors(),
  ]);
 
  const points = creators
    .filter((c) => c.latitude !== null && c.longitude !== null && c.isPublic)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.fullName,
      sectorId: c.sectorId,
      sectorName: c.sector.nameId,
      city: c.city.name,
      province: c.province.name,
      bio: c.bio ?? "",
      lat: c.latitude as number,
      lng: c.longitude as number,
      isFemale: c.gender === "FEMALE",
      isYouth: c.isYouth,
      isIndigenous: c.isIndigenous,
    }));
 
  return (
    <div>
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight">Peta Pelaku Kreatif Indonesia</h1>
          <p className="mt-2 text-zinc-600 max-w-2xl">
            {points.length} kreator terverifikasi dari {sectors.length} sektor
            tersebar di seluruh Indonesia. Klik marker untuk melihat detail.
          </p>
        </div>
      </div>
      <MapView points={points} sectors={sectors.map((s) => ({ id: s.id, slug: s.slug, nameId: s.nameId }))} />
    </div>
  );
}