import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {cms} from '@/cms'
import {Footer} from '@/components/footer'
import {Header} from '@/components/header'
import {ThemeProvider} from '@/components/providers/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Vetra - Minimalist Blog',
  description:
    'A clean, minimal blog template for sharing your thoughts and ideas.',
  keywords: ['blog', 'minimalist', 'design', 'technology', 'lifestyle'],
  authors: [{name: 'Vetra'}],
  creator: 'Vetra',
  metadataBase: new URL('https://vetra-blog.com'),
  openGraph: {
    title: 'Vetra - Minimalist Blog',
    description:
      'A clean, minimal blog template for sharing your thoughts and ideas.',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vetra - Minimalist Blog',
    description:
      'A clean, minimal blog template for sharing your thoughts and ideas.'
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen bg-white dark:bg-gray-950">
            <Header />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <cms.previews widget />
      </body>
    </html>
  )
}
