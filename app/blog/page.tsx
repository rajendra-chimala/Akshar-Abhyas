import React from "react";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { BlogHubClient } from "./BlogHubClient";

export const metadata: Metadata = generateSeoMetadata({
  title: "Touch Typing Blog & Guides: Speed Benchmarks, Keyboards & Practice Tips",
  description: "Explore in-depth typing guides, 10FastFingers and Monkeytype alternatives, WPM speed benchmarks by age and profession, mechanical switch reviews, and touch typing blueprints.",
  path: "/blog",
  keywords: [
    "typing blog",
    "touch typing guides",
    "10fastfingers alternative",
    "monkeytype alternative",
    "average typing speed wpm",
    "how to type 100 wpm",
    "free typing certificate",
    "best keyboard for typing fast",
    "qwerty vs dvorak",
    "typing practice tips",
  ],
});

export default function BlogPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Akshar Abhyas Typing Blog & Educational Guides",
    description: "In-depth educational articles, speed benchmarks, and touch typing guides.",
    url: "https://aksharabhyas.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Akshar Abhyas",
      logo: {
        "@type": "ImageObject",
        url: "https://aksharabhyas.com/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BlogHubClient />
    </>
  );
}

