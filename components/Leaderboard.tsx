import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllPlayers } from '../services/authServiceSupabase';
import { Player } from '../player-types';
import { useLanguage } from '../contexts/LanguageContext';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlayerId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose, currentPlayerId }) => {
  const { t } = useLanguage();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const allPlayers = await getAllPlayers();
      // Take top 10 players
      setPlayers(allPlayers.slice(0, 10));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-slate-300" size={24} />;
      case 3:
        return <Medal className="text-amber-600" size={24} />;
      default:
        return <span className="text-lg font-bold text-slate-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2:
        return 'from-slate-400/20 to-slate-500/20 border-slate-400/30';
      case 3:
        return 'from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'from-slate-700/20 to-slate-800/20 border-slate-600/30';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Leaderboard Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/40 to-slate-900 p-6 border-b border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <TrendingUp className="text-purple-400" size={32} />
                  {t('leaderboard.title')}
                </h2>
                <p className="text-slate-400 mt-1">{t('leaderboard.subtitle')}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Leaderboard Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : players.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="mx-auto text-slate-600 mb-4" size={48} />
                  <p className="text-slate-400">{t('leaderboard.noPlayers')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {players.map((player, index) => {
                    const rank = index + 1;
                    const isCurrentPlayer = player.id === currentPlayerId;

                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          relative p-4 rounded-xl border backdrop-blur-sm
                          ${isCurrentPlayer
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 ring-2 ring-purple-500/30'
                            : `bg-gradient-to-r ${getRankColor(rank)}`
                          }
                          transition-all duration-300 hover:scale-[1.02]
                        `}
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank */}
                          <div className="flex-shrink-0 w-12 flex items-center justify-center">
                            {getRankIcon(rank)}
                          </div>

                          {/* Player Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-white truncate">
                                {player.username}
                              </p>
                              {isCurrentPlayer && (
                                <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                                  {t('leaderboard.you')}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-slate-400">
                                {t('leaderboard.missionsCompleted')}: {player.completedMissions?.length || 0}
                              </span>
                              {player.badges && player.badges.length > 0 && (
                                <>
                                  <span className="text-slate-600">•</span>
                                  <span className="text-sm text-slate-400">
                                    {player.badges.length} {t('leaderboard.badges')}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* XP */}
                          <div className="flex-shrink-0 text-right">
                            <div className="flex items-center gap-1">
                              <Trophy className="text-yellow-400" size={16} />
                              <span className="text-2xl font-bold text-white">
                                {player.xp || 0}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">XP</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-700 text-center">
              <p className="text-sm text-slate-400">
                {t('leaderboard.updateInfo')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Leaderboard;
