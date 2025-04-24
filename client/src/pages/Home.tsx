import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import PrayersDialog from "@/components/ui/prayers-dialog";
import { useExamination } from "@/context/examination-context";

export default function Home() {
  const [, navigate] = useLocation();
  const [isPrayersOpen, setIsPrayersOpen] = useState(false);
  const { resetExamination } = useExamination();

  const handleStartExamination = () => {
    resetExamination();
    navigate("/examination");
  };

  return (
    <div className="bg-background text-textDark font-roboto min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col fade-in">
        <div>
          <h1 className="text-3xl font-garamond font-semibold text-primary text-center mb-6">
            Examination of Conscience
          </h1>
          
          <Card className="mb-8 bg-white shadow-md">
            <CardContent className="p-6">
              <p className="italic text-center font-garamond text-lg mb-4">
                "Confession is an act of honesty and courage - an act of entrusting ourselves, beyond sin, to the mercy of a loving and forgiving God."
              </p>
              <p className="text-right font-garamond">— St. John Paul II</p>
            </CardContent>
          </Card>
          
          <Card className="mb-8 bg-white shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-garamond font-medium text-primary mb-3">Preparing for Reconciliation</h2>
              <p className="mb-4">
                The Sacrament of Reconciliation is a beautiful opportunity to experience God's mercy and healing grace. This tool will guide you through a thorough examination of conscience to prepare your heart.
              </p>
              <p>
                Remember that no sin is too great for God's forgiveness. Approach this sacrament with humility, honesty, and trust in His infinite mercy.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-auto mb-4 flex flex-col gap-3">
          <Button
            className="bg-primary hover:bg-opacity-90 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors shadow-md w-full"
            onClick={handleStartExamination}
          >
            Start Examination
          </Button>
          
          <Button
            variant="outline"
            className="border border-accent text-accent py-2 px-4 rounded-md hover:bg-accent hover:text-white transition-colors"
            onClick={() => setIsPrayersOpen(true)}
          >
            View Prayers
          </Button>
        </div>
        
        <footer className="mt-auto pt-6 text-center text-sm text-gray-500">
          <p>Catholic Examination of Conscience App</p>
        </footer>
        
        <PrayersDialog isOpen={isPrayersOpen} onClose={() => setIsPrayersOpen(false)} />
      </div>
    </div>
  );
}
