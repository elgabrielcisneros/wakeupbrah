import { Text } from "@/components/Themed";
import { ChallengeType, getIconForType } from "@/infraestructure/types/alarm";
import { useAlarmStore } from "@/store/useAlarmStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

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
  const [pressed, setPressed] = useState(false);
  const router = useRouter();

  const addAlarm = useAlarmStore((state) => state.addAlarm);

  const generateId = () => Date.now().toString(36) + Math.random().toString(36);

  function handleSave() {
    addAlarm({
      id: generateId(),
      title: title,
      time: time,
      challenge: {
        type: challenge,
        status: "not_started",
        icon: getIconForType(challenge),
      },
      day: "mon",
      repeating: false,
      repeatingPattern: "daily",
      status: "enabled",
    });
    router.back();
  }

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[
          pressed ? styles.buttonPressed : styles.button,
          { transitionDuration: 100 },
        ]}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => handleSave()}
      >
        <Text style={styles.label}>Save</Text>
      </AnimatedPressable>
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
    backgroundColor: "#383838",
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
  buttonPressed: {
    backgroundColor: "#5f5f5f",
    borderRadius: 30,
    padding: 10,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.95 }],
  },
});
