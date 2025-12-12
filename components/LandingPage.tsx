import React from 'react';

interface LandingPageProps {
  onStartMission: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartMission }) => {
  return (
    <div className="bg-slate-950 text-slate-100 antialiased overflow-x-hidden w-full h-full overflow-y-auto">
      {/* Navbar */}
      <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold font-['Space_Grotesk'] tracking-tighter">AI & YOU</div>
        <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-slate-200 transition">Login</button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-32 px-6 text-center max-w-5xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-20 -z-10"></div>

        <span className="inline-block py-1 px-3 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium mb-6 text-purple-300">
          For Grade 10 Innovators
        </span>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-['Space_Grotesk']">
          Wait controlled by the AI. <br />
          <span className="text-slate-500 text-4xl md:text-6xl my-2 block">OR</span>
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Manage it.
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Join the gamified experience that takes you from basic machine learning, to ChatGPT, to the ethics of AGI. Understand the 'AI'.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={onStartMission}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg shadow-purple-900/50"
          >
            Start Your Mission
          </button>
          <button className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-lg font-bold text-lg hover:bg-slate-700 transition">
            View Leaderboard
          </button>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-12 text-sm text-slate-500 font-medium">
          <p className="mb-3 uppercase tracking-widest text-xs">Engineered With</p>
          <div className="flex justify-center gap-4 items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-500 flex-wrap">
            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Gemini</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"></div> OpenAI</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full"></div> Anthropic</span>
            <span className="flex items-center gap-2 font-bold text-white">AIbyML.com</span>
          </div>
        </div>
      </header>

      {/* The Gamification Strip */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-1">XP</div>
            <div className="text-sm text-slate-400">Earn Experience Points</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400 mb-1">Badges</div>
            <div className="text-sm text-slate-400">Unlock Achievements</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-1">Battle</div>
            <div className="text-sm text-slate-400">Compete on Leaderboards</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-1">Certify</div>
            <div className="text-sm text-slate-400">Get Real Credentials</div>
          </div>
        </div>
      </section>

      {/* The Modules (Map) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center font-['Space_Grotesk']">The Mission Map</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.4)] transition duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-800 text-xs px-3 py-1 rounded-bl-lg text-slate-300 font-mono">MODULE 01</div>
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center text-2xl mb-6">🧠</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition font-['Space_Grotesk']">Modern AI Starts Here</h3>
            <p className="text-slate-400 text-sm mb-4">Hands-on with Teachable Machine. Train your computer to recognize images, sounds, and poses.</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-auto">
              <div className="bg-purple-500 h-1.5 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.4)] transition duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-800 text-xs px-3 py-1 rounded-bl-lg text-slate-300 font-mono">MODULE 02</div>
            <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center text-2xl mb-6">🌐</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition font-['Space_Grotesk']">The Current State</h3>
            <p className="text-slate-400 text-sm mb-4">Deep dive into Generative AI. How do LLMs like Gemini and Claude actually think?</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-auto">
              <div className="bg-blue-500 h-1.5 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.4)] transition duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-800 text-xs px-3 py-1 rounded-bl-lg text-slate-300 font-mono">MODULE 03</div>
            <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center text-2xl mb-6">🚫</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition font-['Space_Grotesk']">The Limits of AI</h3>
            <p className="text-slate-400 text-sm mb-4">Explore "Hallucinations." Learn what AI fails at and why human intuition is still king.</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-auto">
              <div className="bg-red-500 h-1.5 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.4)] transition duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-800 text-xs px-3 py-1 rounded-bl-lg text-slate-300 font-mono">MODULE 04</div>
            <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center text-2xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition font-['Space_Grotesk']">The Future of AI</h3>
            <p className="text-slate-400 text-sm mb-4">AGI, Space Travel, and Medicine. What will the world look like when you graduate?</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-auto">
              <div className="bg-green-500 h-1.5 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.4)] transition duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-800 text-xs px-3 py-1 rounded-bl-lg text-slate-300 font-mono">MODULE 05</div>
            <div className="w-12 h-12 bg-yellow-900/50 rounded-lg flex items-center justify-center text-2xl mb-6">⚖️</div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition font-['Space_Grotesk']">The Ethics of AI</h3>
            <p className="text-slate-400 text-sm mb-4">Deepfakes, Bias, and Power. Navigating the moral dilemmas of the new digital age.</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-auto">
              <div className="bg-yellow-500 h-1.5 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold mb-2 text-white font-['Space_Grotesk']">Ready to Begin?</h3>
            <p className="text-purple-200 text-sm mb-6">Join your classmates on the leaderboard.</p>
            <button
              onClick={onStartMission}
              className="px-6 py-2 bg-white text-purple-900 font-bold rounded-full hover:bg-purple-100 transition"
            >
              Create Account
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 text-center text-slate-600 text-sm">
        <p className="mb-4">AI & YOU &copy; 2024. Educational Material for Grade 10.</p>
        <p className="flex justify-center gap-4 flex-wrap">
          <span>Powered by Gemini</span>
          <span>•</span>
          <span>OpenAI</span>
          <span>•</span>
          <span>Anthropic</span>
          <span>•</span>
          <span className="text-purple-500 font-bold">AIbyML.com</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
