import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useExamination } from "@/context/examination-context";
import QuestionCard from "@/components/question-card";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import MenuDialog from "@/components/ui/menu-dialog";
import PrayersDialog from "@/components/ui/prayers-dialog";

export default function Examination() {
  const [, navigate] = useLocation();
  const {
    getCurrentCategory,
    getCurrentQuestion,
    getCurrentQuestionNumber,
    getTotalQuestions,
    goToNextQuestion,
    markSin,
    resetExamination,
  } = useExamination();
  
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const [showPrayersDialog, setShowPrayersDialog] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const questionCardRef = useRef<HTMLDivElement>(null);
  const currentQuestion = getCurrentQuestion();
  
  // Helper function to safely transition to next question with animation
  const transitionToNextQuestion = (direction: 'left' | 'right') => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setIsTransitioning(true);
    
    // Add animation class
    if (questionCardRef.current) {
      questionCardRef.current.classList.add(`swipe-${direction}`);
      
      // After animation, go to next question with a delay of 2 seconds (2000ms)
      setTimeout(() => {
        const { isEnd } = goToNextQuestion();
        
        if (isEnd) {
          navigate("/additional-sins");
        } else {
          // Remove animation class for next question after a short delay
          if (questionCardRef.current) {
            questionCardRef.current.classList.remove(`swipe-${direction}`);
          }
          // Reset transitioning state
          setIsTransitioning(false);
        }
      }, 2000); // 2-second delay to allow users to see selection
    } else {
      // If ref not available, still transition but without animation
      const { isEnd } = goToNextQuestion();
      if (isEnd) {
        navigate("/additional-sins");
      } else {
        setIsTransitioning(false);
      }
    }
  };
  
  const handleMarkSinGuilty = () => {
    if (isTransitioning) return;
    
    const category = getCurrentCategory();
    
    markSin({
      category: category.name,
      text: currentQuestion,
    });
    
    transitionToNextQuestion('right');
  };
  
  const handleSkipSin = () => {
    if (isTransitioning) return;
    transitionToNextQuestion('left');
  };
  
  const handleRadioChange = (value: string) => {
    if (isTransitioning) return;
    
    if (value === "guilty") {
      handleMarkSinGuilty();
    } else if (value === "not-guilty") {
      handleSkipSin();
    }
  };
  
  const handleNextQuestion = () => {
    if (isTransitioning) return;
    
    const { isEnd } = goToNextQuestion();
    if (isEnd) {
      navigate("/additional-sins");
    }
  };
  
  const handleRestartExamination = () => {
    resetExamination();
    setIsTransitioning(false);
    setShowRestartDialog(false);
  };
  
  const handleExitExamination = () => {
    navigate("/");
    setShowExitDialog(false);
  };
  
  return (
    <div className="bg-gray-50 text-gray-900 font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-2xl font-garamond font-semibold text-indigo-700">Examination</h1>
          <button 
            className="text-indigo-500 hover:text-indigo-700 transition-colors"
            onClick={() => setShowMenuDialog(true)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="bg-indigo-100 py-3 px-5 rounded-lg mb-6 shadow-sm border border-indigo-200">
          <h2 className="font-garamond text-lg text-indigo-800 font-medium">
            {getCurrentCategory().name}
          </h2>
        </div>
        
        <div className="relative h-[460px] mb-8 shadow-lg" ref={questionCardRef}>
          <QuestionCard
            key={currentQuestion} // Add key to force re-render on question change
            question={currentQuestion}
            onSwipeLeft={handleSkipSin}
            onSwipeRight={handleMarkSinGuilty}
            onRadioChange={handleRadioChange}
          />
        </div>
        
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-700 bg-indigo-50 px-3 py-1 rounded-full">
            Question {getCurrentQuestionNumber()} of {getTotalQuestions()}
          </span>
          <Button
            className="bg-indigo-600 text-white py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors shadow-sm font-medium"
            onClick={handleNextQuestion}
            disabled={isTransitioning}
          >
            Next Question
          </Button>
        </div>
        
        <footer className="mt-auto pt-8 text-center text-sm text-gray-600 border-t border-gray-200 mt-8 pt-4">
          <p>Catholic Examination of Conscience App</p>
        </footer>
        
        {/* Dialogs */}
        <ConfirmationDialog
          isOpen={showRestartDialog}
          onClose={() => setShowRestartDialog(false)}
          onConfirm={handleRestartExamination}
          title="Restart Examination"
          message="This will clear your current progress. Are you sure?"
        />
        
        <ConfirmationDialog
          isOpen={showExitDialog}
          onClose={() => setShowExitDialog(false)}
          onConfirm={handleExitExamination}
          title="Exit Examination"
          message="This will return to the home screen and lose your progress. Continue?"
        />
        
        <MenuDialog
          isOpen={showMenuDialog}
          onClose={() => setShowMenuDialog(false)}
          onViewPrayers={() => setShowPrayersDialog(true)}
          onRestartExamination={() => setShowRestartDialog(true)}
          onExitExamination={() => setShowExitDialog(true)}
        />
        
        <PrayersDialog
          isOpen={showPrayersDialog}
          onClose={() => setShowPrayersDialog(false)}
        />
      </div>
    </div>
  );
}
