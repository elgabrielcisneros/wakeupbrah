import { Alarm } from "@/infraestructure/types/alarm";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
} from "@notifee/react-native";

async function checkNotificationPermission() {
  await notifee.requestPermission();
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    console.log("Notification permissions has been authorized");
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    console.log("Notification permissions has been denied");
  }
}

export default function NotifeeIntegration({ alarm }: { alarm: Alarm }) {
  async function notificationDisplay() {
    checkNotificationPermission();

    const channelId = await notifee.createChannel({
      id: "reminder",
      name: "Reminders",
      sound: "01_wakey_wakey",
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
      vibration: true,
      description: "Reminder Notifications",
    });

    await notifee.displayNotification({
      title: alarm.title,
      body: alarm.title,
      android: {
        channelId,
        smallIcon: "ic_launcher",
        pressAction: {
          id: "reminder",
        },
      },
    });
  }
}
