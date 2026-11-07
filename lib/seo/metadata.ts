import { Metadata } from "next";

const SITE_URL = "https://aksharabhyas.com";
const SITE_NAME = "Akshar Abhyas";

export function generateSeoMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const defaultKeywords = [
    "typing test",
    "typing speed test",
    "touch typing",
    "typing practice",
    "learn typing online",
    "keyboard typing practice",
    "free typing tutor",
    "typing games",
    "typing speed test WPM",
    "home row typing",
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: "Akshar Abhyas - Master Touch Typing",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Akshar Abhyas",
    operatingSystem: "Any",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Interactive Virtual Keyboard with color-coded finger zones",
      "Real-time WPM, CPM, and Accuracy metrics calculation",
      "Structured 6-level typing curriculum from beginner to expert",
      "5 interactive typing games (Word Rain, Speed Challenge, Text Survival, Falling Letters, Word Accuracy)",
      "Zero registration, 100% private client-side browser storage",
      "Hardware keyboard tester with live key highlight",
      "Downloadable and printable self-practice certificate generator",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "अक्षर अभ्यास",
    url: SITE_URL,
    description:
      "Free online touch typing tutor, speed test, and typing games platform. Interactive color-coded virtual keyboard, 6 progressive learning levels, 60 lessons, and 100% private local storage.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/typing-tips?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.item}`,
    })),
  };
}

