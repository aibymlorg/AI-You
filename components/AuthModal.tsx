import React, { useState } from 'react';
import { registerPlayer, loginPlayer } from '../services/authServiceSupabase';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const fillDemoCredentials = () => {
    setEmail('demo@ai-you.com');
    setPassword('demo123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'register') {
      // Validation
      if (!username || !email || !password) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      if (username.length < 3) {
        setError('Username must be at least 3 characters');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      const result = await registerPlayer({ username, email, password });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message);
      }
    } else {
      // Login
      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      const result = await loginPlayer({ email, password });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message);
      }
    }

    setLoading(false);
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in duration-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => { setMode('login'); resetForm(); }}
            className={`flex-1 py-2 rounded-md font-semibold transition ${
              mode === 'login'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode('register'); resetForm(); }}
            className={`flex-1 py-2 rounded-md font-semibold transition ${
              mode === 'register'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Demo Credentials Info */}
        {mode === 'login' && (
          <div className="mb-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-blue-300 font-semibold mb-2">Demo Account:</p>
                <div className="text-xs text-blue-200 space-y-1">
                  <p><span className="font-mono bg-blue-900/30 px-2 py-0.5 rounded">demo@ai-you.com</span></p>
                  <p><span className="font-mono bg-blue-900/30 px-2 py-0.5 rounded">demo123</span></p>
                </div>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold transition"
              >
                Use Demo
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Min. 6 characters' : 'Enter password'}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button onClick={switchMode} className="text-purple-400 hover:text-purple-300 font-semibold">
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={switchMode} className="text-purple-400 hover:text-purple-300 font-semibold">
                Login here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
