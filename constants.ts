
import { SlideData, SlideType } from './types';

// Mock HTML content to simulate the local files for this demo.
// In a real deployment, these would simply be standard HTML files in the /public folder
// and the 'source' would point to '/reports/future-ai.html', etc.

const fontImport = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">`;

const futureAiHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Report: The Future of AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    ${fontImport}
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
        .panel.active {
            display: block;
        }
        .glass-card {
            background: rgba(255, 248, 246, 0.05);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 248, 246, 0.1);
        }
        .quiz-option.correct {
            background-color: #10B981 !important;
            border-color: #10B981 !important;
            color: white !important;
            transform: scale(1.02);
        }
        .quiz-option.incorrect {
            background-color: #de3730 !important;
            border-color: #de3730 !important;
            color: white !important;
        }
        .quiz-option.correct-answer {
             outline: 2px solid #10B981;
             outline-offset: 2px;
        }
        .tab.active {
            background-color: #7d0100;
            color: #fff8f6;
        }
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #413a38;
        }
        ::-webkit-scrollbar-thumb {
            background: #7d0100;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #a10200;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary-dark': '#7d0100',
                        'primary-light': '#fff8f6',
                        'secondary-dark': '#513430',
                        'secondary-light': '#ffedea',
                        'background': '#ffdad4',
                        'error': '#de3730',
                        'neutral-dark': '#413a38',
                        'neutral-light': '#fff8f6',
                        'brand-bg': '#2C2523'
                    },
                    fontFamily: {
                        'outfit': ['Outfit', 'sans-serif'],
                        'inter': ['Inter', 'sans-serif'],
                    },
                },
            },
        }
    </script>
