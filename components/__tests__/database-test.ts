import { completeAlarm, dismissAlarm, getAlarms, initDatabase, insertAlarm, triggerAlarm } from "@/db/database";

jest.mock("expo-sqlite", () => ({
  openDatabaseSync: jest.fn(() => ({
    execAsync: jest.fn(),
    getAllAsync: jest.fn().mockResolvedValue([]),
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
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    where: jest.fn().mockResolvedValue(true),
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

  it("triggerAlarm updates trigger count and last triggered at", async () => {
    await expect(triggerAlarm("1")).resolves.not.toThrow();
  });

  it("dismissAlarm updates dismissed at", async () => {
    await expect(dismissAlarm("1")).resolves.not.toThrow();
  });

  it("completeAlarm updates completed at", async () => {
    await expect(completeAlarm("1")).resolves.not.toThrow();
  });
});
