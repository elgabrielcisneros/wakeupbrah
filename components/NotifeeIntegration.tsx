import {
  completeAlarm as dbCompleteAlarm,
  dismissAlarm as dbDismissAlarm,
} from "@/db/database";
import { Alarm, ChallengeType } from "@/infraestructure/types/alarm";
import { useAlarmStore } from "@/store/useAlarmStore";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

const CHANNEL_ID = "wakeupbrah-alarm";

async function checkNotificationPermission() {
  await notifee.requestPermission();
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log("Notification permissions has been authorized");
  } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log("Notification permissions has been denied");
  }
}

async function createAlarmChannel() {
  return await notifee.createChannel({
    id: CHANNEL_ID,
    name: "Wakeupbrah Alarms",
    sound: "wakey_wakey",
    visibility: AndroidVisibility.PUBLIC,
    importance: AndroidImportance.HIGH,
    vibration: true,
    description: "Alarm notifications - must complete challenge to dismiss",
  });
}

export async function scheduleAlarm(alarm: Alarm) {
  await checkNotificationPermission();
  await createAlarmChannel();

  const now = new Date();
  const alarmTime = new Date(alarm.time);

  let triggerTimestamp: number;

  if (alarmTime.getTime() <= now.getTime()) {
    triggerTimestamp = alarmTime.getTime() + 24 * 60 * 60 * 1000;
  } else {
    triggerTimestamp = alarmTime.getTime();
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTimestamp,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  const challengeEmojis: Record<ChallengeType, string> = {
    math: "🧮",
    qr: "📱",
    walk: "👟",
    map: "🗺️",
    type: "⌨️",
  };

  await notifee.createTriggerNotification(
    {
      id: alarm.id,
      title: "⏰ WAKE UP!",
      body: `${alarm.title} - Complete ${challengeEmojis[alarm.challenge.type]} ${alarm.challenge.type.toUpperCase()} challenge to dismiss`,
      android: {
        channelId: CHANNEL_ID,
        smallIcon: "ic_launcher",
        pressAction: {
          id: "dismiss-action",
        },
        actions: [
          {
            title: "Complete!",
            pressAction: {
              id: "complete-action",
            },
          },
        ],
      },
      data: {
        alarmId: alarm.id,
        type: "alarm-trigger",
      },
    },
    trigger,
  );
}

export async function cancelAlarm(alarmId: string) {
  await notifee.cancelNotification(alarmId);
}

export async function scheduleAllEnabledAlarms(alarms: Alarm[]) {
  for (const alarm of alarms) {
    if (alarm.status === "enabled") {
      await scheduleAlarm(alarm);
    } else {
      await cancelAlarm(alarm.id);
    }
  }
}

export async function initializeAlarmSystem() {
  await checkNotificationPermission();
  await createAlarmChannel();

  notifee.onForegroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    const alarmId = notification?.data?.alarmId as string;

    if (!alarmId) return;

    if (type === EventType.PRESS) {
      console.log("Alarm dismissed by user (foreground):", alarmId);
      await dbDismissAlarm(alarmId);
      useAlarmStore.getState().dismissAlarm(alarmId);
    }

    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === "complete-action"
    ) {
      console.log("Alarm completed by user:", alarmId);
      await dbCompleteAlarm(alarmId);
      useAlarmStore.getState().completeAlarm(alarmId);
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    const alarmId = notification?.data?.alarmId as string;

    if (!alarmId) return;

    if (type === EventType.PRESS) {
      console.log("Alarm notification pressed by user (background):", alarmId);
      await dbDismissAlarm(alarmId);
      useAlarmStore.getState().dismissAlarm(alarmId);
    }

    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === "complete-action"
    ) {
      console.log("Alarm challenge completed by user (background):", alarmId);
      await dbCompleteAlarm(alarmId);
      useAlarmStore.getState().completeAlarm(alarmId);
    }
  });
}
