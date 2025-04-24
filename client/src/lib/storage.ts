import { Sin } from "@shared/schema";

const MARKED_SINS_KEY = "examination_marked_sins";
const JOURNAL_ENTRIES_KEY = "examination_journal_entries";

export const saveMarkedSins = (sins: Sin[]): void => {
  localStorage.setItem(MARKED_SINS_KEY, JSON.stringify(sins));
};

export const getMarkedSins = (): Sin[] | null => {
  const storedSins = localStorage.getItem(MARKED_SINS_KEY);
  return storedSins ? JSON.parse(storedSins) : [];
};

export const clearMarkedSins = (): void => {
  localStorage.removeItem(MARKED_SINS_KEY);
};

export const saveJournalEntries = (entries: { content: string; createdAt: string }[]): void => {
  localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
};

export const getJournalEntries = (): { content: string; createdAt: string }[] | null => {
  const storedEntries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
  return storedEntries ? JSON.parse(storedEntries) : [];
};
