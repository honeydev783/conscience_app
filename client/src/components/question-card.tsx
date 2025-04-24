import React, { useEffect, useState, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSwipe } from '@/hooks/use-swipe';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onRadioChange: (value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSwipeLeft,
  onSwipeRight,
  onRadioChange,
}) => {
  // Used to reset radio state when question changes
  const [radioValue, setRadioValue] = useState<string | undefined>(undefined);
  // For toggle state
  const [isGuilty, setIsGuilty] = useState<boolean | undefined>(undefined);
  // To track if a selection has been made recently
  const [selectionMade, setSelectionMade] = useState<boolean>(false);
  // For tracking timer
  const timerRef = useRef<number | null>(null);

  // Reset radio and toggle value when question changes
  useEffect(() => {
    setRadioValue(undefined);
    setIsGuilty(undefined);
    setSelectionMade(false);
    
    // Clear any existing timer
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [question]);

  const {
    swipeDistance,
    isSwipingRight,
    isSwipingLeft,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetSwipe,
  } = useSwipe({
    onSwipeLeft: () => {
      handleSelectionWithDelay("not-guilty");
    },
    onSwipeRight: () => {
      handleSelectionWithDelay("guilty");
    },
  });

  // Reset swipe state when question changes
  useEffect(() => {
    resetSwipe();
  }, [question, resetSwipe]);

  // Calculate the transform for the swipe
  const getTransform = () => {
    if (swipeDistance === 0) return '';
    return `translateX(${swipeDistance}px)`;
  };

  // Handle selection with delay
  const handleSelectionWithDelay = (value: string) => {
    // If a selection was recently made, ignore this one
    if (selectionMade) return;
    
    // Update UI immediately
    setRadioValue(value);
    setIsGuilty(value === "guilty");
    setSelectionMade(true);
    
    // Set a timer to call the callback after 2 seconds
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    
    timerRef.current = window.setTimeout(() => {
      onRadioChange(value);
      timerRef.current = null;
    }, 2000);
  };

  // Handle radio change
  const handleRadioChange = (value: string) => {
    handleSelectionWithDelay(value);
  };

  // Handle slider area clicks
  const handleNotGuiltyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelectionWithDelay("not-guilty");
  };

  const handleGuiltyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelectionWithDelay("guilty");
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div 
      key={question} // Add key to force re-render on question change
      className={cn(
        "swipe-card absolute w-full p-6 h-full flex flex-col",
        { 
          "swipe-right": isSwipingRight && Math.abs(swipeDistance) > 150,
          "swipe-left": isSwipingLeft && Math.abs(swipeDistance) > 150
        }
      )}
      style={{ 
        transform: getTransform(), 
        transition: swipeDistance ? 'none' : 'transform 0.8s ease',
        backgroundColor: "#f8f9fa",
        border: "1px solid #e5e7eb", 
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-indigo-50 -mx-6 -mt-6 px-6 py-4 mb-6 border-b border-indigo-100">
        <p className="text-lg text-indigo-900 font-medium">{question}</p>
      </div>
      
      <div className="mt-auto flex flex-col">
        <RadioGroup 
          value={radioValue} 
          onValueChange={handleRadioChange} 
          className="mb-6"
        >
          <div className={cn(
            "flex items-center mb-4 p-3 border rounded-lg",
            radioValue === "guilty" ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
          )}>
            <RadioGroupItem value="guilty" id={`guilty-${question.slice(0, 10)}`} className="w-5 h-5 text-red-500" />
            <Label htmlFor={`guilty-${question.slice(0, 10)}`} className={cn(
              "ml-2 font-medium",
              radioValue === "guilty" ? "text-red-700" : "text-gray-700"
            )}>Yes, I am guilty of this sin</Label>
          </div>
          <div className={cn(
            "flex items-center p-3 border rounded-lg",
            radioValue === "not-guilty" ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
          )}>
            <RadioGroupItem value="not-guilty" id={`not-guilty-${question.slice(0, 10)}`} className="w-5 h-5 text-green-500" />
            <Label htmlFor={`not-guilty-${question.slice(0, 10)}`} className={cn(
              "ml-2 font-medium",
              radioValue === "not-guilty" ? "text-green-700" : "text-gray-700"
            )}>No, I am not guilty of this sin</Label>
          </div>
        </RadioGroup>
        
        <div className="text-center mt-6 mb-4">
          <p className="text-sm text-gray-600 mb-3">Or use the slider below:</p>
          <div className="bg-indigo-50 rounded-lg p-5 flex items-center justify-between relative">
            {/* Custom Slider Component */}
            <div className="w-full relative h-16 flex items-center">
              {/* Background track */}
              <div className="slider-track w-full flex items-center justify-between px-12 z-10">
                <span className={`text-sm font-medium z-30 ${isGuilty === false ? 'text-green-600 font-bold' : 'text-gray-700'}`}>
                  Not Guilty
                </span>
                <span className={`text-sm font-medium z-30 ${isGuilty === true ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                  Guilty
                </span>
              </div>
              
              {/* Left side - not guilty */}
              <div 
                className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-20"
                onClick={handleNotGuiltyClick}
              >
                <div className={`absolute left-0 top-0 h-10 w-full rounded-l-full transition-colors duration-500 
                  ${isGuilty === false ? 'bg-green-100 bg-opacity-50' : 'bg-transparent'}`}
                  style={{top: '18%'}}
                />
              </div>
              
              {/* Right side - guilty */}
              <div 
                className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-20"
                onClick={handleGuiltyClick}
              >
                <div className={`absolute right-0 top-0 h-10 w-full rounded-r-full transition-colors duration-500
                  ${isGuilty === true ? 'bg-red-100 bg-opacity-50' : 'bg-transparent'}`}
                  style={{top: '18%'}}
                />
              </div>
              
              {/* Sliding Circle Button - smaller size */}
              <div 
                className={`flex items-center justify-center z-20 w-9 h-9 rounded-full shadow-md absolute 
                  transition-all duration-500 ease-in-out top-1/2 transform -translate-y-1/2
                  ${isGuilty === true ? 'right-8 bg-gradient-to-br from-red-400 to-red-600 border-white border-2' : 
                    isGuilty === false ? 'left-8 bg-gradient-to-br from-green-400 to-green-600 border-white border-2' : 
                    'left-1/2 -ml-4 bg-gradient-to-r from-blue-400 to-blue-600 border-white border-2'}`}
                style={{boxShadow: '0 3px 10px rgba(0,0,0,0.2)'}}
                onClick={() => {
                  // Toggle between states
                  if (isGuilty === undefined) {
                    handleSelectionWithDelay("not-guilty");
                  } else {
                    handleSelectionWithDelay(isGuilty ? "not-guilty" : "guilty");
                  }
                }}
              >
                {isGuilty === true ? (
                  // Show X icon for guilty
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : isGuilty === false ? (
                  // Show checkmark icon for not guilty
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // Show question mark icon for neutral state
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              
              {/* Processing indicator */}
              {selectionMade && timerRef.current && (
                <div className="absolute w-full text-center bottom-0 text-xs processing-selection">
                  Processing selection...
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600 mt-6 bg-gray-50 py-3 px-4 rounded-lg border border-gray-200">
          <p>You can also swipe right if guilty, left if not guilty</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
