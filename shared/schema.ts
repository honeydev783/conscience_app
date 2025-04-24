import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// This schema is just for TypeScript types as we're not using a database in this app
// All data will be stored in localStorage

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).pick({
  content: true,
  createdAt: true,
});

export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;

// Custom Zod schemas for our app
export const sinSchema = z.object({
  category: z.string(),
  text: z.string(),
});

export type Sin = z.infer<typeof sinSchema>;

export const categorySchema = z.object({
  name: z.string(),
  questions: z.array(z.string()),
});

export type Category = z.infer<typeof categorySchema>;

export const examinationDataSchema = z.object({
  categories: z.array(categorySchema),
});

export type ExaminationData = z.infer<typeof examinationDataSchema>;
