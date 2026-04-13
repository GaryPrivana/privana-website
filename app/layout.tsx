import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600'],
  display: 'swap'
});

const siteUrl = 'https://www.privana.club';

export const metadata: Metadata = {
  title: 'Privana | The Operating System for Modern Private Clubs',
  description:
    'Privana is a premium club management platform unifying operations, reservations, hospitality, membership, and CRM for modern private clubs.',
  keywords: [
    'private club software',
    'club management platform',
    'golf club operations',
    'hospitality technology',
    'member experience platform'
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Privana | Modern Club Management Platform',
    description:
      'Operational excellence across members, bookings, hospitality, finance, CRM, and club experience.',
    url: siteUrl,
    siteName: 'Privana',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Privana platform preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privana',
    description:
      'The operating system for modern private clubs focused on service excellence and operational clarity.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
