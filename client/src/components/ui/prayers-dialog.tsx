import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrayersDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrayersDialog: React.FC<PrayersDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-garamond font-semibold text-primary mb-4">Common Prayers</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-garamond text-primary mb-3">Act of Contrition</h2>
              <p className="italic font-garamond mb-4">
                My God, I am sorry for my sins with all my heart. In choosing to do wrong and failing to do good, 
                I have sinned against you whom I should love above all things. I firmly intend, with your help, 
                to do penance, to sin no more, and to avoid whatever leads me to sin.
              </p>
              <p className="italic font-garamond">
                Our Savior Jesus Christ suffered and died for us. In his name, my God, have mercy. Amen.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-garamond text-primary mb-3">Prayer Before Confession</h2>
              <p className="italic font-garamond">
                Come, Holy Spirit, enlighten my mind to know my sins, touch my heart that I may detest them, 
                and strengthen my will that I may firmly resolve to sin no more and to amend my life. Amen.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-garamond text-primary mb-3">Prayer After Confession</h2>
              <p className="italic font-garamond">
                O God, I thank You for forgiving my sins in the Sacrament of Reconciliation. 
                Grant me the grace to remain faithful to You. Help me to become more like Your Son, Jesus Christ. Amen.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-garamond text-primary mb-3">For a Good Confession</h2>
              <p className="italic font-garamond">
                O my God, by my grievous sins I have crucified again Your Divine Son and made Him a mockery. For this I have deserved Your wrath and made myself fit for the fires of hell. How ungrateful I have been to You as well, my heavenly Father, Who adopted me as Your child in Baptism and Who has showered me with so many blessings! I repent sincerely for having offended You and I beg the grace to abhor my sins above all things. Help me to confess them fully, humbly, and with a contrite heart. I firmly resolve, with the help of Your grace, to amend my life and to avoid the occasions of sin. Have mercy on me, and wash away my sins in the Precious Blood of Your Son, Jesus Christ. Amen.
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex justify-end mt-4">
          <Button 
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrayersDialog;
