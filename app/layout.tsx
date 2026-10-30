import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@ui-layout/navbar";
import Footer from "@ui-layout/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fetchAPI } from "@lib/api";
import { mapNavbarData, mapFooterData } from "@services/mappers";
import { getPageMetadata } from "@utils";
import { HOME_SEO_FALLBACK } from "@data";
import PageAnimations from "@ui-animations/PageAnimations";

import "@public/css/globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", HOME_SEO_FALLBACK);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await fetchAPI(
    "/api/global-layout?populate[navigation][populate]=*&populate[footerColumn][populate][footerLinks][populate]=*&populate[socialLinks][populate]=*"
  );
  const layout = globalData?.data;

  const navbarProps = mapNavbarData(layout);
  const footerProps = mapFooterData(layout);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-teal focus:text-midnight focus:font-medium focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar {...navbarProps} />
        <main id="main-content">
          <PageAnimations />
          {children}
        </main>
        <Footer {...footerProps} />
        <GoogleAnalytics gaId="G-8Y4WZT9FKT" />
      </body>
    </html>
  );
}
