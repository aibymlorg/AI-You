import { en } from './en';
import { zh } from './zh';

export const translations = {
  en,
  zh,
};

export type TranslationKeys = typeof en;
export type Language = keyof typeof translations;
