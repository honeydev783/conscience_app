import React, { createContext, useContext, useState, useEffect } from "react";
import { examinationData } from "../data/examination-data";
import { Sin, Category } from "@shared/schema";
import { saveMarkedSins, getMarkedSins, saveJournalEntries, getJournalEntries, clearMarkedSins } from "@/lib/storage";

interface ExaminationContextType {
  markedSins: Sin[];
  journalEntries: { content: string; createdAt: string }[];
  currentCategoryIndex: number;
  currentQuestionIndex: number;
  additionalSins: string;
  markSin: (sin: Sin) => void;
  removeSin: (index: number) => void;
  clearSins: () => void;
  setAdditionalSins: (sins: string) => void;
  addAdditionalSinsToMarked: () => void;
  saveJournalEntry: (content: string) => void;
  resetExamination: () => void;
  goToNextQuestion: () => { isEnd: boolean };
  getCurrentCategory: () => Category;
  getCurrentQuestion: () => string;
  getTotalQuestions: () => number;
  getCurrentQuestionNumber: () => number;
}

const ExaminationContext = createContext<ExaminationContextType | undefined>(undefined);

export const ExaminationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markedSins, setMarkedSins] = useState<Sin[]>([]);
  const [journalEntries, setJournalEntries] = useState<{ content: string; createdAt: string }[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [additionalSins, setAdditionalSins] = useState("");

  // Load saved sins and journal entries from localStorage on initial render
  useEffect(() => {
    const savedSins = getMarkedSins();
    if (savedSins) {
      setMarkedSins(savedSins);
    }
    
    const savedJournalEntries = getJournalEntries();
    if (savedJournalEntries) {
      setJournalEntries(savedJournalEntries);
    }
  }, []);

  // Save sins to localStorage whenever they change
  useEffect(() => {
    saveMarkedSins(markedSins);
  }, [markedSins]);

  // Save journal entries to localStorage whenever they change
  useEffect(() => {
    saveJournalEntries(journalEntries);
  }, [journalEntries]);

  const markSin = (sin: Sin) => {
    setMarkedSins((prev) => [...prev, sin]);
  };

  const removeSin = (index: number) => {
    setMarkedSins((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSins = () => {
    setMarkedSins([]);
    clearMarkedSins();
  };

  const addAdditionalSinsToMarked = () => {
    if (additionalSins.trim()) {
      const newSins = additionalSins
        .split("\n")
        .filter((sin) => sin.trim())
        .map((sin) => ({
          category: "Additional Sins",
          text: sin.trim(),
        }));
      
      setMarkedSins((prev) => [...prev, ...newSins]);
      setAdditionalSins("");
    }
  };

  const saveJournalEntry = (content: string) => {
    if (content.trim()) {
      const newEntry = {
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      setJournalEntries((prev) => [...prev, newEntry]);
    }
  };

  const resetExamination = () => {
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
  };

  const getCurrentCategory = (): Category => {
    return examinationData.categories[currentCategoryIndex];
  };

  const getCurrentQuestion = (): string => {
    return examinationData.categories[currentCategoryIndex].questions[currentQuestionIndex];
  };

  const getTotalQuestions = (): number => {
    return examinationData.categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  };

  const getCurrentQuestionNumber = (): number => {
    const questionsSoFar = examinationData.categories
      .slice(0, currentCategoryIndex)
      .reduce((sum, cat) => sum + cat.questions.length, 0);
    return questionsSoFar + currentQuestionIndex + 1;
  };

  const goToNextQuestion = (): { isEnd: boolean } => {
    // Check if there are more questions in current category
    if (currentQuestionIndex < examinationData.categories[currentCategoryIndex].questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return { isEnd: false };
    } else {
      // Move to next category
      if (currentCategoryIndex < examinationData.categories.length - 1) {
        setCurrentCategoryIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
        return { isEnd: false };
      } else {
        // End of examination
        return { isEnd: true };
      }
    }
  };

  const value = {
    markedSins,
    journalEntries,
    currentCategoryIndex,
    currentQuestionIndex,
    additionalSins,
    markSin,
    removeSin,
    clearSins,
    setAdditionalSins,
    addAdditionalSinsToMarked,
    saveJournalEntry,
    resetExamination,
    goToNextQuestion,
    getCurrentCategory,
    getCurrentQuestion,
    getTotalQuestions,
    getCurrentQuestionNumber,
  };

  return <ExaminationContext.Provider value={value}>{children}</ExaminationContext.Provider>;
};

export const useExamination = (): ExaminationContextType => {
  const context = useContext(ExaminationContext);
  if (context === undefined) {
    throw new Error("useExamination must be used within an ExaminationProvider");
  }
  return context;
};
