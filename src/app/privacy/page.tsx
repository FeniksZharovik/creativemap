import Link from "next/link";
 
export const metadata = {
  title: "Kebijakan Privasi — CreativeMap.id",
  description:
    "Kebijakan privasi CreativeMap.id: bagaimana data kreator dikumpulkan, disimpan, dibagikan, dan dilindungi.",
};
 
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Kebijakan Privasi</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Versi 0.1 — berlaku untuk fase prototype. Akan diperbarui sebelum peluncuran
          publik.
        </p>
      </div>
 
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-10">
        <p className="text-sm text-amber-900">
          <strong>Ringkasan:</strong> Kami hanya menampilkan data kreator yang sudah
          secara eksplisit memberi consent. Data pribadi sensitif (email, nomor HP,
          alamat lengkap) tidak pernah ditampilkan publik atau diekspos via API.
        </p>
      </div>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">1. Data yang kami kumpulkan</h2>
        <p className="mt-3 text-zinc-700">
          Saat kreator mendaftar, kami mengumpulkan data berikut:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="font-semibold text-sm">Data publik (ditampilkan)</h3>
            <ul className="mt-2 text-sm text-zinc-700 list-disc list-inside space-y-1">
              <li>Nama lengkap atau nama panggung</li>
              <li>Sektor & sub-sektor kreatif</li>
              <li>Kota / provinsi (bukan alamat lengkap)</li>
              <li>Bio singkat</li>
              <li>Karya unggulan (judul, tahun, deskripsi)</li>
              <li>Tautan publik: website, Instagram, dsb.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
            <h3 className="font-semibold text-sm text-rose-900">Data privat (tidak ditampilkan)</h3>
            <ul className="mt-2 text-sm text-rose-900 list-disc list-inside space-y-1">
              <li>Email & password (di-hash)</li>
              <li>Nomor HP</li>
              <li>Alamat lengkap</li>
              <li>Tahun lahir (hanya flag <code>is_youth</code> yang ditampilkan)</li>
              <li>Status komunitas adat (opt-in & dapat disembunyikan)</li>
              <li>Status disabilitas</li>
            </ul>
          </div>
        </div>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">2. Tujuan penggunaan data</h2>
        <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside">
          <li>
            <strong>Pemetaan publik:</strong> Menampilkan profil kreator pada peta &
            direktori, dengan persetujuan kreator.
          </li>
          <li>
            <strong>Statistik agregat:</strong> Menghasilkan data jumlah & distribusi
            (per sektor, provinsi, gender, demografi) untuk penelitian dan kebijakan.
            Statistik ini selalu agregat — tidak pernah individual.
          </li>
          <li>
            <strong>Capacity building:</strong> Mengirim notifikasi tentang modul
            belajar, hibah, dan kesempatan yang relevan dengan sektor kreator.
          </li>
          <li>
            <strong>Pelaporan dampak:</strong> Mengukur dampak platform bagi prioritas
            IFCD (gender, pemuda, komunitas adat) dalam laporan agregat anonim.
          </li>
        </ul>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">3. Dasar legal</h2>
        <p className="mt-3 text-zinc-700">
          Pengolahan data dilakukan berdasarkan:
        </p>
        <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside">
          <li>
            <strong>Consent eksplisit</strong> dari kreator saat pendaftaran (kolom{" "}
            <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">consent_to_share</code>).
          </li>
          <li>
            <strong>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong>{" "}
            Republik Indonesia.
          </li>
          <li>
            <strong>UNESCO 2005 Convention</strong> on the Protection and Promotion of
            the Diversity of Cultural Expressions, terutama prinsip menghormati
            pengetahuan dan ekspresi budaya komunitas.
          </li>
        </ul>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">4. Pembagian data</h2>
        <p className="mt-3 text-zinc-700">
          Kami <strong>tidak menjual</strong> data kreator kepada pihak ketiga manapun.
          Data dibagikan hanya dalam situasi berikut:
        </p>
        <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside">
          <li>
            Profil publik & data agregat dapat diakses melalui website dan{" "}
            <Link href="/api-docs" className="text-amber-600 hover:underline">API publik</Link>{" "}
            (lisensi CC BY 4.0).
          </li>
          <li>
            Mitra resmi (dinas kebudayaan, lembaga riset, UNESCO) dapat menerima data
            agregat anonim untuk tujuan kebijakan & riset.
          </li>
          <li>
            Kewajiban hukum: jika diminta otoritas berwenang berdasarkan perintah
            hukum yang sah.
          </li>
        </ul>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">5. Hak Anda sebagai kreator</h2>
        <p className="mt-3 text-zinc-700">
          Sesuai UU PDP, Anda berhak untuk:
        </p>
        <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside">
          <li><strong>Mengakses</strong> data pribadi yang kami simpan tentang Anda.</li>
          <li><strong>Memperbarui</strong> atau memperbaiki data yang tidak akurat.</li>
          <li><strong>Menghapus</strong> akun & data Anda kapan saja (right to be forgotten).</li>
          <li><strong>Menarik consent</strong> untuk publikasi profil — profil otomatis disembunyikan.</li>
          <li><strong>Membatasi</strong> data tertentu (misal: sembunyikan status komunitas adat).</li>
          <li><strong>Mengekspor</strong> data Anda dalam format JSON (data portability).</li>
          <li><strong>Mengajukan keluhan</strong> ke otoritas pelindungan data jika hak Anda dilanggar.</li>
        </ul>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">6. Keamanan data</h2>
        <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside">
          <li>Password di-<em>hash</em> menggunakan algoritma kuat (bcrypt/argon2) — tidak pernah disimpan plaintext.</li>
          <li>Koneksi database menggunakan TLS untuk komunikasi terenkripsi.</li>
          <li>Akses ke database dibatasi pada tim teknis dengan prinsip <em>least privilege</em>.</li>
          <li>Audit log mencatat semua perubahan data pada tabel sensitif.</li>
          <li>Backup harian disimpan terenkripsi, dengan retensi 30 hari.</li>
        </ul>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">7. Retensi data</h2>
        <p className="mt-3 text-zinc-700">
          Data kreator disimpan selama akun aktif. Setelah penghapusan akun, data
          pribadi dihapus dalam <strong>30 hari</strong>. Data agregat anonim tetap
          dipertahankan untuk integritas time-series riset.
        </p>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">8. Kreator di bawah umur</h2>
        <p className="mt-3 text-zinc-700">
          CreativeMap.id ditujukan untuk pengguna usia 17 tahun ke atas. Kreator berusia
          17 tahun atau lebih muda harus mendaftar dengan persetujuan orang tua/wali.
        </p>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">9. Cookie & analytics</h2>
        <p className="mt-3 text-zinc-700">
          Kami menggunakan cookie minimal untuk session login dan menyimpan preferensi
          bahasa. Untuk analytics, kami menggunakan tool yang menghormati privasi
          (Plausible/PostHog) tanpa fingerprinting individual.
        </p>
      </section>
 
      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">10. Perubahan kebijakan</h2>
        <p className="mt-3 text-zinc-700">
          Jika ada perubahan material pada kebijakan ini, kreator akan diberi tahu via
          email minimal 14 hari sebelum berlaku.
        </p>
      </section>
 
      <section className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-lg font-semibold">Pertanyaan atau permintaan</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Untuk menggunakan hak Anda, atau jika punya pertanyaan tentang kebijakan ini,
          hubungi <em>Data Protection Officer</em> kami:
        </p>
        <p className="mt-3 text-sm">
          📧{" "}
          <a href="mailto:privacy@creativemap.id" className="text-amber-600 hover:underline">
            privacy@creativemap.id
          </a>
        </p>
        <p className="mt-3 text-xs text-zinc-500">
          Terakhir diperbarui: 28 April 2026
        </p>
      </section>
    </div>
  );
}