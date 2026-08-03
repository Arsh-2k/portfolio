"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X, ChevronRight, ChevronLeft } from "lucide-react";

const tourSteps = [
  {
    title: "Welcome to My Portfolio!",
    description: "Take a quick 3-step tour to discover all the interactive features built into this website.",
  },
  {
    title: "Fun vs. Formal Mode 👔 / 🥳",
    description: "Click this toggle at the top right of the screen anytime to instantly switch between an animated developer portfolio and a strict, high-performance executive report layout.",
  },
  {
    title: "Interactive Avatar & Coin Toss 🪙",
    description: "In Fun Mode, click or tap my profile avatar on the landing page to trigger a 3D coin toss animation with haptic feedback!",
  },
  {
    title: "Idea Vault & Projects 🚀",
    description: "Scroll through to explore my open-source projects and future technical directives stored in the Idea Vault.",
  },
];

export default function WebsiteTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Automatically show the tour once for first-time visitors
  useEffect(() => {
    try {
      const hasSeenTour = localStorage.getItem("hasSeenPortfolioTour");
      if (!hasSeenTour) {
        // Optional: auto-open on first load after 1.5 seconds
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem("hasSeenPortfolioTour", "true");
    } catch {}
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Tour Trigger Button - Positioned nicely on screen */}
      <button
        onClick={() => {
          setCurrentStep(0);
          setIsOpen(true);
        }}
        aria-label="Start Website Tour"
        className="fixed bottom-20 right-5 z-40 flex items-center gap-2 px-4 py-2 rounded-full 
          bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 
          text-white shadow-xl text-xs sm:text-sm font-semibold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <Compass className="w-4 h-4 animate-spin-slow" />
        <span>Take a Tour</span>
      </button>

      {/* Tour Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-2xl border border-purple-200 dark:border-zinc-800"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                aria-label="Close tour"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Step Counter */}
              <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 mb-2">
                STEP {currentStep + 1} OF {tourSteps.length}
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                {tourSteps[currentStep].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {tourSteps[currentStep].description}
              </p>

              {/* Navigation Actions */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    currentStep === 0
                      ? "opacity-40 cursor-not-allowed text-gray-400"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={nextStep}
                  className="flex items-center gap-1 text-sm font-semibold px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:opacity-90 transition-opacity"
                >
                  <span>{currentStep === tourSteps.length - 1 ? "Finish" : "Next"}</span>
                  {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}