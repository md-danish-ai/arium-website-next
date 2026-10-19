import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@ui-layout/Header";
import Footer from "@ui-layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import { fetchAPI } from "@lib/api";
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
  const pageData = await fetchAPI("/api/pages?filters[slug][$eq]=home&populate[SeoFields][populate]=*");
  const seo = pageData?.data?.[0]?.SeoFields;

  return {
    title: seo?.metaTitle || "Arium Networks",
    description: seo?.metaDescription || "",
    openGraph: {
      title: seo?.ogTitle || "Arium Networks",
      description: seo?.ogDescription || "",
      type: (seo?.ogType || "website") as "website",
      siteName: seo?.ogSiteName || "Arium Networks",
      ...(seo?.ogImage?.url && {
        images: [
          {
            url: seo.ogImage.url.startsWith("http")
              ? seo.ogImage.url
              : `http://arium-strapi-alb-dev-1719989505.ap-south-1.elb.amazonaws.com${seo.ogImage.url}`,
          },
        ],
      }),
    },
    robots: {
      index: !seo?.preventIndexing,
      follow: !seo?.preventIndexing,
    },
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await fetchAPI("/api/global-layout?populate[navigation][populate]=*&populate[footerColumn][populate][footerLinks][populate]=*&populate[socialLinks][populate]=*");
  const layout = globalData?.data;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-teal focus:text-midnight focus:font-medium focus:rounded focus:outline-none">
          Skip to main content
        </a>
        <Header layoutData={layout} />
        <main id="main-content">
          <PageAnimations />
          {children}
        </main>
        <Footer layoutData={layout} />
        <GoogleAnalytics gaId="G-8Y4WZT9FKT" />
      </body>
    </html>
  );
}
