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
      "@type": "ProfessionalService",
      "@id": "https://wedo.space/#organization",
      "name": "WEDO",
      "url": "https://wedo.space",
      "logo": "https://wedo.space/og-image.png",
      "image": "https://wedo.space/og-image.png",
      "description": "WEDO is a high-performance creative agency in New Delhi, India. We specialize in cutting-edge Next.js website development, 3D web design, brand identity, and data-driven social media management.",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressCountry": "IN"
      },
      "areaServed": ["India", "United States", "United Kingdom", "Global"],
      "priceRange": "$$$",
      "knowsAbout": [
        "Next.js Development",
        "3D Web Design",
        "React",
        "Three.js",
        "GSAP Animations",
        "Framer Motion",
        "Social Media Strategy",
        "Brand Identity Design",
        "UI/UX Design"
      ],
      "sameAs": [
        "https://instagram.com/wedospace",
        "https://github.com/Akshuu1/Wedo"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@wedo.com",
        "contactType": "customer service"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://wedo.space/#website",
      "url": "https://wedo.space",
      "name": "WEDO Creative Agency",
      "publisher": { "@id": "https://wedo.space/#organization" },
      "inLanguage": "en-IN"
    },
    {
      "@type": "Service",
      "@id": "https://wedo.space/#webdesign",
      "name": "Next.js Website Design & Development",
      "provider": { "@id": "https://wedo.space/#organization" },
      "description": "Custom, high-speed website design and development using Next.js, React, and Three.js. We build conversion-optimized, cinematic websites for bold brands."
    },
    {
      "@type": "Service",
      "@id": "https://wedo.space/#branding",
      "name": "Brand Identity Design",
      "provider": { "@id": "https://wedo.space/#organization" },
      "description": "Comprehensive brand identity creation including logos, typography, color palettes, and visual guidelines that stand out in crowded markets."
    },
    {
      "@type": "Service",
      "@id": "https://wedo.space/#socialmedia",
      "name": "Social Media Management & Strategy",
      "provider": { "@id": "https://wedo.space/#organization" },
      "description": "End-to-end social media management for Instagram and LinkedIn. We create viral content, manage engagement, and drive business growth through social channels."
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${inter.variable}`} data-scroll-behavior="smooth">
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
