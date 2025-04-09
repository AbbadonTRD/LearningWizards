import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GovernmentLevelsSortingProps {
  items: string[];
  correctOrder: string[];
  onComplete: (isCorrect: boolean) => void;
}

const GovernmentLevelsSorting: React.FC<GovernmentLevelsSortingProps> = ({
  items,
  correctOrder,
  onComplete
}) => {
  const [droppedItems, setDroppedItems] = useState<{
    bund: string[];
    kantone: string[];
    gemeinden: string[];
  }>({
    bund: [],
    kantone: [],
    gemeinden: []
  });

  const handleCheck = () => {
    const currentAnswers = [
      ...droppedItems.bund.map(item => `Bund:${item}`),
      ...droppedItems.kantone.map(item => `Kantone:${item}`),
      ...droppedItems.gemeinden.map(item => `Gemeinden:${item}`)
    ].sort();
    
    const isCorrect = JSON.stringify(currentAnswers.sort()) === JSON.stringify(correctOrder.sort());
    onComplete(isCorrect);
  };

  const renderDropZone = (title: string, items: string[], key: 'bund' | 'kantone' | 'gemeinden') => (
    <div className="space-y-4">
      <h4 className="text-lg pixel-text text-yellow-400 mb-4 text-center">{title}</h4>
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
          
          // Remove from all other zones
          const newDroppedItems = {
            bund: droppedItems.bund.filter(i => i !== item),
            kantone: droppedItems.kantone.filter(i => i !== item),
            gemeinden: droppedItems.gemeinden.filter(i => i !== item)
          };
          
          // Add to current zone if not already there
          if (!items.includes(item)) {
            newDroppedItems[key] = [...items, item];
          }
          
          setDroppedItems(newDroppedItems);
        }}
      >
        {items.map((item, index) => (
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
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {renderDropZone('Bundesebene', droppedItems.bund, 'bund')}
        {renderDropZone('Kantonsebene', droppedItems.kantone, 'kantone')}
        {renderDropZone('Gemeindeebene', droppedItems.gemeinden, 'gemeinden')}
      </div>

      {/* Draggable Items */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {items.filter(item => 
          !droppedItems.bund.includes(item) && 
          !droppedItems.kantone.includes(item) &&
          !droppedItems.gemeinden.includes(item)
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

export default GovernmentLevelsSorting;