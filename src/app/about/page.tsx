import Link from "next/link";
 
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Tentang CreativeMap.id</h1>
      <p className="mt-4 text-lg text-zinc-700 leading-relaxed">
        Platform pemetaan dan pemberdayaan pelaku industri kreatif Indonesia, dirancang
        untuk mendukung kebijakan budaya berbasis data dan memperluas akses pasar untuk kreator —
        dengan fokus khusus pada perempuan, pemuda, dan komunitas adat.
      </p>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Misi</h2>
        <p className="mt-3 text-zinc-700">
          Membangun infrastruktur data terbuka untuk industri kreatif Indonesia agar
          kebijakan, pendanaan, dan pelatihan dapat tersalur dengan tepat sasaran.
        </p>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Selaras dengan UNESCO IFCD</h2>
        <p className="mt-3 text-zinc-700">
          Proyek ini disusun mengikuti tipe proyek yang didanai oleh{" "}
          <a
            href="https://www.unesco.org/creativity/en/international-fund-cultural-diversity"
            className="text-amber-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            International Fund for Cultural Diversity (IFCD)
          </a>{" "}
          dari UNESCO, di bawah Konvensi 2005 tentang Perlindungan dan Promosi Keragaman
          Ekspresi Budaya.
        </p>
        <ul className="mt-4 list-disc list-inside space-y-1 text-zinc-700">
          <li>Mapping & decision-making tools untuk perencanaan kebijakan</li>
          <li>Capacity building melalui modul belajar online</li>
          <li>Akses pasar nasional & internasional</li>
          <li>Kesetaraan gender, partisipasi pemuda, dan komunitas adat</li>
          <li>Pengembangan industri kreatif di ranah digital</li>
        </ul>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Open Source & Open Data</h2>
        <p className="mt-3 text-zinc-700">
          Seluruh kode platform tersedia secara terbuka. Data agregat publik dapat
          diakses melalui API tanpa perlu otentikasi, dengan tetap melindungi data
          pribadi kreator.
        </p>
      </section>
 
      <div className="mt-12 flex gap-3">
        <Link
          href="/register"
          className="inline-flex items-center rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-semibold hover:bg-zinc-800"
        >
          Daftar
        </Link>
        <Link
          href="/map"
          className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold hover:bg-zinc-50"
        >
          Jelajahi Peta
        </Link>
      </div>
    </div>
  );
}