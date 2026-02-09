import { Text, View } from "@/components/Themed";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function SaveButton() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.label}>Save</Text>
      </Pressable>
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
});
