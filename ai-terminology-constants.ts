import { TermDefinition } from './ai-terminology-types';

export const AI_CONTEXT_TEXT = `
Educational Content Report: Understanding Key AI Terms.
1. Agentic AI: AI agents can reason and act autonomously to achieve goals (perceive, reason, act, observe cycle). Examples: DevOps engineers, travel agents. Built on Large Reasoning Models.
2. Large Reasoning Models (LRMs): Specialized LLMs fine-tuned for step-by-step reasoning (Chain of Thought). Used for complex planning.
3. Vector Database: Stores data as numerical vectors using embedding models to capture semantic meaning. Enables mathematical similarity searches (e.g., finding similar images or text). Key for RAG.
4. Retrieval Augmented Generation (RAG): Enriches LLM prompts by retrieving relevant info from vector databases. Increases accuracy and context (e.g., company policy lookup).
5. Model Context Protocol (MCP): Standardized protocol for LLMs to connect to external data/tools, removing need for custom integrations.
6. Mixture of Experts (MoE): Divides model into specialized sub-networks ("experts"). Router activates only necessary experts per token. Increases efficiency/scale without linear compute cost increase.
7. Artificial General Intelligence (AGI): Theoretical standard where AI can complete all cognitive tasks as well as any human expert.
8. Artificial Super Intelligence (ASI): Purely theoretical. Intellectual scope beyond human-level intelligence with recursive self-improvement.
`;

export const TERMS: TermDefinition[] = [
  {
    id: 'agentic',
    title: 'Agentic AI',
    shortDef: 'Autonomous goal-seekers.',
    fullDef: 'AI that can reason and act autonomously to achieve goals. It follows a cycle: Perceive -> Reason -> Act -> Observe.',
    analogy: 'Like a smart travel agent who plans your whole trip, books it, and handles cancellations without you checking every step.',
    iconType: 'robot',
    cardTerm: 'Agentic AI',
    cardDefinition: 'Autonomous AI that follows a Perceive-Reason-Act-Observe cycle.'
  },
  {
    id: 'lrm',
    title: 'Large Reasoning Models',
    shortDef: 'AI that "thinks" before speaking.',
    fullDef: 'Specialized LLMs fine-tuned for step-by-step problem solving. They generate internal chains of thought before answering.',
    analogy: 'Like a mathematician writing out their work on scratch paper before giving you the final answer.',
    iconType: 'brain',
    cardTerm: 'LRMs',
    cardDefinition: 'Models fine-tuned for step-by-step "Chain of Thought" reasoning.'
  },
  {
    id: 'vector',
    title: 'Vector Database',
    shortDef: 'Math-based meaning storage.',
    fullDef: 'Stores data as multi-dimensional numbers (vectors) to capture meaning. Enables searching by concept rather than just keywords.',
    analogy: 'Like organizing a library by the "vibe" or plot of the book, rather than just the author\'s name.',
    iconType: 'database',
    cardTerm: 'Vector DB',
    cardDefinition: 'Stores data as numbers to enable semantic similarity searches.'
  },
  {
    id: 'rag',
    title: 'Retrieval Augmented Generation',
    shortDef: 'Retrieval Augmented Generation.',
    fullDef: 'A technique that looks up relevant facts from a database and feeds them to the AI so it doesn\'t hallucinate.',
    analogy: 'Like taking an open-book test. You (the AI) look up the specific answer in the textbook (Database) before writing it down.',
    iconType: 'search',
    cardTerm: 'RAG',
    cardDefinition: 'Enriches prompts by retrieving facts from external sources.'
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    shortDef: 'The Universal Adapter.',
    fullDef: 'A standard way for AI to connect to external tools and data sources without custom code for every single connection.',
    analogy: 'Like a USB-C port. One standard cable connects your computer to hard drives, monitors, and phones.',
    iconType: 'server',
    cardTerm: 'MCP',
    cardDefinition: 'Standardized protocol connecting LLMs to external tools.'
  },
  {
    id: 'moe',
    title: 'Mixture of Experts',
    shortDef: 'Team of Specialists.',
    fullDef: 'An architecture that divides a model into specialized sub-networks. A "router" sends tasks only to the experts needed.',
    analogy: 'Like a hospital. You don\'t see every doctor for a broken leg; the receptionist (router) sends you specifically to the orthopedist.',
    iconType: 'network',
    cardTerm: 'MoE',
    cardDefinition: 'Splits model into specialized sub-networks activated by a router.'
  },
  {
    id: 'agi',
    title: 'Artificial General Intelligence',
    shortDef: 'Human-level Capability.',
    fullDef: 'A theoretical standard where AI can complete all cognitive tasks as well as any human expert. Models are approaching this.',
    analogy: 'Like a brilliant coworker who can learn and do any job a human can do.',
    iconType: 'sparkles',
    cardTerm: 'AGI',
    cardDefinition: 'Theoretical AI with human-level cognitive abilities.'
  },
  {
    id: 'asi',
    title: 'Artificial Super Intelligence',
    shortDef: 'Beyond Human Intelligence.',
    fullDef: 'Purely theoretical intelligence that far surpasses human capabilities, potentially capable of recursive self-improvement.',
    analogy: 'Like a sci-fi supercomputer that invents physics we can\'t even understand.',
    iconType: 'zap',
    cardTerm: 'ASI',
    cardDefinition: 'Theoretical super-intelligence capable of recursive self-improvement.'
  }
];
