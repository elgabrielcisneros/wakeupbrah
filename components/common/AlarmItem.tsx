import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import "../../app/styles/global.css";

export default function AlarmItem({ alarm }: any) {
  return (
    <View style={styles.cardContainer}>
      <Text
        style={{ fontFamily: "Roboto" }}
        className="text-3xl"
        lightColor="#000000ff"
        darkColor="rgba(255, 255, 255, 1)"
      >
        {alarm.title}
      </Text>
      <Text
        className="text-xl"
        style={{ fontFamily: "GoogleSansCode" }}
        lightColor="#000000ff"
        darkColor="rgba(255, 255, 255, 1)"
      >
        {alarm.time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 10,
    borderColor: "#64a7ffff",
    borderWidth: 1,
    marginBottom: 16,
  },
});
