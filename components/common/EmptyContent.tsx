import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

import "../../styles/global.css";
import AddButton from "./AddButton";

export default function EmptyContent() {
  return (
    <View className="flex-1 justify-center">
      <View>
        <Text className="text-center text-4xl font-bold" style={styles.title}>
          Add a new alarm ⏰
        </Text>
        <AddButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#c5c5c5d2",
    lineHeight: 36,
    fontStyle: "normal",
  },
});