</head>
<body class="bg-gradient-to-br from-brand-bg to-secondary-dark text-primary-light font-inter antialiased">
    <div class="relative min-h-screen overflow-x-hidden">
        <div class="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-primary-dark/20 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-background/20 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>

        <main class="relative z-10 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
            <header class="text-center py-12 md:py-20 fade-in">
                <h1 class="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                    How Does <span class="text-background">AI Learn?</span>
                </h1>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-primary-light/80">
                    Discover how AI systems like ChatGPT learn and why they're so powerful. Learn about the secret behind modern AI!
                </p>
                <a href="https://youtu.be/y1fGlAECNFM?si=YLLgR0AMO1hz-tIA" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-primary-dark text-primary-light font-semibold rounded-lg shadow-lg hover:bg-red-900 transition-all duration-300 transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                    Watch The Full Video
                </a>
            </header>

            <div class="flex justify-center mb-8 fade-in" style="animation-delay: 0.2s;">
                <div class="flex space-x-2 p-1.5 bg-neutral-dark/50 rounded-xl glass-card">
                    <button id="tab-report" class="tab active px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300">Learn</button>
                    <button id="tab-quiz" class="tab px-6 py-2 rounded-lg font-semibold text-sm text-primary-light/70 hover:text-primary-light transition-colors duration-300">Quiz</button>
                </div>
            </div>

            <div id="content-panels" class="fade-in" style="animation-delay: 0.4s;">
                <div id="panel-report" class="panel active">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-3 p-6 rounded-2xl glass-card">
                            <h2 class="font-outfit text-2xl font-bold text-background mb-3">What You'll Learn</h2>
                            <p class="text-primary-light/90">We'll explore how modern AI systems learn and work. You'll discover the secret behind AI tools like ChatGPT and understand why AI has become so powerful recently. Think of this as learning how AI "thinks" and learns from information!</p>
                        </div>

                        <h3 class="md:col-span-3 font-outfit text-3xl font-bold tracking-tight mt-6 mb-0">Key Ideas</h3>

                        <div class="p-6 rounded-2xl glass-card md:col-span-2">
                             <h4 class="font-outfit text-xl font-bold text-background mb-2">🔑 The Secret: Learning by Watching</h4>
                            <p class="text-primary-light/90">Modern AI learns the same way you learned your first language - by observing patterns! You didn't need someone to teach you every single word and grammar rule. You learned by watching, listening, and figuring out how words relate to each other. AI does the same thing with massive amounts of information.</p>
                        </div>

                        <div class="p-6 rounded-2xl glass-card">
                            <h4 class="font-outfit text-xl font-bold text-background mb-2">🚀 What is Generative AI?</h4>
                            <p class="text-primary-light/90">This is AI that can create new things - text, images, music, or even code! ChatGPT is just one example of how powerful this technology has become.</p>
                        </div>

                        <div class="p-6 rounded-2xl glass-card">
                            <h4 class="font-outfit text-xl font-bold text-background mb-2">🧠 Three Ways AI Can Learn</h4>
                             <ul class="space-y-2 list-disc list-inside text-primary-light/90">
                                <li><strong>Supervised Learning:</strong> Like a teacher showing you flashcards with answers. Works well but needs lots of human help.</li>
                                <li><strong>Reinforcement Learning:</strong> Like learning to play a video game by trying different moves and seeing what works. Good for games, but slow for learning new things.</li>
                                <li><strong>Self-Supervised Learning:</strong> Like figuring things out by yourself from examples. This is the secret sauce that makes modern AI so powerful!</li>
                            </ul>
                        </div>

                        <div class="p-6 rounded-2xl glass-card md:col-span-2">
                            <h4 class="font-outfit text-xl font-bold text-background mb-2">💡 Two Different Approaches</h4>
                            <p class="text-primary-light/90">Old Way: Design every rule perfectly (like following a recipe exactly). New Way: Let AI learn patterns from data (like learning to cook by tasting lots of food). The new way works better because the real world is messy and full of surprises - just like your brain handles unexpected situations better than a calculator!</p>
                        </div>

                        <div class="p-6 rounded-2xl glass-card md:col-span-3">
                            <h4 class="font-outfit text-xl font-bold text-background mb-2">🤖 Will AI Become Super-Intelligent?</h4>
                            <p class="text-primary-light/90 mb-2">You might have heard about "AGI" (Artificial General Intelligence) - AI that can think like humans about anything. While AI is impressive today, experts say true AGI is still many years away. Current AI is really good at specific tasks, but can't think flexibly about everything like you can!</p>
                        </div>

                         <div class="md:col-span-3 p-6 rounded-2xl glass-card bg-primary-dark/30">
                            <h2 class="font-outfit text-2xl font-bold text-background mb-3">🎯 Why This Matters to You</h2>
                            <p class="text-primary-light/90">Understanding how AI learns helps you use these tools better in school and future careers. AI is already changing how we work, create, and solve problems. By learning these concepts now, you're preparing for a world where AI will be as common as smartphones!</p>
                        </div>
                    </div>
                </div>

                <div id="panel-quiz" class="panel hidden">
                    <div class="space-y-8 max-w-3xl mx-auto">
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const tabButtons = document.querySelectorAll('.tab');
            const contentPanels = document.querySelectorAll('.panel');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetPanelId = button.id.replace('tab-', 'panel-');

                    tabButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.classList.add('text-primary-light/70', 'hover:text-primary-light');
                    });

                    button.classList.add('active');
                    button.classList.remove('text-primary-light/70', 'hover:text-primary-light');

                    contentPanels.forEach(panel => {
                        if (panel.id === targetPanelId) {
                            panel.classList.add('active');
                            panel.classList.remove('hidden');
                        } else {
                            panel.classList.remove('active');
                            panel.classList.add('hidden');
                        }
                    });
                });
            });

            const quizData = [
                {
                    question: "What is the main 'secret' behind how modern AI like ChatGPT learns?",
                    options: [
                        "Teachers manually program every answer",
                        "It learns by trial and error like playing a video game",
                        "It learns by observing patterns in information (self-supervised learning)",
                        "It follows strict rules written by programmers"
                    ],
                    correctAnswer: "It learns by observing patterns in information (self-supervised learning)"
                },
                {
                    question: "What is the biggest problem with supervised learning?",
                    options: [
                        "It can't create new content like images or text",
                        "It needs lots of humans to label and teach everything, which is slow and expensive",
                        "It takes too long to get feedback on whether it's doing well",
                        "It uses too much computer power"
                    ],
                    correctAnswer: "It needs lots of humans to label and teach everything, which is slow and expensive"
                },
                {
                    question: "What is AGI (Artificial General Intelligence)?",
                    options: [
                        "AI that already exists and can do everything humans can do",
                        "AI that will definitely be created next year",
                        "AI that could think flexibly about anything like humans, but is still many years away",
                        "A type of AI that will never be possible to create"
                    ],
                    correctAnswer: "AI that could think flexibly about anything like humans, but is still many years away"
                },
                {
                    question: "How is self-supervised learning similar to how you learned your first language?",
                    options: [
                        "Someone told you the name of every object one by one",
                        "You learned by trying to reach a goal over and over",
                        "You figured out patterns and relationships by watching and listening to people around you",
                        "You practiced the same words repeatedly until you memorized them"
                    ],
                    correctAnswer: "You figured out patterns and relationships by watching and listening to people around you"
                },
                {
                    question: "What's the difference between the 'old way' and 'new way' of creating AI?",
                    options: [
                        "Old: Let AI learn patterns. New: Program every rule",
                        "Old: Program every rule perfectly. New: Let AI learn patterns from data",
                        "Old: Use self-supervised learning. New: Use supervised learning",
                        "Old: Train on lots of data. New: Use small amounts of data"
                    ],
                    correctAnswer: "Old: Program every rule perfectly. New: Let AI learn patterns from data"
                }
            ];

            const quizContainer = document.querySelector('#panel-quiz .space-y-8');

            quizData.forEach((q, index) => {
                const questionElement = document.createElement('div');
                questionElement.className = 'p-6 rounded-2xl glass-card space-y-4';

                const questionText = document.createElement('p');
                questionText.className = 'font-outfit text-xl font-semibold';
                questionText.textContent = \`\${index + 1}. \${q.question}\`;
                questionElement.appendChild(questionText);

                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3';

                q.options.forEach(optionText => {
                    const optionButton = document.createElement('button');
                    optionButton.className = 'quiz-option text-left p-4 border border-primary-light/20 rounded-lg hover:bg-primary-light/10 transition-all duration-200';
                    optionButton.textContent = optionText;
                    optionButton.dataset.correct = (optionText === q.correctAnswer);
                    optionsContainer.appendChild(optionButton);
                });

                questionElement.appendChild(optionsContainer);

                const feedbackText = document.createElement('p');
                feedbackText.className = 'feedback-text text-sm font-medium h-5 transition-opacity duration-300';
                questionElement.appendChild(feedbackText);

                quizContainer.appendChild(questionElement);
            });

            quizContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('quiz-option')) {
                    const button = e.target;
                    const questionContainer = button.closest('.glass-card');

                    if (questionContainer.dataset.answered) {
                        return;
                    }
                    questionContainer.dataset.answered = 'true';

                    const isCorrect = button.dataset.correct === 'true';
                    const feedback = questionContainer.querySelector('.feedback-text');
                    const options = questionContainer.querySelectorAll('.quiz-option');

                    if (isCorrect) {
                        button.classList.add('correct');
                        feedback.textContent = 'Correct! Well done.';
                        feedback.style.color = '#10B981';
                    } else {
                        button.classList.add('incorrect');
                        feedback.textContent = "Not quite. The correct answer is highlighted.";
                        feedback.style.color = '#de3730';
                        const correctButton = questionContainer.querySelector('[data-correct="true"]');
                        correctButton.classList.add('correct-answer');
                    }

                    options.forEach(opt => {
                       opt.disabled = true;
                    });
                }
            });

        });
    </script>
</body>
</html>
`;

const feiFeiHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
${fontImport}
<style>
  body { 
    background: #f8fafc; 
    color: #1e293b; 
    font-family: 'Inter', sans-serif; 
    padding: 40px; 
    line-height: 1.8; 
    transition: 0.3s; 
  }
  body.dark { background: #0f172a; color: #e2e8f0; }
  h1 { font-size: 2.5rem; margin-bottom: 10px; font-weight: 800; }
  p { font-weight: 300; font-size: 1.1rem; }
  strong { font-weight: 600; }
  button { 
    padding: 8px 16px; 
    cursor: pointer; 
    border-radius: 6px; 
    border: 1px solid #cbd5e1; 
    background: white;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
  }
  body.dark button {
    background: #1e293b;
    border-color: #334155;
    color: #fff;
  }
</style>
<script>
  function toggleTheme() {
    document.body.classList.toggle('dark');
  }
</script>
</head>
<body>
  <div style="display:flex; justify-content:space-between; align-items:center;">
    <h1>The Vision: Dr. Fei-Fei Li</h1>
    <button onclick="toggleTheme()">Toggle Light/Dark</button>
  </div>
  <hr style="border-color: #e2e8f0; margin: 20px 0;" />
  <p><strong>"There’s nothing artificial about AI. It’s inspired by people, it’s created by people, and—most importantly—it impacts people."</strong></p>
  <p>Dr. Fei-Fei Li is a computer scientist at Stanford University. She is the inventor of ImageNet, the dataset that enabled the deep learning revolution.</p>
  <p>Her vision emphasizes "Human-Centered AI", ensuring that as these technologies develop, they remain aligned with human values and dignity.</p>
</body>
</html>
`;

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "The Beginning of AI: Interactive Demo of Machine Learning",
    type: SlideType.IMAGE_LAUNCHER,
    source: "https://teachablemachine.withgoogle.com/train",
    backgroundImage: "https://www.gstatic.com/tez_creatives/teachable_machine/assets/social/tm_social_share_card.png", // Using the official social card which closely resembles the "How to use" flow
  },
  {
    id: 2,
    title: "Gamification: Brain Potential",
    type: SlideType.IFRAME,
    source: "https://brain-potential.vercel.app/",
  },
  {
    id: 3,
    title: "The Logic: Future AI Report",
    type: SlideType.IFRAME,
    // In production, use: source: "/reports/future-ai.html",
    srcDoc: futureAiHtml,
  },
  {
    id: 4,
    title: "The Vision: Dr. Fei-Fei Li",
    type: SlideType.IFRAME,
    // In production, use: source: "/reports/fei-fei-li.html",
    srcDoc: feiFeiHtml,
  },
  {
    id: 5,
    title: "The Next Gen: Google Opal",
    type: SlideType.FALLBACK_CARD, // Known X-Frame-Option blocker
    fallbackContent: {
      image: "https://picsum.photos/1200/800", // Placeholder for Opal
      description: "Meet Opal. A professional webcam with DSLR quality, built for the age of AI video.",
      link: "https://opal.google/landing/",
      buttonText: "Explore Opal"
    }
  }
];
