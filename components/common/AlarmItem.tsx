import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Alarm } from "../../infraestructure/types/alarm";
import "../../styles/global.css";

export default function AlarmItem({ alarm }: { alarm: Alarm }) {
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
        {alarm.time.toLocaleString()}
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
