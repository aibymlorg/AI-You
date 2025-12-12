
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDES } from './constants';
import { SlideType } from './types';
import Navigation from './components/Navigation';
import SlideFrame from './components/SlideFrame';
import FallbackSlide from './components/FallbackSlide';
import ImageLauncherSlide from './components/ImageLauncherSlide';
import TeachableMachineSlide from './components/TeachableMachineSlide';
import LandingPage from './components/LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES[currentSlideIndex];

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  const goToHome = () => {
    setDirection(-1);
    setCurrentSlideIndex(0);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
          nextSlide();
          break;
        case 'ArrowLeft':
          prevSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Framer Motion Variants for "Cinematic" transitions
  // Combining lateral movement with depth (scale) and focus (blur)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      scale: 1.1, // Start slightly zoomed in for impact
      opacity: 0,
      filter: 'blur(10px)', // Motion blur effect
      zIndex: 1, // Ensure entering slide is on top
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 }, // Snappy spring
        scale: { duration: 0.4 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      scale: 0.9, // Recede into background
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        scale: { duration: 0.4 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.4 }
      }
    })
  };

  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case SlideType.TEACHABLE_MACHINE:
        return <TeachableMachineSlide data={currentSlide} />;
      case SlideType.IMAGE_LAUNCHER:
        return <ImageLauncherSlide data={currentSlide} />;
      case SlideType.IFRAME:
        return <SlideFrame data={currentSlide} />;
      case SlideType.FALLBACK_CARD:
      default:
        return <FallbackSlide data={currentSlide} />;
    }
  };

  if (showLanding) {
    return <LandingPage onStartMission={() => setShowLanding(false)} />;
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">

      {/* Main Content Area */}
      {/* mode="popLayout" allows simultaneous exit/enter for fluid push effect */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlideIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full will-change-transform" // Optimizes rendering performance
        >
          {renderSlideContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Layer */}
      <Navigation
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        onNext={nextSlide}
        onPrev={prevSlide}
        onHome={() => setShowLanding(true)}
        slideTitle={currentSlide.title}
      />
    </div>
  );
}

export default App;
