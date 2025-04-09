import React from 'react';

const OverviewScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 rainbow-text">OVERVIEW</h1>
        <p className="text-black pixel-text text-lg text-center">
          This course is designed to develop your reading, writing, and critical thinking skills for the upcoming ABU SCHWEIZ UND POLITIK EXAM, you will read theorie inputs and defeat the evil hazards younglings with solving the Exercises that follow. With enough points you get to fight the evil hazard himself
        </p>
      </div>
    </div>
  );
};

export default OverviewScreen