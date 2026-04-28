"use client";
 
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
 
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((m) => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
 
type Point = {
  id: string;
  slug: string;
  name: string;
  sectorId: string;
  sectorName: string;
  city: string;
  province: string;
  bio: string;
  lat: number;
  lng: number;
  isFemale: boolean;
  isYouth: boolean;
  isIndigenous: boolean;
};
 
type Sector = { id: string; slug: string; nameId: string };
 
const SECTOR_COLORS: Record<string, string> = {
  "audio-visual-cinema": "#ef4444",
  design: "#f59e0b",
  "media-arts": "#8b5cf6",
  music: "#10b981",
  "performing-arts": "#ec4899",
  publishing: "#3b82f6",
  "visual-arts": "#f97316",
  kriya: "#14b8a6",
  fashion: "#a855f7",
  culinary: "#84cc16",
};
 
export default function MapView({ points, sectors }: { points: Point[]; sectors: Sector[] }) {
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [filterFemale, setFilterFemale] = useState(false);
  const [filterYouth, setFilterYouth] = useState(false);
  const [filterIndigenous, setFilterIndigenous] = useState(false);
 
  const filtered = useMemo(() => {
    return points.filter((p) => {
      if (selectedSector !== "all" && p.sectorId !== selectedSector) return false;
      if (filterFemale && !p.isFemale) return false;
      if (filterYouth && !p.isYouth) return false;
      if (filterIndigenous && !p.isIndigenous) return false;
      return true;
    });
  }, [points, selectedSector, filterFemale, filterYouth, filterIndigenous]);
 
  return (
    <div className="grid lg:grid-cols-[300px_1fr]">
      <aside className="bg-white border-r border-zinc-200 p-4 lg:p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 className="font-semibold text-sm text-zinc-700 mb-3">Filter Sektor</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedSector("all")}
              className={`w-full text-left text-sm px-3 py-1.5 rounded ${
                selectedSector === "all" ? "bg-zinc-900 text-white" : "hover:bg-zinc-100"
              }`}
            >
              Semua Sektor ({points.length})
            </button>
            {sectors.map((s) => {
              const count = points.filter((p) => p.sectorId === s.id).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSector(s.id)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded flex items-center gap-2 ${
                    selectedSector === s.id ? "bg-zinc-900 text-white" : "hover:bg-zinc-100"
                  }`}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: SECTOR_COLORS[s.slug] ?? "#888" }}
                  />
                  <span className="flex-1">{s.nameId}</span>
                  <span className="text-xs opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
 
        <div>
          <h3 className="font-semibold text-sm text-zinc-700 mb-3">Prioritas IFCD</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filterFemale}
                onChange={(e) => setFilterFemale(e.target.checked)}
                className="rounded border-zinc-300"
              />
              <span>Kreator perempuan</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filterYouth}
                onChange={(e) => setFilterYouth(e.target.checked)}
                className="rounded border-zinc-300"
              />
              <span>Pemuda (18-30)</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filterIndigenous}
                onChange={(e) => setFilterIndigenous(e.target.checked)}
                className="rounded border-zinc-300"
              />
              <span>Komunitas adat</span>
            </label>
          </div>
        </div>
 
        <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900">
          Menampilkan <strong>{filtered.length}</strong> dari <strong>{points.length}</strong> kreator.
        </div>
      </aside>
 
      <div className="h-[calc(100vh-180px)] min-h-[500px]">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <MapContainer center={[-2.5489, 118.0149]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((p) => {
            const sectorSlug = sectors.find((s) => s.id === p.sectorId)?.slug ?? "";
            const color = SECTOR_COLORS[sectorSlug] ?? "#888";
            return (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lng]}
                radius={8}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.8, weight: 2 }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      {p.sectorName} · {p.city}, {p.province}
                    </div>
                    <p className="text-xs mt-2 text-zinc-700">{p.bio}</p>
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {p.isFemale && <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">Perempuan</span>}
                      {p.isYouth && <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded">Pemuda</span>}
                      {p.isIndigenous && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">Komunitas Adat</span>}
                    </div>
                    <Link
                      href={`/creators/${p.slug}`}
                      className="block mt-3 text-xs font-semibold text-amber-600 hover:text-amber-700"
                    >
                      Lihat profil →
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}