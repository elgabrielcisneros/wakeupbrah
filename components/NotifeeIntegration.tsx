import { Alarm, ChallengeType } from "@/infraestructure/types/alarm";
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { router } from "expo-router";

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

async function createAlarmNotificationChannel() {
  return await notifee.createChannel({
    id: CHANNEL_ID,
    name: "Alarms Notifications",
    visibility: AndroidVisibility.PUBLIC,
    importance: AndroidImportance.HIGH,
    vibration: true,
    description: "Firing alarms - must complete challenge to dismiss",
    groupId: "alarms",
  });
}

async function displayFullScreenAlarm() {
  return await notifee.displayNotification({
    android: {
      channelId: CHANNEL_ID,
      category: AndroidCategory.ALARM,
      importance: AndroidImportance.HIGH, // Required for full-screen

      fullScreenAction: {
        // For custom component:
        id: "default",
        mainComponent: "AlarmFullScreen",
      },
      // asForegroundService: true,
    },
  });
}

async function createAlarmChannelGroup() {
  await notifee.createChannelGroup({
    id: "alarms",
    name: "Alarms",
  });
}

export async function scheduleAlarm(alarm: Alarm) {
  await checkNotificationPermission();
  await createAlarmChannelGroup();
  await createAlarmNotificationChannel();
  await displayFullScreenAlarm();

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
  await createAlarmChannelGroup();
  await createAlarmNotificationChannel();
  await displayFullScreenAlarm();

  notifee.onForegroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    const alarmId = notification?.data?.alarmId as string;

    if (!alarmId) return;

    if (type === EventType.PRESS) {
      router.navigate("/pages/alarm-full-screen");
    }

    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === "complete-action"
    ) {
      router.navigate("/pages/alarm-full-screen");
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    const alarmId = notification?.data?.alarmId as string;

    if (!alarmId) return;

    if (type === EventType.PRESS) {
      router.navigate("/pages/alarm-full-screen");
    }

    if (
      type === EventType.ACTION_PRESS &&
      pressAction?.id === "complete-action"
    ) {
      router.navigate("/pages/alarm-full-screen");
    }
  });
}
