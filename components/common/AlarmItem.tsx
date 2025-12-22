import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import "../../app/styles/global.css";

export default function AlarmItem({ alarm }: any) {


  return (
    <View style={styles.cardContainer}>
      <Text
        style={styles.alarmTitle}
        lightColor="#000000ff"
        darkColor="rgba(255, 255, 255, 1)"
      >
        {alarm.title}
      </Text>
      <Text
        style={styles.alarmTime}
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
  alarmTitle:{
    fontFamily: "Roboto-Regular",
    fontSize: 26,
    fontWeight: "bold",
  },
  alarmTime:{
    fontFamily: "Roboto-Regular",
    fontSize: 19,
  },
});
