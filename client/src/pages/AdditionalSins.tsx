import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { useExamination } from "@/context/examination-context";

export default function AdditionalSins() {
  const [, navigate] = useLocation();
  const { additionalSins, setAdditionalSins, addAdditionalSinsToMarked, markedSins } = useExamination();
  
  // To track added sins for this session
  const [addedSins, setAddedSins] = React.useState<string[]>([]);

  const handleBackToExamination = () => {
    navigate("/examination");
  };
  
  const handleContinueToReview = () => {
    // Add any remaining sins in the textarea
    if (additionalSins.trim()) {
      addAdditionalSinsToMarked();
    }
    navigate("/sin-review");
  };
  
  const handleAddSin = () => {
    if (additionalSins.trim()) {
      // Add current sin and keep track of it locally
      addAdditionalSinsToMarked();
      setAddedSins(prev => [...prev, additionalSins.trim()]);
    }
  };

  const handleRemoveSin = (index: number) => {
    setAddedSins(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="bg-gray-50 text-gray-900 font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <h1 className="text-2xl font-garamond font-semibold text-indigo-700 mb-6">Additional Sins</h1>
        
        <Card className="mb-6 bg-white shadow-md">
          <CardContent className="p-6">
            <p className="mb-4">Is there anything else weighing on your heart that wasn't covered in the examination?</p>
            <Textarea
              value={additionalSins}
              onChange={(e) => setAdditionalSins(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              rows={5}
              placeholder="Type any additional sins here..."
            />
            <Button 
              onClick={handleAddSin}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              disabled={!additionalSins.trim()}
            >
              Add Sin
            </Button>
          </CardContent>
        </Card>
        
        {addedSins.length > 0 && (
          <Card className="mb-6 bg-white shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-medium text-indigo-700 mb-4">Added Sins:</h2>
              <div className="space-y-2">
                {addedSins.map((sin, index) => (
                  <div key={index} className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg">
                    <p className="text-gray-800">{sin}</p>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => handleRemoveSin(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border border-indigo-500 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-100 transition-colors"
            onClick={handleBackToExamination}
          >
            Back
          </Button>
          <Button
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={handleContinueToReview}
          >
            Continue to Review
          </Button>
        </div>
        
        <footer className="mt-auto pt-6 text-center text-sm text-gray-600">
          <p>Catholic Examination of Conscience App</p>
        </footer>
      </div>
    </div>
  );
}
