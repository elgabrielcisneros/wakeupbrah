import { Text } from "@/components/Themed";
import { insertAlarm } from "@/db/database";
import {
  Alarm,
  ChallengeType,
  getIconForType,
} from "@/infraestructure/types/alarm";
import { useAlarmStore } from "@/store/useAlarmStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Toast from "./Toast";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SaveButton({
  time,
  title,
  challenge,
}: {
  time: Date;
  title: string;
  challenge: ChallengeType;
}) {
  const isPressed = useSharedValue(0);

  const router = useRouter();

  const addAlarm = useAlarmStore((state) => state.addAlarm);

  const generateId = () => Date.now().toString(36) + Math.random().toString(36);

  const [toastVisible, setToastVisible] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      setToastVisible(true);
      return;
    }

    const newAlarm: Alarm = {
      id: generateId(),
      title,
      time,
      challenge: {
        type: challenge,
        status: "not_started",
        icon: getIconForType(challenge),
      },
      day: "mon",
      repeating: false,
      repeatingPattern: "daily",
      status: "enabled",
    };

    const id = await insertAlarm({
      title: newAlarm.title,
      time: newAlarm.time,
      repeating: newAlarm.repeating,
      repeatingPattern: newAlarm.repeatingPattern,
      challenge: newAlarm.challenge.type, // en DB guardas solo el string
      day: newAlarm.day,
      status: newAlarm.status === "enabled",
    });

    addAlarm({ ...newAlarm, id: id.toString() });

    router.back();
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(isPressed.value ? 0.95 : 1, { duration: 100 }) },
      ],
      backgroundColor: withTiming(isPressed.value ? "#5f5f5f" : "#383838", {
        duration: 100,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[
          styles.button,
          {
            shadowColor: "#616161ff",
            shadowOffset: { width: 0, height: 0 },
          },
          animatedStyle,
        ]}
        onPressIn={() => (isPressed.value = 1)}
        onPressOut={() => (isPressed.value = 0)}
        onPress={() => handleSave()}
      >
        <Text style={styles.label}>Save</Text>
      </AnimatedPressable>

      <Toast
        visible={toastVisible}
        message="Alarm name is required"
        type="error"
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  button: {
    borderRadius: 30,
    padding: 10,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Manrope",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
});
