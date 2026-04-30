import { completeAlarm as dbCompleteAlarm } from "@/db/database";
import { useAlarmStore } from "@/store/useAlarmStore";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cancelAlarm } from "../../components/NotifeeIntegration";

interface AlarmFullScreenProps {
  /** The notification data passed by Notifee's fullScreenAction */
  notification?: {
    id?: string;
    title?: string;
    body?: string;
    data?: {
      alarmId?: string;
      alarmTitle?: string;
      alarmTime?: string;
      type?: string;
    };
  };
}

export default function AlarmFullScreen({
  notification,
}: AlarmFullScreenProps) {
  const alarmId = notification?.data?.alarmId ?? "";
  const alarmTitle =
    notification?.data?.alarmTitle ?? notification?.title ?? "";
  const alarmTime = notification?.data?.alarmTime ?? "";

  const formattedTime = useMemo(() => {
    if (alarmTime) {
      try {
        const date = new Date(alarmTime);
        return date.toLocaleTimeString(["en-US"], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        return alarmTime;
      }
    }
    // Fallback: show current time
    return new Date().toLocaleTimeString(["en-US"], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [alarmTime]);

  //  Pulse animation for the complete button
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseLoop.start();
    glowLoop.start();

    return () => {
      pulseLoop.stop();
      glowLoop.stop();
    };
  }, [pulseAnim, glowAnim]);

  const handleComplete = async () => {
    try {
      if (alarmId) {
        // Persist to DB
        await dbCompleteAlarm(alarmId);
        // Update Zustand store
        useAlarmStore.getState().completeAlarm(alarmId);
        // Cancel the notification
        await cancelAlarm(alarmId);
        router.back();
      }

      if (notification?.id) {
        await cancelAlarm(notification.id);
      }
    } catch (error) {
      console.error("Error completing alarm:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />

      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

      <View style={styles.contentContainer}>
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{alarmTitle}</Text>
        </View>

        <View style={styles.buttonSection}>
          <Animated.View
            style={[
              styles.glowRing,
              {
                opacity: glowAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
          >
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}
              activeOpacity={0.7}
            >
              <Text style={styles.completeButtonIcon}>Complete Challenge</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const ACCENT_BLUE = "#64a7ff";
const ACCENT_BLUE_DIM = "rgba(100, 167, 255, 0.25)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 15, 30, 0.85)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },

  timeSection: {
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row",
  },
  timeText: {
    fontSize: 62,
    fontWeight: "700",
    color: "#ffffff",

    fontFamily: "inter",
  },
  timeDivider: {
    width: 40,
    height: 2,
    backgroundColor: ACCENT_BLUE,
    marginTop: 16,
    borderRadius: 1,
    opacity: 0.6,
  },

  titleSection: {
    alignItems: "center",
  },
  alarmLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: ACCENT_BLUE,
    letterSpacing: 6,
    textTransform: "uppercase",
    marginBottom: 12,
    fontFamily: "inter",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 36,
    fontFamily: "inter",
  },

  buttonSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  glowRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: ACCENT_BLUE,
    backgroundColor: ACCENT_BLUE_DIM,
  },
  completeButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: ACCENT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: ACCENT_BLUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  completeButtonIcon: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#ffffff",
  },
  completeHint: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.45)",
    letterSpacing: 1,
    fontFamily: "inter",
  },
});
