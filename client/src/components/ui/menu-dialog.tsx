import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface MenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPrayers: () => void;
  onRestartExamination: () => void;
  onExitExamination: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({
  isOpen,
  onClose,
  onViewPrayers,
  onRestartExamination,
  onExitExamination,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-garamond font-medium text-primary mb-3">Menu</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mb-6">
          <button 
            className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            onClick={() => {
              onViewPrayers();
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
            View Prayers
          </button>
          
          <button 
            className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            onClick={() => {
              onRestartExamination();
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            Restart Examination
          </button>
          
          <button 
            className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition-colors flex items-center text-sinRed"
            onClick={() => {
              onExitExamination();
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Exit Examination
          </button>
        </div>
        
        <DialogFooter className="flex justify-end">
          <Button 
            variant="outline"
            className="border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
