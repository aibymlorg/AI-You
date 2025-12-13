// Brain vs AI Game - Simplified English Challenges for Grade 10 Students

export enum Target {
  Brain = 'brain',
  LLM = 'llm',
}

export enum ChallengeCategory {
  Fact = 'fact',
  UseCase = 'use_case',
}

export interface Challenge {
  id: number;
  text: string;
  target: Target;
  explanation: string;
  category: ChallengeCategory;
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    text: "Has billions to trillions of parameters",
    target: Target.LLM,
    explanation: "AI Models - Large Language Models (LLMs) are measured by their parameters (weights and connections). They can have billions to over a trillion parameters. This is how we measure their size and power.",
    category: ChallengeCategory.Fact
  },
  {
    id: 2,
    text: "Has about 86 billion neurons",
    target: Target.Brain,
    explanation: "Your brain has about 86 billion neurons - these are the tiny cells that send messages to each other to help you think, learn, and remember things.",
    category: ChallengeCategory.Fact
  },
  {
    id: 3,
    text: "Learns from huge amounts of text data",
    target: Target.LLM,
    explanation: "AI learns by reading millions of books, articles, and websites. It finds patterns in this text to learn how language works.",
    category: ChallengeCategory.Fact
  },
  {
    id: 4,
    text: "Learns through experiences and talking to people",
    target: Target.Brain,
    explanation: "Your brain learns from real-world experiences - touching things, seeing them, and talking to people. You can learn quickly from just one or two examples.",
    category: ChallengeCategory.Fact
  },
  {
    id: 5,
    text: "Uses very little energy (about 20 watts)",
    target: Target.Brain,
    explanation: "Your brain is super energy-efficient! It uses only about 20 watts of power - that's the same as a dim light bulb - even though it does amazing things.",
    category: ChallengeCategory.Fact
  },
  {
    id: 6,
    text: "Uses huge amounts of energy, especially when training",
    target: Target.LLM,
    explanation: "Training AI models requires massive data centers that use tons of electricity. Running them is expensive and uses a lot of power.",
    category: ChallengeCategory.Fact
  },
  {
    id: 7,
    text: "Usually built using Transformer architecture",
    target: Target.LLM,
    explanation: "Most modern AI models like ChatGPT use something called 'Transformer' architecture. This is a special design that helps them understand language patterns really well.",
    category: ChallengeCategory.Fact
  },
  {
    id: 8,
    text: "Has a complex network structure that works in parallel",
    target: Target.Brain,
    explanation: "Your brain is like a super complex web where many things happen at the same time. Different parts work together in ways we're still discovering.",
    category: ChallengeCategory.Fact
  },
  {
    id: 9,
    text: "Has about 100 to 1,000 trillion connections",
    target: Target.Brain,
    explanation: "Your brain has way more connections (called synapses) than AI has parameters. These connections are constantly changing as you learn new things.",
    category: ChallengeCategory.Fact
  },
  {
    id: 10,
    text: "Shows creativity, emotions, and general intelligence",
    target: Target.Brain,
    explanation: "Humans have true creativity, real feelings, and can think about many different topics. AI can mimic these, but it doesn't actually feel or truly understand them.",
    category: ChallengeCategory.Fact
  },
  {
    id: 11,
    text: "Can learn quickly from just one or two examples",
    target: Target.Brain,
    explanation: "You can learn what a new animal looks like from seeing it just once! AI usually needs thousands of examples to learn the same thing.",
    category: ChallengeCategory.Fact
  },
  {
    id: 12,
    text: "Needs lots of data and training to learn",
    target: Target.LLM,
    explanation: "AI needs to see millions of examples to learn patterns. It's like studying for a test by reading the same book thousands of times.",
    category: ChallengeCategory.Fact
  },
  {
    id: 13,
    text: "Naturally understands the physical world and social situations",
    target: Target.Brain,
    explanation: "You automatically know that a cup will fall if you push it off a table, or when someone is upset by their facial expression. AI struggles with these basic understandings.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 14,
    text: "Can read and understand information super fast",
    target: Target.LLM,
    explanation: "AI can read and analyze millions of documents in seconds - way faster than any human could ever do. This makes it great for research.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 15,
    text: "Asks new questions and sets creative directions",
    target: Target.Brain,
    explanation: "Humans are curious and come up with new questions like 'What if we could fly?' or 'Why does this happen?' AI can only answer questions, not come up with new ones on its own.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 16,
    text: "Can quickly create many different ideas to inspire people",
    target: Target.LLM,
    explanation: "AI is great at brainstorming! Give it a topic and it can generate dozens of ideas, story ideas, or designs to help get your creative juices flowing.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 17,
    text: "Can safely cross a busy street during rush hour",
    target: Target.Brain,
    explanation: "Your brain is amazing at combining what you see, hear, and know to predict moving cars and people. Self-driving cars still struggle with this.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 18,
    text: "Can analyze thousands of medical research papers in minutes",
    target: Target.LLM,
    explanation: "AI can quickly read and compare huge amounts of research to find patterns or connections that would take humans months to discover.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 19,
    text: "Can comfort a sad friend by understanding their feelings",
    target: Target.Brain,
    explanation: "Humans can truly understand and feel empathy for others. We pick up on tiny facial expressions and body language. AI can pretend to be sympathetic but doesn't actually feel it.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 20,
    text: "Can create personalized learning plans for millions of students at once",
    target: Target.LLM,
    explanation: "AI can analyze how each student learns and create custom lessons for millions of people at the same time - something no human teacher could do.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 21,
    text: "Can invent a completely new music genre or art style",
    target: Target.Brain,
    explanation: "True creativity comes from human experience and imagination. While AI can remix existing styles, humans create genuinely new forms of art and music.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 22,
    text: "Can translate a live conversation between two people speaking different languages",
    target: Target.LLM,
    explanation: "AI is excellent at language translation and can do it in real-time, making it possible for people who speak different languages to understand each other instantly.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 23,
    text: "Can think about its own thinking",
    target: Target.Brain,
    explanation: "Humans can reflect on how they think and learn. We can say 'I'm not good at this' or 'I should try a different approach.' AI can't do this self-reflection.",
    category: ChallengeCategory.Fact
  },
  {
    id: 24,
    text: "Can expand its memory by adding more hardware",
    target: Target.LLM,
    explanation: "AI's memory can grow simply by adding more computer storage or training on more data. Your brain's memory has biological limits.",
    category: ChallengeCategory.Fact
  },
  {
    id: 25,
    text: "Makes decisions based on emotions and personal experiences",
    target: Target.Brain,
    explanation: "Human decisions involve feelings, gut instincts, and memories. These help us make choices in complex social situations where there's no clear 'right' answer.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 26,
    text: "Can recall specific information from its training perfectly",
    target: Target.LLM,
    explanation: "AI can remember facts from its training data very accurately, like a digital library. Human memory is more creative but less accurate.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 27,
    text: "Can physically rewire itself as it learns",
    target: Target.Brain,
    explanation: "Your brain actually changes its physical structure when you learn! New connections form and strengthen. AI's structure stays mostly the same after training.",
    category: ChallengeCategory.Fact
  },
  {
    id: 28,
    text: "Can write, explain, and debug computer code in seconds",
    target: Target.LLM,
    explanation: "AI is really good at understanding programming languages. It can write code, explain what code does, and find bugs quickly to help programmers.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 29,
    text: "Understands concepts like 'heavy', 'soft', or 'warm' by physically experiencing them",
    target: Target.Brain,
    explanation: "You know what 'soft' means because you've touched soft things. AI only knows it from reading about it - it can't actually feel textures.",
    category: ChallengeCategory.Fact
  },
  {
    id: 30,
    text: "Can be fooled by small, clever changes to input data",
    target: Target.LLM,
    explanation: "AI can be tricked by tiny changes that humans wouldn't even notice. For example, changing a few pixels can make AI think a cat is a dog.",
    category: ChallengeCategory.Fact
  },
  {
    id: 31,
    text: "Can create long-term business plans based on understanding company culture",
    target: Target.Brain,
    explanation: "Planning strategy needs understanding of people, motivations, and culture - things humans learn from experience. AI can analyze data but lacks human insight.",
    category: ChallengeCategory.UseCase
  },
  {
    id: 32,
    text: "Can keep track of very long conversations without forgetting details",
    target: Target.LLM,
    explanation: "Modern AI can remember and reference information from extremely long conversations without getting confused, unlike humans who might forget earlier details.",
    category: ChallengeCategory.UseCase
  }
];

export const DIFFICULTY_LEVELS: Record<Difficulty, number> = {
  [Difficulty.Easy]: 6,
  [Difficulty.Medium]: 10,
  [Difficulty.Hard]: CHALLENGES.length,
};
