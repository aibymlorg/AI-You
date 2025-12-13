import { EducationalContentSection, Question } from './types';

export const EDUCATIONAL_CONTENT: EducationalContentSection[] = [
  {
    title: "Introduction",
    content: [
      "AI is the overarching field aiming to simulate human intelligence.",
      "Key concepts: AI > Machine Learning (ML) > Deep Learning (DL) > Generative AI (GenAI)."
    ]
  },
  {
    title: "Artificial Intelligence (AI)",
    content: [
      "Broadest term: Simulating human intelligence (learning, inference, reasoning).",
      "History: Started decades ago with 'Expert Systems' (programmed rules)."
    ]
  },
  {
    title: "Machine Learning (ML)",
    content: [
      "Subset of AI: Machines learn from data without explicit programming.",
      "Mechanism: Analyzes training data to find patterns.",
      "Key Use: Prediction, outlier detection (cybersecurity)."
    ]
  },
  {
    title: "Deep Learning (DL)",
    content: [
      "Subset of ML: Uses multi-layered neural networks mimicking the brain.",
      "The 'Deep' refers to the multiple processing layers.",
      "Powerful but often a 'black box' (hard to explain reasoning)."
    ]
  },
  {
    title: "Generative AI (GenAI)",
    content: [
      "Modern Subset of AI: Focuses on CREATING NEW content (text, images, audio).",
      "Built on Foundation Models (like Large Language Models - LLMs).",
      "Analogy: Like composing a new song rather than just analyzing notes.",
      "Impact: Massive acceleration in AI adoption."
    ]
  }
];

export const QUIZ_DATA: Question[] = [
  {
    id: 1,
    text: "Which best defines Artificial Intelligence (AI) in its broadest sense?",
    options: [
      { id: 'a', text: "Predicting future data points only." },
      { id: 'b', text: "Simulating brain functions exactly." },
      { id: 'c', text: "Simulating human intelligence (learning, inference)." },
      { id: 'd', text: "Creating new content only." }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 2,
    text: "What was a prominent early AI application (80s-90s) based on specific programmed knowledge?",
    options: [
      { id: 'a', text: "Large Language Models" },
      { id: 'b', text: "Deep Learning" },
      { id: 'c', text: "Expert Systems" },
      { id: 'd', text: "GANs" }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 3,
    text: "How does Machine Learning (ML) differ from earlier AI forms?",
    options: [
      { id: 'a', text: "Requires explicit programming for everything." },
      { id: 'b', text: "Focuses on creating new content." },
      { id: 'c', text: "Learns patterns from data without explicit programming." },
      { id: 'd', text: "Mimics brain structure strictly." }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 4,
    text: "In cybersecurity, what is a key application of Machine Learning?",
    options: [
      { id: 'a', text: "Deepfake videos" },
      { id: 'b', text: "Text prediction" },
      { id: 'c', text: "Detecting 'outliers' or anomalies." },
      { id: 'd', text: "Music composition" }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 5,
    text: "What defines Deep Learning (DL) compared to general ML?",
    options: [
      { id: 'a', text: "Simple linear algorithms." },
      { id: 'b', text: "Text-only focus." },
      { id: 'c', text: "Multi-layered neural networks mimicking the brain." },
      { id: 'd', text: "Small datasets only." }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 6,
    text: "What does 'Deep' refer to in Deep Learning?",
    options: [
      { id: 'a', text: "Philosophical depth" },
      { id: 'b', text: "Complex equations" },
      { id: 'c', text: "Multiple layers of neural networks." },
      { id: 'd', text: "Understanding consciousness" }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 7,
    text: "What is the core function of Generative AI?",
    options: [
      { id: 'a', text: "Summarizing without altering." },
      { id: 'b', text: "Generating entirely new, original content." },
      { id: 'c', text: "Database management." },
      { id: 'd', text: "Faster calculations." }
    ],
    correctAnswerId: 'b'
  },
  {
    id: 8,
    text: "What foundational technology powers modern Generative AI?",
    options: [
      { id: 'a', text: "Expert Systems" },
      { id: 'b', text: "Perceptrons" },
      { id: 'c', text: "Foundation Models (e.g., LLMs)" },
      { id: 'd', text: "RNNs" }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 9,
    text: "What is the primary driver behind recent AI adoption acceleration?",
    options: [
      { id: 'a', text: "New programming languages" },
      { id: 'b', text: "Computing power only" },
      { id: 'c', text: "Advancements in GenAI and Foundation Models" },
      { id: 'd', text: "Government mandates" }
    ],
    correctAnswerId: 'c'
  },
  {
    id: 10,
    text: "Which is an application of GenAI with both useful and abusive potential?",
    options: [
      { id: 'a', text: "Financial outlier detection" },
      { id: 'b', text: "Antivirus software" },
      { id: 'c', text: "Deep fakes and synthetic voices" },
      { id: 'd', text: "Logistics optimization" }
    ],
    correctAnswerId: 'c'
  }
];

export const BALLOON_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500'
];