import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const alarmTable = sqliteTable("alarm", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  time: text("time", { mode: "json" }).$type<Date>().notNull(),
  repeating: integer("repeating", { mode: "boolean" }).notNull(),
  repeatingPattern: text("repeating_pattern").notNull(),
  challenge: text("challenge").notNull(),
  day: text("day").notNull(),
  status: integer("status", { mode: "boolean" }).notNull(),
  lastTriggeredAt: text("last_triggered_at"),
  triggerCount: integer("trigger_count").default(0),
  dismissedAt: text("dismissed_at"),
  completedAt: text("completed_at"),
});
