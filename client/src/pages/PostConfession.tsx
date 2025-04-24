import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function PostConfession() {
  const [, navigate] = useLocation();
  
  const handleSkipJournal = () => {
    navigate("/");
  };
  
  const handleOpenJournal = () => {
    navigate("/journal");
  };
  
  return (
    <div className="bg-background text-textDark font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <h1 className="text-2xl font-garamond font-semibold text-primary mb-6">Reconciliation Complete</h1>
        
        <Card className="mb-8 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#43A047]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <h2 className="text-xl font-garamond text-[#43A047] mt-2">Your sins have been forgiven</h2>
            </div>
            
            <p className="mb-4">Your examination list has been cleared. No record of your sins has been saved.</p>
            <p>Would you like to record any reflections or resolutions from this confession?</p>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border border-accent text-accent py-2 px-4 rounded-md hover:bg-accent hover:text-white transition-colors"
            onClick={handleSkipJournal}
          >
            Return Home
          </Button>
          <Button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={handleOpenJournal}
          >
            Journal Reflections
          </Button>
        </div>
        
        <footer className="mt-auto pt-6 text-center text-sm text-gray-500">
          <p>Catholic Examination of Conscience App</p>
        </footer>
      </div>
    </div>
  );
}
