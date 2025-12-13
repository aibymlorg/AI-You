import { QuizQuestion, ReportSection } from './future-of-ai-types';

export const REPORT_DATA: ReportSection[] = [
    {
        id: 'main-topic',
        title: 'Main Topic',
        content: 'An introduction to the foundational shift in AI, focusing on the rise of foundation models and generative AI, with a particular emphasis on self-supervised learning as the underlying mechanism. The lecture also explores philosophical perspectives on learning and the structure of the world that led to these advancements.',
        colSpan: 3
    },
    {
        id: 'secret-sauce',
        title: 'The "Secret Sauce": Self-Supervised Learning',
        content: 'The key breakthrough enabling current AI models is learning from observation, or self-supervised learning. This mirrors human learning, where we understand concepts by observing their relationships and context, rather than explicit instruction.',
        colSpan: 2
    },
    {
        id: 'paradigm',
        title: 'New AI Paradigm',
        content: 'Current advancements in AI represent a significant shift. ChatGPT is just the "tip of the iceberg" built upon the massive foundation of generative AI.',
        colSpan: 1
    },
    {
        id: 'analogies',
        title: 'Human Learning Analogies',
        content: 'Supervised: Parent/teacher instruction. Scales poorly.|Reinforcement: Goal optimization. Risky and inefficient for "blank slate" learning.|Self-Supervised: The primary mechanism. Learning by observation and context.',
        colSpan: 1,
        isList: true
    },
    {
        id: 'philosophy',
        title: 'Philosophical Underpinnings',
        content: 'The lecture contrasts the historical top-down "design" approach (inspired by Greek philosophy of perfect order) with the new bottom-up "learning" approach. The human brain, optimized for navigating chaos, is the model for neural networks, which excel at learning from unstructured, chaotic data.',
        colSpan: 2
    },
    {
        id: 'agi',
        title: 'AGI & Course Overview',
        content: 'While hype is high, the speaker suggests AGI is still far off. The course is structured to cover everything from AI history and model mechanics to case studies like ChatGPT and Stable Diffusion, emerging models, and ethics.',
        colSpan: 3
    },
    {
        id: 'relevance',
        title: 'Overall Educational Relevance',
        content: 'The video provides a highly relevant and accessible introduction to the "Future of AI." It excels in its non-technical approach, using relatable analogies and philosophical discussions to explain complex concepts.',
        colSpan: 3
    }
];

export const QUIZ_DATA: QuizQuestion[] = [
    {
        id: 1,
        question: "What does the speaker identify as the 'secret sauce' behind foundation models and generative AI?",
        options: [
            { text: "Supervised learning with extensive human labeling", isCorrect: false },
            { text: "Reinforcement learning through trial and error", isCorrect: false },
            { text: "Learning from observation (self-supervised learning)", isCorrect: true },
            { text: "Designing intricate algorithms based on blueprints", isCorrect: false }
        ]
    },
    {
        id: 2,
        question: "According to the lecture, what is the primary limitation of supervised learning?",
        options: [
            { text: "It struggles with tasks requiring creativity", isCorrect: false },
            { text: "It relies heavily on human labor and scales poorly", isCorrect: true },
            { text: "It has difficulty optimizing long-term goals", isCorrect: false },
            { text: "It requires immense computational power", isCorrect: false }
        ]
    },
    {
        id: 3,
        question: "Which of the following best describes the speaker's view on Artificial General Intelligence (AGI)?",
        options: [
            { text: "AGI has already been achieved", isCorrect: false },
            { text: "AGI is imminent within the next year", isCorrect: false },
            { text: "AGI is still a long way off", isCorrect: true },
            { text: "AGI is a theoretical concept only", isCorrect: false }
        ]
    },
    {
        id: 4,
        question: "The concept of 'meaning is relational' is illustrated by which example?",
        options: [
            { text: "A child learning a dog's name", isCorrect: false },
            { text: "A self-driving car finding home", isCorrect: false },
            { text: "An AI confusing a dog and a mouse due to context", isCorrect: true },
            { text: "A human learning chess", isCorrect: false }
        ]
    },
    {
        id: 5,
        question: "What philosophical perspective historically dominated Western thought but struggles with reality's chaos?",
        options: [
            { text: "Bottom-up, learning, chaos", isCorrect: false },
            { text: "Top-down, designing, order", isCorrect: true },
            { text: "Relational, intuitive, flexible", isCorrect: false },
            { text: "Self-supervised, observational", isCorrect: false }
        ]
    }
];
