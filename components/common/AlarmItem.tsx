import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Alarm } from "../../infraestructure/types/alarm";
import "../../styles/global.css";

export default function AlarmItem({ alarm }: { alarm: Alarm }) {
  return (
    <View style={styles.cardContainer}>
      <Text
        style={styles.title}
        className="text-3xl"
        lightColor="#000000ff"
        darkColor="rgba(255, 255, 255, 1)"
      >
        {alarm.title}
      </Text>
      <Text
        className="text-xl"
        style={styles.time}
        lightColor="#000000ff"
        darkColor="rgba(255, 255, 255, 1)"
      >
        {alarm.time.toLocaleString(["en-US"], {
          hour: "2-digit",
          minute: "2-digit",
        })}
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
  title: {
    fontFamily: "inter",
  },
  time: {
    fontFamily: "inter",
    fontWeight: "bold",
  },
});
