import { Text, View } from "@/components/Themed";
import { Image, StyleSheet } from "react-native";

import "../../styles/global.css";
import CreateButton from "./CreateButton";

export default function EmptyContent() {
  return (
    <View className="flex-1 justify-center">
      <View style={styles.imageContainer} className="mb-10">
        <Image source={require("../../assets/images/index-tab/moon.png")} />
      </View>
      <View>
        <Text className="text-center text-4xl font-bold" style={styles.title}>
          No alarms yet
        </Text>
        <View className="p-3">
          <Text className="text-center text-xl">
            Ready to wake up with a challenge? Create your first alarm to start.
          </Text>
        </View>
        <CreateButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#919191",
    lineHeight: 36,
    fontFamily: "Inter",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
