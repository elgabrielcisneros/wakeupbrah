import { getAlarmById } from "@/db/database";
import { Alarm, ChallengeType } from "@/infraestructure/types/alarm";
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  EventDetail,
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { router } from "expo-router";

const CHANNEL_ID = "wakeupbrah-alarm";

async function checkNotificationPermission() {
  await notifee.requestPermission();
  const settings = await notifee.getNotificationSettings();
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

export async function displayFullScreenAlarm() {
  router.navigate("/pages/alarm-full-screen");
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
        category: AndroidCategory.ALARM,
        importance: AndroidImportance.HIGH,
        fullScreenAction: {
          id: "default",
        },
        pressAction: {
          id: "default",
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
  await notifee.cancelTriggerNotification(alarmId);
  console.info("stopped on foreground");
}

export async function initializeAlarmSystem() {
  await checkNotificationPermission();
  await createAlarmChannelGroup();
  await createAlarmNotificationChannel();
}

async function handleAlarmEvent(type: EventType, detail: EventDetail) {
  const { notification } = detail;
  const alarmId = notification?.data?.alarmId as string;

  if (!alarmId) return;

  const alarm = await getAlarmById(alarmId);

  if (!alarm || !alarm.status) {
    await cancelAlarm(alarmId);
    return;
  }

  if (
    type === EventType.DELIVERED ||
    type === EventType.ACTION_PRESS ||
    type === EventType.PRESS
  ) {
    displayFullScreenAlarm();
  }
}

export function registerForegroundHandler() {
  notifee.onForegroundEvent(async ({ type, detail }) => {
    handleAlarmEvent(type, detail);
  });
}
