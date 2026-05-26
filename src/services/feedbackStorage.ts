import type { FeedbackEntry } from '../types/api';

const STORAGE_KEY = 'hintro-feedback';

export function getStoredFeedback(): FeedbackEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as FeedbackEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFeedback(entry: FeedbackEntry) {
  const feedback = getStoredFeedback();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...feedback]));
}
