import { Text } from "@/components/Themed";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SaveButton() {
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[
          pressed ? styles.buttonPressed : styles.button,
          { transitionDuration: 100 },
        ]}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
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
