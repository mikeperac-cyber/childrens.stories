import type { Book } from '@/types/book';

// Empty array - add your books here
// This file is intentionally left empty for zero demo data
// Replace with your actual book data when ready

export const books: Book[] = [];

export const categories = [
  'Picture Books',
  'Early Readers',
  'Chapter Books',
  'Bedtime Stories',
  'Adventure',
  'Animals & Nature',
  'Fairy Tales & Fantasy',
  'Learning & Education',
] as const;

export const ageRanges = [
  '0-2 years',
  '3-5 years',
  '6-8 years',
  '9-12 years',
] as const;