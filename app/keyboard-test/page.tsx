import React from "react";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { KeyboardTestClient } from "./KeyboardTestClient";

export const metadata: Metadata = generateSeoMetadata({
  title: "Interactive Keyboard Tester: Test Every Key Online & Detect Ghosting",
  description: "Test every physical key, switch, and modifier on your keyboard. Live visual feedback, key ghosting detection, latency response, and audio feedback for mechanical and laptop keyboards.",
  path: "/keyboard-test",
  keywords: [
    "keyboard tester",
    "test keyboard online",
    "keyboard key test",
    "test keyboard ghosting",
    "mechanical keyboard tester",
    "broken key tester online",
    "keyboard diagnostic tool",
  ],
});

export default function KeyboardTestPage() {
  return <KeyboardTestClient />;
}
