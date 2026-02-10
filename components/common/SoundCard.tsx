import { Text, View } from "@/components/Themed";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import "../../styles/global.css";

export default function SoundCard() {
  return (
    <View style={styles.card} className="flex items-center justify-center p-3">
      <View
        className="flex-row items-center justify-between w-full mt-3 mb-3"
        style={styles.soundContainer}
      >
        <Text className="mr-4" style={styles.label}>
          Sound
        </Text>

        <Pressable>
          <Text className="text-white text-2xl" style={styles.soundText}>
            Early wake
            <Ionicons
              name="chevron-forward"
              size={20}
              color="white"
              className="ml-2"
            />
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",
    borderColor: "#94A3B8",
    borderWidth: 1,
    borderRadius: 30,
  },
  label: {
    fontFamily: "Manrope",
    fontWeight: "light",
    color: "#94A3B8",
    fontSize: 18,
    marginLeft: 12,
  },
  soundContainer: {
    backgroundColor: "transparent",
  },
  soundText: {
    fontFamily: "Manrope",
  },
});
