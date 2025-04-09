import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PoliticalRightsSortingProps {
  items: string[];
  correctOrder: string[];
  onComplete: (isCorrect: boolean) => void;
}

const PoliticalRightsSorting: React.FC<PoliticalRightsSortingProps> = ({
  items,
  correctOrder,
  onComplete
}) => {
  const [droppedItems, setDroppedItems] = useState<{
    politischeRechte: string[];
    burgerpflichten: string[];
  }>({
    politischeRechte: [],
    burgerpflichten: []
  });

  const handleCheck = () => {
    const currentAnswers = [
      ...droppedItems.politischeRechte.map(item => `Politische Rechte:${item}`),
      ...droppedItems.burgerpflichten.map(item => `Bürgerpflichten:${item}`)
    ].sort();
    
    const isCorrect = JSON.stringify(currentAnswers.sort()) === JSON.stringify(correctOrder.sort());
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Politische Rechte Column */}
        <div className="space-y-4">
          <h4 className="text-lg pixel-text text-yellow-400 mb-4 text-center">Politische Rechte</h4>
          <motion.div 
            className="min-h-[200px] bg-white/5 rounded-lg p-4 border-2 border-dashed border-white/20 space-y-2 transition-colors"
            animate={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              const item = e.dataTransfer.getData("text");
              if (!droppedItems.politischeRechte.includes(item)) {
                setDroppedItems(prev => ({
                  ...prev,
                  politischeRechte: [...prev.politischeRechte, item],
                  burgerpflichten: prev.burgerpflichten.filter(i => i !== item)
                }));
              }
            }}
          >
            {droppedItems.politischeRechte.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 border border-white/20 rounded-lg p-4 pixel-text text-white text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("text", item);
                  e.dataTransfer.effectAllowed = 'move';
                }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bürgerpflichten Column */}
        <div className="space-y-4">
          <h4 className="text-lg pixel-text text-yellow-400 mb-4 text-center">Bürgerpflichten</h4>
          <motion.div 
            className="min-h-[200px] bg-white/5 rounded-lg p-4 border-2 border-dashed border-white/20 space-y-2 transition-colors"
            animate={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              const item = e.dataTransfer.getData("text");
              if (!droppedItems.burgerpflichten.includes(item)) {
                setDroppedItems(prev => ({
                  ...prev,
                  burgerpflichten: [...prev.burgerpflichten, item],
                  politischeRechte: prev.politischeRechte.filter(i => i !== item)
                }));
              }
            }}
          >
            {droppedItems.burgerpflichten.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 border border-white/20 rounded-lg p-4 pixel-text text-white text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("text", item);
                  e.dataTransfer.effectAllowed = 'move';
                }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Draggable Items */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        {items.filter(item => 
          !droppedItems.politischeRechte.includes(item) && 
          !droppedItems.burgerpflichten.includes(item)
        ).map((item, index) => (
          <motion.div 
            key={index} 
            draggable="true"
            whileHover={{ scale: 1.05 }}
            onDragStart={(e: React.DragEvent) => {
              if (e.dataTransfer) {
                e.dataTransfer.setData("text", item);
                e.dataTransfer.effectAllowed = 'move';
              }
            }}
            onDragEnd={(e) => {
              e.preventDefault();
            }}
            className="bg-white/10 border border-white/20 rounded-lg p-4 pixel-text text-white text-center cursor-grab active:cursor-grabbing hover:bg-white/20 select-none"
          >
            {item}
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleCheck}
        className="w-full mt-8 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg pixel-text text-yellow-400"
      >
        Überprüfen
      </button>
    </div>
  );
};

export default PoliticalRightsSorting;