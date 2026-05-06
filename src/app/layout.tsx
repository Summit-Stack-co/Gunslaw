import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createMetadata } from "@/lib/metadata";
import { theme } from "@/lib/theme";

import "./globals.css";

export const metadata: Metadata = {
  ...createMetadata(),
  icons: {
    icon: [{ url: theme.brand.logoSrc, type: "image/png" }],
    apple: [{ url: theme.brand.logoSrc, type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

