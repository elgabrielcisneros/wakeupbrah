import { Text, View } from "@/components/Themed";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet } from "react-native";
import "../../app/styles/global.css";

export default function EmptyContent() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="p-10 mx-auto">
        <Text className="text-center text-4xl" style={styles.title}>
          Add a new alarm ⏰
        </Text>
        <View className="flex items-center justify-center mt-2">
          <Ionicons name="add" size={40} color="#64a7ffff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto",
    color: "#c5c5c5d2",
    lineHeight: 36,
  },
});
