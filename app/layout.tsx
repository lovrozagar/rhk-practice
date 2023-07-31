import Navbar from '@/components/navbar/navbar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import ReactQueryProvider from '@/providers/react-query'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trainify',
  description: 'Trainify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider attribute='class' defaultTheme='light'>
            <NextTopLoader />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  )
}
