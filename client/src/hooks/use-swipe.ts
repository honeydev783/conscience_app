import { useState, useEffect, useRef, useCallback } from "react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface UseSwipeReturn {
  touchStartX: number | null;
  touchEndX: number | null;
  swipeDistance: number;
  isSwipingRight: boolean;
  isSwipingLeft: boolean;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  resetSwipe: () => void;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight }: SwipeHandlers): UseSwipeReturn => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [swipeDistance, setSwipeDistance] = useState<number>(0);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  
  const swipeMinDistance = 100; // Minimum distance to trigger a swipe action
  
  const resetSwipe = useCallback(() => {
    setTouchStartX(null);
    setTouchEndX(null);
    setSwipeDistance(0);
    setIsSwipingRight(false);
    setIsSwipingLeft(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX;
    
    setSwipeDistance(diff);
    setIsSwipingRight(diff > 0);
    setIsSwipingLeft(diff < 0);
  }, [touchStartX]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    setTouchEndX(endX);
    
    const diff = endX - touchStartX;
    
    if (diff > swipeMinDistance) {
      onSwipeRight && onSwipeRight();
    } else if (diff < -swipeMinDistance) {
      onSwipeLeft && onSwipeLeft();
    }
  }, [touchStartX, onSwipeLeft, onSwipeRight, swipeMinDistance]);

  return {
    touchStartX,
    touchEndX,
    swipeDistance,
    isSwipingRight,
    isSwipingLeft,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetSwipe
  };
};
