import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CreateButton() {
  const isPressed = useSharedValue(0);
  const router = useRouter();

  async function handleNavigate() {
    router.navigate("/pages/add-alarm");
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(isPressed.value ? 0.95 : 1, { duration: 100 }) },
      ],
      backgroundColor: withTiming(isPressed.value ? "#71b1ffff" : "#60A5FA", {
        duration: 100,
      }),
      // Glow effect (iOS)
      shadowOpacity: withTiming(isPressed.value ? 0.6 : 0.2, { duration: 150 }),
      shadowRadius: withTiming(isPressed.value ? 25 : 15, { duration: 150 }),
      // Android basic glow simulation
      elevation: withTiming(isPressed.value ? 10 : 25, { duration: 150 }),
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[
          styles.button,
          {
            shadowColor: "#7bb6ffff",
            shadowOffset: { width: 0, height: 0 },
          },
          animatedStyle,
        ]}
        onPressIn={() => (isPressed.value = 1)}
        onPressOut={() => (isPressed.value = 0)}
        onPress={handleNavigate}
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
});
