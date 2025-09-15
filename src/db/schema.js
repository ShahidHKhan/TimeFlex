import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {

  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  stretchId: integer("stretch_id").notNull(),  // link to stretches table
  name: text("name").notNull(),                // stretch name
  image: text("image"),                        // optional image/gif URL
  reps: integer("reps"),                       // number of repetitions
  muscleGroup: text("muscle_group"),           // e.g. hamstrings, shoulders
  createdAt: timestamp("created_at").defaultNow(),
})