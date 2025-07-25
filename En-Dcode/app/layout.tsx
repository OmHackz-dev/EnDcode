import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EnDcode by OmHackz - Universal Text Encoder/Decoder",
  description:
    "Encode and decode text in 40+ formats including Base64, Hex, Binary, Brainfuck, and more. Free online tool with API access.",
  keywords: "encoder, decoder, base64, hex, binary, text encoding, api, online tool",
  authors: [{ name: "OmHackz" }],
  creator: "OmHackz",
  publisher: "OmHackz",
  robots: "index, follow",
  openGraph: {
    title: "EnDcode by OmHackz - Universal Text Encoder/Decoder",
    description: "Encode and decode text in 40+ formats including Base64, Hex, Binary, Brainfuck, and more.",
    url: "https://en-dcode.vercel.app",
    siteName: "EnDcode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnDcode by OmHackz - Universal Text Encoder/Decoder",
    description: "Encode and decode text in 40+ formats including Base64, Hex, Binary, Brainfuck, and more.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://en-dcode.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
