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
            status BOOLEAN NOT NULL
        )
    `);
};

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
