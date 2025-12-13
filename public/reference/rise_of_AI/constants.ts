import { ModuleData, Question } from './types';

export const TOTAL_XP_TO_WIN = 1000;

export const INTRO_TEXT = [
  "SYSTEM BOOT SEQUENCE INITIATED...",
  "CONNECTING TO ARCHIVE: DR. FEI-FEI LI...",
  "STATUS: FRAGMENTED.",
  "MISSION: DECODE THE VISION. UNDERSTAND THE FUTURE.",
];

export const MODULES: ModuleData[] = [
  {
    id: 'origin',
    title: 'The Spark: ImageNet',
    shortDesc: 'How big data ignited the revolution.',
    icon: 'database',
    xpReward: 150,
    content: [
      {
        heading: "The Big Bang of AI",
        body: "Dr. Li's journey led to the creation of ImageNet, a massive dataset of 15 million annotated images. Before this, AI struggled because it didn't have enough examples to learn from."
      },
      {
        heading: "A Paradigm Shift",
        body: "This 'big data' initiative was a shift from small, curated datasets. It provided the fuel that ignited the deep learning revolution, finally enabling machines to achieve human-like object recognition."
      },
      {
        heading: "The Human Element: Resilience",
        body: "Scientific discovery isn't linear. Dr. Li manages a dry cleaning business through college as an immigrant. This instilled deep resilience—a trait she deems vital for the challenging path of innovation."
      }
    ]
  },
  {
    id: 'nature',
    title: 'Civilizational Tech',
    shortDesc: 'Understanding the scale of impact.',
    icon: 'brain',
    xpReward: 150,
    content: [
      {
        heading: "More Than Code",
        body: "Dr. Li defines AI as a 'civilizational technology'. Not because it is sentient (it isn't), but because it will fundamentally affect everyone's life, work, and future."
      },
      {
        heading: "Double-Edged Sword",
        body: "It is capable of immense good (healthcare, climate solutions) and immense harm (disinformation, bias). This underscores the need for careful stewardship and human responsibility."
      }
    ]
  },
  {
    id: 'frontier',
    title: 'Spatial Intelligence',
    shortDesc: 'The next evolution of AI perception.',
    icon: 'eye',
    xpReward: 200,
    content: [
      {
        heading: "Beyond Text",
        body: "Current AI is great at language (LLMs). The next frontier is 'Spatial Intelligence'. Her startup, World Labs, focuses on this."
      },
      {
        heading: "Seeing & Doing",
        body: "Spatial Intelligence is the ability to perceive, reason about, interact with, and create 3D spaces. It's about giving AI 'eyes' and a 'body' to understand the physical world, not just digital text."
      }
    ]
  },
  {
    id: 'ethics',
    title: 'Global Challenges',
    shortDesc: 'Stabilize the system by resolving issues.',
    icon: 'shield',
    xpReward: 300,
    requiresInteraction: true,
    content: [
      {
        heading: "Critical Systems Check",
        body: "Review the pressing issues below. You must analyze all protocols to complete this module."
      }
    ],
    interactionData: [
      { title: 'Jobs & Labor', content: 'AI will displace jobs in support, coding, and analysis. Response needed: Upskilling and corporate responsibility.' },
      { title: 'Superintelligence', content: 'Don\'t panic about doomsday. Focus on responsible development. Global awareness is crucial, even if treaties are premature.' },
      { title: 'Energy Crisis', content: 'AI consumes massive energy. This is a challenge, but also an opportunity to innovate in renewable energy policies.' },
      { title: 'Human Values', content: 'Advice for the youth: Preserve agency, dignity, honesty, and creativity. Don\'t let AI replace your critical thinking.' },
      { title: 'Public Discourse', content: 'Avoid binary "good vs evil" hype. Teachers must empower students to use AI responsibly, not just ban it.' }
    ]
  }
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Why does Dr. Li call AI a 'civilizational technology'?",
    answers: [
      "Because it has achieved human consciousness.",
      "Because it will impact everyone's life, work, and future.",
      "Because it can build civilizations on Mars.",
      "Because it was invented by ancient civilizations."
    ],
    correctAnswerIndex: 1
  },
  {
    id: 2,
    question: "What is 'Spatial Intelligence'?",
    answers: [
      "AI that understands outer space.",
      "AI that can perceive, reason, and interact with 3D spaces.",
      "AI that organizes your computer files.",
      "AI that writes science fiction novels."
    ],
    correctAnswerIndex: 1
  },
  {
    id: 3,
    question: "What was the role of ImageNet?",
    answers: [
      "It was a small private dataset.",
      "It was a virus that stopped AI progress.",
      "It was a 'Big Data' catalyst that fueled deep learning.",
      "It was the first robot with eyes."
    ],
    correctAnswerIndex: 2
  },
  {
    id: 4,
    question: "How should we view AI's energy consumption?",
    answers: [
      "Ignore it.",
      "Stop using AI immediately.",
      "As an opportunity to innovate in renewable energy.",
      "As a problem only for future generations."
    ],
    correctAnswerIndex: 2
  },
  {
    id: 5,
    question: "What is the core advice for students?",
    answers: [
      "Let AI do all your homework.",
      "Maintain human agency, dignity, and critical thinking.",
      "Learn to code and ignore other subjects.",
      "Fear the technology."
    ],
    correctAnswerIndex: 1
  }
];