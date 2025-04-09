export interface Character {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
}

export interface LearningContent {
  id: number;
  title: string;
  content: string;
  category: string;
  isLocked: boolean;
}

export interface Exercise {
  id: number;
  question: string;
  type: 'multiple-choice' | 'text-input' | 'sorting';
  content: {
    options?: string[];
    correctAnswer?: string;
    items?: string[];
    correctOrder?: string[];
    textAnswer?: string;
  };
  hint?: string;
}

export interface LearningProgress {
  currentLevel: number;
  points: number;
  attempts: number;
  accuracy: number;
  uniqueQuestionsAttempted: Set<number>;
  showHint: boolean;
  showSolution: boolean;
}