import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import { alarmTable } from "./schema";

const expo = openDatabaseSync("wakeupbrah.db");
export const db = drizzle(expo);

export const initDatabase = async () => {
  await expo.execAsync(`PRAGMA journal_mode = WAL;`);
  await expo.execAsync(`
        CREATE TABLE IF NOT EXISTS alarm (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            time DATE,
            repeating BOOLEAN NOT NULL,
            repeating_pattern TEXT NOT NULL,
            challenge TEXT NOT NULL,
            day TEXT NOT NULL,
            status BOOLEAN NOT NULL,
            last_triggered_at TEXT,
            trigger_count INTEGER DEFAULT 0,
            dismissed_at TEXT,
            completed_at TEXT
        )
    `);

  await migrateIfNeeded();
};

async function migrateIfNeeded() {
  const columns = await expo.getAllAsync("PRAGMA table_info(alarm)");
  const columnNames = columns.map((c: any) => c.name);

  if (!columnNames.includes("last_triggered_at")) {
    await expo.execAsync("ALTER TABLE alarm ADD COLUMN last_triggered_at TEXT");
  }
  if (!columnNames.includes("trigger_count")) {
    await expo.execAsync(
      "ALTER TABLE alarm ADD COLUMN trigger_count INTEGER DEFAULT 0",
    );
  }
  if (!columnNames.includes("dismissed_at")) {
    await expo.execAsync("ALTER TABLE alarm ADD COLUMN dismissed_at TEXT");
  }
  if (!columnNames.includes("completed_at")) {
    await expo.execAsync("ALTER TABLE alarm ADD COLUMN completed_at TEXT");
  }
}

export const insertAlarm = async (alarm: {
  title: string;
  time: Date;
  repeating: boolean;
  repeatingPattern: string;
  challenge: string;
  day: string;
  status: boolean;
}) => {
  const result = await db
    .insert(alarmTable)
    .values(alarm)
    .returning({ id: alarmTable.id });
  return result[0].id;
};

export const getAlarms = async () => {
  const loadedAlarms = await db.select().from(alarmTable);
  return loadedAlarms;
};

export const updateAlarmStatus = async (id: string, status: boolean) => {
  await db
    .update(alarmTable)
    .set({ status })
    .where(eq(alarmTable.id, Number(id)));
};

export const triggerAlarm = async (id: string) => {
  const now = new Date().toISOString();
  await db
    .update(alarmTable)
    .set({
      lastTriggeredAt: now,
      triggerCount: sql`${alarmTable.triggerCount} + 1`,
    })
    .where(eq(alarmTable.id, Number(id)));
};

export const dismissAlarm = async (id: string) => {
  await db
    .update(alarmTable)
    .set({ dismissedAt: new Date().toISOString() })
    .where(eq(alarmTable.id, Number(id)));
};

export const completeAlarm = async (id: string) => {
  await db
    .update(alarmTable)
    .set({ completedAt: new Date().toISOString() })
    .where(eq(alarmTable.id, Number(id)));
};

export const getAlarmById = async (id: string) => {
  const result = await db
    .select()
    .from(alarmTable)
    .where(eq(alarmTable.id, Number(id)));
  return result[0];
};
