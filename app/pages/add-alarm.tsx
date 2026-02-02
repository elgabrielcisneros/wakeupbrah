import TimePicker from "@/components/common/TimePicker";
import { Text, View } from "@/components/Themed";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../styles/global.css";

export default function AddAlarm() {
  const [time, setTime] = useState(new Date());
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 10 }}>
      <View style={styles.header} className="flex items-center justify-center ">
        <View style={styles.cancelButtonContainer}>
          <Pressable>
            <Ionicons
              name="chevron-back"
              size={30}
              style={styles.cancelButton}
            />
          </Pressable>
        </View>
        <Text className="text-2xl font-bold" style={styles.title}>
          New Alarm
        </Text>
      </View>
      <TimePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
  },
  cancelButtonContainer: {
    position: "absolute",
    left: 10,
  },
  cancelButton: {
    color: "#64a7ffff",
  },
});
