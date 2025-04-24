import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-garamond font-medium text-primary mb-3">{title}</AlertDialogTitle>
          <AlertDialogDescription className="mb-6">{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end space-x-3">
          <AlertDialogCancel className="border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={handleConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
