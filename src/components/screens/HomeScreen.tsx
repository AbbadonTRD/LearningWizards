import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeScreenProps {
  onStart: () => void;
}

interface LeaderboardEntry {
  player_name: string;
  score: number;
  completed: boolean;
  created_at: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Stars = () => {
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`
  }));

  return (
    <>
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay
          }}
        />
      ))}
    </>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      setLeaderboard(data);
    };

    if (showLeaderboard) {
      fetchLeaderboard();
    }
  }, [showLeaderboard]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden flex flex-col items-center justify-center p-4">
      <Stars />
      
      <div className="absolute top-4 left-4 pixel-text text-sm text-gray-500">
        <span className="hidden sm:inline">SOUND: *ON*</span>
      </div>
      
      <div className="text-center space-y-8 relative z-10 max-w-lg mx-auto w-full px-4">
        <h1 className="text-4xl sm:text-6xl pixel-text mb-4 leading-relaxed">
          <div className="mb-2">Learning</div>
          <div className="title-gradient">WIZARD</div>
        </h1>
        <div className="space-y-4">
          <button
            onClick={onStart}
            className="block w-52 mx-auto px-4 py-2 text-white pixel-text hover:text-yellow-400 transition-colors bg-white/10 rounded-lg hover:bg-white/20 whitespace-nowrap text-center"
          >
            START
          </button>
          <button
            className="block w-52 mx-auto px-4 py-2 text-white pixel-text hover:text-yellow-400 transition-colors bg-white/10 rounded-lg hover:bg-white/20 whitespace-nowrap text-center"
            onClick={() => setShowLeaderboard(true)}
          >
            LEADERBOARD
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <div className="bg-black/80 rounded-lg p-4 sm:p-8 max-w-2xl w-full border-2 border-white/20 my-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-lg sm:text-2xl pixel-text text-yellow-400">Top Players</h2>
                </div>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-white/60 hover:text-white pixel-text"
                >
                  Close
                </button>
              </div>
              
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl pixel-text text-yellow-400">
                        #{index + 1}
                      </span>
                      <div>
                        <h3 className="pixel-text text-white">
                          {entry.player_name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="pixel-text text-xl text-yellow-400">
                        {entry.score}
                      </span>
                      <span className="text-sm text-gray-400">points</span>
                      {entry.completed && (
                        <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;