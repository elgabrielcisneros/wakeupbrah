import { ToastProps } from "@/infraestructure/types/alarm";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export default function Toast({
  visible,
  message,
  type = "error",
  duration = 3000,
  onHide,
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      // Auto-hide after `duration` ms
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, styles[type], { opacity }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  message: {
    fontFamily: "Manrope",
    fontWeight: "bold",
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
  },
  error: {
    backgroundColor: "#DC2626",
  },
  success: {
    backgroundColor: "#16A34A",
  },
  info: {
    backgroundColor: "#2563EB",
  },
});
