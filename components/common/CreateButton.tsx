import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CreateButton() {
  const [pressed, setPressed] = useState(false);
  const router = useRouter();

  async function handleNavigate() {
    router.navigate("/pages/add-alarm");
  }

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[
          pressed ? styles.buttonPressed : styles.button,
          {
            transitionDuration: 100,
          },
          {
            shadowColor: "#7bb6ffff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 20, // Adjust radius to control glow spread

            // Android Elevation for a basic shadow (less "glow" like)
            elevation: 20,
          },
        ]}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => handleNavigate()}
      >
        <Text style={styles.label}>Create Alarm</Text>
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
    backgroundColor: "#60A5FA",
    borderRadius: 30,
    padding: 10,
    width: "60%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "#191919",
    fontSize: 20,
  },
  buttonPressed: {
    backgroundColor: "#71b1ffff",
    borderRadius: 30,
    padding: 10,
    width: "60%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 0.95 }],
  },
});
