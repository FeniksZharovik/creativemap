import Link from "next/link";
import { findAllCourses } from "@/lib/repos/courses";
 
export const dynamic = "force-dynamic";
 
export default async function LearnPage() {
  const courses = await findAllCourses();
 
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Modul Belajar</h1>
        <p className="mt-2 text-zinc-600">
          Capacity building untuk pelaku industri kreatif Indonesia. Modul gratis, dapat diakses
          dari mana saja, dengan fokus pada perempuan kreator dan pemuda — selaras dengan prioritas
          UNESCO IFCD.
        </p>
      </div>
 
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/learn/${c.slug}`}
            className="group rounded-xl border border-zinc-200 bg-white overflow-hidden hover:shadow-md transition"
          >
            <div className="aspect-video bg-gradient-to-br from-amber-200 via-rose-200 to-violet-200" />
            <div className="p-5">
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                  {c.level}
                </span>
                {c.sector && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {c.sector.nameId}
                  </span>
                )}
                {c.forWomen && (
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded">Perempuan</span>
                )}
                {c.forYouth && (
                  <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded">Pemuda</span>
                )}
              </div>
              <h3 className="font-semibold text-zinc-900 group-hover:text-amber-700 line-clamp-2">
                {c.title}
              </h3>
              <p className="text-sm text-zinc-600 mt-2 line-clamp-3">{c.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{c.enrollmentCount} peserta</span>
                {c.durationMin && <span>~{Math.round(c.durationMin / 60)} jam</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}