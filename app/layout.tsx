import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Dashboard";
const DESCRIPTION =
  "Overview of your Blog Admin Dashboard — manage posts, users, and account settings from one place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["dashboard", "admin panel", "blog management", "overview", "account"],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${TITLE} · Blog Admin Dashboard`,
    description: DESCRIPTION,
    type: "website",
    siteName: "Blog Admin Dashboard",
  },
  twitter: {
    card: "summary",
    title: `${TITLE} · Blog Admin Dashboard`,
    description: DESCRIPTION,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
