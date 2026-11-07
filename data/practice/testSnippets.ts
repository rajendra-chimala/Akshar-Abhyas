import { TestCategory } from "@/types/typing";

export const COMMON_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "write", "great", "small", "large", "world", "place", "found", "right", "still", "learn",
  "should", "country", "found", "answer", "school", "grow", "study", "point", "mother", "father"
];

export const DIFFICULT_WORDS = [
  "accommodate", "bureaucracy", "conscientious", "definitely", "embarrass",
  "fluorescent", "gauge", "hierarchy", "idiosyncrasy", "jewelry",
  "kaleidoscope", "liaison", "millennium", "necessary", "occurrence",
  "perseverance", "questionnaire", "rhythm", "silhouette", "threshold",
  "ubiquitous", "vacuum", "weird", "xenophobia", "yield", "zoology"
];

export const CODE_WORDS = [
  "function", "const", "let", "return", "import", "export", "interface",
  "Promise", "async", "await", "console.log", "useEffect", "useState",
  "className", "document", "window", "Boolean", "Number", "String"
];

export const CATEGORY_SNIPPETS: Record<TestCategory, string[]> = {
  beginner: [
    "the cat sat on the mat and had a nap in the sun all day long",
    "we like to walk in the park when the trees are green and calm",
    "a quick bird flew over the river to find some food for its nest",
    "good work comes from steady practice every single day you try",
    "you can learn touch typing with patience and quiet confidence",
  ],
  easy: [
    "Learning to type without looking at the keyboard is one of the most rewarding digital skills you can acquire.",
    "Small daily habits produce massive results over time when you focus on accuracy before chasing raw typing speed.",
    "The journey of a thousand miles begins with a single step, and the journey of a master typist begins on the home row.",
    "Every key on the keyboard belongs to a specific finger, creating a map of muscle memory in your mind.",
  ],
  medium: [
    "Touch typing allows your thoughts to flow directly into the computer without cognitive friction. When you eliminate the need to hunt for keys, your creative bandwidth expands significantly.",
    "In the modern knowledge economy, typing is the primary interface between human ideas and digital execution. Investing fifteen minutes each day will save hundreds of hours across your career.",
    "Consistency always trumps intensity when developing motor skills. Practicing typing twenty minutes every morning yields superior neural adaptations compared to occasional marathon sessions.",
  ],
  hard: [
    "Technological progress is neither inherently benevolent nor malevolent; rather, its social utility depends entirely upon the wisdom, foresight, and ethics of the individuals who architect and implement it.",
    "The philosophical dilemma of artificial cognition revolves around intentionality: does an algorithmic architecture truly comprehend linguistic semantics, or merely execute intricate syntactic manipulations?",
    "Modern distributed computing architectures rely upon consensus algorithms, idempotent operations, and fault-tolerant replication protocols to preserve transactional integrity across asynchronous nodes.",
  ],
  expert: [
    "\"The quintessence of intellectual inquiry,\" observed Professor Higgins (1894-1962), \"lies not in triumphant affirmations, but in the relentless, unyielding interrogation of foundational dogmas!\"",
    "In 2026, enterprise telemetry systems processed 14,892,300 req/sec; latency dropped by 42.8% ($12,450.00 saved/month) after migrating microservices from VM clusters to lightweight WebAssembly runtimes.",
    "Did you examine RFC-7231 (HTTP/1.1 Semantics, Section 6.5.3)? It specifies: '403 Forbidden indicates that the origin server understood the request but refuses to authorize it.'",
  ],
  words: [
    // Will be generated dynamically by word picker
    "the of and to a in that is was he for it with as his on be at by i this had not are but from or have an they which one you were her all she there would their we him been has when who will more no if out so said what up its about into than them can only other new some could time these two may then do first any my now such like our over man me even most made after also did many before must through back years where much your way well down should because each just those people mr how too little state good very make world still own see men work long day get here between both life being under never day same another know while last might us great old year off come since against go came right used take three himself look few general hand school part",
  ],
  paragraphs: [
    "The keyboard has stood as the timeless bridge between humanity and the boundless digital cosmos for well over a century. From the mechanical typewriters of the late nineteenth century to the ultra-responsive mechanical and capacitive switches of today, the fundamental rhythm of typing remains an art form. When mastered, fingers glide with the effortless grace of a concert pianist, translating ethereal human thought into enduring prose, revolutionary code, and profound communication.",
    "To type without looking is to liberate your mind from mechanical distraction. As your eyes remain effortlessly anchored to the screen, ideas crystallize into words with seamless fluidity. You no longer battle typos or second-guess your finger positions. Instead, you enter a state of deep flow, where productivity multiplies and digital fatigue dissolves into creative momentum.",
  ],
  numbers: [
    "1024 2048 4096 8192 16384 32768 65536 131072 262144 524288 1048576 12345 67890 98765 43210 24680 13579 97531 86420 1984 2024 2026 1776 1492 1066",
  ],
  punctuation: [
    "Wait; did you say, \"Ready, set, go!\"? Yes—indeed: (1) focus, (2) breathe, and (3) type! Don't look down; it's 100% possible to achieve 99.5% accuracy.",
  ],
  custom: [
    "Type or paste your own custom practice text here. You can practice speeches, code snippets, study notes, or favorite book chapters.",
  ],
};

export function getRandomSnippet(category: TestCategory): string {
  const list = CATEGORY_SNIPPETS[category] || CATEGORY_SNIPPETS.medium;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function getRandomWords(count: number = 50): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * COMMON_WORDS.length);
    words.push(COMMON_WORDS[idx]);
  }
  return words.join(" ");
}
