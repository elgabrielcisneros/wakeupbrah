import {
  cancelAlarm,
  initializeAlarmSystem,
  scheduleAlarm,
  scheduleAllEnabledAlarms,
} from "@/components/NotifeeIntegration";
import { completeAlarm, dismissAlarm } from "@/db/database";
import { useAlarmStore } from "@/store/useAlarmStore";
import notifee, { EventType } from "@notifee/react-native";

jest.mock("@notifee/react-native", () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    getNotificationSettings: jest
      .fn()
      .mockResolvedValue({ authorizationStatus: 1 }),
    createChannel: jest.fn().mockResolvedValue("wakeupbrah-alarm"),
    createTriggerNotification: jest.fn(),
    cancelNotification: jest.fn(),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
  },
  AndroidImportance: { HIGH: 4 },
  AndroidVisibility: { PUBLIC: 1 },
  AuthorizationStatus: { AUTHORIZED: 1, DENIED: 0 },
  TriggerType: { TIMESTAMP: 0 },
  EventType: { PRESS: 1, ACTION_PRESS: 2 },
}));

jest.mock("@/db/database", () => ({
  completeAlarm: jest.fn(),
  dismissAlarm: jest.fn(),
}));

jest.mock("@/store/useAlarmStore", () => ({
  useAlarmStore: {
    getState: jest.fn().mockReturnValue({
      dismissAlarm: jest.fn(),
      completeAlarm: jest.fn(),
    }),
  },
}));

describe("NotifeeIntegration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAlarm = {
    id: "1",
    title: "Test Alarm",
    time: new Date(Date.now() + 10000).toISOString(),
    challenge: { type: "walk" },
    status: "enabled",
    day: "mon",
  } as any;

  it("schedules an alarm correctly", async () => {
    await scheduleAlarm(mockAlarm);
    expect(notifee.requestPermission).toHaveBeenCalled();
    expect(notifee.createChannel).toHaveBeenCalled();
    expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        title: "⏰ WAKE UP!",
      }),
      expect.objectContaining({
        type: 0, // TriggerType.TIMESTAMP
      }),
    );
  });

  it("cancels an alarm", async () => {
    await cancelAlarm("1");
    expect(notifee.cancelNotification).toHaveBeenCalledWith("1");
  });

  it("schedules all enabled alarms and cancels disabled ones", async () => {
    const alarms = [mockAlarm, { ...mockAlarm, id: "2", status: "disabled" }];
    await scheduleAllEnabledAlarms(alarms);
    expect(notifee.createTriggerNotification).toHaveBeenCalledTimes(1);
    expect(notifee.cancelNotification).toHaveBeenCalledWith("2");
  });

  it("initializes alarm system and handles foreground events", async () => {
    await initializeAlarmSystem();

    // Simulate foreground event
    const foregroundCallback = (notifee.onForegroundEvent as jest.Mock).mock
      .calls[0][0];

    // Test dismiss
    await foregroundCallback({
      type: 1, // EventType.PRESS
      detail: { notification: { data: { alarmId: "1" } } },
    });
    expect(dismissAlarm).toHaveBeenCalledWith("1");

    // Test complete
    await foregroundCallback({
      type: 2, // EventType.ACTION_PRESS
      detail: {
        notification: { data: { alarmId: "1" } },
        pressAction: { id: "complete-action" },
      },
    });
    expect(completeAlarm).toHaveBeenCalledWith("1");
  });
});
