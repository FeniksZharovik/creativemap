import Link from "next/link";
 
export const metadata = {
  title: "API Publik — CreativeMap.id",
  description:
    "Dokumentasi API publik CreativeMap.id. Akses data agregat industri kreatif Indonesia secara terbuka, lisensi CC BY 4.0.",
};
 
function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 rounded-lg bg-zinc-900 text-zinc-100 p-4 text-xs overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}
 
export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">API Publik</h1>
        <p className="mt-4 text-lg text-zinc-700 leading-relaxed">
          Data agregat industri kreatif Indonesia yang dapat diakses bebas tanpa
          otentikasi, dengan lisensi <strong>CC BY 4.0</strong> (Creative Commons
          Attribution). Cocok untuk peneliti, jurnalis, dinas kebudayaan, dan
          pembuat kebijakan.
        </p>
      </div>
 
      <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-amber-900">Lisensi & atribusi</h2>
        <p className="mt-2 text-sm text-amber-900">
          Semua respons API dirilis di bawah <strong>CC BY 4.0</strong>. Anda bebas
          menggunakan, memodifikasi, dan mendistribusikan ulang data ini untuk tujuan
          apa pun (termasuk komersial), dengan syarat menyertakan atribusi:
        </p>
        <p className="mt-2 text-sm text-amber-900 italic">
          &ldquo;Sumber: CreativeMap.id (https://creativemap.id) — CC BY 4.0&rdquo;
        </p>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Base URL</h2>
        <CodeBlock>{`https://creativemap.id/api`}</CodeBlock>
        <p className="mt-3 text-sm text-zinc-600">
          Untuk development lokal, ganti dengan{" "}
          <code className="bg-zinc-100 px-1.5 py-0.5 rounded">http://localhost:3000/api</code>.
        </p>
      </section>
 
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Endpoints</h2>
 
        <article className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center rounded bg-emerald-100 text-emerald-800 px-2 py-1 text-xs font-bold tracking-wide">
              GET
            </span>
            <code className="text-sm font-mono">/api/stats</code>
          </div>
          <p className="mt-3 text-zinc-700">
            Mengembalikan statistik agregat: total kreator terverifikasi, distribusi
            per sektor, distribusi per provinsi, dan demografi prioritas IFCD
            (perempuan, pemuda, komunitas adat).
          </p>
 
          <h3 className="mt-5 font-semibold text-sm text-zinc-900">Contoh request</h3>
          <CodeBlock>{`curl https://creativemap.id/api/stats`}</CodeBlock>
 
          <h3 className="mt-5 font-semibold text-sm text-zinc-900">Contoh response</h3>
          <CodeBlock>{`{
  "meta": {
    "generatedAt": "2026-04-28T17:05:16.354Z",
    "license": "CC BY 4.0 — open data",
    "source": "CreativeMap.id (prototype)"
  },
  "totals": {
    "verifiedCreators": 30,
    "womenCreators": 15,
    "youthCreators": 9,
    "indigenousCreators": 5
  },
  "bySector": [
    { "sectorSlug": "music", "sectorName": "Musik", "count": 4 },
    { "sectorSlug": "design", "sectorName": "Desain", "count": 4 }
  ],
  "byProvince": [
    { "provinceCode": "32", "provinceName": "Jawa Barat", "count": 7 },
    { "provinceCode": "34", "provinceName": "DI Yogyakarta", "count": 6 }
  ]
}`}</CodeBlock>
        </article>
 
        <article className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center rounded bg-emerald-100 text-emerald-800 px-2 py-1 text-xs font-bold tracking-wide">
              GET
            </span>
            <code className="text-sm font-mono">/api/creators</code>
          </div>
          <p className="mt-3 text-zinc-700">
            Daftar kreator publik (yang sudah memberi consent untuk dibagikan).
            Mendukung filter via query string.
          </p>
 
          <h3 className="mt-5 font-semibold text-sm text-zinc-900">Query parameters</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left">
                  <th className="py-2 pr-3 font-semibold">Parameter</th>
                  <th className="py-2 pr-3 font-semibold">Tipe</th>
                  <th className="py-2 font-semibold">Deskripsi</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700">
                <tr className="border-b border-zinc-100">
                  <td className="py-2 pr-3 font-mono text-xs">sector</td>
                  <td className="py-2 pr-3">string</td>
                  <td className="py-2">Filter slug sektor (contoh: <code>music</code>)</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-2 pr-3 font-mono text-xs">province</td>
                  <td className="py-2 pr-3">string</td>
                  <td className="py-2">Filter kode provinsi BPS (contoh: <code>34</code>)</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-2 pr-3 font-mono text-xs">gender</td>
                  <td className="py-2 pr-3">string</td>
                  <td className="py-2"><code>female</code> untuk filter perempuan</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-2 pr-3 font-mono text-xs">youth</td>
                  <td className="py-2 pr-3">0 / 1</td>
                  <td className="py-2">1 untuk hanya pemuda 18-30</td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-2 pr-3 font-mono text-xs">indigenous</td>
                  <td className="py-2 pr-3">0 / 1</td>
                  <td className="py-2">1 untuk komunitas adat</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-mono text-xs">limit</td>
                  <td className="py-2 pr-3">number</td>
                  <td className="py-2">Default 50, maksimal 200</td>
                </tr>
              </tbody>
            </table>
          </div>
 
          <h3 className="mt-5 font-semibold text-sm text-zinc-900">Contoh request</h3>
          <CodeBlock>{`# Semua kreator perempuan & pemuda di sektor musik
curl "https://creativemap.id/api/creators?sector=music&gender=female&youth=1"`}</CodeBlock>
 
          <h3 className="mt-5 font-semibold text-sm text-zinc-900">Contoh response</h3>
          <CodeBlock>{`{
  "count": 2,
  "data": [
    {
      "id": "745ae484-35a6-48ab-9b71-768f3fb24394",
      "slug": "sari-dewi-lestari",
      "fullName": "Sari Dewi Lestari",
      "sector": "Musik",
      "sectorSlug": "music",
      "city": "Yogyakarta",
      "province": "DI Yogyakarta",
      "bio": "Komposer gamelan kontemporer …",
      "isFemale": true,
      "isYouth": true,
      "isIndigenous": false,
      "latitude": -7.7972,
      "longitude": 110.3688
    }
  ]
}`}</CodeBlock>
        </article>
      </section>
 
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Kebijakan penggunaan</h2>
        <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside">
          <li>
            Hanya data <strong>agregat publik</strong> dan profil kreator yang sudah
            memberi consent yang tersedia melalui API. Data pribadi (email, nomor HP)
            tidak pernah diekspos.
          </li>
          <li>
            Rate limit: 100 request/menit per IP (production). Tidak ada limit di
            development lokal.
          </li>
          <li>
            Wajib menyertakan atribusi <strong>&ldquo;Sumber: CreativeMap.id&rdquo;</strong>{" "}
            saat menggunakan data ini di publikasi, riset, atau aplikasi lain.
          </li>
          <li>
            Dilarang melakukan re-identifikasi kreator di luar data yang sudah dirilis
            secara publik.
          </li>
        </ul>
      </section>
 
      <section className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-lg font-semibold">Butuh data lebih spesifik?</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Untuk akses data riset (level individu yang sudah dianonimkan, time-series
          panjang, dataset khusus), hubungi tim CreativeMap.id melalui email{" "}
          <a href="mailto:data@creativemap.id" className="text-amber-600 hover:underline">
            data@creativemap.id
          </a>{" "}
          dengan menyertakan tujuan penggunaan dan afiliasi.
        </p>
        <div className="mt-4">
          <Link
            href="/privacy"
            className="text-sm text-amber-600 hover:underline"
          >
            → Baca kebijakan privasi
          </Link>
        </div>
      </section>
    </div>
  );
}