import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("wakeupbrah.db");
export const db = drizzle(expo);

export const initDatabase = async () => {
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
