
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
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Fei-Fei Li: The AI Godmother</title>
    <script src="https://cdn.tailwindcss.com"></script>
    ${fontImport}
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background-color: var(--scrollbar-track-color); }
        ::-webkit-scrollbar-thumb { background-color: var(--scrollbar-thumb-color); border-radius: 10px; }
        html { scroll-behavior: smooth; }
        body {
            --scrollbar-track-color: #ffedea;
            --scrollbar-thumb-color: #7d0100;
        }
        html.dark body {
            --scrollbar-track-color: #1a1a2e;
            --scrollbar-thumb-color: #00f5d4;
        }
        .animated-gradient {
            background-size: 200% 200%;
            animation: gradient-animation 15s ease infinite;
        }
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .light .glass-card {
            background: rgba(255, 248, 246, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(125, 1, 0, 0.1);
        }
        .quiz-option.correct {
            background: rgba(0, 245, 212, 0.2);
            border-color: #00f5d4;
        }
        .light .quiz-option.correct {
            background: #d1fae5;
            border-color: #10b981;
        }
        .quiz-option.incorrect {
            background: rgba(222, 55, 48, 0.2);
            border-color: #de3730;
        }
        .light .quiz-option.incorrect {
            background: #fee2e2;
            border-color: #ef4444;
        }
        .quiz-option:disabled { opacity: 0.6; cursor: not-allowed; }
    </style>
</head>
<body class="antialiased font-['Poppins'] bg-white text-gray-800 dark:bg-[#0d0c22] dark:text-gray-100 transition-colors duration-500">
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        'dk-bg': '#0d0c22',
                        'dk-surface': '#1a1a2e',
                        'dk-accent': '#00f5d4',
                        'dk-accent-2': '#9d4edd',
                    }
                }
            }
        }
    </script>

    <div class="min-h-screen">
        <header class="relative p-6 lg:p-8 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-dk-bg dark:via-dk-surface dark:to-dk-accent-2/30 animated-gradient"></div>
            <div class="container mx-auto relative z-10">
                <nav class="flex justify-between items-center">
                    <h1 class="text-2xl md:text-3xl font-bold text-red-900 dark:text-dk-accent">AI GODMOTHER</h1>
                    <button id="theme-toggle" class="p-2 rounded-full text-red-900 dark:text-dk-accent hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300">
                        <svg id="theme-toggle-dark-icon" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        <svg id="theme-toggle-light-icon" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </button>
                </nav>
                <div class="mt-16 mb-8 text-center">
                    <h2 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-red-900 dark:text-white uppercase tracking-tighter">
                        Meet <span class="bg-clip-text text-transparent bg-gradient-to-r from-red-900 to-purple-900 dark:from-dk-accent dark:to-dk-accent-2">Dr. Fei-Fei Li</span>
                    </h2>
                    <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">The "Godmother of AI" and her vision for a human-centered future</p>
                    <a href="https://youtu.be/E2yzX6Gch40?si=ifkx1MRKiMdArusj" target="_blank" rel="noopener noreferrer" class="mt-8 inline-block bg-red-900 dark:bg-dk-accent text-white dark:text-dk-bg font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Watch Her Story
                    </a>
                </div>
            </div>
        </header>

        <main class="container mx-auto px-4 py-12 md:py-16">
            <section>
                <h3 class="text-3xl md:text-4xl font-bold text-center mb-10 text-red-900 dark:text-white">Who is Dr. Fei-Fei Li?</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 p-6 rounded-2xl glass-card transition-transform duration-300 hover:-translate-y-1">
                        <h4 class="text-xl font-bold text-red-900 dark:text-dk-accent">🌍 A Technology That Will Change Everything</h4>
                        <p class="mt-2 text-gray-700 dark:text-gray-300">Dr. Li calls AI a "civilizational technology" - not because it thinks like us, but because it will affect how everyone lives, works, and plans their future. It's powerful like electricity or the internet, and can be used for good or harm, so we need to be careful and responsible with it.</p>
                    </div>
                    <div class="p-6 rounded-2xl glass-card transition-transform duration-300 hover:-translate-y-1">
                        <h4 class="text-xl font-bold text-red-900 dark:text-dk-accent">⚖️ Everyone Should Have a Say</h4>
                        <p class="mt-2 text-gray-700 dark:text-gray-300">Right now, a few big tech companies control most AI. Dr. Li believes AI should be accessible to everyone, and that each person has the power to help shape how AI develops.</p>
                    </div>
                    <div class="p-6 rounded-2xl glass-card transition-transform duration-300 hover:-translate-y-1">
                        <h4 class="text-xl font-bold text-red-900 dark:text-dk-accent">🎯 Spatial Intelligence</h4>
                        <p class="mt-2 text-gray-700 dark:text-gray-300">Her company, World Labs, is working on "spatial intelligence" - teaching AI to understand and work with 3D spaces, like understanding rooms and physical objects. This is the next big step beyond just text and images!</p>
                    </div>
                    <div class="lg:col-span-2 p-6 rounded-2xl glass-card transition-transform duration-300 hover:-translate-y-1">
                        <h4 class="text-xl font-bold text-red-900 dark:text-dk-accent">📸 ImageNet: The Game Changer</h4>
                        <p class="mt-2 text-gray-700 dark:text-gray-300">Dr. Li created ImageNet - a huge collection of 15 million labeled photos. Before this, AI could barely recognize objects. ImageNet gave AI enough examples to learn from, starting the deep learning revolution. It's like how you learn better from many examples than just one!</p>
                    </div>
                    <div class="p-6 rounded-2xl glass-card transition-transform duration-300 hover:-translate-y-1">
                        <h4 class="text-xl font-bold text-red-900 dark:text-dk-accent">💪 The Power of Not Giving Up</h4>
                        <p class="mt-2 text-gray-700 dark:text-gray-300">Dr. Li immigrated to the US and worked at her family's dry cleaning business through college. This taught her resilience - the ability to keep going when things are hard. She says this is super important for science and life!</p>
                    </div>
                </div>
            </section>

            <section class="mt-20">
                <h3 class="text-3xl md:text-4xl font-bold text-center mb-10 text-red-900 dark:text-white">Big Questions About AI's Future</h3>
                <div id="accordion-container" class="max-w-4xl mx-auto space-y-4"></div>
            </section>

            <section class="mt-20">
                <h3 class="text-3xl md:text-4xl font-bold text-center mb-10 text-red-900 dark:text-white">What You Should Remember</h3>
                <div class="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl glass-card">
                    <ul class="space-y-4">
                        <li class="flex items-start"><span class="text-red-900 dark:text-dk-accent mr-3 mt-1 text-xl">✓</span><span><strong>Put Humans First:</strong> AI should help people, not replace them. We should stay in control and use AI as a tool.</span></li>
                        <li class="flex items-start"><span class="text-red-900 dark:text-dk-accent mr-3 mt-1 text-xl">✓</span><span><strong>Big Data Matters:</strong> ImageNet showed that AI learns better with lots of examples - just like you!</span></li>
                        <li class="flex items-start"><span class="text-red-900 dark:text-dk-accent mr-3 mt-1 text-xl">✓</span><span><strong>AI Affects Society:</strong> Jobs will change, energy use is a concern, and we need to think carefully about how to use AI ethically.</span></li>
                        <li class="flex items-start"><span class="text-red-900 dark:text-dk-accent mr-3 mt-1 text-xl">✓</span><span><strong>Learn to Think Critically:</strong> The most important skill for your future is thinking for yourself and questioning how to use AI responsibly.</span></li>
                        <li class="flex items-start"><span class="text-red-900 dark:text-dk-accent mr-3 mt-1 text-xl">✓</span><span><strong>Dr. Li's Advice:</strong> "Don't do stupid things with your tools." Use AI to ask better questions and learn more, not to cheat or be lazy!</span></li>
                    </ul>
                </div>
            </section>

            <section class="mt-20">
                <h3 class="text-3xl md:text-4xl font-bold text-center mb-10 text-red-900 dark:text-white">Test Your Knowledge</h3>
                <div id="quiz-container" class="max-w-4xl mx-auto space-y-8"></div>
                <div id="quiz-results" class="mt-8 text-center max-w-4xl mx-auto hidden">
                    <div class="p-8 rounded-2xl glass-card">
                        <h4 class="text-2xl font-bold text-red-900 dark:text-dk-accent">Quiz Complete!</h4>
                        <p class="mt-2 text-xl">Your Score: <span id="quiz-score" class="font-bold"></span></p>
                        <p id="quiz-feedback" class="mt-4 text-lg"></p>
                        <button id="quiz-retry-btn" class="mt-6 bg-red-900 dark:bg-dk-accent text-white dark:text-dk-bg font-bold py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        </main>

        <footer class="text-center py-8 mt-16 border-t border-gray-200 dark:border-dk-surface">
            <p class="text-gray-600 dark:text-gray-400">Learn more about the future of AI</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.getElementById('theme-toggle');
            const darkIcon = document.getElementById('theme-toggle-dark-icon');
            const lightIcon = document.getElementById('theme-toggle-light-icon');

            const updateIcon = () => {
                if (document.documentElement.classList.contains('dark')) {
                    lightIcon.classList.remove('hidden');
                    darkIcon.classList.add('hidden');
                } else {
                    lightIcon.classList.add('hidden');
                    darkIcon.classList.remove('hidden');
                }
            };

            themeToggleBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                document.documentElement.classList.toggle('light');
                localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                updateIcon();
            });
            updateIcon();

            const accordionData = [
                { title: 'Will AI Take Jobs?', content: 'AI will change many jobs, especially in customer support, programming, and data analysis. Dr. Li says companies and society need to help people learn new skills for the changing job market. The key is adapting and learning!' },
                { title: 'Will AI Become Too Powerful?', content: 'Dr. Li says we should develop AI responsibly, but not panic about extreme doomsday scenarios. AI is too new for strict international laws yet, but everyone should stay aware and informed about how it develops.' },
                { title: 'Does AI Use Too Much Energy?', content: 'Yes! AI models use huge amounts of electricity, which is bad for the environment. But Dr. Li sees this as an opportunity - it pushes us to invest more in renewable energy like solar and wind power!' },
                { title: 'How Should Parents Prepare Kids?', content: 'Dr. Li says parents should teach timeless values: thinking for yourself, being honest, being creative, and treating others with dignity. These human skills will always be important, even in an AI world!' },
                { title: 'How Should We Talk About AI?', content: 'Dr. Li worries that people talk about AI in too simple, black-and-white terms. She thinks teachers need better tools to help students understand AI and use it responsibly, not just fear it or misuse it.' }
            ];

            const accordionContainer = document.getElementById('accordion-container');
            accordionData.forEach((item) => {
                const accordionItem = document.createElement('div');
                accordionItem.className = 'border border-gray-300 dark:border-dk-surface rounded-lg overflow-hidden';
                accordionItem.innerHTML = \`
                    <button class="w-full text-left p-4 flex justify-between items-center bg-white dark:bg-dk-surface hover:bg-gray-50 dark:hover:bg-dk-surface/80 transition-colors">
                        <span class="font-bold text-red-900 dark:text-white">\${item.title}</span>
                        <svg class="w-5 h-5 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="max-h-0 overflow-hidden transition-all duration-500 ease-in-out">
                        <div class="p-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dk-surface/50">\${item.content}</div>
                    </div>
                \`;
                accordionContainer.appendChild(accordionItem);

                const button = accordionItem.querySelector('button');
                const content = accordionItem.querySelector('div');
                const icon = accordionItem.querySelector('svg');

                button.addEventListener('click', () => {
                    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                    if (isOpen) {
                        content.style.maxHeight = '0px';
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            });

            const quizData = [
                { question: "Why does Dr. Fei-Fei Li call AI a 'civilizational technology'?", answers: ["Because AI can think like humans", "Because it will affect how everyone lives and works", "Because it can solve all our problems", "Because it's only used in science"], correctAnswer: 1 },
                { question: "What is 'spatial intelligence'?", answers: ["AI that writes poems", "AI that understands 3D spaces and physical objects", "Intelligence of astronauts", "A type of human memory"], correctAnswer: 1 },
                { question: "What made ImageNet so important?", answers: ["It was the first AI to pass a test", "It was a small, perfect dataset", "It gave AI millions of examples to learn from", "It was a computer virus"], correctAnswer: 2 },
                { question: "What personal quality does Dr. Li say helped her succeed in science?", answers: ["Being competitive", "Resilience (not giving up)", "Being naturally smart", "Being skeptical"], correctAnswer: 1 },
                { question: "What's Dr. Li's main advice for students in the age of AI?", answers: ["Avoid all AI technology", "Learn to think critically and use AI responsibly", "Only learn coding", "Let AI do all your homework"], correctAnswer: 1 },
                { question: "How does Dr. Li view AI's high energy use?", answers: ["It will stop AI progress", "It's not a real problem", "It's a chance to invest in renewable energy", "Only governments can fix it"], correctAnswer: 2 },
            ];

            const quizContainer = document.getElementById('quiz-container');
            const quizResultsContainer = document.getElementById('quiz-results');
            const quizScoreEl = document.getElementById('quiz-score');
            const quizFeedbackEl = document.getElementById('quiz-feedback');
            const quizRetryBtn = document.getElementById('quiz-retry-btn');
            let score = 0;
            let questionsAnswered = 0;

            const renderQuiz = () => {
                score = 0;
                questionsAnswered = 0;
                quizContainer.innerHTML = '';
                quizResultsContainer.classList.add('hidden');

                quizData.forEach((q, index) => {
                    const questionEl = document.createElement('div');
                    questionEl.className = 'p-6 rounded-2xl glass-card';
                    questionEl.innerHTML = \`
                        <p class="font-bold text-lg text-red-900 dark:text-white mb-4">\${index + 1}. \${q.question}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3" data-question-index="\${index}">
                            \${q.answers.map((answer, i) => \`
                                <button class="quiz-option text-left p-3 border-2 border-gray-300 dark:border-dk-surface rounded-lg hover:border-red-900 dark:hover:border-dk-accent transition-all duration-300" data-answer-index="\${i}">
                                    <span class="font-bold mr-2">\${String.fromCharCode(65 + i)}.</span> \${answer}
                                </button>
                            \`).join('')}
                        </div>
                    \`;
                    quizContainer.appendChild(questionEl);
                });

                document.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.addEventListener('click', handleAnswer);
                });
            };

            const handleAnswer = (event) => {
                const selectedBtn = event.currentTarget;
                const parentDiv = selectedBtn.parentElement;
                const questionIndex = parseInt(parentDiv.dataset.questionIndex);
                const selectedAnswer = parseInt(selectedBtn.dataset.answerIndex);
                const correctAnswer = quizData[questionIndex].correctAnswer;

                parentDiv.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.disabled = true;
                    if(parseInt(btn.dataset.answerIndex) === correctAnswer) {
                        btn.classList.add('correct');
                    }
                });

                if (selectedAnswer === correctAnswer) {
                    score++;
                } else {
                    selectedBtn.classList.add('incorrect');
                }

                questionsAnswered++;
                if (questionsAnswered === quizData.length) {
                    setTimeout(showResults, 500);
                }
            };

            const showResults = () => {
                quizScoreEl.textContent = \`\${score} / \${quizData.length}\`;
                const percentage = (score / quizData.length) * 100;
                let feedback = "Good try! Keep learning about AI.";
                if (percentage === 100) feedback = "Perfect! You really understand Dr. Li's vision!";
                else if (percentage >= 75) feedback = "Excellent work! You've learned a lot!";
                else if (percentage >= 50) feedback = "Good job! You're getting the hang of it.";
                quizFeedbackEl.textContent = feedback;
                quizResultsContainer.classList.remove('hidden');
                quizResultsContainer.scrollIntoView({ behavior: 'smooth' });
            };

            quizRetryBtn.addEventListener('click', renderQuiz);
            renderQuiz();
        });
    </script>
</body>
</html>
`;

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Modern AI Starts with Teachable Machine",
    subtitle: "Experience how machine can learn like human",
    type: SlideType.TEACHABLE_MACHINE,
  },
  {
    id: 2,
    title: "Gamification: Brain Potential",
    type: SlideType.IMAGE_LAUNCHER,
    source: "https://brain-potential.vercel.app/",
    centerImage: "/image/Brain_vs_AI-1024.jpeg",
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
