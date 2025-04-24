import React from 'react';

interface SinItemProps {
  text: string;
  index: number;
  onRemove: (index: number) => void;
  showRemoveButton?: boolean;
}

const SinItem: React.FC<SinItemProps> = ({ text, index, onRemove, showRemoveButton = true }) => {
  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <div className="sin-item text-sinRed mb-3 pb-3 border-b border-gray-200 flex justify-between items-center">
      <p>{text}</p>
      {showRemoveButton && (
        <button 
          className="remove-sin-btn text-gray-400 hover:text-sinRed transition-colors" 
          onClick={handleRemove}
          aria-label="Remove sin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SinItem;
