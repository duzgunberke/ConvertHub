import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navigation } from "@/components/ui/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConvertHub - Professional Developer Tools",
  description: "A powerful platform for text conversion, encoding, hashing and data transformation. Built for developers by developers.",
  keywords: "base64, encoding, hash, converter, developer tools, api",
  authors: [{ name: "ConvertHub Team" }],
  openGraph: {
    title: "ConvertHub - Professional Developer Tools",
    description: "Powerful conversion tools with comprehensive API",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <Navigation />
            {children}
          </Providers>
        </body>
      </html>
    );
}