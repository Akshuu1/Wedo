import { Syne, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata = {
  title: "WEDO | Website Design, Social Media & Branding Agency India",
  description: "WEDO is a high-performance digital agency offering website design, UI/UX design, social media management, brand identity, and SEO services. We build bold digital assets for businesses that want to dominate online.",
  keywords: [
    "wedo agency", "wedo digital", "website design agency India", "social media management India",
    "UI UX design agency", "brand identity design", "web development agency",
    "digital marketing agency India", "Next.js agency", "affordable website design",
    "social media handler", "Instagram management agency", "startup website design",
    "creative agency India", "wedo website", "wedo design"
  ],
  authors: [{ name: "WEDO Agency", url: "https://wedo.space" }],
  metadataBase: new URL("https://wedo.space"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "WEDO | Website Design, Social Media & Branding Agency",
    description: "We build high-performance websites, manage social media, and craft bold brand identities for businesses that want to lead their market.",
    url: "https://wedo.space",
    siteName: "WEDO",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "WEDO Digital Agency" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WEDO | Website Design, Social Media & Branding Agency",
    description: "We build high-performance websites, manage social media, and craft bold brand identities.",
    creator: "@wedospace",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wedo.space/#organization",
      "name": "WEDO",
      "url": "https://wedo.space",
      "logo": "https://wedo.space/og-image.png",
      "description": "WEDO is a digital agency specialising in website design, social media management, UI/UX design, and brand identity.",
      "foundingDate": "2024",
      "areaServed": "India",
      "serviceType": ["Website Design", "UI/UX Design", "Social Media Management", "Brand Identity", "SEO", "Web Development"],
      "sameAs": ["https://instagram.com/wedospace", "https://github.com/Akshuu1/Wedo"]
    },
    {
      "@type": "WebSite",
      "@id": "https://wedo.space/#website",
      "url": "https://wedo.space",
      "name": "WEDO",
      "publisher": { "@id": "https://wedo.space/#organization" }
    },
    {
      "@type": "Service",
      "name": "Website Design & Development",
      "provider": { "@id": "https://wedo.space/#organization" },
      "description": "Custom website design and development using Next.js and modern technologies for businesses and startups in India."
    },
    {
      "@type": "Service",
      "name": "Social Media Management",
      "provider": { "@id": "https://wedo.space/#organization" },
      "description": "Social media strategy, content creation, and Instagram/LinkedIn management for brands."
    }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.className} bg-black text-white antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
