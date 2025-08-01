import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { DeviceOptimizer } from "@/components/device-detector"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Kevin & Véronique - Invitation de Mariage",
  description: "Vous êtes cordialement invités au mariage de Véronique et Kevin",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#f43f5e",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kevin & Véronique",
  },
  formatDetection: {
    telephone: false,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kevin & Véronique" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <DeviceOptimizer>{children}</DeviceOptimizer>
      </body>
    </html>
  )
}
