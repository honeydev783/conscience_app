import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useExamination } from "@/context/examination-context";
import SinItem from "@/components/sin-item";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

export default function SinReview() {
  const [, navigate] = useLocation();
  const { markedSins, removeSin } = useExamination();
  const [showRemoveSinDialog, setShowRemoveSinDialog] = useState(false);
  const [sinIndexToRemove, setSinIndexToRemove] = useState<number | null>(null);
  
  const handleBackToAdditional = () => {
    navigate("/additional-sins");
  };
  
  const handleCompleteExamination = () => {
    navigate("/confession");
  };
  
  const handleRemoveSin = (index: number) => {
    setSinIndexToRemove(index);
    setShowRemoveSinDialog(true);
  };
  
  const confirmRemoveSin = () => {
    if (sinIndexToRemove !== null) {
      removeSin(sinIndexToRemove);
      setSinIndexToRemove(null);
    }
  };
  
  return (
    <div className="bg-background text-textDark font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <h1 className="text-2xl font-garamond font-semibold text-primary mb-6">Review Your Sins</h1>
        
        <Card className="mb-6 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="mb-4">
              {markedSins.length === 0 ? (
                <p className="text-gray-500 italic">No sins have been marked.</p>
              ) : (
                markedSins.map((sin, index) => (
                  <SinItem 
                    key={index} 
                    text={sin.text} 
                    index={index} 
                    onRemove={handleRemoveSin} 
                  />
                ))
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-2">These sins will be available for reference during confession.</p>
            <p className="text-sm text-gray-600">You can remove any sin marked in error.</p>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border border-accent text-accent py-2 px-4 rounded-md hover:bg-accent hover:text-white transition-colors"
            onClick={handleBackToAdditional}
          >
            Back
          </Button>
          <Button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={handleCompleteExamination}
          >
            Complete Examination
          </Button>
        </div>
        
        <footer className="mt-auto pt-6 text-center text-sm text-gray-500">
          <p>Catholic Examination of Conscience App</p>
        </footer>
        
        <ConfirmationDialog
          isOpen={showRemoveSinDialog}
          onClose={() => setShowRemoveSinDialog(false)}
          onConfirm={confirmRemoveSin}
          title="Remove Sin"
          message="Are you sure you want to remove this sin from your list?"
        />
      </div>
    </div>
  );
}
