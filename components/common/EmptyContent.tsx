import { Text, View } from "@/components/Themed";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import "../../styles/global.css";

export default function EmptyContent() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center">
      <View>
        <Text className="text-center text-4xl font-bold" style={styles.title}>
          Add a new alarm ⏰
        </Text>
        <View className="flex items-center justify-center mt-2">
          <Pressable onPress={() => router.navigate("/pages/add-alarm")}>
            <Ionicons name="add" size={40} color="#64a7ffff" />
          </Pressable>
        </View>
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
