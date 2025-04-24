import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useExamination } from "@/context/examination-context";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import SinItem from "@/components/sin-item";

export default function Confession() {
  const [, navigate] = useLocation();
  const { markedSins, clearSins } = useExamination();
  const [showAbsolutionDialog, setShowAbsolutionDialog] = useState(false);
  
  const handleReceivedAbsolution = () => {
    setShowAbsolutionDialog(true);
  };
  
  const confirmAbsolution = () => {
    clearSins();
    navigate("/post-confession");
  };
  
  return (
    <div className="bg-background text-textDark font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <h1 className="text-2xl font-garamond font-semibold text-primary mb-6">Ready for Confession</h1>
        
        <Card className="mb-8 bg-white shadow-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-garamond text-primary mb-4">Your List of Sins</h2>
            
            <div className="mb-6">
              {markedSins.length === 0 ? (
                <p className="text-gray-500 italic">No sins have been marked.</p>
              ) : (
                markedSins.map((sin, index) => (
                  <SinItem 
                    key={index} 
                    text={sin.text} 
                    index={index} 
                    onRemove={() => {}} 
                    showRemoveButton={false} 
                  />
                ))
              )}
            </div>
            
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">Reminder</h3>
              <p className="text-sm">Begin your confession by saying:</p>
              <p className="italic mt-1 text-sm">"Bless me Father, for I have sinned. It has been [time] since my last confession. These are my sins..."</p>
            </div>
          </CardContent>
        </Card>
        
        <Button
          className="w-full bg-[#43A047] text-white py-3 px-6 rounded-lg font-medium text-center hover:bg-opacity-90 transition-colors shadow-md"
          onClick={handleReceivedAbsolution}
        >
          I Have Confessed and Received Absolution
        </Button>
        
        <footer className="mt-auto pt-6 text-center text-sm text-gray-500">
          <p>Catholic Examination of Conscience App</p>
        </footer>
        
        <ConfirmationDialog
          isOpen={showAbsolutionDialog}
          onClose={() => setShowAbsolutionDialog(false)}
          onConfirm={confirmAbsolution}
          title="Confirm Absolution"
          message="This will clear your list of sins. This action cannot be undone. Proceed?"
        />
      </div>
    </div>
  );
}
