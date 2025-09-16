import "@pokedex/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Created by Inixio Amillano Casteig",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
      <nav className="bg-white border-gray-200">
        <Link href='/'>
        <img className="h-14 py-2 m-auto" src="/logo.png"/>
        </Link>
      </nav>
        {children}</body>
    </html>
  );
}
