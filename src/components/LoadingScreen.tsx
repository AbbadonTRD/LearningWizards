import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
      <div className="text-[8px] text-gray-500/20 fixed top-4 left-4">Created by Tiago Cevallos</div>
      
      <div className="text-center">
        <motion.div 
          className="w-16 h-16 border-4 border-yellow-400 rounded-lg relative"
          animate={{
            rotate: 360,
            borderRadius: ["16%", "50%", "16%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-yellow-400/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <motion.p 
          className="mt-4 text-yellow-400 pixel-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          LOADING...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;