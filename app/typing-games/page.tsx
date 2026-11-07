import React from "react";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { GamesHubClient } from "./GamesHubClient";

export const metadata: Metadata = generateSeoMetadata({
  title: "Typing Games: 5 Free Interactive Keyboard Games Online",
  description: "Play 5 fun, addictive typing games: Word Rain, 60s Speed Challenge, Text Survival, Falling Letters, and Word Accuracy Challenge. Sharpen your typing reflexes with zero ads or login.",
  path: "/typing-games",
  keywords: [
    "typing games",
    "free typing games online",
    "word rain typing game",
    "falling words game",
    "typing games for kids and adults",
    "speed typing challenge",
    "keyboard reflex games",
  ],
});

export default function TypingGamesPage() {
  return <GamesHubClient />;
}
