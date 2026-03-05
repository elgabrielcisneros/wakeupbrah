import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("wakeupbrah.db");

export const initDatabase = async () => {
  (await db).execAsync(`
        CREATE TABLE IF NOT EXISTS alarms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT NOT NULL,
            enabled BOOLEAN NOT NULL
        )
    `);
};
