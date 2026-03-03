import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("wakeupbrah.db");

export const initDatabase = async () => {
  (await db).execAsync(`
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
