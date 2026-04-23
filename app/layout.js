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
  title: "WEDO | Space Command Agency",
  description: "High-performance digital studio architecting websites, UI/UX, and social identity for the bold.",
  keywords: ["Web Development", "UI/UX Design", "Space Aesthetic", "Next.js"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className={`${inter.className} bg-black text-white antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
