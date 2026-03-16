import { getAlarms, initDatabase, insertAlarm } from "@/db/database";

jest.mock("expo-sqlite", () => ({
  openDatabaseSync: jest.fn(() => ({
    execAsync: jest.fn(),
  })),
}));

jest.mock("drizzle-orm/expo-sqlite", () => ({
  drizzle: jest.fn(() => ({
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([{ id: 1 }]),
    select: jest.fn().mockReturnThis(),
    from: jest
      .fn()
      .mockResolvedValue([
        { id: 1, title: "Test Alarm", time: "2026-03-06T06:45:00.000Z" },
      ]),
  })),
}));

describe("Database functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initDatabase executes table creation", async () => {
    await expect(initDatabase()).resolves.not.toThrow();
  });

  it("insertAlarm returns the new alarm ID", async () => {
    const result = await insertAlarm({
      title: "Wake up",
      time: new Date(),
      repeating: false,
      repeatingPattern: "daily",
      challenge: "math",
      day: "mon",
      status: true,
    });
    expect(result).toBe(1);
  });

  it("getAlarms fetches alarms from the database", async () => {
    const alarms = await getAlarms();
    expect(alarms).toHaveLength(1);
    expect(alarms[0].title).toBe("Test Alarm");
  });
});
