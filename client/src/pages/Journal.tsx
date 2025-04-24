import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { useExamination } from "@/context/examination-context";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

export default function Journal() {
  const [, navigate] = useLocation();
  const { saveJournalEntry } = useExamination();
  const [journalContent, setJournalContent] = useState("");
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const handleDiscardJournal = () => {
    setShowDiscardDialog(true);
  };
  
  const confirmDiscard = () => {
    setJournalContent("");
    navigate("/");
  };
  
  const handleSaveJournal = () => {
    if (journalContent.trim()) {
      setShowSaveDialog(true);
    } else {
      navigate("/");
    }
  };
  
  const confirmSave = () => {
    saveJournalEntry(journalContent);
    setJournalContent("");
    navigate("/");
  };
  
  return (
    <div className="bg-background text-textDark font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <h1 className="text-2xl font-garamond font-semibold text-primary mb-6">Journal Reflections</h1>
        
        <Card className="mb-8 bg-white shadow-md">
          <CardContent className="p-6">
            <p className="mb-4">Use this space to reflect on your confession experience. You might record:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Advice from the priest</li>
              <li>Resolutions to avoid future sin</li>
              <li>Spiritual insights or growth</li>
            </ul>
            
            <Textarea
              value={journalContent}
              onChange={(e) => setJournalContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary"
              rows={8}
              placeholder="Your private reflections..."
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
            onClick={handleDiscardJournal}
          >
            Discard
          </Button>
          <Button
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={handleSaveJournal}
          >
            Save Entry
          </Button>
        </div>
        
        <footer className="mt-auto pt-6 text-center text-sm text-gray-500">
          <p>Catholic Examination of Conscience App</p>
        </footer>
        
        <ConfirmationDialog
          isOpen={showDiscardDialog}
          onClose={() => setShowDiscardDialog(false)}
          onConfirm={confirmDiscard}
          title="Discard Journal"
          message="Are you sure you want to discard your journal entry?"
        />
        
        <ConfirmationDialog
          isOpen={showSaveDialog}
          onClose={() => setShowSaveDialog(false)}
          onConfirm={confirmSave}
          title="Journal Saved"
          message="Your journal entry has been saved successfully."
          confirmText="OK"
          cancelText="Edit More"
        />
      </div>
    </div>
  );
}
