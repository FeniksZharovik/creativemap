import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'CreativeMap.id — Platform Pemetaan Industri Kreatif Indonesia',
  description:
    'Platform pemetaan, pemberdayaan, dan akses pasar untuk pelaku industri kreatif Indonesia. Selaras dengan prioritas UNESCO IFCD dan Konvensi 2005.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='id' className={`${inter.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col bg-zinc-50 text-zinc-900'>
        <header className='sticky top-0 z-50 bg-white border-b border-zinc-200'>
          <nav className='mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3'>
            <Link href='/' className='flex items-center gap-2'>
              <span className='inline-flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 to-rose-500 text-white font-bold'>
                C
              </span>
              <span className='font-semibold tracking-tight text-base sm:text-lg'>
                CreativeMap<span className='text-amber-600'>.id</span>
              </span>
            </Link>
            <div className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-700'>
              <Link href='/map' className='hover:text-amber-600'>
                Peta
              </Link>
              <Link href='/creators' className='hover:text-amber-600'>
                Pelaku Kreatif
              </Link>
              <Link href='/dashboard' className='hover:text-amber-600'>
                Dashboard
              </Link>
              <Link href='/learn' className='hover:text-amber-600'>
                Belajar
              </Link>
              <Link href='/about' className='hover:text-amber-600'>
                Tentang
              </Link>
            </div>
            <div className='flex items-center gap-2'>
              <Link
                href='/register'
                className='hidden sm:inline-flex items-center rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800'
              >
                Daftar
              </Link>
            </div>
          </nav>
        </header>

        <main className='flex-1'>{children}</main>

        <footer className='bg-zinc-900 text-zinc-300'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4'>
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='inline-flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 to-rose-500 text-white font-bold'>
                  C
                </span>
                <span className='font-semibold tracking-tight text-white'>
                  CreativeMap.id
                </span>
              </div>
              <p className='text-sm text-zinc-400 max-w-md'>
                Platform pemetaan dan pemberdayaan pelaku industri kreatif
                Indonesia. Selaras dengan UNESCO 2005 Convention on the
                Protection and Promotion of the Diversity of Cultural
                Expressions.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-white mb-3 text-sm'>
                Platform
              </h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='/map' className='hover:text-white'>
                    Peta Interaktif
                  </Link>
                </li>
                <li>
                  <Link href='/creators' className='hover:text-white'>
                    Direktori Kreator
                  </Link>
                </li>
                <li>
                  <Link href='/dashboard' className='hover:text-white'>
                    Dashboard Data
                  </Link>
                </li>
                <li>
                  <Link href='/learn' className='hover:text-white'>
                    Modul Belajar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-white mb-3 text-sm'>Tentang</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='/about' className='hover:text-white'>
                    Misi & Visi
                  </Link>
                </li>
                <li>
                  <Link href='/partners' className='hover:text-white'>
                    Mitra
                  </Link>
                </li>
                <li>
                  <Link href='/api-docs' className='hover:text-white'>
                    API Publik
                  </Link>
                </li>
                <li>
                  <Link href='/privacy' className='hover:text-white'>
                    Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-zinc-800'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 py-4 text-xs text-zinc-500 flex flex-col sm:flex-row justify-between gap-2'>
              <span>
                © 2026 CreativeMap.id — Open data untuk industri kreatif
                Indonesia.
              </span>
              <span>Prototype — bukan produk produksi.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
