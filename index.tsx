/**
 * Entry point for the app.
 *
 * Notifee requires onBackgroundEvent to be registered at the TOP LEVEL of the
 * module (before React mounts) so that it can handle notifications when the
 * app is in a killed/background state. Registering it inside a useEffect or
 * component will miss those events.
 */
import notifee, { EventType } from "@notifee/react-native";
import { router } from "expo-router";
import "expo-router/entry";
import { getAlarmById } from "./db/database";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;
  const alarmId = notification?.data?.alarmId as string;
  
  if (!alarmId) return;
  
  const alarm = await getAlarmById(alarmId);
  
  // If the alarm was disabled or deleted, cancel the notification.
  if (!alarm || !alarm.status) {
    await notifee.cancelTriggerNotification(alarmId);
    return;
  }
  
  if (
    type === EventType.DELIVERED ||
    type === EventType.ACTION_PRESS ||
    type === EventType.PRESS
    ) {
      router.navigate("/pages/alarm-full-screen");
    }
  });
