import Link from "next/link";
import { notFound } from "next/navigation";
import { findCourseBySlug } from "@/lib/repos/courses";
 
type Params = Promise<{ slug: string }>;
 
export const dynamic = "force-dynamic";
 
export default async function CourseDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = await findCourseBySlug(slug);
 
  if (!course || !course.isPublished) notFound();
 
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <Link href="/learn" className="text-sm text-amber-600 hover:text-amber-700">
        ← Kembali ke daftar kursus
      </Link>
 
      <div className="mt-6">
        <div className="aspect-[3/1] bg-gradient-to-br from-amber-300 via-rose-300 to-violet-300 rounded-2xl mb-6" />
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded">{course.level}</span>
          {course.sector && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{course.sector.nameId}</span>
          )}
          {course.forWomen && <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded">Perempuan</span>}
          {course.forYouth && <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded">Pemuda</span>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="mt-3 text-zinc-700 leading-relaxed">{course.description}</p>
      </div>
 
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Daftar Modul</h2>
        <div className="space-y-3">
          {course.modules.map((m, i) => (
            <div key={m.id} className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-sm text-zinc-600 mt-1 whitespace-pre-line">{m.contentMd}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}