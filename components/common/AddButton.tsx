import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import "../../styles/global.css";
import { View } from "../Themed";

export default function AddButton() {
  const router = useRouter();
  return (
    <View
      className="flex items-center justify-center mt-2"
      style={styles.container}
    >
      <Pressable onPress={() => router.navigate("/pages/add-alarm")}>
        <Ionicons name="add" size={40} color="#64a7ffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});
