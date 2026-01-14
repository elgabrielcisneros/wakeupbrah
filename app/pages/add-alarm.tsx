import { Text, View } from "@/components/Themed";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import "../../styles/global.css";

export default function AddAlarm() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text className="text-4xl font-bold p-4 mt-20" style={styles.title}>
          Add Alarm
        </Text>
        <Pressable style={styles.cancelButton}>
          <Ionicons name="close" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    margin: 8,
  },
  title: {},
  cancelButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
