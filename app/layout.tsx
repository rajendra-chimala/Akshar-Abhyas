
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { generateSoftwareApplicationSchema } from "@/lib/seo/metadata";

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aksharabhyas.com"),
  title: {
    default: "Akshar Abhyas - Master Touch Typing | Free Online Typing Tutor & Games",
    template: "%s | Akshar Abhyas",
  },
  description:
    "Free online touch typing tutor, speed test, and typing games platform. Interactive color-coded virtual keyboard, 6 progressive learning levels, 60 lessons, and 100% private local storage.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "typing tutor",
    "typing test",
    "typing speed test",
    "touch typing",
    "learn to type",
    "online typing practice",
    "free typing lessons",
    "typing games",
    "keyboard typing practice",
    "typing accuracy",
    "home row practice",
  ],
  authors: [{ name: "Akshar Abhyas Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aksharabhyas.com",
    title: "Akshar Abhyas - Master Touch Typing",
    description: "Learn touch typing from beginner to advanced with interactive keyboard lessons and free online tests.",
    siteName: "Akshar Abhyas",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Akshar Abhyas - Learn every letter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshar Abhyas - Master Touch Typing",
    description: "Free online touch typing tutor, speed test, and typing games platform.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = generateSoftwareApplicationSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}