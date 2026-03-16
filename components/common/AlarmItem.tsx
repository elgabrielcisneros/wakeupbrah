import { Text, View } from "@/components/Themed";
import { Image, StyleSheet } from "react-native";
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
      <View className="flex flex-row">
        <Text
          className="text-xl mr-2"
          style={styles.time}
          lightColor="#000000ff"
          darkColor="rgba(255, 255, 255, 1)"
        >
          {new Date(alarm.time).toLocaleTimeString(["en-US"], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Image className="mt-1" source={alarm.challenge.icon} />
      </View>
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
