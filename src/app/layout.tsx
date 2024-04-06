import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Koinbx Next App',
  description: 'Generated data to add in firebase database ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body className="sticky tw-overflow-y-hidden">{children}</body>
  </html>
  )
}
