import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import { fetchAPI } from "../lib/api";

import "../public/css/globals.css";
import "../public/css/shared-sections.css";
import "../public/css/your-community.css";
import "../public/css/solutions.css";
import "../public/css/where.css";
import "../public/css/contact.css";
import "../public/css/about.css";
import "../public/css/culture.css";
import "../public/css/board.css";
import "../public/css/careers.css";
import "../public/css/leadership.css";
import "../public/css/private-venues.css";
import "../public/css/right-of-ways.css";

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
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header layoutData={layout} />
        {children}
        <Footer layoutData={layout} />
        <GoogleAnalytics gaId="G-8Y4WZT9FKT" />
      </body>
    </html>
  );
}
