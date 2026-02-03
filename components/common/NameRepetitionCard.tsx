import { Text, View } from "@/components/Themed";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import "../../styles/global.css";

export default function NameRepetitionCard() {
  return (
    <View style={styles.card} className="flex items-center justify-center p-3">
      <View
        style={styles.labelInputContainer}
        className="flex-row items-center w-full"
      >
        <Text className="mr-4" style={styles.label}>
          Alarm Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Wake up"
          className="text-white"
        />
      </View>

      <View
        className="flex-row items-center justify-between w-full mt-6 mb-4"
        style={styles.labelInputContainer}
      >
        <Text className="mr-4" style={styles.label}>
          Repeat
        </Text>

        <Pressable>
          <Text className="text-white text-2xl" style={styles.repeatText}>
            Never
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
  input: {
    fontFamily: "Manrope",
    fontWeight: "bold",
    fontSize: 22,
  },
  labelInputContainer: {
    backgroundColor: "transparent",
  },
  repeatText: {
    fontFamily: "Manrope",
  },
});
