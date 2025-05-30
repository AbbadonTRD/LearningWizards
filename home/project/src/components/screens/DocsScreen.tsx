import React, { useState, useEffect } from 'react';
import { Stars } from '../Stars';
import { Coins } from 'lucide-react';
import SoundToggle from '../SoundToggle';
import parse from 'html-react-parser';
import { motion, AnimatePresence } from 'framer-motion';
import { LearningContent, Exercise, LearningProgress } from '../../types';
import { AlertCircle, ChevronRight } from 'lucide-react';
import LoadingScreen from '../LoadingScreen';
import { createClient } from '@supabase/supabase-js';
import { learningContent, exercises } from '../../data/learningContent';

interface DocsScreenProps {
  playerName: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface SolutionPopupProps {
  exercise: Exercise;
  onClose: () => void;
  activeSection: number;
  setActiveSection: (section: number) => void;
}

const SolutionPopup: React.FC<SolutionPopupProps> = ({ exercise, onClose, activeSection, setActiveSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-black/80 p-8 rounded-lg shadow-xl max-w-2xl w-full no-select" onContextMenu={(e) => e.preventDefault()}>
        <h3 className="text-2xl font-bold mb-6 text-white pixel-text">Lösung:</h3>
        
        {exercise.type === 'multiple-choice' && (
          <div className="text-white pixel-text">
            <p className="mb-4">Die richtige Antwort ist:</p>
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
              {exercise.content.correctAnswer}
            </div>
          </div>
        )}

        {exercise.type === 'text-input' && (
          <div className="text-white pixel-text">
            <p className="mb-4">Die richtige Antwort ist:</p>
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
              {exercise.content.textAnswer?.split(',').join(', ')}
            </div>
          </div>
        )}

        {exercise.type === 'sorting' && (
          <div className="text-white pixel-text">
            <p className="mb-4">Die richtige Zuordnung ist:</p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-yellow-400 mb-4">Politische Rechte:</h4>
                <div className="space-y-2">
                  {exercise.content.correctOrder
                    ?.filter(item => item.startsWith('Politische Rechte:'))
                    .map(item => item.split(':')[1])
                    .map((item, i) => (
                      <div key={i} className="bg-green-500/20 p-2 rounded">
                        {item}
                      </div>
                    ))
                  }
                </div>
              </div>
              <div>
                <h4 className="text-yellow-400 mb-4">Bürgerpflichten:</h4>
                <div className="space-y-2">
                  {exercise.content.correctOrder
                    ?.filter(item => item.startsWith('Bürgerpflichten:'))
                    .map(item => item.split(':')[1])
                    .map((item, i) => (
                      <div key={i} className="bg-green-500/20 p-2 rounded">
                        {item}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              onClose();
              if (activeSection < learningContent.length) {
                setActiveSection(activeSection + 1);
              }
            }}
            className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors pixel-text"
          >
            Verstanden
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface FeedbackPopupProps {
  points: number;
  onClose: () => void;
  setShowExercise: (show: boolean) => void;
  setProgress: React.Dispatch<React.SetStateAction<LearningProgress>>;
  activeSection: number;
  setActiveSection: (section: number) => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ points, onClose, setProgress, setShowExercise, activeSection, setActiveSection }) => {
  const messages = {
    3: {
      color: 'bg-green-500',
      text: 'Fantastisch! Erster Versuch - perfekt gemacht! 🌟',
    },
    2: {
      color: 'bg-yellow-500',
      text: 'Sehr gut! Beim zweiten Versuch geschafft! 👏',
    },
    1: {
      color: 'bg-orange-500',
      text: 'Geschafft! Weiter so! 💪',
    },
    0: {
      color: 'bg-red-500',
      text: 'Nicht aufgeben! Beim nächsten Mal klappt es besser! 🎯',
    }
  };

  const feedback = messages[points as keyof typeof messages];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
    >
      <div className={`${feedback.color} p-8 rounded-lg shadow-xl max-w-md text-center`}>
        <h3 className="text-2xl font-bold mb-4 text-white">
          {points} {points === 1 ? 'Punkt' : 'Punkte'}
        </h3>
        <p className="text-white mb-6">{feedback.text}</p>
        <div className="flex gap-4 justify-center">
          {points < 3 && (
            <button
              onClick={() => setProgress(prev => ({ ...prev, showSolution: true }))}
              className="bg-white/10 text-white px-6 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors"
            >
              Lösung Anzeigen
            </button>
          )}
          <button
            onClick={() => {
              onClose();
              setShowExercise(false);
              if (activeSection < learningContent.length) {
                setActiveSection(activeSection + 1);
              }
            }}
            className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Weiter
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DocsScreen: React.FC<DocsScreenProps> = ({ playerName }) => {
  const [activeSection, setActiveSection] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [unlockedSections, setUnlockedSections] = useState<number[]>([1]);
  const [showExercise, setShowExercise] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [droppedItems, setDroppedItems] = useState<{
    politischeRechte: string[];
    burgerpflichten: string[];
  }>({
    politischeRechte: [],
    burgerpflichten: []
  });
  const [progress, setProgress] = useState<LearningProgress>({
    currentLevel: 1,
    points: 0,
    attempts: 0,
    accuracy: 0,
    uniqueQuestionsAttempted: new Set(),
    showHint: false,
    showSolution: false
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialUnlocked = [1];
    setUnlockedSections(initialUnlocked);
    
    for (let i = 0; i < learningContent.length; i++) {
      learningContent[i].isLocked = !initialUnlocked.includes(learningContent[i].id);
    }
    
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const unlockNextSection = () => {
    if (activeSection < learningContent.length) {
      const nextSectionId = activeSection + 1;
      
      if (!unlockedSections.includes(nextSectionId)) {
        setUnlockedSections(prev => [...prev, nextSectionId]);
        
        const updatedContent = [...learningContent];
        const nextSectionIndex = updatedContent.findIndex(section => section.id === nextSectionId);
        if (nextSectionIndex !== -1) {
          updatedContent[nextSectionIndex].isLocked = false;
        }
        Object.assign(learningContent, updatedContent);
      }
    }
  };

  const canUnlockEndBoss = () => {
    return progress.accuracy >= 70 && progress.points >= 30;
  };

  const checkQuestionCooldown = async (questionId: number) => {
    const { data, error } = await supabase
      .from('question_attempts')
      .select('cooldown_until')
      .eq('player_name', playerName)
      .eq('question_id', questionId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error checking cooldown:', error);
      return true;
    }

    if (!data || data.length === 0) return false;
    return new Date(data[0].cooldown_until) > new Date();
  };

  const recordAttempt = async (questionId: number, correct: boolean) => {
    const { error: insertError } = await supabase
      .from('question_attempts')
      .insert([{
        player_name: playerName,
        question_id: questionId,
        correct: correct
      }]);

    if (insertError) {
      console.error('Error recording attempt:', insertError);
      return;
    }

    const { data: accuracyData } = await supabase
      .rpc('calculate_player_accuracy', { p_player_name: playerName });

    setProgress(prev => ({
      ...prev,
      accuracy: accuracyData || 0,
      uniqueQuestionsAttempted: new Set([...prev.uniqueQuestionsAttempted, questionId])
    }));
  };

  const currentExercise = exercises[activeSection - 1];

  console.log('Current unlocked sections:', unlockedSections);
  console.log('Current active section:', activeSection);
  console.log('Learning content:', learningContent);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative">
      {isLoading && <LoadingScreen />}
      <Stars />
      <div className="text-[8px] text-gray-500/20 fixed top-1 right-1 pointer-events-none">Created by Tiago Cevallos</div>
      
      <AnimatePresence>
        {showSolution && currentExercise && (
          <SolutionPopup
            exercise={currentExercise}
            onClose={() => {
              setShowSolution(false);
              setShowFeedback(false);
              setShowExercise(false);
              if (activeSection < learningContent.length) {
                unlockNextSection();
                setActiveSection(activeSection + 1);
              }
            }}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}
        {showFeedback && (
          <FeedbackPopup
            points={earnedPoints}
            setShowExercise={setShowExercise}
            onClose={() => {
              setShowFeedback(false);
              if (activeSection < learningContent.length) {
                unlockNextSection();
                setActiveSection(activeSection + 1);
              }
            }}
            setProgress={() => {
              setShowFeedback(false);
              setShowSolution(true);
            }}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}
      </AnimatePresence>
      
      <SoundToggle />
      
      <div className="fixed top-4 right-4 z-50 bg-black/30 backdrop-blur-sm p-4 rounded-lg border-2 border-white/20">
        <div className="pixel-text text-xl text-yellow-400 flex flex-col items-end gap-2">
          <Coins className="w-6 h-6" />
          <div>{progress.points} Coins</div>
        </div>
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/10 p-2 rounded-lg"
      >
        <ChevronRight className={`w-6 h-6 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`
        fixed top-0 left-0 h-full w-64 bg-black/30 backdrop-blur-sm border-r-2 border-white/20
        transition-transform z-40 overflow-y-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        w-80
      `}>
        <div className="p-6">
          <h1 className="text-xl pixel-text mb-4">Learning Wizard</h1>
          <p className="text-sm text-gray-400 mb-8">Level {progress.currentLevel}</p>
          <nav className="space-y-2">
            {learningContent.map((section) => (
              <div key={section.id} className="mb-4">
                <a
                  href={`#${section.id}`}
                  className={`
                    block py-2 px-4 rounded transition-colors pixel-text text-sm font-bold mb-2
                    ${(!unlockedSections.includes(section.id) || (section.id === 14 && !canUnlockEndBoss())) ? 'opacity-50 cursor-not-allowed' : ''}
                    ${activeSection === section.id ? 'bg-white/10 text-yellow-400' : 'hover:bg-white/5'} 
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!unlockedSections.includes(section.id) || (section.id === 14 && !canUnlockEndBoss())) return;
                    setActiveSection(section.id);
                    setShowExercise(false);
                  }}
                >
                  {section.title} {(!unlockedSections.includes(section.id) || (section.id === 14 && !canUnlockEndBoss())) && '🔒'}
                </a>
                {unlockedSections.includes(section.id) && section.parts && section.parts.map(part => (
                  <a
                    key={part.id}
                    href={`#${part.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(section.id);
                      setShowExercise(true);
                    }}
                    className="block py-1 px-8 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {part.title}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className={`
        px-6 py-24 transition-[margin]
        ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}
      `}>
        <div className="max-w-3xl mx-auto overflow-hidden">
          {!showExercise ? (
            <div>
              <div className="prose prose-invert pixel-text text-sm leading-relaxed mb-8 break-words">
                {learningContent[activeSection - 1]?.content && parse(learningContent[activeSection - 1].content)}
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border-2 border-white/20 text-center">
                <p className="text-white/70 mb-4">Are you Ready for</p>
                <button
                  onClick={() => setShowExercise(true)}
                  className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg pixel-text text-yellow-400"
                >
                  Next Level
                </button>
              </div>
            </div>
          ) : currentExercise ? (
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border-2 border-white/20 no-select" onContextMenu={e => e.preventDefault()}>
              <h3 className="text-xl pixel-text mb-6">{currentExercise.question}</h3>
              
              <div className="mb-6 flex justify-between items-center px-4 py-2 bg-black/20 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-400">Mögliche Punkte: </span>
                  <span className="text-yellow-400 font-bold">
                    {progress.attempts === 0 ? "3" :
                     progress.attempts === 1 ? "2" :
                     progress.attempts === 2 ? "1" : "0"}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Versuche: </span>
                  <span className="text-white">{progress.attempts}/3</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {currentExercise.type === 'multiple-choice' && currentExercise.content.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={async () => {
                      const isCorrect = option === currentExercise.content.correctAnswer;
                      const questionId = currentExercise.id;

                      const isOnCooldown = await checkQuestionCooldown(questionId);
                      if (isOnCooldown) {
                        alert('This question is on cooldown. Try again in 24 hours!');
                        return;
                      }

                      await recordAttempt(questionId, isCorrect);
                      
                      if (isCorrect) {
                        const points = progress.attempts === 0 ? 3 : 
                                     progress.attempts === 1 ? 2 : 1;

                        if (!progress.uniqueQuestionsAttempted.has(questionId)) {
                          setEarnedPoints(points);
                          unlockNextSection();
                          setProgress(prev => ({
                            ...prev,
                            points: prev.points + points,
                            currentLevel: prev.currentLevel + 1,
                            attempts: 0,
                            showHint: false,
                            showSolution: false
                          }));
                        }
                        
                        const { error } = await supabase
                          .from('leaderboard')
                          .upsert([
                            {
                              player_name: playerName,
                              score: progress.points + points,
                              completed: activeSection === learningContent.length
                            }
                          ]);

                        if (error) {
                          console.error('Error updating leaderboard:', error);
                        }
                        
                        setShowFeedback(true);
                      } else {
                        setProgress(prev => {
                          const newAttempts = prev.attempts + 1;
                          if (newAttempts >= 3) {
                            setEarnedPoints(0);
                            setShowFeedback(true);
                            return {
                              ...prev,
                              attempts: 0,
                              showHint: false,
                              showSolution: false
                            };
                          }
                          return {
                            ...prev,
                            attempts: newAttempts,
                            showHint: newAttempts >= 3,
                            showSolution: newAttempts >= 4
                          };
                        });
                      }
                    }}
                    className="w-full text-left px-6 py-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors pixel-text"
                  >
                    {option}
                  </button>
                ))}

                {currentExercise.type === 'text-input' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pixel-text text-white no-select"
                      placeholder="Geben Sie Ihre Antwort ein..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget.value;
                          const isCorrect = input.toLowerCase().split(',').sort().join(',') === 
                            currentExercise.content.textAnswer?.toLowerCase().split(',').sort().join(',');

                          if (isCorrect) {
                            const points = progress.attempts === 0 ? 3 : 
                                         progress.attempts === 1 ? 2 : 1;
                            
                            setEarnedPoints(points);
                            unlockNextSection();
                            setProgress(prev => ({
                              ...prev,
                              points: prev.points + points,
                              currentLevel: prev.currentLevel + 1,
                              attempts: 0,
                              showHint: false,
                              showSolution: false
                            }));
                            setShowFeedback(true);
                          } else {
                            setProgress(prev => {
                              const newAttempts = prev.attempts + 1;
                              if (newAttempts >= 3) {
                                setEarnedPoints(0);
                                setShowFeedback(true);
                                return {
                                  ...prev,
                                  attempts: 0,
                                  showHint: false,
                                  showSolution: false
                                };
                              }
                              return {
                                ...prev,
                                attempts: newAttempts,
                                showHint: newAttempts >= 3,
                                showSolution: newAttempts >= 4
                              };
                            });
                          }
                        }
                      }}
                    />
                  </div>
                )}

                {currentExercise.type === 'sorting' && (
                  <div className="space-y-8">
                    <p className="text-sm text-gray-400 mb-4">{currentExercise.description}</p>
                    
                    <div className="grid grid-cols-2 gap-8">
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

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {currentExercise.content.items?.filter(item => 
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
                          className={`
                            bg-white/10 border border-white/20 rounded-lg p-4 
                            pixel-text text-white text-center
                            cursor-grab active:cursor-grabbing hover:bg-white/20
                            select-none
                          `}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const correctAnswers = currentExercise.content.correctOrder || [];
                        const currentAnswers = [
                          ...droppedItems.politischeRechte.map(item => `Politische Rechte:${item}`),
                          ...droppedItems.burgerpflichten.map(item => `Bürgerpflichten:${item}`)
                
                        ].sort();
                        
                        const isCorrect = JSON.stringify(currentAnswers.sort()) === JSON.stringify(correctAnswers.sort());

                        if (isCorrect) {
                          const points = progress.attempts === 0 ? 3 : 
                                       progress.attempts === 1 ? 2 : 1;
                          
                          setEarnedPoints(points);
                          unlockNextSection();
                          setProgress(prev => ({
                            ...prev,
                            points: prev.points + points,
                            currentLevel: prev.currentLevel + 1,
                            attempts: 0,
                            showHint: false,
                            showSolution: false
                          }));
                          setShowFeedback(true);
                        } else {
                          setProgress(prev => {
                            const newAttempts = prev.attempts + 1;
                            if