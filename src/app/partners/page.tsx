import Link from "next/link";
 
export const metadata = {
  title: "Mitra — CreativeMap.id",
  description:
    "Mitra strategis dan pendukung CreativeMap.id, platform pemetaan dan pemberdayaan industri kreatif Indonesia.",
};
 
const PARTNER_GROUPS = [
  {
    title: "Mitra Pemerintah",
    description:
      "Lembaga pemerintah yang mendukung pengembangan ekosistem industri kreatif berbasis data.",
    items: [
      {
        name: "Kementerian Ekonomi Kreatif",
        role: "Regulator & pemilik kebijakan ekonomi kreatif nasional",
        status: "Target kemitraan",
      },
      {
        name: "Kementerian Kebudayaan",
        role: "Mitra strategis untuk Konvensi UNESCO 2005",
        status: "Target kemitraan",
      },
      {
        name: "Dinas Kebudayaan & Pariwisata Daerah",
        role: "Pemilik data lokal pelaku kreatif provinsi & kabupaten/kota",
        status: "Target kemitraan",
      },
      {
        name: "Badan Pusat Statistik (BPS)",
        role: "Validasi metodologi data agregat ekonomi kreatif",
        status: "Target kemitraan",
      },
    ],
  },
  {
    title: "Mitra Internasional",
    description:
      "Lembaga internasional yang menjadi rujukan kebijakan budaya dan pendanaan kreatif global.",
    items: [
      {
        name: "UNESCO IFCD",
        role: "Penyelaras prioritas (gender, pemuda, komunitas adat) & potensi pendanaan",
        status: "Aligned dengan prioritas",
      },
      {
        name: "British Council Indonesia",
        role: "Capacity building & program pertukaran kreator",
        status: "Target kemitraan",
      },
      {
        name: "Goethe-Institut Indonesien",
        role: "Pemberdayaan seniman & dialog lintas budaya",
        status: "Target kemitraan",
      },
    ],
  },
  {
    title: "Mitra Akademik",
    description:
      "Perguruan tinggi & lembaga riset untuk validasi data, riset, dan pengembangan modul.",
    items: [
      {
        name: "Program Studi Industri Kreatif",
        role: "Riset, magang, kontribusi konten edukasi",
        status: "Terbuka untuk kolaborasi",
      },
      {
        name: "Lembaga Riset Budaya",
        role: "Validasi metodologi pemetaan & studi dampak",
        status: "Terbuka untuk kolaborasi",
      },
    ],
  },
  {
    title: "Mitra Komunitas",
    description:
      "Komunitas pelaku kreatif yang menjadi sumber data dan penerima manfaat utama platform.",
    items: [
      {
        name: "Komunitas Sektor Kreatif",
        role: "Sumber data, peer-review profil kreator, partisipasi forum",
        status: "Terbuka untuk kolaborasi",
      },
      {
        name: "Komunitas Adat & Indigenous",
        role: "Penjaga warisan budaya, fokus prioritas IFCD",
        status: "Terbuka untuk kolaborasi",
      },
      {
        name: "Kolektif Perempuan Kreator",
        role: "Mentor & penerima manfaat program kesetaraan gender",
        status: "Terbuka untuk kolaborasi",
      },
    ],
  },
  {
    title: "Mitra Teknologi",
    description:
      "Penyedia infrastruktur teknis untuk hosting, tooling, dan ekosistem open source.",
    items: [
      {
        name: "OpenStreetMap",
        role: "Data peta dasar gratis & terbuka (Leaflet tile)",
        status: "Aktif dipakai",
      },
      {
        name: "PostgreSQL",
        role: "Database open source untuk data terbuka kreator",
        status: "Aktif dipakai",
      },
      {
        name: "Vercel / Cloud Hosting",
        role: "Infrastruktur hosting & CI/CD",
        status: "Target kemitraan",
      },
    ],
  },
];
 
export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Mitra</h1>
        <p className="mt-4 text-lg text-zinc-700 max-w-3xl leading-relaxed">
          CreativeMap.id dibangun sebagai infrastruktur publik bersama. Kami terbuka
          untuk berkolaborasi dengan pemerintah, lembaga internasional, akademisi,
          komunitas, dan mitra teknologi yang memiliki visi serupa: memperkuat ekosistem
          industri kreatif Indonesia melalui data terbuka.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-900">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Status saat ini: prototype — daftar mitra di bawah ini adalah target/aspirasi
        </div>
      </div>
 
      <div className="space-y-10">
        {PARTNER_GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-semibold tracking-tight">{group.title}</h2>
            <p className="mt-2 text-zinc-600 max-w-2xl">{group.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {group.items.map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-zinc-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-zinc-900">{p.name}</h3>
                    <span className="text-[10px] uppercase tracking-wide bg-zinc-100 text-zinc-700 px-2 py-1 rounded">
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-700">{p.role}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
 
      <section className="mt-14 rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 border border-amber-200 p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Tertarik menjadi mitra?</h2>
        <p className="mt-3 text-zinc-700 max-w-2xl">
          Kami sedang mencari mitra untuk pilot di 1-3 kota dengan 50-100 kreator nyata.
          Cocok untuk dinas kebudayaan daerah, kolektif kreator, perguruan tinggi, atau
          lembaga riset yang ingin mengukur dampak ekonomi kreatif berbasis data.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="mailto:halo@creativemap.id"
            className="inline-flex items-center rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-800"
          >
            Hubungi kami
          </a>
          <Link
            href="/about"
            className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-50"
          >
            Tentang platform
          </Link>
        </div>
      </section>
    </div>
  );
}