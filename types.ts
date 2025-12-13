
export enum SlideType {
  IFRAME = 'IFRAME',
  FALLBACK_CARD = 'FALLBACK_CARD',
  IMAGE_LAUNCHER = 'IMAGE_LAUNCHER',
  TEACHABLE_MACHINE = 'TEACHABLE_MACHINE',
  BRAIN_POTENTIAL = 'BRAIN_POTENTIAL',
  AI_TERMINOLOGY = 'AI_TERMINOLOGY',
  FUTURE_OF_AI = 'FUTURE_OF_AI',
  GENERATED_AI = 'GENERATED_AI',
  AI_LIMITS = 'AI_LIMITS',
  AI_BALLOON = 'AI_BALLOON'
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string; // Optional subtitle for slides
  type: SlideType;
  source?: string; // URL for iframe or launcher link
  srcDoc?: string; // HTML content for local simulation
  fallbackContent?: {
    image: string;
    description: string;
    link: string;
    buttonText: string;
  };
  permissions?: string; // iframe permissions like camera/microphone
  showBrowserChrome?: boolean; // Visual wrapper to look like a browser window
  backgroundImage?: string; // For IMAGE_LAUNCHER type
  centerImage?: string; // Custom center image for IMAGE_LAUNCHER type
}

export interface NavigationProps {
  currentSlideIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onHome: () => void;
  slideTitle: string;
}
