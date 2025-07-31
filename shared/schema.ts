import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const musicFiles = pgTable("music_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: varchar("type").notNull(), // 'music' or 'march'
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: text("size").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().default(sql`now()`),
});

export const favoriteMusics = pgTable("favorite_musics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  artist: text("artist"),
  filename: text("filename"),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertMusicFileSchema = createInsertSchema(musicFiles).omit({
  id: true,
  uploadedAt: true,
});

export const insertFavoriteMusicSchema = createInsertSchema(favoriteMusics).omit({
  id: true,
  createdAt: true,
});

export type InsertMusicFile = z.infer<typeof insertMusicFileSchema>;
export type MusicFile = typeof musicFiles.$inferSelect;
export type InsertFavoriteMusic = z.infer<typeof insertFavoriteMusicSchema>;
export type FavoriteMusic = typeof favoriteMusics.$inferSelect;

// Timeline event type
export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

// Turkish Composer type
export type TurkishComposer = {
  id: string;
  name: string;
  birthYear: string;
  deathYear?: string;
  photo: string;
  biography: string;
  achievements: string[];
};

// March type for favorite marches
export type FavoriteMarch = {
  id: string;
  title: string;
  filename: string;
  description: string;
  createdAt: Date;
};