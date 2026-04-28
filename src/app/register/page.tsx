export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Daftar sebagai Kreator</h1>
      <p className="mt-3 text-zinc-700">
        Form pendaftaran ini adalah <strong>placeholder prototype</strong>. Pada implementasi penuh,
        form ini akan terhubung ke sistem authentication (NextAuth/Clerk), upload foto profil,
        dan validasi email.
      </p>
 
      <form className="mt-8 space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <div>
          <label className="text-sm font-medium text-zinc-700">Nama lengkap</label>
          <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="cth. Budi Santoso" />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="email@example.com" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700">Sektor utama</label>
            <select className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm">
              <option>Musik</option>
              <option>Desain</option>
              <option>Audio-visual / Sinema</option>
              <option>Visual Arts</option>
              <option>Performing Arts</option>
              <option>Publishing</option>
              <option>Media Arts</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Kota</label>
            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="cth. Yogyakarta" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700">Bio singkat</label>
          <textarea rows={4} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" placeholder="Ceritakan karya & spesialisasi Anda..." />
        </div>
        <button
          type="button"
          disabled
          className="w-full rounded-md bg-zinc-300 text-zinc-600 px-4 py-2 text-sm font-semibold cursor-not-allowed"
        >
          Daftar (disabled — prototype only)
        </button>
      </form>
    </div>
  );
}