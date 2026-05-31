import { withBasePath } from "@/lib/basePath";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rute & Bernardo · 10.10.2026",
  description:
    "Convite de casamento de Rute & Bernardo — 10 de Outubro de 2026.",
};

export const viewport: Viewport = {
  themeColor: "#5d1e28",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className={`${serif.variable} ${script.variable} font-serif`}
        style={{
          backgroundImage: `url("${withBasePath("/backgrounds/IMG_4368.jpg")}")`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
